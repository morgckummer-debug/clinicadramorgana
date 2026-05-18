import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, MessageCircle, MapPin, Phone, Clock, Instagram, Award, HeartHandshake, Sparkles, ArrowRight, Stethoscope } from "lucide-react";
import { canonicalPathFor, categories, categoryDescriptions, categoryThumbs, getExamsByCategory } from "@/data/exams";
import logoWine from "@/assets/logo-wine.png";
import logoWhite from "@/assets/logo-white.png";
import logoClinica from "@/assets/logo-clinica.png";
import draHeroV2 from "@/assets/dra-morgana-hero-v2.png";
import draCutout from "@/assets/dra-morgana-cutout.png";
import teamMorgana from "@/assets/team/morgana.png";
import teamBarbara from "@/assets/team/barbara.png";
import teamDarlei from "@/assets/team/darlei.png";
import teamPaulo from "@/assets/team/paulo.png";
import teamCarolina from "@/assets/team/carolina.png";
import teamMariaAmelia from "@/assets/team/maria-amelia.png";
import teamAndre from "@/assets/team/andre.png";

/* Convênios — logos */
import convHapvida from "@/assets/convenios/hapvida.png";
import convAurora from "@/assets/convenios/aurora-2.png";
import convGrupoZelo from "@/assets/convenios/grupo-zelo.png";
import convFusex from "@/assets/convenios/fusex-1.png";
import convStellantis from "@/assets/convenios/stellantis.png";
import convCemig from "@/assets/convenios/cemig.png";
import convBomPastor from "@/assets/convenios/bom-pastor.png";
import convSantaClara from "@/assets/convenios/santa-clara.png";
import convFundafem from "@/assets/convenios/fundafem.png";
import convNotreDame from "@/assets/convenios/notredame.png";
import convCasembrapa from "@/assets/convenios/casembrapa.png";
import convCopass from "@/assets/convenios/copass.png";
import convPax from "@/assets/convenios/pax.png";
import convAgebras from "@/assets/convenios/agebras.png";
import convMedGold from "@/assets/convenios/medgold.png";
import convEvangelize from "@/assets/convenios/evangelize.png";

/* ---------------- Constantes globais ---------------- */
const WHATSAPP_URL = "https://wa.me/5531993910212";
const INSTAGRAM_URL = "https://instagram.com/dramorganak";
const INSTAGRAM_HANDLE = "@dramorganak";

