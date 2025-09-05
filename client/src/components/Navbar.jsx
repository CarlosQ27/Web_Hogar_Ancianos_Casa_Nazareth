import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  
  const navStyle = {
    backgroundColor: '#2c3e50',
    padding: '1rem 2rem',
    marginBottom: '2rem'
  }
  
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 1rem',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  }
  
  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: '#34495e'
  }
  
  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ color: 'white', margin: 0 }}>Hogar de Ancianos "Casa Nazareth" de Moravia </h2>
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
