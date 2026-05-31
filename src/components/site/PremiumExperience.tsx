import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import premiumBelly from "@/assets/premium-belly.jpg";

const DRA_MORGANA_URL = "https://dramorganakummer.lovable.app";

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
      className="bg-background py-10 md:py-14"
    >
      <div className="container">
        <div
          ref={ref}
          className={`relative overflow-hidden rounded-3xl border border-[#E8D38A]/60 p-6 md:p-8 transition-all duration-700 ease-out max-w-lg mx-auto ${
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
            className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-70 blur-3xl animate-[pulse_6s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(circle, #F5E6B8 0%, transparent 70%)",
            }}
          />

          <div className="relative flex flex-col items-center text-center gap-5">
            <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-2xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(120,80,30,0.35)] ring-1 ring-[#E8D38A]/50 shrink-0">
              <img
                src={premiumBelly}
                alt="Close das mãos da gestante sobre a barriga, em luz natural quente"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-wine-deep">
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-6 bg-wine-deep/40" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-wine-deep/80">
                  Atendimento exclusivo
                </span>
                <span className="h-px w-6 bg-wine-deep/40" />
              </div>

              <h2
                id="premium-experience-title"
                className="mt-2 font-['Comfortaa'] text-xl md:text-[1.7rem] leading-[1.2] text-balance"
              >
                Uma experiência diferenciada com a Dra. Morgana
              </h2>
            </div>

            <a
              href={DRA_MORGANA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reservar horário exclusivo com a Dra. Morgana (abre em nova aba)"
              className="group inline-flex items-center gap-2 rounded-full bg-wine-deep px-5 py-2.5 text-wine-foreground text-sm tracking-wide transition-all duration-300 hover:bg-wine hover:shadow-[0_14px_32px_-10px_hsl(var(--wine-deep)/0.55)] hover:-translate-y-0.5"
            >
              <span>Reservar horário exclusivo</span>
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumExperience;
