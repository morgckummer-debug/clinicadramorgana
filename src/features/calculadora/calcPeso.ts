// Percentil de peso fetal estimado (PFE) por idade gestacional.
//
// A mediana usa a curva publicada por Hadlock, Harrist e Martinez-Poyer
// (Radiology, 1991): ln(peso) = 0.578 + 0.332*IG - 0.00354*IG², IG em
// semanas decimais. Os percentis são estimados assumindo distribuição
// log-normal em torno dessa mediana, com desvio padrão em escala log
// equivalente a um coeficiente de variação de ~14% — não é a tabela
// ponto-a-ponto original do artigo, apenas uma aproximação da curva.

export type Classificacao = 'CIUR' | 'PIG' | 'AIG' | 'GIG'

export type PesoResult = {
  gaSemanas: number
  gaDias: number
  pesoInformadoGramas: number
  pesoMedianoGramas: number
  percentil: number
  classificacao: Classificacao
}

export type PesoError =
  | { kind: 'semanasRequired' }
  | { kind: 'semanasInvalid' }
  | { kind: 'pesoRequired' }
  | { kind: 'pesoInvalid' }

const GA_MIN_SEMANAS = 14
const GA_MAX_SEMANAS = 42
const PESO_MIN_GRAMAS = 50
const PESO_MAX_GRAMAS = 6000
const LOG_SD = 0.14

export function gaParaSemanasDecimais(semanas: number, dias: number): number {
  return semanas + dias / 7
}

export function pesoMedianoGramas(gaSemanasDecimais: number): number {
  const ga = gaSemanasDecimais
  return Math.exp(0.578 + 0.332 * ga - 0.00354 * ga * ga)
}

// Aproximação de Abramowitz & Stegun (7.1.26) para a função erro.
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1
  const ax = Math.abs(x)
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911
  const t = 1 / (1 + p * ax)
  const y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-ax * ax)
  return sign * y
}

function normalCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2))
}

export function classificar(percentil: number): Classificacao {
  if (percentil <= 3) return 'CIUR'
  if (percentil < 10) return 'PIG'
  if (percentil > 90) return 'GIG'
  return 'AIG'
}

export function calcPeso(semanas: number, dias: number, pesoGramas: number): PesoResult {
  const gaDecimal = gaParaSemanasDecimais(semanas, dias)
  const mediana = pesoMedianoGramas(gaDecimal)
  const z = Math.log(pesoGramas / mediana) / LOG_SD
  const percentilBruto = Math.round(normalCdf(z) * 100)
  const percentil = Math.min(99, Math.max(1, percentilBruto))

  return {
    gaSemanas: semanas,
    gaDias: dias,
    pesoInformadoGramas: pesoGramas,
    pesoMedianoGramas: Math.round(mediana),
    percentil,
    classificacao: classificar(percentil),
  }
}

export function validatePeso(
  semanasStr: string,
  diasStr: string,
  pesoStr: string,
): PesoError | null {
  if (!semanasStr) return { kind: 'semanasRequired' }
  const semanas = parseInt(semanasStr, 10)
  const dias = parseInt(diasStr || '0', 10)
  if (!Number.isFinite(semanas) || !Number.isFinite(dias)) return { kind: 'semanasInvalid' }
  if (semanas < GA_MIN_SEMANAS || semanas > GA_MAX_SEMANAS) return { kind: 'semanasInvalid' }
  if (dias < 0 || dias > 6) return { kind: 'semanasInvalid' }

  if (!pesoStr) return { kind: 'pesoRequired' }
  const peso = parseFloat(pesoStr)
  if (!Number.isFinite(peso)) return { kind: 'pesoInvalid' }
  if (peso < PESO_MIN_GRAMAS || peso > PESO_MAX_GRAMAS) return { kind: 'pesoInvalid' }

  return null
}

export function pesoErrorMessage(e: PesoError): string {
  switch (e.kind) {
    case 'semanasRequired':
      return 'Informe a idade gestacional em semanas.'
    case 'semanasInvalid':
      return `Informe uma idade gestacional válida (entre ${GA_MIN_SEMANAS} e ${GA_MAX_SEMANAS} semanas).`
    case 'pesoRequired':
      return 'Informe o peso estimado do bebê em gramas.'
    case 'pesoInvalid':
      return `Informe um peso válido (entre ${PESO_MIN_GRAMAS} e ${PESO_MAX_GRAMAS} gramas).`
  }
}

export function formatGramas(g: number): string {
  return `${g.toLocaleString('pt-BR')} g`
}
