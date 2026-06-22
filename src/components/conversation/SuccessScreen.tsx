import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export function SuccessScreen() {
  return (
    <div className="animate-fade-up text-center">
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 rounded-full bg-champagne/20 flex items-center justify-center shadow-soft">
          <CheckCircle2 className="w-8 h-8 text-wine-deep" strokeWidth={1.5} />
        </div>
      </div>

      <span className="inline-block text-[10px] tracking-[0.4em] uppercase text-wine font-medium mb-4">
        Tudo certo
      </span>

      <h2 className="font-comfortaa text-wine-deep text-2xl md:text-3xl font-light leading-[1.2] text-balance mb-4">
        Pré-agendamento realizado!
      </h2>

      <p className="text-foreground/70 font-light text-sm leading-relaxed text-balance mb-10 max-w-sm mx-auto">
        Recebemos suas informações com sucesso.
        Nossa equipe analisará seus dados e enviará as melhores opções de horários disponíveis.
      </p>

      <div className="space-y-3">
        <a
          href="https://wa.me/5531993910212"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full gap-2.5 bg-wine-deep text-wine-foreground px-7 py-3.5 rounded-full text-[11px] tracking-[0.25em] uppercase font-semibold transition-all duration-500 hover:bg-wine shadow-soft hover:shadow-elegant"
        >
          Falar com a equipe agora
        </a>

        <Link
          to="/"
          className="flex items-center justify-center w-full gap-2 text-muted-foreground text-[11px] tracking-[0.2em] uppercase font-medium hover:text-wine-deep transition-colors duration-300 py-2"
        >
          Voltar ao site
        </Link>
      </div>
    </div>
  )
}
