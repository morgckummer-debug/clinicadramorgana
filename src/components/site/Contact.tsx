import { MapPin, Phone, Clock, Instagram } from "lucide-react";

export const Contact = () => {
  const whatsappLink = "https://api.whatsapp.com/send?phone=5531993910212";

  return (
    <section id="contato" className="py-12 md:py-16 bg-wine-deep text-wine-foreground relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-champagne opacity-50" />

      <div className="container grid md:grid-cols-2 gap-10 items-start">
        <div>
          <span className="text-champagne text-[11px] tracking-[0.4em] uppercase">
            Contato
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl text-balance">
            Vamos conversar sobre seu <span className="font-serif italic font-light text-champagne">momento</span>.
          </h2>
          <div className="mt-6 w-12 h-px bg-champagne" />

          <div className="mt-12 space-y-8">
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-full border border-champagne/40 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-champagne" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-1">Endereço</div>
                <div className="text-wine-foreground/90 font-light leading-relaxed">
                  Sete Lagoas — Minas Gerais<br />
                  Consulte o endereço completo via WhatsApp
                </div>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-full border border-champagne/40 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-champagne" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-1">WhatsApp</div>
                <a href={whatsappLink} className="text-wine-foreground/90 hover:text-champagne transition-colors font-light">
                  Agendamento exclusivo via WhatsApp
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-full border border-champagne/40 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-champagne" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-1">Horário</div>
                <div className="text-wine-foreground/90 font-light leading-relaxed">
                  Segunda a Sexta · 08h — 18h<br />
                  Sábado · 08h — 12h
                </div>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-full border border-champagne/40 flex items-center justify-center flex-shrink-0">
                <Instagram className="w-4 h-4 text-champagne" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-1">Instagram</div>
                <a href="#" className="text-wine-foreground/90 hover:text-champagne transition-colors font-light">
                  @dra.morganakummer
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Cartão CTA */}
        <div className="bg-wine border border-champagne/30 rounded-2xl p-10 md:p-12 shadow-deep relative">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-champagne opacity-60" />
          <h3 className="font-serif italic text-3xl md:text-4xl text-champagne mb-4">
            Agende seu exame
          </h3>
          <p className="font-comfortaa text-wine-foreground/80 font-light leading-relaxed mb-10">
            Atendimento humanizado, equipamento de ponta e laudo entregue no
            mesmo dia. Reserve seu horário pelo WhatsApp.
          </p>
          <a
            href={whatsappLink}
            className="block w-full text-center bg-champagne text-wine-deep px-8 py-5 rounded-full text-sm tracking-[0.25em] uppercase font-bold hover:bg-wine-foreground transition-all duration-500"
          >
            Falar no WhatsApp
          </a>
          <p className="text-center text-xs text-wine-foreground/60 mt-6 tracking-wide">
            Resposta em até 1h em horário comercial
          </p>
        </div>
      </div>
    </section>
  );
};
