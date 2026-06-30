import thumbObstetrico from "@/assets/exams/cat-obstetrico.webp";
import thumbGinecologico from "@/assets/exams/cat-ginecologico.webp";
import thumbGeral from "@/assets/exams/cat-medicina-interna.webp";
import thumbVascular from "@/assets/exams/cat-vascular.webp";
import thumbTireoide from "@/assets/exams/cat-tireoide.webp";
import thumbPediatrico from "@/assets/exams/cat-pediatrico.webp";

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
import morfo1Engolindo from "@/assets/exams/morfo-1-trimestre/hero.jpg";
import morfo1EngolindoVideo from "@/assets/exams/morfo-1-trimestre/engolindo.mp4";

// ---------- Morfológico 2º Trimestre ----------
import morfo2Hero from "@/assets/exams/morfo-2-trimestre/hero.jpg";
import morfo2Coluna from "@/assets/exams/morfo-2-trimestre/coluna.jpg";
import morfo2Arterias from "@/assets/exams/morfo-2-trimestre/arterias-abdome.jpg";
import morfo2Nasolabial from "@/assets/exams/morfo-2-trimestre/nasolabial.jpg";
import morfo2Maos from "@/assets/exams/morfo-2-trimestre/maos.jpg";
import morfo2Perfil from "@/assets/exams/morfo-2-trimestre/perfil.jpg";
import morfo2ExibindoVideo from "@/assets/exams/morfo-2-trimestre/exibindo.mp4";

// ---------- Morfológico 3º Trimestre ----------
import morfo3Hero from "@/assets/exams/morfo-3-trimestre/hero.jpg";

// ---------- Colo Uterino ----------
import coloNormal from "@/assets/exams/colo-uterino/normal.jpeg";
import coloCurto from "@/assets/exams/colo-uterino/curto.jpeg";
import coloMuitoCurto from "@/assets/exams/colo-uterino/muito-curto.jpeg";

// ---------- Cerclagem ----------
import cerclagemHero from "@/assets/exams/cerclagem/hero.jpeg";

// ---------- Transvaginal ----------
import tvHero from "@/assets/exams/transvaginal/hero.jpeg";
import tv3dHero from "@/assets/exams/transvaginal/hero-3d.jpeg";
import tvDopplerHero from "@/assets/exams/transvaginal/hero-doppler.webp";

// ---------- Rastreamento de Ovulação ----------
import ovulacaoHero from "@/assets/exams/ovulacao/hero.webp";

export type ExamCategory =
  | "Obstétrico"
  | "Ginecológico"
  | "Medicina Interna"
  | "Vascular"
  | "Tireóide e Cervical"
  | "Pediátrico";

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
  video?: string;
}

export interface ExamFaq {
  q: string;
  a: string;
}

export interface ExamHero {
  tagline: string;
  intro: string;
  image?: string;
  imageBg?: boolean;
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

  /** Título SEO (Yoast) do WordPress — usado no <title> da página. */
  seoTitle?: string;
  /** Meta descrição (Yoast) do WordPress. */
  seoDescription?: string;

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
  "Vascular": thumbVascular,
  "Tireóide e Cervical": thumbTireoide,
  "Pediátrico": thumbPediatrico,
};

