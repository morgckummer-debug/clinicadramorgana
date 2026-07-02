import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle, MapPin, Phone, Clock, Instagram, ArrowRight } from "lucide-react";
import { canonicalPathFor, categories, categoryThumbs, getExamsByCategory } from "@/data/exams";
// DifferentiatedExperience desabilitado — removido do bundle inicial
import { useLanguage } from "@/contexts/LanguageContext";
import logoWine from "@/assets/logo-wine.webp";
import logoWhite from "@/assets/logo-white.webp";
import logoClinica from "@/assets/logo-clinica.webp";
import draHeroV2 from "@/assets/dra-morgana-hero-v2.webp";
import draSobre from "@/assets/dra-morgana-sobre.webp";
/* Team & Convênios — servidos via /public para não inflarem o bundle JS inicial */
const teamMorgana = "/team/morgana.webp";
const teamBarbara = "/team/barbara.webp";
const teamDarlei = "/team/darlei.webp";
const teamPaulo = "/team/paulo.webp";
const teamCarolina = "/team/carolina.webp";
const teamMariaAmelia = "/team/maria-amelia.webp";
const teamAndre = "/team/andre.webp";

const convHapvida = "/convenios/hapvida.webp";
const convAurora = "/convenios/aurora-2.webp";
const convGrupoZelo = "/convenios/grupo-zelo.webp";
const convFusex = "/convenios/fusex-1.webp";
const convStellantis = "/convenios/stellantis.webp";
const convCemig = "/convenios/cemig.webp";
const convBomPastor = "/convenios/bom-pastor.webp";
const convSantaClara = "/convenios/santa-clara.webp";
const convFundafem = "/convenios/fundafem.webp";
const convNotreDame = "/convenios/notredame.webp";
const convCasembrapa = "/convenios/casembrapa.webp";
const convCopass = "/convenios/copass.webp";
const convPax = "/convenios/pax.webp";
const convAgebras = "/convenios/agebras.webp";
const convMedGold = "/convenios/medgold.webp";
const convEvangelize = "/convenios/evangelize.webp";

/* ---------------- Constantes globais ---------------- */
const WHATSAPP_URL = "https://wa.me/5531993910212";
const INSTAGRAM_URL = "https://instagram.com/dramorganak";
const INSTAGRAM_HANDLE = "@dramorganak";

/* Base data for team — roles are translated at render time */
const teamBase = [
  { name: "Dra. Morgana Kummer",   roleKey: "Ultrassom Geral, Obstétrico e Medicina Fetal", crm: "CRMMG: 45.304 · RQE: 39.156",     initials: "MK", photo: teamMorgana },
  { name: "Dra. Bárbara Rodrigues", roleKey: "Ultrassom Geral e Obstétrico",                  crm: "CRMMG: 66.451 · RQE: 51.530",     initials: "BR", photo: teamBarbara },
  { name: "Dr. Darlei Carneiro",    roleKey: "Medicina Fetal e Ecocardiografia",               crm: "CRMMG: 64.367 · RQE: 56.387/56.388", initials: "DC", photo: teamDarlei },
  { name: "Dr. Paulo Gontijo Jr.",  roleKey: "Ultrassom Geral e Obstétrico",                  crm: "CRMMG: 76.670",                   initials: "PG", photo: teamPaulo },
  { name: "Dra. Carolina Martins",  roleKey: "Ultrassom Geral e Obstétrico",                  crm: "CRMMG: 75.163 · RQE: 51.242",     initials: "CM", photo: teamCarolina },
  { name: "Dra. Maria Amélia",      roleKey: "Ultrassom Pediátrico",                          crm: "CRMMG: 39.659 · RQE: 16.567",     initials: "MA", photo: teamMariaAmelia },
  { name: "Dr. André Mourão",       roleKey: "Ultrassom Vascular",                            crm: "CRMMG: 38.216 · RQE: 25.549/42.982", initials: "AM", photo: teamAndre },
];

const convenios = [
  { name: "Hapvida",                logo: convHapvida },
  { name: "Aurora Saúde",           logo: convAurora },
  { name: "Grupo Zelo",             logo: convGrupoZelo },
  { name: "Fusex",                  logo: convFusex },
  { name: "Stellantis Saúde",       logo: convStellantis },
  { name: "Cemig Saúde",            logo: convCemig },
  { name: "Projeto Bom Pastor",     logo: convBomPastor },
  { name: "Santa Clara Assistencial", logo: convSantaClara },
  { name: "Fundaffemg",             logo: convFundafem },
  { name: "NotreDame Intermédica",  logo: convNotreDame },
  { name: "Casembrapa",             logo: convCasembrapa },
  { name: "Copass Saúde",           logo: convCopass },
  { name: "Pax de Minas",           logo: convPax },
  { name: "Agebras",                logo: convAgebras },
  { name: "MedGold Saúde",          logo: convMedGold },
  { name: "Projeto Evangelize",     logo: convEvangelize },
];

