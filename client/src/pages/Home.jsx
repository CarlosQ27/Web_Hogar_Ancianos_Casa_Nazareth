import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || '/api'

export default function Home() {
  const [msg, setMsg] = useState('Cargando...')

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_APP_ENV === 'production' 
      ? `${API_URL}/api/hello`
      : '/api/hello'
    
    fetch(apiUrl)
      .then(r => r.json())
      .then(d => setMsg(d.message))
      .catch(e => setMsg('Error: ' + e.message))
  }, [])

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>
        Bienvenido a Hogar Nazareth
      </h1>
      
      <div style={{ 
        backgroundColor: '#ecf0f1', 
        padding: '1.5rem', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3>Conexión con el Backend:</h3>
        <p>Respuesta del servidor: <strong style={{ color: '#27ae60' }}>{msg}</strong></p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#555' }}>
          Un lugar donde la esperanza encuentra un hogar. Nos dedicamos a brindar 
          apoyo, amor y oportunidades a quienes más lo necesitan en nuestra comunidad.
        </p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          marginTop: '3rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            margin: '1rem',
            flex: '1',
            minWidth: '250px'
          }}>
            <h3 style={{ color: '#e74c3c' }}>Misión</h3>
            <p>Crear un ambiente de amor y cuidado para todos.</p>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            margin: '1rem',
            flex: '1',
            minWidth: '250px'
          }}>
            <h3 style={{ color: '#3498db' }}>Visión</h3>
            <p>Una comunidad donde todos tengan oportunidades.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
