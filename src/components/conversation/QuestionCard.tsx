import { ReactNode } from 'react'

interface QuestionCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  animationKey: string
}

export function QuestionCard({ title, subtitle, children, animationKey }: QuestionCardProps) {
  return (
    <div key={animationKey} className="animate-fade-up">
      <div className="mb-8">
        <h2 className="font-comfortaa text-wine-deep text-2xl md:text-3xl font-light leading-[1.2] text-balance mb-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground font-light text-sm leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {children}
      </div>
    </div>
  )
}
