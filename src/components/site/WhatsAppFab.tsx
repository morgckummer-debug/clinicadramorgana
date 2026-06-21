import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const WhatsAppFab = () => {
  return (
    <Link
      to="/agendar"
      aria-label="Agendar meu exame"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-champagne text-wine-deep flex items-center justify-center shadow-deep animate-pulse-soft hover:scale-110 transition-transform duration-300"
    >
      <MessageCircle className="w-6 h-6" strokeWidth={2} />
    </Link>
  );
};
