import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Heart, Sparkles, Clock, Star } from "lucide-react";
import draCutout from "@/assets/dra-morgana-cutout.png";

const DRA_MORGANA_URL = "https://dramorganakummer.lovable.app";

const features = [
  { Icon: Heart, label: "Acolhimento\nque conforta" },
  { Icon: Sparkles, label: "Tecnologia de\nalta precisão" },
  { Icon: Clock, label: "Tempo de qualidade\ncom você e seu bebê" },
  { Icon: Star, label: "Cuidado em\ncada detalhe" },
];

const LotusIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
    <path d="M14 22c0 0-7-4.5-7-10 0-3 2-5 5-5 1 0 1.5.3 2 .7.5-.4 1-.7 2-.7 3 0 5 2 5 5 0 5.5-7 10-7 10z" stroke="#C9A84C" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
    <path d="M14 22c0 0-4-3-4-7 0-2 1.5-3.5 4-3.5s4 1.5 4 3.5c0 4-4 7-4 7z" stroke="#C9A84C" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
    <path d="M14 11.5V22" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round"/>
    <path d="M10 8c-1.5-2-4-2.5-5.5-1 0 0 1.5 3 5.5 4.5" stroke="#C9A84C" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
    <path d="M18 8c1.5-2 4-2.5 5.5-1 0 0-1.5 3-5.5 4.5" stroke="#C9A84C" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
  </svg>
);

export const PremiumExperience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="premium-experience-title"
      className={`relative overflow-hidden transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{
        background: "linear-gradient(160deg, #F9F3FF 0%, #EFE6FA 30%, #F5EDD8 65%, #EDE0C4 100%)",
        minHeight: "520px",
      }}
    >
      {/* Halo decorativo superior */}
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(ellipse, #E8D38A 0%, transparent 70%)" }} />

      {/* Linha champagne topo */}
      <div aria-hidden className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #C9A84C55, #C9A84C, #C9A84C55, transparent)" }} />

      <div className="container relative flex items-center min-h-[520px] py-14 md:py-16">
        {/* Conteúdo central */}
        <div className="flex-1 flex flex-col items-center text-center max-w-2xl mx-auto relative z-10">
          {/* Ícone lotus */}
          <LotusIcon />

          {/* Label */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
            <span className="text-[10px] tracking-[0.45em] uppercase font-medium" style={{ color: "#8B6914" }}>
              Atendimento exclusivo
            </span>
            <span className="h-px w-10" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
          </div>

          {/* Título */}
          <h2
            id="premium-experience-title"
            className="mt-6 leading-[1.2] text-balance"
            style={{ color: "#4A2060", fontSize: "clamp(1.9rem, 5vw, 3rem)" }}
          >
            <span className="font-light" style={{ fontFamily: "'Comfortaa', sans-serif" }}>Uma experiência</span>
            <br />
            <em className="font-serif not-italic" style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "#8B6914", fontSize: "1.1em" }}>
              diferenciada
            </em>
            <br />
            <span className="font-light" style={{ fontFamily: "'Comfortaa', sans-serif" }}>com a Dra. Morgana</span>
            {" "}
            <span style={{ color: "#A05070", fontSize: "0.75em" }}>♡</span>
          </h2>

          {/* Divisor lotus pequeno */}
          <div className="mt-7 flex items-center justify-center gap-2">
            <span className="h-px w-8" style={{ background: "#C9A84C55" }} />
            <LotusIcon />
            <span className="h-px w-8" style={{ background: "#C9A84C55" }} />
          </div>

          {/* Features */}
          <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 w-full max-w-lg mx-auto">
            {features.map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-full flex items-center justify-center border" style={{ borderColor: "#C9A84C55", background: "#FFFDF7" }}>
                  <Icon size={16} style={{ color: "#C9A84C" }} strokeWidth={1.5} />
                </div>
                <p className="text-[10.5px] leading-[1.5] whitespace-pre-line" style={{ color: "#6B4A80" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={DRA_MORGANA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Reservar horário exclusivo com a Dra. Morgana (abre em nova aba)"
            className="group mt-10 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[13px] tracking-[0.2em] uppercase font-semibold transition-all duration-400 hover:-translate-y-0.5"
            style={{
              background: "#4A2060",
              color: "#F5EDD8",
              boxShadow: "0 12px 32px -8px rgba(74,32,96,0.45)",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#5A2A75")}
            onMouseLeave={e => (e.currentTarget.style.background = "#4A2060")}
          >
            Reservar horário exclusivo
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Foto lateral — visível em telas médias+ */}
        <div className="hidden md:block absolute right-0 bottom-0 h-full w-[38%] pointer-events-none select-none" aria-hidden>
          {/* Halo suave atrás da foto */}
          <div className="absolute inset-0 opacity-40 blur-2xl" style={{ background: "radial-gradient(ellipse at 60% 80%, #C9A84C40, transparent 70%)" }} />
          <img
            src={draCutout}
            alt=""
            loading="lazy"
            className="absolute bottom-0 right-0 h-full w-auto object-contain object-bottom"
            style={{ filter: "drop-shadow(-20px 0 40px rgba(74,32,96,0.12))" }}
          />
        </div>
      </div>

      {/* Linha champagne base */}
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #C9A84C55, #C9A84C, #C9A84C55, transparent)" }} />
    </section>
  );
};

export default PremiumExperience;
