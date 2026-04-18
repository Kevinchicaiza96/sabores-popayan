import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSEO from '../hooks/useSEO'
import '../styles/home.css'

const categorias = [
  { nombre: 'Comida Típica', emoji: '🫔' },
  { nombre: 'Café', emoji: '☕' },
  { nombre: 'Mariscos', emoji: '🦞' },
  { nombre: 'Hamburguesas', emoji: '🍔' },
  { nombre: 'Italiano', emoji: '🍝' },
  { nombre: 'Japonés', emoji: '🍣' },
]

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
      navigate(`/restaurantes?q=${busqueda}`)
    } else {
      navigate('/restaurantes')
    }
  }

  return (
    <div className="home">
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

      <section className="categorias">
        <h2 className="categorias__titulo">Explorar por categoría</h2>
        <p className="categorias__subtitulo">¿Qué se te antoja hoy?</p>
        <div className="categorias__grid">
          {categorias.map((cat) => (
            <button
              key={cat.nombre}
              className="categoria-card"
              onClick={() => navigate(`/restaurantes?categoria=${cat.nombre}`)}
            >
              <div className="categoria-card__emoji">{cat.emoji}</div>
              <div className="categoria-card__nombre">{cat.nombre}</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}