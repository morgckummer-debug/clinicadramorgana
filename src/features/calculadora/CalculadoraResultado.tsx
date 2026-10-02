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

function Timeline({ semanas, diasNaSemana, dark }: { semanas: number; diasNaSemana: number; dark: boolean }) {
  const totalWeeks = semanas + diasNaSemana / 7
  const pct = Math.max(0, Math.min(100, (totalWeeks / MAX_WEEKS) * 100))

  const markers = [
    { w: 0, label: '0' },
    { w: 14, label: '14', hint: '2º trim.' },
    { w: 28, label: '28', hint: '3º trim.' },
    { w: 40, label: '40', hint: 'DPP' },
  ]

  const t1 = dark ? 'bg-white/35' : 'bg-rose-deep'
  const t2 = dark ? 'bg-white/20' : 'bg-champagne'
  const t3 = dark ? 'bg-white/10' : 'bg-wine/30'
  const fill = dark ? 'bg-gradient-to-r from-[#FDDCB5] to-[#f5c48a]' : 'bg-gradient-to-r from-wine to-wine-deep'
  const tick = dark ? 'bg-[#FDDCB5]' : 'bg-wine-deep'
  const label = dark ? 'text-white/90' : 'text-wine-deep'
  const hintCls = dark ? 'text-[#FDDCB5]' : 'text-wine'
  const pill = dark ? 'bg-[#FDDCB5] text-wine-deep' : 'bg-wine-deep text-white'
  const dot = dark ? 'bg-[#FDDCB5] border-wine-deep' : 'bg-wine-deep border-white'

  return (
    <div className="mt-2 mb-2">
      <div className="relative px-2 pt-10 pb-6">
        <div className="relative h-2.5 rounded-full bg-champagne/40 overflow-visible flex">
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
                <div className={`w-1.5 h-4 rounded-full ${tick}`} />
                <div className={`absolute top-5 left-1/2 -translate-x-1/2 text-xs font-semibold tracking-wide whitespace-nowrap ${label}`}>
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
              <span className={`absolute inset-0 rounded-full animate-ping ${dark ? 'bg-[#FDDCB5]/40' : 'bg-wine/30'}`} />
              <span className={`relative block w-6 h-6 rounded-full border-4 shadow-[0_4px_12px_rgba(91,45,142,0.4)] ${dot}`} />
            </div>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide ${pill}`}>
                {semanas}s {diasNaSemana}d
              </span>
            </div>
          </div>
        </div>

        <div className={`mt-9 flex justify-between text-xs font-semibold tracking-[0.12em] uppercase ${label}`}>
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
  const dark = new URLSearchParams(window.location.search).get('v') === 'b'

  const cardCls = dark
    ? 'bg-gradient-to-br from-wine-deep to-[#4a2142] border-wine-deep text-white'
    : 'bg-white border-wine/30'
  const kicker = dark ? 'text-[#FDDCB5]' : 'text-wine-deep'
  const big = dark ? 'text-white' : 'text-wine-deep'
  const badge = dark ? 'bg-[#FDDCB5] text-wine-deep' : 'bg-rose text-wine-deep border border-wine/20'
  const miniCard = dark ? 'bg-white/10 border border-white/20' : 'bg-rose/60 border border-wine/20'
  const miniIcon = dark ? 'bg-[#FDDCB5] text-wine-deep' : 'bg-wine-deep text-white'
  const miniLabel = dark ? 'text-[#FDDCB5]' : 'text-wine-deep'
  const miniValue = dark ? 'text-white' : 'text-wine-deep'

  return (
    <div className="mt-10 animate-fade-in">
      <div className={`relative overflow-hidden rounded-3xl border shadow-[0_20px_60px_-30px_rgba(91,45,142,0.45)] p-8 md:p-12 ${cardCls}`}>
        <div className="relative text-center">
          <p className={`relative text-sm font-semibold tracking-[0.18em] uppercase ${kicker}`}>
            Você está com
          </p>
          <p className={`relative mt-4 font-comfortaa font-bold leading-[1.05] whitespace-nowrap text-[clamp(1.25rem,6.9vw,3.8rem)] ${big}`}>
            {formatMesesDias(mesesCompletos, diasNoMes)}
            <span className={dark ? 'text-[#FDDCB5]' : 'text-wine'}>!</span>
          </p>
          <p className={`relative mt-4 inline-block px-5 py-2 rounded-full text-base font-semibold ${badge}`}>
            Você está no {mesGestacional}º mês da gestação
          </p>
        </div>

        <div className="mt-10">
          <Timeline semanas={semanas} diasNaSemana={diasNaSemana} dark={dark} />
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 text-center mt-6">
          <div className={`flex flex-col items-center rounded-2xl p-5 ${miniCard}`}>
            <div className={`w-11 h-11 rounded-full flex items-center justify-center ${miniIcon}`}>
              <Sprout className="w-5 h-5" strokeWidth={2} />
            </div>
            <p className={`mt-3 text-xs font-bold tracking-[0.14em] uppercase ${miniLabel}`}>
              Semana da concepção
            </p>
            <p className={`mt-1 font-comfortaa text-xl font-bold ${miniValue}`}>
              {formatPeriodoPTBR(concepcao.inicio, concepcao.fim)}
            </p>
          </div>
          <div className={`flex flex-col items-center rounded-2xl p-5 ${miniCard}`}>
            <div className={`w-11 h-11 rounded-full flex items-center justify-center ${miniIcon}`}>
              <Gift className="w-5 h-5" strokeWidth={2} />
            </div>
            <p className={`mt-3 text-xs font-bold tracking-[0.14em] uppercase ${miniLabel}`}>
              Data provável do parto
            </p>
            <p className={`mt-1 font-comfortaa text-xl font-bold ${miniValue}`}>
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
