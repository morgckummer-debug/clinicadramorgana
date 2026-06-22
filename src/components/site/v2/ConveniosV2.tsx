import { useLanguage } from "@/contexts/LanguageContext";
import convHapvida from "@/assets/convenios/hapvida.webp";
import convAurora from "@/assets/convenios/aurora-2.webp";
import convGrupoZelo from "@/assets/convenios/grupo-zelo.webp";
import convFusex from "@/assets/convenios/fusex-1.webp";
import convStellantis from "@/assets/convenios/stellantis.webp";
import convCemig from "@/assets/convenios/cemig.webp";
import convBomPastor from "@/assets/convenios/bom-pastor.webp";
import convSantaClara from "@/assets/convenios/santa-clara.webp";
import convFundafem from "@/assets/convenios/fundafem.webp";
import convNotreDame from "@/assets/convenios/notredame.webp";
import convCasembrapa from "@/assets/convenios/casembrapa.webp";
import convCopass from "@/assets/convenios/copass.webp";
import convPax from "@/assets/convenios/pax.webp";
import convAgebras from "@/assets/convenios/agebras.webp";
import convMedGold from "@/assets/convenios/medgold.webp";
import convEvangelize from "@/assets/convenios/evangelize.webp";

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

export const ConveniosV2 = () => {
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
                className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
