import thumbObstetrico from "@/assets/exams/obstetrico.webp";
import thumbGinecologico from "@/assets/exams/ginecologico.webp";
import thumbGeral from "@/assets/exams/geral.webp";

// ---------- 1º Trimestre ----------
import primeiroTriHero from "@/assets/exams/primeiro-trimestre/hero.jpg";
import primeiroTriCcn from "@/assets/exams/primeiro-trimestre/ccn.jpg";
import primeiroTriVesicula from "@/assets/exams/primeiro-trimestre/vesicula.jpg";
import primeiroTriSaco from "@/assets/exams/primeiro-trimestre/saco.jpg";
import primeiroTriBatimentos from "@/assets/exams/primeiro-trimestre/batimentos.jpg";

// ---------- Translucência Nucal ----------
import tnHero from "@/assets/exams/translucencia-nucal/hero.jpg";

// ---------- Doppler ----------
import dopplerHero from "@/assets/exams/doppler/hero.jpg";

// ---------- Morfológico 1º Trimestre ----------
import morfo1Hero from "@/assets/exams/morfo-1-trimestre/hero.jpg";
import morfo1Nuca from "@/assets/exams/morfo-1-trimestre/nuca.jpg";
import morfo1Rins from "@/assets/exams/morfo-1-trimestre/rins.jpg";
import morfo1Diafragma from "@/assets/exams/morfo-1-trimestre/diafragma.jpg";
import morfo1Cerebro from "@/assets/exams/morfo-1-trimestre/cerebro.jpg";
import morfo1Maos from "@/assets/exams/morfo-1-trimestre/maos.jpg";
import morfo1Estomago from "@/assets/exams/morfo-1-trimestre/estomago.jpg";
import morfo1Femur from "@/assets/exams/morfo-1-trimestre/femur.jpg";
import morfo1Tricuspide from "@/assets/exams/morfo-1-trimestre/tricuspide.jpg";
import morfo1DuctoVenoso from "@/assets/exams/morfo-1-trimestre/ducto-venoso.jpg";
import morfo1Coluna from "@/assets/exams/morfo-1-trimestre/coluna.jpg";
import morfo1Engolindo from "@/assets/exams/morfo-1-trimestre/engolindo.jpg";

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
      "Rastreamento de cromossomopatias entre 12 e 13 semanas e 6 dias.",
    hero: {
      tagline: "Um olhar atento nas primeiras semanas.",
      intro:
        "A Translucência Nucal (TN) é uma pequena camada de líquido que se acumula na região da nuca do bebê. Essa medida é importante porque ajuda a identificar possíveis alterações cromossômicas, como síndrome de Down, síndrome de Edwards e síndrome de Patau.",
      image: tnHero,
    },
    sections: [
      {
        kind: "list",
        title: "Por que ele é tão importante?",
        items: [
          "Ajuda a calcular o risco de condições como Síndrome de Down, através da medida da nuca (TN), frequência cardíaca e idade materna.",
          "Permite ajustar a idade gestacional caso ainda haja dúvidas.",
          "Verifica a formação inicial do bebê, como braços e pernas.",
        ],
      },
      {
        kind: "paragraph",
        title: "Quando ele deve ser feito?",
        body:
          "O ultrassom com TN deve ser realizado entre 12 e 13 semanas e 6 dias de gestação, ou quando o bebê tem entre 4,5 e 8,5 cm da cabeça até o bumbum (chamado de CCN — Comprimento Cabeça-Nádegas).",
      },
      {
        kind: "paragraph",
        title: "E se a TN estiver alterada?",
        body:
          "Caso existam indícios que levem o médico a suspeitar que o bebê tenha risco aumentado de ter alguma síndrome, pode ser indicado seguir com exames que confirmem ou descartem a suspeita, como amniocentese, cariótipo ou NIPT, se for do desejo dos pais. É importante lembrar que outras condições fetais podem levar ao aumento da nuca: anemia, infecções, problemas metabólicos, doenças cardíacas ou simplesmente um período de adaptação do feto, que logo volta ao normal.",
      },
    ],
    faq: [
      {
        q: "Precisa de preparo para fazer o exame?",
        a: "Não é preciso jejum ou bexiga cheia.",
      },
      {
        q: "É seguro para o bebê?",
        a: "Sim! O ultrassom não utiliza raio-X.",
      },
      {
        q: "Preciso de um pedido médico para realizar o exame?",
        a: "Sim, o ultrassom com Translucência Nucal geralmente é solicitado pelo obstetra.",
      },
      {
        q: "Quanto tempo dura o ultrassom com TN?",
        a: "Não existe um tempo determinado, pois o médico depende inteiramente da posição do bebê e da necessidade de avaliações adicionais. Pode demorar 10 minutos ou 1 hora — vá com tempo e não agende compromissos logo depois.",
      },
    ],
  },
  {
    slug: "obstetrico-doppler",
    legacySlug: "/obstetrico-com-doppler",
    category: "Obstétrico",
    title: "Obstétrico com Doppler",
    thumb: thumbObstetrico,
    shortDesc:
      "Avaliação da circulação e bem-estar fetal.",
    hero: {
      tagline: "Avaliação da circulação e bem-estar fetal.",
      intro:
        "O ultrassom com Doppler é uma tecnologia que avalia o fluxo sanguíneo nas artérias da mãe e do bebê. Ele permite analisar a circulação sanguínea em tempo real, fornecendo informações valiosas sobre a troca de nutrientes e oxigênio entre a mãe e o bebê.",
      image: dopplerHero,
    },
    sections: [
      {
        kind: "list",
        title: "Quais as principais indicações?",
        items: [
          "Acompanhamento de gestações com restrição de crescimento intrauterino (CIUR), verificando se o bebê está recebendo oxigênio e nutrientes necessários — ajudando a definir intervenções ou até a antecipação do parto.",
          "Identificação de 60 a 70% das gestantes com risco aumentado de desenvolver pré-eclâmpsia.",
          "Rastreamento de anemia fetal através do estudo da Artéria Cerebral Média (ACM) — condição que pode ocorrer, por exemplo, em casos de incompatibilidade sanguínea (Rh) ou em síndromes de transfusão feto-fetal em gemelares.",
        ],
      },
      {
        kind: "paragraph",
        title: "Quando ele deve ser feito?",
        body:
          "Usualmente é pedido após 28 semanas, quando o bebê já é considerado viável (com mais chances de sobreviver ao nascimento). Pode ser solicitado antes das 28 semanas em situações específicas, como histórico de pré-eclâmpsia, restrição de crescimento ou outras condições de risco.",
      },
      {
        kind: "paragraph",
        title: "Por que realizar o exame?",
        body:
          "Porque ele é capaz de detectar sinais de sofrimento fetal ou restrição de crescimento, ajuda a identificar riscos de pré-eclâmpsia para que intervenções possam ser feitas, fornece informações essenciais para decidir o momento ideal para o parto e detecta condições precocemente, permitindo intervenções que salvam vidas.",
      },
      {
        kind: "paragraph",
        title: "Como ele é feito?",
        body:
          "Realizado com um ultrassom convencional, mas com a função Doppler ativada para analisar o fluxo dentro das artérias. As artérias uterinas avaliam o risco de pré-eclâmpsia e se o sangue materno está encontrando dificuldade de chegar até a placenta. A artéria umbilical indica se a placenta está conseguindo enviar oxigênio e nutrientes para o bebê. A artéria cerebral média mostra se o sangue do bebê está bem oxigenado e sem anemia.",
      },
    ],
    faq: [
      {
        q: "O exame é obrigatório em todas as gestações?",
        a: "Não, mas é altamente recomendado em gestações de alto risco ou quando há sinais de complicações. Sugere-se que ele seja realizado pelo menos uma vez no 3º trimestre, mesmo em gestações normais.",
      },
      {
        q: "Preciso de preparo para o exame?",
        a: "Não, o ultrassom com Doppler não exige nenhum preparo especial.",
      },
      {
        q: "Ele substitui o ultrassom morfológico?",
        a: "Não, cada exame tem finalidades diferentes. O Doppler avalia o fluxo sanguíneo, enquanto o morfológico analisa a anatomia do bebê. O Doppler das artérias uterinas pode ser realizado juntamente ao morfológico.",
      },
      {
        q: "Pode ser feito mais de uma vez na gravidez?",
        a: "Sim, pode ser repetido conforme a necessidade do médico para acompanhar a evolução da gestação.",
      },
    ],
  },
  {
    slug: "morfologico-1-trimestre",
    legacySlug: "/inicio/morfo-primeirotrimestre",
    category: "Obstétrico",
    title: "Morfológico do 1º Trimestre",
    thumb: thumbObstetrico,
    shortDesc:
      "Avaliação detalhada da anatomia fetal entre 12 e 13 semanas e 6 dias.",
    hero: {
      tagline: "O início de um acompanhamento essencial.",
      intro:
        "Exames morfológicos são exames mais detalhados, pois estudamos a morfologia (forma e tamanho) dos órgãos — avaliando se cada estrutura está com a forma adequada e com o tamanho dentro do esperado para a idade gestacional.",
      image: morfo1Hero,
    },
    sections: [
      {
        kind: "paragraph",
        title: "Por que ele é tão importante?",
        body:
          "O ultrassom morfológico do 1º trimestre é essencial para avaliar o desenvolvimento inicial do bebê, identificando possíveis malformações e calculando o risco de o bebê ter alguma síndrome, através da medida da translucência nucal e de outros marcadores (osso nasal, regurgitação da válvula tricúspide, ducto venoso etc). Ele também permite o rastreamento precoce da pré-eclâmpsia. Esse exame não faz diagnóstico de síndromes, apenas avalia se o bebê tem risco maior de tê-las.",
      },
      {
        kind: "paragraph",
        title: "Quando ele deve ser feito?",
        body:
          "O ultrassom morfológico do 1º trimestre deve ser feito quando o bebê tem entre 12 e 13 semanas e 6 dias, ou entre 4,5 e 8,4 cm da cabeça ao bumbum (comprimento cabeça-nádegas — CCN).",
      },
      {
        kind: "paragraph",
        title: "E se houver algum problema com o meu bebê?",
        body:
          "Caso existam indícios que levem o médico a suspeitar que o bebê tenha risco aumentado de ter alguma síndrome ou malformações complexas, pode ser indicada uma consulta com a Medicina Fetal, que orientará quais exames complementares devem ser feitos, se for do desejo dos pais. É importante lembrar que outras condições fetais podem levar ao aumento da nuca: anemia, infecções, problemas metabólicos, doenças cardíacas ou simplesmente um período de adaptação do feto, que logo volta ao normal. Nuca aumentada não é sinônimo de síndrome.",
      },
    ],
    gallery: [
      {
        image: morfo1Nuca,
        caption:
          "A famosa medida da \"nuca\". Um marcador de síndromes e malformação cardíaca.",
        alt: "Ultrassom mostrando a medida da translucência nucal",
      },
      {
        image: morfo1Rins,
        caption:
          "Os rins são vistos como duas imagens arredondadas e mais claras, ao lado da coluna.",
        alt: "Rins fetais vistos no ultrassom",
      },
      {
        image: morfo1Diafragma,
        caption:
          "O diafragma é o músculo que controla a respiração e já pode ser visto.",
        alt: "Diafragma fetal visto no ultrassom",
      },
      {
        image: morfo1Cerebro,
        caption:
          "Estruturas dentro da cabecinha do bebê que são os precursores da formação completa do cérebro.",
        alt: "Estruturas cerebrais fetais no ultrassom",
      },
      {
        image: morfo1Maos,
        caption:
          "Muitas vezes já conseguimos contar o número de dedos nas mãos.",
        alt: "Mãozinha do bebê com dedos visíveis no ultrassom",
      },
      {
        image: morfo1Estomago,
        caption:
          "A barriguinha do bebê, vista num corte transversal, onde já podemos ver o estômago.",
        alt: "Estômago fetal visto no ultrassom",
      },
      {
        image: morfo1Femur,
        caption:
          "Avaliamos a posição dos pés e medimos o fêmur, osso da coxa.",
        alt: "Medida do fêmur fetal no ultrassom",
      },
      {
        image: morfo1Tricuspide,
        caption:
          "Avaliação da válvula Tricúspide. Um marcador de síndromes e malformação cardíaca.",
        alt: "Avaliação da válvula tricúspide no ultrassom",
      },
      {
        image: morfo1DuctoVenoso,
        caption:
          "Avaliação do Ducto Venoso. Um marcador de síndromes e malformação cardíaca.",
        alt: "Avaliação do ducto venoso no ultrassom",
      },
      {
        image: morfo1Coluna,
        caption:
          "A coluna vertebral deve ser avaliada desde o pescoço até o seu final.",
        alt: "Coluna vertebral fetal vista no ultrassom",
      },
      {
        image: morfo1Engolindo,
        caption: "Bebê engolindo líquido durante o exame.",
        alt: "Bebê engolindo líquido amniótico durante o exame",
      },
    ],
    faq: [
      {
        q: "Ele é a mesma coisa que o ultrassom obstétrico com TN?",
        a: "Apesar de ambos medirem a nuca e fazerem o cálculo de risco de síndromes, não são o mesmo exame. O obstétrico com Translucência Nucal é um exame básico, mais simples. O morfológico é muito mais completo.",
      },
      {
        q: "Precisa de preparo para fazer o exame?",
        a: "Não é preciso jejum ou bexiga cheia.",
      },
      {
        q: "É seguro para o bebê?",
        a: "Sim! O ultrassom não utiliza raio-X.",
      },
      {
        q: "Preciso de um pedido médico para realizar o exame?",
        a: "Sim, o ultrassom morfológico geralmente é solicitado pelo obstetra, que orientará sobre o momento ideal para realizá-lo.",
      },
      {
        q: "Quanto tempo dura o ultrassom morfológico do 1º trimestre?",
        a: "Não existe um tempo determinado, pois o médico depende inteiramente da posição do bebê e da necessidade de avaliações adicionais. Vá com tempo e não agende compromissos logo depois.",
      },
    ],
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
