const convenios = [
  "Unimed", "Bradesco Saúde", "SulAmérica", "Amil", "Notre Dame",
  "Cassi", "Postal Saúde", "Geap", "Particular", "Cemig Saúde",
];

export const Convenios = () => {
  return (
    <section id="convenios" className="py-10 bg-gradient-rose">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-wine text-[11px] tracking-[0.4em] uppercase">
            Convênios
          </span>
          <h2 className="mt-4 text-wine-deep text-3xl md:text-4xl">
            Atendemos os <span className="font-serif italic font-light">principais planos</span>.
          </h2>
          <div className="mt-6 w-12 h-px bg-champagne mx-auto" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {convenios.map((c) => (
            <span
              key={c}
              className="px-6 py-3 rounded-full bg-card/70 backdrop-blur-sm border border-border text-wine-deep text-sm tracking-wide hover:border-champagne hover:bg-card transition-all duration-300"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
