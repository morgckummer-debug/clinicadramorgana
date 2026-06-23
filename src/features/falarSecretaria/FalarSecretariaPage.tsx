import { useState } from 'react'
import { Clock, MessageCircle } from 'lucide-react'
import { PageShell } from '@/components/common/PageShell'
import { SectionHeader } from '@/components/common/SectionHeader'
import { CalloutCard } from '@/components/common/CalloutCard'
import { falarSecretariaContent as content } from '@/content/falarSecretaria'
import { assuntos } from '@/data/falarSecretaria'
import { whatsappComMensagem } from '@/lib/contato'
import { getStatusAtendimento } from '@/lib/atendimento'

export function FalarSecretariaPage() {
  const [selecionado, setSelecionado] = useState<string | null>(null)

  const assuntoAtual = assuntos.find((a) => a.id === selecionado) ?? null

  function abrirWhatsApp() {
    if (!assuntoAtual || assuntoAtual.acao.kind !== 'whatsapp') return
    window.open(
      whatsappComMensagem(assuntoAtual.acao.mensagem),
      '_blank',
      'noopener,noreferrer',
    )
  }

  const status = getStatusAtendimento()
  const descricaoHorario =
    content.horario.mensagens[status] ?? content.horario.descricaoPadrao

  return (
    <PageShell>
      <SectionHeader
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.subtitle}
      />

      <div className="mt-8 flex flex-col gap-3">
        {assuntos.map((a) => {
          const Icon = a.icon
          const ativo = selecionado === a.id
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => setSelecionado(ativo ? null : a.id)}
              className={[
                'flex items-start gap-4 w-full text-left px-5 py-4 rounded-2xl border transition-all duration-200',
                ativo
                  ? 'border-wine bg-wine/5 shadow-sm'
                  : 'border-champagne/40 bg-white/60 hover:border-wine/40 hover:bg-wine/[0.02]',
              ].join(' ')}
            >
              <span
                className={[
                  'mt-0.5 flex items-center justify-center rounded-xl w-9 h-9 shrink-0 transition-colors duration-200',
                  ativo ? 'bg-wine/10' : 'bg-champagne/30',
                ].join(' ')}
              >
                <Icon
                  className={[
                    'w-4 h-4 transition-colors duration-200',
                    ativo ? 'text-wine' : 'text-wine-deep/60',
                  ].join(' ')}
                  strokeWidth={1.8}
                />
              </span>
              <span className="flex flex-col gap-0.5">
                <span
                  className={[
                    'text-[14px] font-medium transition-colors duration-200',
                    ativo ? 'text-wine' : 'text-wine-deep',
                  ].join(' ')}
                >
                  {a.titulo}
                </span>
                <span className="text-xs text-foreground/55 font-light leading-relaxed">
                  {a.descricao}
                </span>
              </span>
              <span
                className={[
                  'ml-auto mt-1 shrink-0 w-4 h-4 rounded-full border-2 transition-all duration-200',
                  ativo
                    ? 'border-wine bg-wine'
                    : 'border-foreground/20 bg-transparent',
                ].join(' ')}
              />
            </button>
          )
        })}
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={abrirWhatsApp}
          disabled={!selecionado}
          className={[
            'w-full flex items-center justify-center gap-2 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300',
            selecionado
              ? 'bg-wine-deep text-wine-foreground hover:bg-wine shadow-md hover:shadow-lg'
              : 'bg-foreground/8 text-foreground/30 cursor-not-allowed',
          ].join(' ')}
        >
          <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.8} />
          {selecionado
            ? `Conversar sobre ${assuntoAtual?.titulo.toLowerCase()}`
            : 'Selecione um assunto acima'}
        </button>
      </div>

      <CalloutCard
        icon={Clock}
        question={content.horario.titulo}
        description={descricaoHorario}
      />
    </PageShell>
  )
}
