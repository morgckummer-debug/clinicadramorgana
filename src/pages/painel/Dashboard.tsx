import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, RefreshCw, TriangleAlert, User } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { PainelLayout } from '@/components/painel/PainelLayout'
import { StatusBadge } from '@/components/painel/StatusBadge'
import { useAuth } from '@/contexts/AuthContext'

type StatusFilter = 'pendente' | 'em_atendimento' | 'agendado' | 'todos'

interface PreAgendamento {
  id: string
  paciente_id: string
  exame: string | null
  preferencia_turno: string | null
  status: string
  atendente_nome: string | null
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

function playNotificationSound() {
  try {
    const ctx = new AudioContext()

    const osc1 = ctx.createOscillator()
    const g1 = ctx.createGain()
    osc1.connect(g1)
    g1.connect(ctx.destination)
    osc1.type = 'sine'
    osc1.frequency.value = 523 // C5
    g1.gain.setValueAtTime(0.22, ctx.currentTime)
    g1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
    osc1.start()
    osc1.stop(ctx.currentTime + 0.3)

    const osc2 = ctx.createOscillator()
    const g2 = ctx.createGain()
    osc2.connect(g2)
    g2.connect(ctx.destination)
    osc2.type = 'sine'
    osc2.frequency.value = 659 // E5
    g2.gain.setValueAtTime(0, ctx.currentTime + 0.18)
    g2.gain.setValueAtTime(0.22, ctx.currentTime + 0.18)
    g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65)
    osc2.start(ctx.currentTime + 0.18)
    osc2.stop(ctx.currentTime + 0.65)
  } catch (_) {}
}

const SELECT_FIELDS =
  'id, paciente_id, exame, preferencia_turno, status, atendente_nome, criado_em, pacientes(nome, telefone)'

async function fetchPendingCount() {
  const { count } = await supabase
    .from('pre_agendamentos')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'pendente')
  return count ?? 0
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { userName } = useAuth()
  const [items, setItems] = useState<PreAgendamento[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<StatusFilter>('pendente')
  const [refreshing, setRefreshing] = useState(false)
  const [newPendingCount, setNewPendingCount] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)

  // Título da aba reflete o número real de pendentes
  useEffect(() => {
    document.title = pendingCount > 0 ? `(${pendingCount}) Painel · MK` : 'Painel · MK'
    return () => { document.title = 'Painel · MK' }
  }, [pendingCount])

  // paciente_ids que aparecem mais de uma vez na lista atual
  const duplicatePacienteIds = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const item of items) counts[item.paciente_id] = (counts[item.paciente_id] ?? 0) + 1
    return new Set(
      Object.entries(counts)
        .filter(([, c]) => c > 1)
        .map(([id]) => id)
    )
  }, [items])

  const fetchData = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true)
    else setLoading(true)

    let query = supabase
      .from('pre_agendamentos')
      .select(SELECT_FIELDS)
      .order('criado_em', { ascending: true })
      .limit(200)

    if (filter !== 'todos') query = query.eq('status', filter)

    const [{ data }, count] = await Promise.all([query, fetchPendingCount()])
    setItems((data as unknown as PreAgendamento[]) ?? [])
    setPendingCount(count)
    setLoading(false)
    setRefreshing(false)
  }

  useEffect(() => {
    const channel = supabase
      .channel('dashboard_realtime')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'pre_agendamentos' }, (payload) => {
        const novo = payload.new as { id: string; status: string; atendente_nome: string | null }
        setItems((prev) => {
          const atualizado = prev.map((item) =>
            item.id === novo.id
              ? { ...item, status: novo.status, atendente_nome: novo.atendente_nome }
              : item
          )
          if (filter !== 'todos' && novo.status !== filter) {
            return atualizado.filter((item) => item.id !== novo.id)
          }
          return atualizado
        })
        fetchPendingCount().then(setPendingCount)
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pre_agendamentos' }, async (payload) => {
        const { data } = await supabase
          .from('pre_agendamentos')
          .select(SELECT_FIELDS)
          .eq('id', payload.new.id)
          .single()

        if (!data) return
        const novo = data as unknown as PreAgendamento

        if (filter === 'pendente' || filter === 'todos') {
          setItems((prev) =>
            [...prev, novo].sort((a, b) =>
              new Date(a.criado_em).getTime() - new Date(b.criado_em).getTime()
            )
          )
        }

        playNotificationSound()
        toast.info(`Novo paciente: ${novo.pacientes?.nome ?? 'sem nome'}`, {
          description: novo.exame ?? 'Exame não informado',
        })

        if (filter !== 'pendente') setNewPendingCount((c) => c + 1)
        fetchPendingCount().then(setPendingCount)
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [filter])

  useEffect(() => { fetchData() }, [filter])

  const handleSelectPaciente = async (item: PreAgendamento) => {
    if (item.status === 'pendente') {
      await supabase
        .from('pre_agendamentos')
        .update({ status: 'em_atendimento', atendente_nome: userName })
        .eq('id', item.id)
        .eq('status', 'pendente') // garante que só uma secretária "pega" o paciente
    }
    navigate(`/painel/${item.id}`)
  }

  const handleFilterChange = (key: StatusFilter) => {
    setFilter(key)
    if (key === 'pendente') setNewPendingCount(0)
  }

  const filters: { key: StatusFilter; label: string }[] = [
    { key: 'pendente', label: 'Pendentes' },
    { key: 'em_atendimento', label: 'Atendido' },
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
            onClick={() => handleFilterChange(f.key)}
            className={[
              'relative px-4 py-1.5 rounded-full text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300',
              filter === f.key
                ? 'bg-wine-deep text-wine-foreground'
                : 'bg-white border border-border text-muted-foreground hover:border-wine-deep/40 hover:text-wine-deep',
            ].join(' ')}
          >
            {f.label}
            {f.key === 'pendente' && newPendingCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[1rem] h-4 px-0.5 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">
                {newPendingCount}
              </span>
            )}
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
                  <p className="text-base font-semibold text-wine-deep truncate flex items-center gap-1.5">
                    {item.pacientes?.nome ?? '—'}
                    {duplicatePacienteIds.has(item.paciente_id) && (
                      <span title="Paciente com múltiplos registros nesta lista" className="inline-flex">
                        <TriangleAlert className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground font-light truncate">
                    {item.exame ?? 'Exame não informado'}
                    {item.preferencia_turno && item.preferencia_turno !== 'indiferente'
                      ? ` · ${turnoLabel[item.preferencia_turno] ?? item.preferencia_turno}`
                      : ''}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-4">
                <div className="flex items-center gap-3">
                  <StatusBadge status={item.status} />
                  <div className="flex items-center gap-1 text-muted-foreground text-[11px] hidden sm:flex">
                    <Clock className="w-3 h-3" />
                    <span>{formatData(item.criado_em)} {formatHora(item.criado_em)}</span>
                  </div>
                  <span className="text-muted-foreground group-hover:text-wine-deep transition-colors text-xs">›</span>
                </div>
                {item.status === 'em_atendimento' && item.atendente_nome && (
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <User className="w-3 h-3" />
                    {item.atendente_nome}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </PainelLayout>
  )
}
