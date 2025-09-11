import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  
  const navStyle: React.CSSProperties = {
    backgroundImage: 'url(/public/navbar_background.png)', // Cambia por el nombre de tu imagen
    backgroundSize: 'cover',               // La imagen cubre todo el navbar
    backgroundPosition: 'center',          // Centra la imagen
    backgroundRepeat: 'no-repeat',         // No repetir la imagen
    backgroundAttachment: 'fixed',         // Efecto parallax (opcional)
    position: 'relative',                  // Para el overlay
    borderBottom: '2px solid var(--color-tertiary)',
    padding: '3rem 2rem',
    boxShadow: 'var(--shadow-light)',
    marginBottom: '2rem'
  }
  
  // Overlay para mejorar legibilidad del texto
  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(77, 109, 154, 0.7)', // Azul semi-transparente
    zIndex: 1
  }
  
  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 2,
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  }
  
  const linkStyle: React.CSSProperties = {
    color: 'white',                        // Texto blanco para mejor contraste
    textDecoration: 'none',
    margin: '0 1rem',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--border-radius)',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)' // Sombra para mejor legibilidad
  }
  
  const activeLinkStyle: React.CSSProperties = {
    ...linkStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fondo semi-transparente
    backdropFilter: 'blur(10px)',                // Efecto blur moderno
    border: '1px solid rgba(255, 255, 255, 0.3)'
  }

  return (
    <nav style={navStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <h2 style={{ 
          color: 'white', 
          margin: 0,
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)' // Sombra para el título
        }}>
          Hogar de Ancianos "Casa Nazareth" de Moravia 
        </h2>
        <div>
          <Link 
            to="/" 
            style={location.pathname === '/' ? activeLinkStyle : linkStyle}
          >
            Inicio
          </Link>
          <Link 
            to="/about" 
            style={location.pathname === '/about' ? activeLinkStyle : linkStyle}
          >
            Acerca de
          </Link>
          <Link 
            to="/contact" 
            style={location.pathname === '/contact' ? activeLinkStyle : linkStyle}
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  )
}