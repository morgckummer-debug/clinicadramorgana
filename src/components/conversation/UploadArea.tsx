import { useState } from 'react'
import { Upload, FileText, X, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface UploadAreaProps {
  value?: string[]
  onChange?: (urls: string[]) => void
  optional?: boolean
}

async function uploadFile(file: File): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) await supabase.auth.signInAnonymously()

  const ext = file.name.split('.').pop()
  const path = `${crypto.randomUUID()}.${ext}`
  const { data, error } = await supabase.storage
    .from('pedidos')
    .upload(path, file, { upsert: false })
  if (error) throw error
  const { data: { publicUrl } } = supabase.storage.from('pedidos').getPublicUrl(data.path)
  return publicUrl
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

function UploadSlot({ id, loading, onFile }: { id: string; loading: boolean; onFile: (f: File) => void }) {
  return (
    <label
      htmlFor={loading ? undefined : id}
      className="w-full border-2 border-dashed border-border/60 rounded-xl p-6 flex items-center justify-center gap-3 cursor-pointer hover:border-champagne/60 hover:bg-muted/20 transition-all duration-300"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 text-wine-deep animate-spin flex-shrink-0" />
          <span className="text-sm text-muted-foreground font-light">Enviando…</span>
        </>
      ) : (
        <>
          <Upload className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-sm text-foreground/70 font-light">Toque para selecionar</span>
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
  const [names, setNames] = useState<string[]>([])
  const [loading, setLoading] = useState<[boolean, boolean]>([false, false])
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (index: number, file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setError('Arquivo muito grande. Máximo 10 MB.')
      return
    }
    setError(null)
    setLoading((l) => { const n = [...l] as [boolean, boolean]; n[index] = true; return n })
    setNames((n) => { const a = [...n]; a[index] = file.name; return a })

    try {
      const url = await uploadFile(file)
      const next = [...value]
      next[index] = url
      onChange?.(next.filter(Boolean))
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : JSON.stringify(e)
      setError(`Erro: ${msg}`)
      setNames((n) => { const a = [...n]; delete a[index]; return a })
    } finally {
      setLoading((l) => { const n = [...l] as [boolean, boolean]; n[index] = false; return n })
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
          name={names[i] || `Arquivo ${i + 1}`}
          onRemove={() => handleRemove(i)}
        />
      ))}

      {value.length === 0 && (
        <UploadSlot id="upload-1" loading={loading[0]} onFile={(f) => handleFile(0, f)} />
      )}

      {error && (
        <p className="text-xs text-destructive text-center font-light">{error}</p>
      )}

      <p className="text-xs text-muted-foreground font-light text-center">
        {optional ? 'Opcional. ' : ''}PDF, JPG ou PNG, máx. 10 MB.
      </p>
    </div>
  )
}
