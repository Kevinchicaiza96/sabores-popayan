import { useState } from 'react'
import useSEO from '../hooks/useSEO'
import '../styles/registro.css'

const categorias = ['Comida Típica', 'Café', 'Panadería', 'Postres', 'Contemporánea', 'Mariscos', 'Hamburguesas', 'Italiano', 'Japonés', 'Otro']
const precios = ['$ — Económico', '$$ — Moderado', '$$$ — Costoso']

export default function Registro() {
  useSEO({
    titulo: 'Registra tu restaurante',
    descripcion: 'Registra tu restaurante o café en el directorio gastronómico de Popayán.'
  })

  const [form, setForm] = useState({
    nombre: '',
    categoria: '',
    descripcion: '',
    direccion: '',
    telefono: '',
    horario: '',
    precio: '',
    instagram: '',
  })

  const [enviado, setEnviado] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const mensaje =
      '🍽 *Solicitud de registro — Sabores Popayán*\n\n' +
      '📌 *Nombre:* ' + form.nombre + '\n' +
      '🏷 *Categoría:* ' + form.categoria + '\n' +
      '📝 *Descripción:* ' + form.descripcion + '\n' +
      '📍 *Dirección:* ' + form.direccion + '\n' +
      '📞 *Teléfono:* ' + form.telefono + '\n' +
      '🕐 *Horario:* ' + form.horario + '\n' +
      '💰 *Precio:* ' + form.precio + '\n' +
      '📸 *Instagram:* ' + (form.instagram || 'No indicado')

    const url = 'https://wa.me/573XXXXXXXXX?text=' + encodeURIComponent(mensaje)
    window.open(url, '_blank')
    setEnviado(true)
  }

  const camposCompletos = form.nombre && form.categoria && form.descripcion && form.direccion && form.telefono && form.horario && form.precio

  return (
    <div className="registro">

      {/* Header */}
      <div className="registro__hero">
        <h1 className="registro__titulo">Registra tu restaurante</h1>
        <p className="registro__subtitulo">
          ¿Tienes un restaurante o café en Popayán? Aparece en el directorio gastronómico de La Ciudad Blanca.
        </p>
      </div>

      <div className="registro__content">

        {/* Beneficios */}
        <div className="registro__beneficios">
          <h2 className="registro__ben-titulo">¿Por qué registrarte?</h2>
          <div className="registro__ben-grid">
            <div className="registro__ben-item">
              <span className="registro__ben-icon">🗺️</span>
              <div>
                <p className="registro__ben-nombre">Aparece en el mapa</p>
                <p className="registro__ben-texto">Tu restaurante visible en el mapa interactivo de Popayán</p>
              </div>
            </div>
            <div className="registro__ben-item">
              <span className="registro__ben-icon">🔍</span>
              <div>
                <p className="registro__ben-nombre">Más clientes</p>
                <p className="registro__ben-texto">Miles de personas buscan dónde comer en Popayán</p>
              </div>
            </div>
            <div className="registro__ben-item">
              <span className="registro__ben-icon">📱</span>
              <div>
                <p className="registro__ben-nombre">Fácil de compartir</p>
                <p className="registro__ben-texto">Tus clientes pueden compartir tu restaurante por WhatsApp</p>
              </div>
            </div>
            <div className="registro__ben-item">
              <span className="registro__ben-icon">✅</span>
              <div>
                <p className="registro__ben-nombre">Totalmente gratis</p>
                <p className="registro__ben-texto">Sin costo, sin contratos, sin complicaciones</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="registro__form-wrap">
          {enviado ? (
            <div className="registro__exito">
              <div className="registro__exito-icon">🎉</div>
              <h3>¡Solicitud enviada!</h3>
              <p>Te contactaremos pronto para confirmar tu registro en Sabores Popayán.</p>
              <button onClick={() => setEnviado(false)}>
                Enviar otro registro
              </button>
            </div>
          ) : (
            <form className="registro__form" onSubmit={handleSubmit}>
              <h2 className="registro__form-titulo">Datos del lugar</h2>

              <div className="registro__campo">
                <label className="registro__label">Nombre del restaurante *</label>
                <input
                  className="registro__input"
                  type="text"
                  name="nombre"
                  placeholder="Ej: Café Colonial La Merced"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="registro__campo">
                <label className="registro__label">Categoría *</label>
                <select
                  className="registro__input"
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="registro__campo">
                <label className="registro__label">Descripción *</label>
                <textarea
                  className="registro__input registro__textarea"
                  name="descripcion"
                  placeholder="Cuéntanos qué hace especial a tu lugar..."
                  value={form.descripcion}
                  onChange={handleChange}
                  required
                  rows={3}
                />
              </div>

              <div className="registro__campo">
                <label className="registro__label">Dirección *</label>
                <input
                  className="registro__input"
                  type="text"
                  name="direccion"
                  placeholder="Ej: Calle 5 # 6-23, Centro Histórico"
                  value={form.direccion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="registro__fila">
                <div className="registro__campo">
                  <label className="registro__label">Teléfono / WhatsApp *</label>
                  <input
                    className="registro__input"
                    type="tel"
                    name="telefono"
                    placeholder="Ej: 3001234567"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="registro__campo">
                  <label className="registro__label">Rango de precio *</label>
                  <select
                    className="registro__input"
                    name="precio"
                    value={form.precio}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona</option>
                    {precios.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="registro__campo">
                <label className="registro__label">Horario de atención *</label>
                <input
                  className="registro__input"
                  type="text"
                  name="horario"
                  placeholder="Ej: Lun-Sab 8:00-20:00"
                  value={form.horario}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="registro__campo">
                <label className="registro__label">Instagram (opcional)</label>
                <input
                  className="registro__input"
                  type="text"
                  name="instagram"
                  placeholder="Ej: @micafe.popayan"
                  value={form.instagram}
                  onChange={handleChange}
                />
              </div>

              <button
                className="registro__btn"
                type="submit"
                disabled={!camposCompletos}
              >
                Enviar por WhatsApp
              </button>

              <p className="registro__nota">
                Al enviar se abrirá WhatsApp con tus datos. Revisamos cada solicitud y te confirmamos en menos de 24 horas.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}