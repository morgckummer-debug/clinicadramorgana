import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, MessageCircle, User, FileText, Calendar, Clock, Stethoscope, CreditCard } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { PainelLayout } from '@/components/painel/PainelLayout'
import { StatusBadge } from '@/components/painel/StatusBadge'

const WHATSAPP_NUMBER = '5531993910212'

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

const statusOptions = [
  { value: 'pendente', label: 'Pendente' },
  { value: 'em_atendimento', label: 'Em atendimento' },
  { value: 'agendado', label: 'Agendado' },
  { value: 'cancelado', label: 'Cancelado' },
]

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
  const c = cpf.replace(/\D/g, '')
  return c.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

function formatTel(tel: string) {
  const t = tel.replace(/\D/g, '')
  return t.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
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
    const nome = item.pacientes.nome.split(' ')[0]
    const exame = item.exame ?? 'ultrassom'
    const msg = encodeURIComponent(
      `Olá, ${nome}! 😊 Vi aqui no sistema que você gostaria de agendar um ${exame}. Vou verificar a disponibilidade para você!`
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

  return (
    <PainelLayout>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate('/painel')}
          className="flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-wine-deep transition-colors duration-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Lista
        </button>
      </div>

      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
            <span className="text-base font-semibold text-wine-deep">
              {item.pacientes?.nome?.charAt(0).toUpperCase() ?? '?'}
            </span>
          </div>
          <div>
            <h1 className="font-comfortaa text-wine-deep text-xl font-light">
              {item.pacientes?.nome ?? '—'}
            </h1>
            {idade !== null && (
              <p className="text-xs text-muted-foreground font-light">{idade} anos</p>
            )}
          </div>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <div className="grid gap-3 mb-6">

        {/* Dados pessoais */}
        <Section title="Paciente">
          <Row icon={<User className="w-3.5 h-3.5" />} label="Nome" value={item.pacientes?.nome ?? '—'} />
          <Row icon={<CreditCard className="w-3.5 h-3.5" />} label="CPF" value={item.pacientes?.cpf ? formatCpf(item.pacientes.cpf) : '—'} />
          <Row icon={<Calendar className="w-3.5 h-3.5" />} label="Nascimento" value={item.pacientes?.data_nascimento ?? '—'} />
          <Row icon={<MessageCircle className="w-3.5 h-3.5" />} label="Telefone" value={item.pacientes?.telefone ? formatTel(item.pacientes.telefone) : '—'} />
        </Section>

        {/* Exame */}
        <Section title="Exame solicitado">
          <Row icon={<Stethoscope className="w-3.5 h-3.5" />} label="Exame" value={item.exame ?? '—'} />
          <Row icon={<Clock className="w-3.5 h-3.5" />} label="Turno preferido" value={turnoLabel[item.preferencia_turno ?? ''] ?? '—'} />
          <Row icon={<User className="w-3.5 h-3.5" />} label="Médico preferido" value={item.medico_preferido ?? '—'} />
          {item.convenio && item.convenio.length > 0 && (
            <Row icon={<CreditCard className="w-3.5 h-3.5" />} label="Convênio" value={item.convenio.join(', ')} />
          )}
        </Section>

        {/* Observações */}
        {item.observacoes && (
          <Section title="Observações">
            <p className="text-sm text-foreground/80 font-light leading-relaxed px-1">
              {item.observacoes}
            </p>
          </Section>
        )}

        {/* Pedido médico */}
        {item.pedido_url && (
          <Section title="Pedido médico">
            <a
              href={item.pedido_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-wine-deep text-sm underline underline-offset-4"
            >
              <FileText className="w-4 h-4" />
              Ver documento
            </a>
          </Section>
        )}
      </div>

      {/* Atualizar status */}
      <Section title="Atualizar status">
        <div className="flex flex-wrap gap-2 pt-1">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateStatus(opt.value)}
              disabled={updatingStatus || item.status === opt.value}
              className={[
                'px-4 py-1.5 rounded-full text-[11px] tracking-[0.12em] uppercase font-medium border transition-all duration-300',
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
      </Section>

      {/* Botão WhatsApp */}
      <button
        onClick={openWhatsApp}
        className="mt-6 w-full flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-2xl text-sm font-semibold tracking-wide hover:bg-[#1ebe5d] transition-all duration-300 shadow-soft hover:shadow-elegant"
      >
        <MessageCircle className="w-5 h-5" />
        Abrir conversa no WhatsApp
      </button>

      <p className="text-center text-[11px] text-muted-foreground font-light mt-3">
        Abre o WhatsApp com mensagem pré-preenchida para {item.pacientes?.nome?.split(' ')[0] ?? 'a paciente'}.
      </p>
    </PainelLayout>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-border/50 rounded-2xl p-5">
      <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-3">
        {title}
      </p>
      <div className="space-y-2.5">{children}</div>
    </div>
  )
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-muted-foreground mt-0.5 flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">{label}</p>
        <p className="text-sm text-foreground/85 font-light mt-0.5">{value}</p>
      </div>
    </div>
  )
}
