## Página: Pélvico Infantil (`/pelvico-infantil`)

Atualizar a entrada `pelvico-infantil` em `src/data/exams.ts` (linhas 1552–1564) para o formato completo `hero` + `sections` (mesmo padrão das páginas recém-criadas: endometriose, transvaginal, períneo, ovulação), focando nas duas indicações que você mencionou: **avaliação de útero e ovários** e **investigação de puberdade precoce**.

### O que muda

- **Thumb**: `thumbGeral` → `thumbPediatrico` (já importado; mais coerente visualmente).
- **shortDesc**: passa a citar puberdade precoce.
- **hero**: tagline + intro acolhedora, deixando claro que é exame **abdominal, não invasivo**.
- **sections** (5 blocos no padrão dos outros exames):
  1. *Para que serve* — útero/ovários, dor pélvica, sangramento precoce, puberdade precoce.
  2. *O que o exame avalia* (lista) — útero, endométrio, ovários/folículos, sinais de puberdade precoce, cistos/malformações.
  3. *Como é realizado* — via abdominal, bexiga cheia, com responsável presente.
  4. *Preparo* — bexiga cheia (4 copos de água 1h antes), ajustado para crianças menores.
  5. *Cuidado humanizado* (highlight) — acolhimento da criança e da família.
- **duration**: `20 minutos` → `20 a 30 minutos`.
- **whatToBring**: inclui exames anteriores e documento da criança.

### O que NÃO muda

- Slug, legacySlug, categoria, rota, design tokens, tipografia, layout da página (`ExamDetail.tsx`).

Quer que eu prossiga? Mude para modo Build e eu aplico.