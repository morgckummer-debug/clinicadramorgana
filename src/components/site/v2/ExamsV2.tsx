import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { canonicalPathFor, categories, categoryThumbs, getExamsByCategory } from "@/data/exams";

export const ExamsV2 = () => {
  const { t } = useLanguage();
  return (
    <section id="exames" className="py-12 md:py-16 bg-gradient-rose relative">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
          <div className="max-w-xl">
            <span className="text-wine text-[11px] tracking-[0.4em] uppercase">{t.exams.label}</span>
            <h2 className="mt-4 text-wine-deep text-4xl md:text-5xl text-balance">
              {t.exams.titleBefore}<span className="font-serif italic font-light">{t.exams.titleItalic}</span>{t.exams.titleAfter}
            </h2>
            <div className="mt-6 w-12 h-px bg-champagne" />
          </div>
          <p className="text-muted-foreground font-light max-w-sm leading-relaxed">
            {t.exams.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat) => {
            const items = getExamsByCategory(cat).filter(
              (ex) => ex.slug !== "colo-uterino" && ex.slug !== "cerclagem",
            );
            const displayName = t.exams.categoryNames[cat] ?? cat;
            const displayDesc = t.exams.categoryDescriptions[cat] ?? "";
            return (
              <article
                key={cat}
                className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative aspect-square w-1/2 mx-auto mt-6 overflow-hidden rounded-xl bg-rose">
                  <img
                    src={categoryThumbs[cat]}
                    alt={displayName}
                    width={768}
                    height={768}
                    loading="lazy"
                    className={`w-full h-full object-cover ${cat === "Vascular" ? "object-bottom" : "object-center"} transition-transform duration-[1.4s] group-hover:scale-105`}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-wine-deep text-center">{displayName}</h3>
                  <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed text-center">
                    {displayDesc}
                  </p>
                  <ul className="mt-4 space-y-2.5 text-center">
                    {items.map((ex) => {
                      const hasOwnPage = !!ex.hero;
                      return (
                        <li key={ex.slug} className="flex justify-center">
                          <Link
                            to={canonicalPathFor(ex)}
                            className="text-[15px] leading-relaxed text-foreground/80 hover:text-wine-deep inline-flex items-center justify-center gap-2.5 font-light transition-colors group/item"
                          >
                            <span className="w-1 h-1 rounded-full bg-champagne flex-shrink-0" />
                            <span
                              className={
                                hasOwnPage
                                  ? "underline underline-offset-4 decoration-champagne/70"
                                  : "group-hover/item:underline underline-offset-4 decoration-champagne"
                              }
                            >
                              {t.exams.examTitles[ex.title] ?? ex.title}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
