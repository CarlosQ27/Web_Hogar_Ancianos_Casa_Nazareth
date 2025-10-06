using System.Diagnostics;
using System.Text.Json;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            if (builder.Environment.IsDevelopment())
            {
                // Development - permitir loopback y rangos de red local (LAN)
                policy
                    .SetIsOriginAllowed(origin =>
                    {
                        if (!Uri.TryCreate(origin, UriKind.Absolute, out var uri)) return false;
                        if (uri.IsLoopback) return true; // localhost, 127.0.0.1
                        var host = uri.Host;
                        // Rangos privados comunes: 192.168.x.x, 10.x.x.x, 172.16-31.x.x
                        if (host.StartsWith("192.168.")) return true;
                        if (host.StartsWith("10.")) return true;
                        if (host.StartsWith("172."))
                        {
                            var parts = host.Split('.');
                            if (parts.Length > 1 && int.TryParse(parts[1], out var second))
                            {
                                return second >= 16 && second <= 31;
                            }
                        }
                        return false;
                    })
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            }
            else
            {
                // Production - configurar dominios específicos
                policy.WithOrigins(
                    "https://tu-dominio.com",
                    "https://www.tu-dominio.com"
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
            }
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
else
{
    // Production settings
    app.UseHsts(); // HTTP Strict Transport Security
}

app.UseCors("AllowReactApp");
app.UseHttpsRedirection();

// Lightweight request logging to terminal
app.Use(async (context, next) =>
{
    var logger = app.Logger;
    var sw = Stopwatch.StartNew();
    var method = context.Request.Method;
    var path = context.Request.Path;
    var scheme = context.Request.Scheme;
    var remoteIp = context.Connection.RemoteIpAddress?.ToString();

    try
    {
        await next();
        sw.Stop();
        logger.LogInformation("HTTP {Method} {Path} -> {StatusCode} in {Elapsed} ms ({Scheme}) from {RemoteIp}",
            method, path, context.Response?.StatusCode, sw.ElapsedMilliseconds, scheme, remoteIp);
    }
    catch (Exception ex)
    {
        sw.Stop();
        logger.LogError(ex, "HTTP {Method} {Path} -> EXCEPTION in {Elapsed} ms ({Scheme}) from {RemoteIp}",
            method, path, sw.ElapsedMilliseconds, scheme, remoteIp);
        throw;
    }
});

// DEV-ONLY: Fallback CORS headers for /api/* so browser can read even 404s
if (app.Environment.IsDevelopment())
{
    app.Use(async (ctx, next) =>
    {
        if (ctx.Request.Path.StartsWithSegments("/api"))
        {
            var origin = ctx.Request.Headers["Origin"].ToString();
            if (!string.IsNullOrEmpty(origin))
            {
                ctx.Response.Headers["Access-Control-Allow-Origin"] = origin;
                ctx.Response.Headers["Vary"] = "Origin";
                ctx.Response.Headers["Access-Control-Allow-Credentials"] = "true";
                ctx.Response.Headers["Access-Control-Allow-Headers"] = "*";
                ctx.Response.Headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS";
            }

            if (string.Equals(ctx.Request.Method, "OPTIONS", StringComparison.OrdinalIgnoreCase))
            {
                ctx.Response.StatusCode = StatusCodes.Status204NoContent;
                return; // short-circuit preflight
            }
        }
        await next();
    });
}

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

// API Endpoints
app.MapGet("/api/hello", () =>
{
    return new { message = "¡Hola desde el backend de .NET!" };
})
.WithName("GetHello");

app.MapGet("/api/about", () =>
{
    return new {
        title = "Acerca de Hogar Nazareth",
        description = "Estamos en un proceso de renovación para mejorar el contacto",
        founded = "2023",
        mission = "Crear un hogar lleno de amor y oportunidades para todos."
    };
})
.WithName("GetAbout");

app.MapGet("/api/contact", () =>
{
    return new { 
        email = "contacto@hogarnazareth.org",
        phone = "+1 (555) 123-4567",
        address = "123 Calle Esperanza, Ciudad, País",
        hours = "Lunes a Viernes: 9:00 AM - 6:00 PM"
    };
})
.WithName("GetContact");

// Services list for FE dropdown test
app.MapGet("/api/services", (IWebHostEnvironment env) =>
{
    var path = Path.Combine(env.ContentRootPath, "data", "services.json");
    if (!File.Exists(path))
    {
        // Fallback empty structure
        return Results.Json(new ServicesResponse { Services = new() });
    }

    try
    {
        var json = File.ReadAllText(path);
        var result = JsonSerializer.Deserialize<ServicesResponse>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
        return Results.Json(result ?? new ServicesResponse { Services = new() });
    }
    catch (Exception ex)
    {
        // Log and return empty if JSON is malformed
        app.Logger.LogError(ex, "Failed to read services.json");
        return Results.Json(new ServicesResponse { Services = new() });
    }
})
.WithName("GetServices");

// (removed temporary /api/ping endpoint)

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

// Services data contracts for /api/services
public record ServicesResponse
{
    public List<ServiceNode> Services { get; init; } = new();
}

public record ServiceNode
{
    public string Name { get; init; } = string.Empty;
    public bool? Disponible { get; init; }
    public int? Cantidad { get; init; }
    public string? Descripcion { get; init; }
    public List<ServiceNode>? Children { get; init; }
}
