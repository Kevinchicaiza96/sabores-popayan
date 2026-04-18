import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        <div className="footer__brand">
          <div className="footer__logo">
            <div className="footer__logo-circle">SP</div>
            <span className="footer__logo-texto">
              Sabores <span>Popayán</span>
            </span>
          </div>
          <p className="footer__desc">
            Descubre los mejores restaurantes, cafés y lugares gastronómicos
            de La Ciudad Blanca del Cauca.
          </p>
        </div>

        <div className="footer__links">
          <p className="footer__links-titulo">Explorar</p>
          <Link to="/" className="footer__link">Inicio</Link>
          <Link to="/restaurantes" className="footer__link">Restaurantes</Link>
          <Link to="/restaurantes?categoria=Café" className="footer__link">Cafés</Link>
          <Link to="/restaurantes?categoria=Comida Típica" className="footer__link">Comida típica</Link>
          <Link to="/mapa" className="footer__link">Mapa</Link>
          <Link to="/registro" className="footer__link">Registrar mi restaurante</Link>
        </div>

        <div className="footer__links">
          <p className="footer__links-titulo">Categorías</p>
          <Link to="/restaurantes?categoria=Panadería" className="footer__link">Panadería</Link>
          <Link to="/restaurantes?categoria=Postres" className="footer__link">Postres</Link>
          <Link to="/restaurantes?categoria=Contemporánea" className="footer__link">Contemporánea</Link>
          <Link to="/restaurantes?categoria=Mariscos" className="footer__link">Mariscos</Link>
        </div>

        <div className="footer__credits">
          <p className="footer__credits-titulo">El proyecto</p>
          <p className="footer__credits-texto">
            Hecho con amor por y para los popayanejos.
            Un directorio gastronómico de La Ciudad Blanca.
          </p>
          <div className="footer__badge">
            <span>🏛️</span>
            <span>Popayán, Cauca — Colombia</span>
          </div>
        </div>

      </div>

      <div className="footer__bottom">
        <p>© 2025 Sabores Popayán — Todos los derechos reservados</p>
        <p>Hecho con React + Vite</p>
      </div>
    </footer>
  )
}