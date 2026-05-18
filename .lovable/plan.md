## Reduzir tamanho da imagem hero nas páginas de exame

A imagem do hero (ex.: `/obstetrico-com-translucencia-nucal`) está ocupando muito espaço tanto no desktop quanto no mobile. Vou ajustar apenas o CSS dessa imagem em `src/pages/ExamDetail.tsx`, sem mexer nos arquivos de imagem nem no conteúdo.

### Mudanças

Arquivo: `src/pages/ExamDetail.tsx` — bloco do hero (`hero.image`)

1. **Desktop**: reduzir a coluna da imagem de `md:col-span-5` para `md:col-span-4`, e aumentar a coluna do texto de `md:col-span-7` para `md:col-span-8`. Isso já deixa a imagem bem mais compacta no desktop.
2. **Mobile**: limitar a largura máxima da imagem (`max-w-xs` ≈ 320px) e centralizá-la (`mx-auto`), em vez de ocupar 100% da largura da tela.
3. Trocar `aspect-square md:aspect-auto` por `aspect-square` fixo, para a imagem ficar sempre quadrada e mais discreta.
4. Reduzir o "glow" de fundo (`-inset-4` → `-inset-2`, `blur-2xl` → `blur-xl`) para acompanhar o novo tamanho.

### Resultado esperado

- No celular: imagem centralizada com no máximo ~320px de largura.
- No desktop: imagem ocupando 1/3 da largura (em vez de quase metade), com o texto mais protagonista.
- Vale para **todas** as páginas de exame que usam hero com imagem (Translucência Nucal, Doppler, e futuras).

Sem alteração em dados, imagens ou outras seções.