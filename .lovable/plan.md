## Objetivo
Inserir a imagem `tireoideMK.png` no lado direito do título (Hero) da página **Pesquisa de Endometriose Profunda**.

## Contexto atual
- A página usa o componente `ExamDetail.tsx`, que já suporta renderizar uma imagem no Hero quando o campo `hero.image` está presente no exame.
- O exame `endometriose-profunda` em `src/data/exams.ts` atualmente **não possui** `hero.image` definido — por isso a seção Hero ocupa toda a largura.
- O arquivo `tireoideMK.png` existe no repositório local do usuário (GitHub Desktop) mas ainda não foi sincronizado com o projeto Lovable.

## Etapas de implementação

### 1. Sincronização do arquivo
- O usuário fará push do arquivo `tireoideMK.png` para a pasta `public/` via GitHub Desktop.
- Aguardar o sync bidirecional Lovable ↔ GitHub e confirmar que o arquivo está disponível em `/dev-server/public/tireoideMK.png`.

### 2. Importação da imagem nos dados
- Em `src/data/exams.ts`, adicionar um import para a imagem:  
  `import endometrioseHero from "@/assets/exams/endometriose/hero.png";`  
  (ou caminho equivalente, dependendo de onde o sync colocar o arquivo).
- Como o arquivo virá via GitHub sync, ele provavelmente chegará em `public/tireoideMK.png`. Nesse caso, usaremos o caminho direto `"/tireoideMK.png"` no campo `hero.image` (sem necessidade de import ES6, pois `public/` é servido estaticamente).

### 3. Ligação no exame
- No objeto do exame `endometriose-profunda` (linha ~1199 de `src/data/exams.ts`), adicionar:
  ```ts
  hero: {
    tagline: "Diagnóstico e estadiamento da endometriose profunda",
    intro: "...",
    image: "/tireoideMK.png",
  }
  ```
- Isso fará com que `ExamDetail.tsx` automaticamente renderize a imagem à direita do título, reduzindo a coluna de texto para `md:col-span-8` e criando a coluna de imagem `md:col-span-4`.

## Resultado esperado
- A página `/endometriose-profunda` exibirá a imagem `tireoideMK.png` ao lado direito do título, no Hero, com o mesmo estilo visual (borda arredondada, sombra, aspect-ratio quadrado) usado nas outras páginas de exame que possuem imagem no Hero.

## Nota
- Caso o sync do GitHub Desktop demore ou falhe, alternativa: o usuário pode anexar a imagem diretamente aqui no chat para upload manual ao projeto.