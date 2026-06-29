import { useState } from 'react'
import { Upload, FileText, X, Loader2, MessageCircle } from 'lucide-react'
import { supabasePublic as supabase } from '@/lib/supabase'
import { useLanguage } from '@/contexts/LanguageContext'

interface UploadAreaProps {
  value?: string[]
  onChange?: (urls: string[]) => void
  optional?: boolean
}

async function uploadFile(file: File, errorRLS: string, errorGeneric: string): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession()
  let signedInForUpload = false

  // Tenta entrar como anônimo — se falhar (signup anônimo desabilitado),
  // tenta o upload mesmo assim (bucket pode aceitar anon direto).
  if (!session) {
    try {
      const { error: signinError } = await supabase.auth.signInAnonymously()
      if (!signinError) signedInForUpload = true
      else console.warn('Signin anônimo indisponível, tentando upload direto:', signinError.message)
    } catch (e) {
      console.warn('Signin anônimo falhou, tentando upload direto:', e)
    }
  }

  try {
    const ext = file.name.split('.').pop()
    const path = `${crypto.randomUUID()}.${ext}`
    const { data, error } = await supabase.storage
      .from('pedidos')
      .upload(path, file, { upsert: false })
    if (error) {
      const msg = /row-level security|unauthor|jwt|permission/i.test(error.message)
        ? errorRLS
        : `${errorGeneric}: ${error.message}`
      throw new Error(msg)
    }
    const { data: { publicUrl } } = supabase.storage.from('pedidos').getPublicUrl(data.path)
    return publicUrl
  } finally {
    if (signedInForUpload) {
      await supabase.auth.signOut({ scope: 'local' }).catch(() => {})
    }
  }
}

function FileSlot({ name, onRemove }: { name: string; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-3 bg-wine/5 border border-wine/30 rounded-xl px-4 py-3">
      <div className="w-8 h-8 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
        <FileText className="w-4 h-4 text-wine-deep" />
      </div>
      <p className="text-sm text-wine-deep font-light truncate flex-1">{name}</p>
      <button
        type="button"
        onClick={onRemove}
        className="flex-shrink-0 w-7 h-7 rounded-full bg-muted hover:bg-destructive/10 flex items-center justify-center transition-colors duration-200"
        aria-label="Remover arquivo"
      >
        <X className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
    </div>
  )
}

function UploadSlot({ id, loading, onFile, labelSelect, labelUploading }: { id: string; loading: boolean; onFile: (f: File) => void; labelSelect: string; labelUploading: string }) {
  return (
    <label
      htmlFor={loading ? undefined : id}
      className="w-full border-2 border-dashed border-border/60 rounded-xl p-6 flex items-center justify-center gap-3 cursor-pointer hover:border-champagne/60 hover:bg-muted/20 transition-all duration-300"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 text-wine-deep animate-spin flex-shrink-0" />
          <span className="text-sm text-muted-foreground font-light">{labelUploading}</span>
        </>
      ) : (
        <>
          <Upload className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-sm text-foreground/70 font-light">{labelSelect}</span>
        </>
      )}
      <input
        id={id}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFile(file)
          e.target.value = ''
        }}
      />
    </label>
  )
}

export function UploadArea({ value = [], onChange, optional = false }: UploadAreaProps) {
  const { t } = useLanguage()
  const u = t.uploadArea
  const [names, setNames] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (index: number, file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setError(u.fileTooLarge)
      return
    }
    setError(null)
    setLoading((l) => { const n = [...l]; n[index] = true; return n })
    setNames((n) => { const a = [...n]; a[index] = file.name; return a })

    try {
      const url = await uploadFile(file, u.uploadErrorRLS, u.uploadErrorGeneric)
      const next = [...value]
      next[index] = url
      onChange?.(next.filter(Boolean))
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : u.unexpectedError
      setError(msg)
      setNames((n) => { const a = [...n]; delete a[index]; return a })
    } finally {
      setLoading((l) => { const n = [...l]; n[index] = false; return n })
    }
  }

  const handleRemove = (index: number) => {
    const next = [...value]
    next.splice(index, 1)
    onChange?.(next)
    setNames((n) => { const a = [...n]; a.splice(index, 1); return a })
  }

  return (
    <div className="space-y-3">
      {/* Arquivos já anexados */}
      {value.map((url, i) => (
        <FileSlot
          key={url}
          name={names[i] || `${u.fileLabel} ${i + 1}`}
          onRemove={() => handleRemove(i)}
        />
      ))}

      <UploadSlot
        id={`upload-${value.length}`}
        loading={loading[value.length] ?? false}
        onFile={(f) => handleFile(value.length, f)}
        labelSelect={u.tapToSelect}
        labelUploading={u.uploading}
      />

      {error && (
        <div className="space-y-2 text-center">
          <p className="text-xs text-destructive font-light">{error}</p>
          <a
            href="https://wa.me/5531993910212"
            target="whatsapp"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold transition-colors duration-300"
            style={{ backgroundColor: '#FDDCB5', color: '#5B2D8E', border: '1px solid #5B2D8E' }}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {u.noReferralButton}
          </a>
        </div>
      )}

      <p className="text-xs text-muted-foreground font-light text-center">
        {optional ? u.optional : ''}{u.hint}
      </p>

      {!optional && value.length === 0 && (
        <div className="pt-3 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground font-light leading-relaxed">
            {u.noReferral}
          </p>
        </div>
      )}
    </div>
  )
}
