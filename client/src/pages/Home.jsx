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
      <h1 style={{ color: 'var(--color-secondary)', textAlign: 'center' }}>
        Bienvenido a Hogar Nazareth
      </h1>
      
      <div style={{ 
        backgroundColor: 'var(--color-quaternary)', 
        padding: '1.5rem', 
        borderRadius: 'var(--border-radius)',
        marginBottom: '2rem',
        border: '1px solid var(--color-tertiary)',
        boxShadow: 'var(--shadow-light)'
      }}>
        <h3 style={{ color: 'var(--color-secondary)' }}>Conexión con Backend:</h3>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
          Mensaje del servidor: <strong style={{ color: 'var(--color-text-primary)' }}>{msg}</strong>
        </p>
        <pre style={{ backgroundColor: 'var(--color-text-primary)', color: 'var(--color-primary)', padding: '1rem', borderRadius: 'var(--border-radius)' }}>
          URL de API: {API_URL}/hello
        </pre>
      </div>

      <div style={{ 
        backgroundColor: 'var(--color-primary)', 
        padding: '2rem', 
        borderRadius: 'var(--border-radius)',
        border: '1px solid var(--color-tertiary)',
        boxShadow: 'var(--shadow-light)',
        textAlign: 'center'
      }}>
        <h2 style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }}>
          Hogar de Ancianos Casa Nazareth
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Un lugar lleno de amor, cuidado y esperanza para nuestros adultos mayores.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          <div style={{ 
            backgroundColor: 'var(--color-tertiary)', 
            padding: '1.5rem', 
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow-light)'
          }}>
            <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>🏠 Cuidado Integral</h4>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Atención médica y cuidado personalizado las 24 horas del día.
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: 'var(--color-tertiary)', 
            padding: '1.5rem', 
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow-light)'
          }}>
            <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>❤️ Ambiente Familiar</h4>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Un hogar cálido donde cada residente es parte de nuestra familia.
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: 'var(--color-tertiary)', 
            padding: '1.5rem', 
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow-light)'
          }}>
            <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>🎯 Actividades</h4>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Programas de recreación y terapia para mantener activa la mente y el cuerpo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
