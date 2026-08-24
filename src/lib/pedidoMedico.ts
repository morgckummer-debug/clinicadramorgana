/**
 * Regras de exigência do pedido médico no pré-agendamento.
 *
 * Ficam separadas do ConversationEngine para poderem ser testadas: um erro
 * aqui bloqueia silenciosamente uma paciente no último passo do formulário,
 * depois de ela ter preenchido tudo.
 */

/**
 * Exames que podem ser agendados sem prescrição.
 *
 * O Obstétrico do 1º Trimestre entra aqui porque tem fluxo próprio (`ob1_*`),
 * no qual os anexos são declaradamente opcionais: a paciente só precisa
 * informar que possui pedido médico OU beta-hCG (a recusa dos dois já é
 * barrada em `ob1_e`), sem obrigação de enviar o arquivo.
 */
export const EXAMES_SEM_PEDIDO_OBRIGATORIO = new Set([
  'Obstétrico - Sexo Fetal',
  '3D Completo',
  'Obstétrico do 1º Trimestre',
])

/** Ids de pergunta cuja resposta é uma URL de arquivo anexado. */
const CAMPOS_DE_ANEXO = ['q10', 'q2f', 'ob1_d', 'ob1_g', 'ob1_h'] as const

type Respostas = Record<string, string | string[] | undefined>

/** true se a paciente anexou ao menos um arquivo em qualquer etapa. */
export function temAnexo(respostas: Respostas): boolean {
  return CAMPOS_DE_ANEXO.some((campo) => {
    const v = respostas[campo]
    return Array.isArray(v) ? v.some(Boolean) : Boolean(v)
  })
}

/**
 * true quando o pré-agendamento pode ser concluído.
 *
 * Só barra quem escolheu um exame que exige prescrição e chegou ao fim sem
 * nenhum anexo.
 */
export function podeFinalizar(exame: string | undefined, respostas: Respostas): boolean {
  if (EXAMES_SEM_PEDIDO_OBRIGATORIO.has(exame ?? '')) return true
  return temAnexo(respostas)
}
