## Contexto

O conteúdo do site atual (`dramorgana.com.br/primeiro-trimestre/`) **não cabe** no schema que temos hoje em `src/data/exams.ts`. O original é narrativo, com seções livres e uma galeria de imagens legendadas. Os campos atuais (`preparation`, `duration`, `whatToBring`, `indications`) foram inventados como placeholder e não refletem nada do site real.

Antes de migrar 22 páginas, precisamos de um schema flexível. Depois disso, replicamos o conteúdo do primeiro exame.

> Observação: o site oficial está em **`dramorgana.com.br`** (não `clinicadramorgana.com.br`). Vou ajustar a constante `SITE_ORIGIN` no `ExamDetail.tsx` e o `canonical` para apontar para `dramorgana.com.br` — é esse o domínio que precisa ser preservado no SEO.

## Novo schema (em `src/data/exams.ts`)

Substituir os campos rígidos por um array `sections` flexível + um `hero`. Cada exame passa a ter:

```ts
interface Exam {
  slug: string;
  legacySlug?: string;
  category: ExamCategory;
  title: string;
  thumb: string;
  shortDesc: string;       // card da home
  hero: {
    tagline: string;       // "O início de tudo."
    intro: string;         // parágrafo curto de abertura
    image?: string;        // imagem principal do hero (opcional)
  };
  sections: ExamSection[]; // conteúdo livre, na ordem
  gallery?: GalleryItem[]; // "O que pode ser visto?" — imagem + legenda
  faq?: { q: string; a: string }[]; // opcional, exame a exame
}

type ExamSection =
  | { kind: "paragraph"; title: string; body: string }
  | { kind: "list";      title: string; items: string[] }
  | { kind: "highlight"; title: string; body: string }; // bloco com destaque visual
```

Vantagens:
- Cada exame só preenche o que faz sentido (alguns não terão galeria, outros não terão FAQ).
- Ordem das seções fiel ao site original.
- O template não precisa mudar quando adicionamos um exame novo.

## Template (`src/pages/ExamDetail.tsx`)

Reescrever para renderizar:

1. **Hero** — categoria · título · tagline · intro · CTA WhatsApp · imagem opcional ao lado.
2. **Sections** — itera `sections[]` na ordem. Cada `kind` tem um layout próprio (parágrafo, lista com bullets champagne, bloco destaque com fundo rosa).
3. **Galeria "O que pode ser visto?"** — grid de imagens com legenda abaixo, só renderiza se `gallery` existir.
4. **FAQ** — accordion shadcn, só renderiza se `faq` existir.
5. **Outros exames da categoria** — mantém como está.
6. **CTA final + Footer** — mantém.

Remover do JSX as referências a `preparation`, `duration`, `whatToBring`, `indications`.

## Migração dos dados existentes

Os 22 exames atuais ficam com `sections` vazio temporariamente — só `hero.tagline` e `hero.intro` preenchidos a partir do `longDesc` atual, para nenhuma página quebrar. Vamos preenchê-los **na sequência das páginas reais do site**, começando agora pelo Obstétrico do 1º Trimestre.

## Aplicação no primeiro exame

Preencher `ultrassom-primeiro-trimestre-tv` com o conteúdo de `dramorgana.com.br/primeiro-trimestre/`:

- **hero.tagline**: "O início de tudo."
- **hero.intro**: parágrafo de abertura.
- **sections** (na ordem):
  1. `paragraph` — "O que esperar do exame?"
  2. `paragraph` — "Quando ele deve ser realizado?"
  3. `list` — "O que é avaliado?" (5 bullets)
  4. `list` — "Principais complicações" (4 bullets)
  5. `paragraph` — "Por que não fazer antes de 7 semanas?"
  6. `list` — "Quando fazer antes de 7 semanas?" (3 bullets + nota de fechamento)
- **gallery** — 4 imagens "O que pode ser visto?":
  - CCN — embrião medido ponta a ponta
  - Vesícula vitelínica
  - Saco gestacional
  - Batimentos cardíacos
  
  As imagens do site original são hospedadas no WordPress (`i0.wp.com/...`). Posso (a) baixar e versionar em `src/assets/exams/primeiro-trimestre/`, ou (b) referenciar via URL direta. Recomendo (a) — mais rápido, sem dependência externa, melhor SEO. Faço isso na implementação.
- **faq** — vazio (o site original não tem FAQ neste exame).

## Arquivos a editar

1. `src/data/exams.ts` — novo schema, migração dos 22 exames para shape mínimo (`hero` derivado do `longDesc` atual), preenchimento completo do 1º exame.
2. `src/pages/ExamDetail.tsx` — reescrever o JSX em torno do array `sections`, adicionar bloco galeria, ajustar `SITE_ORIGIN` para `https://dramorgana.com.br`.
3. `src/components/site/Exams.tsx` — só ajustar referências se ainda usar campos antigos (verifico no momento da edição).
4. `src/assets/exams/primeiro-trimestre/` — 5 imagens baixadas (1 hero + 4 galeria).

## Próximos passos depois deste

Quando esta página estiver aprovada por você, sigo o mesmo fluxo para a próxima do site, na ordem em que aparecem em `dramorgana.com.br`. Cada rodada = 1 exame, você revisa, partimos pro próximo.
