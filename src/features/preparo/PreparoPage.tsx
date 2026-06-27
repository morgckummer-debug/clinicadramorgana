import { useState } from 'react'
import { PageShell } from '@/components/common/PageShell'
import { SectionHeader } from '@/components/common/SectionHeader'
import { OptionGrid } from '@/components/common/OptionGrid'
import { OptionCard } from '@/components/common/OptionCard'
import { CalloutCard } from '@/components/common/CalloutCard'
import { useLanguage } from '@/contexts/LanguageContext'
import { preparoContent } from '@/content/preparo'
import { whatsappComMensagem } from '@/lib/contato'
import { EXAMS, type Exam } from '@/data/preparos/exams'
import { PreparoFlow } from './PreparoFlow'

export function PreparoPage() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<Exam | null>(null)

  return (
    <PageShell useHistory backTo="/agendar">
      <SectionHeader
        eyebrow={preparoContent.eyebrow}
        title={t.preparo.title}
        subtitle={t.preparo.subtitle}
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
        question={t.preparo.calloutTitle}
        description={t.preparo.calloutDesc}
        cta={t.preparo.calloutCta}
        href={whatsappComMensagem(t.preparo.whatsappMsg)}
        external
      />

      <PreparoFlow exam={selected} onClose={() => setSelected(null)} />
    </PageShell>
  )
}
