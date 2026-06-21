import { ArrowLeft, ArrowRight } from 'lucide-react'

interface NavigationButtonsProps {
  onBack?: () => void
  onNext: () => void
  nextDisabled?: boolean
  showBack: boolean
  showNext?: boolean
  optional?: boolean
}

export function NavigationButtons({
  onBack,
  onNext,
  nextDisabled = false,
  showBack,
  showNext = false,
  optional = false,
}: NavigationButtonsProps) {
  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-muted-foreground text-[11px] tracking-[0.2em] uppercase font-medium hover:text-wine-deep transition-colors duration-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar
        </button>
      ) : (
        <span />
      )}

      {showNext && (
        <div className="flex flex-col items-end gap-1">
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            className={[
              'inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full',
              'text-[11px] tracking-[0.25em] uppercase font-semibold',
              'transition-all duration-500',
              nextDisabled
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'hover:gap-3.5 shadow-soft hover:shadow-elegant',
            ].join(' ')}
            style={!nextDisabled ? { backgroundColor: '#FDDCB5', color: '#5B2D8E', border: '1px solid #5B2D8E' } : undefined}
          >
            Continuar
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          {optional && (
            <button
              type="button"
              onClick={onNext}
              className="text-[10px] text-muted-foreground hover:text-wine-deep transition-colors duration-300 tracking-wide"
            >
              Pular esta etapa
            </button>
          )}
        </div>
      )}
    </div>
  )
}
