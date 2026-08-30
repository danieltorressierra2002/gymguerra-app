
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import Login from "./components/Login"
import AdminDashboard from "./components/AdminDashboard"
import UserDashboard from "./components/UserDashboard"
import PaginaPublica from "./components/PaginaPublica"
import { useState } from "react"
import { useLicencia } from "./hooks/useLicencia"

function AppContent() {
  const { user, perfil, cargando, esAdmin, esUsuario } = useAuth()
  const [mostrarLogin, setMostrarLogin] = useState(false)
  const licencia = useLicencia(esAdmin)

  if (cargando) {

    return (
      <div className="min-h-screen bg-carbon flex items-center justify-center">
        <p className="text-bone-dim font-display tracking-wide">Cargando...</p>
      </div>
    )
  }

  if (!user) {
    if (mostrarLogin) return <Login onVolver={() => setMostrarLogin(false)} />
    return <PaginaPublica onLogin={() => setMostrarLogin(true)} />
  }

  if (!perfil) {
    return (
      <div className="min-h-screen bg-carbon flex items-center justify-center px-4 text-center">

        <p className="text-bone-dim">Tu cuenta no tiene perfil asignado. Contacta al administrador.</p>
      </div>
    )
  }

  if (esAdmin) {
    if (licencia.cargando) {
      return (
        <div className="min-h-screen bg-carbon flex items-center justify-center">
          <p className="text-bone-dim font-display tracking-wide">Verificando licencia...</p>
        </div>
      )
    }
    if (!licencia.activo) {
      return (
        <div className="min-h-screen bg-

carbon flex items-center justify-center px-4 text-center">
          <div className="space-y-3">
            <p className="text-blood-glow font-display text-xl uppercase tracking-wide">Licencia inactiva</p>
            <p className="text-bone-dim">El acceso al panel de administración está suspendido. Contacta a FlexManager para regularizar tu licencia.</p>
          </div>
        </div>
      )
    }
    return <AdminDashboard />
  }

  if (esUsuario) return <UserDashboard />

  return (
    <div className="min-h-screen bg-

carbon flex items-center justify-center px-4 text-center">
      <p className="text-bone-dim">Rol no reconocido.</p>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
