import WazeButton from './WazeButton'

type FooterProps = {
  className?: string
  style?: React.CSSProperties
}

export default function Footer({ className, style }: FooterProps) {
  const year = new Date().getFullYear()

  const footerStyle = {
    borderTop: '2px solid var(--color-tertiary)',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-text-primary)',
    padding: '1rem 1.25rem',
    boxShadow: '0 -8px 20px rgba(44,62,80,0.08)'
  } as React.CSSProperties

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    gap: '0.5rem'
  } as React.CSSProperties

  return (
    <footer className={['site-footer', className].filter(Boolean).join(' ')} style={{ ...footerStyle, ...style }}>
      <div style={contentStyle}>
        {/* left spacer */}
        <div />
        {/* centered content: text + icon-only Waze button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', justifySelf: 'center' }}>
            {/* Contact info */}
            <div className="contact-info" style={{ textAlign: 'center', color: 'var(--color-text-primary)' }}>
              <p style={{ margin: '0.25rem 0' }}>
                <strong>Teléfono:</strong>{' '}
                <a href="tel:22973268" className="contact-link" style={{ color: 'var(--color-text-primary)'}}>2297-3268</a>
              </p>
              <p style={{ margin: '0.25rem 0' }}>
                <strong>Email:</strong>{' '}
                <a href="mailto:casanazareth49@gmail.com" className="contact-link" style={{ color: 'var(--color-text-primary)'}}>casanazareth49@gmail.com</a>
              </p>
              {/* Icon-only Waze button */}
              <WazeButton
                lat={9.9674426}
                lng={-84.0554902}
                label=""
                style={{ gap: 0, padding: '0.5rem 0.6rem' }}
              />
            </div>
            <p style={{ margin: 0, textAlign: 'center' }}>© {year} Asociación Moraviana - Hogar Casa Nazareth</p>
        </div>
        {/* right spacer */}
        <div />
      </div>
    </footer>
  )
}
