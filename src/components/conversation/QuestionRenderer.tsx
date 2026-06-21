import { Question, examsByCategory } from '@/data/conversation/preAgendamento'
import { OptionButton } from './OptionButton'
import { TextAnswer } from './TextAnswer'
import { UploadArea } from './UploadArea'

function calcIG(ddmmaaaa: string): string | null {
  const digits = ddmmaaaa.replace(/\D/g, '')
  if (digits.length !== 8) return null
  const dum = new Date(
    parseInt(digits.slice(4, 8)),
    parseInt(digits.slice(2, 4)) - 1,
    parseInt(digits.slice(0, 2))
  )
  const diffDays = Math.floor((Date.now() - dum.getTime()) / 86400000)
  if (diffDays < 0 || diffDays > 300) return null
  const weeks = Math.floor(diffDays / 7)
  const days = diffDays % 7
  return `${weeks} semanas e ${days} dia${days !== 1 ? 's' : ''}`
}

interface QuestionRendererProps {
  question: Question
  value: string | string[]
  onChange: (value: string | string[]) => void
  onAutoAdvance?: (selectedValue: string) => void
  answers?: Record<string, string | string[]>
}

export function QuestionRenderer({
  question,
  value,
  onChange,
  onAutoAdvance,
  answers = {},
}: QuestionRendererProps) {
  const { type, placeholder } = question

  // q2 resolve suas opções dinamicamente com base na categoria escolhida em q1
  const options = question.id === 'q2'
    ? (examsByCategory[answers['q1'] as string] ?? []).map((name) => ({
        label: name,
        value: name,
      }))
    : question.options ?? []

  if (type === 'buttons') {
    const selected = typeof value === 'string' ? value : ''
    return (
      <div className="space-y-2.5">
        {options.map((opt) => (
          <OptionButton
            key={opt.value}
            label={opt.label}
            value={opt.value}
            selected={selected === opt.value}
            mode="single"
            onClick={(v) => {
              onChange(v)
              setTimeout(() => onAutoAdvance?.(v), 300)
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
        {options.map((opt) => (
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
    const strValue = typeof value === 'string' ? value : ''
    const isOvulacao = answers['q2'] === 'Rastreamento de Ovulação'
    const ig = question.id === 'q2c' && !isOvulacao ? calcIG(strValue) : null
    return (
      <div className="space-y-2">
        <TextAnswer
          type={type}
          value={strValue}
          placeholder={placeholder}
          mask={question.mask}
          onChange={onChange}
        />
        {ig && (
          <p className="text-sm text-center text-wine-deep font-light animate-fade-in">
            Idade gestacional estimada: <span className="font-medium">{ig}</span>
          </p>
        )}
      </div>
    )
  }

  if (type === 'upload') {
    return (
      <UploadArea
        value={Array.isArray(value) ? value : value ? [value as string] : []}
        onChange={(urls) => onChange(urls)}
      />
    )
  }

  return null
}
