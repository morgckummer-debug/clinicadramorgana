import { ArrowRight, Clock } from 'lucide-react'
import { ConversationFlow } from '@/data/conversation/preAgendamento'

interface WelcomeScreenProps {
  flow: ConversationFlow
  onStart: () => void
}

export function WelcomeScreen({ flow, onStart }: WelcomeScreenProps) {
  return (
    <div className="animate-fade-up">
      <div className="mb-8 sm:mb-12">
        <h1 className="font-comfortaa text-wine-deep text-[clamp(1.5rem,5vw,2.8rem)] font-light leading-[1.15] text-balance mb-3 sm:mb-5">
          Olá!<br />Sou a Assistente Virtual MK.
        </h1>

        <p className="text-foreground/70 font-light text-xs sm:text-base leading-relaxed text-balance">
          Vou coletar algumas informações para facilitar seu atendimento.
          Nossa equipe analisará tudo antes de entrar em contato, ok?
        </p>
      </div>

      <div className="flex items-center gap-3 mb-8 sm:mb-10 p-3 sm:p-4 rounded-2xl bg-muted/40 border border-border/40">
        <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
          <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-wine-deep" />
        </div>
        <div className="min-w-0">
          <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
            Tempo estimado
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
        Começar
        <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <p className="text-center text-[9px] sm:text-[11px] text-muted-foreground font-light mt-4 sm:mt-5 leading-relaxed">
        Suas informações são tratadas com total sigilo.<br />
        Nenhum dado é compartilhado sem sua autorização.
      </p>
    </div>
  )
}
