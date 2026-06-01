## Mudança

**`src/pages/ExamDetail.tsx`** (CTA final, ~linhas 365-380)

Como a cerclagem é procedimento cirúrgico (não ultrassom), no CTA final renderizar condicionalmente:

- Se `exam.slug === "cerclagem"`: mostrar apenas o link "Voltar à página inicial" (estilizado como botão primário, centralizado, para não ficar solto).
- Demais exames: comportamento atual (botão "Falar no WhatsApp" + link "Voltar").

Também ocultar, para cerclagem, a linha "Resposta em até 1h em horário comercial" (relacionada ao agendamento WhatsApp).

O `WhatsAppFab` (botão flutuante) e demais seções permanecem inalterados.
