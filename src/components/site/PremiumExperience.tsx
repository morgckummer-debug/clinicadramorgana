import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, UserRound, Sparkles, HeartHandshake, Clock } from "lucide-react";
import premiumPregnant from "@/assets/premium-pregnant.jpg";

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
          className={`relative overflow-hidden rounded-3xl border border-[#E8D38A]/60 p-8 md:p-14 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            background:
              "linear-gradient(135deg, #FFFDF7 0%, #FBF3DC 45%, #F5E6B8 100%)",
            boxShadow: "0 30px 80px -30px hsl(var(--wine-deep) / 0.25)",
          }}
        >
          {/* Brilho dourado suave */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-70 blur-3xl animate-[pulse_6s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(circle, #F5E6B8 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #FFF6D6 0%, transparent 70%)",
            }}
          />

          <div className="relative grid gap-10 md:grid-cols-2 md:gap-14 items-center">
            {/* Coluna esquerda — conteúdo */}
            <div className="text-wine-deep order-2 md:order-1">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-wine-deep/40" />
                <span className="text-[11px] tracking-[0.4em] uppercase text-wine-deep/80">
                  Atendimento exclusivo
                </span>
              </div>

              <h2
                id="premium-experience-title"
                className="mt-5 font-['Comfortaa'] text-3xl md:text-[2.6rem] leading-[1.15] text-balance"
              >
                Uma experiência diferenciada com a Dra. Morgana
              </h2>

              <p className="mt-5 text-base md:text-lg leading-relaxed text-wine-deep/85 max-w-xl">
                Atendimento realizado pessoalmente pela Dra. Morgana, em um
                ambiente exclusivo pensado para proporcionar mais acolhimento,
                tecnologia e tranquilidade.
              </p>

              <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {diferenciais.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-start gap-3 text-wine-deep"
                  >
                    <span className="flex-none mt-0.5 grid place-items-center h-8 w-8 rounded-full bg-[#F5E6B8]/70 border border-[#E8D38A]">
                      <Icon size={15} strokeWidth={1.6} className="text-wine-deep" />
                    </span>
                    <span className="text-sm leading-snug pt-1">{label}</span>
                  </li>
                ))}
              </ul>

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

            {/* Coluna direita — imagem */}
            <div className="relative order-1 md:order-2">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[2rem] blur-2xl opacity-60"
                style={{
                  background:
                    "radial-gradient(circle at center, #F5E6B8 0%, transparent 70%)",
                }}
              />
              <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_-20px_rgba(120,80,30,0.35)] ring-1 ring-[#E8D38A]/50">
                <img
                  src={premiumPregnant}
                  alt="Gestante feliz com as mãos sobre a barriga, em ambiente acolhedor"
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-[3/4]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumExperience;
