import { AlertTriangle } from 'lucide-react'
import { InfoBlock } from './InfoBlock'
import { getIcon, type IconKey } from '@/data/preparos/icons'

export type InfoBlockItem = {
  icon: IconKey
  title: string
  items: string[]
}

type InfoBlockListProps = {
  blocks: InfoBlockItem[]
  observations?: string[]
  observationsTitle?: string
}

export function InfoBlockList({
  blocks,
  observations,
  observationsTitle = 'Observações importantes',
}: InfoBlockListProps) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => (
        <InfoBlock
          key={i}
          icon={getIcon(b.icon)}
          title={b.title}
          items={b.items}
        />
      ))}
      {observations && observations.length > 0 && (
        <div className="mt-2 p-4 rounded-2xl bg-champagne-soft/40 border border-champagne/40">
          <div className="flex gap-3">
            <AlertTriangle
              className="w-4 h-4 text-wine-deep flex-shrink-0 mt-0.5"
              strokeWidth={1.8}
            />
            <div>
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-wine-deep font-semibold">
                {observationsTitle}
              </h4>
              <ul className="mt-2 space-y-1.5">
                {observations.map((o, i) => (
                  <li
                    key={i}
                    className="text-[13.5px] leading-relaxed text-foreground/80 font-light"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
