import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import gestanteImg from '@/assets/calculadora-gestante.jpg'

/**
 * Chamada elegante para a Calculadora de Idade Gestacional.
 * Usada na homepage.
 */
export function CalculadoraCTA() {
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container">
        <Link
          to="/calculadora-idade-gestacional"
          className="group relative block max-w-5xl mx-auto overflow-hidden rounded-[2rem] border border-champagne/60 shadow-[0_20px_60px_-30px_rgba(91,45,142,0.35)] hover:shadow-[0_30px_80px_-25px_rgba(91,45,142,0.45)] transition-all duration-700"
        >
          {/* Imagem de fundo */}
          <div className="absolute inset-0">
            <img
              src={gestanteImg}
              alt="Gestante feliz com as mãos sobre a barriga"
              loading="lazy"
              width={1200}
              height={1200}
              className="w-full h-full object-cover object-right md:object-[70%_center] scale-105 group-hover:scale-110 transition-transform duration-[1200ms]"
            />
          </div>

          {/* Overlays: veludo à esquerda esmaecendo para transparência à direita */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,246,235,0.97) 0%, rgba(253,220,181,0.85) 35%, rgba(253,220,181,0.35) 60%, rgba(255,255,255,0) 85%)',
            }}
          />
          <div
            className="absolute inset-0 md:hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,246,235,0.92) 0%, rgba(253,220,181,0.75) 55%, rgba(255,255,255,0) 100%)',
            }}
          />

          {/* Conteúdo */}
          <div className="relative px-7 py-10 md:px-14 md:py-16 min-h-[340px] md:min-h-[380px] flex items-center">
            <div className="max-w-md text-center md:text-left">
              <span className="inline-block text-wine text-[10px] tracking-[0.42em] uppercase">
                Para gestantes
              </span>
              <h2 className="mt-3 font-comfortaa text-wine-deep text-[1.45rem] md:text-[1.9rem] font-light leading-[1.25]">
                Quer saber de quantos meses você está e o percentil do peso do seu bebê?
              </h2>
              <p className="mt-4 text-wine-deep/70 font-light md:text-lg leading-relaxed">
                Descubra em segundos as semanas, meses, a data prevista do parto e se o peso do bebê está adequado para a idade gestacional.
              </p>

              <span
                className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[11px] tracking-[0.24em] uppercase font-bold transition-transform duration-500 group-hover:translate-x-1"
                style={{ backgroundColor: '#FDDCB5', color: '#5B2D8E', border: '1px solid #5B2D8E' }}
              >
                Calcular agora
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
