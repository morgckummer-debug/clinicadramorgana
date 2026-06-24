import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface PacienteAguardando {
  id: string
  nome: string
}

interface AguardandoRespostaPopupProps {
  pacientes: PacienteAguardando[]
  onDismiss: () => void
}

export function AguardandoRespostaPopup({ pacientes, onDismiss }: AguardandoRespostaPopupProps) {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm mx-4 p-6">
        <div className="flex items-start justify-between mb-1">
          <h2 className="font-comfortaa text-wine-deep text-lg font-light">Lembrete</h2>
          <button
            onClick={onDismiss}
            className="text-muted-foreground hover:text-wine-deep transition-colors mt-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-muted-foreground text-xs mb-5 leading-relaxed">
          {pacientes.length === 1
            ? 'O paciente abaixo ainda aguarda resposta sua.'
            : `${pacientes.length} pacientes ainda aguardam resposta sua.`}
        </p>

        <div className="space-y-2 mb-5">
          {pacientes.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-2xl border border-border/50 px-4 py-3"
            >
              <span className="text-sm text-wine-deep font-medium truncate mr-3">{p.nome}</span>
              <button
                onClick={() => { onDismiss(); navigate(`/painel/${p.id}`) }}
                className="flex-shrink-0 text-[10px] tracking-[0.15em] uppercase font-bold px-3 py-1.5 rounded-full transition-all duration-300"
                style={{ backgroundColor: '#FDDCB5', color: '#5B2D8E', border: '1px solid #5B2D8E' }}
              >
                Abrir
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onDismiss}
          className="w-full py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-medium text-muted-foreground border border-border hover:border-wine-deep/30 hover:text-wine-deep transition-all duration-300"
        >
          Lembrar em 10 minutos
        </button>
      </div>
    </div>
  )
}
