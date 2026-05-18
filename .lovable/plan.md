## Página a migrar

`Obstétrico com Doppler` — conteúdo extraído de https://dramorgana.com.br/obstetrico-com-doppler/

## O que vou fazer

1. **Gerar imagem hero** em `src/assets/exams/doppler/hero.jpg` (foto/ilustração do ultrassom com Doppler, paleta wine/champagne para combinar com o restante).
2. **Atualizar `src/data/exams.ts`** substituindo o objeto atual de `obstetrico-doppler` (hoje em formato legado, linhas 236-254) pelo novo formato com `hero` + `sections` + `faq`. Sem `gallery` (a pedido).
3. **Remover** os campos legados (`longDesc`, `indications`, `preparation`, `duration`, `whatToBring`) deste exame.

## Estrutura das seções

- **Hero**: tagline "Avaliação da circulação e bem-estar fetal." + intro com a explicação do "O que é".
- **paragraph** — "O que é um exame com Doppler?"
- **list** — "Principais indicações" (CIUR, pré-eclâmpsia, anemia fetal/ACM)
- **paragraph** — "Quando ele deve ser feito?"
- **paragraph** — "Por que realizar o exame?"
- **paragraph** — "Como ele é feito?"
- **FAQ** — 4 perguntas (obrigatoriedade, preparo, substitui morfológico?, repetir na gravidez?)

Os 3 exames relacionados continuam sendo gerados automaticamente pela categoria "Obstétrico" no `ExamDetail.tsx` — sem mudanças necessárias ali.

## Arquivos afetados

- `src/assets/exams/doppler/hero.jpg` (novo)
- `src/data/exams.ts` (import + objeto do exame)
