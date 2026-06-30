import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5531993910212";

export const SiteWhatsAppFab = () => (
  <a
    href={WHATSAPP_URL}
    target="whatsapp"
    aria-label="WhatsApp"
    className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-deep animate-pulse-soft hover:scale-110 transition-transform duration-300"
  >
    <MessageCircle className="w-6 h-6" strokeWidth={2} />
  </a>
);
