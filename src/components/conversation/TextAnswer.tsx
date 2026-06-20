import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type Mask = 'cpf' | 'date' | 'phone' | 'none'

interface TextAnswerProps {
  type: 'input' | 'textarea'
  value: string
  placeholder?: string
  mask?: Mask
  onChange: (value: string) => void
}

function applyMask(raw: string, mask: Mask): string {
  const digits = raw.replace(/\D/g, '')

  if (mask === 'cpf') {
    // 000.000.000-00
    return digits
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
  }

  if (mask === 'date') {
    // DD/MM/AAAA
    return digits
      .slice(0, 8)
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
  }

  if (mask === 'phone') {
    // (00) 00000-0000
    return digits
      .slice(0, 11)
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
  }

  return raw
}

export function TextAnswer({ type, value, placeholder, mask = 'none', onChange }: TextAnswerProps) {
  const baseClass = [
    'w-full bg-card border-border/60 rounded-xl font-light text-sm text-foreground',
    'placeholder:text-muted-foreground/50 focus-visible:ring-wine/30 focus-visible:border-wine/40',
    'transition-all duration-300',
  ].join(' ')

  const handleChange = (raw: string) => {
    onChange(mask !== 'none' ? applyMask(raw, mask) : raw)
  }

  if (type === 'textarea') {
    return (
      <Textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        rows={4}
        className={`${baseClass} resize-none`}
      />
    )
  }

  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.value)}
      inputMode={mask !== 'none' ? 'numeric' : 'text'}
      className={`${baseClass} h-13 px-5 py-4`}
    />
  )
}
