import { useState } from 'react'
import { PageShell } from '@/components/common/PageShell'
import { SectionHeader } from '@/components/common/SectionHeader'
import { OptionGrid } from '@/components/common/OptionGrid'
import { OptionCard } from '@/components/common/OptionCard'
import { CalloutCard } from '@/components/common/CalloutCard'
import { preparoContent } from '@/content/preparo'
import { whatsappComMensagem } from '@/lib/contato'
import { EXAMS, type Exam } from '@/data/preparos/exams'
import { PreparoFlow } from './PreparoFlow'

export function PreparoPage() {
  const [selected, setSelected] = useState<Exam | null>(null)

  return (
    <PageShell useHistory>
      <SectionHeader
        eyebrow={preparoContent.eyebrow}
        title={preparoContent.title}
        subtitle={preparoContent.subtitle}
      />

      <OptionGrid>
        {EXAMS.map((exam) => (
          <OptionCard
            key={exam.id}
            imageSrc="/icone-sonda.png"
            title={exam.nome}
            onClick={() => setSelected(exam)}
          />
        ))}
      </OptionGrid>

      <CalloutCard
        question={preparoContent.callout.pergunta}
        description={preparoContent.callout.descricao}
        cta={preparoContent.callout.cta}
        href={whatsappComMensagem(preparoContent.whatsappMensagem)}
        external
      />

      <PreparoFlow exam={selected} onClose={() => setSelected(null)} />
    </PageShell>
  )
}
