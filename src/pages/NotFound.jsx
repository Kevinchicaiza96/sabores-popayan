import { useNavigate } from "react-router-dom"
import '../styles/notfound.css'

export default function NotFound() {
    const navigate = useNavigate()

    return(
        <div className="notfound">
            <div className="notfound__inner">

                <div className="notfound__codigo">404</div>
                <div className="notfound__icono">🏛️</div>
                <h1 className="notfound__titulo">
                    Esta página no existe
                </h1>
                <p className="notfound__texto">
                    Parece que te perdiste en las calles del centro histórico.<br />
          La página que buscas no está en nuestro mapa.                    
                </p>

                <div className="notfound__acciones">
                    <button
                        className="notfound__btn notfound__btn--primary"
                        onClick={() => navigate('/')}
                    >
                        Ir al inicio
                    </button>
                    <button 
                        className="notfound__btn notfound__btn--secondary"
                        onCanPlay={() => navigate ('/restaurantes')}
                    >
                        Ver restaurantes
                    </button>
                    <button
                        className="notfound__btn notfound__btn--ghost"
                        onClick={() => navigate(-1)}
                    >
                        ← Volver atrás
                    </button>
                </div>
            </div>
        </div>
    )
}