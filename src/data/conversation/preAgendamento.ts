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
}

export interface ConversationFlow {
  id: string
  title: string
  subtitle: string
  timeEstimate: string
  questions: Record<string, Question>
  firstQuestion: string
}

// Exames agrupados por categoria — dados reais do site
export const examsByCategory: Record<string, string[]> = {
  gestacao: [
    'Obstétrico do 1º Trimestre',
    'Obstétrico com Translucência Nucal',
    'Obstétrico com Doppler',
    'Morfológico do 1º Trimestre',
    'Morfológico do 2º Trimestre',
    'Morfológico do 3º Trimestre',
    'Perfil Biofísico Fetal (PBF)',
    'Ecocardiograma Fetal',
  ],
  ginecologico: [
    'Transvaginal (Endovaginal)',
    'Transvaginal 3D',
    'Transvaginal com Doppler',
    'Rastreamento de Ovulação',
    'Mapeamento de Endometriose Profunda',
    'Ultrassom Perineal',
  ],
  abdome: [
    'Abdome Total',
    'Abdome Superior',
    'Hipocôndrio Direito',
    'Partes Moles e Parede Abdominal',
    'Rins e Vias Urinárias',
    'Pélvico Masculino (Próstata)',
  ],
  mama: [
    'Mamas e Axilas',
  ],
  vascular: [
    'Duplex Scan dos Membros Inferiores',
    'Carótidas e Vertebrais',
    'Aorta e Ilíacas',
  ],
  tireoide: [
    'Tireóide com Doppler',
    'Cervical com Doppler',
    'Glândulas Salivares',
  ],
  pediatrico: [
    'Abdominal Total (Pediátrico)',
    'Rins e Vias Urinárias (Pediátrico)',
    'Pélvico Infantil',
    'Partes Moles',
    'Transfontanela',
  ],
}

// Médicos reais da clínica
export const medicos = [
  { label: 'Dra. Morgana Kummer', value: 'dra-morgana' },
  { label: 'Dra. Bárbara Rodrigues', value: 'dra-barbara' },
  { label: 'Dr. Darlei Carneiro', value: 'dr-darlei' },
  { label: 'Dr. Paulo Gontijo Jr.', value: 'dr-paulo' },
  { label: 'Dra. Carolina Martins', value: 'dra-carolina' },
  { label: 'Dra. Maria Amélia', value: 'dra-maria-amelia' },
  { label: 'Dr. André Mourão', value: 'dr-andre' },
  { label: 'Sem preferência', value: 'sem-preferencia' },
]

