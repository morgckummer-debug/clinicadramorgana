const config: Record<string, { label: string; className: string }> = {
  pendente: {
    label: 'Pendente',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  em_atendimento: {
    label: 'Atendido',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  aguardando_resposta: {
    label: 'Aguardando resposta',
    className: 'bg-orange-50 text-orange-700 border-orange-200',
  },
  agendado: {
    label: 'Agendado',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  cancelado: {
    label: 'Cancelado',
    className: 'bg-red-50 text-red-600 border-red-200',
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
        className={`relative inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.15em] uppercase font-medium border ${s.className}`}
      >
        {s.label}
      </span>
    </span>
  )
}
