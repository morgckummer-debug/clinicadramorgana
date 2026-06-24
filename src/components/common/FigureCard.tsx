import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type FigureCardProps = {
  src?: string
  alt?: string
  caption?: string
  description?: string
  aspect?: 'video' | 'square' | 'wide'
}

const aspectMap: Record<NonNullable<FigureCardProps['aspect']>, string> = {
  video: 'aspect-video',
  square: 'aspect-square',
  wide: 'aspect-[21/9]',
}

export function FigureCard({
  src,
  alt = '',
  caption,
  description,
  aspect = 'video',
}: FigureCardProps) {
  return (
    <figure className="w-full">
      <div
        className={cn(
          'w-full overflow-hidden rounded-3xl border border-champagne/40 bg-rose/20 flex items-center justify-center',
          aspectMap[aspect],
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <ImageIcon
            className="w-10 h-10 text-wine/30"
            strokeWidth={1.2}
            aria-hidden
          />
        )}
      </div>
      {(caption || description) && (
        <figcaption className="mt-4 text-center">
          {caption && (
            <p className="text-[13px] tracking-[0.18em] uppercase text-wine font-medium">
              {caption}
            </p>
          )}
          {description && (
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-foreground/65 font-light whitespace-pre-line">
              {description}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  )
}
