# Módulo: Como chegar

Nova rota `/como-chegar`, isolada. Reutiliza a base do módulo Preparo (`PageShell`, `SectionHeader`, `IconBadge`, `OptionGrid`) e introduz três novos componentes 100% genéricos para alimentar todo o portal futuro.

## Rota

- `/como-chegar` adicionada em `src/App.tsx` com `lazy()`. Nada mais é tocado.

## Princípios

1. Componentes novos sem qualquer referência ao domínio "Como chegar" — nomes, props e copy padrão são neutros.
2. Zero texto hardcoded — toda copy vem de `src/content/comoChegar.ts` (toasts, labels, alts).
3. Dados em `src/data/comoChegar.ts`, prontos para crescer (Transporte público, Hotéis, Restaurantes, Farmácias, Horário, Convênios, etc.) apenas acrescentando itens em arrays.
4. Apenas Lucide, sem emojis.

## Estrutura de arquivos

```text
src/
  content/
    comoChegar.ts          # eyebrow, título, subtítulo, labels de botões,
                           # toast "endereço em breve", mensagem WhatsApp,
                           # alt/legenda padrão da foto
  data/
    comoChegar.ts          # localização + arrays de seções (cada uma com
                           # id, título opcional, lista de InfoCardData)
  components/common/
    InfoCard.tsx           # NOVO genérico: IconBadge + título + descrição +
                           # CTA opcional. Aceita onClick OU href (external).
                           # Sem nenhuma copy hardcoded.
    HighlightCard.tsx      # NOVO genérico: card grande de destaque
                           # (eyebrow + título + lista de linhas meta +
                           # CTA principal). Props neutras: eyebrow, title,
                           # lines[], primaryAction { label, icon?, onClick|href }.
    FigureCard.tsx         # NOVO genérico (substitui ImagePlaceholder):
                           # área 16:9 arredondada com:
                           #   - src opcional (sem src => slot vazio elegante
                           #     com ícone neutro, sem texto fixo)
                           #   - alt obrigatório quando há src
                           #   - caption opcional (legenda curta)
                           #   - description opcional (texto sob a legenda)
                           # Reutilizável em qualquer página do portal.
  features/comoChegar/
    ComoChegarPage.tsx     # composição: PageShell + SectionHeader +
                           # HighlightCard + N seções de InfoCard via .map +
                           # FigureCard ao final
  pages/
    ComoChegar.tsx         # apenas <ComoChegarPage />
```

## Componentes genéricos (sem domínio)

`InfoCard` props:
```ts
{
  icon: LucideIcon
  title: string
  description?: string
  action?: { label: string; icon?: LucideIcon; onClick?: () => void; href?: string; external?: boolean }
}
```

`HighlightCard` props:
```ts
{
  eyebrow?: string
  icon?: LucideIcon
  title: string
  lines?: string[]                // linhas meta (endereço, cidade, CEP, etc.)
  primaryAction?: { label: string; icon?: LucideIcon; onClick?: () => void; href?: string; external?: boolean }
}
```

`FigureCard` props:
```ts
{
  src?: string
  alt?: string
  caption?: string
  description?: string
  aspect?: 'video' | 'square' | 'wide'   // default 'video'
}
```

Nenhum deles importa nada de `content/comoChegar` ou `data/comoChegar`. Ficam disponíveis para Convênios, Informações da clínica, Falar com a secretaria, Outra dúvida, etc.

## Escalabilidade dos dados

`data/comoChegar.ts` exporta `sections: Section[]` em vez de uma lista plana. Cada seção tem `id`, `titulo?` (opcional, para futuros agrupamentos como "Por perto" / "Antes da visita") e `cards: InfoCardData[]`. Inicialmente uma única seção sem título contém os 5 cards atuais (Estacionamento, Acessibilidade, Antecedência, Documentos, Precisa de ajuda?). Adicionar Transporte público, Hotéis, Restaurantes, Farmácias, Horário, Convênios = apenas push no array (ou nova seção).

Cada `InfoCardData`:
```ts
{
  id: string
  icon: LucideIcon
  titulo: string
  descricao: string
  action?: { kind: 'whatsapp' | 'maps' | 'link'; label: string; href?: string }
}
```

A página resolve `action.kind` em handler concreto (whatsapp → `whatsappComMensagem`, maps → abre `localizacao.mapsUrl` ou dispara toast amigável, link → href direto). Assim os dados continuam declarativos e os componentes continuam neutros.

## Botão "Abrir no Google Maps" sem URL

Sempre visível, mesmo estilo. Handler:
- Se `localizacao.mapsUrl` preenchido → abre em nova aba.
- Se vazio → `toast` (sonner, já no projeto) com a mensagem de `content/comoChegar.ts`: `"A localização da clínica será disponibilizada em breve."`

Mesma lógica para qualquer card de mapa futuro.

## Composição da página

1. `PageShell`.
2. `SectionHeader` — eyebrow `COMO CHEGAR`, título `Como chegar à clínica`, subtítulo do prompt.
3. `HighlightCard` — eyebrow `LOCALIZAÇÃO`, ícone `MapPin`, título = nome da clínica, `lines` = endereço/cidade/CEP (linhas vazias são filtradas), `primaryAction` = `Abrir no Google Maps` (ícone `MapPin`).
4. `sections.map` → para cada seção, opcional `<h2>` discreto + `OptionGrid` (`sm:grid-cols-2`) de `InfoCard`.
5. `FigureCard` largura total (`aspect="video"`, `rounded-3xl`, borda champagne), sem `src` por enquanto — `alt`, `caption` e `description` virão depois via dados.

## Conteúdo (`src/content/comoChegar.ts`)

```ts
export const comoChegarContent = {
  eyebrow: 'Como chegar',
  title: 'Como chegar à clínica',
  subtitle: 'Confira a localização, estacionamento e outras informações importantes antes da sua visita.',
  localizacao: { eyebrow: 'Localização', cta: 'Abrir no Google Maps' },
  mapsIndisponivelToast: 'A localização da clínica será disponibilizada em breve.',
  ajudaCta: 'Falar com a secretaria',
  whatsappMensagem: 'Olá! Tenho uma dúvida sobre como chegar à clínica.',
  foto: { alt: 'Fachada da Clínica Dra. Morgana', caption: '', description: '' },
}
```

Textos dos cards ficam em `data/comoChegar.ts` (título + descrição), mantendo o padrão do módulo Preparo.

## Responsividade

Mobile-first idêntico ao `/preparo`: container `max-w-4xl`, `OptionGrid` 1 coluna no mobile e 2 em `sm:`. `HighlightCard` empilha no mobile, alinhado em linha no desktop. `FigureCard` ocupa largura total do container.

## Fora do escopo

- Mapa incorporado, Street View, rota, GPS, tempo de deslocamento.
- Conteúdo definitivo de endereço, CEP, `mapsUrl`, link WhatsApp e foto — entram depois sem alterar componentes.
- Página-hub e qualquer alteração em `/`, `/agendar`, `/pre-agendamento`, `/preparo`.
