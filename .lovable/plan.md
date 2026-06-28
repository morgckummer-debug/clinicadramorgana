## Objetivo
Reduzir o tempo até interatividade no celular eliminando peso desnecessário, antecipando o LCP e tirando scripts não-críticos do caminho.

## Mudanças

### 1. Limpar assets órfãos (-3,5 MB)
- Remover `src/assets/pregnant-happy.png` (2 MB) e `src/assets/pregnant-happy-transp.png` (1,4 MB) — sem referências.
- Remover `public/pregnant-happy.png` e `public/pregnant-happy-transp.png` se também órfãos.
- Verificar e remover `src/assets/hero-clinic.jpg` (137 KB) se não usado.

### 2. Antecipar o LCP do mobile
Adicionar no `<head>` do `index.html`, antes dos scripts:
```html
<link rel="preload" as="image" href="/Hero2.jpg"
      media="(max-width: 767px)" fetchpriority="high" />
```
Assim a imagem do hero começa a baixar em paralelo ao bundle JS.

### 3. Adiar Google Analytics
Reescrever o bloco GA4 no `index.html` para só carregar `gtag.js` depois de `window.load` (ou após 2s de timeout). O `dataLayer` continua sendo inicializado imediatamente, então nenhum evento se perde. Libera ~50 KB do caminho crítico no 4G.

### 4. Code-splitting de seções da home
Em `src/pages/IndexV2.tsx`, extrair as seções abaixo da dobra para componentes próprios em `src/components/site/home/` e importá-los via `React.lazy` com `<Suspense fallback={null}>`:
- `ConveniosSection`
- `EquipeSection`
- `SobreSection`
- `DepoimentosSection` (se existir)

Resultado: o chunk inicial passa a conter só hero + navbar + menu de exames, que é o que o usuário vê primeiro.

### 5. Preconnect aos domínios externos
Adicionar no `<head>`:
```html
<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin />
<link rel="dns-prefetch" href="https://www.google-analytics.com" />
```

## Fora do escopo (sugestões para depois)
- Converter `Hero2.jpg` para AVIF/WebP responsivo via `vite-imagetools` (ganho marginal, já está em 66 KB).
- Service worker para cachear shell — só compensa com tráfego recorrente alto.
- Mover o player de vídeos para um host próprio (depende da decisão sobre o WP).

## Verificação após implementação
Rodar Lighthouse mobile no preview publicado e comparar LCP / TBT antes vs depois. Meta: LCP &lt; 2,5s no 4G simulado.