/* ---------------- Navbar ---------------- */
const navLinks = [
  { href: "#exames", label: "Exames" },
  { href: "#sobre", label: "Sobre" },
  { href: "#corpo-clinico", label: "Corpo Clínico" },
  { href: "#convenios", label: "Convênios" },
  { href: "#contato", label: "Contato" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/75 backdrop-blur-2xl border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <div className={`container flex items-center justify-between transition-all duration-500 ${scrolled ? "h-14" : "h-16"}`}>
        <Link to="/#top" className="flex items-center gap-3">
          <img
            src={logoClinica}
            alt="Clínica de Ultrassom Dra. Morgana Kummer"
            className={`w-auto transition-all duration-500 ${scrolled ? "h-10" : "h-12"}`}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={`/${l.href}`}
              className="text-[12px] tracking-[0.18em] uppercase text-wine-deep/70 hover:text-wine-deep transition-colors duration-300 relative group font-medium"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-champagne transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-wine-deep/30 text-wine-deep text-[11px] tracking-[0.22em] uppercase px-5 py-2 rounded-full hover:bg-wine-deep hover:text-wine-foreground hover:border-wine-deep transition-all duration-500"
          >
            Agendar <ArrowRight className="w-3 h-3" />
          </a>
        </nav>
        <button className="md:hidden text-wine-deep" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border animate-fade-in">
          <nav className="container py-6 flex flex-col gap-4">
            {navLinks.map((l) => (
              <Link key={l.href} to={`/${l.href}`} onClick={() => setOpen(false)} className="text-wine-deep text-[12px] tracking-[0.2em] uppercase">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

/* ---------------- Hero Full-Width Escuro ---------------- */
const Hero = () => (
  <section
    id="top"
    className="relative min-h-screen w-full overflow-hidden bg-wine-deep text-wine-foreground pt-24"
  >
    {/* Camadas de fundo */}
    <div className="absolute inset-0 pointer-events-none">
      {/* Gradiente base escuro */}
      <div className="absolute inset-0 bg-gradient-to-br from-wine-deep via-wine-deep to-[hsl(311,42%,18%)]" />
      {/* Brilhos decorativos */}
      <div className="absolute top-1/3 -left-32 w-[32rem] h-[32rem] rounded-full bg-wine/40 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[36rem] h-[36rem] rounded-full bg-rose-deep/20 blur-[140px]" />
      {/* Linha champagne topo */}
      <div className="absolute top-20 inset-x-0 h-px bg-gradient-champagne opacity-40" />
    </div>

    {/* Vídeo da clínica — ocupa toda a extensão do Hero */}
    <div className="absolute inset-0 pointer-events-none">
      <video
        key="hero-clinic-video-v4"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Vídeo da Clínica Dra. Morgana Kummer"
      >
        <source src="/videos/hero-clinic.mp4?v=3" type="video/mp4" />
      </video>
      {/* Overlay cinematográfico — mais profundo e com vinheta */}
      <div className="absolute inset-0 bg-gradient-to-r from-wine-deep/95 via-wine-deep/70 to-wine-deep/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-wine-deep/40 via-transparent to-wine-deep" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, transparent 0%, hsl(311 42% 12% / 0.45) 90%)" }} />
    </div>

    {/* Conteúdo */}
    <div className="relative container min-h-[calc(100vh-6rem)] flex items-center">
      <div className="max-w-2xl py-16 md:py-20 animate-fade-up">
        <div className="inline-flex items-center gap-3 mb-10">
          <span className="w-8 h-px bg-champagne" />
          <span className="text-[10px] tracking-[0.45em] uppercase text-champagne font-medium">Sete Lagoas · Minas Gerais</span>
        </div>

        <p className="text-wine-foreground/70 text-[11px] tracking-[0.5em] uppercase mb-6 font-medium">
          Clínica de Ultrassom
        </p>

        <h1 className="font-serif text-wine-foreground text-[clamp(2.6rem,7.5vw,5.5rem)] leading-[1.02] font-light">
          Dra. Morgana<br />
          <span className="italic text-champagne">Kummer</span>
        </h1>

        <div className="mt-10 w-12 h-px bg-champagne/70" />

        <p className="mt-8 text-wine-foreground/85 text-lg md:text-xl leading-relaxed max-w-xl font-light">
          Diagnóstico por imagem em ultrassonografia obstétrica, fetal e vascular —
          com precisão técnica e a sensibilidade que cada momento exige.
        </p>

        <div className="mt-12 flex flex-wrap gap-4 items-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-champagne text-wine-deep px-8 py-4 rounded-full text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-wine-foreground transition-all duration-500"
          >
            <MessageCircle className="w-4 h-4" /> Agendar pelo WhatsApp
          </a>
          <a
            href="#exames"
            className="inline-flex items-center gap-3 text-wine-foreground/90 px-2 py-4 text-[11px] tracking-[0.25em] uppercase font-medium hover:text-champagne hover:gap-4 transition-all duration-500"
          >
            Conheça os exames <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Selos de credibilidade */}
        <div className="mt-16 pt-8 border-t border-champagne/15 flex flex-wrap gap-x-10 gap-y-3 text-[11px] text-wine-foreground/65 tracking-wide font-light">
          <span className="flex items-center gap-2"><Award className="w-3.5 h-3.5 text-champagne" strokeWidth={1.5} /> Laudos no mesmo dia</span>
          <span className="flex items-center gap-2"><HeartHandshake className="w-3.5 h-3.5 text-champagne" strokeWidth={1.5} /> Atendimento humanizado</span>
          <span className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-champagne" strokeWidth={1.5} /> Equipamentos de última geração</span>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- Faixa de citação ---------------- */
const Quote = () => (
  <section className="bg-wine-deep text-wine-foreground py-20 md:py-28 relative overflow-hidden">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-champagne opacity-50" />
    <div className="container grid md:grid-cols-12 gap-10 md:gap-16 items-center relative">
      <div className="md:col-span-5 flex justify-center md:justify-start">
        <div className="relative max-w-sm w-full">
          <div className="absolute -inset-3 border border-champagne/40 rounded-sm -translate-x-3 -translate-y-3" />
          <img
            src={draHeroV2}
            alt="Dra. Morgana Kummer"
            loading="lazy"
            className="relative rounded-sm shadow-elegant w-full object-cover aspect-[4/5]"
          />
        </div>
      </div>
      <div className="md:col-span-7">
        <span className="text-champagne/80 text-[10px] tracking-[0.5em] uppercase">Filosofia</span>
        <p className="mt-6 font-serif italic text-2xl md:text-[2.4rem] leading-[1.3] text-balance font-light">
          Transformar o cuidado e a tecnologia em momentos inesquecíveis sempre
          foi o meu <span className="text-champagne not-italic font-normal">maior sonho</span>.
        </p>
        <div className="mt-10 inline-flex items-center gap-4">
          <div className="w-8 h-px bg-champagne/60" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-champagne/90 font-medium">Dra. Morgana Kummer</span>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- Sobre ---------------- */
const About = () => (
  <section id="sobre" className="py-32 md:py-40 bg-background relative overflow-hidden">
    <div className="container grid md:grid-cols-12 gap-12 md:gap-20 items-center">
      <div className="relative max-w-md mx-auto md:mx-0 order-2 md:order-1 md:col-span-5">
        <div className="absolute -inset-3 border border-champagne/40 rounded-sm -translate-x-3 -translate-y-3" />
        <img
          src={draHeroV2}
          alt="Dra. Morgana em seu consultório"
          width={520}
          height={650}
          loading="lazy"
          className="relative rounded-sm shadow-elegant w-full object-cover"
        />
        <div className="absolute -bottom-8 -right-4 md:-right-10 bg-background border border-border/70 px-6 py-5 max-w-[210px]">
          <div className="font-serif italic text-3xl text-wine-deep leading-none">+50 mil</div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-2">
            pacientes atendidos
          </div>
        </div>
      </div>

      <div className="order-1 md:order-2 md:col-span-7 md:pl-8">
        <span className="text-wine-deep text-[10px] tracking-[0.45em] uppercase font-medium">Sobre a Clínica</span>
        <h2 className="mt-6 text-wine-deep text-5xl md:text-6xl text-balance font-light">
          Tecnologia que <span className="italic">acolhe</span>.
        </h2>
        <div className="mt-8 w-12 h-px bg-champagne" />
        <p className="mt-10 text-foreground/85 leading-[1.8] text-lg font-light max-w-xl">
          Referência em ultrassonografia em Sete Lagoas, oferecemos diagnóstico
          por imagem com rigor técnico e atendimento profundamente humano — em
          um espaço pensado para que cada paciente se sinta cuidada de verdade.
        </p>

        <p className="mt-6 text-foreground/70 leading-[1.8] text-base font-light max-w-xl">
          Desde <span className="text-wine-deep">2017</span>, já tivemos a
          alegria de cuidar de{" "}
          <span className="text-wine-deep">mais de 50 mil pacientes</span> —
          homens, mulheres e suas famílias — recebendo cada um com escuta atenta
          e o mesmo cuidado que gostaríamos para os nossos.
        </p>
      </div>
    </div>
  </section>
);

/* ---------------- Exames com thumbnails ---------------- */
const Exams = () => (
  <section id="exames" className="py-28 md:py-36 bg-gradient-rose relative">
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
        <div className="max-w-xl">
          <span className="text-wine text-[11px] tracking-[0.4em] uppercase">Exames Disponíveis</span>
          <h2 className="mt-4 text-wine-deep text-4xl md:text-5xl text-balance">
            Cada exame, um <span className="font-serif italic font-light">cuidado próprio</span>.
          </h2>
          <div className="mt-6 w-12 h-px bg-champagne" />
        </div>
        <p className="text-muted-foreground font-light max-w-sm leading-relaxed">
          Procedimentos em equipamento de última geração, com laudo detalhado entregue na hora.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {categories.map((cat) => {
          const items = getExamsByCategory(cat);
          return (
            <article
              key={cat}
              className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative aspect-square w-1/2 mx-auto mt-6 overflow-hidden rounded-xl bg-rose">
                <img
                  src={categoryThumbs[cat]}
                  alt={cat}
                  width={768}
                  height={768}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-wine-deep">{cat}</h3>
                <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">
                  {categoryDescriptions[cat]}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {items.map((ex) => (
                    <li key={ex.slug}>
                      <Link
                        to={`/exames/${ex.slug}`}
                        className="text-xs text-foreground/80 hover:text-wine-deep flex items-center gap-2 font-light transition-colors group/item"
                      >
                        <span className="w-1 h-1 rounded-full bg-champagne flex-shrink-0" />
                        <span className="group-hover/item:underline underline-offset-4 decoration-champagne">
                          {ex.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

/* ---------------- Banner CTA com foto recortada ---------------- */
const CtaBanner = () => (
  <section className="relative bg-wine-deep text-wine-foreground overflow-hidden">
    <div className="container grid md:grid-cols-2 items-end gap-8 relative">
      <div className="py-20 md:py-28 max-w-lg">
        <span className="text-champagne text-[11px] tracking-[0.4em] uppercase">Reserve seu horário</span>
        <h2 className="mt-4 text-4xl md:text-5xl text-balance leading-tight">
          Cuidado começa com uma <span className="font-serif italic font-light text-champagne">conversa</span>.
        </h2>
        <p className="mt-6 text-wine-foreground/75 leading-relaxed font-light">
          Agendamento exclusivo via WhatsApp. Respostas rápidas e horários
          flexíveis para ajustar ao seu momento.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 bg-champagne text-wine-deep px-8 py-4 rounded-full text-sm tracking-[0.25em] uppercase font-bold hover:bg-wine-foreground transition-all duration-500 shadow-elegant"
        >
          <MessageCircle className="w-4 h-4" /> Falar agora
        </a>
      </div>
      <div className="relative h-[420px] md:h-[520px] hidden md:block">
        <img
          src={draCutout}
          alt="Dra. Morgana Kummer"
          loading="lazy"
          className="absolute bottom-0 right-0 h-full w-auto object-contain object-bottom"
        />
      </div>
    </div>
  </section>
);

/* ---------------- Corpo Clínico ---------------- */
const team = [
  { name: "Dra. Morgana Kummer", role: "Ultrassom Geral, Obstétrico e Medicina Fetal", crm: "CRMMG: 45.304 · RQE: 39.156", initials: "MK", photo: teamMorgana },
  { name: "Dra. Bárbara Rodrigues", role: "Ultrassom Geral e Obstétrico", crm: "CRMMG: 66.451 · RQE: 51.530", initials: "BR", photo: teamBarbara },
  { name: "Dr. Darlei Carneiro", role: "Medicina Fetal e Ecocardiografia", crm: "CRMMG: 64.367 · RQE: 56.387/56.388", initials: "DC", photo: teamDarlei },
  { name: "Dr. Paulo Gontijo Jr.", role: "Ultrassom Geral e Obstétrico", crm: "CRMMG: 76.670", initials: "PG", photo: teamPaulo },
  { name: "Dra. Carolina Martins", role: "Ultrassom Geral e Obstétrico", crm: "CRMMG: 75.163 · RQE: 51.242", initials: "CM", photo: teamCarolina },
  { name: "Dra. Maria Amélia", role: "Ultrassom Pediátrico", crm: "CRMMG: 39.659 · RQE: 16.567", initials: "MA", photo: teamMariaAmelia },
  { name: "Dr. André Mourão", role: "Ultrassom Vascular", crm: "CRMMG: 38.216 · RQE: 25.549/42.982", initials: "AM", photo: teamAndre },
];

const Team = () => (
  <section id="corpo-clinico" className="py-28 md:py-36 bg-background relative">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-wine text-[11px] tracking-[0.4em] uppercase">Corpo Clínico</span>
        <h2 className="mt-4 text-wine-deep text-4xl md:text-5xl text-balance">
          Profissionais que fazem a <span className="font-serif italic font-light">diferença</span>.
        </h2>
        <div className="mt-6 w-12 h-px bg-champagne mx-auto" />
        <p className="mt-8 text-muted-foreground font-light text-lg leading-relaxed">
          Uma equipe multidisciplinar dedicada a cuidar de você em cada etapa.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {team.map((t) => (
          <article
            key={t.name}
            className="group flex flex-col items-center text-center bg-card border border-border rounded-2xl p-7 shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1"
          >
            {/* Foto circular ou placeholder com iniciais */}
            <div className="relative w-32 h-32 mb-5">
              <div className="absolute inset-0 rounded-full bg-gradient-wine shadow-deep" />
              {t.photo ? (
                <img
                  src={t.photo}
                  alt={t.name}
                  loading="lazy"
                  className="absolute inset-1 rounded-full object-cover w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)] bg-rose-deep"
                />
              ) : (
                <div className="absolute inset-1 rounded-full bg-wine-deep flex items-center justify-center">
                  <span className="font-serif italic text-3xl text-champagne">{t.initials}</span>
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-champagne flex items-center justify-center shadow-elegant">
                <Stethoscope className="w-4 h-4 text-wine-deep" strokeWidth={1.8} />
              </div>
            </div>

            <h3 className="text-base font-bold text-wine-deep leading-tight">{t.name}</h3>
            <p className="mt-2 text-xs text-wine font-light leading-relaxed min-h-[2.5rem]">
              {t.role}
            </p>
            <div className="mt-3 pt-3 border-t border-border w-full">
              <p className="text-[10px] tracking-wide text-muted-foreground">{t.crm}</p>
            </div>
          </article>
        ))}
      </div>

    </div>
  </section>
);

/* ---------------- Convênios ---------------- */
const convenios = [
  { name: "Hapvida", logo: convHapvida },
  { name: "Aurora Saúde", logo: convAurora },
  { name: "Grupo Zelo", logo: convGrupoZelo },
  { name: "Fusex", logo: convFusex },
  { name: "Stellantis Saúde", logo: convStellantis },
  { name: "Cemig Saúde", logo: convCemig },
  { name: "Projeto Bom Pastor", logo: convBomPastor },
  { name: "Santa Clara Assistencial", logo: convSantaClara },
  { name: "Fundaffemg", logo: convFundafem },
  { name: "NotreDame Intermédica", logo: convNotreDame },
  { name: "Casembrapa", logo: convCasembrapa },
  { name: "Copass Saúde", logo: convCopass },
  { name: "Pax de Minas", logo: convPax },
  { name: "Agebras", logo: convAgebras },
  { name: "MedGold Saúde", logo: convMedGold },
  { name: "Projeto Evangelize", logo: convEvangelize },
];

const Convenios = () => (
  <section id="convenios" className="py-24 bg-background">
    <div className="container">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-wine text-[11px] tracking-[0.4em] uppercase">Convênios</span>
        <h2 className="mt-4 text-wine-deep text-3xl md:text-4xl">
          Atendemos os <span className="font-serif italic font-light">principais planos</span>.
        </h2>
        <div className="mt-6 w-12 h-px bg-champagne mx-auto" />
        <p className="mt-6 text-muted-foreground text-sm">
          Também atendemos no formato particular.
        </p>
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
              loading="lazy"
              className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- Contato ---------------- */
const Contact = () => (
  <section id="contato" className="py-28 bg-gradient-rose relative">
    <div className="container grid md:grid-cols-2 gap-12 items-start">
      <div>
        <span className="text-wine text-[11px] tracking-[0.4em] uppercase">Contato</span>
        <h2 className="mt-4 text-wine-deep text-4xl md:text-5xl text-balance">
          Vamos conversar sobre seu <span className="font-serif italic font-light">momento</span>.
        </h2>
        <div className="mt-6 w-12 h-px bg-champagne" />

        <div className="mt-10 space-y-6">
          {[
            { Icon: MapPin, label: "Endereço", value: "Rua Cândido Azeredo, 41A — Centro, Sete Lagoas/MG", href: undefined },
            { Icon: Phone, label: "WhatsApp", value: "(31) 99391-0212", href: WHATSAPP_URL },
            { Icon: Clock, label: "Horário de Funcionamento", value: "Segunda a Sexta · 7h — 18h\nSábado · 7h30 — 12h", href: undefined },
            { Icon: Instagram, label: "Instagram", value: INSTAGRAM_HANDLE, href: INSTAGRAM_URL },
          ].map(({ Icon, label, value, href }) => (
            <div key={label} className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-wine" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-wine mb-1">{label}</div>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
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
        aria-label="Abrir endereço no Google Maps"
        className="group block relative overflow-hidden rounded-3xl shadow-elegant border border-border bg-card"
      >
        <iframe
          title="Localização da Clínica Dra. Morgana Kummer"
          src="https://www.google.com/maps?q=R.+C%C3%A2ndido+Azeredo,+41a+-+Centro+Sete+Lagoas+-+MG+35700-019&hl=pt-BR&z=18&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[420px] md:h-[520px] border-0 pointer-events-none"
        />
        <div className="absolute inset-0 bg-wine-deep/0 group-hover:bg-wine-deep/10 transition-colors duration-500" />
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between bg-card/95 backdrop-blur-sm border border-border rounded-full px-5 py-3">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-wine" strokeWidth={1.6} />
            <span className="text-xs text-foreground/85 font-light">Rua Cândido Azeredo, 41A — Centro</span>
          </div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-wine font-medium hidden sm:inline-flex items-center gap-1">
            Abrir <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </a>
    </div>
  </section>
);

/* ---------------- Footer ---------------- */
export const Footer = () => (
  <footer className="bg-wine-deep py-14 border-t border-champagne/15">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
      <img src={logoWhite} alt="Logo Dra. Morgana Kummer" className="h-16 w-auto opacity-90" />
      <div className="text-center md:text-right text-wine-foreground/70 text-xs tracking-wide">
        © {new Date().getFullYear()} Clínica Dra. Morgana Kummer · Sete Lagoas / MG<br />
        <span className="text-champagne/80 font-serif italic text-sm">Para momentos importantes, cuidados únicos.</span>
      </div>
    </div>
  </footer>
);

export const WhatsAppFab = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-deep animate-pulse-soft hover:scale-110 transition-transform duration-300"
  >
    <MessageCircle className="w-6 h-6" strokeWidth={2} />
  </a>
);

/* ---------------- Page ---------------- */
const IndexV2 = () => {
  useEffect(() => {
    document.title = "Dra. Morgana Kummer · Clínica de Ultrassom (v2)";
  }, []);
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
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
