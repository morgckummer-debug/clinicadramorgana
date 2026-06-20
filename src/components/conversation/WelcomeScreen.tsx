import { ArrowRight, Clock } from 'lucide-react'
import { ConversationFlow } from '@/data/conversation/preAgendamento'

interface WelcomeScreenProps {
  flow: ConversationFlow
  onStart: () => void
}

export function WelcomeScreen({ flow, onStart }: WelcomeScreenProps) {
  return (
    <div className="animate-fade-up">
      <div className="mb-12">
        <span className="inline-block text-[10px] tracking-[0.4em] uppercase text-wine font-medium mb-6">
          Assistente Virtual MK
        </span>

        <h1 className="font-comfortaa text-wine-deep text-[clamp(1.9rem,6vw,2.8rem)] font-light leading-[1.15] text-balance mb-5">
          {flow.title}
        </h1>

        <p className="text-foreground/70 font-light text-base leading-relaxed text-balance">
          {flow.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3 mb-10 p-4 rounded-2xl bg-muted/40 border border-border/40">
        <div className="w-8 h-8 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
          <Clock className="w-4 h-4 text-wine-deep" />
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
            Tempo estimado
          </p>
          <p className="text-sm text-wine-deep font-light mt-0.5">
            {flow.timeEstimate}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="w-full inline-flex items-center justify-center gap-3 bg-wine-deep text-wine-foreground px-8 py-4.5 rounded-full text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-wine transition-all duration-500 shadow-soft hover:shadow-elegant group"
      >
        Começar
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <p className="text-center text-[11px] text-muted-foreground font-light mt-5 leading-relaxed">
        Suas informações são tratadas com total sigilo.<br />
        Nenhum dado é compartilhado sem sua autorização.
      </p>
    </div>
  )
}
