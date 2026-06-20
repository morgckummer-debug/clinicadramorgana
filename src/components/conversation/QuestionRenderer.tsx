import { Question } from '@/data/conversation/preAgendamento'
import { OptionButton } from './OptionButton'
import { TextAnswer } from './TextAnswer'
import { UploadArea } from './UploadArea'

interface QuestionRendererProps {
  question: Question
  value: string | string[]
  onChange: (value: string | string[]) => void
  onAutoAdvance?: () => void
}

export function QuestionRenderer({
  question,
  value,
  onChange,
  onAutoAdvance,
}: QuestionRendererProps) {
  const { type, options, placeholder } = question

  if (type === 'buttons') {
    const selected = typeof value === 'string' ? value : ''
    return (
      <div className="space-y-2.5">
        {options?.map((opt) => (
          <OptionButton
            key={opt.value}
            label={opt.label}
            value={opt.value}
            selected={selected === opt.value}
            mode="single"
            onClick={(v) => {
              onChange(v)
              setTimeout(() => onAutoAdvance?.(), 300)
            }}
          />
        ))}
      </div>
    )
  }

  if (type === 'multi') {
    const selected = Array.isArray(value) ? value : []
    const toggle = (v: string) => {
      const next = selected.includes(v)
        ? selected.filter((s) => s !== v)
        : [...selected, v]
      onChange(next)
    }
    return (
      <div className="space-y-2.5">
        {options?.map((opt) => (
          <OptionButton
            key={opt.value}
            label={opt.label}
            value={opt.value}
            selected={selected.includes(opt.value)}
            mode="multi"
            onClick={toggle}
          />
        ))}
      </div>
    )
  }

  if (type === 'input' || type === 'textarea') {
    return (
      <TextAnswer
        type={type}
        value={typeof value === 'string' ? value : ''}
        placeholder={placeholder}
        onChange={onChange}
      />
    )
  }

  if (type === 'upload') {
    return <UploadArea />
  }

  return null
}
