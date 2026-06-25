import { Bell, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

interface NewPreAgendamentoAlertProps {
  pacienteNome: string
  exame: string
  preAgendamentoId: string
  onDismiss: () => void
}

export function NewPreAgendamentoAlert({
  pacienteNome,
  exame,
  preAgendamentoId,
  onDismiss,
}: NewPreAgendamentoAlertProps) {
  const navigate = useNavigate()

  useEffect(() => {
    // Auto-dismiss após 8 segundos se não interagir
    const timer = setTimeout(onDismiss, 8000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .pulse-alert {
          animation: blink 0.6s ease-in-out infinite;
        }
      `}</style>

      <div className="pulse-alert bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-2xl w-full max-w-md mx-4 p-8 border-2 border-amber-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0 animate-pulse">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-comfortaa text-wine-deep text-xl font-light">Novo Paciente!</h2>
          </div>
          <button
            onClick={onDismiss}
            className="text-muted-foreground hover:text-wine-deep transition-colors mt-0.5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white rounded-2xl p-5 mb-5 border border-amber-100">
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Paciente</p>
          <p className="text-wine-deep font-semibold text-lg mb-4">{pacienteNome}</p>

          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Exame</p>
          <p className="text-wine-deep text-sm">{exame || 'Não informado'}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              navigate(`/painel/${preAgendamentoId}`)
              onDismiss()
            }}
            className="flex-1 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-300"
            style={{ backgroundColor: '#5B2D8E', color: 'white' }}
          >
            Abrir Agora
          </button>
          <button
            onClick={onDismiss}
            className="flex-1 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-medium text-muted-foreground border border-border hover:border-wine-deep/30 hover:text-wine-deep transition-all duration-300"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
