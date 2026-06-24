import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '@/components/common/PageShell'
import { SectionHeader } from '@/components/common/SectionHeader'
import { BusinessHoursModal } from '@/components/common/BusinessHoursModal'
import { PortalOptionCard } from '@/components/portal/PortalOptionCard'
import { patientPortalContent } from '@/content/patientPortal'
import { portalOptions, type PortalOption, type PortalAction } from '@/data/patientPortal'

export function PatientPortalPage() {
  const navigate = useNavigate()
  const [modalAberto, setModalAberto] = useState<'businessHours' | null>(null)

  function resolverAcao(action: PortalAction) {
    switch (action.type) {
      case 'route':
        navigate(action.value)
        break
      case 'modal':
        setModalAberto(action.value)
        break
      case 'external':
        window.open(action.value, '_blank')
        break
    }
  }

  function handleSelectOption(option: PortalOption) {
    resolverAcao(option.action)
  }

  return (
    <PageShell>
      <SectionHeader
        eyebrow={patientPortalContent.eyebrow}
        title={patientPortalContent.title}
        subtitle={patientPortalContent.subtitle}
      />

      <div className="mt-8 flex flex-col gap-4">
        {portalOptions.map((option) => (
          <PortalOptionCard
            key={option.id}
            option={option}
            onSelect={handleSelectOption}
          />
        ))}
      </div>

      <BusinessHoursModal
        open={modalAberto === 'businessHours'}
        onOpenChange={(open) => setModalAberto(open ? 'businessHours' : null)}
      />
    </PageShell>
  )
}
