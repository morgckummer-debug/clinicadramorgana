import { ConversationLayout } from '@/components/conversation/ConversationLayout'
import { ConversationEngine } from '@/components/conversation/ConversationEngine'
import { preAgendamentoFlow } from '@/data/conversation/preAgendamento'
import { preAgendamentoFlowES } from '@/data/conversation/preAgendamento.es'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PreAgendamento() {
  const { lang } = useLanguage()
  const flow = lang === 'es' ? preAgendamentoFlowES : preAgendamentoFlow

  return (
    <ConversationLayout>
      <ConversationEngine flow={flow} />
    </ConversationLayout>
  )
}
