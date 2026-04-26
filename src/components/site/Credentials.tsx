const items = [
  { value: "+1.000", label: "Pacientes atendidas" },
  { value: "+15", label: "Modalidades de exame" },
  { value: "100%", label: "Equipamentos GE" },
  { value: "10+", label: "Convênios atendidos" },
];

export const Credentials = () => {
  return (
    <section className="bg-wine-deep text-wine-foreground py-16 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-champagne opacity-50" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-champagne opacity-30" />

      <div className="container grid grid-cols-2 md:grid-cols-4 gap-10">
        {items.map((it) => (
          <div key={it.label} className="text-center">
            <div className="font-serif text-4xl md:text-5xl text-champagne mb-2">
              {it.value}
            </div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-wine-foreground/70">
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
