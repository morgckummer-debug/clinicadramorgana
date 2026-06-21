import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { PainelLayout } from '@/components/painel/PainelLayout'
import { StatusBadge } from '@/components/painel/StatusBadge'

type StatusFilter = 'pendente' | 'em_atendimento' | 'agendado' | 'todos'

interface PreAgendamento {
  id: string
  exame: string | null
  preferencia_turno: string | null
  status: string
  criado_em: string
  pacientes: {
    nome: string
    telefone: string
  } | null
}

const turnoLabel: Record<string, string> = {
  manha: 'Manhã',
  tarde: 'Tarde',
  indiferente: 'Indiferente',
}

function formatHora(iso: string) {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function formatData(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [items, setItems] = useState<PreAgendamento[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<StatusFilter>('pendente')
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true)
    else setLoading(true)

    let query = supabase
      .from('pre_agendamentos')
      .select('id, exame, preferencia_turno, status, criado_em, pacientes(nome, telefone)')
      .order('criado_em', { ascending: true })

    if (filter !== 'todos') query = query.eq('status', filter)

    const { data } = await query
    setItems((data as unknown as PreAgendamento[]) ?? [])
    setLoading(false)
    setRefreshing(false)
  }

  // Real-time: atualiza o status na lista quando outra secretária muda
  useEffect(() => {
    const channel = supabase
      .channel('dashboard_realtime')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'pre_agendamentos' }, (payload) => {
        const novo = payload.new as { id: string; status: string }
        setItems((prev) => {
          const atualizado = prev.map((item) =>
            item.id === novo.id ? { ...item, status: novo.status } : item
          )
          // Se o filtro ativo não inclui o novo status, remove da lista
          if (filter !== 'todos' && novo.status !== filter) {
            return atualizado.filter((item) => item.id !== novo.id)
          }
          return atualizado
        })
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [filter])

  useEffect(() => { fetchData() }, [filter])

  // Clique no paciente: muda para "em atendimento" se ainda pendente e navega
  const handleSelectPaciente = async (item: PreAgendamento) => {
    if (item.status === 'pendente') {
      await supabase
        .from('pre_agendamentos')
        .update({ status: 'em_atendimento' })
        .eq('id', item.id)
        .eq('status', 'pendente') // garante que só uma secretária "pega" o paciente
    }
    navigate(`/painel/${item.id}`)
  }

  const filters: { key: StatusFilter; label: string }[] = [
    { key: 'pendente', label: 'Pendentes' },
    { key: 'em_atendimento', label: 'Em atendimento' },
    { key: 'agendado', label: 'Agendados' },
    { key: 'todos', label: 'Todos' },
  ]

  return (
    <PainelLayout>
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-comfortaa text-wine-deep text-2xl font-light">
            Pré-agendamentos
          </h1>
          <p className="text-sm text-muted-foreground font-light mt-1">
            Pacientes que solicitaram atendimento pelo site
          </p>
        </div>
        <button
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-wine-deep transition-colors duration-300"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          Atualizar
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={[
              'px-4 py-1.5 rounded-full text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300',
              filter === f.key
                ? 'bg-wine-deep text-wine-foreground'
                : 'bg-white border border-border text-muted-foreground hover:border-wine-deep/40 hover:text-wine-deep',
            ].join(' ')}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lista */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 rounded-full border-2 border-champagne border-t-wine-deep animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground font-light text-sm">
            Nenhum pré-agendamento {filter !== 'todos' ? `com status "${filter}"` : ''} encontrado.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectPaciente(item)}
              className="w-full flex items-center justify-between bg-white border border-border/50 rounded-2xl px-5 py-4 hover:border-champagne/60 hover:shadow-soft transition-all duration-300 group text-left"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-9 h-9 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-wine-deep">
                    {item.pacientes?.nome?.charAt(0).toUpperCase() ?? '?'}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-wine-deep truncate">
                    {item.pacientes?.nome ?? '—'}
                  </p>
                  <p className="text-xs text-muted-foreground font-light truncate">
                    {item.exame ?? 'Exame não informado'}
                    {item.preferencia_turno && item.preferencia_turno !== 'indiferente'
                      ? ` · ${turnoLabel[item.preferencia_turno] ?? item.preferencia_turno}`
                      : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                <StatusBadge status={item.status} />
                <div className="flex items-center gap-1 text-muted-foreground text-[11px] hidden sm:flex">
                  <Clock className="w-3 h-3" />
                  <span>{formatData(item.criado_em)} {formatHora(item.criado_em)}</span>
                </div>
                <span className="text-muted-foreground group-hover:text-wine-deep transition-colors text-xs">›</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </PainelLayout>
  )
}
