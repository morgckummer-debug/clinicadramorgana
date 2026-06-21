import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, MessageCircle, FileText } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { PainelLayout } from '@/components/painel/PainelLayout'
import { StatusBadge } from '@/components/painel/StatusBadge'

interface Detalhe {
  id: string
  canal: string
  categoria: string | null
  exame: string | null
  convenio: string[] | null
  preferencia_turno: string | null
  medico_preferido: string | null
  pedido_url: string | null
  observacoes: string | null
  status: string
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
  { value: 'em_atendimento', label: 'Em atendimento' },
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
  const [item, setItem] = useState<Detalhe | null>(null)
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState(false)

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

  const updateStatus = async (newStatus: string) => {
    if (!id) return
    setUpdatingStatus(true)
    await supabase.from('pre_agendamentos').update({ status: newStatus }).eq('id', id)
    setItem((prev) => prev ? { ...prev, status: newStatus } : prev)
    setUpdatingStatus(false)
  }

  const openWhatsApp = () => {
    if (!item?.pacientes) return
    const nome = primeiroNome(item.pacientes.nome)
    const exame = formatExame(item.exame)
    const msg = encodeURIComponent(
      `Olá, ${nome}! 😊 Vi aqui no sistema que você gostaria de agendar: ${exame}. Vou verificar a disponibilidade para você!`
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

  const janelas = dum ? [
    { label: 'Morfológico 1º Trimestre', de: addDays(dum, 84), ate: addDays(dum, 97) },
    { label: 'Translucência Nucal (TN)',  de: addDays(dum, 84), ate: addDays(dum, 97) },
    { label: 'Morfológico 2º Trimestre', de: addDays(dum, 147), ate: addDays(dum, 182) },
  ] : []

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
        <StatusBadge status={item.status} />
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
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">Informações Obstétricas</p>
          <p className="text-sm text-foreground/70 font-light">
            DUM: {fmtDate(dum)}
          </p>
          {igCalculada && <p className="text-sm text-wine-deep font-semibold">IG: {igCalculada}</p>}
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

      {/* Status + WhatsApp na mesma linha */}
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
