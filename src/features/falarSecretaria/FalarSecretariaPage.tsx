import { Clock, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '@/components/common/PageShell'
import { SectionHeader } from '@/components/common/SectionHeader'
import { OptionGrid } from '@/components/common/OptionGrid'
import { InfoCard } from '@/components/common/InfoCard'
import { CalloutCard } from '@/components/common/CalloutCard'
import { falarSecretariaContent as content } from '@/content/falarSecretaria'
import { assuntos, type AssuntoAction } from '@/data/falarSecretaria'
import { whatsappComMensagem } from '@/lib/contato'
import { getStatusAtendimento } from '@/lib/atendimento'

export function FalarSecretariaPage() {
  const navigate = useNavigate()

  function executarAcao(acao: AssuntoAction) {
    switch (acao.kind) {
      case 'whatsapp':
        window.open(whatsappComMensagem(acao.mensagem), '_blank', 'noopener,noreferrer')
        break
      case 'navegar':
        navigate(acao.to)
        break
      case 'telefone':
        window.location.href = `tel:${acao.numero}`
        break
      case 'link':
        window.open(acao.href, acao.external ? '_blank' : '_self', acao.external ? 'noopener,noreferrer' : undefined)
        break
      case 'modal':
      case 'formulario':
        // hook futuro
        break
    }
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

      <OptionGrid>
        {assuntos.map((a) => (
          <InfoCard
            key={a.id}
            icon={a.icon}
            title={a.titulo}
            description={a.descricao}
            action={{
              label: a.ctaLabel ?? content.ctaPadrao,
              icon: MessageCircle,
              onClick: () => executarAcao(a.acao),
            }}
          />
        ))}
      </OptionGrid>

      <CalloutCard
        icon={Clock}
        question={content.horario.titulo}
        description={descricaoHorario}
      />
    </PageShell>
  )
}
