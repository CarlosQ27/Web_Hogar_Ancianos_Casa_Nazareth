import { useEffect, useState } from 'react'

interface CarouselProps {
  images: string[]
  height?: string
  autoAdvanceInterval?: number
}

export default function Carousel({ 
  images, 
  height = '400px', 
  autoAdvanceInterval = 6000
}: CarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [hovered, setHovered] = useState<boolean>(false)

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(i => (i + 1) % images.length)
      }, autoAdvanceInterval)
      return () => clearInterval(interval)
    }
  }, [images.length, autoAdvanceInterval])

  const nextImage = () => setCurrentImageIndex(i => (i + 1) % images.length)
  const prevImage = () => setCurrentImageIndex(i => (i - 1 + images.length) % images.length)

  if (images.length === 0) return null

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        height,
        borderRadius: 'var(--border-radius)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-medium)'
      }}
    >
      {/* stacked images for true fade */}
      {images.map((src, idx) => (
        <img
          key={src + idx}
          className="carousel-image"
          src={src}
          alt={`Imagen ${idx + 1}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 900ms ease',
            opacity: idx === currentImageIndex ? 1 : 0,
            zIndex: idx === currentImageIndex ? 2 : 1,
            willChange: 'opacity'
          }}
        />
      ))}

      {/* subtle side gradients */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 72, pointerEvents: 'none', background: 'linear-gradient(to right, rgba(0,0,0,0.14), transparent)', zIndex: 3 }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 72, pointerEvents: 'none', background: 'linear-gradient(to left, rgba(0,0,0,0.14), transparent)', zIndex: 3 }} />

      {/* small, subtle arrows - appear on hover */}
      {images.length > 1 && (
        <>
          <button
            aria-label="Anterior"
            onClick={prevImage}
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.82)',
              border: 'none',
              borderRadius: '50%',
              width: 34,
              height: 34,
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-light)',
              transition: 'opacity 180ms ease, transform 180ms ease',
              opacity: hovered ? 1 : 0,
              pointerEvents: hovered ? 'auto' : 'none',
              zIndex: 4
            }}
          >
            ‹
          </button>

          <button
            aria-label="Siguiente"
            onClick={nextImage}
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.82)',
              border: 'none',
              borderRadius: '50%',
              width: 34,
              height: 34,
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-light)',
              transition: 'opacity 180ms ease, transform 180ms ease',
              opacity: hovered ? 1 : 0,
              pointerEvents: hovered ? 'auto' : 'none',
              zIndex: 4
            }}
          >
            ›
          </button>
        </>
      )}
    </div>
  )
}