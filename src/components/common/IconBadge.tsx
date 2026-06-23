import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type SvgIcon = (props: { className?: string; strokeWidth?: number }) => React.ReactElement

type IconBadgeProps = {
  icon: LucideIcon | SvgIcon
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: { box: 'w-9 h-9 rounded-xl', icon: 'w-4 h-4' },
  md: { box: 'w-12 h-12 rounded-2xl', icon: 'w-5 h-5' },
  lg: { box: 'w-16 h-16 rounded-2xl', icon: 'w-7 h-7' },
}

export function IconBadge({ icon: Icon, size = 'md', className }: IconBadgeProps) {
  const s = sizeMap[size]
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-rose/60 text-wine-deep flex-shrink-0',
        s.box,
        className,
      )}
    >
      <Icon className={s.icon} strokeWidth={1.5} />
    </div>
  )
}
