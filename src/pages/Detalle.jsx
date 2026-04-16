import { useParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import restaurantes from '../data/restaurants.json'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import '../styles/detalle.css'

// Fix iconos Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function Detalle() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Más robusto (evita errores si cambia el tipo)
  const r = restaurantes.find((r) => String(r.id) === String(id))

  if (!r) {
    return (
      <div className="detalle__notfound">
        <p>Restaurante no encontrado.</p>
        <button onClick={() => navigate('/restaurantes')}>
          Volver al listado
        </button>
      </div>
    )
  }

  return (
    <div className="detalle">

      {/* Header imagen */}
      <div className="detalle__hero">
        <img src={r.imagen} alt={r.nombre} className="detalle__hero-img" />
        <div className="detalle__hero-overlay">
          <button className="detalle__back" onClick={() => navigate(-1)}>
            ← Volver
          </button>

          <div className="detalle__hero-info">
            <span className="detalle__categoria">{r.categoria}</span>
            <h1 className="detalle__nombre">{r.nombre}</h1>

            <div className="detalle__meta">
              <span>★ {r.rating}</span>
              <span>{r.precio}</span>
              <span>{r.horario}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="detalle__content">

        {/* Info principal */}
        <div className="detalle__main">
          <p className="detalle__descripcion">{r.descripcion}</p>

          <div className="detalle__datos">
            <div className="detalle__dato">
              <span className="detalle__dato-icon">📍</span>
              <div>
                <p className="detalle__dato-label">Dirección</p>
                <p className="detalle__dato-valor">{r.direccion}</p>
              </div>
            </div>

            <div className="detalle__dato">
              <span className="detalle__dato-icon">📞</span>
              <div>
                <p className="detalle__dato-label">Teléfono</p>
                <p className="detalle__dato-valor">{r.telefono}</p>
              </div>
            </div>

            <div className="detalle__dato">
              <span className="detalle__dato-icon">🕐</span>
              <div>
                <p className="detalle__dato-label">Horario</p>
                <p className="detalle__dato-valor">{r.horario}</p>
              </div>
            </div>

            <div className="detalle__dato">
              <span className="detalle__dato-icon">💰</span>
              <div>
                <p className="detalle__dato-label">Precio promedio</p>
                <p className="detalle__dato-valor">{r.precio}</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="detalle__tags">
            {r.tags.map((tag) => (
              <span key={tag} className="detalle__tag">
                #{tag}
              </span>
            ))}
          </div>

          {/* Compartir */}
          <div className="detalle__compartir">
            <a
              className="detalle__whatsapp"
              href={`https://wa.me/?text=🍽 *${r.nombre}* — ${r.categoria}%0A📍 ${r.direccion}%0A⭐ ${r.rating} | ${r.precio}%0A%0AEncuéntralo en Sabores Popayán:%0Ahttps://sabores-popayan.vercel.app/restaurantes/${r.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Compartir por WhatsApp
            </a>
          </div>
        </div>

        {/* Mapa */}
        <div className="detalle__mapa-wrap">
          <h2 className="detalle__mapa-titulo">Ubicación</h2>

          <MapContainer
            center={[r.lat, r.lng]}
            zoom={16}
            className="detalle__mapa"
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap"
            />
            <Marker position={[r.lat, r.lng]}>
              <Popup>{r.nombre}</Popup>
            </Marker>
          </MapContainer>
        </div>

      </div>
    </div>
  )
}