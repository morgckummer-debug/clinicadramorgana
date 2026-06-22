import { useLanguage } from "@/contexts/LanguageContext";
import draHeroV2 from "@/assets/dra-morgana-hero-v2.webp";

export const QuoteV2 = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-wine-deep text-wine-foreground py-10 md:py-14 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-champagne opacity-50" />
      <div className="container grid md:grid-cols-12 gap-10 md:gap-10 items-center relative">
        <div className="md:col-span-5 flex justify-center md:justify-start">
          <div className="relative max-w-sm w-full">
            <div className="absolute -inset-3 border border-champagne/40 rounded-sm -translate-x-3 -translate-y-3" />
            <img
              src={draHeroV2}
              alt="Dra. Morgana Kummer"
              width={400}
              height={500}
              loading="lazy"
              className="relative rounded-sm shadow-elegant w-full object-cover aspect-[4/5]"
            />
          </div>
        </div>
        <div className="md:col-span-7">
          <span className="text-champagne/80 text-[10px] tracking-[0.5em] uppercase">{t.quote.label}</span>
          <p className="mt-6 font-serif italic text-2xl md:text-[2.4rem] leading-[1.3] text-balance font-light">
            {t.quote.textBefore}
            <span className="text-champagne not-italic font-normal">{t.quote.highlight}</span>
            {t.quote.textAfter}
          </p>
          <div className="mt-10 inline-flex items-center gap-4">
            <div className="w-8 h-px bg-champagne/60" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-champagne/90 font-medium">Dra. Morgana Kummer</span>
          </div>
        </div>
      </div>
    </section>
  );
};
