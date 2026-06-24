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
        'Segunda a sexta-feira — 07h00 às 18h00',
        'Sábado — 07h30 às 12h00',
      ],
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      titulo: 'Atendimento humano pelo WhatsApp',
      linhas: [
        'Segunda a sexta-feira — 08h00 às 11h00',
        '12h30 às 17h30',
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
