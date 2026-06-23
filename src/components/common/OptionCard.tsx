import { ChevronRight, type LucideIcon } from 'lucide-react'
import { IconBadge } from './IconBadge'

type OptionCardProps = {
  icon: LucideIcon
  title: string
  description?: string
  onClick?: () => void
  href?: string
  external?: boolean
}

export function OptionCard({
  icon,
  title,
  description,
  onClick,
  href,
  external,
}: OptionCardProps) {
  const content = (
    <>
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <IconBadge icon={icon} size="md" />
        <div className="min-w-0 flex-1 text-left">
          <p className="text-[15px] font-medium text-wine-deep truncate">
            {title}
          </p>
          {description && (
            <p className="text-xs text-foreground/60 font-light mt-0.5 truncate">
              {description}
            </p>
          )}
        </div>
      </div>
      <ChevronRight
        className="w-4 h-4 text-wine/60 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
        strokeWidth={1.5}
      />
    </>
  )

  const className =
    'group flex items-center gap-3 p-5 rounded-3xl border border-champagne/30 bg-white hover:border-wine/30 hover:shadow-[0_4px_20px_rgba(109,50,99,0.08)] transition-all duration-400 cursor-pointer w-full text-left'

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  )
}
