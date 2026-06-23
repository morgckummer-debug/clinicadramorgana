import type { LucideIcon } from 'lucide-react'
import { IconBadge } from './IconBadge'

type ActionProps = {
  label: string
  icon?: LucideIcon
  onClick?: () => void
  href?: string
  external?: boolean
}

type HighlightCardProps = {
  eyebrow?: string
  icon?: LucideIcon
  title?: string
  lines?: string[]
  primaryAction?: ActionProps
}

export function HighlightCard({
  eyebrow,
  icon,
  title,
  lines,
  primaryAction,
}: HighlightCardProps) {
  const visibleLines = (lines ?? []).filter((l) => l && l.trim().length > 0)
  const ActionIcon = primaryAction?.icon
  const actionClass =
    'inline-flex items-center gap-2 bg-wine-deep text-wine-foreground px-7 py-3.5 rounded-full text-[12px] tracking-[0.22em] uppercase font-semibold hover:bg-wine transition-colors duration-300'

  const actionNode = primaryAction ? (
    primaryAction.href ? (
      <a
        href={primaryAction.href}
        target={primaryAction.external ? '_blank' : undefined}
        rel={primaryAction.external ? 'noopener noreferrer' : undefined}
        className={actionClass}
      >
        {ActionIcon && <ActionIcon className="w-4 h-4" strokeWidth={1.8} />}
        {primaryAction.label}
      </a>
    ) : (
      <button
        type="button"
        onClick={primaryAction.onClick}
        className={actionClass}
      >
        {ActionIcon && <ActionIcon className="w-4 h-4" strokeWidth={1.8} />}
        {primaryAction.label}
      </button>
    )
  ) : null

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-7 sm:p-8 rounded-3xl border border-champagne/40 bg-gradient-to-br from-white to-rose/20 shadow-[0_4px_24px_rgba(109,50,99,0.06)]">
      <div className="flex items-start gap-5 flex-1 min-w-0">
        {icon && <IconBadge icon={icon} size="lg" />}
        <div className="flex-1 min-w-0">
          {eyebrow && (
            <span className="text-wine text-[10px] tracking-[0.35em] uppercase">
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 className="mt-2 font-comfortaa text-wine-deep text-[1.4rem] sm:text-[1.6rem] font-light leading-tight">
              {title}
            </h2>
          )}
          {visibleLines.length > 0 && (
            <div className="mt-3 space-y-1">
              {visibleLines.map((line, i) => (
                <p
                  key={i}
                  className="text-[14px] leading-relaxed text-foreground/70 font-light"
                >
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      {actionNode && (
        <div className="flex-shrink-0 sm:self-center">{actionNode}</div>
      )}
    </div>
  )
}
