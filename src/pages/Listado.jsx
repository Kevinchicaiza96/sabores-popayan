import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import restaurantes from '../data/restaurants.json'
import SkeletonTarjeta from '../components/SkeletonTarjeta'
import TarjetaRestaurante from '../components/TarjetaRestaurante'
import useFavoritos from '../hooks/useFavoritos'
import useSEO from '../hooks/useSEO'
import useGeolocalizacion from '../hooks/useGeolocalizacion'
import { calcularDistancia } from '../utils/distancia'
import '../styles/listado.css'

const categorias = ['Todas', 'Comida Típica', 'Café', 'Panadería', 'Postres', 'Contemporánea']
const precios = ['Todos', '$', '$$', '$$$']
const ordenes = [
  { valor: 'ninguno', label: 'Relevancia' },
  { valor: 'rating_desc', label: '⭐ Mayor rating' },
  { valor: 'rating_asc', label: '⭐ Menor rating' },
  { valor: 'precio_asc', label: '💰 Menor precio' },
  { valor: 'precio_desc', label: '💰 Mayor precio' },
  { valor: 'nombre_asc', label: '🔤 A → Z' },
  { valor: 'nombre_desc', label: '🔤 Z → A' },
  { valor: 'cercano', label: '📍 Más cercano' },
]

const precioValor = { '$': 1, '$$': 2, '$$$': 3 }

export default function Listado() {
  useSEO({
    titulo: 'Restaurantes',
    descripcion: 'Explora todos los restaurantes y cafés de Popayán. Filtra por categoría, precio y más.'
  })

  const [searchParams] = useSearchParams()
  const { favoritos } = useFavoritos()
  const { estado, coordenadas, error, obtenerUbicacion } = useGeolocalizacion()

  const [categoriaActiva, setCategoriaActiva] = useState(
    searchParams.get('categoria') || 'Todas'
  )
  const [precioActivo, setPrecioActivo] = useState('Todos')
  const [busqueda, setBusqueda] = useState(
    searchParams.get('q') || ''
  )
  const [verFavoritos, setVerFavoritos] = useState(false)
  const [ordenActivo, setOrdenActivo] = useState('ninguno')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setCargando(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (coordenadas) {
      setTimeout(() => setOrdenActivo('cercano'), 0)
    }
  }, [coordenadas])

  const filtrados = useMemo(() => {
    let resultado = restaurantes.filter((r) => {
      const matchCategoria = categoriaActiva === 'Todas' || r.categoria === categoriaActiva
      const matchPrecio = precioActivo === 'Todos' || r.precio === precioActivo
      const matchBusqueda = busqueda === '' ||
        r.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        r.tags.some(t => t.toLowerCase().includes(busqueda.toLowerCase()))
      const matchFavorito = !verFavoritos || favoritos.includes(r.id)
      return matchCategoria && matchPrecio && matchBusqueda && matchFavorito
    })

    switch (ordenActivo) {
      case 'rating_desc':
        return [...resultado].sort((a, b) => b.rating - a.rating)
      case 'rating_asc':
        return [...resultado].sort((a, b) => a.rating - b.rating)
      case 'precio_asc':
        return [...resultado].sort((a, b) => precioValor[a.precio] - precioValor[b.precio])
      case 'precio_desc':
        return [...resultado].sort((a, b) => precioValor[b.precio] - precioValor[a.precio])
      case 'nombre_asc':
        return [...resultado].sort((a, b) => a.nombre.localeCompare(b.nombre))
      case 'nombre_desc':
        return [...resultado].sort((a, b) => b.nombre.localeCompare(a.nombre))
      case 'cercano':
        if (!coordenadas) return resultado
        return [...resultado].sort((a, b) => {
          const dA = parseFloat(calcularDistancia(coordenadas.lat, coordenadas.lng, a.lat, a.lng))
          const dB = parseFloat(calcularDistancia(coordenadas.lat, coordenadas.lng, b.lat, b.lng))
          return dA - dB
        })
      default:
        return resultado
    }
  }, [categoriaActiva, precioActivo, busqueda, verFavoritos, favoritos, ordenActivo, coordenadas])

  return (
    <div className="listado">
      <div className="filtros">
        <div className="filtros__inner">
          <div className="filtros__top">
            <input
              className="filtros__busqueda"
              type="text"
              placeholder="Buscar restaurante o plato..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button
              className={`filtros__favbtn ${verFavoritos ? 'filtros__favbtn--activo' : ''}`}
              onClick={() => setVerFavoritos(!verFavoritos)}
            >
              {verFavoritos ? '♥' : '♡'} Favoritos
              {favoritos.length > 0 && (
                <span className="filtros__favcount">{favoritos.length}</span>
              )}
            </button>
            <button
              className={`filtros__geobtn ${estado === 'exito' ? 'filtros__geobtn--activo' : ''}`}
              onClick={obtenerUbicacion}
              title="Ordenar por distancia"
            >
              {estado === 'cargando' ? '...' : '📍'}
            </button>
          </div>

          {error && (
            <p className="filtros__error">{error}</p>
          )}

          {estado === 'exito' && (
            <p className="filtros__geo-ok">
              📍 Mostrando restaurantes por distancia desde tu ubicación
            </p>
          )}

          <div className="filtros__grupo">
            <span className="filtros__label">Categoría</span>
            <div className="filtros__pills">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  className={'pill' + (categoriaActiva === cat ? ' pill--activa' : '')}
                  onClick={() => setCategoriaActiva(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filtros__grupo">
            <span className="filtros__label">Precio</span>
            <div className="filtros__pills">
              {precios.map((p) => (
                <button
                  key={p}
                  className={'pill' + (precioActivo === p ? ' pill--activa' : '')}
                  onClick={() => setPrecioActivo(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="filtros__grupo">
            <span className="filtros__label">Ordenar</span>
            <select
              className="filtros__select"
              value={ordenActivo}
              onChange={(e) => setOrdenActivo(e.target.value)}
            >
              {ordenes.map((o) => (
                <option key={o.valor} value={o.valor}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="listado__content">
        <p className="listado__conteo">
          {verFavoritos ? '♥ Tus favoritos — ' : ''}
          {cargando ? '...' : filtrados.length + ' ' + (filtrados.length === 1 ? 'lugar encontrado' : 'lugares encontrados')}
        </p>

        {filtrados.length === 0 && !cargando ? (
          <div className="listado__vacio">
            <p>{verFavoritos ? 'No tienes favoritos aún. ¡Guarda algunos!' : 'No encontramos resultados.'}</p>
            <button onClick={() => {
              setCategoriaActiva('Todas')
              setBusqueda('')
              setPrecioActivo('Todos')
              setVerFavoritos(false)
              setOrdenActivo('ninguno')
            }}>
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="listado__grid">
            {cargando
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonTarjeta key={i} />
                ))
              : filtrados.map((r, index) => (
                  <TarjetaRestaurante
                    key={r.id}
                    r={r}
                    index={index}
                    distancia={coordenadas
                      ? calcularDistancia(coordenadas.lat, coordenadas.lng, r.lat, r.lng)
                      : null}
                  />
                ))
            }
          </div>
        )}
      </div>
    </div>
  )
}