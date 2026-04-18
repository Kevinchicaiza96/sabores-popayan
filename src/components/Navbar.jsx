import { Link, NavLink } from 'react-router-dom'
import '../styles/navbar.css'

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    'navbar__link' + (isActive ? ' navbar__link--active' : '')

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
          <NavLink to="/" end className={linkClass}>Inicio</NavLink>
          <NavLink to="/restaurantes" className={linkClass}>Restaurantes</NavLink>
          <NavLink to="/mapa" className={linkClass}>Mapa</NavLink>
          <NavLink to="/registro" className={linkClass}>Registrar lugar</NavLink>
        </div>
      </div>
    </nav>
  )
}