import { Progress } from '@/components/ui/progress'

interface ProgressBarProps {
  current: number
  total: number
}

const STAGE_LABELS = [
  { label: 'Informações iniciais', upTo: 3 },
  { label: 'Dados do exame', upTo: 7 },
  { label: 'Contato', upTo: 9 },
  { label: 'Confirmação', upTo: Infinity },
]

function getStageLabel(current: number): string {
  return STAGE_LABELS.find((s) => current <= s.upTo)?.label ?? 'Confirmação'
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="mb-8 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
          {getStageLabel(current)}
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
