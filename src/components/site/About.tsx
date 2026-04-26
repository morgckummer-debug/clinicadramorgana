import doctorImg from "@/assets/doctor-portrait.jpg";

export const About = () => {
  return (
    <section id="sobre" className="py-28 md:py-36 bg-gradient-rose relative overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Imagem com moldura champagne */}
        <div className="relative max-w-md mx-auto md:mx-0">
          <div className="absolute -inset-4 border border-champagne/40 rounded-2xl translate-x-4 translate-y-4" />
          <div className="absolute -inset-1 bg-gradient-wine rounded-2xl -translate-x-3 -translate-y-3 opacity-90" />
          <img
            src={doctorImg}
            alt="Dra. Morgana Kummer"
            width={520}
            height={650}
            loading="lazy"
            className="relative rounded-2xl shadow-deep w-full"
          />
        </div>

        {/* Texto */}
        <div>
          <span className="text-wine text-[11px] tracking-[0.4em] uppercase">
            Sobre a Doutora
          </span>
          <h2 className="mt-4 text-wine-deep text-4xl md:text-5xl text-balance">
            Tecnologia que <span className="font-serif italic font-light">acolhe</span>.
          </h2>

          <div className="mt-8 w-12 h-px bg-champagne" />

          <p className="mt-8 font-serif italic text-2xl md:text-3xl text-wine leading-snug text-balance">
            "Transformar o cuidado e a tecnologia em momentos inesquecíveis sempre
            foi o meu maior sonho."
          </p>

          <p className="mt-8 text-foreground/80 leading-relaxed text-lg font-light max-w-lg">
            Hoje realizo o propósito de oferecer um atendimento acolhedor e de
            excelência, sendo referência em ultrassonografia em Sete Lagoas.
          </p>

          <div className="mt-10 pl-6 border-l-2 border-champagne">
            <div className="font-bold text-wine-deep text-lg">Dra. Morgana Kummer</div>
            <div className="text-sm text-muted-foreground tracking-wide mt-1">
              Especializanda em Medicina Fetal · Fundadora
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
