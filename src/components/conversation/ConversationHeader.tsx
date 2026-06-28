import { useNavigate } from 'react-router-dom'
import { useLanguage } from '@/contexts/LanguageContext'
import logoClinica from '@/assets/logo-clinica.webp'

export function ConversationHeader() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <div className="flex items-center justify-between mb-7">
      <a href="/" >
        <img src={logoClinica} alt="Clínica de Ultrassom Dra. Morgana Kummer" className="h-14 w-auto" />
      </a>

      <button
        onClick={() => navigate(-1)}
        className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-wine-deep transition-colors duration-300 bg-none border-none cursor-pointer"
      >
        {t.common.back}
      </button>
    </div>
  )
}
