import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ban, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { PainelLayout } from '@/components/painel/PainelLayout'

interface PacienteBloqueada {
  id: string
  nome: string
  cpf: string
  telefone: string
  motivo_bloqueio: string | null
  bloqueado_em: string | null
  bloqueado_por: string | null
}

function formatCpf(cpf: string) {
  return cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

function formatTel(tel: string) {
  return tel.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

function formatDataHora(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export default function ListaNegra() {
  const navigate = useNavigate()
  const [pacientes, setPacientes] = useState<PacienteBloqueada[]>([])
  const [loading, setLoading] = useState(true)
  const [desbloqueando, setDesbloqueando] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('pacientes')
      .select('id, nome, cpf, telefone, motivo_bloqueio, bloqueado_em, bloqueado_por')
      .eq('bloqueado', true)
      .order('bloqueado_em', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          toast.error('Erro ao carregar lista negra')
          console.error(error)
        } else {
          setPacientes((data as PacienteBloqueada[]) ?? [])
        }
        setLoading(false)
      })
  }, [])

  const desbloquear = async (id: string) => {
    setDesbloqueando(id)
    try {
      const { error } = await supabase
        .from('pacientes')
        .update({ bloqueado: false, motivo_bloqueio: null, bloqueado_em: null, bloqueado_por: null })
        .eq('id', id)
      if (error) throw error
      setPacientes((prev) => prev.filter((p) => p.id !== id))
      toast.success('Paciente removida da lista negra.')
    } catch {
      toast.error('Erro ao desbloquear paciente')
    } finally {
      setDesbloqueando(null)
    }
  }

  return (
    <PainelLayout>
      <button
        onClick={() => navigate('/painel')}
        className="flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-wine-deep transition-colors duration-300 mb-5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Lista
      </button>

      <div className="mb-8 flex items-center gap-3">
        <Ban className="w-5 h-5 text-red-500" />
        <div>
          <h1 className="font-comfortaa text-wine-deep text-2xl font-light">Lista negra</h1>
          <p className="text-xs text-muted-foreground font-light mt-0.5">
            Pacientes bloqueadas — agendamentos continuam chegando, mas a secretária é avisada
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 rounded-full border-2 border-champagne border-t-wine-deep animate-spin" />
        </div>
      ) : pacientes.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground font-light text-sm">Nenhuma paciente na lista negra.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pacientes.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-red-200 rounded-2xl px-5 py-4 flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-red-600">
                    {p.nome.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-wine-deep">{p.nome}</p>
                  <p className="text-xs text-muted-foreground font-light">{formatCpf(p.cpf)} · {formatTel(p.telefone)}</p>
                  {p.motivo_bloqueio && (
                    <p className="text-xs text-red-700 font-light mt-1 leading-relaxed">{p.motivo_bloqueio}</p>
                  )}
                  {p.bloqueado_por && (
                    <p className="text-[11px] text-muted-foreground/60 font-light mt-0.5">
                      Bloqueada por <span className="font-medium">{p.bloqueado_por}</span>
                      {p.bloqueado_em && <> em {formatDataHora(p.bloqueado_em)}</>}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => desbloquear(p.id)}
                disabled={desbloqueando === p.id}
                className="text-xs text-red-600 underline underline-offset-4 hover:text-red-800 transition-colors whitespace-nowrap disabled:opacity-50 flex-shrink-0"
              >
                {desbloqueando === p.id ? 'Removendo…' : 'Desbloquear'}
              </button>
            </div>
          ))}
        </div>
      )}
    </PainelLayout>
  )
}
