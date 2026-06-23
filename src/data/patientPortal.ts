import {
  CalendarDays,
  ClipboardList,
  MapPin,
  Clock,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react'

export type PortalAction =
  | { type: 'route'; value: string }
  | { type: 'modal'; value: 'businessHours' }
  | { type: 'external'; value: string }

export type PortalOption = {
  id: string
  icon: LucideIcon
  titulo: string
  descricao: string
  buttonLabel: string
  badge?: string
  action: PortalAction
}

export const portalOptions: PortalOption[] = [
  {
    id: 'pre-agendamento',
    icon: CalendarDays,
    titulo: 'Pré-Agendamento',
    descricao: 'Solicite seu pré-agendamento de forma rápida e prática.',
    buttonLabel: 'Começar',
    badge: 'Recomendado',
    action: { type: 'route', value: '/pre-agendamento' },
  },
  {
    id: 'preparo',
    icon: ClipboardList,
    titulo: 'Preparo para Exames',
    descricao: 'Consulte as orientações do seu exame.',
    buttonLabel: 'Abrir',
    action: { type: 'route', value: '/preparo' },
  },
  {
    id: 'como-chegar',
    icon: MapPin,
    titulo: 'Como Chegar',
    descricao: 'Veja nossa localização e informações para sua visita.',
    buttonLabel: 'Abrir',
    action: { type: 'route', value: '/como-chegar' },
  },
  {
    id: 'horarios',
    icon: Clock,
    titulo: 'Horário de Funcionamento',
    descricao: 'Confira nossos horários de atendimento.',
    buttonLabel: 'Ver horários',
    action: { type: 'modal', value: 'businessHours' },
  },
  {
    id: 'falar',
    icon: MessageCircle,
    titulo: 'Falar com a Equipe',
    descricao: 'Nossa equipe está pronta para ajudar você.',
    buttonLabel: 'Conversar',
    action: { type: 'route', value: '/falar-secretaria' },
  },
]
