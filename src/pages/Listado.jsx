import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import restaurantes from '../data/restaurants.json'
import TarjetaRestaurante from '../components/TarjetaRestaurante'
import useFavoritos from '../hooks/useFavoritos'
import '../styles/listado.css'

const categorias = ['Todas', 'Comida Típica', 'Café', 'Panadería', 'Postres', 'Contemporánea']
const precios = ['Todos', '$', '$$', '$$$']

export default function Listado() {
  const [searchParams] = useSearchParams()
  const { favoritos } = useFavoritos()

  const [categoriaActiva, setCategoriaActiva] = useState(
    searchParams.get('categoria') || 'Todas'
  )
  const [precioActivo, setPrecioActivo] = useState('Todos')
  const [busqueda, setBusqueda] = useState(
    searchParams.get('q') || ''
  )
  const [verFavoritos, setVerFavoritos] = useState(false)

  const filtrados = useMemo(() => {
    return restaurantes.filter((r) => {
      const matchCategoria = categoriaActiva === 'Todas' || r.categoria === categoriaActiva
      const matchPrecio = precioActivo === 'Todos' || r.precio === precioActivo
      const matchBusqueda = busqueda === '' ||
        r.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        r.tags.some(t => t.toLowerCase().includes(busqueda.toLowerCase()))
      const matchFavorito = !verFavoritos || favoritos.includes(r.id)
      return matchCategoria && matchPrecio && matchBusqueda && matchFavorito
    })
  }, [categoriaActiva, precioActivo, busqueda, verFavoritos, favoritos])

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
          </div>
          <div className="filtros__grupo">
            <span className="filtros__label">Categoría</span>
            <div className="filtros__pills">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  className={`pill ${categoriaActiva === cat ? 'pill--activa' : ''}`}
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
                  className={`pill ${precioActivo === p ? 'pill--activa' : ''}`}
                  onClick={() => setPrecioActivo(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="listado__content">
        <p className="listado__conteo">
          {verFavoritos ? '♥ Tus favoritos — ' : ''}
          {filtrados.length} {filtrados.length === 1 ? 'lugar encontrado' : 'lugares encontrados'}
        </p>
        {filtrados.length === 0 ? (
          <div className="listado__vacio">
            <p>{verFavoritos ? 'No tienes favoritos aún. ¡Guarda algunos!' : 'No encontramos resultados.'}</p>
            <button onClick={() => {
              setCategoriaActiva('Todas')
              setBusqueda('')
              setPrecioActivo('Todos')
              setVerFavoritos(false)
            }}>
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="listado__grid">
            {filtrados.map((r, index) => (
              <TarjetaRestaurante key={r.id} r={r} index={index} />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}