/* ---------------- Flag SVGs ---------------- */
/* Navbar/Footer/WhatsAppFab extraídos para componentes próprios (reduz chunk das páginas de exame) */
import { SiteNavbar as Navbar } from "@/components/site/SiteNavbar";
import { SiteFooter as Footer } from "@/components/site/SiteFooter";
import { SiteWhatsAppFab as WhatsAppFab } from "@/components/site/SiteWhatsAppFab";
export { Navbar, Footer, WhatsAppFab };



/* ---------------- Hero ---------------- */
const Hero = () => {
  const { t } = useLanguage();
  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-wine-deep text-wine-foreground pt-6 pb-6"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-wine-deep via-wine-deep to-[hsl(311,42%,18%)]" />
        <div className="absolute top-1/3 -left-32 w-[32rem] h-[32rem] rounded-full bg-wine/40 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[36rem] h-[36rem] rounded-full bg-rose-deep/20 blur-[140px]" />
        <div className="absolute top-20 inset-x-0 h-px bg-gradient-champagne opacity-40" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {/* Imagem estática no mobile — sem custo de vídeo */}
        <img
          src="/Hero2.jpg"
          alt=""
          aria-hidden="true"
          decoding="async"
          width={828}
          height={466}
          className="absolute inset-0 w-full h-full object-cover block md:hidden"
        />
        {/* Vídeo apenas no desktop */}
        <video
          key="hero-clinic-video-v5"
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-label={t.hero.videoAriaLabel}
        >
          <source src="/videos/hero-clinic.mp4?v=5" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-wine-deep/80 via-wine-deep/45 to-wine-deep/10 md:from-wine-deep/85 md:via-wine-deep/40 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-wine-deep/30 via-transparent to-wine-deep/90" />
      </div>

      <div className="relative container min-h-[calc(100vh-6rem)] flex items-center">
        <div className="max-w-2xl py-5 md:py-5 animate-fade-up">
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-500 shadow-elegant"
              style={{ backgroundColor: '#FDDCB5', color: '#5B2D8E', border: '1px solid #5B2D8E' }}
            >
              {t.hero.preAgendamento} <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#exames"
              className="inline-flex items-center gap-3 text-wine-foreground/90 px-2 py-4 text-[11px] tracking-[0.25em] uppercase font-medium hover:text-champagne hover:gap-4 transition-all duration-500"
            >
              {t.hero.ctaExames} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Quote ---------------- */
const Quote = () => {
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
              decoding="async"
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

/* ---------------- About ---------------- */
const About = () => {
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
            decoding="async"
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

/* ---------------- Exams ---------------- */
const Exams = () => {
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
                    decoding="async"
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

/* ---------------- Team ---------------- */
const Team = () => {
  const { t } = useLanguage();
  const team = teamBase.map((m) => ({
    ...m,
    role: t.team.roles[m.roleKey] ?? m.roleKey,
  }));
  return (
    <section
      id="corpo-clinico"
      className="py-16 md:py-24 relative"
      style={{ background: "linear-gradient(160deg, hsl(var(--champagne) / 0.25), hsl(var(--background)))" }}
    >
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
          <span className="text-wine text-[10px] tracking-[0.4em] uppercase">{t.team.label}</span>
          <h2 className="mt-4 font-serif italic font-light text-wine-deep text-3xl md:text-5xl text-balance">
            {t.team.titleBefore}<em className="not-italic">{t.team.titleItalic}</em>{t.team.titleAfter}
          </h2>
          <div className="mt-5 w-10 h-px bg-champagne mx-auto" />
          <p className="mt-6 font-comfortaa text-sm text-muted-foreground font-light leading-relaxed max-w-md mx-auto">
            {t.team.description}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 max-w-5xl mx-auto">
          {team.map((member) => (
            <article
              key={member.name}
              className="flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className="overflow-hidden bg-wine-deep/10 border border-champagne/40 shadow-elegant"
                style={{ width: "135px", height: "178px", borderRadius: "50% / 42%" }}
              >
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    width={135}
                    height={178}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-top block"
                  />
                ) : (
                  <div className="w-full h-full bg-wine-deep flex items-center justify-center">
                    <span className="font-serif italic text-3xl text-champagne">{member.initials}</span>
                  </div>
                )}
              </div>
              <div className="pt-4 px-1">
                <h3 className="font-serif text-base md:text-lg text-wine-deep leading-tight">{member.name}</h3>
                <p className="mt-1 text-[9.5px] tracking-wider uppercase text-wine">{member.role}</p>
                <p className="mt-1 text-[10px] font-light text-muted-foreground">{member.crm}</p>
                <div className="mx-auto mt-2 w-6 h-px bg-champagne" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Convenios ---------------- */
const Convenios = () => {
  const { t } = useLanguage();
  return (
    <section id="convenios" className="py-10 bg-background">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-wine text-[11px] tracking-[0.4em] uppercase">{t.convenios.label}</span>
          <h2 className="mt-4 text-wine-deep text-3xl md:text-4xl">
            {t.convenios.titleBefore}<span className="font-serif italic font-light">{t.convenios.titleItalic}</span>{t.convenios.titleAfter}
          </h2>
          <div className="mt-6 w-12 h-px bg-champagne mx-auto" />
          <p className="mt-6 text-muted-foreground text-sm">{t.convenios.note}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {convenios.map((c) => (
            <div
              key={c.name}
              className="group flex items-center justify-center aspect-[3/2] bg-card border border-border rounded-xl p-5 hover:border-champagne hover:shadow-soft transition-all duration-300"
              title={c.name}
            >
              <img
                src={c.logo}
                alt={c.name}
                width={120}
                height={80}
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Contact ---------------- */
const Contact = () => {
  const { t } = useLanguage();
  const contactItems = [
    { Icon: MapPin,     label: t.contact.addressLabel,  value: t.contact.addressValue,  href: undefined },
    { Icon: Phone,      label: t.contact.whatsappLabel, value: "(31) 99391-0212",        href: WHATSAPP_URL },
    { Icon: Clock,      label: t.contact.hoursLabel,    value: t.contact.hoursValue,    href: undefined },
    { Icon: Instagram,  label: t.contact.instagramLabel, value: INSTAGRAM_HANDLE,        href: INSTAGRAM_URL },
  ];
  return (
    <section id="contato" className="py-12 bg-gradient-rose relative">
      <div className="container grid md:grid-cols-2 gap-8 items-start">
        <div>
          <span className="text-wine text-[11px] tracking-[0.4em] uppercase">{t.contact.label}</span>
          <h2 className="mt-4 text-wine-deep text-4xl md:text-5xl text-balance">
            {t.contact.titleBefore}<span className="font-serif italic font-light">{t.contact.titleItalic}</span>{t.contact.titleAfter}
          </h2>
          <div className="mt-6 w-12 h-px bg-champagne" />

          <div className="mt-10 space-y-6">
            {contactItems.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-wine" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-wine mb-1">{label}</div>
                  {href ? (
                    <a
                      href={href}
                      target={href === WHATSAPP_URL ? 'whatsapp' : '_blank'}
                      rel="noopener noreferrer"
                      className="text-foreground/80 font-light hover:text-wine transition-colors whitespace-pre-line"
                    >
                      {value}
                    </a>
                  ) : (
                    <div className="text-foreground/80 font-light whitespace-pre-line">{value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <a
          href="https://www.google.com/maps?ll=-19.464006,-44.240331&z=18&t=m&hl=pt-BR&gl=US&mapclient=embed&q=R.+C%C3%A2ndido+Azeredo,+41a+-+Centro+Sete+Lagoas+-+MG+35700-019"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.contact.mapsAriaLabel}
          className="group block relative overflow-hidden rounded-3xl shadow-elegant border border-border bg-card"
        >
          <iframe
            title={t.contact.mapTitle}
            src="https://www.google.com/maps?q=R.+C%C3%A2ndido+Azeredo,+41a+-+Centro+Sete+Lagoas+-+MG+35700-019&hl=pt-BR&z=18&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[420px] md:h-[520px] border-0 pointer-events-none"
          />
          <div className="absolute inset-0 bg-wine-deep/0 group-hover:bg-wine-deep/10 transition-colors duration-500" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between bg-card border border-border rounded-full px-5 py-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-wine" strokeWidth={1.6} />
              <span className="text-xs text-foreground/85 font-light">{t.contact.addressShort}</span>
            </div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-wine font-medium hidden sm:inline-flex items-center gap-1">
              {t.contact.openLabel} <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
};

/* Footer e WhatsAppFab agora importados/exportados no topo do arquivo */



/* ---------------- Page ---------------- */
const IndexV2 = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title =
      lang === "pt"
        ? "Dra. Morgana Kummer · Clínica de Ultrassom"
        : "Dr. Morgana Kummer · Ultrasound Clinic";
  }, [lang]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      {/* <DifferentiatedExperience /> */}
      <Exams />
      <Team />
      <Convenios />
      <Contact />
      <Footer />
      <WhatsAppFab />
    </main>
  );
};

export default IndexV2;
