## Problema

Os títulos das páginas de exames (ex.: "Obstétrico com Translucência Nucal") ainda aparecem em Cormorant Garamond porque o `<h1>` em `src/pages/ExamDetail.tsx` (linha ~146) usa explicitamente a classe `font-serif`, que sobrescreve a regra base do `index.css`.

## Mudança

Em `src/pages/ExamDetail.tsx`, remover `font-serif` do `<h1>` do hero do exame, mantendo o restante das classes (peso, tamanho responsivo, leading, balance). Assim o h1 herda Comfortaa da regra global definida em `index.css`.

Os demais usos de `font-serif` (itálicos editoriais como "ser visto", "dúvidas", "relacionados", e o CTA "Conheça a clínica…") permanecem em Cormorant como acento.

## Resultado

Todos os títulos principais das páginas de exames passam a usar Comfortaa, unificando com o restante do site. Nenhuma outra alteração de layout, cor ou espaçamento.