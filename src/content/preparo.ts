import type { IconKey } from '@/data/preparos/icons'

export const preparoContent = {
  eyebrow: '',
  title: 'Preparo para exames',
  subtitle: 'Selecione o exame que você irá realizar.',
  modal: {
    metaLabel: 'Leitura: menos de 1 minuto',
    footer:
      'Essas orientações também serão enviadas novamente pela nossa equipe após a confirmação do agendamento.',
  },
  semPreparo: {
    titulo: 'Sem preparo especial',
    mensagem:
      'Não há preparo especial para este exame. Nossa equipe enviará todas as orientações necessárias pelo WhatsApp após a confirmação do seu agendamento.',
  },
  periodoModal: {
    titulo: 'Seu exame será realizado em qual período?',
    descricao: 'O preparo varia conforme o horário do exame.',
    opcoes: [
      { id: 'manha', label: 'Manhã', icon: 'manha' as IconKey },
      { id: 'tarde', label: 'Tarde', icon: 'tarde' as IconKey },
    ],
  },
  callout: {
    pergunta: 'Não encontrou seu exame?',
    descricao: 'Nossa equipe pode tirar suas dúvidas e orientar sobre o preparo.',
    cta: 'Falar com a secretaria',
  },
  whatsappMensagem:
    'Olá! Gostaria de tirar uma dúvida sobre o preparo de um exame.',
  poster: {
    eyebrow: 'Preparo de exame',
    rodape: 'Em caso de dúvidas, fale com nossa equipe.',
  },
}
