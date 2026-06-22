import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Award, HeartHandshake, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroV2 = () => {
  const { t } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

    window.addEventListener("resize", handleResize);
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.matchMedia("(prefers-reduced-motion: reduce)").removeEventListener("change", handleMotionChange);
    };
  }, []);
  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-wine-deep text-wine-foreground pt-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-wine-deep via-wine-deep to-[hsl(311,42%,18%)]" />
        <div className="absolute top-1/3 -left-32 w-[32rem] h-[32rem] rounded-full bg-wine/40 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[36rem] h-[36rem] rounded-full bg-rose-deep/20 blur-[140px]" />
        <div className="absolute top-20 inset-x-0 h-px bg-gradient-champagne opacity-40" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {isDesktop && !prefersReducedMotion && (
          <video
            key="hero-clinic-video-v5"
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-label={t.hero.videoAriaLabel}
          >
            <source src="/videos/hero-clinic.mp4?v=5" type="video/mp4" />
          </video>
        )}
        {(!isDesktop || prefersReducedMotion) && (
          <img
            src="/videos/hero-clinic-poster.jpg"
            alt=""
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-wine-deep/80 via-wine-deep/45 to-wine-deep/10 md:from-wine-deep/85 md:via-wine-deep/40 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-wine-deep/30 via-transparent to-wine-deep/90" />
      </div>

      <div className="relative container min-h-[calc(100vh-6rem)] flex items-center">
        <div className="max-w-2xl py-10 md:py-10 animate-fade-up">
          <div className="inline-flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-champagne" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-champagne font-medium">{t.hero.location}</span>
          </div>

          <p className="font-comfortaa text-wine-foreground/70 text-[13px] md:text-[15px] tracking-[0.5em] uppercase mb-6 font-medium">
            {t.hero.clinicLabel}
          </p>

          <h1 className="font-comfortaa text-wine-foreground text-[clamp(2.6rem,7.5vw,5.5rem)] leading-[1.02] font-bold">
            Dra. Morgana<br />
            <span className="font-light text-champagne">Kummer</span>
          </h1>

          <div className="mt-10 w-12 h-px bg-champagne/70" />

          <p className="mt-8 text-wine-foreground/85 text-lg md:text-xl leading-relaxed max-w-xl font-light">
            {t.hero.description}
          </p>

          <div className="mt-12 flex flex-wrap gap-4 items-center">
            <Link
              to="/agendar"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[11px] tracking-[0.25em] uppercase font-semibold border transition-all duration-500 shadow-soft hover:opacity-90"
              style={{ backgroundColor: '#FDDCB5', color: '#5B2D8E', borderColor: '#5B2D8E' }}
            >
              <ArrowRight className="w-4 h-4" /> Agendar meu exame
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-champagne/15 flex flex-wrap gap-x-10 gap-y-3 text-[11px] text-wine-foreground/65 tracking-wide font-light">
            <span className="flex items-center gap-2"><Award className="w-3.5 h-3.5 text-champagne" strokeWidth={1.5} /> {t.hero.badge1}</span>
            <span className="flex items-center gap-2"><HeartHandshake className="w-3.5 h-3.5 text-champagne" strokeWidth={1.5} /> {t.hero.badge2}</span>
            <span className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-champagne" strokeWidth={1.5} /> {t.hero.badge3}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
