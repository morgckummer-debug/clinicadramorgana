import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import pregnantImg from "@/assets/pregnant-happy.webp";

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

          {/* Imagem */}
          <div className="relative hidden md:block">
            <div className="absolute -inset-6 rounded-3xl opacity-30 blur-2xl bg-gradient-to-br from-wine-deep to-champagne" />
            <img
              src={pregnantImg}
              alt="Gestante feliz no ultrassom"
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover aspect-[3/4]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumExperience;
