import { useEffect, useState } from 'react'

export default function Contact() {
  const [contactData, setContactData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/contact')
      .then(r => r.json())
      .then(data => {
        setContactData(data)
        setLoading(false)
      })
      .catch(e => {
        console.error('Error fetching contact data:', e)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando...</div>
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>
        Contáctanos
      </h1>
      
      {contactData && (
        <div style={{ 
          backgroundColor: '#ecf0f1', 
          padding: '1.5rem', 
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h3>Datos del Backend:</h3>
          <pre style={{ backgroundColor: '#34495e', color: 'white', padding: '1rem', borderRadius: '4px' }}>
            {JSON.stringify(contactData, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '2rem', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#e74c3c', marginBottom: '1rem' }}>📧 Email</h3>
          <p style={{ fontSize: '1.1rem' }}>
            <a href={`mailto:${contactData?.email || 'contacto@hogarnazareth.org'}`}
               style={{ color: '#3498db', textDecoration: 'none' }}>
              {contactData?.email || 'contacto@hogarnazareth.org'}
            </a>
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '2rem', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#27ae60', marginBottom: '1rem' }}>📞 Teléfono</h3>
          <p style={{ fontSize: '1.1rem' }}>
            <a href={`tel:${contactData?.phone || '+1 (555) 123-4567'}`}
               style={{ color: '#3498db', textDecoration: 'none' }}>
              {contactData?.phone || '+1 (555) 123-4567'}
            </a>
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '2rem', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          gridColumn: 'span 1'
        }}>
          <h3 style={{ color: '#9b59b6', marginBottom: '1rem' }}>📍 Dirección</h3>
          <p style={{ fontSize: '1.1rem' }}>
            {contactData?.address || '123 Calle Esperanza, Ciudad, País'}
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '2rem', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          gridColumn: 'span 1'
        }}>
          <h3 style={{ color: '#f39c12', marginBottom: '1rem' }}>🕒 Horarios</h3>
          <p style={{ fontSize: '1.1rem' }}>
            {contactData?.hours || 'Lunes a Viernes: 9:00 AM - 6:00 PM'}
          </p>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#2c3e50', 
        color: 'white', 
        padding: '2rem', 
        borderRadius: '8px',
        marginTop: '3rem',
        textAlign: 'center'
      }}>
        <h3>¿Cómo Podemos Ayudarte?</h3>
        <p style={{ marginBottom: '1.5rem' }}>
          Estamos aquí para responder tus preguntas y brindarte el apoyo que necesitas.
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button style={{
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            Enviar Mensaje
          </button>
          <button style={{
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            Llamar Ahora
          </button>
        </div>
      </div>
    </div>
  )
}
