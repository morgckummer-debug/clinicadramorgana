import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logoClinica from "@/assets/logo-clinica.webp";

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

const FlagES = () => (
  <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="30" height="20" fill="#C60B1E" />
    <rect y="6.67" width="30" height="6.67" fill="#FFC400" />
  </svg>
);

const LangToggle = () => {
  const { lang, setLang } = useLanguage();
  const languages: Array<{ code: 'pt' | 'en' | 'es'; flag: React.ReactNode; label: string }> = [
    { code: 'pt', flag: <FlagBR />, label: 'Português' },
    { code: 'en', flag: <FlagUK />, label: 'English' },
    { code: 'es', flag: <FlagES />, label: 'Español' },
  ];
  return (
    <div className="flex items-center gap-2">
      {languages.filter(l => l.code !== lang).map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-label={`Switch to ${l.label}`}
          title={l.label}
          className="flex items-center justify-center w-7 h-7 rounded-full overflow-hidden border border-champagne/40 hover:border-champagne transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne flex-shrink-0 opacity-60 hover:opacity-100"
        >
          {l.flag}
        </button>
      ))}
    </div>
  );
};

export const SiteNavbar = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const navLinks = [
    { href: isHome ? "#exames"        : "/#exames",        label: t.nav.exames },
    { href: isHome ? "#corpo-clinico" : "/#corpo-clinico", label: t.nav.corpoClinico },
    { href: isHome ? "#convenios"     : "/#convenios",     label: t.nav.convenios },
    { href: "/videos",                                      label: t.nav.videos },
    { href: isHome ? "#contato"       : "/#contato",       label: t.nav.contato },
  ];

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
          ? "bg-background/95 md:bg-background/75 md:backdrop-blur-2xl border-b border-border/40"
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
            className={`w-auto transition-all duration-500 ${scrolled ? "h-10" : "h-12"}`}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => {
            const isRoute = l.href.startsWith("/") && !l.href.includes("#");
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
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container py-6 flex flex-col gap-4">
            {navLinks.map((l) => {
              const isRoute = l.href.startsWith("/") && !l.href.includes("#");
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
