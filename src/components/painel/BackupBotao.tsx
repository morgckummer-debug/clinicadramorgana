import { useState } from 'react'
import { HardDriveDownload, TriangleAlert, X } from 'lucide-react'
import { toast } from 'sonner'
import {
  baixarBackup,
  gerarBackupNoNavegador,
  type ProgressoBackup,
} from '@/lib/backup/exportarNavegador'
import { resumirBackup, type ResumoBackup } from '@/lib/backup/formato'

/**
 * Backup manual, feito na hora pela secretária.
 *
 * Existe além do backup automático diário (GitHub Actions) porque é o único
 * que não depende de nada configurado: um clique e o arquivo com tudo cai na
 * pasta de downloads. Serve para levar uma cópia antes de mexer no banco, ou
 * quando alguém quer a cópia na mão mesmo.
 */
function BackupModal({ onClose }: { onClose: () => void }) {
  const [incluirArquivos, setIncluirArquivos] = useState(true)
  const [progresso, setProgresso] = useState<ProgressoBackup | null>(null)
  const [resumo, setResumo] = useState<ResumoBackup | null>(null)
  const [erro, setErro] = useState('')

  const rodando = progresso !== null && resumo === null && !erro

  const gerar = async () => {
    setErro('')
    setResumo(null)
    setProgresso({ etapa: 'Começando', feito: 0, total: 1 })
    try {
      const payload = await gerarBackupNoNavegador({
        incluirArquivos,
        onProgresso: setProgresso,
      })
      baixarBackup(payload)
      setResumo(resumirBackup(payload))
      toast.success('Backup baixado')
    } catch (e) {
      console.error(e)
      setErro((e as Error).message || 'Não foi possível gerar o backup.')
    } finally {
      setProgresso(null)
    }
  }

  const pct =
    progresso && progresso.total > 0
      ? Math.min(100, Math.round((progresso.feito / progresso.total) * 100))
      : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-fade-up">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-lg font-light" style={{ color: '#5B2D8E' }}>
            Backup dos dados
          </h2>
          <button
            onClick={onClose}
            disabled={rodando}
            className="text-muted-foreground hover:text-wine-deep transition-colors disabled:opacity-40"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {resumo ? (
          <div className="space-y-4">
            <div className="text-sm text-foreground/80 font-light space-y-1">
              <p>Backup salvo na pasta de downloads:</p>
              <ul className="text-xs text-muted-foreground space-y-0.5 pl-1">
                <li>{resumo.linhas.pacientes ?? 0} paciente(s)</li>
                <li>{resumo.linhas.pre_agendamentos ?? 0} pré-agendamento(s)</li>
                <li>
                  {resumo.arquivos} pedido(s) médico(s)
                  {resumo.bytes_arquivos > 0 &&
                    ` · ${(resumo.bytes_arquivos / 1024 / 1024).toFixed(1)} MB`}
                </li>
              </ul>
              {resumo.arquivos_com_erro > 0 && (
                <p className="text-xs text-amber-600 pt-1">
                  {resumo.arquivos_com_erro} anexo(s) não puderam ser baixados.
                </p>
              )}
            </div>

            <div className="flex gap-2 items-start text-[11px] leading-relaxed text-amber-700 bg-amber-50 rounded-xl p-3">
              <TriangleAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                O arquivo tem dados de pacientes. Guarde no computador da clínica ou num HD/pendrive
                seu — nunca no WhatsApp, no e-mail nem em pasta compartilhada.
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-full text-[11px] tracking-[0.2em] uppercase underline underline-offset-4 py-1"
              style={{ color: '#5B2D8E' }}
            >
              Fechar
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-foreground/70 font-light leading-relaxed">
              Baixa uma cópia de tudo — pacientes, pré-agendamentos e os pedidos médicos anexados —
              num único arquivo no seu computador.
            </p>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={incluirArquivos}
                onChange={(e) => setIncluirArquivos(e.target.checked)}
                disabled={rodando}
                className="mt-0.5 accent-[#5B2D8E]"
              />
              <span className="text-xs text-muted-foreground font-light leading-relaxed">
                Incluir os pedidos médicos anexados. Deixe marcado — sem eles o backup não recupera
                os arquivos. Desmarque só se quiser uma cópia rápida, só dos dados.
              </span>
            </label>

            {rodando && (
              <div className="space-y-2">
                <div className="h-1.5 rounded-full bg-black/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${pct}%`, background: 'linear-gradient(135deg, #5B2D8E, #7C3FB5)' }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground text-center">
                  {progresso?.etapa}
                  {progresso && progresso.total > 1 && ` · ${progresso.feito}/${progresso.total}`}
                </p>
              </div>
            )}

            {erro && <p className="text-sm text-red-500 font-light text-center">{erro}</p>}

            <button
              onClick={gerar}
              disabled={rodando}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[11px] tracking-[0.25em] uppercase font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #5B2D8E, #7C3FB5)', color: '#E2C97E' }}
            >
              {rodando ? (
                <span className="w-4 h-4 rounded-full border-2 border-[#E2C97E]/40 border-t-[#E2C97E] animate-spin" />
              ) : (
                'Gerar e baixar'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function BackupBotao() {
  const [aberto, setAberto] = useState(false)

  return (
    <>
      <button
        onClick={() => setAberto(true)}
        className="glass-icon-btn flex items-center justify-center text-wine-deep/80 hover:text-wine-deep transition-colors duration-300"
        title="Baixar backup"
      >
        <HardDriveDownload className="w-3.5 h-3.5" />
      </button>
      {aberto && <BackupModal onClose={() => setAberto(false)} />}
    </>
  )
}
