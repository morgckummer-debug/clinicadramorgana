import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "#exames", label: "Exames" },
  { href: "#sobre", label: "Sobre" },
  { href: "#convenios", label: "Convênios" },
  { href: "#contato", label: "Contato" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{ top: "var(--cta-bar-h, 0px)" }}
      className={`fixed inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-wine-deep/85 backdrop-blur-xl shadow-elegant"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        <a href="#top" className="font-comfortaa flex flex-col leading-none text-wine-foreground">
          <span className="text-[10px] tracking-[0.35em] uppercase text-champagne">
            Clínica de Ultrassom
          </span>
          <span className="mt-1.5 text-xl md:text-2xl font-bold tracking-tight">Dra. Morgana Kummer</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide text-wine-foreground/85 hover:text-champagne transition-colors duration-300 relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-champagne transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contato"
            className="text-xs tracking-[0.25em] uppercase border border-champagne/60 text-champagne px-5 py-2.5 rounded-full hover:bg-champagne hover:text-wine-deep transition-all duration-500"
          >
            Agendar
          </a>
        </nav>

        <button
          className="md:hidden text-wine-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-wine-deep/95 backdrop-blur-xl border-t border-champagne/20 animate-fade-in">
          <nav className="container py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-wine-foreground/90 hover:text-champagne text-sm tracking-wide"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
