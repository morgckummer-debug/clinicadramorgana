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
    <div className="mt-8 flex items-center justify-between gap-2 sm:gap-4">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 sm:gap-2 text-muted-foreground text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium hover:text-wine-deep transition-colors duration-300 flex-shrink-0"
        >
          <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden xs:inline">Voltar</span>
          <span className="inline xs:hidden">←</span>
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
              'inline-flex items-center gap-1.5 sm:gap-2.5 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full whitespace-nowrap',
              'text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold',
              'transition-all duration-500',
              nextDisabled
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'hover:gap-3.5 shadow-soft hover:shadow-elegant',
            ].join(' ')}
            style={!nextDisabled ? { backgroundColor: '#FDDCB5', color: '#5B2D8E', border: '1px solid #5B2D8E' } : undefined}
          >
            <span className="hidden sm:inline">Continuar</span>
            <span className="inline sm:hidden">Ok</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
          {optional && (
            <button
              type="button"
              onClick={onNext}
              className="text-[9px] sm:text-[10px] text-muted-foreground hover:text-wine-deep transition-colors duration-300 tracking-wide"
            >
              Pular
            </button>
          )}
        </div>
      )}
    </div>
  )
}
