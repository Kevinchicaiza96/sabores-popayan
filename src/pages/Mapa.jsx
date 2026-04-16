import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import restaurantes from '../data/restaurants.json'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import '../styles/mapa.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function Mapa() {
  const navigate = useNavigate()

  return (
    <div className="mapa-page">

      {/* Header */}
      <div className="mapa-page__header">
        <h1 className="mapa-page__titulo">Mapa de Sabores</h1>
        <p className="mapa-page__subtitulo">
          {restaurantes.length} lugares en Popayán
        </p>
      </div>

      {/* Mapa */}
      <MapContainer
        center={[2.4419, -76.6069]}
        zoom={15}
        className="mapa-page__map"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />
        {restaurantes.map((r) => (
          <Marker key={r.id} position={[r.lat, r.lng]}>
            <Popup>
              <div className="mapa-popup">
                <img src={r.imagen} alt={r.nombre} className="mapa-popup__img" />
                <div className="mapa-popup__body">
                  <span className="mapa-popup__categoria">{r.categoria}</span>
                  <p className="mapa-popup__nombre">{r.nombre}</p>
                  <p className="mapa-popup__meta">★ {r.rating} · {r.precio}</p>
                  <button
                    className="mapa-popup__btn"
                    onClick={() => navigate(`/restaurantes/${r.id}`)}
                  >
                    Ver detalle →
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

    </div>
  )
}