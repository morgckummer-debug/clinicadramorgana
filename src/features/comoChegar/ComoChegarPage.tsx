import { useState } from 'react'
import { MapPin, MessageCircle, ZoomIn, X } from 'lucide-react'
import { toast } from 'sonner'
import { PageShell } from '@/components/common/PageShell'
import { SectionHeader } from '@/components/common/SectionHeader'
import { HighlightCard } from '@/components/common/HighlightCard'
import { InfoCard } from '@/components/common/InfoCard'
import { FigureCard } from '@/components/common/FigureCard'
import { comoChegarContent } from '@/content/comoChegar'
import { localizacao, sections, type InfoCardData } from '@/data/comoChegar'
import { whatsappComMensagem } from '@/lib/contato'

function resolveAction(card: InfoCardData, onImageClick?: (src: string) => void) {
  if (!card.action) return undefined
  const { kind, label, href } = card.action

  if (kind === 'whatsapp') {
    return {
      label,
      icon: MessageCircle,
      href: whatsappComMensagem(comoChegarContent.whatsappMensagem),
      external: true,
    }
  }
  if (kind === 'image') {
    return {
      label,
      icon: ZoomIn,
      onClick: () => onImageClick?.(href ?? ''),
    }
  }
  if (kind === 'maps') {
    if (localizacao.mapsUrl) {
      return { label, icon: MapPin, href: localizacao.mapsUrl, external: true }
    }
    return {
      label,
      icon: MapPin,
      onClick: () => toast(comoChegarContent.mapsIndisponivelToast),
    }
  }
  return href ? { label, href, external: true } : undefined
}

export function ComoChegarPage() {
  const [imagemAberta, setImagemAberta] = useState<string | null>(null)

  const mapsAction = localizacao.mapsUrl
    ? {
        label: comoChegarContent.localizacao.cta,
        icon: MapPin,
        href: localizacao.mapsUrl,
        external: true,
      }
    : {
        label: comoChegarContent.localizacao.cta,
        icon: MapPin,
        onClick: () => toast(comoChegarContent.mapsIndisponivelToast),
      }

  return (
    <PageShell useHistory>
      <SectionHeader
        eyebrow={comoChegarContent.eyebrow}
        title={comoChegarContent.title}
        subtitle={comoChegarContent.subtitle}
      />

      <HighlightCard
        eyebrow={comoChegarContent.localizacao.eyebrow}
        icon={MapPin}
        lines={[localizacao.endereco, localizacao.cidade, localizacao.cep]}
        primaryAction={mapsAction}
      />

      <div className="mt-8 space-y-10">
        {sections.map((section) => (
          <section key={section.id}>
            {section.titulo && (
              <h2 className="mb-4 text-[11px] tracking-[0.3em] uppercase text-wine font-semibold">
                {section.titulo}
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.cards.map((card) => (
                <InfoCard
                  key={card.id}
                  icon={card.icon}
                  title={card.titulo}
                  description={card.descricao}
                  action={resolveAction(card, setImagemAberta)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10">
        <FigureCard
          src={comoChegarContent.foto.src || undefined}
          alt={comoChegarContent.foto.alt}
          caption={comoChegarContent.foto.caption || undefined}
          description={comoChegarContent.foto.description || undefined}
          aspect="video"
        />
      </div>

      {/* Modal de imagem */}
      {imagemAberta && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setImagemAberta(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setImagemAberta(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
              aria-label="Fechar"
            >
              <X className="w-6 h-6 text-wine-deep" />
            </button>
            <img
              src={imagemAberta}
              alt="Mapa expandido"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </PageShell>
  )
}