export const preAgendamentoFlow: ConversationFlow = {
  id: 'pre-agendamento',
  title: 'Vamos adiantar seu atendimento?',
  subtitle:
    'Nossa Assistente Virtual MK fará algumas perguntas rápidas para que nossa equipe possa continuar seu atendimento com mais agilidade.',
  timeEstimate: '2 a 4 minutos',
  firstQuestion: 'q1',
  questions: {

    // ── Etapa 1: tipo de ultrassom ─────────────────────────────────
    q1: {
      id: 'q1',
      type: 'buttons',
      title: 'Qual ultrassom você deseja marcar?',
      subtitle: 'Selecione a opção que melhor descreve o que você precisa.',
      options: [
        { label: 'Gestação', value: 'gestacao' },
        { label: 'Ginecológico', value: 'ginecologico' },
        { label: 'Abdome', value: 'abdome' },
        { label: 'Mama', value: 'mama' },
        { label: 'Vascular', value: 'vascular' },
        { label: 'Tireoide / Cervical', value: 'tireoide' },
        { label: 'Pediátrico', value: 'pediatrico' },
      ],
      next: 'q2',
    },

    // ── Etapa 2: exame específico ──────────────────────────────────
    q2: {
      id: 'q2',
      type: 'buttons',
      title: 'Qual exame especificamente?',
      subtitle: 'Se tiver pedido médico, pode conferir o nome lá.',
      // Opções preenchidas dinamicamente pelo QuestionRenderer com base na resposta de q1
      options: [],
      next: 'q3',
    },

    // ── Etapa 3: nome completo ─────────────────────────────────────
    q3: {
      id: 'q3',
      type: 'input',
      title: 'Qual o seu nome completo?',
      placeholder: 'Nome completo',
      next: 'q4',
    },

    // ── Etapa 4: CPF ───────────────────────────────────────────────
    q4: {
      id: 'q4',
      type: 'input',
      mask: 'cpf',
      title: 'Qual o seu CPF?',
      subtitle: 'Usado para identificar seu cadastro e evitar duplicidades.',
      placeholder: '000.000.000-00',
      next: 'q5',
    },

    // ── Etapa 5: data de nascimento ────────────────────────────────
    q5: {
      id: 'q5',
      type: 'input',
      mask: 'date',
      title: 'Qual a sua data de nascimento?',
      placeholder: 'DD/MM/AAAA',
      next: 'q6',
    },

    // ── Etapa 6: telefone ──────────────────────────────────────────
    q6: {
      id: 'q6',
      type: 'input',
      mask: 'phone',
      title: 'Qual o melhor número para contato?',
      subtitle: 'Nossa equipe entrará em contato por WhatsApp neste número.',
      placeholder: '(31) 99999-9999',
      next: 'q7',
    },

    // ── Etapa 7: convênio ──────────────────────────────────────────
    q7: {
      id: 'q7',
      type: 'multi',
      title: 'Você possui convênio ou parceria conosco?',
      subtitle: 'Pode selecionar mais de um se precisar.',
      options: [
        { label: 'AGEBRAS', value: 'agebras' },
        { label: 'Aurora Saúde', value: 'aurora' },
        { label: 'Casembrapa', value: 'casembrapa' },
        { label: 'Cemig Saúde', value: 'cemig' },
        { label: 'COPASS Saúde', value: 'copass' },
        { label: 'Fundaffemg', value: 'fundaffemg' },
        { label: 'FUSEX', value: 'fusex' },
        { label: 'Grupo ZELO', value: 'zelo' },
        { label: 'Hapvida', value: 'hapvida' },
        { label: 'MedGold Saúde', value: 'medgold' },
        { label: 'NotreDame Intermédica', value: 'notredame' },
        { label: 'Particular', value: 'particular' },
        { label: 'Pax de Minas', value: 'pax-minas' },
        { label: 'Projeto Bom Pastor', value: 'bom-pastor' },
        { label: 'Projeto Evangelize', value: 'evangelize' },
        { label: 'Santa Clara Assistencial', value: 'santa-clara' },
        { label: 'Stellantis Saúde', value: 'stellantis' },
      ],
      next: 'q8',
    },

    // ── Etapa 8: preferência de horário ───────────────────────────
    q8: {
      id: 'q8',
      type: 'buttons',
      title: 'Qual turno você prefere?',
      options: [
        { label: 'Manhã', value: 'manha' },
        { label: 'Tarde', value: 'tarde' },
        { label: 'Sem preferência', value: 'indiferente' },
      ],
      next: 'q9',
    },

    // ── Etapa 9: preferência de médico ────────────────────────────
    q9: {
      id: 'q9',
      type: 'buttons',
      title: 'Tem preferência por algum médico?',
      options: medicos,
      next: 'q10',
    },

    // ── Etapa 10: pedido médico (upload) ──────────────────────────
    q10: {
      id: 'q10',
      type: 'upload',
      title: 'Tem algum pedido médico para anexar?',
      subtitle: 'Opcional. Para gestação inicial, você pode enviar também o resultado do beta-HCG.',
      next: 'q11',
    },

    // ── Etapa 11: observações ──────────────────────────────────────
    q11: {
      id: 'q11',
      type: 'textarea',
      title: 'Alguma observação para nossa equipe?',
      subtitle: 'Opcional. Dificuldade de locomoção, urgência, dúvidas — qualquer informação que ajude.',
      placeholder: 'Ex: tenho dificuldade de locomoção, prefiro horário matutino…',
      next: null,
    },
  },
}
