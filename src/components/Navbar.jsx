import { Link, NavLink } from 'react-router-dom'
import '../styles/navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-icon">SP</div>
          <span className="navbar__logo-text">
            Sabores <span>Popayán</span>
          </span>
        </Link>

        <div className="navbar__links">
          <NavLink to="/" end className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }>Inicio</NavLink>
          <NavLink to="/restaurantes" className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }>Restaurantes</NavLink>
          <NavLink to="/mapa" className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }>Mapa</NavLink>
        </div>
      </div>
    </nav>
  )
}