import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-wine-deep text-wine-foreground/70 border-t border-champagne/15 py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-wide">
        <div>© {new Date().getFullYear()} Clínica Dra. Morgana Kummer · Sete Lagoas / MG</div>
        <div className="flex items-center gap-3">
          <span className="text-champagne/80">Para momentos importantes, cuidados únicos.</span>
          <Link to="/politica-de-privacidade" className="text-champagne/70 hover:text-champagne underline underline-offset-2 text-[11px]">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
};