export const categoryDescriptions: Record<ExamCategory, string> = {
  "Obstétrico": "Acompanhamento gestacional completo, do primeiro ao último trimestre.",
  "Ginecológico": "Saúde da mulher avaliada com sensibilidade e precisão.",
  "Medicina Interna": "Ultrassonografias gerais para diagnóstico amplo e preciso.",
  "Vascular": "Duplex e Doppler para artérias e veias com leitura precisa do fluxo.",
  "Tireóide e Cervical": "Avaliação detalhada da tireoide, cervical e glândulas salivares.",
  "Pediátrico": "Exames delicados e cuidadosos para bebês e crianças.",
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
    seoTitle: "Ultrassom 1º Trimestre | Dra. Morgana Kummer Sete Lagoas",
    seoDescription: "Ultrassom de 1º trimestre com precisão. Detecção de batimentos cardíacos, idade gestacional e malformações. Especialista em medicina fetal em Sete Lagoas.",
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
    seoDescription: "Ultrassom com translucência nucal para rastreamento de síndromes no 1º trimestre. Medição precisa e interpretação especializada. Agende em Sete Lagoas.",
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
    seoDescription: "Ultrassom obstétrico com Doppler para avaliação de fluxo sanguíneo e funcionamento placentário. Importante em gestações de alto risco. Especialista em Sete Lagoas.",
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
    seoDescription: "Ultrassom morfológico do 1º trimestre com rastreamento de síndromes e pré eclâmpsia. Medição de translucência nucal e marcadores cardíacos. Sete Lagoas.",
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
        video: morfo1EngolindoVideo,
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
    seoDescription: "Ultrassom morfológico do 2º trimestre com avaliação completa do bebê. Detecção de malformações e anatomia fetal. Especialista em medicina fetal em Sete Lagoas.",
    category: "Obstétrico",
    title: "Morfológico do 2º Trimestre",
    thumb: thumbObstetrico,
    shortDesc:
      "Avaliação minuciosa do desenvolvimento do bebê entre 21 e 24 semanas.",
    hero: {
      tagline: "Avaliação minuciosa do desenvolvimento do bebê.",
      intro:
        "Exames morfológicos são exames mais detalhados, pois estudamos a morfologia (forma e tamanho) dos órgãos — avaliando se cada estrutura está com a forma adequada e com o tamanho dentro do esperado para a idade gestacional.",
      image: morfo2Hero,
    },
    sections: [
      {
        kind: "paragraph",
        title: "Por que ele é tão importante?",
        body:
          "O ultrassom morfológico do 2º trimestre é crucial para avaliar detalhadamente a formação dos órgãos do bebê, identificando possíveis alterações estruturais. Algumas malformações têm possibilidade de tratamento cirúrgico ainda dentro do útero, por isso é fundamental o diagnóstico precoce. É um exame indispensável para garantir a saúde e o bem-estar da gestação.",
      },
      {
        kind: "paragraph",
        title: "Quando ele deve ser feito?",
        body:
          "Ele deve ser feito, preferencialmente, entre 21 e 24 semanas. É um período em que o bebê já está maior, permitindo avaliar com mais detalhes órgãos que eram muito pequenos na época do morfológico do 1º trimestre, como coração e cérebro. Em pacientes obesas, ele pode ser feito mais tardiamente, entre 25 e 26 semanas.",
      },
      {
        kind: "paragraph",
        title: "Quais os benefícios?",
        body:
          "Verifica o desenvolvimento de órgãos como cérebro, coração, rins e coluna, além de extremidades. Detecta malformações e condições que podem ser tratadas precocemente ou acompanhadas com mais atenção durante a gestação. Confirma o desenvolvimento saudável do bebê e proporciona segurança para a mãe e a família.",
      },
      {
        kind: "paragraph",
        title: "Quais exames podem ser associados a ele?",
        body:
          "O Doppler das Artérias Uterinas é fundamental para avaliar se a placenta está conseguindo receber sangue da mãe sem dificuldade, predizendo se a mãe tem risco aumentado de apresentar pré-eclâmpsia. A medida do [colo do útero](/colo-uterino) também é importante: através dela, vemos se a mãe tem risco aumentado de parto prematuro.",
      },
    ],
    gallery: [
      {
        image: morfo2Coluna,
        caption:
          "Coluna vertebral. Avaliação importante para descartar defeitos de fechamento.",
        alt: "Coluna vertebral fetal vista no ultrassom morfológico",
      },
      {
        image: morfo2Arterias,
        caption: "Avaliação das principais artérias do abdome fetal.",
        alt: "Artérias do abdome fetal no ultrassom com Doppler",
      },
      {
        image: morfo2Nasolabial,
        caption:
          "Região da boca e nariz, para avaliar se há lábio leporino.",
        alt: "Corte do nariz e lábios fetais no ultrassom",
      },
      {
        image: morfo2Maos,
        caption: "Avaliação das duas mãos, para contar os 10 dedinhos.",
        alt: "Mão fetal mostrando os cinco dedos no ultrassom",
      },
      {
        image: morfo2Perfil,
        caption:
          "Perfil facial. Avaliamos a presença e medida do osso nasal e algumas estruturas cerebrais.",
        alt: "Perfil facial fetal com 22 semanas no ultrassom",
      },
      {
        image: morfo2Perfil,
        video: morfo2ExibindoVideo,
        caption: "Bebê se exibindo 🙂",
        alt: "Vídeo do bebê se movimentando durante o exame",
      },
    ],
    faq: [
      {
        q: "É preciso fazer algum preparo?",
        a: "Não é necessário jejum ou bexiga cheia. Pedimos apenas que as mamães evitem passar óleos na barriga por 2 dias antes do exame, pois o óleo interfere na aquisição das imagens. E não ir de barriga vazia 🙂",
      },
      {
        q: "Por que medir o colo uterino?",
        a: "A medida do colo uterino ajuda a identificar riscos de parto prematuro. Se o colo for curto (<2,5 cm), o obstetra pode recomendar tratamentos preventivos, como o uso de progesterona ou cerclagem.",
      },
      {
        q: "O que é o Doppler das artérias uterinas e por que é importante?",
        a: "O Doppler avalia o fluxo sanguíneo nas artérias do útero. Caso o fluxo apresente resistência para chegar ao útero, aumenta o risco da mãe desenvolver condições como pré-eclâmpsia e restrição de crescimento fetal precoce (<32 semanas). Caso estejam alteradas, o obstetra pode iniciar medicações específicas para reduzir esses riscos, como a aspirina e o cálcio.",
      },
      {
        q: "Posso descobrir o sexo do meu bebê nesse exame?",
        a: "Sim, a maioria dos bebês mostra o sexo nesse exame. É muito difícil um bebê não mostrar, mas existe a possibilidade.",
      },
      {
        q: "Quanto tempo dura o ultrassom morfológico do 2º trimestre?",
        a: "Não existe um tempo determinado, pois o médico depende da posição do bebê e da necessidade de avaliações adicionais. Vá com tempo e não agende compromissos logo depois.",
      },
      {
        q: "O morfológico exclui a necessidade de realizar o ecocardiograma?",
        a: "Não, eles são exames diferentes. O ultrassom morfológico avalia a anatomia básica do coração, enquanto o ecocardiograma fetal foca no funcionamento, nos fluxos sanguíneos e nas válvulas cardíacas.",
      },
      {
        q: "Preciso de um pedido médico para realizar o exame?",
        a: "Sim, o ultrassom morfológico geralmente é solicitado pelo obstetra, pois é um dos principais da gestação.",
      },
      {
        q: "É possível detectar todas as condições do bebê com o ultrassom morfológico?",
        a: "Embora o exame seja mais detalhado, ele não é capaz de detectar 100% das alterações genéticas ou anomalias. Algumas condições podem exigir exames adicionais, como testes genéticos. Uma pequena porcentagem dos bebês que apresentam ultrassom normal terão alguma síndrome ou malformação diagnosticada após o parto (1:800).",
      },
      {
        q: "O exame é feito com imagem 3D?",
        a: "As imagens tridimensionais não fazem parte do exame nem do pré-natal. É um \"extra\", um \"plus\" do médico examinador. Basta o bebê estar numa posição favorável e a máquina de ultrassom ter a sonda 3D instalada.",
      },
    ],
  },
  {
    slug: "morfologico-3-trimestre",
    legacySlug: "/morfologico-do-3o-trimestre",
    seoDescription: "Ultrassom morfológico do 3º trimestre para avaliação do amadurecimento fetal. Bem-estar fetal, peso estimado e posicionamento. Especialistas em Sete Lagoas.",
    category: "Obstétrico",
    title: "Morfológico do 3º Trimestre",
    thumb: thumbObstetrico,
    shortDesc:
      "Avaliação do desenvolvimento do bebê na reta final da gestação.",
    hero: {
      tagline: "Avaliando o desenvolvimento do bebê na reta final.",
      intro:
        "Exames morfológicos são exames mais detalhados, pois estudamos a morfologia (forma e tamanho) dos órgãos — avaliando se cada estrutura está com a forma adequada e com o tamanho dentro do esperado para a idade gestacional.",
      image: morfo3Hero,
    },
    sections: [
      {
        kind: "paragraph",
        title: "Por que ele é tão importante?",
        body:
          "Este exame é uma avaliação detalhada que verifica o desenvolvimento do bebê na fase final da gestação. Ele analisa a anatomia fetal, a quantidade de líquido amniótico, a maturidade da placenta e outros aspectos importantes para garantir a saúde da mãe e do bebê. É útil para avaliar o desenvolvimento final do bebê e a maturação dos órgãos, especialmente cérebro, rins e intestino, procurando sinais de alterações que só aparecem no terceiro trimestre.",
      },
      {
        kind: "paragraph",
        title: "Quando ele deve ser feito?",
        body:
          "O ultrassom morfológico do 3º trimestre é geralmente realizado entre a 32ª e a 36ª semanas de gestação, ou conforme o grau de risco gestacional.",
      },
      {
        kind: "paragraph",
        title: "Ele avalia tudo como no morfológico do 2º trimestre?",
        body:
          "Com o passar da gestação, o bebê vai crescendo e dificultando a visualização de detalhes mais facilmente vistos no morfológico do 2º trimestre. Estruturas como os dedos, o ângulo perna-pé e a coluna vertebral podem não ser avaliadas como antes. Mesmo assim, o intuito principal desse exame é procurar por alterações cerebrais, cardíacas e do trato genito-urinário.",
      },
    ],
    faq: [
      {
        q: "O exame é obrigatório?",
        a: "Não é obrigatório, mas altamente recomendado pelo obstetra para garantir um acompanhamento completo.",
      },
      {
        q: "Precisa de preparo?",
        a: "Não, o ultrassom morfológico do 3º trimestre não exige preparo especial.",
      },
      {
        q: "O exame pode identificar o peso do bebê?",
        a: "Sim, o exame estima o peso e o tamanho do bebê com base nas medidas fetais.",
      },
      {
        q: "Pode ser realizado mais de uma vez?",
        a: "Sim, em gestações de alto risco, o exame pode ser repetido para monitorar o desenvolvimento do bebê.",
      },
      {
        q: "Quanto tempo dura?",
        a: "Não existe um tempo determinado, pois depende inteiramente da posição do bebê e da necessidade de avaliações adicionais. Vá com tempo e não agende compromissos logo depois.",
      },
    ],
  },
  {
    slug: "perfil-biofisico-fetal",
    legacySlug: "/pbf",
    seoDescription: "Perfil biofísico fetal para avaliação do bem-estar do bebê. Movimento fetal, movimentos respiratórios e líquido amniótico. Importante em 3º trimestre e nas gestações de risco. Agende em Sete Lagoas.",
    category: "Obstétrico",
    title: "Perfil Biofísico Fetal (PBF)",
    thumb: thumbObstetrico,
    shortDesc: "Avaliação da vitalidade fetal no terceiro trimestre.",
    longDesc:
      "Avalia a vitalidade do bebê através de cinco parâmetros: movimentos fetais, tônus, respiração, líquido amniótico e batimentos cardíacos.",
    hero: {
      tagline: "Avaliação do bem-estar fetal.",
      intro:
        "Ultrassom realizado para avaliar o bem-estar do bebê dentro do útero. Combina observações em tempo real com a medição da quantidade de líquido amniótico, ajudando a verificar se o bebê está recebendo oxigênio e nutrientes de forma adequada.",
      image: "/PBF.jpg",
      imageBg: true,
    },
    sections: [
      {
        kind: "paragraph",
        title: "Para que serve",
        body:
          "O objetivo do PBF é acompanhar a vitalidade do bebê, especialmente em gestações de risco — quando há suspeita de sofrimento fetal, hipertensão, diabetes gestacional, restrição de crescimento ou diminuição dos movimentos. É uma forma segura e não invasiva de garantir que o bebê esteja bem e possa continuar se desenvolvendo no útero com tranquilidade.",
      },
      {
        kind: "list",
        title: "Como é feito",
        items: [
          "Movimentos corporais do bebê",
          "Movimentos respiratórios (simulação da respiração)",
          "Tônus fetal — força e flexibilidade dos músculos",
          "Índice de líquido amniótico",
        ],
        footer:
          "Cada item recebe pontuação 0 (ausente) ou 2 (presente). O resultado final varia de 0 a 8.",
      },
      {
        kind: "list",
        title: "Como é interpretado",
        items: [
          "8/8 — resultado normal, indicando que o bebê está bem oxigenado.",
          "6/8 — resultado duvidoso; pode ser necessária cardiotocografia na maternidade para confirmar que está tudo bem.",
          "4/8 ou menos — resultado anormal, podendo indicar sofrimento fetal e exigindo avaliação médica imediata e, em alguns casos, antecipação do parto.",
        ],
      },
    ],
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
    seoTitle: "Ecocardiograma Fetal | Dra. Morgana Kummer Sete Lagoas",
    seoDescription: "Ecocardiograma fetal com especialista em medicina fetal. Avaliação completa do coração do bebê. Detecção de cardiopatias congênitas. Agende com Dr. Darlei em Sete Lagoas.",
    category: "Obstétrico",
    title: "Ecocardiograma Fetal",
    thumb: thumbObstetrico,
    shortDesc:
      "Avaliação detalhada da anatomia e função do coração do bebê.",
    longDesc:
      "Exame especializado que avalia em detalhes a anatomia e o funcionamento do coração fetal, fundamental para diagnóstico precoce de cardiopatias.",
    hero: {
      tagline: "Um exame que salva vidas.",
      intro:
        "O ecocardiograma fetal é um ultrassom especializado que avalia detalhadamente o coração do bebê ainda no útero. Estuda, além da anatomia, o funcionamento e o fluxo sanguíneo do coração fetal.",
      image: "/ecocard.jpg",
      imageBg: true,
    },
    sections: [
      {
        kind: "paragraph",
        title: "Por que é tão importante",
        body:
          "É fundamental para detectar anomalias cardíacas congênitas — as malformações mais comuns nos bebês. O diagnóstico precoce permite planejar intervenções no momento do nascimento, garantir o acompanhamento adequado durante a gestação e auxiliar na escolha do melhor local para o parto, caso seja necessário suporte médico especializado.",
      },
      {
        kind: "highlight",
        title: "Quando deve ser feito",
        body:
          "O rastreamento das cardiopatias é realizado entre 24 e 30 semanas de gestação, quando o coração do bebê está suficientemente desenvolvido para uma avaliação detalhada. Em casos específicos — suspeita de anomalias ou histórico familiar — o exame pode ser solicitado mais cedo ou repetido ao longo da gestação.",
      },
      {
        kind: "list",
        title: "Benefícios",
        items: [
          "Atendimento imediato ao nascer — algumas condições, como o Defeito do Septo Atrioventricular e a Tetralogia de Fallot, precisam ser tratadas logo após o parto.",
          "Mais preparo emocional para os pais, que podem se organizar e buscar informações com antecedência.",
          "Maior chance de recuperação do bebê quando o tratamento começa cedo.",
          "Menos complicações e custos de saúde no futuro.",
        ],
      },
      {
        kind: "highlight",
        title: "Indicação",
        body:
          "Indicado para todas as gestantes, especialmente para mães com diabetes, lúpus, gestação gemelar ou histórico familiar de cardiopatias.",
      },
    ],
    faq: [
      {
        q: "Quem deve realizar o ecocardiograma fetal?",
        a: "Ele é indicado para todas as gestantes, especialmente para mães com diabetes, lúpus, gestação gemelar ou histórico familiar de cardiopatias.",
      },
      {
        q: "O exame é seguro para o bebê e para a mãe?",
        a: "Sim. É um exame não invasivo e totalmente seguro, que utiliza a mesma tecnologia do ultrassom convencional.",
      },
      {
        q: "Quanto tempo dura o exame?",
        a: "Em média 1 hora, podendo variar conforme a posição do bebê.",
      },
      {
        q: "O ecocardiograma fetal substitui o ultrassom morfológico?",
        a: "Não. São exames diferentes: o morfológico avalia toda a formação e a anatomia do bebê, enquanto o ecocardiograma fetal foca no funcionamento do coração.",
      },
      {
        q: "O que acontece se for detectada uma alteração?",
        a: "O médico discute o diagnóstico com os pais e, se necessário, encaminha para acompanhamento com cardiologista pediátrico ou outros especialistas.",
      },
      {
        q: "Precisa de preparo para o exame?",
        a: "Não há preparo específico. A mãe pode comer e beber normalmente antes do exame.",
      },
    ],
    indications: [
      "Histórico familiar de cardiopatia",
      "Diabetes gestacional ou pré-existente",
      "Alterações em ultrassonografias anteriores",
    ],
    preparation: SEM_PREPARO,
    duration: "Cerca de 1 hora",
    whatToBring: ["Pedido médico", "Exames cardiológicos anteriores"],
  },
  {
    slug: "colo-uterino",
    legacySlug: "/colo-uterino",
    seoTitle: "Ultrassom de Colo Uterino | Dra. Morgana Kummer | Sete Lagoas",
    seoDescription: "Avaliação do colo uterino por ultrassom transvaginal. Medição de comprimento cervical e detecção de alterações. Importante em gestações de alto risco. Agende em Sete Lagoas.",
    category: "Obstétrico",
    title: "Medida do Colo Uterino (Cervicometria)",
    thumb: thumbObstetrico,
    shortDesc:
      "Avaliação transvaginal do comprimento do colo para risco de parto prematuro.",
    longDesc:
      "A cervicometria é o exame transvaginal que mede com precisão o comprimento do colo uterino durante a gestação. É fundamental para identificar pacientes com risco aumentado de parto prematuro e orientar conduta — incluindo a indicação de cerclagem ou uso de progesterona.",
    hero: {
      tagline: "Um exame que salva vidas.",
      intro:
        "O colo do útero é a parte inferior do útero que se conecta à vagina. Durante a gravidez, ele desempenha um papel crucial, funcionando como uma barreira protetora para o bebê.",
    },
    sections: [
      {
        kind: "paragraph",
        title: "Relação com o parto prematuro",
        body:
          "Existe relação direta entre a medida do colo do útero e o risco de prematuridade (nascimento antes de 37 semanas). O colo é considerado normal quando seu comprimento é maior que 2,5 cm e curto quando menor que 2,5 cm — colos curtos têm risco aumentado de parto antes da hora. Em algumas gestantes isso ocorre devido à incompetência cervical, condição em que o colo não consegue suportar o peso do bebê em crescimento.",
      },
      {
        kind: "highlight",
        title: "Quando deve ser realizado",
        body:
          "Pode ser realizado em qualquer período da gestação, mas para avaliar o risco de parto prematuro é recomendado entre 20 e 24 semanas, junto ao [Morfológico do 2º Trimestre](/morfologico-do-2-trimestre). Em casos específicos — histórico de complicações, incompetência ístmo-cervical ou gestação gemelar — pode ser feito antes, conforme orientação médica.",
      },
      {
        kind: "paragraph",
        title: "Por que é tão importante",
        body:
          "A prematuridade é a principal causa de morte fetal no mundo. A avaliação do colo monitora gestações de alto risco — como histórico de parto prematuro ou cirurgias uterinas (CAF) — e avalia a necessidade de intervenções como a [cerclagem](/cerclagem), procedimento que evita a dilatação precoce do colo. O exame identifica até 70% das mulheres que terão parto prematuro; ainda assim, cerca de 30% têm parto prematuro mesmo com exame normal.",
      },
      {
        kind: "list",
        title: "Como interpretar a medida",
        items: [
          "Colo normal — maior que 2,5 cm. Risco de prematuridade: 3%.",
          "Colo curto — menor que 2,5 cm. Risco de prematuridade: 20%.",
          "Colo muito curto — menor que 1,0 cm. Risco de prematuridade: 50%.",
        ],
      },
      {
        kind: "paragraph",
        title: "O toque não vê a mesma coisa?",
        body:
          "Infelizmente não. Pelo toque, o obstetra percebe se o orifício externo (o \"buraquinho\" de fora) está fechado e se o colo está macio ou duro. O ultrassom é o único meio de avaliar o orifício interno. Muitas vezes o toque está normal, mas o colo já está aberto por dentro — fenômeno chamado afunilamento. A identificação precoce do colo curto pode salvar a vida do bebê.",
      },
    ],
    gallery: [
      {
        image: coloNormal,
        alt: "Ultrassom de colo uterino normal",
        caption: "Colo normal — maior que 2,5 cm. Risco de prematuridade: 3%.",
      },
      {
        image: coloCurto,
        alt: "Ultrassom de colo uterino curto",
        caption: "Colo curto — menor que 2,5 cm. Risco de prematuridade: 20%.",
      },
      {
        image: coloMuitoCurto,
        alt: "Ultrassom de colo uterino muito curto",
        caption: "Colo muito curto — menor que 1,0 cm. Risco de prematuridade: 50%.",
      },
    ],
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
    title: "Cerclagem do Colo Uterino",
    thumb: thumbObstetrico,
    shortDesc:
      "Procedimento que reforça o colo do útero para reduzir o risco de parto prematuro.",
    longDesc:
      "A cerclagem é um procedimento cirúrgico em que uma sutura é colocada no colo uterino para reduzir o risco de parto prematuro em pacientes com incompetência istmo-cervical. O acompanhamento por ultrassom transvaginal — antes e ao longo da gestação — é fundamental para avaliar o comprimento do colo, a posição da sutura e a vitalidade fetal.",
    hero: {
      tagline: "Um reforço para proteger o bebê.",
      intro:
        "A cerclagem é um procedimento cirúrgico que coloca uma sutura ao redor do colo do útero, mantendo-o fechado durante a gestação. É indicada quando há risco aumentado de parto prematuro por incompetência ístmo-cervical (IIC), identificado na ultrassonografia ou CAFs prévias.",
      image: cerclagemHero,
    },
    sections: [
      {
        kind: "paragraph",
        title: "Quando é indicada",
        body:
          "Pode ser indicada em três situações principais: histórico de perdas gestacionais ou partos prematuros recorrentes no 2º trimestre, diagnóstico prévio de incompetência ístmo-cervical, ou identificação de colo uterino curto durante o acompanhamento da [cervicometria](/colo-uterino). A decisão é sempre individualizada pelo obstetra a partir do histórico clínico e dos achados ultrassonográficos.",
      },
      {
        kind: "highlight",
        title: "Quando é realizada",
        body:
          "Geralmente entre 12 e 24 semanas de gestação, conforme a indicação. Em casos eletivos (histórico de incompetência cervical), costuma ser feita no início do 2º trimestre. Em casos de colo curto detectado no ultrassom, pode ser indicada de forma terapêutica durante o acompanhamento.",
      },
      {
        kind: "list",
        title: "O papel do ultrassom",
        items: [
          "Antes do procedimento — confirma a indicação por meio da medida do colo e da avaliação anatômica.",
          "No planejamento — avalia a vitalidade fetal e descarta contraindicações.",
          "Após a cerclagem — acompanha o comprimento do colo acima da sutura, a posição da sutura e o bem-estar do bebê.",
        ],
      },
      {
        kind: "paragraph",
        title: "Cuidados após a cerclagem",
        body:
          "Após a cirurgia, o obstetra orienta o repouso adequado, restrições de atividade física e relações sexuais, além do acompanhamento clínico e ultrassonográfico mais frequente. A retirada da sutura habitualmente é realizada entre 36 e 37 semanas, preparando o organismo para o trabalho de parto natural.",
      },
    ],
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
    seoTitle: "Ultrassom Transvaginal | Dra. Morgana Kummer Sete Lagoas",
    seoDescription: "Ultrassom transvaginal para avaliação ginecológica completa. Diagnóstico de miomas, cistos e endometriose. Exame de alta precisão. Agende em Sete Lagoas.",
    category: "Ginecológico",
    title: "Transvaginal (Endovaginal)",
    thumb: thumbGinecologico,
    shortDesc: "Avaliação detalhada do útero, ovários e endométrio.",
    hero: {
      tagline: "Saúde ginecológica e gestacional",
      intro:
        "Exame de imagem com transdutor delicado inserido no canal vaginal, obtendo imagens detalhadas do útero, ovários, endométrio e colo do útero.",
      image: tvHero,
    },
    sections: [
      {
        kind: "list",
        title: "O que ele pode detectar",
        items: [
          "Útero: miomas, pólipos endometriais e malformações uterinas.",
          "Endométrio: espessura e saúde do revestimento, especialmente em sangramento anormal ou suspeita de hiperplasia.",
          "Ovários: cistos, tumores e Síndrome dos Ovários Policísticos (SOP).",
          "Infertilidade: monitoramento do ciclo, ovulação e condições que dificultam a concepção.",
          "Dor pélvica ou sangramento anormal: investigação da causa de sintomas persistentes.",
        ],
      },
      {
        kind: "list",
        title: "Principais indicações obstétricas",
        items: [
          "Confirmação da gravidez inicial — batimentos cardíacos e datação correta.",
          "Identificação de gravidez ectópica (fora do útero).",
          "Avaliação do colo do útero — predição de risco de parto prematuro.",
          "Monitoramento de sangramentos no início da gravidez.",
        ],
      },
      {
        kind: "paragraph",
        title: "Preparo",
        body:
          "Não há preparo específico. Recomenda-se esvaziar a bexiga antes do exame para maior conforto.",
      },
      {
        kind: "paragraph",
        title: "Como ele é realizado",
        body:
          "O transdutor é fino — muito menor do que o espéculo usado na prevenção. É revestido com preservativo estéril, recebe gel lubrificante e inserido com delicadeza na vagina.",
      },
    ],
    faq: [
      {
        q: "O exame dói?",
        a: "Geralmente é indolor. Pode causar leve desconforto durante a inserção do transdutor.",
      },
      {
        q: "Preciso de preparo para o exame?",
        a: "Apenas esvaziar a bexiga antes do exame, salvo orientações específicas do médico.",
      },
      {
        q: "Posso fazer o exame menstruada?",
        a: "Sim, a menstruação não interfere no exame.",
      },
      {
        q: "Gestantes podem fazer ultrassom transvaginal?",
        a: "Sim, especialmente no início da gravidez, para monitorar o desenvolvimento inicial do embrião e avaliar o colo do útero.",
      },
    ],
    preparation: "Esvaziar a bexiga antes do exame.",
    duration: "15 a 20 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores"],
  },
  {
    slug: "transvaginal-3d",
    legacySlug: "/tv-3d",
    seoTitle: "Ultrassom Transvaginal 3D | Dra. Morgana Kummer Sete Lagoas",
    seoDescription: "Ultrassom transvaginal 3D para visualização detalhada dos órgãos reprodutivos na identificação das malformações uterinas. Diagnóstico preciso de alterações ginecológicas. Especialista em Sete Lagoas.",
    category: "Ginecológico",
    title: "Transvaginal 3D",
    thumb: thumbGinecologico,
    shortDesc: "Visualização tridimensional do útero, com precisão de ressonância.",
    hero: {
      tagline: "Tecnologia tridimensional",
      intro:
        "Tecnologia avançada que reconstrói imagens tridimensionais dos órgãos reprodutivos femininos, com detalhamento superior do útero para diagnósticos ginecológicos e obstétricos mais completos.",
      image: tv3dHero,
    },
    sections: [
      {
        kind: "list",
        title: "O que ele pode detectar",
        items: [
          "Anomalias uterinas (septado, bicorno, unicorno, didelfo) com precisão semelhante à ressonância magnética.",
          "Planejamento cirúrgico de miomas e outras alterações.",
        ],
      },
      {
        kind: "paragraph",
        title: "Preparo",
        body:
          "Apenas esvaziar a bexiga logo antes do exame. Para avaliação de malformações, recomenda-se realizar entre o 15º e o 25º dia do ciclo (período secretor), em pacientes que não usam anticoncepcional. Quem usa pílula pode fazer em qualquer fase.",
      },
      {
        kind: "paragraph",
        title: "Como ele é realizado",
        body:
          "O transdutor, revestido com preservativo estéril e gel lubrificante, é inserido com delicadeza na vagina. A duração depende da complexidade das alterações.",
      },
    ],
    faq: [
      {
        q: "Qual a diferença para o transvaginal convencional?",
        a: "O convencional gera imagens em dois planos; o 3D reconstrói as imagens em três planos, com maior detalhamento e precisão.",
      },
      {
        q: "O exame dói?",
        a: "Geralmente é indolor. Pode causar leve desconforto durante a inserção do transdutor.",
      },
      {
        q: "O exame em 3D é seguro?",
        a: "Sim, é tão seguro quanto o convencional e não utiliza radiação.",
      },
      {
        q: "Quem deve realizar o ultrassom em 3D?",
        a: "Principalmente mulheres com suspeita de malformações uterinas ou histórico de infertilidade.",
      },
      {
        q: "Posso fazer em qualquer fase do ciclo menstrual?",
        a: "Sim, mas para avaliação do endométrio o ideal é o período secretor (entre o 15º e o 25º dia do ciclo).",
      },
    ],
    preparation: "Esvaziar a bexiga antes do exame.",
    duration: "20 a 30 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores"],
  },
  {
    slug: "ginecologico-doppler",
    legacySlug: "/transvaginal-com-doppler",
    seoTitle: "Ultrassom Transvaginal com Doppler | Sete Lagoas",
    seoDescription: "Ultrassom transvaginal com Doppler para avaliação de fluxo sanguíneo ovariano e uterino. Diagnóstico de cistos e tumores ovarianos. Especialista em Sete Lagoas.",
    category: "Ginecológico",
    title: "Transvaginal com Doppler",
    thumb: thumbGinecologico,
    shortDesc: "Avaliação do útero, ovários e do fluxo sanguíneo das estruturas pélvicas.",
    hero: {
      tagline: "Ultrassom + estudo vascular",
      intro:
        "Associa o transvaginal simples — que avalia útero e ovários — ao Doppler, que estuda os vasos sanguíneos (artérias) das estruturas pélvicas.",
      image: tvDopplerHero,
    },
    sections: [
      {
        kind: "paragraph",
        title: "O que ele pode detectar",
        body:
          "Identifica cistos, miomas e pólipos como o exame convencional, e ainda avalia se a estrutura está bem vascularizada ou apresenta vascularização anormal — informação fundamental para definir condutas e o tipo de cirurgia indicada.",
      },
      {
        kind: "list",
        title: "Principais indicações",
        items: [
          "Cistos complexos",
          "Tumores ovarianos",
          "Avaliação de vascularização de miomas",
        ],
      },
      {
        kind: "paragraph",
        title: "Preparo",
        body:
          "Não há preparo específico. Recomenda-se esvaziar a bexiga antes do exame para maior conforto.",
      },
      {
        kind: "paragraph",
        title: "Como ele é realizado",
        body:
          "O transdutor, revestido com preservativo estéril e gel lubrificante, é inserido com delicadeza na vagina.",
      },
    ],
    faq: [
      {
        q: "O exame dói?",
        a: "Geralmente é indolor. Pode causar leve desconforto durante a inserção do transdutor.",
      },
      {
        q: "Preciso de preparo para o exame?",
        a: "Apenas esvaziar a bexiga antes do exame, salvo orientação médica específica.",
      },
      {
        q: "Posso fazer o exame menstruada?",
        a: "Sim, a menstruação não interfere no exame.",
      },
    ],
    preparation: "Esvaziar a bexiga antes do exame.",
    duration: "30 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores"],
  },
  {
    slug: "rastreamento-ovulacao",
    legacySlug: "/rastreamento-de-ovulacao",
    seoDescription: "Rastreamento de ovulação para mulheres tentando engravidar. Monitoramento de folículos e ciclo menstrual. Aumenta chances de concepção. Agende em Sete Lagoas.",
    category: "Ginecológico",
    title: "Rastreamento de Ovulação",
    thumb: thumbGinecologico,
    shortDesc: "Acompanhamento seriado do ciclo ovulatório para concepção.",
    hero: {
      tagline: "Ajuda importante na infertilidade conjugal",
      intro:
        "Exame fundamental para monitorar o ciclo ovulatório, especialmente em mulheres que desejam engravidar ou estão em tratamento para infertilidade. Oferece informações precisas sobre o desenvolvimento dos folículos e o momento mais próximo da ovulação.",
      image: ovulacaoHero,
    },
    sections: [
      {
        kind: "paragraph",
        title: "Como o exame funciona",
        body:
          "Geralmente iniciamos entre o 8º e o 10º dia do ciclo menstrual (pode variar). O ultrassom monitora o crescimento dos folículos e a espessura do endométrio. São realizados de 3 a 5 exames com intervalos de 2 a 3 dias para identificar a ovulação. Com essa avaliação, o médico orienta o casal sobre o melhor momento para ter relações (coito programado).",
      },
      {
        kind: "paragraph",
        title: "Confirmação da ovulação",
        body:
          "O exame pode confirmar o rompimento do folículo e a formação do corpo lúteo, que indica que a ovulação ocorreu.",
      },
      {
        kind: "paragraph",
        title: "Como ele é realizado",
        body:
          "O transdutor, revestido com preservativo estéril e gel lubrificante, é inserido com delicadeza na vagina.",
      },
    ],
    faq: [
      {
        q: "Quantas sessões de ultrassom são necessárias?",
        a: "Geralmente de 3 a 4 exames, dependendo do ciclo e do tratamento.",
      },
      {
        q: "O exame é doloroso?",
        a: "Não. O transvaginal é indolor — pode causar leve desconforto, mas é muito bem tolerado.",
      },
      {
        q: "O rastreamento é indicado para todas as mulheres?",
        a: "Não. É indicado para mulheres em tratamento de fertilidade ou com dificuldade para engravidar.",
      },
      {
        q: "Como o exame ajuda em tratamentos de fertilidade?",
        a: "Identifica o momento mais próximo da ovulação, ajudando a programar relações sexuais, inseminações ou a coleta de óvulos.",
      },
      {
        q: "É necessário jejum ou algum preparo?",
        a: "Não, o exame não exige preparo especial.",
      },
    ],
    preparation: "Sem preparo específico. Realizado em datas pré-definidas do ciclo.",
    duration: "15 minutos por sessão (3 a 5 sessões)",
    whatToBring: ["Pedido médico", "Histórico do ciclo menstrual"],
  },
  {
    slug: "endometriose-profunda",
    category: "Ginecológico",
    title: "Pesquisa de Endometriose Profunda",
    thumb: thumbGinecologico,
    shortDesc: "Ultrassom transvaginal com preparo intestinal — exame de escolha para diagnóstico e estadiamento.",
    hero: {
      tagline: "Diagnóstico e estadiamento da endometriose profunda",
      intro:
        "O ultrassom transvaginal com preparo intestinal — também chamado de mapeamento de endometriose — é o exame de escolha para diagnosticar e estadiar a endometriose profunda. Fornece um mapa detalhado da pelve, identificando a localização exata, o tamanho e a extensão das lesões.",
    },
    sections: [
      {
        kind: "paragraph",
        title: "Diferencial",
        body:
          "Diferente do ultrassom pélvico comum, este é um exame multiparamétrico, que avalia em detalhe útero, ovários, trompas, bexiga, ligamentos, nervos pélvicos e o intestino.",
      },
      {
        kind: "paragraph",
        title: "Preparo",
        body:
          "Exige preparo na véspera (dieta leve e uso de laxantes) e limpeza retal no dia do exame. Esse cuidado esvazia o intestino e permite que a médica visualize até as menores lesões infiltrativas.",
      },
      {
        kind: "paragraph",
        title: "Como é realizado",
        body:
          "Feito com transdutor transvaginal e dura de 40 minutos a 1 hora. Durante o procedimento são realizadas manobras de deslizamento e compressão para verificar a mobilidade dos órgãos e identificar aderências.",
      },
      {
        kind: "list",
        title: "O que ele avalia",
        items: [
          "Focos profundos: nódulos que invadem tecidos ou órgãos adjacentes, como vagina, bexiga e reto.",
          "Aderências pélvicas: detecta se os órgãos estão “grudados” uns aos outros (ex.: útero preso ao intestino).",
          "Endometriomas: cistos de endometriose nos ovários e presença de adenomiose (endometriose na parede do útero).",
          "Trato urinário: avalia rins e ureteres para descartar obstruções causadas pela doença.",
        ],
      },
      {
        kind: "highlight",
        title: "Alta precisão",
        body:
          "Quando realizado por especialista, possui sensibilidade entre 95% e 100% para identificar a doença.",
      },
      {
        kind: "paragraph",
        title: "Planejamento cirúrgico",
        body:
          "É indispensável antes de qualquer cirurgia. Saber exatamente onde estão todas as lesões e qual a espessura delas permite ao cirurgião reunir a equipe médica adequada e definir a melhor técnica para a retirada completa dos focos.",
      },
    ],
    preparation:
      "Preparo intestinal na véspera (dieta leve e laxantes) e limpeza retal no dia do exame. Orientações detalhadas enviadas no agendamento.",
    duration: "40 minutos a 1 hora",
    whatToBring: ["Pedido médico", "Exames e laudos anteriores"],
  },
  {
    slug: "perineo",
    legacySlug: "/ultrassom-perineal",
    seoTitle: "Ultrassom PERINEO 3D - Assoalho Pélvico | Sete Lagoas",
    seoDescription: "Ultrassom tridimensional do períneo e assoalho pélvico. Diagnóstico de disfunções, incontinência e prolapso. Avaliação especializada em Sete Lagoas.",
    category: "Ginecológico",
    title: "Ultrassom Perineal",
    thumb: thumbGinecologico,
    shortDesc: "Avaliação completa e dinâmica do assoalho pélvico feminino.",
    hero: {
      tagline: "Avaliação do assoalho pélvico feminino",
      intro:
        "Exame especializado que avalia, de forma precisa e dinâmica, as estruturas do assoalho pélvico. Imagens tridimensionais em tempo real permitem o estudo anatômico e funcional de músculos, esfíncteres e órgãos pélvicos — fundamental no diagnóstico e acompanhamento de disfunções uroginecológicas.",
    },
    sections: [
      {
        kind: "list",
        title: "Indicações clínicas",
        items: [
          "Diagnóstico de prolapsos vaginais (uretrocele, retocele, enterocele e uterocele).",
          "Avaliação de roturas perineais e esfincterianas, especialmente no pós-parto.",
          "Vulvodínea — dor na vulva.",
          "Investigação de incontinência urinária ou fecal.",
          "Avaliação pré e pós-operatória em pacientes com sling uretral.",
          "Estudo de disfunções do assoalho pélvico em geral.",
        ],
      },
      {
        kind: "paragraph",
        title: "Como o exame é realizado",
        body:
          "Realizado com sonda endovaginal 3D, de forma confortável. Durante o procedimento são feitas manobras em repouso e de Valsalva, permitindo avaliar o comportamento das estruturas pélvicas em diferentes situações de pressão e esforço. O exame dura, em média, 20 a 30 minutos.",
      },
      {
        kind: "paragraph",
        title: "É necessário preparo intestinal?",
        body:
          "Sim — preparo intestinal leve, sem uso de laxantes, apenas para reduzir gases e melhorar a visualização das estruturas. Para avaliação de nódulos no períneo, não é necessário preparo.",
      },
    ],
    preparation:
      "Preparo intestinal leve (sem laxantes). Para avaliação de nódulos, não há preparo.",
    duration: "20 a 30 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores"],
  },

  // ---------------- Medicina Interna ----------------
  {
    slug: "abdome-total",
    legacySlug: "/abdome-total",
    seoTitle: "Ultrassom de Abdome Total | Dra. Morgana Kummer Sete Lagoas",
    seoDescription: "Ultrassom completo do abdômen com avaliação de fígado, vesícula, pâncreas e rins. Exame rápido e preciso. Agende com especialista em Sete Lagoas.",
    category: "Medicina Interna",
    title: "Abdome Total",
    thumb: thumbGeral,
    shortDesc:
      "Avaliação completa dos órgãos abdominais e pelve.",
    longDesc:
      "Avalia fígado, vesícula, vias biliares, pâncreas, baço, rins, bexiga e estruturas pélvicas em um único exame.",
    hero: {
      tagline: "Avaliação completa dos órgãos abdominais.",
      intro:
        "Examina a maioria dos órgãos do abdome — fígado, rins, aorta, pâncreas, vesícula biliar, baço e bexiga. Não é o exame indicado para avaliar estômago e intestino, que são vistos apenas parcialmente.",
      image: "/abdome.jpg",
      imageBg: true,
    },
    sections: [
      {
        kind: "list",
        title: "O que ele pode detectar",
        items: [
          "Fígado e vesícula — cirrose, esteatose, cálculo (pedra), tumores e pólipos.",
          "Rins — cálculos, cistos, tumores, hidronefrose e malformações congênitas.",
          "Pâncreas — pancreatite, cistos e tumores.",
          "Baço — esplenomegalia, tumores e cistos.",
          "Aorta — aneurismas e trombose.",
          "Bexiga — cálculos e tumores.",
        ],
      },
      {
        kind: "paragraph",
        title: "Importância do diagnóstico",
        body:
          "O ultrassom de abdome total é essencial para detectar essas patologias de forma precoce, permitindo tratamentos mais rápidos e eficazes. Também ajuda a monitorar condições crônicas e orienta o médico para exames complementares, quando necessário.",
      },
      {
        kind: "list",
        title: "Preparo",
        items: [
          "Jejum de 8 horas.",
          "Última refeição na véspera entre 20h e 22h: dieta leve — sopa de vegetais (exceto batata-doce e repolho), frutas, chá com bolacha água-e-sal. Evitar refrigerante, leite e derivados, pão, doces e alimentos gordurosos.",
          "Tomar 4 copos de água 2 horas antes do exame e não esvaziar a bexiga até a realização (salvo orientação médica).",
          "Dimeticona ou Simeticona — 40 gotas ou 1 comprimido de 6/6 horas durante toda a véspera; mais 40 gotas ou 1 comprimido em jejum no dia do exame.",
        ],
        footer:
          "Crianças e exames realizados à tarde têm preparo diferenciado — entre em contato com a secretária. Pacientes em uso de sonda vesical devem fechá-la 1 a 2 horas antes do exame.",
      },
    ],
    indications: [
      "Dor abdominal",
      "Rastreamento de rotina",
      "Alterações em exames laboratoriais",
    ],
    duration: "30 a 45 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores"],
  },
  {
    slug: "abdome-superior",
    legacySlug: "/abdome-superior",
    seoTitle: "Ultrassom de Abdome Superior | Dra. Morgana Kummer",
    seoDescription: "Ultrassom de abdome superior para avaliar fígado, vesícula e pâncreas. Rápido, preciso e sem preparo. Agende com especialista em Sete Lagoas.",
    category: "Medicina Interna",
    title: "Abdome Superior",
    thumb: thumbGeral,
    shortDesc:
      "Avaliação de fígado, vesícula, pâncreas e baço.",
    longDesc:
      "Avalia os órgãos do andar superior do abdome — fígado, vesícula, vias biliares, pâncreas e baço.",
    hero: {
      tagline: "Foco na parte superior do abdome.",
      intro:
        "Examina a parte superior do abdome — fígado, vesícula biliar, pâncreas e baço. Não incluem-se neste exame rins, bexiga, intestino e aorta.",
      image: "/figado.png",
      imageBg: true,
    },
    sections: [
      {
        kind: "list",
        title: "O que ele pode detectar",
        items: [
          "Fígado — cirrose, esteatose hepática e tumores.",
          "Vesícula biliar — cálculos (pedras), pólipos e tumores.",
          "Pâncreas — pancreatite, cistos e tumores.",
          "Baço — esplenomegalia, cistos e tumores.",
        ],
      },
      {
        kind: "paragraph",
        title: "Importância do diagnóstico",
        body:
          "Permite detectar essas patologias de forma precoce, favorecendo tratamentos mais rápidos e eficazes. Também ajuda a monitorar condições crônicas e a orientar o médico para exames complementares quando necessário.",
      },
      {
        kind: "list",
        title: "Preparo",
        items: [
          "Jejum de 8 horas.",
          "Última refeição na véspera entre 20h e 22h: dieta leve — sopa de legumes (exceto batata-doce), verduras (exceto repolho e couve-flor), frutas, chá com bolacha água-e-sal. Evitar refrigerante, água com gás, sucos, leite e derivados, pão, macarrão, ovo, doces e alimentos gordurosos.",
          "Não é necessário tomar água nem manter a bexiga cheia.",
        ],
      },
    ],
    indications: [
      "Dor em região superior do abdome",
      "Investigação de cálculos biliares",
      "Alterações hepáticas",
    ],
    duration: "20 a 30 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores"],
  },
  {
    slug: "hipocondrio-direito",
    legacySlug: "/hipoc-dir",
    seoTitle: "Ultrassom Hipocôndrio Direito | Dra. Morgana Kummer Sete Lagoas",
    seoDescription: "Ultrassom de hipocôndrio direito para avaliar fígado, vesícula e vias biliares. Exame de imagem rápido e preciso. Agende com especialista em Sete Lagoas.",
    category: "Medicina Interna",
    title: "Hipocôndrio Direito",
    thumb: thumbGeral,
    shortDesc:
      "Avaliação focada de fígado e vesícula biliar.",
    longDesc:
      "Ultrassonografia direcionada à região do hipocôndrio direito, com avaliação detalhada de fígado e vesícula biliar.",
    hero: {
      tagline: "Avaliação focada do fígado e vesícula.",
      intro:
        "Examina apenas a parte direita e superior do abdome, compreendendo o fígado e a vesícula biliar.",
      image: "/figado.png",
      imageBg: true,
    },
    sections: [
      {
        kind: "list",
        title: "O que ele pode detectar",
        items: [
          "Cirrose e esteatose hepática.",
          "Cálculo (pedra) na vesícula.",
          "Tumores e pólipos.",
        ],
      },
      {
        kind: "paragraph",
        title: "Importância do diagnóstico",
        body:
          "Normalmente é solicitado quando o paciente apresenta sintomas de pedra na vesícula ou está com icterícia (\"amarelão\"). A partir dele, o médico assistente consegue priorizar qual o melhor tratamento — medicamentoso ou cirúrgico.",
      },
      {
        kind: "list",
        title: "Preparo",
        items: [
          "Jejum de 8 horas.",
          "Última refeição na véspera entre 20h e 22h: dieta leve — sopa de legumes (exceto batata-doce), verduras (exceto repolho e couve-flor), frutas, chá com bolacha água-e-sal. Evitar refrigerante, água com gás, sucos, leite e derivados, pão, macarrão, ovo, doces e alimentos gordurosos.",
          "Não é necessário tomar água nem manter a bexiga cheia.",
        ],
      },
    ],
    indications: [
      "Dor no hipocôndrio direito",
      "Suspeita de colelitíase (cálculos na vesícula)",
      "Acompanhamento de esteatose hepática",
      "Alterações em exames laboratoriais hepáticos",
    ],
    duration: "15 a 20 minutos",
    whatToBring: ["Pedido médico", "Exames laboratoriais recentes"],
  },
  {
    slug: "rins-vias-urinarias",
    legacySlug: "/rins",
    seoTitle: "Ultrassom de Rins e Vias Urinárias | Sete Lagoas",
    seoDescription: "Ultrassom de rins e vias urinárias para diagnóstico de cálculos e alterações. Exame rápido e sem radiação. Agende com especialista em Sete Lagoas.",
    category: "Medicina Interna",
    title: "Rins e Vias Urinárias",
    thumb: thumbGeral,
    shortDesc:
      "Avaliação detalhada de rins, ureteres e bexiga.",
    longDesc:
      "Avalia rins, ureteres e bexiga, sendo essencial na investigação de cálculos, infecções e alterações do trato urinário.",
    hero: {
      tagline: "Investigação completa do trato urinário.",
      intro:
        "Examina os rins direito e esquerdo, os ureteres e a bexiga. Normalmente solicitado diante de forte suspeita de pedra nos rins ou sangramento identificado no exame de urina.",
      image: "/rins.jpg",
      imageBg: true,
    },
    sections: [
      {
        kind: "list",
        title: "O que ele pode detectar",
        items: [
          "Cálculos (pedras) nos rins e na bexiga.",
          "Cistos e tumores.",
          "Hidronefrose.",
          "Malformações congênitas e megaureter.",
        ],
      },
      {
        kind: "paragraph",
        title: "Importância do diagnóstico",
        body:
          "Essencial para detectar essas patologias e permitir tratamentos mais rápidos e eficazes. Também ajuda a monitorar condições crônicas e a orientar o médico para exames complementares, quando necessário.",
      },
      {
        kind: "list",
        title: "Preparo",
        items: [
          "Tomar 4 copos de água 2 horas antes do exame.",
          "Não esvaziar a bexiga até a realização do exame, salvo orientação médica.",
        ],
        footer:
          "Pacientes em uso de sonda vesical devem fechá-la 1 hora antes do exame.",
      },
    ],
    indications: [
      "Cólica renal",
      "Infecções urinárias de repetição",
      "Hematúria",
    ],
    duration: "20 a 30 minutos",
    whatToBring: ["Pedido médico", "Exames laboratoriais recentes"],
  },
  {
    slug: "pelvico-masculino",
    legacySlug: "/prostata",
    seoTitle: "Ultrassom de Próstata | Dra. Morgana Kummer Sete Lagoas",
    seoDescription: "Ultrassom de próstata para diagnóstico de alterações e acompanhamento. Exame não invasivo e preciso. Agende com especialista em Sete Lagoas.",
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

  // ---------------- Ginecológico (complementos) ----------------
  {
    slug: "mamas-axilas",
    legacySlug: "/mamas",
    category: "Ginecológico",
    title: "Mamas e Axilas",
    thumb: thumbGinecologico,
    shortDesc:
      "Investigação detalhada da mama e cadeias axilares — complemento à mamografia ou exame de escolha em mamas densas e pacientes jovens.",
    hero: {
      tagline: "Investigação detalhada da mama e cadeias axilares",
      intro:
        "Ultrassonografia das mamas e axilas realizada com transdutor de alta frequência, indicada como complemento à mamografia ou como exame de primeira linha em pacientes jovens, mamas densas, gestantes e lactantes. Permite caracterizar nódulos, cistos e linfonodos com precisão e conforto.",
    },
    sections: [
      {
        kind: "paragraph",
        title: "Para que serve",
        body:
          "Indicado como complemento à mamografia, na investigação de nódulos palpáveis, mastalgia, secreção mamilar e em situações em que a mamografia tem sensibilidade limitada — como mamas densas, pacientes jovens, gestantes e lactantes. Também útil no acompanhamento de cistos, próteses e linfonodos axilares.",
      },
      {
        kind: "list",
        title: "O que o exame avalia",
        items: [
          "Nódulos sólidos e císticos com classificação BI-RADS",
          "Cadeias linfonodais axilares e supraclaviculares",
          "Ductos mamários e processos inflamatórios",
          "Próteses mamárias — integridade e contorno",
          "Áreas palpáveis e alterações já identificadas em mamografia",
        ],
      },
      {
        kind: "paragraph",
        title: "Como é realizado",
        body:
          "A paciente fica deitada, com o braço elevado. Com gel morno e transdutor de alta frequência, é feita a varredura completa das duas mamas e das axilas. O exame é totalmente indolor, não invasivo e sem radiação.",
      },
      {
        kind: "paragraph",
        title: "Preparo",
        body:
          "Não é necessário preparo específico. Recomenda-se evitar o uso de cremes, talcos e desodorantes na região das mamas e axilas no dia do exame.",
      },
      {
        kind: "highlight",
        title: "Quando indicar",
        body:
          "Pode ser solicitado a partir dos 25–30 anos como avaliação inicial, em qualquer idade para investigação de alterações palpáveis, ou conforme orientação do médico assistente.",
      },
    ],
    preparation: SEM_PREPARO,
    duration: "20 a 30 minutos",
    whatToBring: [
      "Pedido médico",
      "Mamografia recente, se houver",
      "Exames e laudos anteriores",
    ],
  },


  // ---------------- Medicina Interna (complementos) ----------------
  {
    slug: "pelvico-infantil",
    legacySlug: "/pelvico-infantil",
    category: "Pediátrico",
    title: "Pélvico Infantil",
    thumb: thumbPediatrico,
    shortDesc:
      "Avaliação delicada de útero e ovários e investigação de puberdade precoce em meninas.",
    hero: {
      tagline: "Avaliação pélvica pediátrica com acolhimento",
      intro:
        "O ultrassom pélvico infantil é realizado por via abdominal, de forma totalmente não invasiva, para avaliar útero e ovários em meninas e investigar sinais de puberdade precoce. Um exame acolhedor, indolor e conduzido com toda a sensibilidade que a paciente pediátrica merece.",
    },
    sections: [
      {
        kind: "paragraph",
        title: "Para que serve",
        body:
          "Indicado para avaliar a anatomia e o desenvolvimento do útero e dos ovários em meninas, esclarecer queixas como dor pélvica, sangramento vaginal precoce ou alterações no desenvolvimento puberal, e auxiliar no diagnóstico e acompanhamento da puberdade precoce.",
      },
      {
        kind: "list",
        title: "O que o exame avalia",
        items: [
          "Tamanho, formato e volume do útero",
          "Espessura e padrão do endométrio",
          "Volume ovariano e presença de folículos",
          "Sinais ultrassonográficos compatíveis com puberdade precoce",
          "Cistos, malformações e outras alterações pélvicas",
        ],
      },
      {
        kind: "paragraph",
        title: "Como é realizado",
        body:
          "O exame é feito exclusivamente por via abdominal — sem qualquer contato interno — com a bexiga cheia, que funciona como uma janela acústica natural para visualizar os órgãos pélvicos. A paciente permanece deitada e acompanhada por um responsável durante todo o exame.",
      },
      {
        kind: "paragraph",
        title: "Preparo",
        body:
          "É necessário estar com a bexiga cheia. Orientação: ingerir 4 copos de água 1 hora antes do exame e não urinar até a sua realização. Para crianças menores, ajustamos o volume conforme a idade — orientações detalhadas são enviadas no agendamento.",
      },
      {
        kind: "highlight",
        title: "Cuidado humanizado",
        body:
          "Todo o atendimento é pensado para o conforto da criança e da família: linguagem acolhedora, ritmo respeitoso e a presença do responsável durante todo o exame.",
      },
    ],
    preparation: BEXIGA_CHEIA,
    duration: "20 a 30 minutos",
    whatToBring: [
      "Pedido médico",
      "Exames e laudos anteriores, se houver",
      "Documento da criança",
    ],
  },
  {
    slug: "partes-moles",
    legacySlug: "/partes-moles",
    category: "Medicina Interna",
    title: "Partes Moles",
    thumb: thumbGeral,
    shortDesc: "Investigação de nódulos, cistos e lesões superficiais.",
    longDesc:
      "Avaliação ultrassonográfica de tecidos superficiais (pele, subcutâneo, músculos), útil para caracterizar nódulos, cistos, lipomas e processos inflamatórios.",
    preparation: SEM_PREPARO,
    duration: "20 minutos",
    whatToBring: ["Pedido médico", "Indicação da região a ser avaliada"],
  },

  // ---------------- Vascular ----------------
  {
    slug: "duplex-scan-mmii",
    legacySlug: "/duplex-scan",
    category: "Vascular",
    title: "Duplex Scan dos Membros Inferiores",
    thumb: thumbVascular,
    shortDesc:
      "Doppler colorido das artérias e veias dos membros inferiores — varizes, trombose e doença arterial.",
    hero: {
      tagline: "Doppler colorido das artérias e veias dos membros inferiores",
      intro:
        "Exame não invasivo que combina ultrassonografia e Doppler colorido para avaliar, em tempo real, o fluxo sanguíneo nas artérias e veias das pernas. Fundamental no diagnóstico de varizes, insuficiência venosa, trombose venosa profunda e doença arterial periférica.",
    },
    sections: [
      {
        kind: "paragraph",
        title: "Para que serve",
        body:
          "Indicado na investigação de varizes e insuficiência venosa crônica, suspeita de trombose venosa profunda (TVP), dor e inchaço nas pernas, claudicação, doença arterial periférica e no planejamento e seguimento de cirurgias vasculares.",
      },
      {
        kind: "list",
        title: "O que o exame avalia",
        items: [
          "Sistema venoso superficial e profundo",
          "Refluxo venoso e válvulas insuficientes",
          "Presença de trombos agudos ou crônicos",
          "Fluxo arterial, placas e estenoses",
          "Mapeamento pré e pós-operatório",
        ],
      },
      {
        kind: "paragraph",
        title: "Como é realizado",
        body:
          "A avaliação venosa é feita com a paciente em pé (com manobras provocativas para detectar refluxo) e deitada. A avaliação arterial é feita deitada, com Doppler colorido e espectral analisando o fluxo em diferentes pontos do membro.",
      },
      {
        kind: "paragraph",
        title: "Preparo",
        body:
          "Não é necessário preparo específico. Recomenda-se vestir roupa confortável que permita expor as pernas com facilidade.",
      },
      {
        kind: "highlight",
        title: "Diferencial",
        body:
          "Exame indolor, não invasivo, sem radiação e sem contraste, com laudo detalhado entregue na hora.",
      },
    ],
    preparation: SEM_PREPARO,
    duration: "30 a 45 minutos",
    whatToBring: ["Pedido médico", "Exames vasculares anteriores"],
  },
  {
    slug: "carotidas-vertebrais",
    legacySlug: "/carotidas-vertebrais",
    category: "Vascular",
    title: "Carótidas e Vertebrais",
    thumb: thumbVascular,
    shortDesc: "Doppler das artérias do pescoço para rastreio cerebrovascular.",
    longDesc:
      "Avaliação com Doppler das artérias carótidas e vertebrais, indicada na prevenção do AVC, controle de hipertensão e investigação de tonturas e sopros cervicais.",
    preparation: SEM_PREPARO,
    duration: "30 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores, se houver"],
  },
  {
    slug: "aorta-iliacas",
    legacySlug: "/aorta-iliacas",
    category: "Vascular",
    title: "Aorta e Ilíacas",
    thumb: thumbVascular,
    shortDesc: "Investigação de aneurismas e doença arterial abdominal.",
    longDesc:
      "Ultrassonografia com Doppler da aorta abdominal e artérias ilíacas, indicada no rastreamento de aneurismas e na avaliação de doença arterial obstrutiva.",
    preparation: JEJUM_6H,
    duration: "30 minutos",
    whatToBring: ["Pedido médico"],
  },

  // ---------------- Tireóide e Cervical ----------------
  {
    slug: "tireoide-doppler",
    legacySlug: "/tireoide",
    category: "Tireóide e Cervical",
    title: "Tireóide com Doppler",
    thumb: thumbTireoide,
    shortDesc: "Avaliação da glândula tireoide com mapeamento de fluxo.",
    longDesc:
      "Ultrassonografia da tireoide com Doppler colorido, para caracterização de nódulos, bócio e tireoidites, com classificação TI-RADS quando indicada.",
    hero: {
      tagline: "Avaliação da glândula tireoide com mapeamento de fluxo.",
      intro:
        "Ultrassonografia da tireoide com Doppler colorido, para caracterização de nódulos, bócio e tireoidites, com classificação TI-RADS quando indicada.",
      image: "/tireoideMK.png",
    },
    preparation: SEM_PREPARO,
    duration: "20 minutos",
    whatToBring: ["Pedido médico", "Exames laboratoriais e ultrassons anteriores"],
  },
  {
    slug: "cervical-doppler",
    legacySlug: "/cervical",
    category: "Tireóide e Cervical",
    title: "Cervical com Doppler",
    thumb: thumbTireoide,
    shortDesc: "Avaliação completa das estruturas cervicais e linfonodos.",
    longDesc:
      "Ultrassonografia cervical com Doppler, indicada para investigação de linfonodos, massas cervicais e acompanhamento pós-tratamento de doenças da região.",
    preparation: SEM_PREPARO,
    duration: "20 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores"],
  },
  {
    slug: "glandulas-salivares",
    legacySlug: "/glandulas-salivares",
    category: "Tireóide e Cervical",
    title: "Glândulas Salivares",
    thumb: thumbTireoide,
    shortDesc: "Avaliação de parótidas, submandibulares e sublinguais.",
    longDesc:
      "Ultrassonografia das glândulas salivares, indicada na investigação de aumento glandular, cálculos, processos inflamatórios e nódulos.",
    preparation: SEM_PREPARO,
    duration: "20 minutos",
    whatToBring: ["Pedido médico"],
  },

  // ---------------- Pediátrico ----------------
  {
    slug: "abdominal-total-pediatrico",
    legacySlug: "/abdominal-pediatrico",
    category: "Pediátrico",
    title: "Abdominal Total (Pediátrico)",
    thumb: thumbPediatrico,
    shortDesc: "Ultrassom abdominal completo adaptado para crianças.",
    longDesc:
      "Avaliação ultrassonográfica completa do abdome em crianças, indicada para investigação de dor abdominal, alterações intestinais e doenças hepáticas e renais.",
    preparation:
      "Jejum de 4 horas para crianças até 2 anos; 6 horas acima de 2 anos.",
    duration: "30 minutos",
    whatToBring: ["Pedido médico", "Carteira de vacinação ou histórico clínico"],
  },
  {
    slug: "rins-vias-urinarias-pediatrico",
    legacySlug: "/rins-pediatrico",
    category: "Pediátrico",
    title: "Rins e Vias Urinárias (Pediátrico)",
    thumb: thumbPediatrico,
    shortDesc: "Avaliação dos rins e bexiga em bebês e crianças.",
    longDesc:
      "Ultrassonografia dos rins e vias urinárias em pacientes pediátricos, indicada para acompanhamento de infecções urinárias, hidronefrose e malformações.",
    preparation:
      "Bexiga cheia conforme orientação por idade — oferecer líquidos antes do exame.",
    duration: "20 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores"],
  },
  {
    slug: "transfontanela",
    legacySlug: "/transfontanela",
    category: "Pediátrico",
    title: "Transfontanela",
    thumb: thumbPediatrico,
    shortDesc: "Avaliação do cérebro do bebê pela fontanela ainda aberta.",
    longDesc:
      "Ultrassonografia transfontanela, realizada enquanto a fontanela do bebê está aberta, indicada para avaliar estruturas cerebrais, hemorragias e malformações.",
    preparation: SEM_PREPARO,
    duration: "20 minutos",
    whatToBring: ["Pedido médico", "Exames anteriores, se houver"],
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
  "Medicina Interna",
  "Ginecológico",
  "Vascular",
  "Tireóide e Cervical",
  "Pediátrico",
];
