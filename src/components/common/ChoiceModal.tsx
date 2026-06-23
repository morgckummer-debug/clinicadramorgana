import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { getIcon, type IconKey } from '@/data/preparos/icons'

export type ChoiceOption = {
  id: string
  label: string
  icon: IconKey
}

type ChoiceModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  options: ChoiceOption[]
  onSelect: (id: string) => void
}

export function ChoiceModal({
  open,
  onOpenChange,
  title,
  description,
  options,
  onSelect,
}: ChoiceModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl border-champagne/40 bg-background p-7">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="font-comfortaa text-wine-deep text-xl font-light leading-tight">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-foreground/60 font-light">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {options.map((opt) => {
            const Icon = getIcon(opt.icon)
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelect(opt.id)}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-champagne/40 bg-white hover:border-wine/40 hover:bg-rose/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-rose/60 text-wine-deep flex items-center justify-center group-hover:bg-wine-deep group-hover:text-wine-foreground transition-colors duration-300">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <span className="text-[13px] font-medium text-wine-deep">
                  {opt.label}
                </span>
              </button>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
