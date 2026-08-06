// Percentil de peso fetal estimado (PFE) por idade gestacional.
//
// Combina duas tabelas de referência fornecidas pela clínica — peso (g)
// nos percentis 3, 10, 50 e 90, por semana completa:
//   - Hadlock (1991): 20 a 40 semanas.
//   - INTERGROWTH-21st: 30 a 40 semanas, mais fiel perto do termo (a
//     desaceleração do crescimento no fim da gestação é modelada de forma
//     diferente entre as referências, e cada uma tem seu próprio "jeito"
//     de descrever esse período).
// Abaixo de 30 semanas usa-se Hadlock puro; a partir de 35 semanas,
// INTERGROWTH puro; entre 30 e 35 semanas as duas tabelas são misturadas
// linearmente (por semana) para evitar um salto no percentil bem em cima
// da fronteira.
//
// Para uma idade gestacional fracionária, os quatro valores de cada
// tabela são interpolados linearmente entre as duas semanas mais
// próximas. O percentil de um peso informado é obtido por interpolação
// linear no espaço (ln(peso), escore-z) entre os pontos conhecidos da
// linha resultante — isso preserva a assimetria real das tabelas
// (P3–P10–P50–P90 não formam uma curva log-normal simétrica) em vez de
// assumir um único desvio padrão.

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

type LinhaTabela = { p3: number; p10: number; p50: number; p90: number }

const TABELA_HADLOCK: Record<number, LinhaTabela> = {
  20: { p3: 247, p10: 275, p50: 331, p90: 387 },
  21: { p3: 298, p10: 331, p50: 399, p90: 467 },
  22: { p3: 357, p10: 397, p50: 478, p90: 559 },
  23: { p3: 424, p10: 472, p50: 568, p90: 664 },
  24: { p3: 503, p10: 556, p50: 670, p90: 784 },
  25: { p3: 590, p10: 653, p50: 785, p90: 918 },
  26: { p3: 685, p10: 758, p50: 913, p90: 1068 },
  27: { p3: 791, p10: 875, p50: 1055, p90: 1234 },
  28: { p3: 908, p10: 1004, p50: 1210, p90: 1416 },
  29: { p3: 1033, p10: 1143, p50: 1379, p90: 1613 },
  30: { p3: 1169, p10: 1294, p50: 1559, p90: 1824 },
  31: { p3: 1312, p10: 1452, p50: 1751, p90: 2049 },
  32: { p3: 1465, p10: 1621, p50: 1953, p90: 2285 },
  33: { p3: 1622, p10: 1795, p50: 2162, p90: 2530 },
  34: { p3: 1788, p10: 1978, p50: 2377, p90: 2781 },
  35: { p3: 1955, p10: 2164, p50: 2595, p90: 3036 },
  36: { p3: 2126, p10: 2352, p50: 2813, p90: 3291 },
  37: { p3: 2294, p10: 2537, p50: 3028, p90: 3543 },
  38: { p3: 2455, p10: 2716, p50: 3236, p90: 3786 },
  39: { p3: 2607, p10: 2884, p50: 3435, p90: 4019 },
  40: { p3: 2747, p10: 3039, p50: 3619, p90: 4234 },
}
const HADLOCK_MIN_SEMANA = 20
const HADLOCK_MAX_SEMANA = 40

const TABELA_INTERGROWTH: Record<number, LinhaTabela> = {
  30: { p3: 967, p10: 1089, p50: 1396, p90: 1813 },
  31: { p3: 1062, p10: 1207, p50: 1568, p90: 2050 },
  32: { p3: 1162, p10: 1334, p50: 1755, p90: 2304 },
  33: { p3: 1269, p10: 1469, p50: 1954, p90: 2570 },
  34: { p3: 1380, p10: 1612, p50: 2162, p90: 2843 },
  35: { p3: 1494, p10: 1761, p50: 2378, p90: 3116 },
  36: { p3: 1612, p10: 1913, p50: 2594, p90: 3381 },
  37: { p3: 1731, p10: 2068, p50: 2806, p90: 3629 },
  38: { p3: 1851, p10: 2221, p50: 3006, p90: 3850 },
  39: { p3: 1969, p10: 2368, p50: 3186, p90: 4034 },
  40: { p3: 2085, p10: 2505, p50: 3338, p90: 4171 },
}
const INTERGROWTH_MIN_SEMANA = 30
const INTERGROWTH_MAX_SEMANA = 40

// Faixa de transição: abaixo de TRANSICAO_INICIO usa-se Hadlock puro, a
// partir de TRANSICAO_FIM usa-se INTERGROWTH puro; entre as duas, as
// tabelas são misturadas linearmente conforme a idade gestacional.
const TRANSICAO_INICIO = 30
const TRANSICAO_FIM = 35

