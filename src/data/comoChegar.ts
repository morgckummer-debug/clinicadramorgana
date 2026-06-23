import {
  Car,
  Accessibility,
  Clock,
  FileText,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react'
import { CLINICA } from '@/lib/contato'

export type CardActionKind = 'whatsapp' | 'maps' | 'link'

export type InfoCardData = {
  id: string
  icon: LucideIcon
  titulo: string
  descricao: string
  action?: {
    kind: CardActionKind
    label: string
    href?: string
  }
}

export type Section = {
  id: string
  titulo?: string
  cards: InfoCardData[]
}

export const localizacao = {
  nome: CLINICA.nome,
  endereco: 'Rua Cândido Azeredo, 41 A',
  cidade: 'Centro — Sete Lagoas / MG',
  cep: 'CEP 35700-019',
  mapsUrl: 'https://www.google.com/maps?ll=-19.464006,-44.240331&z=18&t=m&hl=pt-BR&gl=US&mapclient=embed&q=R.+C%C3%A2ndido+Azeredo,+41a+-+Centro+Sete+Lagoas+-+MG+35700-019',
}

export const sections: Section[] = [
  {
    id: 'principais',
    cards: [
      {
        id: 'estacionamento',
        icon: Car,
        titulo: 'Estacionamento',
        descricao: 'Há opções de estacionamento próximas à clínica.',
      },
      {
        id: 'acessibilidade',
        icon: Accessibility,
        titulo: 'Acessibilidade',
        descricao:
          'Cadeirantes podem acessar a clínica (2º andar) pelo elevador do COE — Centro Odontológico, localizado no andar inferior do mesmo prédio. É necessário entrar pelo COE para utilizar o elevador. Atenção: o elevador não está disponível no horário de almoço.',
      },
      {
        id: 'antecedencia',
        icon: Clock,
        titulo: 'Chegue com antecedência',
        descricao:
          'Recomendamos chegar cerca de 15 minutos antes do horário agendado para realizar seu atendimento com tranquilidade.',
      },
      {
        id: 'documentos',
        icon: FileText,
        titulo: 'Documentos',
        descricao:
          'No dia do exame, lembre-se de trazer documento de identificação, pedido médico (quando houver) e exames anteriores relacionados.',
      },
      {
        id: 'ajuda',
        icon: MessageCircle,
        titulo: 'Precisa de ajuda?',
        descricao:
          'Caso ainda tenha alguma dúvida, nossa equipe terá prazer em ajudar.',
        action: {
          kind: 'whatsapp',
          label: 'Falar com a nossa equipe',
        },
      },
    ],
  },
]
