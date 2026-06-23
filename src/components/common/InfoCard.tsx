import type { LucideIcon } from 'lucide-react'
import { IconBadge } from './IconBadge'

type ActionProps = {
  label: string
  icon?: LucideIcon
  onClick?: () => void
  href?: string
  external?: boolean
}

type InfoCardProps = {
  icon: LucideIcon
  title: string
  description?: string
  action?: ActionProps
}

export function InfoCard({ icon, title, description, action }: InfoCardProps) {
  const ActionIcon = action?.icon
  const actionClass =
    'inline-flex items-center gap-2 mt-5 bg-wine-deep text-wine-foreground px-5 py-2.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-wine transition-colors duration-300 self-center'

  const actionNode = action ? (
    action.href ? (
      <a
        href={action.href}
        target={action.external ? '_blank' : undefined}
        rel={action.external ? 'noopener noreferrer' : undefined}
        className={actionClass}
      >
        {ActionIcon && <ActionIcon className="w-3.5 h-3.5" strokeWidth={1.8} />}
        {action.label}
      </a>
    ) : (
      <button type="button" onClick={action.onClick} className={actionClass}>
        {ActionIcon && <ActionIcon className="w-3.5 h-3.5" strokeWidth={1.8} />}
        {action.label}
      </button>
    )
  ) : null

  return (
    <div className="flex flex-col p-5 rounded-3xl border border-champagne/30 bg-white hover:border-wine/30 hover:shadow-[0_4px_20px_rgba(109,50,99,0.08)] transition-all duration-400 h-full">
      <div className="flex items-start gap-4">
        <IconBadge icon={icon} size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-medium text-wine-deep">{title}</h3>
          {description && (
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-foreground/70 font-light">
              {description}
            </p>
          )}
        </div>
      </div>
      {actionNode}
    </div>
  )
}
