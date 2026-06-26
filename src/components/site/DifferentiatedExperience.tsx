const diferenciais = [
  {
    title: "Laudo na hora",
    description:
      "Você sai da consulta com o resultado em mãos — sem espera, sem incerteza.",
  },
  {
    title: "Equipamentos GE de ponta",
    description:
      "Imagens de alta resolução que garantem precisão diagnóstica em cada exame.",
  },
  {
    title: "Atendimento humanizado",
    description:
      "Cada paciente é recebida com atenção individual, respeito e acolhimento.",
  },
  {
    title: "Especialização em Medicina Fetal",
    description:
      "Formação dedicada aos momentos mais delicados da gestação, com olhar clínico apurado.",
  },
];

export const DifferentiatedExperience = () => {
  return (
    <section className="py-12 md:py-16 bg-background relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-champagne opacity-30" />

      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-wine text-[11px] tracking-[0.4em] uppercase">
            Por que nos escolher
          </span>
          <h2 className="mt-4 text-wine-deep text-4xl md:text-5xl text-balance">
            Uma experiência{" "}
            <span className="font-serif italic font-light">
              diferenciada
            </span>{" "}
            com a Dra. Morgana.
          </h2>
          <div className="mt-6 w-12 h-px bg-champagne mx-auto" />
          <p className="mt-8 font-comfortaa text-muted-foreground font-light text-lg leading-relaxed">
            Da recepção ao laudo, cada detalhe é pensado para que você se sinta
            segura, acolhida e bem cuidada.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {diferenciais.map((item) => (
            <div
              key={item.title}
              className="premium-card p-8 flex flex-col gap-4 text-center items-center"
            >
              <div className="w-10 h-px bg-champagne" />
              <h3 className="text-lg font-bold text-wine-deep leading-tight">
                {item.title}
              </h3>
              <p className="font-comfortaa text-sm text-muted-foreground font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
