import { useEffect, useState } from 'react'

type ServiceNode = {
  name: string
  disponible?: boolean
  cantidad?: number
  descripcion?: string
  children?: ServiceNode[]
}
type ServicesResponse = { services: ServiceNode[] }

export default function Services() {
  const [services, setServices] = useState<ServiceNode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<string>("")
  const [selectedNode, setSelectedNode] = useState<ServiceNode | null>(null)

  useEffect(() => {
    fetch(`/api/services?ts=${Date.now()}`, { cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data: ServicesResponse) => {
        // Debug: inspect payload shape
        // eslint-disable-next-line no-console
        console.log('services payload', data)
        // Normalize data: support both array of strings and array of objects
        const raw = (data as any)?.services ?? []
        const normalizeNode = (n: any): ServiceNode => {
          if (typeof n === 'string') {
            return { name: n }
          }
          const rawChildren = (n as any).children ?? (n as any).Children
          const children = Array.isArray(rawChildren) ? rawChildren.map(normalizeNode) : undefined
          const node: ServiceNode = { name: n.name ?? String(n?.Name ?? '') }
          if (typeof n.disponible === 'boolean') node.disponible = n.disponible
          else if (typeof n?.Disponible === 'boolean') node.disponible = n.Disponible
          if (typeof n.cantidad === 'number') node.cantidad = n.cantidad
          else if (typeof n?.Cantidad === 'number') node.cantidad = n.Cantidad
          if (typeof n.descripcion === 'string') node.descripcion = n.descripcion
          else if (typeof n?.Descripcion === 'string') node.descripcion = n.Descripcion
          if (children) node.children = children
          return node
        }
        const normalized: ServiceNode[] = Array.isArray(raw) ? raw.map(normalizeNode) : []
        setServices(normalized)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching services:', err)
        setError('No se pudieron cargar los servicios')
        setLoading(false)
      })
  }, [])

  // No need to flatten currently; we render hierarchical options directly

  return (
    <div className="about-page">
      <div className="hero-card">
        <h1>Servicios</h1>
        <p>Use el menú para ver los servicios ofrecidos y disponibilidad (cupo/cantidad).</p>
      </div>

      <section style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="services-select" style={{ fontWeight: 600, color: 'var(--color-secondary)', marginRight: '0.5rem' }}>
          Servicios:
        </label>
        <select
          id="services-select"
          style={{ padding: '0.5rem 0.75rem', borderRadius: 8, border: '1px solid var(--color-tertiary)' }}
          value={selected}
          onChange={(e) => {
            const value = e.target.value
            setSelected(value)
            // Find selected node for details box
            let found: ServiceNode | null = null
            for (const s of services) {
              if (s.children && s.children.length) {
                for (const c of s.children) {
                  const v = `${s.name}::${c.name}`
                  if (v === value) { found = c; break }
                }
                if (found) break
              } else if (s.name === value) { found = s; break }
            }
            setSelectedNode(found)
          }}
        >
          <option value="">Seleccione un servicio…</option>
          {loading && <option>Cargando...</option>}
          {error && <option>{error}</option>}
          {!loading && !error && services.length === 0 && <option>No hay servicios</option>}
          {!loading && !error && (
            <>
              {services.map(s => (
                s.children && s.children.length ? (
                  <optgroup key={s.name} label={s.name}>
                    {s.children.map(c => {
                      const isUnavailable = c.disponible === false || (typeof c.cantidad === 'number' && c.cantidad === 0)
                      const status = isUnavailable ? 'No disponible' : (typeof c.cantidad === 'number') ? `Cantidad: ${c.cantidad}` : 'Disponible'
                      const value = `${s.name}::${c.name}`
                      return (
                        <option key={value} value={value}>
                          {(c.name || '(Sin nombre)')} — {status}
                        </option>
                      )
                    })}
                  </optgroup>
                ) : (
                  <option key={s.name} value={s.name}>
                    {(s.name || '(Sin nombre)')} — {((s.disponible === false) || (typeof s.cantidad === 'number' && s.cantidad === 0)) ? 'No disponible' : (typeof s.cantidad === 'number') ? `Cantidad: ${s.cantidad}` : 'Disponible'}
                  </option>
                )
              ))}
            </>
          )}
        </select>
      </section>

      {!loading && !error && selectedNode && (
        <div style={{
          border: '1px solid var(--color-tertiary)',
          borderRadius: 12,
          padding: '1rem',
          background: '#fff',
          boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
          maxWidth: 720
        }}>
          <h3 style={{ margin: 0, marginBottom: '0.25rem', color: 'var(--color-secondary)' }}>
            {selectedNode.name}
          </h3>
          <div style={{ color: 'var(--color-text-primary)' }}>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Disponibilidad:</strong> {(selectedNode.disponible === false || (typeof selectedNode.cantidad === 'number' && selectedNode.cantidad === 0)) ? 'No disponible' : 'Disponible'}
            </p>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Cantidad:</strong> {typeof selectedNode.cantidad === 'number' ? selectedNode.cantidad : 0}
            </p>
            {selectedNode.descripcion && (
              <p style={{ margin: '0.5rem 0 0' }}>
                <strong>Descripción:</strong> {selectedNode.descripcion}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
