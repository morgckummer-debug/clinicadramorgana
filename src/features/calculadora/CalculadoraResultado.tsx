import { Link } from 'react-router-dom'
import {
  formatDatePTBR,
  formatMesesDias,
  formatSemanasDias,
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
        {/* Trilha base */}
        <div className="relative h-1.5 rounded-full bg-champagne/40 overflow-visible">
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
      <div className="rounded-3xl bg-white border border-champagne/40 shadow-[0_20px_60px_-30px_rgba(91,45,142,0.25)] p-8 md:p-12">
        {/* Destaque principal: meses e dias */}
        <div className="text-center">
          <p className="text-[11px] tracking-[0.32em] uppercase text-wine/70">
            Você está com
          </p>
          <p className="mt-4 font-comfortaa text-wine-deep text-[clamp(1.25rem,6.9vw,3.8rem)] font-light leading-[1.05] whitespace-nowrap">
            {formatMesesDias(mesesCompletos, diasNoMes)}
            <span className="text-wine">!</span>
          </p>
          <p className="mt-4 inline-block px-4 py-1.5 rounded-full bg-rose/40 text-wine-deep text-sm font-medium">
            Você está no {mesGestacional}º mês da gestação
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-10">
          <Timeline semanas={semanas} diasNaSemana={diasNaSemana} />
        </div>

        <div className="mt-6 mb-2 h-px bg-champagne/40" />

        {/* Detalhes secundários */}
        <div className="grid gap-6 md:grid-cols-3 text-center mt-6">
          <div>
            <p className="text-[10px] tracking-[0.24em] uppercase text-wine/60">
              Idade gestacional
            </p>
            <p className="mt-2 font-comfortaa text-wine-deep text-lg font-light">
              {formatSemanasDias(semanas, diasNaSemana)}
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.24em] uppercase text-wine/60">
              Trimestre
            </p>
            <p className="mt-2 font-comfortaa text-wine-deep text-lg font-light">
              {trimestreLabel(trimestre)}
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.24em] uppercase text-wine/60">
              Data provável do parto
            </p>
            <p className="mt-2 font-comfortaa text-wine-deep text-lg font-light">
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
