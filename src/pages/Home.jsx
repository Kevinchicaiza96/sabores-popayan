import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSEO from '../hooks/useSEO'
import restaurantes from '../data/restaurants.json'
import '../styles/home.css'

const categorias = [
  { nombre: 'Comida Típica', emoji: '🫔' },
  { nombre: 'Café', emoji: '☕' },
  { nombre: 'Mariscos', emoji: '🦞' },
  { nombre: 'Hamburguesas', emoji: '🍔' },
  { nombre: 'Italiano', emoji: '🍝' },
  { nombre: 'Japonés', emoji: '🍣' },
]

const destacados = [...restaurantes]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 3)

export default function Home() {
  useSEO({
    titulo: 'Inicio',
    descripcion: 'Descubre los mejores restaurantes, cafés y lugares gastronómicos de Popayán, La Ciudad Blanca del Cauca.'
  })

  const [busqueda, setBusqueda] = useState('')
  const navigate = useNavigate()

  const handleBuscar = (e) => {
    e.preventDefault()
    if (busqueda.trim()) {
      navigate('/restaurantes?q=' + busqueda)
    } else {
      navigate('/restaurantes')
    }
  }

  return (
    <div className="home">

      {/* Hero */}
      <section className="hero">
        <p className="hero__label">La Ciudad Blanca</p>
        <h1 className="hero__title">
          Descubre los<br />
          <span>Sabores de Popayán</span>
        </h1>
        <p className="hero__subtitle">
          Restaurantes, cafés y lugares únicos de la capital del Cauca
        </p>
        <form className="hero__form" onSubmit={handleBuscar}>
          <input
            className="hero__input"
            type="text"
            placeholder="Busca un restaurante o categoría..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="hero__btn" type="submit">Buscar</button>
        </form>
      </section>

      {/* Destacados */}
      <section className="destacados">
        <div className="destacados__inner">
          <div className="destacados__header">
            <div>
              <h2 className="destacados__titulo">Lugares destacados</h2>
              <p className="destacados__subtitulo">Los mejor calificados por nuestra comunidad</p>
            </div>
            <button
              className="destacados__ver-todos"
              onClick={() => navigate('/restaurantes?orden=rating_desc')}
            >
              Ver todos →
            </button>
          </div>

          <div className="destacados__grid">
            {destacados.map((r, index) => (
              <div
                key={r.id}
                className="destacado-card"
                onClick={() => navigate('/restaurantes/' + r.id)}
              >
                {index === 0 && (
                  <div className="destacado-card__badge">⭐ Mejor calificado</div>
                )}
                <div className="destacado-card__img-wrap">
                  <img src={r.imagen} alt={r.nombre} className="destacado-card__img" />
                </div>
                <div className="destacado-card__body">
                  <span className="destacado-card__categoria">{r.categoria}</span>
                  <h3 className="destacado-card__nombre">{r.nombre}</h3>
                  <p className="destacado-card__descripcion">{r.descripcion}</p>
                  <div className="destacado-card__footer">
                    <span className="destacado-card__rating">★ {r.rating}</span>
                    <span className="destacado-card__precio">{r.precio}</span>
                    <span className="destacado-card__direccion">
                      📍 {r.direccion.split(',')[0]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="categorias">
        <h2 className="categorias__titulo">Explorar por categoría</h2>
        <p className="categorias__subtitulo">¿Qué se te antoja hoy?</p>
        <div className="categorias__grid">
          {categorias.map((cat) => (
            <button
              key={cat.nombre}
              className="categoria-card"
              onClick={() => navigate('/restaurantes?categoria=' + cat.nombre)}
            >
              <div className="categoria-card__emoji">{cat.emoji}</div>
              <div className="categoria-card__nombre">{cat.nombre}</div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta__inner">
          <h2 className="cta__titulo">¿Conoces un lugar increíble?</h2>
          <p className="cta__texto">
            Ayúdanos a crecer el directorio de Popayán. Registra tu restaurante o recomienda un lugar.
          </p>
          <button
            className="cta__btn"
            onClick={() => navigate('/restaurantes')}
          >
            Explorar todos los lugares
          </button>
        </div>
      </section>

    </div>
  )
}