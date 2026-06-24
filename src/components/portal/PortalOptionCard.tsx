import { ArrowRight } from 'lucide-react'
import { IconBadge } from '@/components/common/IconBadge'
import type { PortalOption } from '@/data/patientPortal'

type PortalOptionCardProps = {
  option: PortalOption
  onSelect: (option: PortalOption) => void
}

export function PortalOptionCard({ option, onSelect }: PortalOptionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      className="relative w-full flex flex-col rounded-3xl border border-champagne/30 bg-white p-6 transition-all duration-300 hover:shadow-md hover:border-champagne/50 text-left"
    >
      {/* Badge opcional */}
      {option.badge && (
        <span className="absolute -top-2 right-5 bg-wine-deep text-wine-foreground text-[9px] tracking-[0.3em] uppercase px-3 py-1 rounded-full whitespace-nowrap">
          {option.badge}
        </span>
      )}

      {/* Corpo principal */}
      <div className="flex gap-4 mb-6">
        {/* Ícone à esquerda */}
        <IconBadge icon={option.icon} size="lg" />

        {/* Título e descrição à direita */}
        <div className="flex flex-col flex-1">
          <h3 className="text-wine-deep font-medium text-[16px] leading-tight">
            {option.titulo}
          </h3>
          <p className="text-foreground/60 font-light text-[13px] leading-relaxed mt-1">
            {option.descricao}
          </p>
        </div>
      </div>

      {/* Rodapé com botão */}
      <span className="flex items-center justify-center gap-2 w-full bg-wine-deep text-wine-foreground py-3 px-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 group/button">
        {option.buttonLabel}
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/button:translate-x-0.5" />
      </span>
    </button>
  )
}
