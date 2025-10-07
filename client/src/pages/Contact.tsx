import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import LocationMap from '../components/LocationMap'
import WazeButton from '../components/WazeButton'

export default function Contact() {
  // Coordenadas
  const lat = 9.9674426
  const lng = -84.0554902

  return (
    <div className="contact-page">
      <h1 className="contact-title">
        Contáctenos <FontAwesomeIcon icon={faPhone} />
      </h1>

      {/* Información de contacto */}
      <div className="contact-info">
        <p style={{ margin: '0.25rem 0' }}>
          <strong>Teléfono:</strong>{' '}
          <a href="tel:22973268" className="contact-link">2297-3268</a>
        </p>
        <p style={{ margin: '0.25rem 0' }}>
          <strong>Email:</strong>{' '}
          <a href="mailto:casanazareth49@gmail.com" className="contact-link">casanazareth49@gmail.com</a>
        </p>

        <div className="contact-hours">
          <p className="hours-title">Horario de Oficina</p>
          <p>Lunes a Viernes de 8 am a 5 pm</p>

          <p className="hours-title">Horario de visitas</p>
          <p>9 am a 11 am</p>
          <p>2 pm a 4 pm</p>
        </div>
      </div>
      <h1 className="contact-title" style={{ marginTop: '2rem' }}>
        Cómo Llegar <FontAwesomeIcon icon={faMapLocationDot} />
      </h1>

      <div className="contact-map">
        <LocationMap height={480} />
      </div>

      <div className="contact-actions">
        <WazeButton lat={lat} lng={lng} />
      </div>
    </div>
  )
}