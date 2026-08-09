// Funções puras para cálculo de idade gestacional.
// Sem dependências externas — usa Date nativo em UTC para evitar DST.

const MS_PER_DAY = 86_400_000
const GESTATION_DAYS = 280

/**
 * Marcos (em dias) de cada mês completo, conforme a tabela de referência
 * impressa da clínica ("Você completa: N meses / Quando estiver com: ...").
 * MONTH_BREAKPOINTS[n] = quantos dias são necessários para completar o
 * mês n (n = 1..9). Não é uma média fixa por mês (os intervalos entre
 * marcos variam), então os valores ficam hardcoded para bater exatamente
 * com a tabela usada nos atendimentos.
 */
const MONTH_BREAKPOINTS = [0, 30, 59, 91, 121, 151, 182, 212, 243, 273]

export type Trimestre = 1 | 2 | 3

export type CalcResult = {
  dias: number
  semanas: number
  diasNaSemana: number
  mesesCompletos: number
  diasNoMes: number
  mesGestacional: number // 1..9
  trimestre: Trimestre
  dpp: Date
  dum: Date
}

export type CalcError =
  | { kind: 'required' }
  | { kind: 'invalid' }
  | { kind: 'future' }
  | { kind: 'past' }
  | { kind: 'tooOld' }
  | { kind: 'tooFar' }

/**
 * Normaliza uma data que já está em meia-noite UTC (vinda de parseISODate
 * ou addDays), removendo qualquer resquício de horário. Usa getters UTC
 * para ser idempotente — aplicar de novo no mesmo valor não desloca o dia,
 * diferente de usar getters locais, que "roubam" um dia em fusos negativos
 * (ex.: Brasil, UTC-3) toda vez que a função é reaplicada.
 */
function toUTCDate(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
}

/**
 * Converte a data/hora "agora" (relógio local, ex.: `new Date()`) no dia de
 * calendário local, representado como meia-noite UTC. Só deve ser chamada
 * uma vez, na entrada de cada função pública, para o parâmetro `hoje`.
 */
function todayAsUTCDate(d: Date): Date {
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
}

export function diffInDays(from: Date, to: Date): number {
  const a = toUTCDate(from).getTime()
  const b = toUTCDate(to).getTime()
  return Math.floor((b - a) / MS_PER_DAY)
}

export function addDays(d: Date, days: number): Date {
  const u = toUTCDate(d)
  u.setUTCDate(u.getUTCDate() + days)
  return u
}

/**
 * Converte um total de dias em "meses e dias" usando os marcos da tabela
 * da clínica (MONTH_BREAKPOINTS): o mês só avança quando o marco daquele
 * mês é alcançado ou ultrapassado (ex.: 120 dias -> "3 meses e 29 dias";
 * 121 dias -> "4 meses"). Depende só do total de dias, não da data de
 * calendário, para que a mesma idade gestacional sempre corresponda ao
 * mesmo resultado, não importa a data da última menstruação.
 */
function mesesEDias(dias: number): { meses: number; dias: number } {
  let meses = 0
  while (meses < 9 && MONTH_BREAKPOINTS[meses + 1] <= dias) {
    meses++
  }
  return { meses, dias: dias - MONTH_BREAKPOINTS[meses] }
}

export function parseISODate(iso: string): Date | null {
  if (!iso) return null
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!m) return null
  const y = +m[1], mo = +m[2], d = +m[3]
  const date = new Date(Date.UTC(y, mo - 1, d))
  if (
    date.getUTCFullYear() !== y ||
    date.getUTCMonth() !== mo - 1 ||
    date.getUTCDate() !== d
  ) return null
  return date
}

export function calcFromDUM(dum: Date, hoje: Date = new Date()): CalcResult {
  const dias = Math.max(0, diffInDays(dum, todayAsUTCDate(hoje)))
  const semanas = Math.floor(dias / 7)
  const diasNaSemana = dias % 7

  const { meses: mesesCompletos, dias: diasNoMes } = mesesEDias(dias)

  // Enquanto o dia atual coincide com o marco de um mês completo, ainda é
  // esse mês (ex.: 182 dias = "está no 6º mês"); no dia seguinte ao marco
  // já é o mês seguinte (183 dias = "está no 7º mês").
  const mesGestacional =
    diasNoMes === 0 ? Math.max(1, mesesCompletos) : Math.min(9, mesesCompletos + 1)

  const trimestre: Trimestre =
    semanas < 14 ? 1 : semanas < 28 ? 2 : 3

  return {
    dias,
    semanas,
    diasNaSemana,
    mesesCompletos,
    diasNoMes,
    mesGestacional,
    trimestre,
    dpp: addDays(dum, GESTATION_DAYS),
    dum: toUTCDate(dum),
  }
}

