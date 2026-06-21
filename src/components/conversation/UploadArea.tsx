import { useState } from 'react'
import { Upload, FileText, X, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface UploadAreaProps {
  value?: string
  onChange?: (url: string) => void
}

export function UploadArea({ value, onChange }: UploadAreaProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const inputId = 'upload-pedido'

  const handleFile = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setError('Arquivo muito grande. Máximo 10 MB.')
      return
    }

    setError(null)
    setUploading(true)
    setFileName(file.name)

    const ext = file.name.split('.').pop()
    const path = `${crypto.randomUUID()}.${ext}`

    const { data, error: uploadError } = await supabase.storage
      .from('pedidos')
      .upload(path, file, { upsert: false })

    setUploading(false)

    if (uploadError) {
      setError('Erro ao enviar. Tente novamente.')
      setFileName(null)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('pedidos')
      .getPublicUrl(data.path)

    onChange?.(publicUrl)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    onChange?.('')
    setFileName(null)
    setError(null)
  }

  const hasFile = !!value

  return (
    <div className="space-y-3">
      <label
        htmlFor={hasFile || uploading ? undefined : inputId}
        className={[
          'w-full border-2 border-dashed rounded-2xl p-10',
          'flex flex-col items-center justify-center gap-3 text-center',
          'transition-all duration-300',
          hasFile || uploading ? '' : 'cursor-pointer hover:border-champagne/60 hover:bg-muted/30',
          hasFile ? 'border-wine/40 bg-wine/5' : 'border-border/60',
        ].join(' ')}
      >
        {uploading ? (
          <>
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-wine-deep animate-spin" />
            </div>
            <p className="text-sm text-muted-foreground font-light">Enviando…</p>
          </>
        ) : hasFile ? (
          <>
            <div className="w-10 h-10 rounded-full bg-champagne/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-wine-deep" />
            </div>
            <p className="text-sm text-wine-deep font-light truncate max-w-xs">
              {fileName ?? 'Arquivo enviado'}
            </p>
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-wine-deep transition-colors tracking-wide uppercase"
            >
              <X className="w-3 h-3" />
              Remover
            </button>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Upload className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-foreground/70 font-light">
                Toque para selecionar um arquivo
              </p>
              <p className="text-xs text-muted-foreground font-light mt-1">
                PDF, JPG ou PNG — até 10 MB
              </p>
            </div>
          </>
        )}
      </label>

      <input
        id={inputId}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />

      {error && (
        <p className="text-xs text-destructive text-center font-light">{error}</p>
      )}

      <p className="text-xs text-muted-foreground font-light text-center">
        Este campo é opcional. Você pode continuar sem anexar nenhum documento.
      </p>
    </div>
  )
}

