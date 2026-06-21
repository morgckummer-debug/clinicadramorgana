import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, MessageCircle, FileText, TriangleAlert, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { PainelLayout } from '@/components/painel/PainelLayout'
import { StatusBadge } from '@/components/painel/StatusBadge'
import { useAuth } from '@/contexts/AuthContext'

interface OtherRecord {
  id: string
  exame: string | null
  status: string
  criado_em: string
}

interface Detalhe {
  id: string
  paciente_id: string
  canal: string
  categoria: string | null
  exame: string | null
  convenio: string[] | null
  preferencia_turno: string | null
  medico_preferido: string | null
  pedido_url: string | null
  observacoes: string | null
  status: string
  atendente_nome: string | null
  criado_em: string
  pacientes: {
    nome: string
    cpf: string
    telefone: string
    data_nascimento: string | null
  } | null
}

const turnoLabel: Record<string, string> = {
  manha: 'Manhã',
  tarde: 'Tarde',
  indiferente: 'Sem preferência',
}

const medicoLabel: Record<string, string> = {
  'dra-morgana': 'Dra. Morgana Kummer',
  'dra-barbara': 'Dra. Bárbara Rodrigues',
  'dr-darlei': 'Dr. Darlei Carneiro',
  'dr-paulo': 'Dr. Paulo Gontijo Jr.',
  'dra-carolina': 'Dra. Carolina Martins',
  'dra-maria-amelia': 'Dra. Maria Amélia',
  'dr-andre': 'Dr. André Mourão',
  'sem-preferencia': 'Sem preferência',
}

const statusOptions = [
  { value: 'pendente', label: 'Pendente' },
  { value: 'em_atendimento', label: 'Atendido' },
  { value: 'agendado', label: 'Agendado' },
  { value: 'cancelado', label: 'Cancelado' },
]

function parseDUM(obs: string | null): Date | null {
  if (!obs) return null
  const m = obs.match(/DUM:\s*(\d{2})\/(\d{2})\/(\d{4})/)
  if (!m) return null
  return new Date(parseInt(m[3]), parseInt(m[2]) - 1, parseInt(m[1]))
}

