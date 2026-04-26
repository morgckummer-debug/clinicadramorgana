import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, MapPin, Phone, Clock, Instagram, Award, HeartHandshake, Sparkles, ArrowRight, Stethoscope } from "lucide-react";
import logoWine from "@/assets/logo-wine.png";
import logoWhite from "@/assets/logo-white.png";
import draPortrait from "@/assets/dra-morgana-portrait.png";
import draOffice from "@/assets/dra-morgana-office.png";
import draCutout from "@/assets/dra-morgana-cutout.png";
import thumbObstetrico from "@/assets/thumb-obstetrico.jpg";
import thumbMorfologico from "@/assets/thumb-morfologico.jpg";
import thumb3d4d from "@/assets/thumb-3d4d.jpg";
import thumbGinecologico from "@/assets/thumb-ginecologico.jpg";
import thumbDoppler from "@/assets/thumb-doppler.jpg";
import thumbGeral from "@/assets/thumb-geral.jpg";
import thumbPediatrico from "@/assets/thumb-pediatrico.jpg";
import thumbMamario from "@/assets/thumb-mamario.jpg";
import teamMorgana from "@/assets/team/morgana.png";
import teamBarbara from "@/assets/team/barbara.png";
import teamDarlei from "@/assets/team/darlei.png";
import teamPaulo from "@/assets/team/paulo.png";
import teamCarolina from "@/assets/team/carolina.png";
import teamMariaAmelia from "@/assets/team/maria-amelia.png";

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

