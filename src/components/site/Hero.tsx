const heroVideoUrl = "/videos/hero-clinic.mp4?v=2";

export const Hero = () => {
  return (
    <section id="top" className="relative h-screen min-h-[680px] w-full overflow-hidden">
      {/* Vídeo de fundo */}
      <div className="absolute inset-0">
        <video
          key={heroVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/hero-clinic-poster.jpg"
          aria-label="Ambiente acolhedor da Clínica Dra. Morgana Kummer"
          className="h-full w-full object-cover"
        >
          <source src={heroVideoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Linha champagne decorativa no topo */}
      <div className="absolute top-20 inset-x-0 h-px bg-gradient-champagne opacity-40" />

      {/* Conteúdo */}
      <div className="relative h-full container flex flex-col justify-center items-start max-w-3xl">
        <span className="text-champagne text-[11px] tracking-[0.4em] uppercase mb-6 animate-fade-in">
          Sete Lagoas · Minas Gerais
        </span>

        <h1 className="font-comfortaa text-wine-foreground font-bold text-balance animate-fade-up text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.05]">
          Cuidado de excelência<br />
          em <span className="font-comfortaa font-light text-champagne">cada imagem</span>.
        </h1>

        <p
          className="font-comfortaa mt-8 text-wine-foreground/85 text-lg md:text-xl max-w-xl font-light leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Ultrassonografia obstétrica, ginecológica e fetal com a sensibilidade
          que momentos únicos merecem.
        </p>

        <div
          className="mt-12 flex flex-wrap gap-4 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <a
            href="#contato"
            className="group bg-champagne text-wine-deep px-8 py-4 rounded-full text-sm tracking-[0.2em] uppercase font-medium hover:bg-wine-foreground transition-all duration-500 shadow-elegant"
          >
            Agendar exame
          </a>
          <a
            href="#exames"
            className="group border border-wine-foreground/40 text-wine-foreground px-8 py-4 rounded-full text-sm tracking-[0.2em] uppercase font-medium hover:border-champagne hover:text-champagne transition-all duration-500"
          >
            Ver exames
          </a>
        </div>
      </div>

      {/* Indicador scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1s" }}>
        <div className="w-px h-12 bg-gradient-to-b from-champagne to-transparent mx-auto" />
        <span className="block text-champagne text-[10px] tracking-[0.4em] uppercase mt-3">Role</span>
      </div>
    </section>
  );
};