function parseIG(obs: string | null): string | null {
  if (!obs) return null
  const m = obs.match(/Idade gestacional estimada:\s*([^\n\r]+)/)
  return m ? m[1].trim() : null
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function fmtDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function fmtISO(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

function userObs(obs: string | null): string | null {
  if (!obs) return null
  // Remove a linha de DUM/IG gerada automaticamente
  const cleaned = obs.replace(/^DUM:.*(\n|$)/m, '').trim()
  return cleaned || null
}

function calcIdade(dataNasc: string | null) {
  if (!dataNasc) return null
  const [d, m, a] = dataNasc.split('/').map(Number)
  if (!a) return null
  const hoje = new Date()
  let idade = hoje.getFullYear() - a
  if (hoje.getMonth() + 1 < m || (hoje.getMonth() + 1 === m && hoje.getDate() < d)) idade--
  return idade
}

function formatCpf(cpf: string) {
  return cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

function formatTel(tel: string) {
  return tel.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

function primeiroNome(nome: string) {
  const partes = nome.trim().split(' ')
  return partes.slice(0, 2).join(' ')
}

function formatExame(slug: string | null) {
  if (!slug) return '—'
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bDe\b/g, 'de')
    .replace(/\bDo\b/g, 'do')
    .replace(/\bDa\b/g, 'da')
    .replace(/\bCom\b/g, 'com')
    .replace(/\bE\b/g, 'e')
    .replace(/\bO\b/g, 'o')
}

export default function Detalhe() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { userName } = useAuth()
  const [item, setItem] = useState<Detalhe | null>(null)
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [otherRecords, setOtherRecords] = useState<OtherRecord[]>([])

  useEffect(() => {
    if (!id) return
    supabase
      .from('pre_agendamentos')
      .select('*, pacientes(*)')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        setItem(data as unknown as Detalhe)
        setLoading(false)
      })
  }, [id])

  // Busca outros registros da mesma paciente (todos os status)
  useEffect(() => {
    if (!item?.paciente_id) return
    supabase
      .from('pre_agendamentos')
      .select('id, exame, status, criado_em')
      .eq('paciente_id', item.paciente_id)
      .neq('id', item.id)
      .order('criado_em', { ascending: false })
      .then(({ data }) => setOtherRecords((data as OtherRecord[]) ?? []))
  }, [item?.paciente_id, item?.id])

  // Título da aba com nome da paciente
  useEffect(() => {
    const nome = item?.pacientes?.nome?.trim().split(' ')[0]
    if (!nome) return
    document.title = `${nome} · Painel · MK`
    return () => { document.title = 'Painel · MK' }
  }, [item?.pacientes?.nome])

  const updateStatus = async (newStatus: string) => {
    if (!id) return
    setUpdatingStatus(true)
    const update: Record<string, string | null> = { status: newStatus }
    if (newStatus === 'em_atendimento') update.atendente_nome = userName
    await supabase.from('pre_agendamentos').update(update).eq('id', id)
    setItem((prev) => {
      if (!prev) return prev
      const next = { ...prev, status: newStatus }
      if (newStatus === 'em_atendimento') next.atendente_nome = userName
      return next
    })
    setUpdatingStatus(false)
  }

  const openWhatsApp = () => {
    if (!item?.pacientes) return
    const nomePaciente = primeiroNome(item.pacientes.nome)
    const exame = item.exame ?? 'seu exame'
    const secretaria = userName ?? 'a secretária'
    const msg = encodeURIComponent(
      `Oi, ${nomePaciente}! Aqui é a ${secretaria} e serei responsável pelo seu agendamento, ok? Vi que você gostaria de marcar um ${exame}. Vou ver a disponibilidade pra você \u{1F970}`
    )
    const tel = item.pacientes.telefone.replace(/\D/g, '')
    window.open(`https://wa.me/55${tel}?text=${msg}`, '_blank')
  }

  if (loading) {
    return (
      <PainelLayout>
        <div className="flex justify-center py-20">
          <div className="w-6 h-6 rounded-full border-2 border-champagne border-t-wine-deep animate-spin" />
        </div>
      </PainelLayout>
    )
  }

  if (!item) {
    return (
      <PainelLayout>
        <div className="text-center py-20">
          <p className="text-muted-foreground font-light">Pré-agendamento não encontrado.</p>
          <Link to="/painel" className="text-wine-deep text-sm underline mt-4 inline-block">Voltar</Link>
        </div>
      </PainelLayout>
    )
  }

  const idade = calcIdade(item.pacientes?.data_nascimento ?? null)
  const nomeExibido = item.pacientes?.nome ? primeiroNome(item.pacientes.nome) : '—'
  const exameFormatado = formatExame(item.exame)
  const medicoFormatado = medicoLabel[item.medico_preferido ?? ''] ?? item.medico_preferido ?? '—'

  const dum = parseDUM(item.observacoes)
  const obsUsuario = userObs(item.observacoes)

  const igCalculada = dum ? (() => {
    const diff = Math.floor((Date.now() - dum.getTime()) / 86400000)
    if (diff < 0 || diff > 300) return null
    const w = Math.floor(diff / 7), d = diff % 7
    return `${w} semanas e ${d} dia${d !== 1 ? 's' : ''}`
  })() : null

  const isOvulacao = item.exame === 'Rastreamento de Ovulação'

  const janelas = dum && !isOvulacao ? [
    { label: 'Morfológico 1º Trimestre / TN', de: addDays(dum, 84), ate: addDays(dum, 97) },
    { label: 'Morfológico 2º Trimestre',       de: addDays(dum, 147), ate: addDays(dum, 182) },
  ] : []

  const diasCiclo = dum && isOvulacao ? (() => {
    const CICLO = 28
    const hoje = new Date()
    const diasSinceDUM = Math.floor((hoje.getTime() - dum.getTime()) / 86400000)
    const ciclosCompletos = Math.floor(diasSinceDUM / CICLO)
    let inicioAtual = addDays(dum, ciclosCompletos * CICLO)
    const d10 = addDays(inicioAtual, 9)
    const d12 = addDays(inicioAtual, 11)
    const d14 = addDays(inicioAtual, 13)
    // se o dia 14 já passou, avança para o próximo ciclo
    if (d14 < hoje) {
      inicioAtual = addDays(inicioAtual, CICLO)
    }
    return {
      d10: addDays(inicioAtual, 9),
      d12: addDays(inicioAtual, 11),
      d14: addDays(inicioAtual, 13),
    }
  })() : null

  return (
    <PainelLayout>
      {/* Voltar */}
      <button
        onClick={() => navigate('/painel')}
        className="flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-wine-deep transition-colors duration-300 mb-5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Lista
      </button>

      {/* Banner de duplicata */}
      {otherRecords.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-2 mb-2.5">
            <TriangleAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <p className="text-sm font-medium text-amber-800">
              Esta paciente já tem {otherRecords.length === 1 ? 'outro registro' : `mais ${otherRecords.length} registros`}
            </p>
          </div>
          <div className="space-y-2">
            {otherRecords.map((rec) => (
              <div key={rec.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <StatusBadge status={rec.status} />
                  <span className="text-xs text-amber-700 font-light truncate">
                    {rec.exame ?? 'Exame não informado'} · {fmtISO(rec.criado_em)}
                  </span>
                </div>
                <Link
                  to={`/painel/${rec.id}`}
                  className="text-[11px] tracking-wide text-amber-600 underline underline-offset-2 flex-shrink-0 hover:text-amber-800 transition-colors"
                >
                  Ver
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header compacto */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-wine-deep">
              {item.pacientes?.nome?.charAt(0).toUpperCase() ?? '?'}
            </span>
          </div>
          <div>
            <h1 className="font-comfortaa text-wine-deep text-lg font-light leading-none">
              {item.pacientes?.nome ?? '—'}
            </h1>
            {idade !== null && (
              <p className="text-xs text-muted-foreground font-light mt-0.5">{idade} anos</p>
            )}
          </div>
        </div>
      </div>

      {/* Grid principal 2 colunas */}
      <div className="grid grid-cols-2 gap-3 mb-3">

        {/* Coluna esquerda — paciente */}
        <div className="bg-white border border-border/50 rounded-2xl p-4 space-y-3">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">Paciente</p>
          <Chip label="Nome" value={item.pacientes?.nome ?? '—'} />
          <Chip label="CPF" value={item.pacientes?.cpf ? formatCpf(item.pacientes.cpf) : '—'} />
          <Chip label="Nascimento" value={item.pacientes?.data_nascimento ?? '—'} />
          <Chip label="Telefone" value={item.pacientes?.telefone ? formatTel(item.pacientes.telefone) : '—'} />
        </div>

        {/* Coluna direita — exame */}
        <div className="bg-white border border-border/50 rounded-2xl p-4 space-y-3">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">Exame</p>
          <Chip label="Exame" value={exameFormatado} />
          <Chip label="Turno" value={turnoLabel[item.preferencia_turno ?? ''] ?? '—'} />
          <Chip label="Médico" value={medicoFormatado} />
          <Chip label="Convênio" value={item.convenio?.join(', ') ?? '—'} />
        </div>
      </div>

      {/* Informações obstétricas (DUM + IG + janelas) */}
      {dum && (
        <div className="bg-white border border-border/50 rounded-2xl p-4 mb-3 space-y-3">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
            {isOvulacao ? 'Informações do Ciclo' : 'Informações Obstétricas'}
          </p>
          <p className="text-sm text-foreground/70 font-light">
            DUM: {fmtDate(dum)}
          </p>
          {igCalculada && !isOvulacao && <p className="text-base text-wine-deep font-bold">IG: {igCalculada}</p>}
          {janelas.length > 0 && (
            <div className="space-y-2 pt-1 border-t border-border/40">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">Janelas ideais para agendamento</p>
              {janelas.map((j) => (
                <div key={j.label} className="flex items-start justify-between gap-2">
                  <p className="text-xs text-foreground/70 font-light">{j.label}</p>
                  <p className="text-xs text-wine-deep font-medium whitespace-nowrap">
                    {fmtDate(j.de)} – {fmtDate(j.ate)}
                  </p>
                </div>
              ))}
            </div>
          )}
          {diasCiclo && (
            <div className="space-y-2 pt-1 border-t border-border/40">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">Dias ideais para agendar (ciclo atual/próximo)</p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-foreground/70 font-light">10º dia do ciclo</p>
                <p className="text-xs text-wine-deep font-medium">{fmtDate(diasCiclo.d10)}</p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-foreground/70 font-light">12º dia do ciclo</p>
                <p className="text-xs text-wine-deep font-medium">{fmtDate(diasCiclo.d12)}</p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-foreground/70 font-light">14º dia do ciclo</p>
                <p className="text-xs text-wine-deep font-medium">{fmtDate(diasCiclo.d14)}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Observações da paciente (se houver) */}
      {obsUsuario && (
        <div className="bg-white border border-border/50 rounded-2xl p-4 mb-3">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-1.5">Observações</p>
          <p className="text-sm text-foreground/80 font-light leading-relaxed">{obsUsuario}</p>
        </div>
      )}

      {/* Pedido médico (se houver) */}
      {item.pedido_url && (
        <div className="bg-white border border-border/50 rounded-2xl p-4 mb-3">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-1.5">Pedido médico</p>
          <div className="flex flex-col gap-2">
            {item.pedido_url.split(',').filter(Boolean).map((url, i) => (
              <a key={i} href={url.trim()} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-wine-deep text-sm underline underline-offset-4">
                <FileText className="w-4 h-4" /> Documento {item.pedido_url!.split(',').length > 1 ? i + 1 : ''}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Status */}
      <div className="bg-white border border-border/50 rounded-2xl p-4 mb-3">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-2.5">Status</p>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateStatus(opt.value)}
              disabled={updatingStatus || item.status === opt.value}
              className={[
                'px-3 py-1.5 rounded-full text-[11px] tracking-[0.12em] uppercase font-medium border transition-all duration-300',
                item.status === opt.value
                  ? 'bg-wine-deep text-wine-foreground border-wine-deep'
                  : 'bg-white border-border text-muted-foreground hover:border-wine-deep/40 hover:text-wine-deep',
                updatingStatus ? 'opacity-50 cursor-not-allowed' : '',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {item.status === 'em_atendimento' && item.atendente_nome && (
          <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-border/30">
            <User className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <p className="text-[11px] text-muted-foreground">
              Atendido por <span className="text-wine-deep font-medium">{item.atendente_nome}</span>
            </p>
          </div>
        )}
      </div>

      {/* Botão WhatsApp */}
      <button
        onClick={openWhatsApp}
        className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] text-white px-6 py-3.5 rounded-2xl text-sm font-semibold tracking-wide hover:bg-[#1ebe5d] transition-all duration-300 shadow-soft"
      >
        <MessageCircle className="w-4 h-4" />
        Abrir conversa com {nomeExibido} no WhatsApp
      </button>
    </PainelLayout>
  )
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium leading-none">{label}</p>
      <p className="text-sm text-foreground/85 font-light mt-0.5 leading-snug">{value}</p>
    </div>
  )
}
