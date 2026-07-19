import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import logoWhite from "@/assets/logo-white.webp";

export const SiteFooter = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-wine-deep py-10 border-t border-champagne/15">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <img src={logoWhite} alt={t.footer.logoAlt} width={64} height={64} decoding="async" className="h-16 w-auto opacity-90" />
        <div className="text-center md:text-right text-wine-foreground/70 text-xs tracking-wide">
          © {new Date().getFullYear()} {t.footer.copy}<br />
          <span className="text-champagne/80 font-serif italic text-sm">{t.footer.tagline}</span>
          <br />
          <Link to="/politica-de-privacidade" className="text-champagne/70 hover:text-champagne underline underline-offset-2 text-[11px]">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
};
