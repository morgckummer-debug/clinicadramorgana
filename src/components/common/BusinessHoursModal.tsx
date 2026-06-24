import { MessageCircle } from 'lucide-react'
import { InfoListModal, type InfoListModalContent } from './InfoListModal'
import { businessHoursContent } from '@/content/businessHours'
import { whatsappComMensagem } from '@/lib/contato'

type BusinessHoursModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  content?: typeof businessHoursContent
  onPrimaryAction?: () => void
}

export function BusinessHoursModal({
  open,
  onOpenChange,
  content = businessHoursContent,
  onPrimaryAction,
}: BusinessHoursModalProps) {
  const acaoPrimaria =
    onPrimaryAction ??
    (() =>
      window.open(
        whatsappComMensagem(content.botaoPrimario.mensagemWhatsapp),
        '_blank',
      ))

  const modalContent: InfoListModalContent = {
    titulo: content.titulo,
    subtitulo: content.subtitulo,
    blocos: content.blocos,
    observacao: content.observacao,
    botaoPrimario: {
      label: content.botaoPrimario.label,
      icon: MessageCircle,
      acao: acaoPrimaria,
    },
    botaoSecundario: {
      label: content.botaoSecundario.label,
    },
  }

  return <InfoListModal open={open} onOpenChange={onOpenChange} content={modalContent} />
}
