import thumbObstetrico from "@/assets/exams/obstetrico.webp";
import thumbGinecologico from "@/assets/exams/ginecologico.webp";
import thumbDoppler from "@/assets/exams/doppler.webp";
import thumbGeral from "@/assets/exams/geral.webp";
import thumbPediatrico from "@/assets/exams/pediatrico.webp";
import thumbTireoide from "@/assets/exams/tireoide.webp";

export type ExamCategory =
  | "Obstétrico"
  | "Ginecológico"
  | "Tireoide & Cervical"
  | "Doppler Vascular"
  | "Medicina Interna"
  | "Pediátrico";

export interface Exam {
  slug: string;
  category: ExamCategory;
  title: string;
  thumb: string;
  shortDesc: string;
  longDesc: string;
  indications: string[];
  preparation: string;
  duration: string;
  whatToBring: string[];
}

export const categoryThumbs: Record<ExamCategory, string> = {
  "Obstétrico": thumbObstetrico,
  "Ginecológico": thumbGinecologico,
  "Tireoide & Cervical": thumbTireoide,
  "Doppler Vascular": thumbDoppler,
  "Medicina Interna": thumbGeral,
  "Pediátrico": thumbPediatrico,
};

export const categoryDescriptions: Record<ExamCategory, string> = {
  "Obstétrico": "Acompanhamento gestacional completo, do primeiro ao último trimestre.",
  "Ginecológico": "Saúde da mulher avaliada com sensibilidade e precisão.",
  "Tireoide & Cervical": "Avaliação minuciosa da tireoide e estruturas do pescoço.",
  "Doppler Vascular": "Avaliação detalhada do fluxo sanguíneo em vasos e órgãos.",
  "Medicina Interna": "Ultrassonografias gerais para diagnóstico amplo e preciso.",
  "Pediátrico": "Atenção dedicada e cuidadosa para os pequenos pacientes.",
};

const SEM_PREPARO = "Não é necessário preparo específico para este exame.";
const BEXIGA_CHEIA =
  "Ingerir cerca de 4 copos de água 1h antes do exame, sem urinar até a realização.";
const JEJUM_6H = "Jejum de 6 horas (água é permitida).";

