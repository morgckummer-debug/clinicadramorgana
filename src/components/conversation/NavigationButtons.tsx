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
    <div className="sticky bottom-0 mt-8 flex items-center justify-between gap-2 sm:gap-4 bg-background/95 backdrop-blur-sm pb-safe pt-3 pb-4 -mx-1 px-1">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2 sm:gap-2.5 text-muted-foreground hover:text-wine-deep transition-all duration-300 flex-shrink-0"
        >
          <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border group-hover:border-wine-deep group-hover:bg-wine-deep/5 transition-all duration-300">
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
          <span className="text-[11px] sm:text-xs tracking-[0.15em] uppercase font-medium">Voltar</span>
        </button>
      ) : (
        <span />
      )}

      {showNext && (
        <div className="flex flex-col items-end gap-1.5">
          <button
            type="button"
            onClick={() => onNext()}
            disabled={nextDisabled}
            className={[
              'inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-3.5 rounded-full whitespace-nowrap',
              'text-[11px] sm:text-xs tracking-[0.2em] uppercase font-semibold',
              'transition-all duration-500',
              nextDisabled
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'hover:gap-4 shadow-soft hover:shadow-elegant hover:scale-[1.02]',
            ].join(' ')}
            style={
              !nextDisabled
                ? { backgroundColor: '#FDDCB5', color: '#5B2D8E', border: '1.5px solid #5B2D8E' }
                : undefined
            }
          >
            <span>Ok</span>
            <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
          {optional && (
            <button
              type="button"
              onClick={() => onNext()}
              className="text-[10px] sm:text-[11px] text-muted-foreground hover:text-wine-deep transition-colors duration-300 tracking-wide"
            >
              Pular
            </button>
          )}
        </div>
      )}
    </div>
  )
}
