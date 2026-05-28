# Padronizar títulos com Comfortaa

## Objetivo
Todos os títulos principais (h1–h6) do site passam a usar **Comfortaa** como fonte padrão, mantendo a Cormorant Garamond apenas para destaques editoriais em itálico (ex: `font-serif italic` já usado em palavras como "acolhe", "principais planos", "cada imagem").

## Mudanças

### 1. `src/index.css`
- Alterar a regra base de `h1, h2, h3, h4, h5, h6` para usar `'Comfortaa', cursive` no lugar de `'Cormorant Garamond', serif`.
- Ajustar `font-weight` para 600/700 (Comfortaa fica melhor em pesos mais firmes para títulos) e `letter-spacing` levemente negativo para manter elegância.
- Manter `.font-serif` intacto — destaques itálicos editoriais continuam em Cormorant.

### 2. Sem alterações em componentes
- Os títulos já usam tags semânticas (`h1`, `h2`) e classes utilitárias de tamanho. A troca via CSS base propaga automaticamente para todas as páginas (Home, IndexV2, ExamDetail, etc.).
- Trechos com `font-serif italic` (ex: "acolhe", "principais planos") permanecem em Cormorant — isso preserva o contraste tipográfico premium já estabelecido.

## Resultado
- Identidade tipográfica unificada com a Hero e a Navbar (que já usam Comfortaa).
- Destaques editoriais em itálico continuam funcionando como acento sofisticado.
- Zero mudança de layout, espaçamento ou cor.
