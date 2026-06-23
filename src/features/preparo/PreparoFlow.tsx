import { useRef, useState } from 'react'
import { Download, MessageCircle } from 'lucide-react'
import { InfoModal, type ModalAction } from '@/components/common/InfoModal'
import { ChoiceModal } from '@/components/common/ChoiceModal'
import { InfoBlockList } from '@/components/common/InfoBlockList'
import { preparoContent } from '@/content/preparo'
import { commonContent } from '@/content/common'
import { whatsappComMensagem } from '@/lib/contato'
import { getPreparo } from '@/data/preparos/preparos'
import type { Exam } from '@/data/preparos/exams'
import { PreparoPoster } from './image/PreparoPoster'
import { renderPosterToPng } from './image/renderPoster'

type PreparoFlowProps = {
  exam: Exam | null
  onClose: () => void
}

export function PreparoFlow({ exam, onClose }: PreparoFlowProps) {
  const [variantId, setVariantId] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)
  const posterRef = useRef<HTMLDivElement>(null)

  if (!exam) return null

  const isChoice = 'variants' in exam && !!exam.variants && !variantId
  const preparoId = isChoice
    ? null
    : 'variants' in exam && exam.variants
      ? exam.variants.find((v) => v.id === variantId)?.preparoId
      : exam.preparoId

  const preparo = preparoId ? getPreparo(preparoId) : null
  const examNomeCompleto =
    'variants' in exam && exam.variants && variantId
      ? `${exam.nome} — ${exam.variants.find((v) => v.id === variantId)?.label}`
      : exam.nome

  const close = () => {
    setVariantId(null)
    onClose()
  }

  const handleSave = async () => {
    if (!posterRef.current || !preparo) return
    setGenerating(true)
    try {
      const slug = examNomeCompleto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      await renderPosterToPng(posterRef.current, `preparo-${slug}.png`)
    } finally {
      setGenerating(false)
    }
  }

  if (isChoice && 'variants' in exam && exam.variants) {
    return (
      <ChoiceModal
        open
        onOpenChange={(o) => !o && close()}
        title={preparoContent.periodoModal.titulo}
        description={preparoContent.periodoModal.descricao}
        options={exam.variants.map((v) => ({
          id: v.id,
          label: v.label,
          icon: v.icon,
        }))}
        onSelect={(id) => setVariantId(id)}
      />
    )
  }

  if (!preparo) return null

  const actions: ModalAction[] = preparo.semPreparoEspecifico
    ? [
        {
          label: commonContent.falarComSecretaria,
          href: whatsappComMensagem(preparoContent.whatsappMensagem),
          external: true,
          icon: MessageCircle,
        },
      ]
    : [
        {
          label: generating ? '...' : commonContent.salvarPreparo,
          onClick: handleSave,
          icon: Download,
        },
      ]

  return (
    <>
      <InfoModal
        open
        onOpenChange={(o) => !o && close()}
        title={examNomeCompleto}
        metaLabel={preparoContent.modal.metaLabel}
        footerNote={preparoContent.modal.footer}
        actions={actions}
      >
        {preparo.semPreparoEspecifico ? (
          <div className="py-2">
            <h3 className="font-comfortaa text-wine-deep text-lg font-light mb-3">
              {preparoContent.semPreparo.titulo}
            </h3>
            <p className="text-[14.5px] leading-relaxed text-foreground/75 font-light">
              {preparoContent.semPreparo.mensagem}
            </p>
          </div>
        ) : (
          <InfoBlockList
            blocks={preparo.blocos}
            observations={preparo.observacoes}
          />
        )}
      </InfoModal>

      {/* Off-screen poster for image rendering */}
      {!preparo.semPreparoEspecifico && (
        <div
          style={{
            position: 'fixed',
            left: -10000,
            top: 0,
            pointerEvents: 'none',
            opacity: 0,
          }}
          aria-hidden="true"
        >
          <PreparoPoster
            ref={posterRef}
            examNome={examNomeCompleto}
            preparo={preparo}
          />
        </div>
      )}
    </>
  )
}
