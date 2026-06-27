import { ArrowRight, Clock } from 'lucide-react'
import { ConversationFlow } from '@/data/conversation/preAgendamento'
import { useLanguage } from '@/contexts/LanguageContext'

interface WelcomeScreenProps {
  flow: ConversationFlow
  onStart: () => void
}

const welcomeText = {
  pt: {
    greeting: <>Olá!<br />Sou a Assistente Virtual MK.</>,
    body: 'Vou coletar algumas informações para facilitar seu atendimento. Nossa equipe analisará tudo antes de entrar em contato, ok?',
    timeLabel: 'Tempo estimado',
    start: 'Começar',
    privacy: <>Suas informações são tratadas com total sigilo.<br />Nenhum dado é compartilhado sem sua autorização.</>,
  },
  en: {
    greeting: <>Hello!<br />I'm MK, your Virtual Assistant.</>,
    body: "I'll collect some information to make your care easier. Our team will review everything before getting in touch, ok?",
    timeLabel: 'Estimated time',
    start: 'Get started',
    privacy: <>Your information is handled with complete confidentiality.<br />No data is shared without your authorisation.</>,
  },
  es: {
    greeting: <>¡Hola!<br />Soy MK, tu Asistente Virtual.</>,
    body: 'Voy a recopilar algunos datos para facilitar tu atención. Nuestro equipo revisará todo antes de ponerse en contacto contigo, ¿de acuerdo?',
    timeLabel: 'Tiempo estimado',
    start: 'Comenzar',
    privacy: <>Tu información se trata con total confidencialidad.<br />Ningún dato se comparte sin tu autorización.</>,
  },
}

export function WelcomeScreen({ flow, onStart }: WelcomeScreenProps) {
  const { lang } = useLanguage()
  const text = welcomeText[lang as keyof typeof welcomeText] ?? welcomeText.pt

  return (
    <div className="animate-fade-up">
      <div className="mb-8 sm:mb-12">
        <h1 className="font-comfortaa text-wine-deep text-[clamp(1.5rem,5vw,2.8rem)] font-light leading-[1.15] text-balance mb-3 sm:mb-5">
          {text.greeting}
        </h1>

        <p className="text-foreground/70 font-light text-xs sm:text-base leading-relaxed text-balance">
          {text.body}
        </p>
      </div>

      <div className="flex items-center gap-3 mb-8 sm:mb-10 p-3 sm:p-4 rounded-2xl bg-muted/40 border border-border/40">
        <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
          <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-wine-deep" />
        </div>
        <div className="min-w-0">
          <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
            {text.timeLabel}
          </p>
          <p className="text-xs sm:text-sm text-wine-deep font-light mt-0.5">
            {flow.timeEstimate}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-4 sm:py-6 rounded-full text-xs sm:text-base tracking-[0.2em] uppercase font-bold transition-all duration-500 shadow-lg group"
        style={{ backgroundColor: '#FDDCB5', color: '#5B2D8E', border: '1px solid #5B2D8E' }}
      >
        {text.start}
        <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <p className="text-center text-[9px] sm:text-[11px] text-muted-foreground font-light mt-4 sm:mt-5 leading-relaxed">
        {text.privacy}
      </p>
    </div>
  )
}
