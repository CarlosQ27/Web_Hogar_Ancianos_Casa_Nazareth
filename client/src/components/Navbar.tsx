import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  
  const navStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-secondary)',
    borderBottom: '2px solid var(--color-tertiary)',
    padding: '1rem 2rem',
    boxShadow: 'var(--shadow-light)',
    marginBottom: '2rem'
  }
  
  const linkStyle: React.CSSProperties = {
    color: 'var(--color-text-primary)',
    textDecoration: 'none',
    margin: '0 1rem',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--border-radius)',
    transition: 'all 0.3s ease',
    fontWeight: '500'
  }
  
  const activeLinkStyle: React.CSSProperties = {
    ...linkStyle,
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-text-dark)'
  }

  return (
    <nav style={navStyle}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{ color: 'var(--color-text-primary)', margin: 0 }}>
          🏠 Hogar de Ancianos "Casa Nazareth" de Moravia 
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