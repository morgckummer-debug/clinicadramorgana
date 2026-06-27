import { BOAS_VINDAS_ES, CONVENIOS_ES, EXAMES_POR_CATEGORIA_ES, MEDICOS_ES, PERGUNTAS_ES } from './fluxo.config.es'
import { QuestionType, QuestionOption, Question, ConversationFlow } from './preAgendamento'

export const examsByCategoryES = EXAMES_POR_CATEGORIA_ES
export const medicosES = MEDICOS_ES

export const preAgendamentoFlowES: ConversationFlow = {
  id: 'pre-agendamento',
  title: '¿Vamos a adelantar tu atención?',
  subtitle:
    'Nuestra Asistente Virtual MK hará algunas preguntas rápidas para que nuestro equipo pueda continuar tu atención con más agilidad.',
  timeEstimate: BOAS_VINDAS_ES.tempoEstimado,
  firstQuestion: 'q1',
  questions: {

    q1: {
      id: 'q1',
      type: 'buttons',
      ...PERGUNTAS_ES.q1,
      next: 'q2',
    },

    q2: {
      id: 'q2',
      type: 'buttons',
      ...PERGUNTAS_ES.q2,
      options: [],
      next: 'q3',
    },

    // ── Flujo exclusivo: Obstétrico del 1º Trimestre ──
    ob1_a: { id: 'ob1_a', type: 'buttons', ...PERGUNTAS_ES.ob1_a, next: 'ob1_c', branch: true },
    ob1_b: { id: 'ob1_b', type: 'input', mask: 'date', ...PERGUNTAS_ES.ob1_b, next: 'ob1_c', branch: true },
    ob1_c: { id: 'ob1_c', type: 'buttons', ...PERGUNTAS_ES.ob1_c, next: 'ob1_d', branch: true },
    ob1_d: { id: 'ob1_d', type: 'upload', ...PERGUNTAS_ES.ob1_d, next: 'ob1_f', branch: true },
    ob1_e: { id: 'ob1_e', type: 'buttons', ...PERGUNTAS_ES.ob1_e, next: 'ob1_g', branch: true },
    ob1_g: { id: 'ob1_g', type: 'upload', ...PERGUNTAS_ES.ob1_g, next: 'ob1_f', branch: true },
    ob1_f: { id: 'ob1_f', type: 'buttons', ...PERGUNTAS_ES.ob1_f, next: 'q3', branch: true },
    ob1_h: { id: 'ob1_h', type: 'upload', ...PERGUNTAS_ES.ob1_h, next: 'q3', branch: true },
    // ── Fin del flujo exclusivo ────────────────────────

    q2b: {
      id: 'q2b',
      type: 'buttons',
      ...PERGUNTAS_ES.q2b,
      next: 'q3',
      branch: true,
    },

    q2b_us: {
      id: 'q2b_us',
      type: 'buttons',
      ...PERGUNTAS_ES.q2b_us,
      next: 'q2d',
      branch: true,
    },

    q2b_us_data: {
      id: 'q2b_us_data',
      type: 'input',
      mask: 'date',
      ...PERGUNTAS_ES.q2b_us_data,
      next: 'q2b_us_sem',
      branch: true,
    },

    q2b_us_sem: {
      id: 'q2b_us_sem',
      type: 'input',
      ...PERGUNTAS_ES.q2b_us_sem,
      next: 'q2d',
      branch: true,
    },

    q2c: {
      id: 'q2c',
      type: 'input',
      mask: 'date',
      ...PERGUNTAS_ES.q2c,
      next: 'q2e',
      branch: true,
    },

    q2e: {
      id: 'q2e',
      type: 'buttons',
      ...PERGUNTAS_ES.q2e,
      next: 'q2f',
      branch: true,
    },

    q2d: {
      id: 'q2d',
      type: 'buttons',
      ...PERGUNTAS_ES.q2d,
      next: 'q3',
      branch: true,
    },

    q2f: {
      id: 'q2f',
      type: 'upload',
      ...PERGUNTAS_ES.q2f,
      next: 'q3',
      branch: true,
    },

    q2h: {
      id: 'q2h',
      type: 'buttons',
      ...PERGUNTAS_ES.q2h,
      next: 'q2g',
      branch: true,
    },

    q2g: {
      id: 'q2g',
      type: 'upload',
      ...PERGUNTAS_ES.q2g,
      next: 'q3',
      branch: true,
    },

    q3: {
      id: 'q3',
      type: 'input',
      ...PERGUNTAS_ES.q3,
      next: 'q4',
    },

    q4: {
      id: 'q4',
      type: 'input',
      mask: 'cpf',
      ...PERGUNTAS_ES.q4,
      next: 'q5',
    },

    q5: {
      id: 'q5',
      type: 'input',
      mask: 'date',
      ...PERGUNTAS_ES.q5,
      next: 'q6',
    },

    q6: {
      id: 'q6',
      type: 'input',
      mask: 'phone',
      ...PERGUNTAS_ES.q6,
      next: 'q7',
    },

    q7: {
      id: 'q7',
      type: 'buttons',
      ...PERGUNTAS_ES.q7,
      options: CONVENIOS_ES,
      next: 'q8',
    },

    q8: {
      id: 'q8',
      type: 'buttons',
      ...PERGUNTAS_ES.q8,
      next: 'q9',
    },

    q9: {
      id: 'q9',
      type: 'buttons',
      ...PERGUNTAS_ES.q9,
      options: MEDICOS_ES,
      next: 'q10',
    },

    q10: {
      id: 'q10',
      type: 'upload',
      ...PERGUNTAS_ES.q10,
      next: 'q11',
    },

    q11: {
      id: 'q11',
      type: 'textarea',
      ...PERGUNTAS_ES.q11,
      next: null,
    },
  },
}
