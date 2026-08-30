
import { useState, useEffect } from "react"

export function useLicencia(activar) {
  const [estado, setEstado] = useState({ cargando: activar, activo: true })

  useEffect(() => {
    if (!activar) return

    async function verificar() {
      try {
        const res = await fetch(import.meta.env.VITE_FLEX_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ api_key: import.meta.env.VITE_FLEX_API_KEY }),
        })
        const data = await res.json()

        setEstado({ cargando: false, activo: data.activo !== false })
      } catch (err) {
        // Si falla la conexión con FlexManager, no bloqueamos por precaución
        setEstado({ cargando: false, activo: true })
      }
    }
    verificar()
  }, [activar])

  return estado
}
