import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWaze } from '@fortawesome/free-brands-svg-icons'
import type { CSSProperties } from 'react'

interface WazeButtonProps {
  lat: number
  lng: number
  label?: string
  className?: string
  style?: CSSProperties
}

export default function WazeButton({ lat, lng, label = 'Abrir en Waze', className, style }: WazeButtonProps) {
  const url = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`

  const btnStyle: CSSProperties = {
    padding: '0.6rem 1rem',
    background: 'var(--color-tertiary)',
    color: 'var(--color-text-primary)',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    // preserve current color for the icon
    ...style
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className} style={btnStyle}>
      <FontAwesomeIcon icon={faWaze} />
      <span>{label}</span>
    </a>
  )
}
