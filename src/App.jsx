import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Listado from './pages/Listado'
import Detalle from './pages/Detalle'
import Mapa from './pages/Mapa'
import Registro from './pages/Registro'
import NotFound from './pages/NotFound'
import './styles/footer.css'

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F2EC] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurantes" element={<Listado />} />
          <Route path="/restaurantes/:id" element={<Detalle />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}