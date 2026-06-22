import { useLanguage } from "@/contexts/LanguageContext";
import teamMorgana from "@/assets/team/morgana.webp";
import teamBarbara from "@/assets/team/barbara.webp";
import teamDarlei from "@/assets/team/darlei.webp";
import teamPaulo from "@/assets/team/paulo.webp";
import teamCarolina from "@/assets/team/carolina.webp";
import teamMariaAmelia from "@/assets/team/maria-amelia.webp";
import teamAndre from "@/assets/team/andre.webp";

const teamBase = [
  { name: "Dra. Morgana Kummer",   roleKey: "Ultrassom Geral, Obstétrico e Medicina Fetal", crm: "CRMMG: 45.304 · RQE: 39.156",     initials: "MK", photo: teamMorgana },
  { name: "Dra. Bárbara Rodrigues", roleKey: "Ultrassom Geral e Obstétrico",                  crm: "CRMMG: 66.451 · RQE: 51.530",     initials: "BR", photo: teamBarbara },
  { name: "Dr. Darlei Carneiro",    roleKey: "Medicina Fetal e Ecocardiografia",               crm: "CRMMG: 64.367 · RQE: 56.387/56.388", initials: "DC", photo: teamDarlei },
  { name: "Dr. Paulo Gontijo Jr.",  roleKey: "Ultrassom Geral e Obstétrico",                  crm: "CRMMG: 76.670",                   initials: "PG", photo: teamPaulo },
  { name: "Dra. Carolina Martins",  roleKey: "Ultrassom Geral e Obstétrico",                  crm: "CRMMG: 75.163 · RQE: 51.242",     initials: "CM", photo: teamCarolina },
  { name: "Dra. Maria Amélia",      roleKey: "Ultrassom Pediátrico",                          crm: "CRMMG: 39.659 · RQE: 16.567",     initials: "MA", photo: teamMariaAmelia },
  { name: "Dr. André Mourão",       roleKey: "Ultrassom Vascular",                            crm: "CRMMG: 38.216 · RQE: 25.549/42.982", initials: "AM", photo: teamAndre },
];

export const TeamV2 = () => {
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
                    loading="lazy"
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
