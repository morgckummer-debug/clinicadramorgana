import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logoClinica from "@/assets/logo-clinica.webp";
import logoWhite from "@/assets/logo-white.webp";
import { HeroV2 } from "@/components/site/v2/HeroV2";
import { QuoteV2 } from "@/components/site/v2/QuoteV2";
import { AboutV2 } from "@/components/site/v2/AboutV2";
import { ExamsV2 } from "@/components/site/v2/ExamsV2";
import { TeamV2 } from "@/components/site/v2/TeamV2";
import { ConveniosV2 } from "@/components/site/v2/ConveniosV2";
import { ContactV2 } from "@/components/site/v2/ContactV2";
import { PremiumExperience } from "@/components/site/PremiumExperience";

const WHATSAPP_URL = "https://wa.me/5531993910212";

const FlagUK = () => (
  <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="60" height="30" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="7" />
    <path d="M0,0 L60,30" stroke="#C8102E" strokeWidth="2.5" />
    <path d="M60,0 L0,30" stroke="#C8102E" strokeWidth="2.5" />
    <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="11" />
    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const FlagBR = () => (
  <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="30" height="20" fill="#009C3B" />
    <polygon points="15,2 28,10 15,18 2,10" fill="#FFDF00" />
    <circle cx="15" cy="10" r="5.2" fill="#002776" />
    <path d="M9.8,10 a5.2,5.2 0 0,1 10.4,0" stroke="#fff" strokeWidth="0.9" fill="none" />
  </svg>
);

const LangToggle = () => {
  const { lang, toggle } = useLanguage();
  return (
    <button
      onClick={toggle}
      aria-label={lang === "pt" ? "Switch to English" : "Mudar para Português"}
      title={lang === "pt" ? "English" : "Português"}
      className="flex items-center justify-center w-7 h-7 rounded-full overflow-hidden border border-champagne/40 hover:border-champagne transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne flex-shrink-0"
    >
      {lang === "pt" ? <FlagUK /> : <FlagBR />}
    </button>
  );
};

/* ---------------- Navbar ---------------- */
export const Navbar = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "#exames",       label: t.nav.exames },
    { href: "#corpo-clinico", label: t.nav.corpoClinico },
    { href: "#convenios",    label: t.nav.convenios },
    { href: "/videos",       label: t.nav.videos },
    { href: "#contato",      label: t.nav.contato },
  ];

  const preAgendamentoLabel = "Pré-Agendamento";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{ top: "var(--cta-bar-h, 0px)" }}
      className={`fixed inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/75 backdrop-blur-2xl border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <div className={`container flex items-center justify-between transition-all duration-500 ${scrolled ? "h-14" : "h-16"}`}>
        <Link to="/#top" className="flex items-center gap-3">
          <img
            src={logoClinica}
            alt="Clínica de Ultrassom Dra. Morgana Kummer"
            width={200}
            height={48}
            fetchPriority="high"
            className={`w-auto transition-all duration-500 ${scrolled ? "h-10" : "h-12"}`}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => {
            const isRoute = l.href.startsWith("/");
            const className = "text-[12px] tracking-[0.18em] uppercase text-wine-deep/70 hover:text-wine-deep transition-colors duration-300 relative group font-medium";
            const inner = (
              <>
                {l.label}
                <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-champagne transition-all duration-500 group-hover:w-full" />
              </>
            );
            return isRoute ? (
              <Link key={l.href} to={l.href} className={className}>{inner}</Link>
            ) : (
              <a key={l.href} href={l.href} className={className}>{inner}</a>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle />
          <button className="md:hidden text-wine-deep" onClick={() => setOpen(!open)} aria-label={t.nav.menuAriaLabel}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border animate-fade-in">
          <nav className="container py-6 flex flex-col gap-4">
            {navLinks.map((l) => {
              const isRoute = l.href.startsWith("/");
              const className = "text-wine-deep text-[12px] tracking-[0.2em] uppercase";
              return isRoute ? (
                <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className={className}>{l.label}</Link>
              ) : (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className={className}>{l.label}</a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};


export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-wine-deep py-10 border-t border-champagne/15">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <img src={logoWhite} alt={t.footer.logoAlt} width={200} height={64} className="h-16 w-auto opacity-90" loading="lazy" />
        <div className="text-center md:text-right text-wine-foreground/70 text-xs tracking-wide">
          © {new Date().getFullYear()} {t.footer.copy}<br />
          <span className="text-champagne/80 font-serif italic text-sm">{t.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
};

export const WhatsAppFab = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-deep animate-pulse-soft hover:scale-110 transition-transform duration-300"
  >
    <MessageCircle className="w-6 h-6" strokeWidth={2} />
  </a>
);

const IndexV2 = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title =
      lang === "pt"
        ? "Dra. Morgana Kummer · Clínica de Ultrassom"
        : "Dr. Morgana Kummer · Ultrasound Clinic";
  }, [lang]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroV2 />
      <QuoteV2 />
      <AboutV2 />
      <PremiumExperience />
      <ExamsV2 />
      <TeamV2 />
      <ConveniosV2 />
      <ContactV2 />
      <Footer />
      <WhatsAppFab />
    </main>
  );
};

export default IndexV2;
