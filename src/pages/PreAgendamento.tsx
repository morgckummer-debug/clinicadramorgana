import { ConversationLayout } from '@/components/conversation/ConversationLayout'
import { ConversationEngine } from '@/components/conversation/ConversationEngine'
import { preAgendamentoFlow } from '@/data/conversation/preAgendamento'

export default function PreAgendamento() {
  return (
    <ConversationLayout>
      <ConversationEngine flow={preAgendamentoFlow} />
    </ConversationLayout>
  )
}
