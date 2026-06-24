import type { LucideIcon } from 'lucide-react'
import { IconBadge } from './IconBadge'

type InfoBlockProps = {
  icon: LucideIcon
  title: string
  items: string[]
}

export function InfoBlock({ icon, title, items }: InfoBlockProps) {
  return (
    <div className="flex gap-4">
      <IconBadge icon={icon} size="sm" />
      <div className="flex-1 min-w-0 pt-1">
        <h3 className="text-[11px] tracking-[0.25em] uppercase text-wine font-semibold">
          {title}
        </h3>
        <ul className="mt-2 space-y-1.5">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-[14px] leading-relaxed text-foreground/80 font-light"
            >
              <span className="mt-2 w-1 h-1 rounded-full bg-champagne flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
