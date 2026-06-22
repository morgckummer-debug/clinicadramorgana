import { MapPin, Phone, Clock, Instagram, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP_URL = "https://wa.me/5531993910212";
const INSTAGRAM_URL = "https://instagram.com/dramorganak";
const INSTAGRAM_HANDLE = "@dramorganak";

export const ContactV2 = () => {
  const { t } = useLanguage();
  const contactItems = [
    { Icon: MapPin,     label: t.contact.addressLabel,  value: t.contact.addressValue,  href: undefined },
    { Icon: Phone,      label: t.contact.whatsappLabel, value: "(31) 99391-0212",        href: WHATSAPP_URL },
    { Icon: Clock,      label: t.contact.hoursLabel,    value: t.contact.hoursValue,    href: undefined },
    { Icon: Instagram,  label: t.contact.instagramLabel, value: INSTAGRAM_HANDLE,        href: INSTAGRAM_URL },
  ];
  return (
    <section id="contato" className="py-12 bg-gradient-rose relative">
      <div className="container grid md:grid-cols-2 gap-8 items-start">
        <div>
          <span className="text-wine text-[11px] tracking-[0.4em] uppercase">{t.contact.label}</span>
          <h2 className="mt-4 text-wine-deep text-4xl md:text-5xl text-balance">
            {t.contact.titleBefore}<span className="font-serif italic font-light">{t.contact.titleItalic}</span>{t.contact.titleAfter}
          </h2>
          <div className="mt-6 w-12 h-px bg-champagne" />

          <div className="mt-10 space-y-6">
            {contactItems.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-wine" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-wine mb-1">{label}</div>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 font-light hover:text-wine transition-colors whitespace-pre-line"
                    >
                      {value}
                    </a>
                  ) : (
                    <div className="text-foreground/80 font-light whitespace-pre-line">{value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <a
          href="https://www.google.com/maps?ll=-19.464006,-44.240331&z=18&t=m&hl=pt-BR&gl=US&mapclient=embed&q=R.+C%C3%A2ndido+Azeredo,+41a+-+Centro+Sete+Lagoas+-+MG+35700-019"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.contact.mapsAriaLabel}
          className="group block relative overflow-hidden rounded-3xl shadow-elegant border border-border bg-card"
        >
          <iframe
            title={t.contact.mapTitle}
            src="https://www.google.com/maps?q=R.+C%C3%A2ndido+Azeredo,+41a+-+Centro+Sete+Lagoas+-+MG+35700-019&hl=pt-BR&z=18&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[420px] md:h-[520px] border-0 pointer-events-none"
          />
          <div className="absolute inset-0 bg-wine-deep/0 group-hover:bg-wine-deep/10 transition-colors duration-500" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between bg-card/95 backdrop-blur-sm border border-border rounded-full px-5 py-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-wine" strokeWidth={1.6} />
              <span className="text-xs text-foreground/85 font-light">{t.contact.addressShort}</span>
            </div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-wine font-medium hidden sm:inline-flex items-center gap-1">
              {t.contact.openLabel} <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
};
