import { ArrowRight, CalendarDays, MapPin, FileText, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '@/contexts/LanguageContext'

const MAPS_URL =
  'https://www.google.com/maps?ll=-19.464006,-44.240331&z=18&t=m&hl=pt-BR&gl=US&mapclient=embed&q=R.+C%C3%A2ndido+Azeredo,+41a+-+Centro+Sete+Lagoas+-+MG+35700-019'
const WHATSAPP_URL = 'https://wa.me/5531993910212'

interface MenuOption {
  icon: React.ReactNode
  label: string
  description: string
  action: () => void
  highlight?: boolean
}

interface MenuScreenProps {
  onAgendar: () => void
}

export function MenuScreen({ onAgendar }: MenuScreenProps) {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const options: MenuOption[] = [
    {
      icon: <CalendarDays className="w-5 h-5" />,
      label: t.conversation.menu.option1,
      description: 'Preencha o formulário rápido e nossa equipe entra em contato.',
      action: onAgendar,
      highlight: true,
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: t.conversation.menu.option2,
      description: 'Veja nossa localização no mapa.',
      action: () => window.open(MAPS_URL, '_blank', 'noopener,noreferrer'),
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: t.conversation.menu.option3,
      description: 'Veja as orientações antes do seu exame.',
      action: () => navigate('/exames'),
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: t.conversation.menu.option4,
      description: 'Fale diretamente com nossa equipe pelo WhatsApp.',
      action: () => window.open(WHATSAPP_URL, 'whatsapp'),
    },
  ]

  return (
    <div className="animate-fade-up">
      <div className="mb-6 sm:mb-8">
        <h2 className="font-comfortaa text-wine-deep text-[clamp(1.2rem,4vw,1.8rem)] font-light leading-[1.2] mb-2">
          {t.conversation.menu.title}
        </h2>
        <p className="text-foreground/60 font-light text-xs sm:text-sm">
          {t.conversation.menu.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={opt.action}
            className={[
              'w-full flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-300 group',
              opt.highlight
                ? 'border-[#5B2D8E]/40 bg-white shadow-[0_2px_16px_rgba(91,45,142,0.08)] hover:shadow-[0_4px_20px_rgba(91,45,142,0.14)] hover:border-[#5B2D8E]/60'
                : 'border-border/50 bg-white hover:border-champagne/60 hover:shadow-soft',
            ].join(' ')}
          >
            <div
              className={[
                'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300',
                opt.highlight
                  ? 'bg-[#5B2D8E]/10 text-[#5B2D8E]'
                  : 'bg-champagne/20 text-wine-deep group-hover:bg-champagne/40',
              ].join(' ')}
            >
              {opt.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className={[
                'text-sm font-semibold leading-tight mb-0.5',
                opt.highlight ? 'text-[#5B2D8E]' : 'text-wine-deep',
              ].join(' ')}>
                {opt.label}
              </p>
              <p className="text-xs text-muted-foreground font-light leading-snug">
                {opt.description}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-wine-deep transition-colors duration-300 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}
