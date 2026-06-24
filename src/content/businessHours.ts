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
        'Segunda a sexta-feira — 07:00 às 18:00',
        'Sábado — 07:30 às 12:00',
      ],
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      titulo: 'Atendimento pelo WhatsApp',
      linhas: [
        'Segunda a sexta-feira — 08:00 às 11:00',
        '12:30 às 17:30',
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
