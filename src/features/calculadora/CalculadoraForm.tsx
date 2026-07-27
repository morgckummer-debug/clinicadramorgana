import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  calcFromDPP,
  calcFromDUM,
  calcFromUS,
  errorMessage,
  parseISODate,
  validateDPP,
  validateDUM,
  validateUS,
  type CalcResult,
} from './calc'

type Props = {
  onResult: (r: CalcResult | null) => void
}

type Mode = 'dum' | 'dpp' | 'us'

export function CalculadoraForm({ onResult }: Props) {
  const [mode, setMode] = useState<Mode>('dum')
  const [dum, setDum] = useState('')
  const [dpp, setDpp] = useState('')
  const [usData, setUsData] = useState('')
  const [usSemanas, setUsSemanas] = useState('')
  const [usDias, setUsDias] = useState('')
  const [error, setError] = useState<string | null>(null)

  const today = new Date().toISOString().slice(0, 10)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (mode === 'dum') {
      const err = validateDUM(dum)
      if (err) { setError(errorMessage(err)); onResult(null); return }
      onResult(calcFromDUM(parseISODate(dum)!))
    } else if (mode === 'dpp') {
      const err = validateDPP(dpp)
      if (err) { setError(errorMessage(err)); onResult(null); return }
      onResult(calcFromDPP(parseISODate(dpp)!))
    } else {
      const s = parseInt(usSemanas, 10)
      const d = parseInt(usDias || '0', 10)
      const err = validateUS(usData, s, d)
      if (err) { setError(errorMessage(err)); onResult(null); return }
      onResult(calcFromUS(parseISODate(usData)!, s, d))
    }
  }

  const inputClass =
    'h-12 w-full rounded-xl border-border/60 bg-card px-5 text-base font-light text-foreground focus-visible:ring-wine/30 focus-visible:border-wine/40'

  const labelClass =
    'block text-[11px] tracking-[0.22em] uppercase text-wine/80 font-medium'

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Tabs
        value={mode}
        onValueChange={(v) => {
          setMode(v as Mode)
          setError(null)
          onResult(null)
        }}
      >
        <TabsList className="grid w-full grid-cols-3 h-12 rounded-2xl bg-champagne/20 p-1">
          <TabsTrigger
            value="dum"
            className="rounded-xl text-[10px] md:text-[11px] tracking-[0.14em] md:tracking-[0.18em] uppercase font-medium data-[state=active]:bg-white data-[state=active]:text-wine-deep data-[state=active]:shadow-sm"
          >
            DUM
          </TabsTrigger>
          <TabsTrigger
            value="dpp"
            className="rounded-xl text-[10px] md:text-[11px] tracking-[0.14em] md:tracking-[0.18em] uppercase font-medium data-[state=active]:bg-white data-[state=active]:text-wine-deep data-[state=active]:shadow-sm"
          >
            DPP
          </TabsTrigger>
          <TabsTrigger
            value="us"
            className="rounded-xl text-[10px] md:text-[11px] tracking-[0.14em] md:tracking-[0.18em] uppercase font-medium data-[state=active]:bg-white data-[state=active]:text-wine-deep data-[state=active]:shadow-sm"
          >
            Ultrassom
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dum" className="mt-6 space-y-2">
          <label className={labelClass}>Data da Última Menstruação</label>
          <Input
            type="date"
            value={dum}
            max={today}
            onChange={(e) => setDum(e.target.value)}
            className={inputClass}
          />
        </TabsContent>

        <TabsContent value="dpp" className="mt-6 space-y-2">
          <label className={labelClass}>Data Provável do Parto</label>
          <Input
            type="date"
            value={dpp}
            min={today}
            onChange={(e) => setDpp(e.target.value)}
            className={inputClass}
          />
        </TabsContent>

        <TabsContent value="us" className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className={labelClass}>Data do ultrassom</label>
            <Input
              type="date"
              value={usData}
              max={today}
              onChange={(e) => setUsData(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Idade gestacional no exame</label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <div className="relative">
                <Input
                  type="number"
                  min={0}
                  max={42}
                  inputMode="numeric"
                  placeholder="0"
                  value={usSemanas}
                  onChange={(e) => setUsSemanas(e.target.value)}
                  className={inputClass + ' pr-20'}
                />
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[10px] tracking-[0.2em] uppercase text-wine/50">
                  semanas
                </span>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  min={0}
                  max={6}
                  inputMode="numeric"
                  placeholder="0"
                  value={usDias}
                  onChange={(e) => setUsDias(e.target.value)}
                  className={inputClass + ' pr-14'}
                />
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[10px] tracking-[0.2em] uppercase text-wine/50">
                  dias
                </span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {error && (
        <p className="mt-3 text-sm text-red-500/80 font-light animate-fade-in">{error}</p>
      )}

      <Button
        type="submit"
        className="mt-8 w-full h-12 rounded-full bg-wine-deep hover:bg-wine text-white text-[12px] tracking-[0.24em] uppercase font-medium transition-colors"
      >
        Calcular
      </Button>
    </form>
  )
}
