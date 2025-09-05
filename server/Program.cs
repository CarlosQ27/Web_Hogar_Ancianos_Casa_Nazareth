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
                // Development - permitir localhost
                policy.WithOrigins(
                    "http://localhost:5173", 
                    "https://localhost:5173", 
                    "http://localhost:4173", 
                    "https://localhost:4173",
                    "http://localhost:5184", 
                    "https://localhost:7136"
                )
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
        description = "Somos una organización dedicada a brindar ayuda y esperanza a quienes más lo necesitan.",
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
