import { useEffect } from 'react'

export default function useSEO({ titulo, descripcion }) {
  useEffect(() => {
    document.title = titulo
      ? `${titulo} — Sabores Popayán`
      : 'Sabores Popayán — Restaurantes y Cafés de La Ciudad Blanca'

    const meta = document.querySelector('meta[name="description"]')
    if (meta && descripcion) {
      meta.setAttribute('content', descripcion)
    }
  }, [titulo, descripcion])
}