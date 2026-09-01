
import { useState } from "react"

export default function AdminFormModal({ onClose, onSave }) {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState("")

  async function manejarGuardar(e) {
    e.preventDefault()
    setError("")
    if (!nombre.trim() || !email.trim()) { setError("Nombre y correo son obligatorios."); return }
    setGuardando(true)
    try {
      await onSave({ nombre, email, rol: "admin", password: "gymguerra2026" })
    } catch (err) {

      setError(err.message || "Ocurrió un error al guardar.")
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-carbon-surface border border-steel/40 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[92vh] overflow-y-auto shadow-plate">
        <div className="sticky top-0 bg-carbon-surface border-b border-steel/30 px-5 py-4 flex items-center justify-between">
          <h2 className="font-display text-lg text-bone uppercase tracking-

wide">Agregar administrador</h2>
          <button onClick={onClose} className="text-bone-dim hover:text-bone p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={manejarGuardar} className="p-5 space-y-5">
          <div>
            <label className="block text-xs font-medium text-bone-dim uppercase tracking-wide mb-1.5">Nombre completo</label>
            <input required value={nombre} 

onChange={(e) => setNombre(e.target.value)} className="campo-input" placeholder="Ej. Carlos Pérez" />
          </div>
          <div>
            <label className="block text-xs font-medium text-bone-dim uppercase tracking-wide mb-1.5">Correo de acceso</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="campo-input" placeholder="carlos@gymguerra.com" />
          </div>
          <div className="bg-carbon-raised border border-steel/30 rounded-lg px-4 py-3">
            <p className="text-xs text-bone-dim">🔑 La contraseña será 

automáticamente <span className="text-forge-glow font-medium">gymguerra2026</span></p>
          </div>
          {error && <p className="text-sm text-blood-glow bg-blood/10 border border-blood/30 rounded-lg px-3 py-2">{error}</p>}
          <button type="submit" disabled={guardando} className="w-full bg-forge hover:bg-forge-glow disabled:opacity-50 text-carbon font-display font-semibold uppercase tracking-wide py-3 rounded-lg transition-all active:scale-[0.98]">
            {guardando ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>

  )
}
