import { Hospital, MessageCircle, type LucideIcon } from 'lucide-react'

export type InfoBloco = {
  id: string
  icon: LucideIcon
  titulo: string
  linhas: string[]
}

export const businessHoursContent = {
  titulo: 'Horário de funcionamento',
  subtitulo: 'Confira nossos horários de atendimento.',
  blocos: [
    {
      id: 'clinica',
      icon: Hospital,
      titulo: 'Atendimento na clínica',
      linhas: [
        'Segunda a sexta-feira — 07:00h às 18:00h',
        'Sábado — 07:30h às 12:00h',
      ],
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      titulo: 'Atendimento humano pelo WhatsApp',
      linhas: [
        'Segunda a sexta-feira — 08:00h às 11:00h',
        '12:30h às 17:30h',
        '(Pré-agendamento disponível 24h)',
      ],
    },
  ] as InfoBloco[],
  observacao: 'Domingos e feriados não possuem atendimento.',
  botaoPrimario: {
    label: 'Falar com a nossa equipe',
    mensagemWhatsapp: 'Olá! Gostaria de falar com a equipe da clínica.',
  },
  botaoSecundario: {
    label: 'Fechar',
  },
}
