// Este arquivo monta o fluxo a partir de fluxo.config.ts.
// Para editar perguntas, textos e opções, abra fluxo.config.ts.
import { BOAS_VINDAS, CONVENIOS, EXAMES_POR_CATEGORIA, MEDICOS, PERGUNTAS } from './fluxo.config'

export type QuestionType =
  | 'buttons'
  | 'multi'
  | 'input'
  | 'textarea'
  | 'upload'
  | 'calendar'

export interface QuestionOption {
  label: string
  value: string
}

export type QuestionMask = 'cpf' | 'date' | 'phone' | 'none'

export interface Question {
  id: string
  type: QuestionType
  title: string
  subtitle?: string
  placeholder?: string
  mask?: QuestionMask
  options?: QuestionOption[]
  next: string | null
  branch?: boolean
}

export interface ConversationFlow {
  id: string
  title: string
  subtitle: string
  timeEstimate: string
  questions: Record<string, Question>
  firstQuestion: string
}

export const examsByCategory = EXAMES_POR_CATEGORIA
export const medicos = MEDICOS

export const preAgendamentoFlow: ConversationFlow = {
  id: 'pre-agendamento',
  title: 'Vamos adiantar seu atendimento?',
  subtitle:
    'Nossa Assistente Virtual MK fará algumas perguntas rápidas para que nossa equipe possa continuar seu atendimento com mais agilidade.',
  timeEstimate: BOAS_VINDAS.tempoEstimado,
  firstQuestion: 'q1',
  questions: {

    q1: {
      id: 'q1',
      type: 'buttons',
      ...PERGUNTAS.q1,
      next: 'q2',
    },

    q2: {
      id: 'q2',
      type: 'buttons',
      ...PERGUNTAS.q2,
      options: [],
      next: 'q3',
    },

    q2b: {
      id: 'q2b',
      type: 'buttons',
      ...PERGUNTAS.q2b,
      next: 'q3',
      branch: true,
    },

    q2c: {
      id: 'q2c',
      type: 'input',
      mask: 'date',
      ...PERGUNTAS.q2c,
      next: 'q2e',
      branch: true,
    },

    q2e: {
      id: 'q2e',
      type: 'buttons',
      ...PERGUNTAS.q2e,
      next: 'q2f',
      branch: true,
    },

    q2d: {
      id: 'q2d',
      type: 'buttons',
      ...PERGUNTAS.q2d,
      next: 'q3',
      branch: true,
    },

    q2f: {
      id: 'q2f',
      type: 'upload',
      ...PERGUNTAS.q2f,
      next: 'q3',
      branch: true,
    },

    q2h: {
      id: 'q2h',
      type: 'buttons',
      ...PERGUNTAS.q2h,
      next: 'q2g',
      branch: true,
    },

    q2g: {
      id: 'q2g',
      type: 'upload',
      ...PERGUNTAS.q2g,
      next: 'q3',
      branch: true,
    },

    q3: {
      id: 'q3',
      type: 'input',
      ...PERGUNTAS.q3,
      next: 'q4',
    },

    q4: {
      id: 'q4',
      type: 'input',
      mask: 'cpf',
      ...PERGUNTAS.q4,
      next: 'q5',
    },

    q5: {
      id: 'q5',
      type: 'input',
      mask: 'date',
      ...PERGUNTAS.q5,
      next: 'q6',
    },

    q6: {
      id: 'q6',
      type: 'input',
      mask: 'phone',
      ...PERGUNTAS.q6,
      next: 'q7',
    },

    q7: {
      id: 'q7',
      type: 'buttons',
      ...PERGUNTAS.q7,
      options: CONVENIOS,
      next: 'q8',
    },

    q8: {
      id: 'q8',
      type: 'buttons',
      ...PERGUNTAS.q8,
      next: 'q9',
    },

    q9: {
      id: 'q9',
      type: 'buttons',
      ...PERGUNTAS.q9,
      options: MEDICOS,
      next: 'q10',
    },

    q10: {
      id: 'q10',
      type: 'upload',
      ...PERGUNTAS.q10,
      next: 'q11',
    },

    q11: {
      id: 'q11',
      type: 'textarea',
      ...PERGUNTAS.q11,
      next: null,
    },
  },
}
