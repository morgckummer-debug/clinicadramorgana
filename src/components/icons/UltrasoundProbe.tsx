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
      {/* Ondas sonoras */}
      <path d="M9.5 3.2a3.8 2.5 0 0 1 5 0" />
      <path d="M7.5 1.8a7 4.5 0 0 1 9 0" />

      {/* Cabeça da sonda (trapézio arredondado, mais largo no topo) */}
      <path d="M8 4.5h8l-2 4.5h-4z" />

      {/* Corpo/cabo da sonda */}
      <rect x="10.5" y="9" width="3" height="5.5" rx="1.5" />

      {/* Cabo com curva e loop */}
      <path d="M12 14.5 C12 17.5 9.5 18.5 9.5 20 C9.5 21.5 11 22 12.5 21.5 C15 20.5 15.5 18 14.5 16.5 C13.8 15.5 13 15 12.5 15" />
    </svg>
  )
}
