# Reduzir o tempo até interatividade (TTI) das páginas de exame

## Causa raiz

`src/pages/ExamDetail.tsx` importa `Navbar`, `Footer` e `WhatsAppFab` diretamente de `src/pages/IndexV2.tsx`. O `IndexV2.tsx` é a homepage inteira e carrega no topo do módulo:

- `dra-morgana-hero-v2.webp` (hero da home)
- `dra-morgana-sobre.webp` (seção “Sobre”)
- além de componentes pesados como `Hero`, `About`, `Exams`, `Team`, `Convenios`, `Contact`

Como tudo está no mesmo arquivo, o Vite empacota essas imagens e seções dentro do chunk do `ExamDetail`. Resultado: o HTML aparece rápido (pré-renderizado), mas o JS demora para hidratar e os botões ficam “mortos” por vários segundos.

## Plano

1. **Criar componentes próprios e enxutos** (não tocar nos arquivos placeholder existentes que estão fora de uso):
   - `src/components/site/SiteNavbar.tsx` — copiar exatamente o `Navbar` que está hoje em `IndexV2.tsx` (linhas ~135 em diante), trazendo junto apenas os imports necessários (`logoClinica`, `logoWine`, ícones, `useLanguage`, etc.).
   - `src/components/site/SiteFooter.tsx` — copiar exatamente o `Footer` atual (usa `logoWhite`).
   - `src/components/site/SiteWhatsAppFab.tsx` — copiar o `WhatsAppFab` atual (usa a constante `WHATSAPP_URL`).

   Observação: os arquivos `Navbar.tsx`/`Footer.tsx`/`WhatsAppFab.tsx` que já existem em `src/components/site/` são versões antigas/diferentes; para não introduzir regressão visual, criamos novos com sufixo `Site*` e mantemos o visual atual idêntico.

2. **Atualizar `IndexV2.tsx`**:
   - Remover as definições internas de `Navbar`, `Footer`, `WhatsAppFab`.
   - Importar e re-exportar a partir dos novos módulos, para preservar `import { Navbar, Footer, WhatsAppFab } from "./IndexV2"` que outras telas eventualmente usem:
     ```ts
     export { SiteNavbar as Navbar } from "@/components/site/SiteNavbar";
     export { SiteFooter as Footer } from "@/components/site/SiteFooter";
     export { SiteWhatsAppFab as WhatsAppFab } from "@/components/site/SiteWhatsAppFab";
     ```

3. **Atualizar `ExamDetail.tsx`**:
   - Trocar `import { Footer, Navbar, WhatsAppFab } from "./IndexV2";` por imports diretos dos novos módulos em `@/components/site/Site*`. Assim o chunk do `ExamDetail` não puxa mais `IndexV2`, nem as imagens da home, nem `Hero/About/Exams/Team/Convenios/Contact`.

4. **Verificação**:
   - Rodar build e conferir no relatório do Rollup que o chunk de `ExamDetail` ficou significativamente menor e que `dra-morgana-hero-v2` e `dra-morgana-sobre` não aparecem mais nele.
   - Abrir `/ultrassom-obstetrico` no preview e confirmar visual idêntico (Navbar, Footer, botão WhatsApp) e que o botão “Quero agendar este exame” responde imediatamente.

## Fora do escopo

- Nenhuma mudança de design, conteúdo, rotas ou lógica de negócio.
- Não mexer em SEO, manifest, GA, etc.
- Não alterar a homepage visualmente — apenas mover código de lugar.
