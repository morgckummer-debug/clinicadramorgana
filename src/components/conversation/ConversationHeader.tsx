import { useNavigate } from 'react-router-dom'
import logoClinica from '@/assets/logo-clinica.png'

export function ConversationHeader() {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between mb-7">
      <a href="https://clinicadramorgana.lovable.app" target="_blank" rel="noopener noreferrer">
        <img src={logoClinica} alt="Clínica de Ultrassom Dra. Morgana Kummer" className="h-14 w-auto" />
      </a>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-wine-deep transition-colors duration-300 bg-none border-none cursor-pointer"
        >
          Voltar
        </button>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse-soft" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
            Assistente MK
          </span>
        </div>
      </div>
    </div>
  )
}
