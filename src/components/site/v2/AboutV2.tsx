import { useLanguage } from "@/contexts/LanguageContext";
import draSobre from "@/assets/dra-morgana-sobre.webp";

export const AboutV2 = () => {
  const { t } = useLanguage();
  return (
    <section id="sobre" className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="container grid md:grid-cols-12 gap-8 md:gap-8 items-center">
        <div className="relative max-w-md mx-auto md:mx-0 order-2 md:order-1 md:col-span-5">
          <div className="absolute -inset-3 border border-champagne/40 rounded-sm -translate-x-3 -translate-y-3" />
          <div className="absolute inset-0 overflow-hidden rounded-sm">
            <div className="absolute inset-0 bg-gradient-rose opacity-70" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 45%, hsl(var(--champagne) / 0.35) 0%, hsl(var(--champagne) / 0.15) 35%, transparent 70%)",
                filter: "blur(24px)",
              }}
            />
          </div>
          <img
            src={draSobre}
            alt="Dra. Morgana Kummer"
            width={520}
            height={650}
            loading="lazy"
            className="relative w-full object-contain [filter:drop-shadow(0_25px_30px_hsl(var(--wine-deep)/0.18))]"
          />
          <div className="absolute -bottom-8 -right-4 md:-right-10 bg-background border border-border/70 px-6 py-5 max-w-[210px] z-10">
            <div className="font-serif italic text-3xl text-wine-deep leading-none">{t.about.statsNumber}</div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-2">
              {t.about.statsLabel}
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 md:col-span-7 md:pl-8">
          <span className="text-wine-deep text-[10px] tracking-[0.45em] uppercase font-medium">{t.about.label}</span>
          <h2 className="mt-6 text-wine-deep text-5xl md:text-6xl text-balance font-light">
            {t.about.titleBefore}<span className="italic">{t.about.titleItalic}</span>{t.about.titleAfter}
          </h2>
          <div className="mt-8 w-12 h-px bg-champagne" />
          <p className="mt-10 text-foreground/85 leading-[1.8] text-lg font-light max-w-xl">
            {t.about.p1}
          </p>
          <p className="mt-6 text-foreground/70 leading-[1.8] text-base font-light max-w-xl">
            {t.about.p2before}
            <span className="text-wine-deep">{t.about.p2year}</span>
            {t.about.p2mid}
            <span className="text-wine-deep">{t.about.p2highlight}</span>
            {t.about.p2after}
          </p>
        </div>
      </div>
    </section>
  );
};
