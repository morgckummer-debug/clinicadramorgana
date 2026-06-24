import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DRA_MORGANA_URL = "https://dramorganakummer.lovable.app";

export const PremiumExperience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

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
      className="relative overflow-hidden py-20 md:py-32"
      style={{
        background:
          "linear-gradient(135deg, #FFFDF7 0%, #FBF3DC 40%, #F5E6B8 70%, #EDD690 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, #E8D38A 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #D4A843 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl animate-[pulse_8s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, #6d3263 0%, transparent 60%)" }}
      />
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #D4A843 30%, #D4A843 70%, transparent)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #D4A843 30%, #D4A843 70%, transparent)" }}
      />

      <div className="container relative">
        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Texto */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3 md:justify-start justify-center">
              <span className="h-px w-8 bg-wine-deep/40" />
              <span className="text-[9px] tracking-[0.5em] uppercase text-wine-deep/60 font-light">
                {t.premium.label}
              </span>
              <span className="h-px w-8 bg-wine-deep/40" />
            </div>

            <h2
              id="premium-experience-title"
              className="text-4xl md:text-5xl lg:text-6xl leading-tight text-wine-deep text-balance"
              style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400, letterSpacing: "-0.02em" }}
            >
              {t.premium.titleBefore}{" "}
              <span className="italic font-light">{t.premium.titleName}</span>
            </h2>

            <div className="w-16 h-1 bg-gradient-to-r from-wine-deep via-champagne to-transparent rounded-full" />

            <p className="text-wine-deep/75 text-lg md:text-xl leading-relaxed max-w-md font-light">
              {t.premium.description}
            </p>

            <div className="pt-4">
              <a
                href={t.premium.button === "Conheça o atendimento exclusivo" ? "#contato" : "#contact"}
                className="inline-block px-8 py-3 bg-wine-deep text-champagne rounded-full font-light tracking-wide hover:bg-wine-deep/90 transition-colors"
                aria-label={t.premium.buttonAriaLabel}
              >
                {t.premium.button}
              </a>
            </div>
          </div>

          <h2
            id="premium-experience-title"
            className="font-['Comfortaa'] text-2xl md:text-4xl leading-[1.25] text-wine-deep max-w-xl text-balance"
          >
            {t.premium.titleBefore}{" "}
            <span className="italic font-['Cormorant_Garamond']">{t.premium.titleName}</span>
          </h2>

          <p className="text-wine-deep/70 text-sm md:text-base max-w-md leading-relaxed">
            {t.premium.description}
          </p>

          <a
            href={DRA_MORGANA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.premium.buttonAriaLabel}
            className="group mt-2 inline-flex items-center gap-2 rounded-full bg-wine-deep px-6 py-3 text-wine-foreground text-sm tracking-wide transition-all duration-300 hover:bg-wine hover:shadow-[0_14px_32px_-10px_hsl(var(--wine-deep)/0.55)] hover:-translate-y-0.5"
          >
            <span>{t.premium.button}</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PremiumExperience;
