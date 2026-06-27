## Sitemap gerado automaticamente

### Contexto
O projeto não possui nenhum mecanismo de sitemap (`public/sitemap.xml`, script gerador ou plugin Vite). Criar um sitemap completo melhora a indexação no Google e no Bing.

### O que será feito
1. Criar `scripts/generate-sitemap.ts`
   - Base URL: `https://clinicadramorgana.lovable.app`
   - Incluir todas as rotas públicas e indexáveis do `App.tsx` e slugs dinâmicos de `src/data/exams.ts`
   - Excluir rotas internas (`/painel/*`, `/not-found`, `*`)
   - Configurar `changefreq` e `priority` adequados para cada tipo de página
2. Adicionar scripts `predev` e `prebuild` no `package.json` para executar o gerador automaticamente antes do dev e do build
3. Executar o script para gerar `public/sitemap.xml` imediatamente
4. Adicionar `Sitemap: https://clinicadramorgana.lovable.app/sitemap.xml` ao `public/robots.txt`

### Rotas que entrarão no sitemap
| Rota | Tipo | Prioridade |
|---|---|---|
| `/` | Estática | 1.0 |
| `/videos` | Estática | 0.7 |
| `/agendar` | Estática | 0.7 |
| `/pre-agendamento` | Estática | 0.7 |
| `/preparo` | Estática | 0.7 |
| `/como-chegar` | Estática | 0.6 |
| `/falar-secretaria` | Estática | 0.6 |
| `/exames/:slug` | Dinâmica (todos os exames) | 0.8 |
| Legacy slugs | Dinâmica (redirecionamentos SEO) | 0.5 |
