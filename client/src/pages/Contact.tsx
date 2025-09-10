import { useEffect, useState } from 'react'

interface ContactData {
  email: string
  phone: string
  address: string
  hours: string
}

export default function Contact() {
  const [contactData, setContactData] = useState<ContactData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('/api/contact')
      .then(r => r.json())
      .then((data: ContactData) => {
        setContactData(data)
        setLoading(false)
      })
      .catch(e => {
        console.error('Error fetching contact data:', e)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>Cargando...</div>
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--color-secondary)', textAlign: 'center' }}>
        Contáctanos
      </h1>
      
      {contactData && (
        <div style={{ 
          backgroundColor: 'var(--color-quaternary)', 
          padding: '1.5rem', 
          borderRadius: 'var(--border-radius)',
          marginBottom: '2rem',
          border: '1px solid var(--color-tertiary)',
          boxShadow: 'var(--shadow-light)'
        }}>
          <h3 style={{ color: 'var(--color-secondary)' }}>Datos del Backend:</h3>
          <pre style={{ backgroundColor: 'var(--color-text-primary)', color: 'var(--color-primary)', padding: '1rem', borderRadius: 'var(--border-radius)' }}>
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
          backgroundColor: 'var(--color-primary)', 
          padding: '2rem', 
          borderRadius: 'var(--border-radius)',
          boxShadow: 'var(--shadow-light)',
          border: '1px solid var(--color-tertiary)'
        }}>
          <h3 style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }}>📧 Email</h3>
          <p style={{ fontSize: '1.1rem' }}>
            <a href={`mailto:${contactData?.email || 'contacto@hogarnazareth.org'}`}
               style={{ color: 'var(--color-secondary)', textDecoration: 'none' }}>
              {contactData?.email || 'contacto@hogarnazareth.org'}
            </a>
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: 'var(--color-primary)', 
          padding: '2rem', 
          borderRadius: 'var(--border-radius)',
          boxShadow: 'var(--shadow-light)',
          border: '1px solid var(--color-tertiary)'
        }}>
          <h3 style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }}>📞 Teléfono</h3>
          <p style={{ fontSize: '1.1rem' }}>
            <a href={`tel:${contactData?.phone || '+1 (555) 123-4567'}`}
               style={{ color: 'var(--color-secondary)', textDecoration: 'none' }}>
              {contactData?.phone || '+1 (555) 123-4567'}
            </a>
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: 'var(--color-primary)', 
          padding: '2rem', 
          borderRadius: 'var(--border-radius)',
          boxShadow: 'var(--shadow-light)',
          border: '1px solid var(--color-tertiary)',
          gridColumn: 'span 1'
        }}>
          <h3 style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }}>📍 Dirección</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>
            {contactData?.address || '123 Calle Esperanza, Ciudad, País'}
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: 'var(--color-primary)', 
          padding: '2rem', 
          borderRadius: 'var(--border-radius)',
          boxShadow: 'var(--shadow-light)',
          border: '1px solid var(--color-tertiary)',
          gridColumn: 'span 1'
        }}>
          <h3 style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }}>🕒 Horarios</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>
            {contactData?.hours || 'Lunes a Viernes: 9:00 AM - 6:00 PM'}
          </p>
        </div>
      </div>

      <div style={{ 
        backgroundColor: 'var(--color-secondary)', 
        color: 'var(--color-primary)', 
        padding: '2rem', 
        borderRadius: 'var(--border-radius)',
        marginTop: '3rem',
        textAlign: 'center',
        boxShadow: 'var(--shadow-medium)'
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
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-secondary)',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: 'var(--border-radius)',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            boxShadow: 'var(--shadow-light)'
          }}>
            Enviar Mensaje
          </button>
          <button style={{
            backgroundColor: 'var(--color-tertiary)',
            color: 'var(--color-text-primary)',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: 'var(--border-radius)',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            boxShadow: 'var(--shadow-light)'
          }}>
            Llamar Ahora
          </button>
        </div>
      </div>
    </div>
  )
}