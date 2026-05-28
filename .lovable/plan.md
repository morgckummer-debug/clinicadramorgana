## Tipografia — ajustes Comfortaa

### 1. Carregar a fonte Comfortaa
Em `src/index.css`, adicionar Comfortaa ao `@import` do Google Fonts (pesos 400, 500, 600, 700).

### 2. Registrar no Tailwind
Em `tailwind.config.ts`, adicionar:
```ts
fontFamily: {
  ...
  comfortaa: ['Comfortaa', 'cursive'],
}
```

### 3. Hero — H1 inteiro em Comfortaa
Em `src/components/site/Hero.tsx`, no `<h1>`:
- Adicionar classe `font-comfortaa`
- Remover/ajustar o `font-serif italic` do span "cada imagem" para também usar Comfortaa (mantendo o destaque em `text-champagne` e peso mais leve via `font-light`), preservando hierarquia visual.

### 4. Descrições (parágrafos principais) em Comfortaa
Aplicar `font-comfortaa` apenas nos parágrafos descritivos principais dos blocos — sem mexer em H2/H3 (continuam em Cormorant Garamond) e sem alterar labels pequenos uppercase (continuam em Jost):

- `Hero.tsx` — o `<p>` "Ultrassonografia obstétrica…"
- `About.tsx` — os dois `<p>` principais (a citação em itálico serif e o parágrafo "Hoje realizo o propósito…"). *Decisão:* manter a **citação em Cormorant itálico** (é destaque editorial, não descrição) e aplicar Comfortaa apenas no parágrafo "Hoje realizo o propósito…".
- `Convenios.tsx` — não tem `<p>` descritivo, sem alteração.
- `Credentials.tsx` — sem descrições, sem alteração.
- `Exams.tsx`, `Contact.tsx`, `Footer.tsx` — aplicar `font-comfortaa` nos parágrafos descritivos principais de cada bloco (ex.: subtítulo abaixo do H2). Labels pequenos, items de lista e textos auxiliares permanecem na fonte padrão.

### 5. Bloco "Nossa Equipe" (IndexV2.tsx)
Subtítulo do bloco (parágrafo descritivo abaixo do H2) recebe `font-comfortaa`. Nomes, especialidade e CRM permanecem como estão.

### Resumo do que NÃO muda
- H2/H3 de todos os blocos → continuam em Cormorant Garamond
- Labels eyebrow uppercase (`text-[11px] tracking-[0.4em]`) → continuam em Jost
- Botões, navegação, formulários → Jost
- Citação editorial em itálico no About → continua em Cormorant itálico