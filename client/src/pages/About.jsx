import { useEffect, useState } from 'react'

export default function About() {
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/about')
      .then(r => r.json())
      .then(data => {
        setAboutData(data)
        setLoading(false)
      })
      .catch(e => {
        console.error('Error fetching about data:', e)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>Cargando...</div>
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--color-secondary)', textAlign: 'center' }}>
        Acerca de Nosotros
      </h1>
      
      {aboutData && (
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
            {JSON.stringify(aboutData, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ 
        backgroundColor: 'var(--color-primary)', 
        padding: '2rem', 
        borderRadius: 'var(--border-radius)',
        border: '1px solid var(--color-tertiary)',
        boxShadow: 'var(--shadow-light)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }}>
          {aboutData?.title || 'Acerca de Hogar Nazareth'}
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>
          {aboutData?.description || 'Somos una organización dedicada a brindar ayuda y esperanza a quienes más lo necesitan.'}
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        <div style={{ 
          backgroundColor: 'var(--color-tertiary)', 
          padding: '2rem', 
          borderRadius: 'var(--border-radius)',
          boxShadow: 'var(--shadow-light)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: 'var(--color-text-primary)', marginBottom: '1rem' }}>📅 Fundado</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>
            {aboutData?.founded || '2023'}
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: 'var(--color-tertiary)', 
          padding: '2rem', 
          borderRadius: 'var(--border-radius)',
          boxShadow: 'var(--shadow-light)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: 'var(--color-text-primary)', marginBottom: '1rem' }}>🎯 Misión</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>
            {aboutData?.mission || 'Crear un hogar lleno de amor y oportunidades para todos.'}
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
        <h3>Nuestros Valores</h3>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          marginTop: '1.5rem',
          gap: '1rem'
        }}>
          <div>
            <h4>🤝 Respeto</h4>
            <p>Dignidad para cada persona</p>
          </div>
          <div>
            <h4>❤️ Compasión</h4>
            <p>Cuidado con amor</p>
          </div>
          <div>
            <h4>🏆 Excelencia</h4>
            <p>Calidad en todo</p>
          </div>
        </div>
      </div>
    </div>
  )
}
