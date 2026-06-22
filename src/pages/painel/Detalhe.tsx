import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, MessageCircle, FileText, TriangleAlert, User, PhoneMissed, X, Pencil, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { PainelLayout } from '@/components/painel/PainelLayout'
import { StatusBadge } from '@/components/painel/StatusBadge'
import { useAuth } from '@/contexts/AuthContext'

interface OtherRecord {
  id: string
  exame: string | null
  status: string
  atendente_nome: string | null
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

function calcIdadeFormatada(dataNasc: string | null) {
  if (!dataNasc) return null
  const [ano, mes, dia] = dataNasc.split('-').map(Number)
  const hoje = new Date()

  let anos = hoje.getFullYear() - ano
  let meses = hoje.getMonth() + 1 - mes

  if (meses < 0) {
    anos--
    meses += 12
  }
  if (hoje.getDate() < dia) {
    meses--
    if (meses < 0) {
      anos--
      meses += 12
    }
  }

  return `${anos}a${meses}m`
}

function formatCpf(cpf: string) {
  return cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

function formatTel(tel: string) {
  return tel.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

function formatDataNascimento(data: string) {
  if (!data) return '—'
  const [ano, mes, dia] = data.split('-')
  return `${dia}.${mes}.${ano}`
}

function primeiroNome(nome: string) {
  const partes = nome.trim().split(' ')
  return partes.slice(0, 2).join(' ')
}

function formatExame(valor: string | null) {
  if (!valor) return '—'
  if (valor === 'nao-sei') return '⚠️ Não identificado — verificar pedido'
  return valor
}

export default function Detalhe() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { userName } = useAuth()
  const [item, setItem] = useState<Detalhe | null>(null)
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [otherRecords, setOtherRecords] = useState<OtherRecord[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [editingModal, setEditingModal] = useState(false)
  const [editForm, setEditForm] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    data_nascimento: '',
  })
  const [savingEdit, setSavingEdit] = useState(false)
  const [copiedCpf, setCopiedCpf] = useState(false)

  const copyCpf = () => {
    if (!item?.pacientes?.cpf) return
    navigator.clipboard.writeText(item.pacientes.cpf)
    setCopiedCpf(true)
    toast.success('CPF copiado!')
    setTimeout(() => setCopiedCpf(false), 2000)
  }

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
      .select('id, exame, status, atendente_nome, criado_em')
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

  const openEditModal = () => {
    if (!item?.pacientes) return
    setEditForm({
      nome: item.pacientes.nome || '',
      cpf: item.pacientes.cpf || '',
      telefone: item.pacientes.telefone || '',
      data_nascimento: item.pacientes.data_nascimento || '',
    })
    setEditingModal(true)
  }

  const saveEdit = async () => {
    if (!item?.paciente_id) return
    setSavingEdit(true)
    try {
      await supabase
        .from('pacientes')
        .update({
          nome: editForm.nome,
          cpf: editForm.cpf,
          telefone: editForm.telefone,
          data_nascimento: editForm.data_nascimento,
        })
        .eq('id', item.paciente_id)

      setItem((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          pacientes: {
            ...prev.pacientes!,
            nome: editForm.nome,
            cpf: editForm.cpf,
            telefone: editForm.telefone,
            data_nascimento: editForm.data_nascimento,
          },
        }
      })
      setEditingModal(false)
    } catch (error) {
      console.error('Erro ao salvar edição:', error)
    } finally {
      setSavingEdit(false)
    }
  }

