# Plano — performance da home no mobile

## Objetivo
Fazer a home abrir rápido no celular e o botão "Pré-Agendamento" responder imediatamente, sem esperar 6s pelo navbar.

## Causa raiz
O chunk JS da home está grande demais porque `IndexV2.tsx` importa estaticamente 16 logos de convênios, 7 fotos da equipe, vários logotipos e o componente `DifferentiatedExperience` — tudo entra no mesmo bundle que precisa ser baixado e executado antes de qualquer botão funcionar. Enquanto isso, `App.tsx` mostra `<Suspense fallback={null}>` (tela em branco) e o `<Link>` do botão só ativa após a hidratação do React.

## O que vou fazer

### 1. Tirar imagens "abaixo da dobra" do bundle JS
- Mover os 16 logos de `src/assets/convenios/` e as 7 fotos de `src/assets/team/` para `public/convenios/` e `public/team/`.
- Trocar os `import conv... from "@/assets/..."` por referências por URL (`"/convenios/hapvida.webp"`) dentro dos arrays `convenios` e `teamBase`.
- Efeito: essas imagens deixam de ser pré-carregadas pelo JS e só baixam quando o usuário rola até elas. O chunk inicial cai bastante.

### 2. Adicionar `loading="lazy"` e `decoding="async"` nas imagens fora da dobra
- Aplicar nas fotos da equipe, logos de convênios, foto "Sobre" e qualquer `<img>` que não seja o Hero.
- O Hero continua `fetchPriority="high"` (é o LCP).

### 3. Code-split do `DifferentiatedExperience`
- Trocar o import estático por `lazy(() => import(...))` com `<Suspense fallback={null}>` ao redor.
- Ele aparece depois do Hero, então não precisa estar no chunk inicial.

### 4. Substituir o `fallback={null}` global por um esqueleto mínimo
- Em `App.tsx`, trocar `<Suspense fallback={null}>` por um esqueleto leve que já renderiza o navbar visual e um botão "Pré-Agendamento" como `<a href="/agendar">` puro.
- Assim, mesmo antes do React hidratar, o clique no botão já funciona via navegação nativa do navegador (o React Router assume depois sem perder o destino).

### 5. Preload do chunk da home
- Adicionar `<link rel="modulepreload">` no `index.html` apontando para o entry do app, para o navegador começar a baixar o JS em paralelo com o HTML em vez de esperar o parse.

## Não vou mexer
- Layout, cores, conteúdo, fluxo de agendamento, backend, autenticação.
- O vídeo do Hero no desktop fica como está.
- O comportamento visual do navbar não muda.

## Como vou validar
- Build local e verificar tamanho do chunk principal antes/depois.
- Abrir a preview no viewport mobile e confirmar que o botão Pré-Agendamento clica imediatamente, sem esperar o navbar terminar de aparecer.
