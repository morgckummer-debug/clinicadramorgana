import { CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const successText = {
  pt: {
    eyebrow: 'Tudo certo',
    title: <>
      <span className="whitespace-nowrap">Pré-agendamento</span><br />realizado!
    </>,
    body: <>
      Recebemos sua solicitação com sucesso.{' '}
      <strong className="text-foreground/90 font-medium">O agendamento ainda não está confirmado</strong>{' '}
      — nossa equipe entrará em contato para verificar disponibilidade e confirmar o horário.
    </>,
  },
  en: {
    eyebrow: 'All done',
    title: <>
      <span className="whitespace-nowrap">Pre-booking</span><br />submitted!
    </>,
    body: <>
      We received your request successfully.{' '}
      <strong className="text-foreground/90 font-medium">The booking is not yet confirmed</strong>{' '}
      — our team will get in touch to check availability and confirm your appointment.
    </>,
  },
  es: {
    eyebrow: 'Todo listo',
    title: <>
      <span className="whitespace-nowrap">Pre-reserva</span><br />realizada!
    </>,
    body: <>
      Recibimos tu solicitud con éxito.{' '}
      <strong className="text-foreground/90 font-medium">La reserva aún no está confirmada</strong>{' '}
      — nuestro equipo se pondrá en contacto para verificar disponibilidad y confirmar el horario.
    </>,
  },
}

export function SuccessScreen() {
  const { lang } = useLanguage()
  const text = successText[lang as keyof typeof successText] ?? successText.pt

  return (
    <div className="animate-fade-up text-center">
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 rounded-full bg-champagne/20 flex items-center justify-center shadow-soft">
          <CheckCircle2 className="w-8 h-8 text-wine-deep" strokeWidth={1.5} />
        </div>
      </div>

      <span className="inline-block text-[10px] tracking-[0.4em] uppercase text-wine font-medium mb-4">
        {text.eyebrow}
      </span>

      <h2 className="font-comfortaa text-wine-deep text-xl sm:text-2xl md:text-3xl font-light leading-[1.3] mb-4 mx-auto">
        {text.title}
      </h2>

      <p className="text-foreground/70 font-light text-base sm:text-lg leading-relaxed text-balance max-w-sm mx-auto">
        {text.body}
      </p>
    </div>
  )
}