export function calcFromDPP(dpp: Date, hoje: Date = new Date()): CalcResult {
  const dum = addDays(dpp, -GESTATION_DAYS)
  return calcFromDUM(dum, hoje)
}

/**
 * Calcula a partir de um ultrassom anterior:
 * data do exame + idade gestacional naquele momento (semanas + dias).
 * Deriva a DUM equivalente e reutiliza o cálculo padrão.
 */
export function calcFromUS(
  dataExame: Date,
  semanasNoExame: number,
  diasNoExame: number,
  hoje: Date = new Date(),
): CalcResult {
  const diasNoExameTotal = semanasNoExame * 7 + diasNoExame
  const dum = addDays(dataExame, -diasNoExameTotal)
  return calcFromDUM(dum, hoje)
}

export function validateUS(
  iso: string,
  semanas: number,
  dias: number,
  hoje: Date = new Date(),
): CalcError | null {
  if (!iso) return { kind: 'required' }
  const d = parseISODate(iso)
  if (!d) return { kind: 'invalid' }
  const diasAteHoje = diffInDays(d, todayAsUTCDate(hoje))
  if (diasAteHoje < 0) return { kind: 'future' }
  if (!Number.isFinite(semanas) || !Number.isFinite(dias)) return { kind: 'invalid' }
  if (semanas < 0 || semanas > 42) return { kind: 'invalid' }
  if (dias < 0 || dias > 6) return { kind: 'invalid' }
  const diasNoExame = semanas * 7 + dias
  const diasTotais = diasNoExame + diasAteHoje
  if (diasTotais > 315) return { kind: 'tooOld' }
  return null
}

/**
 * Valida DUM. Retorna erro amigável ou null se válido.
 */
export function validateDUM(iso: string, hoje: Date = new Date()): CalcError | null {
  if (!iso) return { kind: 'required' }
  const d = parseISODate(iso)
  if (!d) return { kind: 'invalid' }
  const dias = diffInDays(d, todayAsUTCDate(hoje))
  if (dias < 0) return { kind: 'future' }
  if (dias > 315) return { kind: 'tooOld' } // > 45 semanas
  return null
}

export function validateDPP(iso: string, hoje: Date = new Date()): CalcError | null {
  if (!iso) return { kind: 'required' }
  const d = parseISODate(iso)
  if (!d) return { kind: 'invalid' }
  const diasAteParto = diffInDays(todayAsUTCDate(hoje), d)
  if (diasAteParto < 0) return { kind: 'past' }
  // DPP muito distante = DUM ainda no futuro ou gestação < 0
  if (diasAteParto > GESTATION_DAYS) return { kind: 'tooFar' }
  return null
}

const MESES_PT = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

export function formatDatePTBR(d: Date): string {
  const u = toUTCDate(d)
  return `${u.getUTCDate()} de ${MESES_PT[u.getUTCMonth()]} de ${u.getUTCFullYear()}`
}

export function pluralize(n: number, singular: string, plural: string): string {
  return `${n} ${n === 1 || n === 0 ? singular : plural}`
}

export function formatSemanasDias(semanas: number, dias: number): string {
  const s = pluralize(semanas, 'semana', 'semanas')
  if (dias === 0) return s
  return `${s} e ${pluralize(dias, 'dia', 'dias')}`
}

export function formatMesesDias(meses: number, dias: number): string {
  const m = pluralize(meses, 'mês', 'meses')
  if (dias === 0) return m
  return `${m} e ${pluralize(dias, 'dia', 'dias')}`
}

const TRIMESTRE_LABEL: Record<Trimestre, string> = {
  1: 'Primeiro trimestre',
  2: 'Segundo trimestre',
  3: 'Terceiro trimestre',
}

export function trimestreLabel(t: Trimestre): string {
  return TRIMESTRE_LABEL[t]
}

export function errorMessage(e: CalcError): string {
  switch (e.kind) {
    case 'required': return 'Informe uma data para calcular.'
    case 'invalid': return 'Data inválida. Verifique os valores digitados.'
    case 'future': return 'A data da última menstruação não pode estar no futuro.'
    case 'past': return 'A data provável do parto não pode estar no passado.'
    case 'tooOld': return 'Data da última menstruação incompatível. Verifique se a data está correta.'
    case 'tooFar': return 'Data provável do parto muito distante. Verifique se a data está correta.'
  }
}
