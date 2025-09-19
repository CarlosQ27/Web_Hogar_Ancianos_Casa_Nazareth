import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import LocationMap from '../components/LocationMap'
import WazeButton from '../components/WazeButton'


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

  // Coordenadas
  const lat = 9.9674426
  const lng = -84.0554902

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--color-secondary)', textAlign: 'center', marginBottom: '1rem' }}>
        Cómo Llegar <FontAwesomeIcon icon={faMapLocationDot} />
      </h1>

      <div style={{ marginBottom: '1rem' }}>
        <LocationMap />
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <WazeButton lat={lat} lng={lng} />
      </div>
    </div>
  )
}