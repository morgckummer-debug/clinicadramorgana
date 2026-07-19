import { BOAS_VINDAS_EN, CONVENIOS_EN, EXAMES_POR_CATEGORIA_EN, MEDICOS_EN, PERGUNTAS_EN } from './fluxo.config.en'
import { QuestionType, QuestionOption, Question, ConversationFlow } from './preAgendamento'

export const examsByCategoryEN = EXAMES_POR_CATEGORIA_EN
export const medicosEN = MEDICOS_EN

export const preAgendamentoFlowEN: ConversationFlow = {
  id: 'pre-agendamento',
  title: 'Shall we get your booking started?',
  subtitle:
    'Our Virtual Assistant MK will ask a few quick questions so our team can continue your care more efficiently.',
  timeEstimate: BOAS_VINDAS_EN.tempoEstimado,
  firstQuestion: 'q1',
  questions: {

    q1: {
      id: 'q1',
      type: 'buttons',
      ...PERGUNTAS_EN.q1,
      next: 'q2',
    },

    q2: {
      id: 'q2',
      type: 'buttons',
      ...PERGUNTAS_EN.q2,
      options: [],
      next: 'q3',
    },

    // ── Exclusive flow: Obstetric 1st Trimester ──
    ob1_a: { id: 'ob1_a', type: 'buttons', ...PERGUNTAS_EN.ob1_a, next: 'ob1_c', branch: true },
    ob1_b: { id: 'ob1_b', type: 'input', mask: 'date', ...PERGUNTAS_EN.ob1_b, next: 'ob1_c', branch: true },
    ob1_c: { id: 'ob1_c', type: 'buttons', ...PERGUNTAS_EN.ob1_c, next: 'ob1_d', branch: true },
    ob1_d: { id: 'ob1_d', type: 'upload', ...PERGUNTAS_EN.ob1_d, next: 'ob1_f', branch: true },
    ob1_e: { id: 'ob1_e', type: 'buttons', ...PERGUNTAS_EN.ob1_e, next: 'ob1_g', branch: true },
    ob1_g: { id: 'ob1_g', type: 'upload', ...PERGUNTAS_EN.ob1_g, next: 'ob1_f', branch: true },
    ob1_f: { id: 'ob1_f', type: 'buttons', ...PERGUNTAS_EN.ob1_f, next: 'q3', branch: true },
    ob1_h: { id: 'ob1_h', type: 'upload', ...PERGUNTAS_EN.ob1_h, next: 'q3', branch: true },
    // ── End of exclusive flow ────────────────────────

    q2b: {
      id: 'q2b',
      type: 'buttons',
      ...PERGUNTAS_EN.q2b,
      next: 'q3',
      branch: true,
    },

    q2b_us: {
      id: 'q2b_us',
      type: 'buttons',
      ...PERGUNTAS_EN.q2b_us,
      next: 'q2d',
      branch: true,
    },

    q2b_us_data: {
      id: 'q2b_us_data',
      type: 'input',
      mask: 'date',
      ...PERGUNTAS_EN.q2b_us_data,
      next: 'q2b_us_sem',
      branch: true,
    },

    q2b_us_sem: {
      id: 'q2b_us_sem',
      type: 'input',
      ...PERGUNTAS_EN.q2b_us_sem,
      next: 'q2d',
      branch: true,
    },

    q2c: {
      id: 'q2c',
      type: 'input',
      mask: 'date',
      ...PERGUNTAS_EN.q2c,
      next: 'q2e',
      branch: true,
    },

    q2e: {
      id: 'q2e',
      type: 'buttons',
      ...PERGUNTAS_EN.q2e,
      next: 'q2f',
      branch: true,
    },

    q2d: {
      id: 'q2d',
      type: 'buttons',
      ...PERGUNTAS_EN.q2d,
      next: 'q3',
      branch: true,
    },

    q2f: {
      id: 'q2f',
      type: 'upload',
      ...PERGUNTAS_EN.q2f,
      next: 'q3',
      branch: true,
    },

    q2h: {
      id: 'q2h',
      type: 'buttons',
      ...PERGUNTAS_EN.q2h,
      next: 'q2g',
      branch: true,
    },

    q2g: {
      id: 'q2g',
      type: 'upload',
      ...PERGUNTAS_EN.q2g,
      next: 'q3',
      branch: true,
    },

    q3: {
      id: 'q3',
      type: 'input',
      ...PERGUNTAS_EN.q3,
      next: 'q4',
    },

    q4: {
      id: 'q4',
      type: 'input',
      mask: 'cpf',
      ...PERGUNTAS_EN.q4,
      next: 'q5',
    },

    q5: {
      id: 'q5',
      type: 'input',
      mask: 'date',
      ...PERGUNTAS_EN.q5,
      next: 'q6',
    },

    q6: {
      id: 'q6',
      type: 'input',
      mask: 'phone',
      ...PERGUNTAS_EN.q6,
      next: 'q7',
    },

    q7: {
      id: 'q7',
      type: 'buttons',
      ...PERGUNTAS_EN.q7,
      options: CONVENIOS_EN,
      next: 'q8',
    },

    q8: {
      id: 'q8',
      type: 'buttons',
      ...PERGUNTAS_EN.q8,
      next: 'q9',
    },

    q9: {
      id: 'q9',
      type: 'buttons',
      ...PERGUNTAS_EN.q9,
      options: MEDICOS_EN,
      next: 'q10',
    },

    q10: {
      id: 'q10',
      type: 'upload',
      ...PERGUNTAS_EN.q10,
      next: 'q11',
    },

    q11: {
      id: 'q11',
      type: 'textarea',
      ...PERGUNTAS_EN.q11,
      next: 'consentimento_lgpd',
    },

    consentimento_lgpd: {
      id: 'consentimento_lgpd',
      type: 'consent',
      ...PERGUNTAS_EN.consentimento_lgpd,
      next: null,
    },
  },
}
