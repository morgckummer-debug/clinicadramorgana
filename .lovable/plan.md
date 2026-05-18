## Estratégia

Em vez de criar 15–20 arquivos `.tsx` (um por exame), uso **uma única rota dinâmica** `/exames/:slug` que renderiza um template compartilhado. Cada exame vira apenas uma entrada num arquivo de dados. Isso garante:

- **Design 100% consistente** (mesmo template, mesmas cores, mesma tipografia da landing).
- **Manutenção trivial**: trocar um texto = editar 1 objeto. Adicionar exame novo = adicionar 1 objeto.
- **SEO**: cada exame tem URL própria (`/exames/morfologico-2-trimestre`), `<title>` e meta description próprios.
- **Performance**: 1 componente, sem 20 bundles duplicados.

## Estrutura

### 1. Refatorar layout compartilhado
Extrair `Navbar`, `Footer` e `WhatsAppFab` do `IndexV2.tsx` para `src/components/site/` (já existem stubs lá — confirmar e consolidar). Esses três componentes serão usados tanto na landing quanto nas páginas de exame.

### 2. Fonte única de dados — `src/data/exams.ts`
Array de objetos, um por exame, com a estrutura:

```ts
{
  slug: "morfologico-2-trimestre",
  category: "Obstétrico",
  title: "Morfológico do 2º Trimestre",
  thumb: thumbObstetrico,
  shortDesc: "...",         // usado no card da landing
  longDesc: "...",          // intro da página de detalhe
  indications: ["...", "..."],
  preparation: "...",
  duration: "30 a 45 minutos",
  whatToBring: ["pedido médico", "exames anteriores"],
  faq?: [{ q, a }],
}
```

A landing passa a importar e agrupar este array por `category` (mantendo o visual atual em 6 cards). Cada item da lista interna do card vira um link `<Link to={`/exames/${slug}`}>`.

### 3. Página template — `src/pages/ExamDetail.tsx`
Rota `/exames/:slug`. Layout reaproveitando blocos da landing:

```
[ Navbar (compartilhada) ]
[ Hero compacto do exame: breadcrumb + categoria + título + descrição + CTA WhatsApp ]
[ Bloco "Indicações" — lista com bullets champagne ]
[ Bloco "Preparo" + "Duração" + "O que levar" em grid 3 colunas ]
[ FAQ opcional (accordion shadcn) ]
[ Bloco "Outros exames desta categoria" — 3 cards relacionados ]
[ Footer ]
[ Rodapé com botão "Voltar à página inicial" (Link to="/") ]
[ WhatsAppFab ]
```

Usa exatamente os mesmos tokens (`bg-gradient-rose`, `text-wine-deep`, `font-serif`, `champagne`, etc.). Se `slug` não existir → `<NotFound />`.

### 4. Roteamento — `src/App.tsx`
Adicionar **uma** linha:
```tsx
<Route path="/exames/:slug" element={<ExamDetail />} />
```

### 5. SEO
No `ExamDetail`, `useEffect` atualiza `document.title` e `<meta name="description">` com base no exame. Adicionar JSON-LD `MedicalProcedure` opcional.

## Detalhes técnicos

- **Total de páginas geradas**: ~20, mas só **1 componente React** e **1 rota**.
- **Slugs**: gerar manualmente no array para garantir URLs limpos e estáveis (não derivar de `title.toLowerCase()`).
- **Navegação interna**: trocar `<a href="#exames">` por `<Link to="/#exames">` quando vier de página de detalhe.
- **Scroll restoration**: adicionar `useEffect(() => window.scrollTo(0,0), [slug])` no `ExamDetail`.
- **Imagens**: reaproveitar as 6 thumbs já importadas (`obstetrico.webp` etc.) — cada categoria compartilha thumb. Se quiser thumbs individuais depois, basta adicionar campo `heroImg` opcional no objeto.

## Entregáveis

1. `src/data/exams.ts` — fonte única
2. `src/components/site/Navbar.tsx`, `Footer.tsx`, `WhatsAppFab.tsx` — consolidar/garantir uso compartilhado
3. `src/pages/ExamDetail.tsx` — template
4. `src/App.tsx` — nova rota
5. `src/pages/IndexV2.tsx` — `Exams` passa a ler de `src/data/exams.ts` e cada item linka para a página de detalhe

## Antes de implementar — preciso confirmar

- **Conteúdo dos textos** (longDesc, indicações, preparo, duração) de cada exame: você fornece, eu escrevo placeholders elegantes para você revisar, ou puxo de algum site/PDF de referência?
- **FAQ por exame**: incluir desde já ou deixar para uma segunda etapa?
- **Imagem hero** da página de detalhe: usar a thumb da categoria (mais rápido) ou gerar/encomendar uma imagem específica por exame?
