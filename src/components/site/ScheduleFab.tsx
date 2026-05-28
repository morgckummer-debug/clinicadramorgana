import { useEffect, useState } from "react";
import { CalendarHeart } from "lucide-react";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5531993910212";

/**
 * CTA secundário fixo para "Agendar exame".
 * - Desktop (md+): pílula vertical na lateral direita, rotacionada.
 * - Mobile: FAB redondo empilhado acima do WhatsAppFab.
 * Aparece após o usuário rolar a página.
 */
export const ScheduleFab = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Mobile FAB — empilhado acima do WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agendar exame"
        className={`md:hidden fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-champagne text-wine-deep flex items-center justify-center shadow-deep transition-all duration-500 hover:scale-110 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <CalendarHeart className="w-6 h-6" strokeWidth={1.8} />
      </a>

      {/* Desktop — pílula vertical lateral */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agendar exame no WhatsApp"
        className={`hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 items-center gap-2 bg-champagne text-wine-deep px-5 py-3 rounded-l-full shadow-deep text-[11px] tracking-[0.3em] uppercase font-semibold hover:bg-wine-foreground transition-all duration-500 ${
          show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <CalendarHeart className="w-4 h-4" strokeWidth={1.8} />
        Agendar exame
      </a>
    </>
  );
};
