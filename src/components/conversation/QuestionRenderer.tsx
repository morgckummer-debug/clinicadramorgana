import { Question, examsByCategory } from '@/data/conversation/preAgendamento'
import { isValidDateBR, isValidCPF, isValidDUM } from '@/lib/utils'
import { OptionButton } from './OptionButton'
import { TextAnswer } from './TextAnswer'
import { UploadArea } from './UploadArea'

function calcIGFromUS(usDate: string, usWeeks: string): string | null {
  const digits = usDate.replace(/\D/g, '')
  if (digits.length !== 8) return null
  const us = new Date(
    parseInt(digits.slice(4, 8)),
    parseInt(digits.slice(2, 4)) - 1,
    parseInt(digits.slice(0, 2))
  )
  const match = usWeeks.trim().match(/^(\d+)(?:\+(\d+))?$/)
  if (!match) return null
  const igDaysAtUS = parseInt(match[1]) * 7 + (match[2] ? parseInt(match[2]) : 0)
  const daysSinceUS = Math.floor((Date.now() - us.getTime()) / 86400000)
  if (daysSinceUS < 0) return null
  const totalDays = igDaysAtUS + daysSinceUS
  const w = Math.floor(totalDays / 7)
  const d = totalDays % 7
  return `${w} semanas e ${d} dia${d !== 1 ? 's' : ''}`
}

function calcIG(ddmmaaaa: string): string | null {
  const digits = ddmmaaaa.replace(/\D/g, '')
  if (digits.length !== 8) return null
  const dum = new Date(
    parseInt(digits.slice(4, 8)),
    parseInt(digits.slice(2, 4)) - 1,
    parseInt(digits.slice(0, 2))
  )
  const diffDays = Math.floor((Date.now() - dum.getTime()) / 86400000)
  // Máximo 41 semanas = 287 dias
  if (diffDays < 0 || diffDays > 287) return null
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
  optional?: boolean
}

export function QuestionRenderer({
  question,
  value,
  onChange,
  onAutoAdvance,
  answers = {},
  optional = false,
}: QuestionRendererProps) {
  const { type, placeholder } = question

  // q2 resolve suas opções dinamicamente com base na categoria escolhida em q1
  const options = question.id === 'q2'
    ? [
        ...(examsByCategory[answers['q1'] as string] ?? []).map((name) => ({ label: name, value: name })),
        { label: 'Não sei ao certo / letra ilegível', value: 'nao-sei' },
      ]
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
    const isDUMQuestion = question.id === 'q2c' || question.id === 'ob1_b'
    const ig = isDUMQuestion && !isOvulacao ? calcIG(strValue) : null
    const isUSWeeksQuestion = question.id === 'q2b_us_sem'
    const usIg = isUSWeeksQuestion && strValue.trim() !== ''
      ? calcIGFromUS((answers['q2b_us_data'] as string) ?? '', strValue)
      : null
    const isDateComplete = question.mask === 'date' && strValue.replace(/\D/g, '').length === 8
    const dateError = isDateComplete && !isValidDateBR(strValue)
      ? 'Data inválida. Verifique dia, mês e ano.'
      : undefined
    const isDUMExceeded = isDUMQuestion && isDateComplete && !isValidDUM(strValue)
      ? 'A DUM informada passa de 41 semanas. Por favor, verifique a data.'
      : undefined
    const isCpfComplete = question.mask === 'cpf' && strValue.replace(/\D/g, '').length === 11
    const cpfError = isCpfComplete && !isValidCPF(strValue)
      ? 'CPF inválido. Por favor, verifique os números digitados.'
      : undefined
    return (
      <div className="space-y-2">
        <TextAnswer
          type={type}
          value={strValue}
          placeholder={placeholder}
          mask={question.mask}
          onChange={onChange}
          error={isDUMExceeded ?? dateError ?? cpfError}
        />

        {(ig ?? usIg) && (
          <p className="text-sm text-center text-wine-deep font-light animate-fade-in">
            Idade gestacional estimada: <span className="font-medium">{ig ?? usIg}</span>
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
        optional={optional}
      />
    )
  }

  return null
}
