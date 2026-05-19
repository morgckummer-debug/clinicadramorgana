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
          "O Doppler das Artérias Uterinas é fundamental para avaliar se a placenta está conseguindo receber sangue da mãe sem dificuldade, predizendo se a mãe tem risco aumentado de apresentar pré-eclâmpsia. A medida do colo do útero também é importante: através dela, vemos se a mãe tem risco aumentado de parto prematuro.",
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
    hero: {
      tagline: "Avaliação do bem-estar fetal.",
      intro:
        "Ultrassom realizado para avaliar o bem-estar do bebê dentro do útero. Combina observações em tempo real com a medição da quantidade de líquido amniótico, ajudando a verificar se o bebê está recebendo oxigênio e nutrientes de forma adequada.",
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
          "O rastreamento das cardiopatias é realizado entre 24 e 28 semanas de gestação, quando o coração do bebê está suficientemente desenvolvido para uma avaliação detalhada. Em casos específicos — suspeita de anomalias ou histórico familiar — o exame pode ser solicitado mais cedo ou repetido ao longo da gestação.",
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
    hero: {
      tagline: "Avaliação completa dos órgãos abdominais.",
      intro:
        "Examina a maioria dos órgãos do abdome — fígado, rins, aorta, pâncreas, vesícula biliar, baço e bexiga. Não é o exame indicado para avaliar estômago e intestino, que são vistos apenas parcialmente.",
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
