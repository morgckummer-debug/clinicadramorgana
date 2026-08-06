import { Link } from 'react-router-dom'
import { Baby, Scale, TriangleAlert } from 'lucide-react'
import { formatGramas, type Classificacao, type PesoResult } from './calcPeso'

type Props = { result: PesoResult }

const HEADLINE: Record<Classificacao, string> = {
  CIUR: 'Sinal de restrição de crescimento',
  AIG: 'Bebê com peso normal!',
  PIG: 'Bebê pequeno para a idade gestacional',
  GIG: 'Bebê grande para a idade gestacional',
}

const BADGE_LABEL: Record<Classificacao, string> = {
  CIUR: 'Restrição de crescimento intrauterino (CIUR)',
  AIG: 'Adequado para a idade gestacional (AIG)',
  PIG: 'Pequeno para a idade gestacional (PIG)',
  GIG: 'Grande para a idade gestacional (GIG)',
}

const BADGE_CLASS: Record<Classificacao, string> = {
  CIUR: 'bg-red-100 text-red-800',
  AIG: 'bg-rose/40 text-wine-deep',
  PIG: 'bg-amber-100 text-amber-800',
  GIG: 'bg-amber-100 text-amber-800',
}

function Gauge({ percentil }: { percentil: number }) {
  const pct = Math.max(0, Math.min(100, percentil))
  // O rótulo fica preso a uma margem segura para não ser cortado pela
  // borda arredondada do card quando o percentil é muito baixo ou alto;
  // o ponto na régua continua exatamente na posição real.
  const labelPct = Math.min(88, Math.max(12, pct))

  return (
    <div className="mt-2 mb-2">
      <div className="relative px-2 pt-14 pb-6">
        <div className="relative h-1.5 rounded-full overflow-visible flex">
          <div className="h-full rounded-l-full bg-red-400/70" style={{ width: '3%' }} />
          <div className="h-full bg-yellow-400/70" style={{ width: '7%' }} />
          <div className="h-full bg-green-400/60" style={{ width: '80%' }} />
          <div className="h-full rounded-r-full bg-red-400/70" style={{ width: '10%' }} />

          {[3, 10, 90].map((m) => (
            <div
              key={m}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: `${m}%` }}
            >
              <div className="w-1.5 h-3 rounded-full bg-white/80" />
              <div
                className={`absolute top-4 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.15em] uppercase text-foreground/50 whitespace-nowrap ${
                  m === 3 ? 'hidden sm:block' : ''
                }`}
              >
                P{m}
              </div>
            </div>
          ))}

          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 transition-all duration-700"
            style={{ left: `${pct}%` }}
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-wine/30 animate-ping" />
              <span className="relative block w-5 h-5 rounded-full bg-wine-deep border-4 border-white shadow-[0_4px_12px_rgba(91,45,142,0.4)]" />
            </div>
          </div>

          <div
            className="absolute -top-14 -translate-x-1/2 z-20 whitespace-nowrap transition-all duration-700"
            style={{ left: `${labelPct}%` }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-wine-deep text-white text-base md:text-lg font-bold tracking-wide shadow-[0_6px_16px_-4px_rgba(91,45,142,0.5)]">
              Percentil {percentil}
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-between text-[10px] tracking-[0.2em] uppercase text-foreground/40">
          <span>P1</span>
          <span>Percentil de peso</span>
          <span>P99</span>
        </div>
      </div>
    </div>
  )
}

export function CalculadoraPesoResultado({ result }: Props) {
  const { percentil, classificacao, pesoInformadoGramas, pesoMedianoGramas, gaSemanas, gaDias } = result

  return (
    <div className="mt-10 animate-fade-in">
      <div className="relative overflow-hidden rounded-3xl bg-white border border-champagne/40 shadow-[0_20px_60px_-30px_rgba(91,45,142,0.25)] p-8 md:p-12">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-champagne opacity-60" />

        <div className="relative text-center">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[26rem] h-[16rem] rounded-full opacity-60 blur-3xl"
            style={{ background: 'radial-gradient(ellipse, hsl(var(--rose) / 0.35) 0%, transparent 70%)' }}
          />
          <p className="relative text-[11px] tracking-[0.32em] uppercase text-wine/70">
            Resultado
          </p>
          <p className="relative mt-4 font-comfortaa text-wine-deep text-[clamp(1.15rem,5.4vw,2.6rem)] font-light leading-[1.15]">
            {HEADLINE[classificacao]}
            {classificacao === 'AIG' && ' 🥰'}
          </p>
          <p className={`relative mt-4 inline-block px-4 py-1.5 rounded-full text-sm font-medium ${BADGE_CLASS[classificacao]}`}>
            {BADGE_LABEL[classificacao]}
          </p>

          {classificacao === 'CIUR' && (
            <div className="relative mt-6 mx-auto max-w-md flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-left">
              <TriangleAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-sm text-red-800 font-light leading-relaxed">
                Este resultado pode indicar restrição de crescimento intrauterino (CIUR).
                Procure seu obstetra o quanto antes para uma avaliação e um acompanhamento
                mais próximo da gestação.
              </p>
            </div>
          )}
        </div>

        <div className="mt-10">
          <Gauge percentil={percentil} />
        </div>

        <div className="mt-6 mb-2 h-px bg-champagne/40" />

        <div className="grid gap-6 grid-cols-2 text-center mt-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-rose/30 border border-champagne/50 flex items-center justify-center">
              <Scale className="w-4 h-4 text-wine-deep" strokeWidth={1.5} />
            </div>
            <p className="mt-3 text-[10px] tracking-[0.24em] uppercase text-wine/60">
              Peso informado
            </p>
            <p className="mt-1 font-comfortaa text-wine-deep text-lg font-light">
              {formatGramas(pesoInformadoGramas)}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-rose/30 border border-champagne/50 flex items-center justify-center">
              <Baby className="w-4 h-4 text-wine-deep" strokeWidth={1.5} />
            </div>
            <p className="mt-3 text-[10px] tracking-[0.24em] uppercase text-wine/60">
              Peso médio esperado
            </p>
            <p className="mt-1 font-comfortaa text-wine-deep text-lg font-light">
              {formatGramas(pesoMedianoGramas)}
            </p>
          </div>
        </div>

        <p className="relative mt-6 text-center text-xs text-foreground/40 font-light">
          Referência para {gaSemanas} semanas e {gaDias} {gaDias === 1 ? 'dia' : 'dias'}
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-foreground/55 font-light leading-relaxed max-w-xl mx-auto">
        <span className="font-medium text-foreground/70">Importante:</span> As tabelas aqui
        descritas são de valores de referência. Valores acima ou abaixo dos limites esperados
        não significam necessariamente anormalidade. Sempre consulte seu médico para
        interpretação adequada.
      </p>

      <div className="mt-8 flex justify-center">
        <Link
          to="/agendar"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[11px] tracking-[0.24em] uppercase font-bold transition-all duration-300 hover:opacity-90"
          style={{ backgroundColor: '#FDDCB5', color: '#5B2D8E', border: '1px solid #5B2D8E' }}
        >
          Agendar meu ultrassom
        </Link>
      </div>
    </div>
  )
}
