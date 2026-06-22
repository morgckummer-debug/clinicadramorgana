import { useState } from 'react'
import { Upload, FileText, X, Loader2, MessageCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface UploadAreaProps {
  value?: string[]
  onChange?: (urls: string[]) => void
  optional?: boolean
}

async function uploadFile(file: File): Promise<string> {
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
      // Mensagem amigável em PT
      const msg = /row-level security|unauthor|jwt|permission/i.test(error.message)
        ? 'Não foi possível enviar o arquivo agora. Você pode finalizar o pré-agendamento e nossa equipe entrará em contato pelo WhatsApp para receber o pedido.'
        : `Não foi possível enviar o arquivo: ${error.message}`
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
  const [loading, setLoading] = useState<boolean[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (index: number, file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setError('Arquivo muito grande. Máximo 10 MB.')
      return
    }
    setError(null)
    setLoading((l) => { const n = [...l]; n[index] = true; return n })
    setNames((n) => { const a = [...n]; a[index] = file.name; return a })

    try {
      const url = await uploadFile(file)
      const next = [...value]
      next[index] = url
      onChange?.(next.filter(Boolean))
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Erro inesperado ao enviar o arquivo.'
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
          name={names[i] || `Arquivo ${i + 1}`}
          onRemove={() => handleRemove(i)}
        />
      ))}

      <UploadSlot id={`upload-${value.length}`} loading={loading[value.length] ?? false} onFile={(f) => handleFile(value.length, f)} />

      {error && (
        <p className="text-xs text-destructive text-center font-light">{error}</p>
      )}

      <p className="text-xs text-muted-foreground font-light text-center">
        {optional ? 'Opcional. ' : ''}PDF, JPG ou PNG, máx. 10 MB.
      </p>

      {!optional && value.length === 0 && (
        <div className="pt-3 border-t border-border/30 space-y-3 text-center">
          <p className="text-xs text-muted-foreground font-light leading-relaxed">
            Sem o pedido médico não é possível concluir o pré-agendamento.
          </p>
          <a
            href="https://wa.me/5531993910212"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold transition-colors duration-300"
            style={{ backgroundColor: '#FDDCB5', color: '#5B2D8E', border: '1px solid #5B2D8E' }}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Não tenho pedido — WhatsApp
          </a>
        </div>
      )}
    </div>
  )
}
