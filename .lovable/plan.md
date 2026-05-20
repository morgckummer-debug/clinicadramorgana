## Três atualizações em `src/data/exams.ts`

### 1) Expandir **Mamas e Axilas** (`/mamas`)
Entrada atual (linhas 1522–1534) está em formato curto. Reescrevo no padrão `hero` + `sections`:
- **hero**: tagline "Investigação detalhada da mama e cadeias axilares" + intro humanizada.
- **sections (5)**:
  1. *Para que serve* — complemento à mamografia, pacientes jovens, mamas densas, gestantes/lactantes, investigação de nódulos palpáveis.
  2. *O que avalia* (lista) — nódulos sólidos e císticos, classificação BI-RADS, linfonodos axilares, ductos, próteses.
  3. *Como é realizado* — paciente deitada, gel morno, transdutor de alta frequência, avaliação bilateral e axilas.
  4. *Preparo* — sem preparo; recomendação de evitar cremes/desodorantes na região no dia.
  5. *Quando indicar* (highlight) — a partir dos 25–30 anos, ou conforme orientação médica.
- `duration`: 20 → 20 a 30 minutos.
- `whatToBring`: adiciona mamografia recente e exames anteriores.

### 2) Expandir **Duplex Scan dos Membros Inferiores** (`/duplex-scan`)
Entrada atual (linhas 1625–1637). Reescrevo no padrão `hero` + `sections`:
- **hero**: tagline "Doppler colorido das artérias e veias dos membros inferiores" + intro.
- **sections (5)**:
  1. *Para que serve* — varizes, insuficiência venosa, suspeita de TVP, doença arterial periférica, dor/inchaço, planejamento cirúrgico.
  2. *O que avalia* (lista) — sistema venoso superficial e profundo, refluxo, trombos, fluxo arterial, placas, estenoses.
  3. *Como é realizado* — exame em pé e deitada, com manobras provocativas; uso de Doppler colorido e espectral.
  4. *Preparo* — sem preparo; vestir roupa confortável.
  5. *Diferencial* (highlight) — exame indolor, não invasivo, sem radiação, com laudo entregue na hora.
- `duration`: 30 → 30 a 45 minutos.
- `whatToBring`: pedido + exames vasculares anteriores.

### 3) Mover **Pélvico Infantil** para a categoria **Pediátrico**
A entrada `pelvico-infantil` (linha 1553) está em `"Medicina Interna"`. Mudo apenas o campo `category` para `"Pediátrico"` — assim ela passa a aparecer no card "Pediátrico" da home junto com os demais exames infantis. Nada mais muda (slug, rota, conteúdo, thumb permanecem).

### O que NÃO muda
Design, tipografia, layout do `ExamDetail.tsx`, rotas, slugs, legacy slugs, demais exames.

Confirma para eu aplicar?