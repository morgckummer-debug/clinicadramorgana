import { useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Stethoscope,
  Sparkles,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslatedExam, translateExam } from "@/hooks/useTranslatedExam";
import { SiteNavbar as Navbar } from "@/components/site/SiteNavbar";
import { SiteFooter as Footer } from "@/components/site/SiteFooter";
import { SiteWhatsAppFab as WhatsAppFab } from "@/components/site/SiteWhatsAppFab";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  canonicalPathFor,
  getExamByPath,
  getExamsByCategory,
  type Exam,
  type ExamSection,
} from "@/data/exams";

const WHATSAPP_URL = "https://wa.me/5531993910212";
const SITE_ORIGIN = "https://dramorgana.com.br";

/**
 * Constrói as seções a renderizar.
 * - Se o exame já foi migrado (`sections` definido), usa direto.
 * - Caso contrário, deriva seções a partir dos campos legados
 *   (indications/preparation/duration/whatToBring) para que a página
 *   continue funcionando enquanto não for adaptada manualmente.
 */
function resolveSections(exam: Exam, t: any): ExamSection[] {
  if (exam.sections && exam.sections.length > 0) return exam.sections;

  const out: ExamSection[] = [];
  if (exam.indications?.length) {
    out.push({
      kind: "list",
      title: t.examDetail.indications,
      items: exam.indications,
    });
  }
  if (exam.preparation) {
    out.push({
      kind: "highlight",
      title: t.examDetail.preparation,
      body: exam.preparation,
    });
  }
  if (exam.duration) {
    out.push({
      kind: "highlight",
      title: t.examDetail.duration,
      body: exam.duration,
    });
  }
  if (exam.whatToBring?.length) {
    out.push({
      kind: "list",
      title: t.examDetail.whatToBring,
      items: exam.whatToBring,
    });
  }
  return out;
}

function resolveIntro(exam: Exam): { tagline: string; intro: string; image?: string; imageBg?: boolean } {
  if (exam.hero) return exam.hero;
  return {
    tagline: exam.shortDesc,
    intro: exam.longDesc ?? exam.shortDesc,
  };
}

