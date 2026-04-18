import { useState } from 'react'

export default function useGeolocalizacion() {
  const [estado, setEstado] = useState('idle')
  const [coordenadas, setCoordenadas] = useState(null)
  const [error, setError] = useState(null)

  const obtenerUbicacion = () => {
    if (!navigator.geolocation) {
      setError('Tu navegador no soporta geolocalización')
      return
    }

    setEstado('cargando')

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoordenadas({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
        setEstado('exito')
      },
      () => {
        setError('No pudimos obtener tu ubicación')
        setEstado('error')
      }
    )
  }

  return { estado, coordenadas, error, obtenerUbicacion }
}