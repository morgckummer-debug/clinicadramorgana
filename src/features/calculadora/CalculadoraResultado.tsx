import { Link } from 'react-router-dom'
import { Gift, HeartPulse } from 'lucide-react'
import {
  formatDatePTBR,
  formatMesesDias,
  trimestreLabel,
  type CalcResult,
} from './calc'

type Props = { result: CalcResult }

const MAX_WEEKS = 42

function Timeline({ semanas, diasNaSemana }: { semanas: number; diasNaSemana: number }) {
  const totalWeeks = semanas + diasNaSemana / 7
  const pct = Math.max(0, Math.min(100, (totalWeeks / MAX_WEEKS) * 100))

  const markers = [
    { w: 0, label: '0' },
    { w: 14, label: '14', hint: '2º trim.' },
    { w: 28, label: '28', hint: '3º trim.' },
    { w: 40, label: '40', hint: 'DPP' },
  ]

  return (
    <div className="mt-2 mb-2">
      <div className="relative px-2 pt-8 pb-6">
        {/* Trilha base, com segmentos sutis por trimestre */}
        <div className="relative h-1.5 rounded-full bg-champagne/40 overflow-visible flex">
          <div className="h-full rounded-l-full bg-rose/50" style={{ width: `${(14 / MAX_WEEKS) * 100}%` }} />
          <div className="h-full bg-champagne/70" style={{ width: `${((28 - 14) / MAX_WEEKS) * 100}%` }} />
          <div className="h-full rounded-r-full bg-wine/20" style={{ width: `${((MAX_WEEKS - 28) / MAX_WEEKS) * 100}%` }} />
          {/* Preenchimento até a idade gestacional */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-wine to-wine-deep transition-all duration-700"
            style={{ width: `${pct}%` }}
          />

          {/* Marcadores dos trimestres */}
          {markers.map((m) => {
            const left = (m.w / MAX_WEEKS) * 100
            return (
              <div
                key={m.w}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${left}%` }}
              >
                <div className="w-1.5 h-3 rounded-full bg-champagne" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.15em] uppercase text-foreground/50 whitespace-nowrap">
                  {m.label}
                  {m.hint && (
                    <span className="hidden md:inline text-wine/60"> · {m.hint}</span>
                  )}
                </div>
              </div>
            )
          })}

          {/* Ponto da idade gestacional */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 transition-all duration-700"
            style={{ left: `${pct}%` }}
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-wine/30 animate-ping" />
              <span className="relative block w-5 h-5 rounded-full bg-wine-deep border-4 border-white shadow-[0_4px_12px_rgba(91,45,142,0.4)]" />
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="inline-block px-2.5 py-1 rounded-full bg-wine-deep text-white text-[10px] font-medium tracking-wider">
                {semanas}s {diasNaSemana}d
              </span>
            </div>
          </div>
        </div>

        {/* Legenda de semanas nos extremos */}
        <div className="mt-8 flex justify-between text-[10px] tracking-[0.2em] uppercase text-foreground/40">
          <span>Início</span>
          <span>Semanas</span>
          <span>Parto</span>
        </div>
      </div>
    </div>
  )
}

export function CalculadoraResultado({ result }: Props) {
  const {
    semanas, diasNaSemana,
    mesesCompletos, diasNoMes,
    mesGestacional, trimestre, dpp,
  } = result

  return (
    <div className="mt-10 animate-fade-in">
      <div className="relative overflow-hidden rounded-3xl bg-white border border-champagne/40 shadow-[0_20px_60px_-30px_rgba(91,45,142,0.25)] p-8 md:p-12">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-champagne opacity-60" />

        {/* Destaque principal: meses e dias */}
        <div className="relative text-center">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[26rem] h-[16rem] rounded-full opacity-60 blur-3xl"
            style={{ background: 'radial-gradient(ellipse, hsl(var(--rose) / 0.35) 0%, transparent 70%)' }}
          />
          <p className="relative text-[11px] tracking-[0.32em] uppercase text-wine/70">
            Você está com
          </p>
          <p className="relative mt-4 font-comfortaa text-wine-deep text-[clamp(1.25rem,6.9vw,3.8rem)] font-light leading-[1.05] whitespace-nowrap">
            {formatMesesDias(mesesCompletos, diasNoMes)}
            <span className="text-wine">!</span>
          </p>
          <p className="relative mt-4 inline-block px-4 py-1.5 rounded-full bg-rose/40 text-wine-deep text-sm font-medium">
            Você está no {mesGestacional}º mês da gestação
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-10">
          <Timeline semanas={semanas} diasNaSemana={diasNaSemana} />
        </div>

        <div className="mt-6 mb-2 h-px bg-champagne/40" />

        {/* Detalhes secundários */}
        <div className="grid gap-6 grid-cols-2 text-center mt-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-rose/30 border border-champagne/50 flex items-center justify-center">
              <HeartPulse className="w-4 h-4 text-wine-deep" strokeWidth={1.5} />
            </div>
            <p className="mt-3 text-[10px] tracking-[0.24em] uppercase text-wine/60">
              Trimestre
            </p>
            <p className="mt-1 font-comfortaa text-wine-deep text-lg font-light">
              {trimestreLabel(trimestre)}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-rose/30 border border-champagne/50 flex items-center justify-center">
              <Gift className="w-4 h-4 text-wine-deep" strokeWidth={1.5} />
            </div>
            <p className="mt-3 text-[10px] tracking-[0.24em] uppercase text-wine/60">
              Data provável do parto
            </p>
            <p className="mt-1 font-comfortaa text-wine-deep text-lg font-light">
              {formatDatePTBR(dpp)}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-foreground/55 font-light leading-relaxed max-w-xl mx-auto">
        Na obstetrícia, a idade gestacional é sempre acompanhada em semanas e dias.
        A conversão para meses é apenas uma aproximação, pois os meses do calendário
        possuem durações diferentes.
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
