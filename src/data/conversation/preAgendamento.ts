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
  icon?: string
}

export interface Question {
  id: string
  type: QuestionType
  title: string
  subtitle?: string
  placeholder?: string
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

export const preAgendamentoFlow: ConversationFlow = {
  id: 'pre-agendamento',
  title: 'Vamos adiantar seu atendimento?',
  subtitle:
    'Nossa Assistente Virtual MK fará algumas perguntas rápidas para que nossa equipe possa continuar seu atendimento com mais agilidade.',
  timeEstimate: '2 a 4 minutos',
  firstQuestion: 'q1',
  questions: {
    q1: {
      id: 'q1',
      type: 'buttons',
      title: 'Qual categoria de exame você procura?',
      subtitle: 'Selecione a opção que melhor descreve o que você precisa.',
      options: [
        { label: 'Ultrassonografia', value: 'ultrassonografia' },
        { label: 'Ecocardiograma', value: 'ecocardiograma' },
        { label: 'Doppler Vascular', value: 'doppler' },
        { label: 'Medicina Fetal', value: 'fetal' },
        { label: 'Outro', value: 'outro' },
      ],
      next: 'q2',
    },
    q2: {
      id: 'q2',
      type: 'buttons',
      title: 'Você já realizou exames aqui na Clínica Dra. Morgana?',
      options: [
        { label: 'Sim, sou paciente', value: 'sim' },
        { label: 'Não, é minha primeira vez', value: 'nao' },
      ],
      next: 'q3',
    },
    q3: {
      id: 'q3',
      type: 'multi',
      title: 'Você possui algum convênio médico?',
      subtitle: 'Pode selecionar mais de um se precisar.',
      options: [
        { label: 'Unimed', value: 'unimed' },
        { label: 'Bradesco Saúde', value: 'bradesco' },
        { label: 'SulAmérica', value: 'sulamerica' },
        { label: 'Amil', value: 'amil' },
        { label: 'Particular', value: 'particular' },
      ],
      next: 'q4',
    },
    q4: {
      id: 'q4',
      type: 'input',
      title: 'Como prefere ser chamada?',
      subtitle: 'Pode ser seu nome, apelido ou como se sentir melhor.',
      placeholder: 'Seu nome',
      next: 'q5',
    },
    q5: {
      id: 'q5',
      type: 'input',
      title: 'Qual o melhor número para contato?',
      placeholder: '(48) 99999-9999',
      next: 'q6',
    },
    q6: {
      id: 'q6',
      type: 'upload',
      title: 'Tem algum pedido médico para anexar?',
      subtitle: 'Opcional. Nossa equipe conseguirá ajudá-la mesmo sem o documento agora.',
      next: 'q7',
    },
    q7: {
      id: 'q7',
      type: 'textarea',
      title: 'Alguma observação para nossa equipe?',
      subtitle: 'Opcional. Use este espaço para qualquer informação que considere importante.',
      placeholder: 'Ex: tenho dificuldade de locomoção, prefiro horário matutino…',
      next: null,
    },
  },
}
