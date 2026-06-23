# Módulo: Preparo para Exames

Nova rota independente, isolada dos fluxos existentes. Identidade visual mantida (paleta wine/champagne/rose, Comfortaa + Cormorant + Jost, cards arredondados, botões pill, transições suaves do `/agendar`). Arquitetura preparada para alimentar futuros módulos (Como chegar, Convênios, Informações da clínica, Falar com a secretaria, Outra dúvida).

## Rota

- `/preparo` adicionada em `src/App.tsx` (lazy). Nada mais é tocado.

## Princípios

1. **Componentes genéricos** — nenhum componente nomeado "Preparo*". A camada de UI é reutilizável por qualquer módulo futuro.
2. **Sem emojis** — apenas ícones Lucide (`Sun`, `Moon`, `Droplets`, `Utensils`, `Pill`, `FileText`, `Clock`, `AlertTriangle`, `Baby`, `Salad`, `Toilet`, etc.).
3. **Zero texto hardcoded** em componentes — toda copy vem de arquivos de conteúdo.

## Estrutura de arquivos

```text
src/
  content/
    preparo.ts            # textos da tela (título, subtítulo, eyebrow, CTA "Falar com a secretaria",
                          # card "Não encontrou seu exame?", rodapé do modal, labels dos botões,
                          # mensagem dos exames sem preparo específico)
    common.ts             # textos genéricos reutilizáveis (Voltar ao site, Fechar, Salvar preparo, etc.)
  data/preparos/
    icons.ts              # IconKey -> componente Lucide
    preparos.ts           # PreparoGroup[] (pelve-bexiga, abdome-superior,
                          #   abdome-total-manha, abdome-total-tarde, obstetrico,
                          #   sem-preparo)
    exams.ts              # Exam[] com preparoId | variants
    index.ts              # re-export + helpers (getExam, getPreparo)
  components/common/
    PageShell.tsx         # header minimal (logo + link voltar) + main centralizado
    SectionHeader.tsx     # eyebrow + título + subtítulo + divisor champagne
    OptionCard.tsx        # card genérico (ícone Lucide, título, descrição opcional, chevron)
    OptionGrid.tsx        # grid responsivo de OptionCard
    InfoModal.tsx         # Dialog genérico: título, chip meta opcional, slots de conteúdo, ações
    ChoiceModal.tsx       # Dialog pequeno com pergunta + N opções (usado p/ Manhã/Tarde e futuros)
    InfoBlock.tsx         # bloco "ícone + título + lista de itens"
    InfoBlockList.tsx     # renderiza array de InfoBlock + observações
    CalloutCard.tsx       # card "pergunta + botão" (usado por "Não encontrou seu exame?")
    IconBadge.tsx         # círculo rose com ícone Lucide
  features/preparo/       # apenas composição (sem UI nova)
    PreparoPage.tsx       # monta PageShell + SectionHeader + OptionGrid + CalloutCard
    PreparoFlow.tsx       # estado: exame selecionado, variante, modal aberto
    SavePreparoButton.tsx # dispara geração da imagem
    image/
      PreparoPoster.tsx   # template visual da imagem (1080×1920)
      renderPoster.ts     # html-to-image -> download PNG
  pages/
    Preparo.tsx           # apenas <PreparoPage />
```

`features/preparo/` contém só a "cola" entre componentes genéricos e dados; não introduz UI nova.

## Modelo de dados

```ts
type IconKey =
  | 'jejum' | 'agua' | 'bexiga' | 'medicamento' | 'gestacao'
  | 'documentos' | 'horario' | 'observacao' | 'alimentacao'
  | 'sonda' | 'cuidados' | 'manha' | 'tarde'

type InfoBlockData = { icon: IconKey; title: string; items: string[] }
type PreparoGroup  = { id: string; nome: string; blocos: InfoBlockData[]; observacoes?: string[] }

type ExamVariant = { id: string; label: string; icon: IconKey; preparoId: string }
type Exam =
  | { id: string; nome: string; preparoId: string }
  | { id: string; nome: string; variants: ExamVariant[] }
```

Mapeamento de exames:

- Abdome Total → variants `manha` / `tarde`
- Abdome Superior → `abdome-superior`
- Rins e Vias Urinárias / Pélvico Feminino / Pélvico Masculino → `pelve-bexiga`
- Obstétrico / Morfológico / Doppler Obstétrico → `obstetrico`
- Transvaginal / Mamas / Tireoide / Próstata / Outro exame → `sem-preparo`

O preparo `sem-preparo` renderiza a mensagem acolhedora vinda de `content/preparo.ts`:

