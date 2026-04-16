import { useNavigate } from 'react-router-dom'
import useAnimateOnScroll from '../hooks/useAnimateOnScroll'
import useFavoritos from '../hooks/useFavoritos'

export default function TarjetaRestaurante({ r, index = 0 }) {
  const navigate = useNavigate()
  const { ref, visible } = useAnimateOnScroll(0.1)
  const { toggleFavorito, esFavorito } = useFavoritos()
  const favorito = esFavorito(r.id)

  return (
    <div
      ref={ref}
      className="tarjeta"
      onClick={() => navigate(`/restaurantes/${r.id}`)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.45s ease ${index * 0.08}s, transform 0.45s ease ${index * 0.08}s`,
      }}
    >
      <div className="tarjeta__img-wrap">
        <img src={r.imagen} alt={r.nombre} className="tarjeta__img" />
        <span className="tarjeta__precio">{r.precio}</span>

        <button
          className={`tarjeta__fav ${favorito ? 'tarjeta__fav--activo' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorito(r.id)
          }}
          title={favorito ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        >
          {favorito ? '♥' : '♡'}
        </button>
      </div>

      <div className="tarjeta__body">
        <span className="tarjeta__categoria">{r.categoria}</span>
        <h3 className="tarjeta__nombre">{r.nombre}</h3>
        <p className="tarjeta__descripcion">{r.descripcion}</p>
        <div className="tarjeta__footer">
          <span className="tarjeta__rating">★ {r.rating}</span>
          <span className="tarjeta__direccion">📍 {r.direccion.split(',')[0]}</span>
        </div>
      </div>
    </div>
  )
}