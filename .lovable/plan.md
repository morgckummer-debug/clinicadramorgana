## Correção: aplicar os ajustes em `src/pages/IndexV2.tsx`

A rota `/` renderiza `IndexV2`, que tem `Navbar`, `Hero` e `Exams` definidos inline no próprio arquivo. As edições anteriores foram feitas em `Hero.tsx`/`Exams.tsx`/`Navbar.tsx` de `components/site`, que pertencem à página antiga (`/v1`). Por isso nada mudou no preview.

### 1. Hero — título em Comfortaa (`IndexV2.tsx`, ~linhas 161-168)

- Eyebrow `<p>` "Clínica de Ultrassom" → adicionar `font-comfortaa` (continua pequeno com tracking amplo).
- `<h1>` "Dra. Morgana / Kummer" → trocar `font-serif ... font-light` por `font-comfortaa font-bold`, mantendo o `clamp` de tamanho. Remover o `italic` do span "Kummer" (não combina com Comfortaa) e manter `text-champagne`, podendo deixar em `font-light` para criar contraste interno.
- Resultado: "Dra. Morgana Kummer" claramente maior e em destaque sobre o "Clínica de Ultrassom".

### 2. Bloco de Exames — listagem centralizada e maior (`IndexV2.tsx`, ~linhas 319-339)

Dentro do `<div className="p-6 ...">` de cada card:

- `h3` da categoria e `p` da descrição → adicionar `text-center`.
- `<ul>` → adicionar `text-center` e aumentar espaçamento para `space-y-2.5`.
- Cada `<Link>` dos exames:
  - Trocar `text-xs` por `text-sm` (ou `text-[15px]`) e `leading-relaxed`.
  - Trocar `flex items-center gap-2` por `inline-flex items-center justify-center gap-2.5` e envolver o `<li>` em `flex justify-center` para centralizar.

### 3. Sublinhar exames com página própria (`IndexV2.tsx`, mesmo loop)

Critério: exame "tem página própria" quando `exam.hero` está definido em `src/data/exams.ts` (conteúdo migrado completo).

- Calcular `const hasOwnPage = !!ex.hero;` dentro do `items.map`.
- Aplicar sublinhado permanente ao `<span>` do título quando `hasOwnPage`: `underline underline-offset-4 decoration-champagne/70`. Quando `false`, manter o comportamento atual (sublinhado só no hover).

### O que NÃO muda

- Logo da Navbar (continua como imagem).
- Demais blocos da página.
- Estrutura/rotas dos exames.

### Observação

Os componentes em `src/components/site/Hero.tsx`, `Exams.tsx` e `Navbar.tsx` (página `/v1`) ficam como estão após a edição anterior — não são revertidos, apenas não afetam a home atual.
