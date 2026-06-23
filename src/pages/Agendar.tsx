import { Link } from 'react-router-dom'
import { MessageCircle, Bot, ArrowRight } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/5531993910212'

export default function Agendar() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      {/* Header mínimo */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-champagne/20">
        <Link to="/">
          <img src="/logo-horiz.png" alt="Clínica Dra. Morgana" className="h-14 w-auto" />
        </Link>
        <Link
          to="/"
          className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-wine-deep transition-colors duration-300"
        >
          Voltar ao site
        </Link>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-8 pb-16">
        <div className="w-full max-w-2xl">
          <div className="mb-10 text-center">
            <h1 className="font-comfortaa text-wine-deep text-[clamp(1.6rem,5vw,2.4rem)] font-light leading-[1.2] mb-3">
              Como você prefere ser atendido(a)?
            </h1>
            <p className="text-foreground/60 font-light text-base">
              Escolha a opção que for mais confortável para você.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Card Assistente Virtual — destaque */}
            <Link
              to="/pre-agendamento"
              className="group relative flex flex-col items-start p-7 rounded-3xl border border-[#5B2D8E]/30 bg-white shadow-[0_4px_24px_rgba(91,45,142,0.10)] hover:shadow-[0_6px_32px_rgba(91,45,142,0.16)] transition-all duration-400 cursor-pointer"
            >
              {/* Selo de destaque */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5B2D8E] text-white text-[9px] tracking-[0.3em] uppercase font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                Recomendado
              </span>

              <div className="w-12 h-12 rounded-2xl bg-[#5B2D8E]/10 flex items-center justify-center mb-5">
                <Bot className="w-6 h-6 text-[#5B2D8E]" strokeWidth={1.5} />
              </div>

              <p className="text-[11px] tracking-[0.25em] uppercase text-[#5B2D8E] font-medium mb-1">
                Pré-Agendamento
              </p>
              <p className="text-sm font-medium text-wine-deep mb-2">
                Assistente Virtual MK
              </p>
              <p className="text-foreground/70 font-light text-sm leading-relaxed mb-6 flex-1">
                Responda algumas perguntas em cerca de 3 minutos. Nossa equipe receberá todas as informações necessárias e entrará em contato com as melhores opções de horário.
              </p>
              <span
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 w-full justify-center"
                style={{ backgroundColor: '#FDDCB5', color: '#5B2D8E', border: '1px solid #5B2D8E' }}
              >
                Começar <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>

            {/* Card WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="whatsapp"
              rel="noopener noreferrer"
              className="group flex flex-col items-start p-7 rounded-3xl border border-border/50 bg-white hover:border-[#25D366]/40 transition-all duration-400 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center mb-5">
                <MessageCircle className="w-6 h-6 text-[#25D366]" strokeWidth={1.5} />
              </div>
              <p className="text-foreground/70 font-light text-sm leading-relaxed mb-6 flex-1">
                Falar diretamente com nossa equipe pelo WhatsApp.
              </p>
              <span className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-[#1ebe5d] transition-colors duration-300 w-full justify-center">
                <MessageCircle className="w-3.5 h-3.5" /> Abrir WhatsApp
              </span>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
