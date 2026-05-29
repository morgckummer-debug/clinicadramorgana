Remover os CTAs redundantes de WhatsApp/agendamento, mantendo apenas o botão flutuante do WhatsApp.

## O que será feito

1. **Remover `<AnnouncementBar />`** das páginas:
   - `src/pages/Index.tsx`
   - `src/pages/IndexV2.tsx`
   - `src/pages/ExamDetail.tsx`

2. **Remover `<ScheduleFab />`** das mesmas 3 páginas.

3. **Remover os imports** correspondentes em cada arquivo.

4. **Deletar os arquivos** `src/components/site/AnnouncementBar.tsx` e `src/components/site/ScheduleFab.tsx` (não serão mais utilizados).

## Nota técnica

A `Navbar` utiliza a variável CSS `--cta-bar-h` (definida pela `AnnouncementBar`) para calcular seu posicionamento vertical. Como a barra será removida, essa variável passa a valer `0px` (fallback já existente), fazendo a navbar ficar naturalmente no topo da página — comportamento correto.

## Resultado esperado

Apenas o botão redondo fixo do WhatsApp (`<WhatsAppFab />`) permanecerá visível no canto inferior direito, tanto em desktop quanto mobile.