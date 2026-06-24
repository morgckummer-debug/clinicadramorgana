import type { LucideIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { IconBadge } from './IconBadge'

export type InfoBloco = {
  id: string
  icon: LucideIcon
  titulo: string
  linhas: string[]
}

export type InfoListModalContent = {
  titulo: string
  subtitulo?: string
  blocos: InfoBloco[]
  observacao?: string
  botaoPrimario?: {
    label: string
    icon?: LucideIcon
    acao: () => void
  }
  botaoSecundario?: {
    label: string
    acao?: () => void
  }
}

type InfoListModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  content: InfoListModalContent
}

export function InfoListModal({ open, onOpenChange, content }: InfoListModalProps) {
  const { botaoPrimario, botaoSecundario } = content
  const hasActions = Boolean(botaoPrimario || botaoSecundario)

  const handleSecundario = () => {
    botaoSecundario?.acao?.()
    onOpenChange(false)
  }

  const handlePrimario = () => {
    botaoPrimario?.acao()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl border-champagne/40 bg-background p-7 gap-0">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="font-comfortaa text-wine-deep text-xl font-light leading-tight">
            {content.titulo}
          </DialogTitle>
          {content.subtitulo && (
            <DialogDescription className="text-foreground/60 font-light">
              {content.subtitulo}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-6">
          {content.blocos.map((bloco) => (
            <div
              key={bloco.id}
              className="rounded-2xl border border-champagne/40 bg-white p-5 flex gap-4"
            >
              <IconBadge icon={bloco.icon} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-wine-deep">{bloco.titulo}</p>
                <div className="flex flex-col gap-1 mt-2">
                  {bloco.linhas.map((linha, i) => (
                    <p
                      key={i}
                      className="text-[15px] text-foreground/80 font-light leading-snug"
                    >
                      {linha}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {content.observacao && (
          <p className="text-[11px] text-foreground/55 font-light text-center mt-4">
            {content.observacao}
          </p>
        )}

        {hasActions && (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6">
            {botaoSecundario && (
              <button
                type="button"
                onClick={handleSecundario}
                className="px-6 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold text-wine-deep hover:bg-rose/60 transition-colors duration-300"
              >
                {botaoSecundario.label}
              </button>
            )}
            {botaoPrimario && (
              <button
                type="button"
                onClick={handlePrimario}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold bg-wine-deep text-wine-foreground hover:bg-wine transition-colors duration-300"
              >
                {botaoPrimario.icon && (
                  <botaoPrimario.icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                )}
                {botaoPrimario.label}
              </button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
