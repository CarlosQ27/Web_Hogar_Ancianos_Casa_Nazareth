import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  
  const navStyle: React.CSSProperties = {
    backgroundImage: 'url(/navbar_background.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    position: 'relative',
    borderBottom: '2px solid var(--color-tertiary)',
    padding: '1rem 2rem',
    boxShadow: '0 10px 30px rgba(44,62,80,0.18)',
    marginBottom: '1rem',
    zIndex: 10,
    backdropFilter: 'saturate(120%) blur(6px)',
    WebkitBackdropFilter: 'saturate(120%) blur(6px)',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
    overflow: 'visible'
  }

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(77, 109, 154, 0.55)',
    zIndex: 1
  }
  
  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    maxWidth: '1200px',
    margin: '0 auto'
  }

  return (
    <nav style={navStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <h2 className="nav-title" style={{ color: 'white', margin: 0 }}>
          Asociación Moraviana - Hogar Casa Nazareth
        </h2>

        <div style={{ flex: 1 }} />

        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Inicio
          </Link>

          {/* <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
            Acerca
          </Link> */}

          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  )
}