import { Check } from 'lucide-react'

interface OptionButtonProps {
  label: string
  value: string
  selected: boolean
  mode: 'single' | 'multi'
  onClick: (value: string) => void
}

export function OptionButton({ label, value, selected, mode, onClick }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={[
        'w-full flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 rounded-2xl border text-left',
        'transition-all duration-300 font-normal text-sm sm:text-base leading-snug',
        'hover:border-champagne hover:shadow-soft hover:-translate-y-px',
        selected
          ? 'border-wine bg-wine/5 text-wine-deep shadow-soft'
          : 'border-border bg-card text-wine-deep',
      ].join(' ')}
    >
      <span>{label}</span>
      {selected && (
        <span
          className={[
            'flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0',
            mode === 'multi' ? 'bg-wine text-wine-foreground' : 'bg-champagne',
          ].join(' ')}
        >
          {mode === 'multi' && <Check className="w-3 h-3" />}
        </span>
      )}
      {!selected && (
        <span className="w-5 h-5 rounded-full border border-border/60 flex-shrink-0" />
      )}
    </button>
  )
}
