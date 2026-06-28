import { useSearchParams } from 'react-router-dom'
import { ConversationLayout } from '@/components/conversation/ConversationLayout'
import { ConversationEngine } from '@/components/conversation/ConversationEngine'
import { preAgendamentoFlow, findQ1ForExamTitle } from '@/data/conversation/preAgendamento'
import { preAgendamentoFlowES } from '@/data/conversation/preAgendamento.es'
import { preAgendamentoFlowEN } from '@/data/conversation/preAgendamento.en'
import { useLanguage } from '@/contexts/LanguageContext'
import { getExamBySlug } from '@/data/exams'

export default function PreAgendamento() {
  const { lang } = useLanguage()
  const [searchParams] = useSearchParams()
  const flow = lang === 'es' ? preAgendamentoFlowES : lang === 'en' ? preAgendamentoFlowEN : preAgendamentoFlow

  const exameSlug = searchParams.get('exame')
  let prefill: { q1: string; q2: string } | undefined
  if (exameSlug) {
    const exam = getExamBySlug(exameSlug)
    if (exam) {
      const q1 = findQ1ForExamTitle(exam.title)
      if (q1) prefill = { q1, q2: exam.title }
    }
  }

  return (
    <ConversationLayout>
      <ConversationEngine flow={flow} prefill={prefill} />
    </ConversationLayout>
  )
}
