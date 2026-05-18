import thumbObstetrico from "@/assets/exams/obstetrico.webp";
import thumbGinecologico from "@/assets/exams/ginecologico.webp";
import thumbGeral from "@/assets/exams/geral.webp";

// ---------- 1º Trimestre ----------
import primeiroTriHero from "@/assets/exams/primeiro-trimestre/hero.jpg";
import primeiroTriCcn from "@/assets/exams/primeiro-trimestre/ccn.jpg";
import primeiroTriVesicula from "@/assets/exams/primeiro-trimestre/vesicula.jpg";
import primeiroTriSaco from "@/assets/exams/primeiro-trimestre/saco.jpg";
import primeiroTriBatimentos from "@/assets/exams/primeiro-trimestre/batimentos.jpg";

export type ExamCategory =
  | "Obstétrico"
  | "Ginecológico"
  | "Medicina Interna";

/**
 * Conteúdo narrativo de cada exame (novo formato).
 * Cada seção é renderizada na ordem em que aparece no array.
 */
export type ExamSection =
  | { kind: "paragraph"; title: string; body: string }
  | { kind: "list"; title: string; items: string[]; footer?: string }
  | { kind: "highlight"; title: string; body: string };

export interface ExamGalleryItem {
  image: string;
  caption: string;
  alt?: string;
}

export interface ExamFaq {
  q: string;
  a: string;
}

export interface ExamHero {
  tagline: string;
  intro: string;
  image?: string;
}

export interface Exam {
  slug: string;
  /**
   * URL histórica preservada para SEO, Google Ads e Analytics.
   * Sempre começa com "/" e é usada como rota canônica quando presente.
   */
  legacySlug?: string;
  category: ExamCategory;
  title: string;
  thumb: string;
  shortDesc: string;

  /** Conteúdo novo, migrado do site oficial. */
  hero?: ExamHero;
  sections?: ExamSection[];
  gallery?: ExamGalleryItem[];
  faq?: ExamFaq[];

  /** Campos legados — usados como fallback enquanto a página não foi migrada. */
  longDesc?: string;
  indications?: string[];
  preparation?: string;
  duration?: string;
  whatToBring?: string[];
}

export const categoryThumbs: Record<ExamCategory, string> = {
  "Obstétrico": thumbObstetrico,
  "Ginecológico": thumbGinecologico,
  "Medicina Interna": thumbGeral,
};

export const categoryDescriptions: Record<ExamCategory, string> = {
  "Obstétrico": "Acompanhamento gestacional completo, do primeiro ao último trimestre.",
  "Ginecológico": "Saúde da mulher avaliada com sensibilidade e precisão.",
  "Medicina Interna": "Ultrassonografias gerais para diagnóstico amplo e preciso.",
};

const SEM_PREPARO = "Não é necessário preparo específico para este exame.";
const BEXIGA_CHEIA =
  "Ingerir cerca de 4 copos de água 1h antes do exame, sem urinar até a realização.";
const JEJUM_6H = "Jejum de 6 horas (água é permitida).";

