import { useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ArrowRight, ArrowLeft, MessageCircle, ClipboardList, Clock, Briefcase, Stethoscope } from "lucide-react";
import { Footer, Navbar, WhatsAppFab } from "./IndexV2";
import {
  canonicalPathFor,
  getExamByPath,
  getExamsByCategory,
} from "@/data/exams";

const WHATSAPP_URL = "https://wa.me/5531993910212";
const SITE_ORIGIN = "https://clinicadramorgana.com.br";

const ExamDetail = () => {
  const { pathname } = useLocation();
  const exam = getExamByPath(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!exam) return;

    document.title = `${exam.title} · Dra. Morgana Kummer`;

    const description = `${exam.title} — ${exam.shortDesc}`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    // <link rel="canonical"> — preserva a URL histórica como canônica
    const canonicalHref = `${SITE_ORIGIN}${canonicalPathFor(exam)}`;
    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;
  }, [exam]);

  if (!exam) return <Navigate to="/404" replace />;

  const related = getExamsByCategory(exam.category)
    .filter((e) => e.slug !== exam.slug)
    .slice(0, 3);

  const whatsappMsg = encodeURIComponent(
    `Olá! Gostaria de agendar o exame: ${exam.title}.`,
  );
  const whatsappLink = `${WHATSAPP_URL}?text=${whatsappMsg}`;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ---------------- Hero do exame ---------------- */}
      <section className="relative bg-wine-deep text-wine-foreground pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-wine-deep via-wine-deep to-[hsl(311,42%,18%)]" />
          <div className="absolute top-1/3 -left-32 w-[28rem] h-[28rem] rounded-full bg-wine/30 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full bg-rose-deep/15 blur-[140px]" />
          <div className="absolute top-20 inset-x-0 h-px bg-gradient-champagne opacity-40" />
        </div>

        <div className="relative container max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-champagne/80 mb-10">
            <Link to="/" className="hover:text-champagne transition-colors">
              Início
            </Link>
            <span>/</span>
            <Link to="/#exames" className="hover:text-champagne transition-colors">
              Exames
            </Link>
            <span>/</span>
            <span className="text-wine-foreground/60">{exam.category}</span>
          </nav>

          <span className="text-[11px] tracking-[0.45em] uppercase text-champagne font-medium">
            {exam.category}
          </span>
          <h1 className="mt-6 font-serif font-light text-wine-foreground text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.05] text-balance">
            {exam.title}
          </h1>
          <div className="mt-8 w-12 h-px bg-champagne/70" />
          <p className="mt-8 text-wine-foreground/85 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
            {exam.longDesc}
          </p>

          <div className="mt-12 flex flex-wrap gap-4 items-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-champagne text-wine-deep px-8 py-4 rounded-full text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-wine-foreground transition-all duration-500"
            >
              <MessageCircle className="w-4 h-4" /> Agendar este exame
            </a>
            <Link
              to="/#exames"
              className="inline-flex items-center gap-3 text-wine-foreground/90 px-2 py-4 text-[11px] tracking-[0.25em] uppercase font-medium hover:text-champagne hover:gap-4 transition-all duration-500"
            >
              <ArrowLeft className="w-4 h-4" /> Ver todos os exames
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Indicações ---------------- */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container max-w-4xl grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span className="text-wine-deep text-[10px] tracking-[0.45em] uppercase font-medium">
              Indicações
            </span>
            <h2 className="mt-6 text-wine-deep text-3xl md:text-4xl font-light">
              Quando este exame é <span className="italic">indicado</span>.
            </h2>
            <div className="mt-6 w-12 h-px bg-champagne" />
          </div>
          <ul className="md:col-span-8 space-y-5">
            {exam.indications.map((it) => (
              <li
                key={it}
                className="flex items-start gap-4 text-foreground/85 font-light text-base md:text-lg leading-relaxed border-b border-border/50 pb-5 last:border-0"
              >
                <Stethoscope
                  className="w-4 h-4 text-champagne mt-1.5 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Preparo · Duração · O que levar ---------------- */}
      <section className="py-24 md:py-32 bg-gradient-rose">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-wine text-[11px] tracking-[0.4em] uppercase">
              Antes do exame
            </span>
            <h2 className="mt-4 text-wine-deep text-3xl md:text-4xl font-light text-balance">
              Tudo o que você precisa <span className="italic">saber</span>.
            </h2>
            <div className="mt-6 w-12 h-px bg-champagne mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: ClipboardList,
                label: "Preparo",
                value: exam.preparation,
              },
              {
                icon: Clock,
                label: "Duração",
                value: exam.duration,
              },
              {
                icon: Briefcase,
                label: "O que levar",
                value: exam.whatToBring.join(" · "),
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-card rounded-2xl p-8 border border-border shadow-soft hover:shadow-elegant transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-full border border-champagne/50 flex items-center justify-center mb-6">
                  <Icon className="w-4 h-4 text-wine" strokeWidth={1.5} />
                </div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-wine mb-3">
                  {label}
                </div>
                <p className="text-foreground/80 font-light leading-relaxed">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Outros exames da categoria ---------------- */}
      {related.length > 0 && (
        <section className="py-24 md:py-32 bg-background">
          <div className="container max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <span className="text-wine-deep text-[10px] tracking-[0.45em] uppercase font-medium">
                  Categoria · {exam.category}
                </span>
                <h2 className="mt-4 text-wine-deep text-3xl md:text-4xl font-light">
                  Outros exames <span className="italic">relacionados</span>.
                </h2>
              </div>
              <Link
                to="/#exames"
                className="text-[11px] tracking-[0.25em] uppercase text-wine-deep hover:text-wine inline-flex items-center gap-2 font-medium"
              >
                Ver todos <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/exames/${r.slug}`}
                  className="group bg-card rounded-2xl border border-border shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 p-6 flex flex-col"
                >
                  <div className="text-[10px] tracking-[0.3em] uppercase text-wine mb-3">
                    {r.category}
                  </div>
                  <h3 className="text-lg text-wine-deep font-bold">{r.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground font-light leading-relaxed flex-1">
                    {r.shortDesc}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-wine font-medium group-hover:gap-3 transition-all">
                    Saiba mais <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- CTA voltar ---------------- */}
      <section className="bg-wine-deep text-wine-foreground py-20 border-t border-champagne/15">
        <div className="container max-w-3xl text-center">
          <span className="text-champagne text-[10px] tracking-[0.45em] uppercase">
            Continue navegando
          </span>
          <h2 className="mt-4 font-serif italic text-3xl md:text-4xl font-light text-balance">
            Conheça a clínica e toda a nossa equipe.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-champagne text-wine-deep px-8 py-4 rounded-full text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-wine-foreground transition-all duration-500"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar à página inicial
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-wine-foreground/90 px-2 py-4 text-[11px] tracking-[0.25em] uppercase font-medium hover:text-champagne hover:gap-4 transition-all duration-500"
            >
              <MessageCircle className="w-4 h-4" /> Agendar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
    </main>
  );
};

export default ExamDetail;
