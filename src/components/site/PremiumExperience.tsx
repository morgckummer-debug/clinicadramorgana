import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, UserRound, Sparkles, HeartHandshake, Clock } from "lucide-react";

const DRA_MORGANA_URL = "https://dramorganakummer.lovable.app";

const diferenciais = [
  { icon: UserRound, label: "Atendimento pessoal e individualizado" },
  { icon: Sparkles, label: "Equipamentos de última geração" },
  { icon: HeartHandshake, label: "Ambiente exclusivo e acolhedor" },
  { icon: Clock, label: "Mais tempo dedicado ao exame" },
];

export const PremiumExperience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="premium-experience-title"
      className="bg-background py-16 md:py-24"
    >
      <div className="container">
        <div
          ref={ref}
          className={`relative overflow-hidden rounded-3xl border border-champagne-soft p-8 md:p-16 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--champagne-soft)) 0%, hsl(var(--champagne)) 55%, hsl(var(--champagne-soft)) 100%)",
            boxShadow: "0 30px 80px -30px hsl(var(--wine-deep) / 0.3)",
          }}
        >
          {/* Brilho suave */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-60 blur-3xl animate-[pulse_6s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--champagne-soft)) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--wine) / 0.15) 0%, transparent 70%)",
            }}
          />

          <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16 items-center">
            {/* Coluna esquerda */}
            <div className="text-wine-deep">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-wine-deep/40" />
                <span className="text-[11px] tracking-[0.4em] uppercase text-wine-deep/80">
                  Atendimento exclusivo
                </span>
              </div>

              <h2
                id="premium-experience-title"
                className="mt-5 font-['Comfortaa'] text-3xl md:text-5xl leading-[1.15] text-balance"
              >
                Uma experiência diferenciada em medicina fetal
              </h2>

              <p className="mt-6 text-base md:text-lg leading-relaxed text-wine-deep/85 max-w-xl">
                Atendimento realizado pessoalmente pela Dra. Morgana, referência
                em ultrassonografia obstétrica e medicina fetal, em um ambiente
                exclusivo pensado para proporcionar mais acolhimento, tecnologia
                e tranquilidade.
              </p>

              <a
                href={DRA_MORGANA_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reservar horário exclusivo com a Dra. Morgana (abre em nova aba)"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-wine-deep px-7 py-4 text-wine-foreground text-sm md:text-base tracking-wide transition-all duration-300 hover:bg-wine hover:shadow-[0_18px_40px_-12px_hsl(var(--wine-deep)/0.55)] hover:-translate-y-0.5"
              >
                <span>Reservar horário exclusivo</span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            {/* Coluna direita — diferenciais */}
            <ul className="space-y-4 md:space-y-5">
              {diferenciais.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-start gap-4 text-wine-deep"
                >
                  <span className="flex-none mt-0.5 grid place-items-center h-10 w-10 rounded-full bg-wine-deep/8 border border-wine-deep/15">
                    <Icon size={18} strokeWidth={1.5} className="text-wine-deep" />
                  </span>
                  <span className="text-sm md:text-base leading-snug pt-2">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumExperience;