export const exams: Exam[] = [
  // ---------------- Obstétrico ----------------
  {
    slug: "ultrassom-primeiro-trimestre-tv",
    legacySlug: "/primeiro-trimestre",
    category: "Obstétrico",
    title: "Obstétrico do 1º Trimestre",
    thumb: thumbObstetrico,
    shortDesc:
      "Confirmação precoce da gravidez e datação gestacional precisa.",
    hero: {
      tagline: "O início de tudo.",
      intro:
        "O ultrassom do primeiro trimestre é um dos exames mais importantes da gestação. Ele fornece informações essenciais sobre o desenvolvimento inicial do bebê e ajuda a garantir que tudo está indo bem nos primeiros meses da gravidez.",
      image: primeiroTriHero,
    },
    sections: [
      {
        kind: "paragraph",
        title: "Quando ele deve ser realizado?",
        body:
          "Esse exame é indicado para gestantes entre 7 e 10 semanas, contadas a partir do primeiro dia da última menstruação (DUM) ou quando o beta-hCG está acima de 3.000 mUI/mL. É geralmente o primeiro ultrassom da gestação, realizado após o teste positivo de gravidez.",
      },
      {
        kind: "list",
        title: "O que é avaliado?",
        items: [
          "Se a gestação está localizada dentro do útero (descartando gravidez ectópica).",
          "Presença do saco gestacional e da vesícula vitelínica.",
          "Presença do embrião com batimentos cardíacos.",
          "Número de embriões (gravidez única ou gemelar).",
          "Idade gestacional mais precisa, através da medida do comprimento cabeça-nádega (CCN).",
        ],
      },
      {
        kind: "list",
        title: "Principais complicações",
        items: [
          "Gravidez ectópica (fora do útero).",
          "Gestação anembrionada (sem embrião visível).",
          "Aborto retido ou em andamento.",
          "Hematoma subcoriônico (possível causa de sangramentos no início da gravidez).",
        ],
        footer:
          "A detecção precoce de qualquer alteração permite um cuidado mais rápido e direcionado, protegendo a saúde da gestante e do bebê.",
      },
      {
        kind: "paragraph",
        title: "Por que não fazer antes de 7 semanas?",
        body:
          "Antes das 7 semanas de gestação, muitas vezes ainda não é possível visualizar o embrião ou identificar os batimentos cardíacos. Isso pode gerar ansiedade desnecessária e a falsa impressão de que algo está errado, quando na verdade a gestação ainda está muito inicial.",
      },
      {
        kind: "list",
        title: "Quando fazer antes de 7 semanas?",
        items: [
          "Quando a paciente apresenta sangramentos ou dor abdominal.",
          "Quando há suspeita de gravidez ectópica (fora do útero).",
          "Em casos de fertilização in vitro ou tratamentos para engravidar.",
        ],
        footer:
          "Nesses casos, o exame precoce é feito para garantir que a gestação está evoluindo bem e que não há riscos à saúde da mãe. Mas, na maioria das vezes, o exame não mostrará o embrião.",
      },
    ],
    gallery: [
      {
        image: primeiroTriCcn,
        caption:
          "Medimos o embrião, de ponta a ponta. Essa medida se chama CCN (comprimento cabeça-nádegas). Através dele podemos ver se a idade gestacional está compatível com a data da última menstruação (DUM).",
        alt: "Ultrassom mostrando a medida do CCN do embrião",
      },
      {
        image: primeiroTriVesicula,
        caption:
          "A Vesícula Vitelínica (VV) é essa estrutura redondinha. Ela é responsável por nutrir e dar oxigênio para o bebê nesse início.",
        alt: "Vesícula vitelínica vista no ultrassom",
      },
      {
        image: primeiroTriSaco,
        caption:
          "O Saco Gestacional é essa área escura, o líquido amniótico, onde o bebê vai passar os nove meses.",
        alt: "Saco gestacional visto no ultrassom",
      },
      {
        image: primeiroTriBatimentos,
        caption:
          "Batimentos cardíacos — momento mais esperado pelas mamães!",
        alt: "Ultrassom registrando os batimentos cardíacos fetais",
      },
    ],
  },
  {
    slug: "obstetrico-translucencia-nucal",
    legacySlug: "/obstetrico-com-translucencia-nucal",
    category: "Obstétrico",
    title: "Obstétrico com Translucência Nucal",
    thumb: thumbObstetrico,
    shortDesc:
      "Avaliação entre 11 e 13 semanas para rastreamento de cromossomopatias.",
    longDesc:
      "Realizado entre a 11ª e 13ª semana, mede a translucência nucal, avalia osso nasal e marcadores fetais para rastreamento de alterações cromossômicas.",
    indications: [
      "Rastreamento de Síndrome de Down e outras cromossomopatias",
      "Avaliação morfológica precoce",
      "Cálculo de risco gestacional",
    ],
    preparation: SEM_PREPARO,
    duration: "30 a 45 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores da gestação"],
  },
  {
    slug: "obstetrico-doppler",
    legacySlug: "/obstetrico-com-doppler",
    category: "Obstétrico",
    title: "Obstétrico com Doppler",
    thumb: thumbObstetrico,
    shortDesc:
      "Análise do fluxo sanguíneo fetal, placentário e uterino.",
    longDesc:
      "Avalia a circulação sanguínea entre mãe, placenta e bebê, identificando precocemente alterações que possam comprometer o desenvolvimento fetal.",
    indications: [
      "Suspeita de restrição de crescimento fetal",
      "Hipertensão gestacional ou pré-eclâmpsia",
      "Acompanhamento de gestações de alto risco",
    ],
    preparation: SEM_PREPARO,
    duration: "30 a 45 minutos",
    whatToBring: ["Pedido médico", "Cartão de pré-natal"],
  },
  {
    slug: "morfologico-1-trimestre",
    legacySlug: "/inicio/morfo-primeirotrimestre",
    category: "Obstétrico",
    title: "Morfológico do 1º Trimestre",
    thumb: thumbObstetrico,
    shortDesc:
      "Avaliação detalhada da anatomia fetal entre 11 e 13 semanas.",
    longDesc:
      "Exame minucioso da anatomia fetal já no primeiro trimestre, com avaliação de marcadores cromossômicos e detecção precoce de malformações.",
    indications: [
      "Rastreamento precoce de malformações",
      "Avaliação de marcadores cromossômicos",
      "Gestações de alto risco",
    ],
    preparation: SEM_PREPARO,
    duration: "45 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores"],
  },
  {
    slug: "morfologico-2-trimestre",
    legacySlug: "/inicio/morfo-segundotrimestre",
    category: "Obstétrico",
    title: "Morfológico do 2º Trimestre",
    thumb: thumbObstetrico,
    shortDesc:
      "Avaliação completa da anatomia fetal entre 20 e 24 semanas.",
    longDesc:
      "Considerado o exame mais importante da gestação, avalia detalhadamente cada órgão e estrutura fetal, identificando malformações e marcadores genéticos. Inclui medida do colo uterino.",
    indications: [
      "Avaliação anatômica completa do feto",
      "Rastreamento de malformações estruturais",
      "Avaliação do colo uterino",
    ],
    preparation: SEM_PREPARO,
    duration: "45 a 60 minutos",
    whatToBring: ["Pedido médico", "Cartão de pré-natal"],
  },
  {
    slug: "morfologico-3-trimestre",
    legacySlug: "/morfologico-do-3o-trimestre",
    category: "Obstétrico",
    title: "Morfológico do 3º Trimestre",
    thumb: thumbObstetrico,
    shortDesc:
      "Reavaliação da anatomia e crescimento fetal no terceiro trimestre.",
    longDesc:
      "Reavalia a anatomia fetal já completamente desenvolvida, estima o peso fetal e auxilia no planejamento do parto.",
    indications: [
      "Reavaliação anatômica tardia",
      "Estimativa de peso e crescimento",
      "Planejamento do parto",
    ],
    preparation: SEM_PREPARO,
    duration: "45 minutos",
    whatToBring: ["Pedido médico", "Cartão de pré-natal"],
  },
  {
    slug: "obstetrico-3d-4d",
    legacySlug: "/obstetrico-3d-4d",
    category: "Obstétrico",
    title: "Obstétrico 3D / 4D",
    thumb: thumbObstetrico,
    shortDesc:
      "Imagens tridimensionais e em movimento do bebê em tempo real.",
    longDesc:
      "Permite visualizar o rostinho e os movimentos do bebê em imagens tridimensionais e em tempo real — um momento especial para toda a família.",
    indications: [
      "Vínculo afetivo entre família e bebê",
      "Complemento ao exame morfológico",
      "Registro de momento especial da gestação",
    ],
    preparation: "Ideal entre 26 e 32 semanas, com boa quantidade de líquido amniótico.",
    duration: "30 a 45 minutos",
    whatToBring: ["Pedido médico"],
  },
  {
    slug: "perfil-biofisico-fetal",
    legacySlug: "/pbf",
    category: "Obstétrico",
    title: "Perfil Biofísico Fetal (PBF)",
    thumb: thumbObstetrico,
    shortDesc: "Avaliação da vitalidade fetal no terceiro trimestre.",
    longDesc:
      "Avalia a vitalidade do bebê através de cinco parâmetros: movimentos fetais, tônus, respiração, líquido amniótico e batimentos cardíacos.",
    indications: [
      "Avaliação de bem-estar fetal",
      "Gestações de alto risco",
      "Diminuição de movimentos fetais",
    ],
    preparation: SEM_PREPARO,
    duration: "30 minutos",
    whatToBring: ["Pedido médico", "Cartão de pré-natal"],
  },
  {
    slug: "ecocardiograma-fetal",
    legacySlug: "/ecocardiograma",
    category: "Obstétrico",
    title: "Ecocardiograma Fetal",
    thumb: thumbObstetrico,
    shortDesc:
      "Avaliação detalhada da anatomia e função do coração do bebê.",
    longDesc:
      "Exame especializado que avalia em detalhes a anatomia e o funcionamento do coração fetal, fundamental para diagnóstico precoce de cardiopatias.",
    indications: [
      "Histórico familiar de cardiopatia",
      "Diabetes gestacional ou pré-existente",
      "Alterações em ultrassonografias anteriores",
    ],
    preparation: SEM_PREPARO,
    duration: "45 a 60 minutos",
    whatToBring: ["Pedido médico", "Exames cardiológicos anteriores"],
  },
  {
    slug: "colo-uterino",
    legacySlug: "/colo-uterino",
    category: "Obstétrico",
    title: "Medida do Colo Uterino (Cervicometria)",
    thumb: thumbObstetrico,
    shortDesc:
      "Avaliação transvaginal do comprimento do colo para risco de parto prematuro.",
    longDesc:
      "A cervicometria é o exame transvaginal que mede com precisão o comprimento do colo uterino durante a gestação. É fundamental para identificar pacientes com risco aumentado de parto prematuro e orientar conduta — incluindo a indicação de cerclagem ou uso de progesterona.",
    indications: [
      "Rastreamento de risco de parto prematuro",
      "Histórico de parto prematuro ou cerclagem prévia",
      "Acompanhamento de gestações de alto risco",
      "Após procedimentos cervicais (conização, CAF)",
    ],
    preparation: "Bexiga vazia.",
    duration: "15 a 20 minutos",
    whatToBring: ["Pedido médico", "Cartão de pré-natal", "Exames anteriores"],
  },
  {
    slug: "cerclagem",
    legacySlug: "/cerclagem",
    category: "Obstétrico",
    title: "Cerclagem Uterina — Acompanhamento Ultrassonográfico",
    thumb: thumbObstetrico,
    shortDesc:
      "Avaliação ultrassonográfica antes e depois da cerclagem do colo uterino.",
    longDesc:
      "A cerclagem é um procedimento cirúrgico em que uma sutura é colocada no colo uterino para reduzir o risco de parto prematuro em pacientes com incompetência istmo-cervical. O acompanhamento por ultrassom transvaginal — antes, durante o planejamento e ao longo da gestação — é fundamental para avaliar o comprimento do colo, a posição da sutura e a vitalidade fetal.",
    indications: [
      "Histórico de perda gestacional no 2º trimestre",
      "Colo uterino curto identificado em cervicometria",
      "Incompetência istmo-cervical diagnosticada",
      "Acompanhamento após cerclagem realizada",
    ],
    preparation: "Bexiga vazia.",
    duration: "20 a 30 minutos",
    whatToBring: [
      "Pedido médico",
      "Cartão de pré-natal",
      "Relatório cirúrgico da cerclagem (se já realizada)",
    ],
  },

  // ---------------- Ginecológico ----------------
  {
    slug: "transvaginal",
    legacySlug: "/tv",
    category: "Ginecológico",
    title: "Transvaginal",
    thumb: thumbGinecologico,
    shortDesc: "Avaliação detalhada do útero, ovários e endométrio.",
    longDesc:
      "Exame fundamental na saúde da mulher, avalia com precisão útero, ovários, endométrio e estruturas pélvicas.",
    indications: [
      "Investigação de dor pélvica",
      "Alterações menstruais",
      "Rastreamento ginecológico de rotina",
    ],
    preparation: "Bexiga vazia.",
    duration: "15 a 20 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores"],
  },
  {
    slug: "transvaginal-3d",
    legacySlug: "/tv-3d",
    category: "Ginecológico",
    title: "Transvaginal 3D",
    thumb: thumbGinecologico,
    shortDesc: "Avaliação tridimensional do útero e cavidade endometrial.",
    longDesc:
      "Tecnologia tridimensional que permite avaliação anatômica precisa do útero, especialmente útil em investigações de infertilidade e malformações.",
    indications: [
      "Investigação de infertilidade",
      "Suspeita de malformações uterinas",
      "Avaliação de miomas e pólipos",
    ],
    preparation: "Bexiga vazia.",
    duration: "20 a 30 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores"],
  },
  {
    slug: "ginecologico-doppler",
    legacySlug: "/transvaginal-com-doppler",
    category: "Ginecológico",
    title: "Ginecológico com Doppler",
    thumb: thumbGinecologico,
    shortDesc: "Análise vascularizada das estruturas pélvicas femininas.",
    longDesc:
      "Avalia o fluxo sanguíneo das estruturas pélvicas, sendo essencial em investigações específicas de patologias uterinas e ovarianas.",
    indications: [
      "Avaliação de miomas vascularizados",
      "Investigação de tumores anexiais",
      "Estudo de varizes pélvicas",
    ],
    preparation: "Bexiga vazia.",
    duration: "30 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores"],
  },
  {
    slug: "rastreamento-ovulacao",
    legacySlug: "/rastreamento-de-ovulacao",
    category: "Ginecológico",
    title: "Rastreamento de Ovulação",
    thumb: thumbGinecologico,
    shortDesc:
      "Acompanhamento do desenvolvimento folicular para concepção.",
    longDesc:
      "Acompanhamento seriado do desenvolvimento folicular, fundamental no planejamento da concepção e tratamentos de reprodução assistida.",
    indications: [
      "Planejamento da gestação",
      "Tratamento de infertilidade",
      "Acompanhamento de indução ovulatória",
    ],
    preparation: "Bexiga vazia. Realizado em datas específicas do ciclo.",
    duration: "15 minutos por sessão",
    whatToBring: ["Pedido médico", "Histórico do ciclo menstrual"],
  },
  {
    slug: "endometriose-profunda",
    category: "Ginecológico",
    title: "Endometriose Profunda",
    thumb: thumbGinecologico,
    shortDesc:
      "Mapeamento detalhado de focos de endometriose pélvica.",
    longDesc:
      "Exame especializado para mapeamento de focos endometrióticos, fundamental no diagnóstico e planejamento cirúrgico da endometriose profunda.",
    indications: [
      "Dor pélvica crônica",
      "Dismenorreia intensa",
      "Investigação de infertilidade",
    ],
    preparation:
      "Preparo intestinal específico — orientações enviadas no agendamento.",
    duration: "45 a 60 minutos",
    whatToBring: ["Pedido médico", "Exames e laudos anteriores"],
  },
  {
    slug: "perineo",
    legacySlug: "/ultrassom-perineal",
    category: "Ginecológico",
    title: "Períneo",
    thumb: thumbGinecologico,
    shortDesc: "Avaliação da musculatura e estruturas do assoalho pélvico.",
    longDesc:
      "Avalia a musculatura, estruturas e funcionalidade do assoalho pélvico, sendo essencial no diagnóstico de incontinências e prolapsos.",
    indications: [
      "Incontinência urinária",
      "Prolapsos genitais",
      "Pós-parto e reabilitação pélvica",
    ],
    preparation: "Bexiga parcialmente cheia.",
    duration: "30 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores"],
  },

  // ---------------- Medicina Interna ----------------
  {
    slug: "abdome-total",
    legacySlug: "/abdome-total",
    category: "Medicina Interna",
    title: "Abdome Total",
    thumb: thumbGeral,
    shortDesc:
      "Avaliação completa dos órgãos abdominais e pelve.",
    longDesc:
      "Avalia fígado, vesícula, vias biliares, pâncreas, baço, rins, bexiga e estruturas pélvicas em um único exame.",
    indications: [
      "Dor abdominal",
      "Rastreamento de rotina",
      "Alterações em exames laboratoriais",
    ],
    preparation: `${JEJUM_6H} ${BEXIGA_CHEIA}`,
    duration: "30 a 45 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores"],
  },
  {
    slug: "abdome-superior",
    legacySlug: "/abdome-superior",
    category: "Medicina Interna",
    title: "Abdome Superior",
    thumb: thumbGeral,
    shortDesc:
      "Avaliação de fígado, vesícula, pâncreas, baço e rins.",
    longDesc:
      "Avalia os órgãos do andar superior do abdome — fígado, vesícula, vias biliares, pâncreas, baço e rins.",
    indications: [
      "Dor em região superior do abdome",
      "Investigação de cálculos biliares",
      "Alterações hepáticas",
    ],
    preparation: JEJUM_6H,
    duration: "20 a 30 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores"],
  },
  {
    slug: "hipocondrio-direito",
    legacySlug: "/hipoc-dir",
    category: "Medicina Interna",
    title: "Hipocôndrio Direito",
    thumb: thumbGeral,
    shortDesc:
      "Avaliação focada de fígado, vesícula e vias biliares.",
    longDesc:
      "Ultrassonografia direcionada à região do hipocôndrio direito, com avaliação detalhada de fígado, vesícula biliar e vias biliares. Indicada para investigação de dor localizada, suspeita de cálculos vesiculares e acompanhamento de alterações hepatobiliares já conhecidas.",
    indications: [
      "Dor no hipocôndrio direito",
      "Suspeita de colelitíase (cálculos na vesícula)",
      "Acompanhamento de esteatose hepática",
      "Alterações em exames laboratoriais hepáticos",
    ],
    preparation: JEJUM_6H,
    duration: "15 a 20 minutos",
    whatToBring: ["Pedido médico", "Exames laboratoriais recentes"],
  },
  {
    slug: "rins-vias-urinarias",
    legacySlug: "/rins",
    category: "Medicina Interna",
    title: "Rins e Vias Urinárias",
    thumb: thumbGeral,
    shortDesc:
      "Avaliação detalhada de rins, ureteres e bexiga.",
    longDesc:
      "Avalia rins, ureteres e bexiga, sendo essencial na investigação de cálculos, infecções e alterações do trato urinário.",
    indications: [
      "Cólica renal",
      "Infecções urinárias de repetição",
      "Hematúria",
    ],
    preparation: BEXIGA_CHEIA,
    duration: "20 a 30 minutos",
    whatToBring: ["Pedido médico", "Exames laboratoriais recentes"],
  },
  {
    slug: "pelvico-masculino",
    legacySlug: "/prostata",
    category: "Medicina Interna",
    title: "Pélvico Masculino (Próstata)",
    thumb: thumbGeral,
    shortDesc: "Avaliação de bexiga e próstata por via abdominal.",
    longDesc:
      "Avalia bexiga e próstata por via abdominal, com medição do resíduo pós-miccional.",
    indications: [
      "Alterações urinárias",
      "Aumento prostático",
      "Rastreamento de rotina masculina",
    ],
    preparation: BEXIGA_CHEIA,
    duration: "20 minutos",
    whatToBring: ["Pedido médico", "PSA recente, se disponível"],
  },
];