const GA_MIN_SEMANAS = HADLOCK_MIN_SEMANA
const GA_MAX_SEMANAS = HADLOCK_MAX_SEMANA
const PESO_MIN_GRAMAS = 50
const PESO_MAX_GRAMAS = 6000

// Quantis da normal padrão correspondentes a cada coluna das tabelas.
const Z_P3 = -1.8808
const Z_P10 = -1.2816
const Z_P50 = 0
const Z_P90 = 1.2816

export function gaParaSemanasDecimais(semanas: number, dias: number): number {
  return semanas + dias / 7
}

function linhaDaTabela(
  tabela: Record<number, LinhaTabela>,
  semanaMin: number,
  semanaMax: number,
  gaSemanasDecimais: number,
): LinhaTabela {
  const ga = Math.min(semanaMax, Math.max(semanaMin, gaSemanasDecimais))
  const semanaBase = Math.min(semanaMax - 1, Math.floor(ga))
  const frac = ga - semanaBase
  const inferior = tabela[semanaBase]
  const superior = tabela[semanaBase + 1]

  const interp = (chave: keyof LinhaTabela) =>
    inferior[chave] + (superior[chave] - inferior[chave]) * frac

  return { p3: interp('p3'), p10: interp('p10'), p50: interp('p50'), p90: interp('p90') }
}

function linhaInterpolada(gaSemanasDecimais: number): LinhaTabela {
  const ga = Math.min(GA_MAX_SEMANAS, Math.max(GA_MIN_SEMANAS, gaSemanasDecimais))

  if (ga < TRANSICAO_INICIO) {
    return linhaDaTabela(TABELA_HADLOCK, HADLOCK_MIN_SEMANA, HADLOCK_MAX_SEMANA, ga)
  }
  if (ga >= TRANSICAO_FIM) {
    return linhaDaTabela(TABELA_INTERGROWTH, INTERGROWTH_MIN_SEMANA, INTERGROWTH_MAX_SEMANA, ga)
  }

  const t = (ga - TRANSICAO_INICIO) / (TRANSICAO_FIM - TRANSICAO_INICIO)
  const hadlock = linhaDaTabela(TABELA_HADLOCK, HADLOCK_MIN_SEMANA, HADLOCK_MAX_SEMANA, ga)
  const intergrowth = linhaDaTabela(TABELA_INTERGROWTH, INTERGROWTH_MIN_SEMANA, INTERGROWTH_MAX_SEMANA, ga)

  const misturar = (chave: keyof LinhaTabela) =>
    hadlock[chave] + (intergrowth[chave] - hadlock[chave]) * t

  return { p3: misturar('p3'), p10: misturar('p10'), p50: misturar('p50'), p90: misturar('p90') }
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

type Ponto = { peso: number; z: number }

// Interpola no espaço (ln(peso), z) entre os pontos conhecidos da linha
// (P3, P10, P50, P90); fora desse intervalo, estende a inclinação do
// segmento mais próximo (P3–P10 abaixo, P50–P90 acima).
function zDoPeso(pesoGramas: number, linha: LinhaTabela): number {
  const pontos: Ponto[] = [
    { peso: linha.p3, z: Z_P3 },
    { peso: linha.p10, z: Z_P10 },
    { peso: linha.p50, z: Z_P50 },
    { peso: linha.p90, z: Z_P90 },
  ]

  const interpolarSegmento = (a: Ponto, b: Ponto) => {
    const t = Math.log(pesoGramas / a.peso) / Math.log(b.peso / a.peso)
    return a.z + t * (b.z - a.z)
  }

  if (pesoGramas <= pontos[0].peso) return interpolarSegmento(pontos[0], pontos[1])
  if (pesoGramas >= pontos[3].peso) return interpolarSegmento(pontos[2], pontos[3])

  for (let i = 0; i < pontos.length - 1; i++) {
    if (pesoGramas >= pontos[i].peso && pesoGramas <= pontos[i + 1].peso) {
      return interpolarSegmento(pontos[i], pontos[i + 1])
    }
  }
  return 0
}

export function classificar(percentil: number): Classificacao {
  if (percentil <= 3) return 'CIUR'
  if (percentil < 10) return 'PIG'
  if (percentil > 90) return 'GIG'
  return 'AIG'
}

export function calcPeso(semanas: number, dias: number, pesoGramas: number): PesoResult {
  const gaDecimal = gaParaSemanasDecimais(semanas, dias)
  const linha = linhaInterpolada(gaDecimal)
  const z = zDoPeso(pesoGramas, linha)
  const percentilBruto = Math.round(normalCdf(z) * 100)
  const percentil = Math.min(99, Math.max(1, percentilBruto))

  return {
    gaSemanas: semanas,
    gaDias: dias,
    pesoInformadoGramas: pesoGramas,
    pesoMedianoGramas: Math.round(linha.p50),
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