> Não há preparo especial para este exame. Nossa equipe enviará todas as orientações necessárias pelo WhatsApp após a confirmação do seu agendamento.

## Tela inicial (`/preparo`)

`PageShell` + `SectionHeader` (eyebrow `PREPARO PARA EXAMES`, título `Preparo para exames`, subtítulo `Selecione o exame que você irá realizar.`) + `OptionGrid` (grid `sm:grid-cols-2 lg:grid-cols-3`, gap-4, `OptionCard` com ícone Lucide + nome do exame + chevron, mesmo estilo dos cards do `/agendar`).

Abaixo da grade, `CalloutCard` discreto:
- Pergunta: `Não encontrou seu exame?`
- Botão pill secundário `Falar com a secretaria` → abre WhatsApp (`https://wa.me/5531993910212` — mesma constante já usada no `/agendar`, extraída para `lib/contato.ts`).

## Fluxo de modais

`PreparoFlow` controla:
1. Clique em exame sem variants → abre `InfoModal` direto.
2. Clique em exame com variants → abre `ChoiceModal` (pergunta de `content/preparo.ts`, opções Manhã/Tarde com ícones `Sun`/`Moon`). Ao escolher, troca para `InfoModal` da variante.

`InfoModal` (genérico):
- Header: título + chip meta opcional (`Clock` + label `Leitura: menos de 1 minuto`, vindo de content).
- Separator champagne.
- Slot principal: `InfoBlockList` (cada bloco = `IconBadge` Lucide + título uppercase + bullets champagne).
- Slot observações (se houver).
- Footer pequeno: texto vindo de content ("Essas orientações também serão enviadas...").
- Ações: botão primário `Salvar preparo` (wine) + botão ghost `Fechar`. Ambos labels vindos de `content/common.ts`. Em exames `sem-preparo`, o botão primário vira `Falar com a secretaria` (WhatsApp) — definido por flag no PreparoGroup, sem condicional dentro do componente.

## Salvar preparo (imagem)

Botão `Salvar preparo` (label só), formato interno PNG.

- Dep: `html-to-image`.
- `PreparoPoster` (1080×1920, off-screen, fontes do projeto):
  - Topo: faixa cream com `logo-horiz.png`.
  - Faixa wine fina com nome do exame em Comfortaa.
  - Blocos de preparo gerados a partir do mesmo `InfoBlockList`, com tipografia maior, espaçamento generoso, badges rose com ícone Lucide.
  - Observações destacadas em card champagne.
  - Rodapé: nome da clínica + telefone + site, vindos de `content/common.ts`.
- `renderPoster` → `toPng` → `<a download="preparo-<slug>.png">`. iOS: abre nova aba (fallback nativo "Salvar imagem").
- Sem PDF, sem alternativas.

## Conteúdo (exemplo `content/preparo.ts`)

```ts
export const preparoContent = {
  eyebrow: 'Preparo para exames',
  title: 'Preparo para exames',
  subtitle: 'Selecione o exame que você irá realizar.',
  modal: {
    metaLabel: 'Leitura: menos de 1 minuto',
    footer: 'Essas orientações também serão enviadas novamente pela nossa equipe após a confirmação do agendamento.',
  },
  semPreparo: {
    titulo: 'Sem preparo especial',
    mensagem: 'Não há preparo especial para este exame. Nossa equipe enviará todas as orientações necessárias pelo WhatsApp após a confirmação do seu agendamento.',
  },
  periodoModal: {
    titulo: 'Seu exame será realizado em qual período?',
    opcoes: [
      { id: 'manha', label: 'Manhã', icon: 'manha' },
      { id: 'tarde', label: 'Tarde', icon: 'tarde' },
    ],
  },
  callout: {
    pergunta: 'Não encontrou seu exame?',
    cta: 'Falar com a secretaria',
  },
}
```

`content/common.ts` guarda labels reaproveitáveis: `voltarAoSite`, `fechar`, `salvarPreparo`, `falarComSecretaria`, dados de contato da clínica.

## Reutilização futura

Os módulos `Como chegar`, `Convênios`, `Informações da clínica`, `Falar com a secretaria`, `Outra dúvida` poderão reusar:
- `PageShell`, `SectionHeader`, `OptionGrid`, `OptionCard`, `CalloutCard`
- `InfoModal`, `ChoiceModal`, `InfoBlock`, `InfoBlockList`, `IconBadge`

Cada módulo novo só precisa de um arquivo em `content/` e dados próprios.

## Fora do escopo

- Página-hub de serviços.
- Alterações em `/agendar`, `/pre-agendamento` e quaisquer fluxos existentes.
- Conteúdo definitivo para exames `sem-preparo` (mensagem acolhedora cobre todos por enquanto).
