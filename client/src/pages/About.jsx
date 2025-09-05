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
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando...</div>
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>
        {aboutData?.title || 'Acerca de Nosotros'}
      </h1>
      
      {aboutData && (
        <div style={{ 
          backgroundColor: '#ecf0f1', 
          padding: '1.5rem', 
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h3>Datos del Backend:</h3>
          <pre style={{ backgroundColor: '#34495e', color: 'white', padding: '1rem', borderRadius: '4px' }}>
            {JSON.stringify(aboutData, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ lineHeight: '1.8' }}>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>
          {aboutData?.description || 'Cargando descripción...'}
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#e74c3c', marginBottom: '1rem' }}>Fundación</h3>
            <p style={{ fontSize: '1.1rem' }}>
              Fundado en <strong>{aboutData?.founded || '2023'}</strong>
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#27ae60', marginBottom: '1rem' }}>Nuestra Misión</h3>
            <p style={{ fontSize: '1.1rem' }}>
              {aboutData?.mission || 'Crear un hogar lleno de amor y oportunidades.'}
            </p>
          </div>
        </div>

        <div style={{ 
          backgroundColor: '#3498db', 
          color: 'white', 
          padding: '2rem', 
          borderRadius: '8px',
          marginTop: '3rem',
          textAlign: 'center'
        }}>
          <h3>Nuestros Valores</h3>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            marginTop: '1rem'
          }}>
            <div style={{ margin: '0.5rem' }}>
              <strong>❤️ Amor</strong>
            </div>
            <div style={{ margin: '0.5rem' }}>
              <strong>🤝 Compasión</strong>
            </div>
            <div style={{ margin: '0.5rem' }}>
              <strong>🌟 Esperanza</strong>
            </div>
            <div style={{ margin: '0.5rem' }}>
              <strong>🙏 Respeto</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
