import { Upload, FileText } from 'lucide-react'

interface UploadAreaProps {
  hasFile?: boolean
  onSkip?: () => void
}

export function UploadArea({ hasFile }: UploadAreaProps) {
  return (
    <div className="space-y-3">
      <div
        className={[
          'w-full border-2 border-dashed rounded-2xl p-10',
          'flex flex-col items-center justify-center gap-3 text-center',
          'transition-all duration-300 cursor-pointer',
          hasFile
            ? 'border-wine/40 bg-wine/5'
            : 'border-border/60 hover:border-champagne/60 hover:bg-muted/30',
        ].join(' ')}
      >
        {hasFile ? (
          <>
            <div className="w-10 h-10 rounded-full bg-champagne/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-wine-deep" />
            </div>
            <p className="text-sm text-wine-deep font-light">Arquivo selecionado</p>
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
      </div>

      <p className="text-xs text-muted-foreground font-light text-center">
        Este campo é opcional. Você pode continuar sem anexar nenhum documento.
      </p>
    </div>
  )
}
