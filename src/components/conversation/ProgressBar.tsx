import { Progress } from '@/components/ui/progress'

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="mb-8 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
          Etapa {current} de {total}
        </span>
        <span className="text-[10px] tracking-[0.2em] text-muted-foreground font-light">
          {percentage}%
        </span>
      </div>
      <Progress
        value={percentage}
        className="h-0.5 bg-border"
      />
    </div>
  )
}