const ExamDetail = () => {
  const { pathname } = useLocation();
  const { t, lang } = useLanguage();
  const baseExam = getExamByPath(pathname);
  const exam = useTranslatedExam(baseExam || ({} as Exam));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!baseExam) return;

    document.title = baseExam.seoTitle ?? `${exam.title} · Dra. Morgana Kummer`;

    const heroIntro = exam.hero?.intro ?? exam.longDesc ?? exam.shortDesc;
    const description = baseExam.seoDescription ?? `${exam.title} — ${heroIntro}`.slice(0, 160);
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

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
  }, [baseExam?.slug, lang]);

  if (!baseExam) return <Navigate to="/" replace />;

  const hero = resolveIntro(exam);
  const sections = resolveSections(exam, t);
  const sameCategory = getExamsByCategory(baseExam.category).filter(
    (e) => e.slug !== baseExam.slug,
  );
  // Rotação determinística para variar os "exames relacionados" entre páginas
  // da mesma categoria (ex.: vários obstétricos não mostram sempre os mesmos 3).
  const rotationOffset = baseExam.slug
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const related = sameCategory.length
    ? Array.from({ length: Math.min(3, sameCategory.length) }, (_, i) =>
        translateExam(sameCategory[(rotationOffset + i) % sameCategory.length], lang),
      )
    : [];

  const whatsappMsg = encodeURIComponent(
    `Olá! Gostaria de agendar o exame: ${exam.title}.`,
  );
  const whatsappLink = `${WHATSAPP_URL}&text=${whatsappMsg}`;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ---------------- Hero ---------------- */}
      <section className="relative bg-wine-deep text-wine-foreground pt-24 pb-14 md:pt-28 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-wine-deep via-wine-deep to-[hsl(311,42%,18%)]" />
          <div className="absolute top-1/3 -left-32 w-[28rem] h-[28rem] rounded-full bg-wine/30 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full bg-rose-deep/15 blur-[140px]" />
          <div className="absolute top-20 inset-x-0 h-px bg-gradient-champagne opacity-40" />
        </div>

        {hero.image && hero.imageBg && (
          <div
            className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 55%)' }}
          >
            <img
              src={hero.image}
              alt=""
              aria-hidden
              loading="eager"
              className="h-full w-full object-cover object-center opacity-20"
            />
          </div>
        )}

        <div className="relative container max-w-6xl">
          <nav className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-champagne/80 mb-10">
            <Link to="/" className="hover:text-champagne transition-colors">
              {t.examDetail.breadcrumbHome}
            </Link>
            <span>/</span>
            <Link to="/#exames" className="hover:text-champagne transition-colors">
              {t.examDetail.breadcrumbExams}
            </Link>
            <span>/</span>
            <span className="text-wine-foreground/60">{exam.category}</span>
          </nav>

          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className={hero.image && !hero.imageBg ? "md:col-span-8" : "md:col-span-12 max-w-3xl"}>
              <span className="text-[11px] tracking-[0.45em] uppercase text-champagne font-medium">
                {exam.category}
              </span>
              <h1 className="mt-6 font-light text-wine-foreground text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.05] text-balance">
                {exam.title}
              </h1>
              {hero.tagline && (
                <p className="mt-4 font-serif italic text-champagne/90 text-xl md:text-2xl">
                  {hero.tagline}
                </p>
              )}
              <div className="mt-8 w-12 h-px bg-champagne/70" />
              <p className="mt-8 text-wine-foreground/85 text-base md:text-lg leading-relaxed font-light">
                {hero.intro}
              </p>

              <div className="mt-10 flex flex-wrap gap-4 items-center">
                <Link
                  to={`/pre-agendamento?exame=${baseExam.slug}`}
                  className="inline-flex items-center gap-2 bg-champagne text-wine-deep px-8 py-4 rounded-full text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-wine-foreground transition-all duration-500"
                >
                  <MessageCircle className="w-4 h-4" /> {t.examDetail.scheduleThisExam}
                </Link>
                <Link
                  to="/#exames"
                  className="inline-flex items-center gap-3 text-wine-foreground/90 px-2 py-4 text-[11px] tracking-[0.25em] uppercase font-medium hover:text-champagne hover:gap-4 transition-all duration-500"
                >
                  <ArrowLeft className="w-4 h-4" /> {t.examDetail.viewAllExams}
                </Link>
              </div>
            </div>

            {hero.image && !hero.imageBg && (
              <div className="md:col-span-4">
                <div className="relative max-w-xs mx-auto">
                  <div className="absolute -inset-2 rounded-[2rem] bg-champagne/10 blur-xl" />
                  <img
                    src={hero.image}
                    alt={exam.title}
                    loading="eager"
                    className="relative w-full rounded-[2rem] shadow-deep object-cover aspect-[4/3]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- Seções narrativas ---------------- */}
      {sections.length > 0 && (
        <section className="py-10 md:py-14 bg-background">
          <div className="container max-w-4xl space-y-10 md:space-y-14">
            {sections.map((section, idx) => (
              <SectionBlock key={`${section.kind}-${idx}`} section={section} />
            ))}
          </div>
        </section>
      )}

      {/* ---------------- Galeria "O que pode ser visto?" ---------------- */}
      {exam.gallery && exam.gallery.length > 0 && (
        <section className="py-12 md:py-14 bg-gradient-rose">
          <div className="container max-w-6xl">
            <div className="text-center mb-10">
              <span className="text-wine text-[11px] tracking-[0.4em] uppercase">
                {t.examDetail.gallery}
              </span>
              <h2 className="mt-4 text-wine-deep text-3xl md:text-4xl font-light text-balance">
                {t.examDetail.galleryTitle} <span className="italic">{t.examDetail.gallerySeen}</span>.
              </h2>
              <div className="mt-6 w-12 h-px bg-champagne mx-auto" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {exam.gallery.map((item, idx) => (
                <figure
                  key={idx}
                  className="bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-elegant transition-all duration-500 flex flex-col"
                >
                  <div className="aspect-square overflow-hidden bg-rose/40">
                    {item.video ? (
                      <video
                        src={item.video}
                        poster={item.image}
                        controls
                        playsInline
                        muted
                        loop
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.alt ?? item.caption}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <figcaption className="p-6 text-sm text-foreground/75 font-light leading-relaxed">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- FAQ ---------------- */}
      {exam.faq && exam.faq.length > 0 && (
        <section className="py-12 md:py-14 bg-background">
          <div className="container max-w-3xl">
            <div className="text-center mb-8">
              <span className="text-wine-deep text-[10px] tracking-[0.45em] uppercase font-medium">
                {t.examDetail.faqLabel}
              </span>
              <h2 className="mt-4 text-wine-deep text-3xl md:text-4xl font-light text-balance">
                {t.examDetail.faqTitle} <span className="italic">{t.examDetail.faqDubts}</span>.
              </h2>
              <div className="mt-6 w-12 h-px bg-champagne mx-auto" />
            </div>
            <Accordion type="single" collapsible className="w-full">
              {exam.faq.map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger className="text-left text-wine-deep font-medium">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 font-light leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* ---------------- Outros exames da categoria ---------------- */}
      {related.length > 0 && (
        <section className="py-12 md:py-14 bg-background border-t border-border/50">
          <div className="container max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <div>
                <span className="text-wine-deep text-[10px] tracking-[0.45em] uppercase font-medium">
                  {t.examDetail.relatedLabel} · {t.exams?.categoryNames?.[exam.category] ?? exam.category}
                </span>
                <h2 className="mt-4 text-wine-deep text-3xl md:text-4xl font-light">
                  {t.examDetail.relatedTitle} <span className="italic">{t.examDetail.relatedText}</span>.
                </h2>
              </div>
              <Link
                to="/#exames"
                className="text-[11px] tracking-[0.25em] uppercase text-wine-deep hover:text-wine inline-flex items-center gap-2 font-medium"
              >
                {t.examDetail.viewAll} <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={canonicalPathFor(r)}
                  className="group bg-card rounded-2xl border border-border shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 p-6 flex flex-col"
                >
                  <div className="text-[10px] tracking-[0.3em] uppercase text-wine mb-3">
                    {t.exams?.categoryNames?.[r.category] ?? r.category}
                  </div>
                  <h3 className="text-lg text-wine-deep font-bold">{r.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground font-light leading-relaxed flex-1">
                    {r.shortDesc}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-wine font-medium group-hover:gap-3 transition-all">
                    {t.examDetail.learnMore} <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- CTA final ---------------- */}
      <section className="relative bg-wine-deep text-wine-foreground py-20 md:py-28 border-t border-champagne/15 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-champagne opacity-60" />
        <div className="absolute -top-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-rose-deep/15 blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-wine/30 blur-[140px] pointer-events-none" />

        <div className="relative container max-w-3xl text-center">
          {baseExam?.slug === "cerclagem" ? (
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-champagne text-wine-deep px-10 py-5 rounded-full text-[11px] tracking-[0.3em] uppercase font-semibold hover:bg-wine-foreground transition-all duration-500 shadow-elegant"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar à página inicial
            </Link>
          ) : (
            <>
              <span className="text-champagne text-[10px] tracking-[0.45em] uppercase">
                {t.examDetail.scheduleEyebrow ?? "Agende com tranquilidade"}
              </span>
              <h2 className="mt-5 font-light text-3xl md:text-5xl text-balance leading-[1.1]">
                {t.examDetail.scheduleTitle ?? "Pronta para agendar seu"}{" "}
                <span className="font-serif italic text-champagne">{exam.title}</span>?
              </h2>
              <p className="mt-6 max-w-xl mx-auto text-wine-foreground/80 font-light text-base md:text-lg leading-relaxed">
                {t.examDetail.scheduleSubtitle ?? "Atendimento humanizado, equipamento de ponta e laudo entregue no mesmo dia."}
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to={`/pre-agendamento?exame=${baseExam.slug}`}
                  className="inline-flex items-center gap-2 bg-champagne text-wine-deep px-10 py-5 rounded-full text-[11px] tracking-[0.3em] uppercase font-semibold hover:bg-wine-foreground transition-all duration-500 shadow-elegant"
                >
                  <MessageCircle className="w-4 h-4" /> {t.examDetail.scheduleThisExam}
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-3 text-wine-foreground/90 px-2 py-4 text-[11px] tracking-[0.25em] uppercase font-medium hover:text-champagne hover:gap-4 transition-all duration-500"
                >
                  <ArrowLeft className="w-4 h-4" /> Voltar à página inicial
                </Link>
              </div>
              <p className="mt-6 text-xs text-wine-foreground/60 tracking-wide">
                Resposta em até 1h em horário comercial
              </p>
            </>
          )}
        </div>

      </section>

      <Footer />
      <WhatsAppFab />
    </main>
  );
};

// ---------------- Section renderer ----------------

/**
 * Converte texto com sintaxe `[label](path)` em nós React, gerando
 * <Link> internos do react-router quando o destino começa com "/", ou
 * <a target="_blank"> em links externos. Usado para permitir links
 * inline no body de seções `paragraph` mantendo os dados como string.
 */
function renderInlineLinks(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    if (href.startsWith("/")) {
      nodes.push(
        <Link
          key={`lnk-${key++}`}
          to={href}
          className="text-wine-deep underline underline-offset-4 decoration-champagne hover:text-wine transition-colors"
        >
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={`lnk-${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-wine-deep underline underline-offset-4 decoration-champagne hover:text-wine transition-colors"
        >
          {label}
        </a>,
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes.length ? nodes : text;
}

function SectionBlock({ section }: { section: ExamSection }) {
  if (section.kind === "paragraph") {
    return (
      <div className="grid md:grid-cols-12 gap-8 md:gap-8">
        <div className="md:col-span-4">
          <h2 className="text-wine-deep text-2xl md:text-3xl font-light leading-tight">
            {section.title}
          </h2>
          <div className="mt-5 w-10 h-px bg-champagne" />
        </div>
        <p className="md:col-span-8 text-foreground/85 font-light text-base md:text-lg leading-relaxed">
          {renderInlineLinks(section.body)}
        </p>
      </div>
    );
  }

  if (section.kind === "list") {
    return (
      <div className="grid md:grid-cols-12 gap-8 md:gap-8">
        <div className="md:col-span-4">
          <h2 className="text-wine-deep text-2xl md:text-3xl font-light leading-tight">
            {section.title}
          </h2>
          <div className="mt-5 w-10 h-px bg-champagne" />
        </div>
        <div className="md:col-span-8">
          <ul className="space-y-5">
            {section.items.map((it) => (
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
          {section.footer && (
            <p className="mt-6 text-muted-foreground italic font-light leading-relaxed">
              {section.footer}
            </p>
          )}
        </div>
      </div>
    );
  }

  // highlight
  return (
    <div className="bg-gradient-rose rounded-3xl p-8 md:p-12 border border-champagne/30">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full border border-champagne/60 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-wine" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-wine mb-2">
            {section.title}
          </div>
          <p className="text-foreground/85 font-light text-base md:text-lg leading-relaxed">
            {renderInlineLinks(section.body)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExamDetail;
