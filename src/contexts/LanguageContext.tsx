import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "pt" | "en";

const translations = {
  pt: {
    nav: {
      exames: "Exames",
      corpoClinico: "Corpo Clínico",
      convenios: "Convênios",
      videos: "Vídeos",
      contato: "Contato",
      menuAriaLabel: "Menu",
      langAriaLabel: "Switch to English",
    },
    hero: {
      location: "Sete Lagoas · Minas Gerais",
      clinicLabel: "Clínica de Ultrassom",
      videoAriaLabel: "Vídeo da Clínica Dra. Morgana Kummer",
      description:
        "Diagnóstico por imagem em ultrassonografia geral, obstétrica e vascular — com precisão técnica e a sensibilidade que cada momento exige.",
      ctaWhatsApp: "Agendar pelo WhatsApp",
      ctaExames: "Conheça os exames",
      badge1: "Laudos no mesmo dia",
      badge2: "Atendimento humanizado",
      badge3: "Equipamentos de última geração",
    },
    quote: {
      label: "Filosofia",
      textBefore: "Transformar o cuidado e a tecnologia em momentos inesquecíveis sempre foi o meu ",
      highlight: "maior sonho",
      textAfter: ".",
    },
    about: {
      label: "Sobre a Clínica",
      titleBefore: "Tecnologia que ",
      titleItalic: "acolhe",
      titleAfter: ".",
      statsNumber: "+50 mil",
      statsLabel: "pacientes atendidos",
      p1: "Referência em ultrassonografia em Sete Lagoas, oferecemos diagnóstico por imagem com rigor técnico e atendimento profundamente humano — em um espaço pensado para que cada paciente se sinta cuidado(a) de verdade.",
      p2before: "Desde ",
      p2year: "2017",
      p2mid: ", já tivemos a alegria de cuidar de ",
      p2highlight: "mais de 50 mil pacientes",
      p2after: " — homens, mulheres e suas famílias — recebendo cada um com escuta atenta e o mesmo cuidado que gostaríamos para os nossos.",
    },
    exams: {
      label: "Exames Disponíveis",
      titleBefore: "Cada exame, um ",
      titleItalic: "cuidado próprio",
      titleAfter: ".",
      description:
        "Procedimentos em equipamento de última geração, com laudo detalhado entregue na hora.",
      categoryNames: {
        "Obstétrico": "Obstétrico",
        "Ginecológico": "Ginecológico",
        "Medicina Interna": "Medicina Interna",
        "Vascular": "Vascular",
        "Tireóide e Cervical": "Tireóide e Cervical",
        "Pediátrico": "Pediátrico",
      } as Record<string, string>,
      categoryDescriptions: {
        "Obstétrico": "Acompanhamento gestacional completo, do primeiro ao último trimestre.",
        "Ginecológico": "Saúde da mulher avaliada com sensibilidade e precisão.",
        "Medicina Interna": "Ultrassonografias gerais para diagnóstico amplo e preciso.",
        "Vascular": "Duplex e Doppler para artérias e veias com leitura precisa do fluxo.",
        "Tireóide e Cervical": "Avaliação detalhada da tireoide, cervical e glândulas salivares.",
        "Pediátrico": "Avaliação completa para pacientes pediátricos.",
      } as Record<string, string>,
      examTitles: {} as Record<string, string>,
    },
    cta: {
      label: "Reserve seu horário",
      titleBefore: "Cuidado começa com uma ",
      titleItalic: "conversa",
      titleAfter: ".",
      description:
        "Agendamento exclusivo via WhatsApp. Respostas rápidas e horários flexíveis para ajustar ao seu momento.",
      button: "Falar agora",
    },
    team: {
      label: "Nossa Equipe",
      titleBefore: "Médicos que fazem a ",
      titleItalic: "diferença",
      titleAfter: ".",
      description:
        "Profissionais especializados, comprometidos com excelência diagnóstica e atendimento humanizado.",
      roles: {
        "Ultrassom Geral, Obstétrico e Medicina Fetal": "Ultrassom Geral, Obstétrico e Medicina Fetal",
        "Ultrassom Geral e Obstétrico": "Ultrassom Geral e Obstétrico",
        "Medicina Fetal e Ecocardiografia": "Medicina Fetal e Ecocardiografia",
        "Ultrassom Pediátrico": "Ultrassom Pediátrico",
        "Ultrassom Vascular": "Ultrassom Vascular",
      } as Record<string, string>,
    },
    convenios: {
      label: "Convênios",
      titleBefore: "Atendemos os ",
      titleItalic: "principais planos",
      titleAfter: ".",
      note: "Também atendemos no formato particular.",
    },
    contact: {
      label: "Contato",
      titleBefore: "Vamos conversar sobre seu ",
      titleItalic: "momento",
      titleAfter: ".",
      addressLabel: "Endereço",
      addressValue: "Rua Cândido Azeredo, 41A — Centro, Sete Lagoas/MG",
      whatsappLabel: "WhatsApp",
      hoursLabel: "Horário de Funcionamento",
      hoursValue: "Segunda a Sexta · 7h — 18h\nSábado · 7h30 — 12h",
      instagramLabel: "Instagram",
      mapsAriaLabel: "Abrir endereço no Google Maps",
      mapTitle: "Localização da Clínica Dra. Morgana Kummer",
      addressShort: "Rua Cândido Azeredo, 41A — Centro",
      openLabel: "Abrir",
    },
    footer: {
      tagline: "Para momentos importantes, cuidados únicos.",
      logoAlt: "Logo Dra. Morgana Kummer",
      copy: "Clínica Dra. Morgana Kummer · Sete Lagoas / MG",
    },
    premium: {
      label: "Atendimento exclusivo",
      titleBefore: "Uma experiência diferenciada com a",
      titleName: "Dra. Morgana",
      description:
        "Ultrassonografia geral e medicina fetal realizadas com precisão técnica, tempo dedicado e a sensibilidade que cada imagem merece.",
      button: "Conheça o atendimento exclusivo",
      buttonAriaLabel: "Conheça o atendimento exclusivo da Dra. Morgana (abre em nova aba)",
    },
  },
  en: {
    nav: {
      exames: "Exams",
      corpoClinico: "Medical Team",
      convenios: "Health Plans",
      videos: "Videos",
      contato: "Contact",
      menuAriaLabel: "Menu",
      langAriaLabel: "Mudar para Português",
    },
    hero: {
      location: "Sete Lagoas · Minas Gerais",
      clinicLabel: "Ultrasound Clinic",
      videoAriaLabel: "Video of Dr. Morgana Kummer Clinic",
      description:
        "Diagnostic imaging in obstetric, fetal and vascular ultrasound — with technical precision and the sensitivity each unique moment deserves.",
      ctaWhatsApp: "Book via WhatsApp",
      ctaExames: "View exams",
      badge1: "Same-day reports",
      badge2: "Humanised care",
      badge3: "State-of-the-art equipment",
    },
    quote: {
      label: "Philosophy",
      textBefore:
        "Turning care and technology into unforgettable moments has always been my ",
      highlight: "greatest dream",
      textAfter: ".",
    },
    about: {
      label: "About the Clinic",
      titleBefore: "Technology that ",
      titleItalic: "embraces",
      titleAfter: ".",
      statsNumber: "+50k",
      statsLabel: "patients seen",
      p1: "A reference in ultrasound in Sete Lagoas, we offer diagnostic imaging with technical rigour and deeply human care — in a space designed so that every patient feels truly cared for.",
      p2before: "Since ",
      p2year: "2017",
      p2mid: ", we have had the joy of caring for ",
      p2highlight: "more than 50,000 patients",
      p2after:
        " — men, women and their families — welcoming each one with attentive listening and the same care we would want for our own.",
    },
    exams: {
      label: "Available Exams",
      titleBefore: "Each exam, its own ",
      titleItalic: "care",
      titleAfter: ".",
      description:
        "Procedures performed with state-of-the-art equipment, with a detailed report delivered on the spot.",
      categoryNames: {
        "Obstétrico": "Obstetric",
        "Ginecológico": "Gynaecological",
        "Medicina Interna": "Internal Medicine",
        "Vascular": "Vascular",
        "Tireóide e Cervical": "Thyroid & Cervical",
        "Pediátrico": "Paediatric",
      } as Record<string, string>,
      categoryDescriptions: {
        "Obstétrico": "Complete gestational follow-up from the first to the last trimester.",
        "Ginecológico": "Women's health assessed with sensitivity and precision.",
        "Medicina Interna": "General ultrasounds for broad and accurate diagnosis.",
        "Vascular": "Duplex and Doppler for arteries and veins with precise flow assessment.",
        "Tireóide e Cervical": "Detailed evaluation of the thyroid, cervical region and salivary glands.",
        "Pediátrico": "Comprehensive assessment for paediatric patients.",
      } as Record<string, string>,
      examTitles: {
        "Obstétrico do 1º Trimestre":              "1st Trimester Scan",
        "Obstétrico com Translucência Nucal":       "Nuchal Translucency Scan",
        "Obstétrico com Doppler":                   "Obstetric Doppler",
        "Morfológico do 1º Trimestre":              "1st Trimester Morphology Scan",
        "Morfológico do 2º Trimestre":              "2nd Trimester Morphology Scan",
        "Morfológico do 3º Trimestre":              "3rd Trimester Morphology Scan",
        "Perfil Biofísico Fetal (PBF)":            "Fetal Biophysical Profile (BPP)",
        "Ecocardiograma Fetal":                     "Fetal Echocardiogram",
        "Medida do Colo Uterino (Cervicometria)":  "Cervical Length Measurement",
        "Cerclagem do Colo Uterino":                "Cervical Cerclage",
        "Transvaginal (Endovaginal)":               "Transvaginal (Endovaginal)",
        "Transvaginal 3D":                          "3D Transvaginal",
        "Transvaginal com Doppler":                 "Transvaginal with Doppler",
        "Rastreamento de Ovulação":                 "Ovulation Tracking",
        "Mapeamento de Endometriose Profunda":      "Deep Endometriosis Mapping",
        "Ultrassom Perineal":                       "Perineal Ultrasound",
        "Abdome Total":                             "Full Abdomen",
        "Abdome Superior":                          "Upper Abdomen",
        "Hipocôndrio Direito":                      "Right Upper Quadrant",
        "Rins e Vias Urinárias":                    "Kidneys & Urinary Tract",
        "Pélvico Masculino (Próstata)":             "Male Pelvis (Prostate)",
        "Mamas e Axilas":                           "Breast & Axilla",
        "Pélvico Infantil":                         "Paediatric Pelvis",
        "Partes Moles":                             "Soft Tissues",
        "Duplex Scan dos Membros Inferiores":       "Lower Limb Duplex Scan",
        "Carótidas e Vertebrais":                   "Carotid & Vertebral Arteries",
        "Aorta e Ilíacas":                          "Aorta & Iliac Arteries",
        "Tireóide com Doppler":                     "Thyroid with Doppler",
        "Cervical com Doppler":                     "Cervical with Doppler",
        "Glândulas Salivares":                      "Salivary Glands",
        "Abdominal Total (Pediátrico)":             "Full Abdomen (Paediatric)",
        "Rins e Vias Urinárias (Pediátrico)":       "Kidneys & Urinary Tract (Paediatric)",
        "Transfontanela":                           "Transfontanelle",
      } as Record<string, string>,
    },
    cta: {
      label: "Book your appointment",
      titleBefore: "Care begins with a ",
      titleItalic: "conversation",
      titleAfter: ".",
      description:
        "Exclusive booking via WhatsApp. Quick replies and flexible hours to fit your schedule.",
      button: "Talk now",
    },
    team: {
      label: "Our Team",
      titleBefore: "Doctors who make a ",
      titleItalic: "difference",
      titleAfter: ".",
      description:
        "Specialised professionals committed to diagnostic excellence and humanised care.",
      roles: {
        "Ultrassom Geral, Obstétrico e Medicina Fetal": "General & Obstetric Ultrasound · Fetal Medicine",
        "Ultrassom Geral e Obstétrico": "General & Obstetric Ultrasound",
        "Medicina Fetal e Ecocardiografia": "Fetal Medicine & Echocardiography",
        "Ultrassom Pediátrico": "Paediatric Ultrasound",
        "Ultrassom Vascular": "Vascular Ultrasound",
      } as Record<string, string>,
    },
    convenios: {
      label: "Health Plans",
      titleBefore: "We accept the ",
      titleItalic: "main plans",
      titleAfter: ".",
      note: "We also accept private (self-pay) patients.",
    },
    contact: {
      label: "Contact",
      titleBefore: "Let's talk about your ",
      titleItalic: "moment",
      titleAfter: ".",
      addressLabel: "Address",
      addressValue: "Rua Cândido Azeredo, 41A — Centro, Sete Lagoas/MG",
      whatsappLabel: "WhatsApp",
      hoursLabel: "Opening Hours",
      hoursValue: "Monday – Friday · 7 am – 6 pm\nSaturday · 7:30 am – 12 pm",
      instagramLabel: "Instagram",
      mapsAriaLabel: "Open address in Google Maps",
      mapTitle: "Dr. Morgana Kummer Clinic location",
      addressShort: "Rua Cândido Azeredo, 41A — Centro",
      openLabel: "Open",
    },
    footer: {
      tagline: "For important moments, unique care.",
      logoAlt: "Dr. Morgana Kummer Clinic Logo",
      copy: "Dr. Morgana Kummer Clinic · Sete Lagoas / MG",
    },
    premium: {
      label: "Exclusive care",
      titleBefore: "A unique experience with",
      titleName: "Dr. Morgana",
      description:
        "General ultrasound and fetal medicine performed with technical precision, dedicated time and the sensitivity each image deserves.",
      button: "Discover exclusive care",
      buttonAriaLabel: "Discover exclusive care with Dr. Morgana (opens in new tab)",
    },
  },
} as const;

export type Translations = typeof translations.pt;

interface LanguageContextValue {
  lang: Lang;
  toggle: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem("site-lang") as Lang) ?? "pt";
  });

  const toggle = () =>
    setLang((l) => {
      const next = l === "pt" ? "en" : "pt";
      localStorage.setItem("site-lang", next);
      return next;
    });

  return (
    <LanguageContext.Provider value={{ lang, toggle, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
