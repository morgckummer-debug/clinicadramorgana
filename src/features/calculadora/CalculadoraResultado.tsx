import { Link } from 'react-router-dom'
import { Gift, Sprout } from 'lucide-react'
import {
  formatDatePTBR,
  formatMesesDias,
  formatPeriodoPTBR,
  periodoConcepcao,
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

  const t1 = 'bg-rose-deep'
  const t2 = 'bg-champagne'
  const t3 = 'bg-wine/30'
  const fill = 'bg-gradient-to-r from-wine to-wine-deep'
  const tick = 'bg-wine-deep'
  const label = 'text-wine-deep'
  const hintCls = 'text-wine'
  const pill = 'bg-wine-deep text-white'
  const dot = 'bg-wine-deep border-white'

  return (
    <div className="mt-2 mb-2">
      <div className="relative px-2 pt-14 pb-6">
        <div className="relative h-1.5 rounded-full bg-champagne/40 overflow-visible flex">
          <div className={`h-full rounded-l-full ${t1}`} style={{ width: `${(14 / MAX_WEEKS) * 100}%` }} />
          <div className={`h-full ${t2}`} style={{ width: `${((28 - 14) / MAX_WEEKS) * 100}%` }} />
          <div className={`h-full rounded-r-full ${t3}`} style={{ width: `${((MAX_WEEKS - 28) / MAX_WEEKS) * 100}%` }} />
          <div
            className={`absolute inset-y-0 left-0 rounded-full ${fill} transition-all duration-700`}
            style={{ width: `${pct}%` }}
          />

          {markers.map((m) => {
            const left = (m.w / MAX_WEEKS) * 100
            return (
              <div
                key={m.w}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${left}%` }}
              >
                <div className={`w-1.5 h-3 rounded-full ${tick}`} />
                <div className={`absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap ${label}`}>
                  {m.label}
                  {m.hint && (
                    <span className={`hidden md:inline font-medium ${hintCls}`}> · {m.hint}</span>
                  )}
                </div>
              </div>
            )
          })}

          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 transition-all duration-700"
            style={{ left: `${pct}%` }}
          >
            <div className="relative">
              <span className={`absolute inset-0 rounded-full animate-ping bg-wine/30`} />
              <span className={`relative block w-5 h-5 rounded-full border-4 shadow-[0_4px_12px_rgba(91,45,142,0.4)] ${dot}`} />
            </div>
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className={`inline-block px-5 py-2 rounded-full text-lg font-bold tracking-wide shadow-md ${pill}`}>
                {semanas}s {diasNaSemana}d
              </span>
            </div>
          </div>
        </div>

        <div className={`mt-8 flex justify-between text-[10px] font-semibold tracking-[0.2em] uppercase ${label}`}>
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
    mesGestacional, dpp, dum,
  } = result
  const concepcao = periodoConcepcao(dum)

  const miniCard = 'bg-gradient-to-br from-wine-deep to-[#4a2142] border border-wine-deep shadow-md'
  const miniIcon = 'bg-[#FDDCB5] text-wine-deep'
  const miniLabel = 'text-[#FDDCB5]'
  const miniValue = 'text-white'

  return (
    <div className="mt-10 animate-fade-in">
      <div className={`relative overflow-hidden rounded-3xl border shadow-[0_20px_60px_-30px_rgba(91,45,142,0.45)] p-8 md:p-12 bg-white border-wine/30`}>
        <div className="relative text-center">
          <p className={`relative text-[11px] font-semibold tracking-[0.32em] uppercase text-wine-deep`}>
            Você está com
          </p>
          <p className={`relative mt-4 font-comfortaa font-bold leading-[1.05] whitespace-nowrap text-[clamp(1.25rem,6.9vw,3.8rem)] text-wine-deep`}>
            {formatMesesDias(mesesCompletos, diasNoMes)}
            <span className="text-wine">!</span>
          </p>
          <p className={`relative mt-4 inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-rose text-wine-deep border border-wine/20`}>
            Você está no {mesGestacional}º mês da gestação
          </p>
        </div>

        <div className="mt-10">
          <Timeline semanas={semanas} diasNaSemana={diasNaSemana} />
        </div>

        <div className="grid gap-4 grid-cols-2 text-center mt-6">
          <div className={`flex flex-col items-center rounded-2xl p-3 sm:p-4 ${miniCard}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${miniIcon}`}>
              <Sprout className="w-4 h-4" strokeWidth={2} />
            </div>
            <p className={`mt-3 text-[9px] sm:text-[10px] font-bold tracking-[0.18em] sm:tracking-[0.24em] uppercase ${miniLabel}`}>
              Semana da concepção
            </p>
            <p className={`mt-1 font-comfortaa text-base sm:text-lg font-semibold leading-snug ${miniValue}`}>
              {formatPeriodoPTBR(concepcao.inicio, concepcao.fim)}
            </p>
          </div>
          <div className={`flex flex-col items-center rounded-2xl p-3 sm:p-4 ${miniCard}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${miniIcon}`}>
              <Gift className="w-4 h-4" strokeWidth={2} />
            </div>
            <p className={`mt-3 text-[9px] sm:text-[10px] font-bold tracking-[0.18em] sm:tracking-[0.24em] uppercase ${miniLabel}`}>
              Data provável do parto
            </p>
            <p className={`mt-1 font-comfortaa text-base sm:text-lg font-semibold leading-snug ${miniValue}`}>
              {formatDatePTBR(dpp)}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-foreground/70 leading-relaxed max-w-xl mx-auto">
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
