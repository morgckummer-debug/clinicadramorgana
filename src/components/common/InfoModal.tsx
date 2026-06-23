import type { ReactNode } from 'react'
import { Clock, type LucideIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { commonContent } from '@/content/common'

export type ModalAction = {
  label: string
  onClick?: () => void
  href?: string
  external?: boolean
  variant?: 'primary' | 'ghost'
  icon?: LucideIcon
}

type InfoModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  metaIcon?: LucideIcon
  metaLabel?: string
  footerNote?: string
  actions?: ModalAction[]
  children: ReactNode
}

export function InfoModal({
  open,
  onOpenChange,
  title,
  metaIcon: MetaIcon = Clock,
  metaLabel,
  footerNote,
  actions,
  children,
}: InfoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-3xl border-champagne/40 bg-background p-0 gap-0 max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-7 pt-7 pb-5 text-left space-y-3">
          <DialogTitle className="font-comfortaa text-wine-deep text-xl md:text-2xl font-light leading-tight">
            {title}
          </DialogTitle>
          {metaLabel && (
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-wine/80">
              <MetaIcon className="w-3.5 h-3.5" strokeWidth={1.8} />
              <span>{metaLabel}</span>
            </div>
          )}
        </DialogHeader>

        <Separator className="bg-champagne/40" />

        <div className="px-7 py-6 overflow-y-auto flex-1">{children}</div>

        {(footerNote || (actions && actions.length > 0)) && (
          <div className="px-7 pb-6 pt-2 border-t border-champagne/20 bg-rose/20">
            {footerNote && (
              <p className="text-[11px] leading-relaxed text-foreground/55 font-light mb-4 mt-3">
                {footerNote}
              </p>
            )}
            {actions && actions.length > 0 && (
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="px-6 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold text-wine-deep hover:bg-rose/60 transition-colors duration-300"
                >
                  {commonContent.fechar}
                </button>
                {actions.map((a, i) => {
                  const Icon = a.icon
                  const baseClass =
                    a.variant === 'ghost'
                      ? 'text-wine-deep hover:bg-rose/60'
                      : 'bg-wine-deep text-wine-foreground hover:bg-wine'
                  const cls = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold transition-colors duration-300 ${baseClass}`
                  if (a.href) {
                    return (
                      <a
                        key={i}
                        href={a.href}
                        target={a.external ? '_blank' : undefined}
                        rel={a.external ? 'noopener noreferrer' : undefined}
                        onClick={a.onClick}
                        className={cls}
                      >
                        {Icon && <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />}
                        {a.label}
                      </a>
                    )
                  }
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={a.onClick}
                      className={cls}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />}
                      {a.label}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
