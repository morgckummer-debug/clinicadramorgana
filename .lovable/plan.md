## Ajustes solicitados

### 1. Navbar — logotipo em Comfortaa com hierarquia

Em `src/components/site/Navbar.tsx`, no `<a href="#top">`:

- Aplicar `font-comfortaa` ao bloco do logo.
- "Clínica de Ultrassom" → texto menor, mantendo o estilo eyebrow (tracking amplo, champagne), em torno de `text-[10px]` / `text-[11px]`.
- "Dra. Morgana Kummer" → bem maior e em destaque, algo como `text-2xl md:text-3xl font-bold` em Comfortaa, com `tracking-tight` ajustado para a fonte.
- Ajustar `leading-none` para que as duas linhas fiquem próximas e equilibradas.

### 2. Bloco de Exames — listagem centralizada e maior

Em `src/components/site/Exams.tsx`, dentro de cada `<article>`:

- Centralizar o conteúdo do card: `text-center`, header (thumb + título da categoria) em coluna centralizada (`flex-col items-center`), removendo o alinhamento à esquerda atual.
- Lista `<ul>` centralizada: cada `<Link>` passa de `flex items-start` para `inline-flex justify-center items-center`, e o bullet champagne fica antes do nome alinhado verticalmente ao centro do texto.
- Aumentar o tamanho dos nomes dos exames: de `text-sm` para `text-base` (ou `text-[15px]`), com `leading-relaxed`.

### 3. Sublinhar exames com página própria

Critério: um exame "tem página própria" quando possui o campo `hero` definido em `src/data/exams.ts` (conteúdo migrado completo). Os demais ainda caem em página genérica/fallback.

Em `Exams.tsx`, no `<Link>`:

- Calcular `const hasOwnPage = !!exam.hero;`
- Aplicar `underline underline-offset-4 decoration-champagne/60 hover:decoration-wine` quando `hasOwnPage` for true; demais permanecem sem sublinhado.

### O que NÃO muda

- H2/H3, eyebrow labels, paleta e demais blocos.
- Estrutura de dados de `exams.ts`.
- Comportamento de roteamento (continua usando `canonicalPathFor`).
