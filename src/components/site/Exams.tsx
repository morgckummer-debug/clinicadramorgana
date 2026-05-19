import { Link } from "react-router-dom";
import {
  categories,
  categoryDescriptions,
  categoryThumbs,
  getExamsByCategory,
  canonicalPathFor,
} from "@/data/exams";

export const Exams = () => {
  return (
    <section id="exames" className="py-12 md:py-16 bg-background relative">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-wine text-[11px] tracking-[0.4em] uppercase">
            Exames Disponíveis
          </span>
          <h2 className="mt-4 text-wine-deep text-4xl md:text-5xl text-balance">
            Cada exame, um{" "}
            <span className="font-serif italic font-light">cuidado próprio</span>.
          </h2>
          <div className="mt-6 w-12 h-px bg-champagne mx-auto" />
          <p className="mt-8 text-muted-foreground font-light text-lg leading-relaxed">
            Procedimentos realizados em equipamento de última geração, com laudo
            detalhado entregue na hora.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat) => {
            const items = getExamsByCategory(cat);
            return (
              <article key={cat} className="premium-card p-8 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-rose flex-shrink-0">
                    <img
                      src={categoryThumbs[cat]}
                      alt={cat}
                      loading="lazy"
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-wine-deep leading-tight">
                      {cat}
                    </h3>
                    <p className="text-xs text-muted-foreground font-light mt-1">
                      {categoryDescriptions[cat]}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {items.map((exam) => (
                    <li key={exam.slug}>
                      <Link
                        to={canonicalPathFor(exam)}
                        className="text-sm text-foreground/75 hover:text-wine flex items-start gap-3 font-light transition-colors"
                      >
                        <span className="mt-2 w-1 h-1 rounded-full bg-champagne flex-shrink-0" />
                        {exam.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
