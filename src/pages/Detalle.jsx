import { useParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import restaurantes from '../data/restaurants.json'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import '../styles/detalle.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function Detalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const r = restaurantes.find((r) => r.id === parseInt(id))

  if (!r) return (
    <div className="detalle__notfound">
      <p>Restaurante no encontrado.</p>
      <button onClick={() => navigate('/restaurantes')}>Volver al listado</button>
    </div>
  )

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

          <div className="detalle__tags">
            {r.tags.map((tag) => (
              <span key={tag} className="detalle__tag">#{tag}</span>
            ))}
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