export const exams: Exam[] = [
  // ---------------- Obstétrico ----------------
  {
    slug: "obstetrico-simples",
    category: "Obstétrico",
    title: "Obstétrico Simples",
    thumb: thumbObstetrico,
    shortDesc:
      "Avaliação do desenvolvimento fetal, posição e batimentos cardíacos.",
    longDesc:
      "Exame de rotina que acompanha o crescimento do bebê, avalia posição, batimentos cardíacos, líquido amniótico e placenta. Recomendado em diferentes momentos da gestação.",
    indications: [
      "Acompanhamento de rotina da gestação",
      "Confirmação de vitalidade fetal",
      "Avaliação de crescimento e líquido amniótico",
    ],
    preparation: SEM_PREPARO,
    duration: "20 a 30 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores, se houver"],
  },
  {
    slug: "ultrassom-primeiro-trimestre-tv",
    category: "Obstétrico",
    title: "1º Trimestre (Transvaginal)",
    thumb: thumbObstetrico,
    shortDesc:
      "Confirmação precoce da gravidez e datação gestacional precisa.",
    longDesc:
      "Realizado por via transvaginal nas primeiras semanas, confirma a gravidez, localiza o saco gestacional e estima com precisão a idade gestacional.",
    indications: [
      "Confirmação inicial da gestação",
      "Datação precisa da idade gestacional",
      "Avaliação de gestações múltiplas",
    ],
    preparation: "Bexiga vazia. Sem necessidade de jejum.",
    duration: "20 minutos",
    whatToBring: ["Pedido médico", "Data da última menstruação"],
  },
  {
    slug: "obstetrico-translucencia-nucal",
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
    category: "Obstétrico",
    title: "Morfológico do 2º Trimestre",
    thumb: thumbObstetrico,
    shortDesc:
      "Avaliação completa da anatomia fetal entre 20 e 24 semanas.",
    longDesc:
      "Considerado o exame mais importante da gestação, avalia detalhadamente cada órgão e estrutura fetal, identificando malformações e marcadores genéticos.",
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

  // ---------------- Ginecológico ----------------
  {
    slug: "transvaginal",
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

  // ---------------- Tireoide & Cervical ----------------
  {
    slug: "tireoide",
    category: "Tireoide & Cervical",
    title: "Tireoide",
    thumb: thumbTireoide,
    shortDesc: "Avaliação completa da glândula tireoide e nódulos.",
    longDesc:
      "Avalia detalhadamente a glândula tireoide, identifica e classifica nódulos segundo critérios internacionais (TI-RADS).",
    indications: [
      "Nódulos palpáveis ou suspeitos",
      "Alterações em exames laboratoriais",
      "Acompanhamento de patologias tireoidianas",
    ],
    preparation: SEM_PREPARO,
    duration: "20 minutos",
    whatToBring: ["Pedido médico", "Exames de sangue e ultrassonografias anteriores"],
  },
  {
    slug: "vasos-cervicais",
    category: "Tireoide & Cervical",
    title: "Vasos Cervicais",
    thumb: thumbTireoide,
    shortDesc: "Avaliação das artérias carótidas e vertebrais.",
    longDesc:
      "Avalia com Doppler as artérias carótidas e vertebrais, identificando placas, estenoses e alterações do fluxo sanguíneo cerebral.",
    indications: [
      "Investigação de AVC e isquemias",
      "Rastreamento em pacientes de risco cardiovascular",
      "Sopros cervicais",
    ],
    preparation: SEM_PREPARO,
    duration: "30 minutos",
    whatToBring: ["Pedido médico", "Exames cardiológicos anteriores"],
  },
  {
    slug: "partes-moles-cervical",
    category: "Tireoide & Cervical",
    title: "Partes Moles Cervicais",
    thumb: thumbTireoide,
    shortDesc:
      "Avaliação de linfonodos, glândulas salivares e tecidos cervicais.",
    longDesc:
      "Examina linfonodos, glândulas salivares e demais estruturas cervicais, auxiliando no diagnóstico de processos inflamatórios e tumorais.",
    indications: [
      "Aumento de linfonodos cervicais",
      "Investigação de massas palpáveis",
      "Alterações nas glândulas salivares",
    ],
    preparation: SEM_PREPARO,
    duration: "20 minutos",
    whatToBring: ["Pedido médico"],
  },

  // ---------------- Doppler Vascular ----------------
  {
    slug: "doppler-membros-inferiores",
    category: "Doppler Vascular",
    title: "Doppler de Membros Inferiores",
    thumb: thumbDoppler,
    shortDesc: "Avaliação arterial e venosa das pernas.",
    longDesc:
      "Estuda o sistema arterial e venoso dos membros inferiores, identificando tromboses, varizes e doenças arteriais periféricas.",
    indications: [
      "Suspeita de trombose venosa profunda",
      "Varizes e insuficiência venosa",
      "Dor ou claudicação ao caminhar",
    ],
    preparation: SEM_PREPARO,
    duration: "30 a 45 minutos",
    whatToBring: ["Pedido médico", "Exames vasculares anteriores"],
  },
  {
    slug: "doppler-arterias-renais",
    category: "Doppler Vascular",
    title: "Doppler de Artérias Renais",
    thumb: thumbDoppler,
    shortDesc: "Avaliação do fluxo sanguíneo das artérias renais.",
    longDesc:
      "Avalia o fluxo das artérias renais, fundamental na investigação de hipertensão arterial de causa renovascular.",
    indications: [
      "Hipertensão de difícil controle",
      "Insuficiência renal em investigação",
      "Sopros abdominais",
    ],
    preparation: JEJUM_6H,
    duration: "30 a 45 minutos",
    whatToBring: ["Pedido médico", "Exames laboratoriais recentes"],
  },

  // ---------------- Medicina Interna ----------------
  {
    slug: "abdome-total",
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
    slug: "rins-vias-urinarias",
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
    category: "Medicina Interna",
    title: "Pélvico Masculino",
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
  {
    slug: "partes-moles",
    category: "Medicina Interna",
    title: "Partes Moles",
    thumb: thumbGeral,
    shortDesc:
      "Avaliação de pele, subcutâneo, músculos e estruturas superficiais.",
    longDesc:
      "Avalia lesões superficiais — pele, subcutâneo, músculos e estruturas próximas, auxiliando no diagnóstico de cistos, lipomas e processos inflamatórios.",
    indications: [
      "Nódulos palpáveis",
      "Cistos e lipomas",
      "Processos inflamatórios localizados",
    ],
    preparation: SEM_PREPARO,
    duration: "20 minutos",
    whatToBring: ["Pedido médico"],
  },

  // ---------------- Pediátrico ----------------
  {
    slug: "pelvico-infantil",
    category: "Pediátrico",
    title: "Pélvico Infantil",
    thumb: thumbPediatrico,
    shortDesc:
      "Avaliação das estruturas pélvicas em crianças e adolescentes.",
    longDesc:
      "Avalia bexiga, útero e ovários em meninas, com atenção especial ao desenvolvimento puberal e investigação de alterações.",
    indications: [
      "Investigação de puberdade precoce",
      "Dor abdominal pediátrica",
      "Alterações menstruais em adolescentes",
    ],
    preparation: BEXIGA_CHEIA,
    duration: "20 a 30 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores"],
  },
  {
    slug: "quadril-pediatrico",
    category: "Pediátrico",
    title: "Quadril Pediátrico",
    thumb: thumbPediatrico,
    shortDesc:
      "Rastreamento de displasia do desenvolvimento do quadril em bebês.",
    longDesc:
      "Exame fundamental no rastreamento de displasia do desenvolvimento do quadril em recém-nascidos e lactentes.",
    indications: [
      "Rastreamento neonatal de rotina",
      "Histórico familiar de displasia",
      "Apresentação pélvica ao nascimento",
    ],
    preparation: "Bebê alimentado e tranquilo.",
    duration: "20 minutos",
    whatToBring: ["Pedido médico", "Caderneta da criança"],
  },
  {
    slug: "abdome-infantil",
    category: "Pediátrico",
    title: "Abdome Infantil",
    thumb: thumbPediatrico,
    shortDesc:
      "Avaliação dos órgãos abdominais em crianças.",
    longDesc:
      "Avalia os órgãos abdominais em crianças, com técnica e abordagem adaptadas para o público pediátrico.",
    indications: [
      "Dor abdominal pediátrica",
      "Investigação de massas",
      "Alterações em exames laboratoriais",
    ],
    preparation: "Jejum de 4 horas para crianças acima de 2 anos.",
    duration: "20 a 30 minutos",
    whatToBring: ["Pedido médico", "Caderneta da criança"],
  },
];

export const getExamBySlug = (slug: string) =>
  exams.find((e) => e.slug === slug);

export const getExamsByCategory = (category: ExamCategory) =>
  exams.filter((e) => e.category === category);

export const categories: ExamCategory[] = [
  "Obstétrico",
  "Ginecológico",
  "Tireoide & Cervical",
  "Doppler Vascular",
  "Medicina Interna",
  "Pediátrico",
];
