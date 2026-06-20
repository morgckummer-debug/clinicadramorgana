import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface TextAnswerProps {
  type: 'input' | 'textarea'
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

export function TextAnswer({ type, value, placeholder, onChange }: TextAnswerProps) {
  const baseClass = [
    'w-full bg-card border-border/60 rounded-xl font-light text-sm text-foreground',
    'placeholder:text-muted-foreground/50 focus-visible:ring-wine/30 focus-visible:border-wine/40',
    'transition-all duration-300',
  ].join(' ')

  if (type === 'textarea') {
    return (
      <Textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className={`${baseClass} resize-none`}
      />
    )
  }

  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${baseClass} h-13 px-5 py-4`}
    />
  )
}
