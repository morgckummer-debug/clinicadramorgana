import logoClinica from '@/assets/logo-clinica.png'

export function ConversationHeader() {
  return (
    <div className="flex items-center justify-between mb-7">
      <img src={logoClinica} alt="Clínica de Ultrassom Dra. Morgana Kummer" className="h-14 w-auto" />

      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse-soft" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
          Assistente MK
        </span>
      </div>
    </div>
  )
}
