import {
  BadgeDollarSign,
  CalendarClock,
  ShieldCheck,
  CircleHelp,
  type LucideIcon,
} from 'lucide-react'

export type AssuntoAction =
  | { kind: 'whatsapp'; mensagem: string }
  | { kind: 'navegar'; to: string }
  | { kind: 'telefone'; numero: string }
  | { kind: 'modal'; modalId: string }
  | { kind: 'formulario'; formId: string }
  | { kind: 'link'; href: string; external?: boolean }

export type AssuntoSecretaria = {
  id: string
  icon: LucideIcon
  titulo: string
  descricao: string
  acao: AssuntoAction
  ctaLabel?: string
}

export const assuntos: AssuntoSecretaria[] = [
  {
    id: 'valores',
    icon: BadgeDollarSign,
    titulo: 'Valores dos exames',
    descricao:
      'Informações sobre preços, formas de pagamento, descontos e convênios.',
    acao: {
      kind: 'whatsapp',
      mensagem: 'Olá! Gostaria de informações sobre valores dos exames.',
    },
  },
  {
    id: 'agendamento',
    icon: CalendarClock,
    titulo: 'Agendamento',
    descricao:
      'Alterar, remarcar, cancelar ou esclarecer dúvidas sobre um agendamento.',
    acao: {
      kind: 'whatsapp',
      mensagem: 'Olá! Preciso de ajuda com meu agendamento.',
    },
  },
  {
    id: 'convenios',
    icon: ShieldCheck,
    titulo: 'Convênios',
    descricao: 'Cobertura, autorizações e documentos necessários.',
    acao: {
      kind: 'whatsapp',
      mensagem: 'Olá! Gostaria de informações sobre convênios.',
    },
  },
  {
    id: 'outra',
    icon: CircleHelp,
    titulo: 'Outra dúvida',
    descricao:
      'Caso não tenha encontrado a informação desejada, nossa equipe poderá ajudar.',
    acao: {
      kind: 'whatsapp',
      mensagem: 'Olá! Tenho uma dúvida e gostaria de falar com a secretaria.',
    },
  },
]
