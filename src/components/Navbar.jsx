import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../styles/navbar.css'

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const linkClass = ({ isActive }) =>
    'navbar__link' + (isActive ? ' navbar__link--active' : '')

  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" onClick={cerrarMenu}>
          <div className="navbar__logo-icon">SP</div>
          <span className="navbar__logo-text">
            Sabores <span>Popayán</span>
          </span>
        </Link>

        {/* Links desktop */}
        <div className="navbar__links">
          <NavLink to="/" end className={linkClass}>Inicio</NavLink>
          <NavLink to="/restaurantes" className={linkClass}>Restaurantes</NavLink>
          <NavLink to="/mapa" className={linkClass}>Mapa</NavLink>
          <NavLink to="/registro" className={linkClass}>Registrar lugar</NavLink>
        </div>

        {/* Botón hamburguesa */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Menú"
        >
          <span className={`navbar__ham-line ${menuAbierto ? 'navbar__ham-line--1-open' : ''}`} />
          <span className={`navbar__ham-line ${menuAbierto ? 'navbar__ham-line--2-open' : ''}`} />
          <span className={`navbar__ham-line ${menuAbierto ? 'navbar__ham-line--3-open' : ''}`} />
        </button>
      </div>

      {/* Menú móvil */}
      <div className={`navbar__mobile ${menuAbierto ? 'navbar__mobile--abierto' : ''}`}>
        <NavLink to="/" end className={linkClass} onClick={cerrarMenu}>Inicio</NavLink>
        <NavLink to="/restaurantes" className={linkClass} onClick={cerrarMenu}>Restaurantes</NavLink>
        <NavLink to="/mapa" className={linkClass} onClick={cerrarMenu}>Mapa</NavLink>
        <NavLink to="/registro" className={linkClass} onClick={cerrarMenu}>Registrar lugar</NavLink>
      </div>
    </nav>
  )
}