  const openWhatsApp = async () => {
    if (!item?.pacientes) return

    if (item.status === 'pendente' && id) {
      await supabase
        .from('pre_agendamentos')
        .update({ status: 'em_atendimento', atendente_nome: userName })
        .eq('id', id)
        .eq('status', 'pendente')
      setItem((prev) => {
        if (!prev) return prev
        return { ...prev, status: 'em_atendimento', atendente_nome: userName }
      })
    }

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

  // Calcular semanas gestacionais para filtrar janelas
  const semanasGestacionais = dum ? Math.floor((Date.now() - dum.getTime()) / 86400000 / 7) : null

  const janelas = dum && !isOvulacao ? [
    ...(semanasGestacionais === null || semanasGestacionais < 15 ? [
      { label: 'Morfológico 1º Trimestre / TN', de: addDays(dum, 84), ate: addDays(dum, 97) },
    ] : []),
    ...(semanasGestacionais === null || semanasGestacionais < 26 ? [
      { label: 'Morfológico 2º Trimestre',       de: addDays(dum, 147), ate: addDays(dum, 182) },
    ] : []),
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
                <div className="flex flex-col gap-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={rec.status} />
                    <span className="text-xs text-amber-700 font-light truncate">
                      {rec.exame ?? 'Exame não informado'} · {fmtISO(rec.criado_em)}
                    </span>
                  </div>
                  {rec.atendente_nome && (
                    <span className="text-[11px] text-amber-600 font-light pl-1">
                      Atendido por <span className="font-medium">{rec.atendente_nome}</span> em {fmtISO(rec.criado_em)}
                    </span>
                  )}
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
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-champagne/30 flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-bold text-wine-deep">
              {item.pacientes?.nome?.charAt(0).toUpperCase() ?? '?'}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-comfortaa text-wine-deep text-2xl font-bold leading-tight">
                {item.pacientes?.nome ?? '—'}
              </h1>
              <button
                onClick={openEditModal}
                className="p-1.5 rounded-lg hover:bg-champagne/20 transition-colors"
                title="Editar dados do paciente"
              >
                <Pencil className="w-4 h-4 text-wine-deep" />
              </button>
            </div>
            {idade !== null && (
              <p className="text-sm text-muted-foreground font-light mt-0.5">{idade} anos</p>
            )}
          </div>
        </div>

        {item.status !== 'pendente' && (
          <button
            onClick={() => updateStatus('pendente')}
            disabled={updatingStatus}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0"
            style={{ backgroundColor: '#ffe7bf', color: '#5B2D8E', border: '1.5px solid #5B2D8E' }}
          >
            <PhoneMissed className="w-4 h-4" />
            Devolver para a fila
          </button>
        )}
      </div>

      {/* Grid principal 2 colunas */}
      <div className="grid grid-cols-2 gap-3 mb-3">

        {/* Coluna esquerda — paciente */}
        <div className="bg-white border border-border/50 rounded-2xl p-4 space-y-3">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">Paciente</p>
          <Chip label="Nome" value={item.pacientes?.nome ?? '—'} />
          <Chip
            label="CPF"
            value={item.pacientes?.cpf ? formatCpf(item.pacientes.cpf) : '—'}
            onCopy={copyCpf}
            isCopied={copiedCpf}
          />
          <Chip
            label="Nascimento"
            value={item.pacientes?.data_nascimento ? `${formatDataNascimento(item.pacientes.data_nascimento)} (${calcIdadeFormatada(item.pacientes.data_nascimento)})` : '—'}
          />
          <Chip label="Telefone" value={item.pacientes?.telefone ? formatTel(item.pacientes.telefone) : '—'} />
        </div>

        {/* Coluna direita — exame */}
        <div className="bg-white border border-border/50 rounded-2xl p-4 space-y-3">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">Exame</p>
          <Chip label="Exame" value={exameFormatado} />
          <Chip label="Turno" value={turnoLabel[item.preferencia_turno ?? ''] ?? '—'} />
          <Chip label="Médico preferencial" value={medicoFormatado} />
          <Chip label="Convênio" value={item.convenio?.join(', ') ?? '—'} />
        </div>
      </div>

      {/* Informações obstétricas (DUM + IG + janelas) */}
      {dum && (
        <div className="mx-auto max-w-2xl rounded-2xl p-4 mb-3 space-y-3" style={{ backgroundColor: '#fff1da', border: '2px solid #5B2D8E' }}>
          <p className="text-[10px] tracking-[0.3em] uppercase font-medium text-center" style={{ color: '#5B2D8E' }}>
            {isOvulacao ? 'Informações do Ciclo' : 'Informações Obstétricas'}
          </p>
          <p className="text-sm font-light text-center" style={{ color: '#5B2D8E' }}>
            DUM: {fmtDate(dum)}
          </p>
          {igCalculada && !isOvulacao && <p className="text-base font-bold text-center" style={{ color: '#5B2D8E' }}>IG: {igCalculada}</p>}
          {janelas.length > 0 && (
            <div className="space-y-2 pt-1" style={{ borderTop: '1px solid #5B2D8E' }}>
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-center" style={{ color: '#5B2D8E' }}>Janelas ideais para agendamento</p>
              {janelas.map((j) => (
                <div key={j.label} className="flex flex-col items-center gap-1">
                  <p className="text-xs font-light" style={{ color: '#5B2D8E' }}>{j.label}</p>
                  <p className="text-xs font-medium whitespace-nowrap" style={{ color: '#5B2D8E' }}>
                    {fmtDate(j.de)} – {fmtDate(j.ate)}
                  </p>
                </div>
              ))}
            </div>
          )}
          {diasCiclo && (
            <div className="space-y-2 pt-1" style={{ borderTop: '1px solid #5B2D8E' }}>
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-center" style={{ color: '#5B2D8E' }}>Dias ideais para agendar (ciclo atual/próximo)</p>
              <div className="flex flex-col items-center gap-1">
                <p className="text-xs font-light" style={{ color: '#5B2D8E' }}>10º dia do ciclo</p>
                <p className="text-xs font-medium" style={{ color: '#5B2D8E' }}>{fmtDate(diasCiclo.d10)}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-xs font-light" style={{ color: '#5B2D8E' }}>12º dia do ciclo</p>
                <p className="text-xs font-medium" style={{ color: '#5B2D8E' }}>{fmtDate(diasCiclo.d12)}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-xs font-light" style={{ color: '#5B2D8E' }}>14º dia do ciclo</p>
                <p className="text-xs font-medium" style={{ color: '#5B2D8E' }}>{fmtDate(diasCiclo.d14)}</p>
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
        <div className="mx-auto max-w-2xl bg-white border border-border/50 rounded-2xl p-4 mb-3">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-1.5 text-center">Pedido médico</p>
          <div className="flex flex-col gap-2 items-center">
            {item.pedido_url.split(',').filter(Boolean).map((url, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPreviewUrl(url.trim())}
                className="inline-flex items-center gap-2 text-wine-deep text-sm underline underline-offset-4"
              >
                <FileText className="w-4 h-4 flex-shrink-0" />
                Documento {item.pedido_url!.split(',').length > 1 ? i + 1 : ''}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Modal de preview do arquivo */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">Pedido médico</p>
              <button
                type="button"
                onClick={() => setPreviewUrl(null)}
                className="w-7 h-7 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-foreground/60" />
              </button>
            </div>
            {/\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(previewUrl) ? (
              <div className="overflow-auto flex items-center justify-center p-4 flex-1">
                <img src={previewUrl} alt="Pedido médico" className="max-w-full max-h-[75vh] object-contain rounded-lg" />
              </div>
            ) : (
              <iframe
                src={previewUrl}
                title="Pedido médico"
                className="flex-1 w-full"
                style={{ minHeight: '70vh' }}
              />
            )}
          </div>
        </div>
      )}

      {/* Status */}
      <div className="mx-auto max-w-2xl bg-white border border-border/50 rounded-2xl p-4 mb-3">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-2.5 text-center">Status</p>
        <div className="flex flex-wrap gap-2 justify-center">
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
          <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-border/30 justify-center">
            <User className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <p className="text-[11px] text-muted-foreground">
              Atendido por <span className="text-wine-deep font-medium">{item.atendente_nome}</span>
            </p>
          </div>
        )}
      </div>

      {/* Ações de contato */}
      <div className="flex flex-col items-center gap-2.5">
        <button
          onClick={openWhatsApp}
          className="inline-flex items-center gap-1.5 sm:gap-2.5 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full whitespace-nowrap bg-[#25D366] text-white text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-[#1ebe5d] transition-all duration-300 shadow-soft"
        >
          <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">Abrir conversa no WhatsApp</span>
          <span className="inline sm:hidden">WhatsApp</span>
        </button>

        {item.status !== 'pendente' && (
          <button
            onClick={() => updateStatus('pendente')}
            disabled={updatingStatus}
            className="inline-flex items-center gap-1.5 sm:gap-2.5 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full whitespace-nowrap text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300"
            style={{ backgroundColor: '#FDDCB5', color: '#5B2D8E', border: '1px solid #5B2D8E' }}
          >
            <PhoneMissed className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Devolver para fila</span>
            <span className="inline sm:hidden">Devolver</span>
          </button>
        )}
      </div>

      {/* Modal de edição */}
      {editingModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setEditingModal(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">Editar dados do paciente</p>
              <button
                type="button"
                onClick={() => setEditingModal(false)}
                className="w-7 h-7 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-foreground/60" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div>
                <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium block mb-1.5">
                  Nome
                </label>
                <input
                  type="text"
                  value={editForm.nome}
                  onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-wine-deep/40"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium block mb-1.5">
                  CPF
                </label>
                <input
                  type="text"
                  value={editForm.cpf}
                  onChange={(e) => setEditForm({ ...editForm, cpf: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-wine-deep/40"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium block mb-1.5">
                  Telefone
                </label>
                <input
                  type="text"
                  value={editForm.telefone}
                  onChange={(e) => setEditForm({ ...editForm, telefone: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-wine-deep/40"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium block mb-1.5">
                  Data de Nascimento (YYYY-MM-DD)
                </label>
                <input
                  type="text"
                  value={editForm.data_nascimento}
                  onChange={(e) => setEditForm({ ...editForm, data_nascimento: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-wine-deep/40"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-3 border-t border-border/40">
              <button
                type="button"
                onClick={() => setEditingModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:border-wine-deep/40 hover:text-wine-deep text-sm font-medium transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={saveEdit}
                disabled={savingEdit}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-50"
                style={{ backgroundColor: savingEdit ? '#ccc' : '#5B2D8E' }}
              >
                {savingEdit ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </PainelLayout>
  )
}

function Chip({ label, value, onCopy, isCopied }: { label: string; value: string; onCopy?: () => void; isCopied?: boolean }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium leading-none">{label}</p>
      <div className="flex items-center gap-2 mt-0.5">
        <p className="text-sm text-foreground/85 font-light leading-snug">{value}</p>
        {onCopy && value !== '—' && (
          <button
            onClick={onCopy}
            className="p-1 rounded hover:bg-muted transition-colors flex-shrink-0"
            title="Copiar"
          >
            {isCopied ? (
              <Check className="w-3.5 h-3.5 text-green-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-wine-deep" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}
