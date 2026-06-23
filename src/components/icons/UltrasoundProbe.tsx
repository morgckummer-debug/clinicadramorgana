import { cn } from '@/lib/utils'

type Props = {
  className?: string
  strokeWidth?: number
}

export function UltrasoundProbe({ className, strokeWidth = 1.5 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('lucide', className)}
    >
      {/* Cabo da sonda */}
      <rect x="8" y="10" width="5" height="9" rx="2.5" />
      {/* Cabo/fio */}
      <line x1="10.5" y1="19" x2="10.5" y2="22" />
      {/* Ondas sonoras */}
      <path d="M16 8.5a4.5 4.5 0 0 1 0 6" />
      <path d="M18.5 6a8 8 0 0 1 0 11" />
    </svg>
  )
}
