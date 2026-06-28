import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DRA_MORGANA_URL = "https://dramorgana.com.br";

export const PremiumExperience = () => {
  const { t } = useLanguage();
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
    <>
      <style>{`
        @keyframes slowpulse {
          0%, 100% { opacity: 0.22; }
          50% { opacity: 0.38; }
        }

        .pe-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          min-height: auto;
          gap: 20px;
          align-items: center;
        }
        .pe-image-slot {
          height: 420px;
        }
        .pe-content {
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .pe-title {
          font-size: 44px;
          line-height: 1.1;
          margin: 0;
        }
        .pe-desc {
          font-size: 14px;
          max-width: 100%;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .pe-grid {
            grid-template-columns: 1fr;
            min-height: unset;
          }
          .pe-image-col {
            height: 360px;
            overflow: hidden;
          }
          .pe-image-slot {
            height: 360px !important;
          }
          .pe-fade-right {
            display: none;
          }
          .pe-fade-bottom {
            height: 100px;
          }
          .pe-content {
            padding: 40px 24px 48px;
            text-align: center;
          }
          .pe-title {
            font-size: 36px;
            line-height: 1.2;
          }
          .pe-desc {
            font-size: 15px;
            max-width: 100%;
            margin: 0 auto;
          }
          .pe-chips {
            gap: 6px;
            justify-content: center;
          }
        }
      `}</style>

      <section
        ref={ref}
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#25152F",
        }}
      >
        {/* Linha dourada topo */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, #D4A843 25%, #C4AED8 55%, transparent)",
            opacity: 0.6,
            zIndex: 2,
          }}
        />

        {/* Orb glow fundo */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "30%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #5C3878 0%, transparent 60%)",
            opacity: 0.5,
            filter: "blur(70px)",
            pointerEvents: "none",
            animation: "slowpulse 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "10%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #8B5C2A 0%, transparent 65%)",
            opacity: 0.25,
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        <div
          className="pe-grid"
          style={{
            position: "relative",
            zIndex: 1,
          }}
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
      </section>
    </>
  );
};

export default PremiumExperience;
