import { useState, useEffect } from 'react'

export default function useFavoritos() {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoritos')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
  }, [favoritos])

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  const esFavorito = (id) => favoritos.includes(id)

  return { favoritos, toggleFavorito, esFavorito }
}