const DEFAULT_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.597067032093!2d-84.0554902!3d9.9674426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e4593c75a6a5%3A0x23d71b88c2ab0f7b!2sHogar%20de%20Ancianos%20Casa%20Nazareth!5e0!3m2!1ses-419!2scr!4v1758232324720!5m2!1ses-419!2scr"

interface LocationMapProps {
  src?: string
  height?: string | number
  title?: string
}

export default function LocationMap({ src = DEFAULT_EMBED_URL, height = '420', title = 'Mapa' }: LocationMapProps) {
  return (
    <iframe
      src={src}
      width="100%"
      height={String(height)}
      style={{ border: 0, borderRadius: '8px' }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={title}
    />
  )
}
