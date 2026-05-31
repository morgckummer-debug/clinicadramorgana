import { MessageCircle } from "lucide-react";

export const WhatsAppFab = () => {
  return (
    <a
      href="https://wa.me/5531993910212"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-champagne text-wine-deep flex items-center justify-center shadow-deep animate-pulse-soft hover:scale-110 transition-transform duration-300"
    >
      <MessageCircle className="w-6 h-6" strokeWidth={2} />
    </a>
  );
};
