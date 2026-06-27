import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '@/components/common/PageShell'
import { SectionHeader } from '@/components/common/SectionHeader'
import { BusinessHoursModal } from '@/components/common/BusinessHoursModal'
import { PortalOptionCard } from '@/components/portal/PortalOptionCard'
import { useLanguage } from '@/contexts/LanguageContext'
import { patientPortalContent } from '@/content/patientPortal'
import { portalOptions, type PortalOption, type PortalAction } from '@/data/patientPortal'

export function PatientPortalPage() {
  const navigate = useNavigate()
  const { lang, t } = useLanguage()
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

  const getTranslatedOptions = () => {
    const translations = t.patientPortal
    return portalOptions.map((option) => {
      if (option.id === 'pre-agendamento') {
        return {
          ...option,
          titulo: translations.preAgendamento,
          descricao: translations.preAgendamentoDesc,
          buttonLabel: translations.preAgendamentoBtnLabel,
          badge: translations.badgeRecomendado,
        }
      }
      if (option.id === 'preparo') {
        return {
          ...option,
          titulo: translations.preparo,
          descricao: translations.preparoDesc,
          buttonLabel: translations.preparoBtnLabel,
        }
      }
      if (option.id === 'como-chegar') {
        return {
          ...option,
          titulo: translations.comoChegar,
          descricao: translations.comoChegaDesc,
          buttonLabel: translations.comoChegaBtnLabel,
        }
      }
      if (option.id === 'horarios') {
        return {
          ...option,
          titulo: translations.horarios,
          descricao: translations.horariosDesc,
          buttonLabel: translations.horariosBtnLabel,
        }
      }
      if (option.id === 'falar') {
        return {
          ...option,
          titulo: translations.falar,
          descricao: translations.falarDesc,
          buttonLabel: translations.falarBtnLabel,
        }
      }
      return option
    })
  }

  return (
    <PageShell backTo="https://www.dramorgana.com.br">
      <SectionHeader
        eyebrow={t.patientPortal.eyebrow}
        title={t.patientPortal.title}
        subtitle={t.patientPortal.subtitle}
      />

      <div className="mt-8 flex flex-col gap-4">
        {getTranslatedOptions().map((option) => (
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