const Navbar = () => {
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
        scrolled ? "bg-background/90 backdrop-blur-xl shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoWine} alt="Logo Dra. Morgana Kummer" className="h-12 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-wine-deep/80 hover:text-wine transition-colors duration-300 relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-champagne transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-wine text-wine-foreground text-xs tracking-[0.2em] uppercase px-5 py-2.5 rounded-full hover:bg-wine-deep transition-all duration-500"
          >
            Agendar <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </nav>
        <button className="md:hidden text-wine" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border animate-fade-in">
          <nav className="container py-6 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-wine-deep text-sm">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

/* ---------------- Hero Split ---------------- */
const Hero = () => (
  <section id="top" className="relative pt-24 pb-16 md:pt-28 md:pb-0 md:min-h-screen overflow-hidden bg-gradient-rose">
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-rose-deep blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 rounded-full bg-wine/20 blur-3xl" />
    </div>

    <div className="container relative grid md:grid-cols-2 gap-12 md:gap-16 items-center md:min-h-[calc(100vh-7rem)]">
      {/* Lado texto */}
      <div className="md:pr-8 animate-fade-up">
        <div className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-wine">Sete Lagoas · MG</span>
        </div>

        <h1 className="text-wine-deep text-balance text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.05] font-bold">
          Para momentos<br />
          <span className="font-serif italic font-light text-wine">importantes,</span><br />
          cuidados únicos.
        </h1>

        <div className="mt-8 w-16 h-px bg-champagne" />

        <p className="mt-8 text-foreground/75 text-lg leading-relaxed font-light max-w-md">
          Ultrassonografia obstétrica, fetal e ginecológica com sensibilidade,
          tecnologia de ponta e laudo entregue na hora.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-wine text-wine-foreground px-7 py-4 rounded-full text-sm tracking-[0.2em] uppercase font-medium hover:bg-wine-deep transition-all duration-500 shadow-elegant"
          >
            <MessageCircle className="w-4 h-4" /> Agendar pelo WhatsApp
          </a>
          <a
            href="#exames"
            className="inline-flex items-center gap-2 text-wine-deep px-2 py-4 text-sm tracking-[0.2em] uppercase font-medium border-b border-champagne hover:gap-3 transition-all duration-500"
          >
            Ver exames <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mini selos */}
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted-foreground tracking-wide">
          <span className="flex items-center gap-2"><Award className="w-4 h-4 text-champagne" /> Laudo no mesmo dia</span>
          <span className="flex items-center gap-2"><HeartHandshake className="w-4 h-4 text-champagne" /> Atendimento humanizado</span>
          <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-champagne" /> Equipamento de ponta</span>
        </div>
      </div>

      {/* Lado imagem */}
      <div className="relative animate-scale-in flex justify-center md:justify-end">
        <div className="absolute right-4 top-8 bottom-0 w-3/4 border border-champagne/50 rounded-[2rem]" />
        <div className="absolute right-0 top-12 bottom-4 w-3/4 bg-gradient-wine rounded-[2rem] opacity-95" />
        <img
          src={draPortrait}
          alt="Dra. Morgana Kummer"
          width={520}
          height={700}
          fetchPriority="high"
          className="relative w-[80%] md:w-[88%] rounded-[2rem] shadow-deep object-cover object-top max-h-[80vh]"
        />
        <div className="absolute bottom-6 left-2 md:left-0 bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-elegant border border-border max-w-[200px]">
          <img src={logoWine} alt="" className="h-10 w-auto mx-auto" />
          <p className="text-[10px] text-center mt-2 text-wine-deep tracking-[0.2em] uppercase">Desde 2024</p>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- Faixa de citação ---------------- */
const Quote = () => (
  <section className="bg-wine-deep text-wine-foreground py-20 md:py-28 relative overflow-hidden">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-champagne opacity-50" />
    <div className="container max-w-4xl text-center relative">
      <div className="text-champagne text-6xl font-serif leading-none mb-4 select-none">"</div>
      <p className="font-serif italic text-2xl md:text-4xl leading-snug text-balance">
        Transformar o cuidado e a tecnologia em momentos inesquecíveis sempre
        foi o meu <span className="text-champagne">maior sonho.</span>
      </p>
      <div className="mt-10 inline-flex items-center gap-4">
        <div className="w-10 h-px bg-champagne" />
        <span className="text-xs tracking-[0.35em] uppercase text-champagne/90">Dra. Morgana Kummer</span>
        <div className="w-10 h-px bg-champagne" />
      </div>
    </div>
  </section>
);

/* ---------------- Sobre ---------------- */
const About = () => (
  <section id="sobre" className="py-28 md:py-36 bg-background relative overflow-hidden">
    <div className="container grid md:grid-cols-2 gap-16 md:gap-24 items-center">
      <div className="relative max-w-md mx-auto md:mx-0 order-2 md:order-1">
        <div className="absolute -inset-4 border border-champagne/40 rounded-2xl -translate-x-4 -translate-y-4" />
        <img
          src={draOffice}
          alt="Dra. Morgana em seu consultório"
          width={520}
          height={650}
          loading="lazy"
          className="relative rounded-2xl shadow-deep w-full object-cover"
        />
        <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-5 shadow-elegant max-w-[200px]">
          <div className="font-serif italic text-3xl text-wine-deep">+50 mil</div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
            pacientes atendidas
          </div>
        </div>
      </div>

      <div className="order-1 md:order-2">
        <span className="text-wine-deep text-[11px] tracking-[0.4em] uppercase">Sobre a Doutora</span>
        <h2 className="mt-4 text-wine-deep text-4xl md:text-5xl text-balance">
          Tecnologia que <span className="font-serif italic font-light">acolhe</span>.
        </h2>
        <div className="mt-6 w-12 h-px bg-champagne" />
        <p className="mt-8 text-foreground/80 leading-relaxed text-lg font-light max-w-lg">
          Hoje realizo o propósito de oferecer um atendimento acolhedor e de
          excelência, sendo referência em ultrassonografia em Sete Lagoas — em
          um espaço pensado para que cada paciente se sinta cuidada de verdade.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
          {[
            { k: "Especializanda", v: "Medicina Fetal" },
            { k: "Equipamentos", v: "Samsung HS40 · V7" },
            { k: "Atendimento", v: "Humanizado" },
            { k: "Laudo", v: "No mesmo dia" },
          ].map((x) => (
            <div key={x.k} className="border border-border rounded-xl p-4 bg-card/60">
              <div className="text-[10px] tracking-[0.25em] uppercase text-wine mb-1">{x.k}</div>
              <div className="text-sm font-medium text-wine-deep">{x.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- Exames com thumbnails ---------------- */
const exams = [
  {
    img: thumbObstetrico,
    title: "Obstétrico",
    desc: "Acompanhamento gestacional completo, do primeiro ao último trimestre.",
    items: ["1º Trimestre (TV)", "Translucência Nucal", "Doppler Obstétrico", "Perfil Biofísico"],
  },
  {
    img: thumbMorfologico,
    title: "Morfológico",
    desc: "Avaliação detalhada da anatomia fetal em cada trimestre da gestação.",
    items: ["Morfo 1º Tri", "Morfo 2º Tri", "Morfo 3º Tri"],
  },
  {
    img: thumb3d4d,
    title: "3D · 4D · 5D",
    desc: "Imagens em alta definição do bebê, com tecnologia HDlive.",
    items: ["Foto 3D", "Vídeo 4D", "Sessão personalizada"],
  },
  {
    img: thumbGinecologico,
    title: "Ginecológico",
    desc: "Saúde da mulher avaliada com sensibilidade e precisão.",
    items: ["Transvaginal", "Transvaginal 3D", "Doppler", "Rastreamento de Ovulação", "Endometriose Profunda", "Períneo (Novo)"],
  },
  {
    img: thumbMamario,
    title: "Mamário",
    desc: "Avaliação detalhada das mamas e axilas, com cuidado e atenção.",
    items: ["Mamas e Axilas", "Acompanhamento", "Avaliação preventiva"],
  },
  {
    img: thumbDoppler,
    title: "Doppler",
    desc: "Avaliação detalhada do fluxo sanguíneo em vasos e órgãos.",
    items: ["Vasos Cervicais", "Membros Inferiores", "Artérias Renais"],
  },
  {
    img: thumbGeral,
    title: "Medicina Interna",
    desc: "Ultrassonografias gerais para diagnóstico amplo e preciso.",
    items: ["Abdome Total", "Abdome Superior", "Hipocôndrio Direito", "Rins e Vias Urinárias", "Pélvico Masculino", "Partes Moles"],
  },
  {
    img: thumbPediatrico,
    title: "Pediátrico & Vascular",
    desc: "Atenção dedicada para os pequenos e exames vasculares completos.",
    items: ["Pélvico Infantil", "Tireoide", "Ultrassom Vascular", "Bolsa Escrotal"],
  },
];

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
        {exams.map((ex) => (
          <article
            key={ex.title}
            className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 flex flex-col"
          >
            <div className="relative aspect-square overflow-hidden bg-rose">
              <img
                src={ex.img}
                alt={ex.title}
                width={768}
                height={768}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-wine-deep">{ex.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">{ex.desc}</p>
              <ul className="mt-4 space-y-1.5">
                {ex.items.map((it) => (
                  <li key={it} className="text-xs text-foreground/80 flex items-center gap-2 font-light">
                    <span className="w-1 h-1 rounded-full bg-champagne flex-shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
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
          Atendimento exclusivo via WhatsApp. Resposta rápida e agendamento
          flexível para encaixar o seu momento.
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
  { name: "Dra. Morgana Kummer", role: "Especializanda em Medicina Fetal", crm: "CRMMG: 45.304 · RQE: 39.156", initials: "MK", photo: teamMorgana },
  { name: "Dra. Bárbara Rodrigues", role: "Ultrassom Geral e Obstétrico", crm: "CRMMG: 66.451 · RQE: 51.530", initials: "BR", photo: teamBarbara },
  { name: "Dr. Darlei Carneiro", role: "Medicina Fetal e Ecocardiografia", crm: "CRMMG: 64.367 · RQE: 56.387/56.388", initials: "DC", photo: teamDarlei },
  { name: "Dr. Paulo Gontijo Jr.", role: "Ultrassom Geral e Obstétrico", crm: "CRMMG: 76.670", initials: "PG", photo: teamPaulo },
  { name: "Dra. Carolina Martins", role: "Ultrassom Geral e Obstétrico", crm: "CRMMG: 75.163 · RQE: 51.242", initials: "CM", photo: teamCarolina },
  { name: "Dra. Maria Amélia", role: "Ultrassom Pediátrico", crm: "CRMMG: 39.659 · RQE: 16.567", initials: "MA", photo: teamMariaAmelia },
  { name: "Dr. André Mourão", role: "Ultrassom Vascular", crm: "CRMMG: 38.216 · RQE: 25.549/42.982", initials: "AM", photo: null },
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

      <p className="text-center mt-12 text-xs text-muted-foreground tracking-wide italic">
        Foto do Dr. André Mourão será adicionada em breve.
      </p>
    </div>
  </section>
);

/* ---------------- Convênios ---------------- */
const convenios = [
  "Hapvida", "Aurora Saúde", "Grupo Zelo", "Fusex", "Stellantis Saúde",
  "Cemig Saúde", "Projeto Bom Pastor", "Santa Clara Assistencial",
  "Fundaffemg", "NotreDame Intermédica", "Casembrapa", "Copass Saúde",
  "Pax de Minas", "Agebras", "MedGold Saúde", "Projeto Evangelize", "Particular",
];

const Convenios = () => (
  <section id="convenios" className="py-24 bg-background">
    <div className="container">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-wine text-[11px] tracking-[0.4em] uppercase">Convênios</span>
        <h2 className="mt-4 text-wine-deep text-3xl md:text-4xl">
          Atendemos os <span className="font-serif italic font-light">principais planos</span>.
        </h2>
        <div className="mt-6 w-12 h-px bg-champagne mx-auto" />
      </div>
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {convenios.map((c) => (
          <span
            key={c}
            className="px-6 py-3 rounded-full bg-card border border-border text-wine-deep text-sm tracking-wide hover:border-champagne hover:shadow-soft transition-all duration-300"
          >
            {c}
          </span>
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
            { Icon: MapPin, label: "Endereço", value: "Sete Lagoas — Minas Gerais", href: undefined },
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

      <div className="bg-card rounded-3xl p-10 md:p-12 shadow-elegant border border-border relative">
        <div className="absolute -top-5 left-10 bg-wine text-wine-foreground text-[10px] tracking-[0.3em] uppercase px-4 py-2 rounded-full">
          Resposta rápida
        </div>
        <h3 className="font-serif italic text-3xl md:text-4xl text-wine mb-4 mt-4">Agende seu exame</h3>
        <p className="text-foreground/75 font-light leading-relaxed mb-10">
          Atendimento humanizado, equipamento de ponta e laudo no mesmo dia.
          Reserve seu horário diretamente pelo WhatsApp.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-wine text-wine-foreground px-8 py-5 rounded-full text-sm tracking-[0.25em] uppercase font-bold hover:bg-wine-deep transition-all duration-500"
        >
          Falar no WhatsApp
        </a>
        <p className="text-center text-xs text-muted-foreground mt-6 tracking-wide">
          Resposta em até 1h em horário comercial
        </p>
      </div>
    </div>
  </section>
);

/* ---------------- Footer ---------------- */
const Footer = () => (
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

const WhatsAppFab = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-wine text-wine-foreground flex items-center justify-center shadow-deep animate-pulse-soft hover:scale-110 transition-transform duration-300"
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
      <Quote />
      <About />
      <Exams />
      <CtaBanner />
      <Team />
      <Convenios />
      <Contact />
      <Footer />
      <WhatsAppFab />
    </main>
  );
};

export default IndexV2;
