const config: Record<string, { label: string; bg: string; color: string; border: string }> = {
  pendente: {
    label: 'Pendente',
    bg: 'rgba(245,158,11,0.14)',
    color: '#92400e',
    border: 'rgba(245,158,11,0.3)',
  },
  em_atendimento: {
    label: 'Atendido',
    bg: 'rgba(59,130,246,0.14)',
    color: '#1d4ed8',
    border: 'rgba(59,130,246,0.3)',
  },
  aguardando_resposta: {
    label: 'Aguardando resposta',
    bg: 'rgba(249,115,22,0.14)',
    color: '#c2410c',
    border: 'rgba(249,115,22,0.3)',
  },
  agendado: {
    label: 'Agendado',
    bg: 'rgba(16,185,129,0.14)',
    color: '#047857',
    border: 'rgba(16,185,129,0.3)',
  },
  cancelado: {
    label: 'Cancelado',
    bg: 'rgba(239,68,68,0.14)',
    color: '#b91c1c',
    border: 'rgba(239,68,68,0.3)',
  },
}

export function StatusBadge({ status }: { status: string }) {
  const s = config[status] ?? config['pendente']
  const isAguardando = status === 'aguardando_resposta'

  return (
    <span className="relative inline-flex items-center">
      {isAguardando && (
        <span className="absolute -inset-0.5 rounded-full bg-orange-300 opacity-60 animate-ping" />
      )}
      <span
        className="relative inline-flex items-center px-3 py-1 rounded-full text-[10px] tracking-[0.1em] uppercase font-medium border"
        style={{ background: s.bg, color: s.color, borderColor: s.border }}
      >
        {s.label}
      </span>
    </span>
  )
}
