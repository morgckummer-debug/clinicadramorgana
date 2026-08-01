import { useEffect, useState } from 'react'
import { Baby } from 'lucide-react'
import { PageShell } from '@/components/common/PageShell'
import { SectionHeader } from '@/components/common/SectionHeader'
import { CalculadoraForm } from '@/features/calculadora/CalculadoraForm'
import { CalculadoraResultado } from '@/features/calculadora/CalculadoraResultado'
import type { CalcResult } from '@/features/calculadora/calc'

const TITLE = 'Calculadora de Idade Gestacional | Dra. Morgana Kummer'
const DESCRIPTION =
  'Calcule sua idade gestacional em semanas, meses e dias. Descubra em qual mês da gravidez você está, o trimestre gestacional e a data provável do parto.'
const CANONICAL = 'https://dramorgana.com.br/calculadora-idade-gestacional'

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function CalculadoraIdadeGestacional() {
  const [result, setResult] = useState<CalcResult | null>(null)

  useEffect(() => {
    const prevTitle = document.title
    document.title = TITLE
    setMeta('description', DESCRIPTION)
    setMeta('og:title', TITLE, 'property')
    setMeta('og:description', DESCRIPTION, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', CANONICAL, 'property')
    setCanonical(CANONICAL)
    return () => {
      document.title = prevTitle
    }
  }, [])

  return (
    <PageShell>
      <div className="relative isolate w-full overflow-hidden">
        {/* Fundo decorativo */}
        <div
          className="pointer-events-none absolute -z-10 -top-6 -left-10 w-[22rem] h-[22rem] rounded-full blur-[90px]"
          style={{ background: 'radial-gradient(circle, hsl(var(--rose-deep) / 0.35) 0%, transparent 55%)' }}
        />
        <div
          className="pointer-events-none absolute -z-10 top-24 -right-12 w-[24rem] h-[24rem] rounded-full blur-[90px]"
          style={{ background: 'radial-gradient(circle, hsl(var(--champagne) / 0.4) 0%, transparent 55%)' }}
        />

        <div className="flex justify-center mb-2">
          <div className="w-14 h-14 rounded-full bg-rose/40 border border-champagne/60 flex items-center justify-center">
            <Baby className="w-6 h-6 text-wine-deep" strokeWidth={1.5} />
          </div>
        </div>

        <SectionHeader
          eyebrow="Para gestantes"
          title="Calculadora de Idade Gestacional"
          subtitle="Descubra sua idade gestacional, o mês aproximado da gravidez e a data provável do parto."
        />

        <div className="mx-auto w-full max-w-xl mt-8 rounded-3xl bg-white/80 border border-champagne/30 p-6 md:p-10 shadow-[0_10px_40px_-30px_rgba(91,45,142,0.3)]">
          <CalculadoraForm onResult={setResult} />
        </div>

        {result && (
          <div className="mx-auto w-full max-w-2xl">
            <CalculadoraResultado result={result} />
          </div>
        )}
      </div>
    </PageShell>
  )
}
