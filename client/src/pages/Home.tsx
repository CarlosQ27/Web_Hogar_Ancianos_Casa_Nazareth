import Carousel from '../components/Carousel'

const API_URL = import.meta.env.VITE_API_URL || '/api'

export default function Home() {
  // Lista estática de imágenes del carousel
  const carouselImages = [
    '/Carousel/stock_1.jpg',
    '/Carousel/stock_2.jpg',
    '/Carousel/stock_3.jpg',
    '/Carousel/stock_4.jpg'
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>
        Bienvenido a Hogar Casa Nazareth
      </h1>

      <div style={{ marginBottom: '2rem' }}>
        <Carousel 
          images={carouselImages}
          height="400px"
          autoAdvanceInterval={6000}
        />
      </div>

      <div style={{ 
        backgroundColor: 'var(--color-primary)', 
        padding: '2rem', 
        borderRadius: 'var(--border-radius)',
        border: '1px solid var(--color-tertiary)',
        boxShadow: 'var(--shadow-light)',
        textAlign: 'center'
      }}>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            En el Hogar Casa Nazareth nos dedicamos al Cuido de Adultos Mayores, tratamos de brindarles todas los cuidados y comododades para vivan una vejez feliz.
        </p>
        
        <div className="feature-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          <div className="feature-card" style={{ 
            backgroundColor: 'var(--color-tertiary)', 
            padding: '1.5rem', 
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow-light)'
          }}>
            <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>🏠 Cuidado Integral</h4>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          
          <div className="feature-card" style={{ 
            backgroundColor: 'var(--color-tertiary)', 
            padding: '1.5rem', 
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow-light)'
          }}>
            <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>❤️ Ambiente Familiar</h4>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          
          <div className="feature-card" style={{ 
            backgroundColor: 'var(--color-tertiary)', 
            padding: '1.5rem', 
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow-light)'
          }}>
            <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>🎯 Actividades</h4>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}