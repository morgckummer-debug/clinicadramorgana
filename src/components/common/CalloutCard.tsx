import { MessageCircle } from 'lucide-react'
import { IconBadge } from './IconBadge'

type CalloutCardProps = {
  question: string
  description?: string
  cta: string
  href?: string
  onClick?: () => void
  external?: boolean
}

export function CalloutCard({
  question,
  description,
  cta,
  href,
  onClick,
  external,
}: CalloutCardProps) {
  const button = (
    <span className="inline-flex items-center gap-2 bg-wine-deep text-wine-foreground px-6 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-wine transition-colors duration-300">
      <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.8} />
      {cta}
    </span>
  )

  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center gap-5 p-6 rounded-3xl border border-champagne/30 bg-white/60">
      <IconBadge icon={MessageCircle} size="md" />
      <div className="flex-1 text-center sm:text-left">
        <p className="text-[15px] font-medium text-wine-deep">{question}</p>
        {description && (
          <p className="text-xs text-foreground/60 font-light mt-1">
            {description}
          </p>
        )}
      </div>
      {href ? (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {button}
        </a>
      ) : (
        <button type="button" onClick={onClick}>
          {button}
        </button>
      )}
    </div>
  )
}