export const getExamBySlug = (slug: string) =>
  exams.find((e) => e.slug === slug);

/**
 * Resolve um exame a partir do pathname completo da URL.
 * Tenta casar primeiro pelo legacySlug (URL histórica preservada
 * para SEO), depois cai no slug novo via `/exames/:slug`.
 */
export const getExamByPath = (pathname: string): Exam | undefined => {
  if (!pathname) return undefined;
  // Normaliza removendo barra final (mas mantém a "/" raiz)
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  const byLegacy = exams.find((e) => e.legacySlug === normalized);
  if (byLegacy) return byLegacy;

  const examesPrefix = "/exames/";
  if (normalized.startsWith(examesPrefix)) {
    const slug = normalized.slice(examesPrefix.length);
    return getExamBySlug(slug);
  }
  return undefined;
};

export const getExamsByCategory = (category: ExamCategory) =>
  exams.filter((e) => e.category === category);

/**
 * Caminho canônico do exame. Sempre usa o legacySlug quando existir,
 * para preservar autoridade SEO e rastreamento de campanhas.
 */
export const canonicalPathFor = (exam: Exam): string =>
  exam.legacySlug ?? `/exames/${exam.slug}`;

export const categories: ExamCategory[] = [
  "Obstétrico",
  "Ginecológico",
  "Medicina Interna",
];
