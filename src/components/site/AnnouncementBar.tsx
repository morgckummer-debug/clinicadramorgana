import { useEffect, useState } from "react";
import { X, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5531993910212";
const STORAGE_KEY = "cta-bar-dismissed-v1";
const BAR_HEIGHT_PX = 36;

const setBarHeight = (h: number) => {
  document.documentElement.style.setProperty("--cta-bar-h", `${h}px`);
};

export const AnnouncementBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1";
    if (!dismissed) {
      setVisible(true);
      setBarHeight(BAR_HEIGHT_PX);
    } else {
      setBarHeight(0);
    }
    return () => setBarHeight(0);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setBarHeight(0);
    setVisible(false);
  };

  return (
    <div
      className="fixed top-0 inset-x-0 z-[60] bg-wine-deep text-wine-foreground border-b border-champagne/25"
      style={{ height: BAR_HEIGHT_PX }}
      role="region"
      aria-label="Barra de agendamento"
    >
      <div className="container h-full flex items-center justify-between gap-4">
        <span className="hidden sm:inline text-[10px] tracking-[0.3em] uppercase text-champagne/85 font-light">
          Atendimento humanizado · Laudo no mesmo dia
        </span>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-champagne hover:text-wine-foreground transition-colors duration-300 font-medium"
        >
          <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.8} />
          Agendar exame no WhatsApp
          <span aria-hidden="true">→</span>
        </a>
        <button
          onClick={dismiss}
          aria-label="Fechar barra de agendamento"
          className="text-wine-foreground/70 hover:text-champagne transition-colors duration-300"
        >
          <X className="w-3.5 h-3.5" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
};
