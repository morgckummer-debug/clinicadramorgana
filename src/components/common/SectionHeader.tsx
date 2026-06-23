type SectionHeaderProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`max-w-2xl ${alignClass} mb-5`}>
      {eyebrow && (
        <span className="text-wine text-[11px] tracking-[0.4em] uppercase">
          {eyebrow}
        </span>
      )}
      <h1 className="mt-4 font-comfortaa text-wine-deep text-[clamp(1.8rem,5vw,2.6rem)] font-light leading-[1.2]">
        {title}
      </h1>
      {align === 'center' && <div className="mt-6 w-12 h-px bg-champagne mx-auto" />}
      {subtitle && (
        <p className="mt-6 text-foreground/60 font-light text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
