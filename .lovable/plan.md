## Substituir o bloco "Corpo Clínico"

Vou trocar o componente `Team` em `src/pages/IndexV2.tsx` (linhas 393–446) pelo novo layout do HTML enviado, mantendo os dados dos 7 médicos já cadastrados.

### O que muda visualmente

- **Cabeçalho**: rótulo "Nossa Equipe", título em serifa itálica "Médicos que fazem a *diferença*.", divisor fino e subtítulo curto sobre excelência diagnóstica.
- **Cards**: removem-se o fundo, a borda e a sombra do card atual. Cada médico vira apenas:
  - Retrato em formato oval alongado (≈135×178 px, `border-radius: 50%/42%`) com sombra suave e leve borda.
  - Nome em serifa, especialidade em caps pequenas, CRM em texto leve, traço fino final.
  - Hover sutil: translate Y de -4px.
- **Badge de ultrassom**: removido (não existe no novo layout).
- **Grid**: 2 colunas no mobile, 3 em tablet, 4 em desktop.
- **Fundo da seção**: gradiente suave (substituindo o `bg-background` atual).

### Decisão de paleta

O HTML enviado usa lilás/roxo (`#a566b6`, `#6d3263`). Como você já pediu antes para manter equilíbrio com o restante do site (vinho/champagne), vou usar os **tokens existentes do design system** (`wine`, `wine-deep`, `champagne`, `muted-foreground`) em vez do roxo do mockup — preservando exatamente a **estrutura, tipografia, formato oval e espaçamentos** do novo bloco.

Se preferir manter a paleta lilás original do HTML, me avise antes que eu implemente.

### Arquivos

- `src/pages/IndexV2.tsx` — substituir o componente `Team` (mantém `team[]`, remove uso de `ultrasoundIcon` nessa seção).

Sem alterações em dados, rotas ou outros componentes.