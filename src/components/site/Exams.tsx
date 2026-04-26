import { Baby, Heart, Stethoscope, Activity, Sparkles, Microscope } from "lucide-react";

const exams = [
  {
    icon: Baby,
    title: "Obstétrico",
    items: [
      "1º Trimestre (TV)",
      "Obstétrico Simples",
      "Translucência Nucal",
      "Doppler Obstétrico",
      "Perfil Biofísico Fetal",
    ],
  },
  {
    icon: Sparkles,
    title: "Morfológico",
    items: [
      "1º Trimestre",
      "2º Trimestre",
      "3º Trimestre",
      "Avaliação completa do feto",
      "Detecção precoce",
    ],
  },
  {
    icon: Heart,
    title: "Ginecológico",
    items: [
      "Pélvico Transvaginal",
      "Pélvico Suprapúbico",
      "Mamário",
      "Ultrassom 3D ginecológico",
      "Acompanhamento folicular",
    ],
  },
  {
    icon: Activity,
    title: "3D / 4D / 5D",
    items: [
      "Imagens em alta definição",
      "Vídeo do bebê",
      "Momentos para guardar",
      "Tecnologia HDlive",
      "Equipamento Voluson",
    ],
  },
  {
    icon: Stethoscope,
    title: "Geral",
    items: [
      "Abdome Total",
      "Tireoide",
      "Vias Urinárias",
      "Bolsa Escrotal",
      "Partes Moles",
    ],
  },
  {
    icon: Microscope,
    title: "Doppler",
    items: [
      "Vasos Cervicais",
      "Vasos do Pescoço",
      "Membros Inferiores",
      "Artérias Renais",
      "Doppler Venoso",
    ],
  },
];

export const Exams = () => {
  return (
    <section id="exames" className="py-28 md:py-36 bg-background relative">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-wine text-[11px] tracking-[0.4em] uppercase">
            Exames Disponíveis
          </span>
          <h2 className="mt-4 text-wine-deep text-4xl md:text-5xl text-balance">
            Cada exame, um <span className="font-serif italic font-light">cuidado próprio</span>.
          </h2>
          <div className="mt-6 w-12 h-px bg-champagne mx-auto" />
          <p className="mt-8 text-muted-foreground font-light text-lg leading-relaxed">
            Procedimentos realizados em equipamento de última geração, com laudo
            detalhado entregue na hora.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {exams.map((ex) => {
            const Icon = ex.icon;
            return (
              <article key={ex.title} className="premium-card p-8 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-rose flex items-center justify-center group-hover:bg-champagne/30 transition-colors duration-500">
                    <Icon className="w-5 h-5 text-wine" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-wine-deep">{ex.title}</h3>
                </div>
                <ul className="space-y-3">
                  {ex.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-foreground/75 flex items-start gap-3 font-light"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-champagne flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
