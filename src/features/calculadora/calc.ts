// Funções puras para cálculo de idade gestacional.
// Sem dependências externas — usa Date nativo em UTC para evitar DST.

const MS_PER_DAY = 86_400_000
const GESTATION_DAYS = 280

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

function toUTCDate(d: Date): Date {
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

function addMonths(d: Date, months: number): Date {
  const u = toUTCDate(d)
  const totalMonth = u.getUTCFullYear() * 12 + u.getUTCMonth() + months
  const year = Math.floor(totalMonth / 12)
  const month = totalMonth % 12
  // Se o dia de origem não existir no mês de destino (ex.: 31 de janeiro + 1 mês),
  // usa o último dia do mês de destino em vez de estourar para o mês seguinte.
  const ultimoDiaDoMes = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
  return new Date(Date.UTC(year, month, Math.min(u.getUTCDate(), ultimoDiaDoMes)))
}

/**
 * Conta meses e dias entre duas datas usando meses de calendário reais
 * (não uma média), para que a contagem avance de forma contínua e sem
 * saltos — ex.: "2 meses e 30 dias" é sempre seguido por "3 meses e 0 dias".
 */
function mesesEDiasEntre(inicio: Date, fim: Date): { meses: number; dias: number } {
  let meses = 0
  let cursor = toUTCDate(inicio)
  while (true) {
    const proximo = addMonths(cursor, 1)
    if (proximo.getTime() > fim.getTime()) break
    cursor = proximo
    meses++
  }
  return { meses, dias: diffInDays(cursor, fim) }
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
  const dias = Math.max(0, diffInDays(dum, hoje))
  const semanas = Math.floor(dias / 7)
  const diasNaSemana = dias % 7

  const { meses: mesesCompletos, dias: diasNoMes } = mesesEDiasEntre(dum, addDays(dum, dias))

  const mesGestacional = Math.min(9, Math.max(1, mesesCompletos + 1))

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
  const diasAteHoje = diffInDays(d, hoje)
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
  const dias = diffInDays(d, hoje)
  if (dias < 0) return { kind: 'future' }
  if (dias > 315) return { kind: 'tooOld' } // > 45 semanas
  return null
}

export function validateDPP(iso: string, hoje: Date = new Date()): CalcError | null {
  if (!iso) return { kind: 'required' }
  const d = parseISODate(iso)
  if (!d) return { kind: 'invalid' }
  const diasAteParto = diffInDays(hoje, d)
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
  return `${n} ${n === 1 ? singular : plural}`
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
