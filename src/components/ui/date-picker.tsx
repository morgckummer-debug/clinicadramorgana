import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Matcher } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type Props = {
  /** Data em formato ISO (yyyy-MM-dd) ou string vazia */
  value: string
  onChange: (iso: string) => void
  /** yyyy-MM-dd */
  min?: string
  /** yyyy-MM-dd */
  max?: string
  placeholder?: string
  className?: string
}

function toDate(iso?: string): Date | undefined {
  if (!iso) return undefined
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return undefined
  return new Date(y, m - 1, d)
}

function toISO(d: Date): string {
  return format(d, 'yyyy-MM-dd')
}

export function DatePicker({
  value,
  onChange,
  min,
  max,
  placeholder = 'Selecione a data',
  className,
}: Props) {
  const [open, setOpen] = useState(false)
  const selected = toDate(value)
  const minDate = toDate(min)
  const maxDate = toDate(max)
  const [month, setMonth] = useState<Date>(selected ?? maxDate ?? minDate ?? new Date())

  const disabled: Matcher[] = []
  if (minDate) disabled.push({ before: minDate })
  if (maxDate) disabled.push({ after: maxDate })

  const thisYear = new Date().getFullYear()
  const fromYear = minDate?.getFullYear() ?? thisYear - 2
  const toYear = maxDate?.getFullYear() ?? thisYear + 2

  function pick(d: Date | undefined) {
    if (!d) return
    onChange(toISO(d))
    setOpen(false)
  }

  function goToday() {
    const t = new Date()
    const isDisabled =
      (minDate && t < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) ||
      (maxDate && t > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59))
    setMonth(t)
    if (!isDisabled) pick(t)
  }

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (o) setMonth(selected ?? maxDate ?? minDate ?? new Date())
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'group flex h-12 w-full items-center justify-between rounded-xl border border-border/60 bg-card px-5 text-left text-base font-light transition-all',
            'hover:border-wine/30 focus-visible:outline-none focus-visible:border-wine/40 focus-visible:ring-2 focus-visible:ring-wine/20',
            'data-[state=open]:border-wine/40 data-[state=open]:ring-2 data-[state=open]:ring-wine/20',
            selected ? 'text-foreground' : 'text-muted-foreground/70',
            className,
          )}
        >
          <span>{selected ? format(selected, 'dd/MM/yyyy') : placeholder}</span>
          <CalendarDays
            className="h-[18px] w-[18px] text-wine/60 transition-colors group-hover:text-wine"
            strokeWidth={1.5}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-auto rounded-3xl border border-wine/10 bg-white p-4 shadow-[0_24px_60px_-16px_rgba(91,45,142,0.35)]"
      >
        <Calendar
          mode="single"
          locale={ptBR}
          selected={selected}
          onSelect={pick}
          month={month}
          onMonthChange={setMonth}
          disabled={disabled}
          captionLayout="dropdown-buttons"
          fromYear={fromYear}
          toYear={toYear}
          showOutsideDays
          fixedWeeks
          className="p-0"
          components={{
            IconLeft: () => <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />,
            IconRight: () => <ChevronRight className="h-4 w-4" strokeWidth={1.75} />,
          }}
          classNames={{
            caption: 'relative flex items-center justify-center pb-2',
            caption_label: 'hidden',
            caption_dropdowns: 'flex items-center gap-1.5',
            dropdown:
              'cursor-pointer appearance-none rounded-full bg-champagne/25 px-3 py-1.5 text-[13px] font-medium capitalize text-wine-deep outline-none transition-colors hover:bg-champagne/40 focus-visible:ring-2 focus-visible:ring-wine/30',
            dropdown_month: 'relative',
            dropdown_year: 'relative',
            vhidden: 'sr-only',
            nav_button:
              'inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent p-0 text-wine/70 opacity-100 transition-colors hover:bg-champagne/30 hover:text-wine-deep',
            nav_button_previous: 'absolute left-0',
            nav_button_next: 'absolute right-0',
            head_row: 'flex mt-2',
            head_cell:
              'w-10 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-wine/50',
            row: 'mt-1 flex w-full',
            cell: 'relative h-10 w-10 p-0 text-center text-sm focus-within:relative focus-within:z-20',
            day: 'h-10 w-10 rounded-full p-0 text-[14px] font-light text-foreground transition-all hover:bg-champagne/30 hover:text-wine-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine/30 aria-selected:opacity-100',
            day_selected:
              '!bg-wine-deep !font-medium !text-white shadow-[0_6px_16px_-6px_rgba(91,45,142,0.6)] hover:!bg-wine hover:!text-white focus:!bg-wine-deep focus:!text-white',
            day_today: 'bg-transparent font-semibold text-wine ring-1 ring-wine/30',
            day_outside: 'text-muted-foreground/40 opacity-100',
            day_disabled: 'cursor-not-allowed text-muted-foreground/30 opacity-100 hover:bg-transparent',
          }}
        />

        <div className="mt-3 flex items-center justify-between border-t border-wine/10 pt-3">
          <button
            type="button"
            onClick={() => {
              onChange('')
              setOpen(false)
            }}
            className="rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-wine/60 transition-colors hover:bg-champagne/30 hover:text-wine-deep"
          >
            Limpar
          </button>
          <button
            type="button"
            onClick={goToday}
            className="rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-wine transition-colors hover:bg-champagne/30 hover:text-wine-deep"
          >
            Hoje
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
