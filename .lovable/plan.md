# Módulo: Falar com a secretaria

Nova rota `/falar-secretaria`, isolada. 100% composta com componentes já existentes — nenhum componente novo. Padrão visual idêntico a `/preparo` e `/como-chegar`.

## Rota

- `/falar-secretaria` em `src/App.tsx` com `lazy()`. Nada mais é tocado.

## Componentes reutilizados (já existem)

- `PageShell`, `SectionHeader`, `OptionGrid`, `InfoCard`, `IconBadge`.
- `CalloutCard` — usado no rodapé. Ajuste mínimo: tornar `cta` opcional e não renderizar o botão quando ausente (mantém todos os usos atuais que continuam passando `cta`).
- `lib/contato.ts` — `whatsappComMensagem(mensagem)` já centraliza o número via `CLINICA.whatsappNumero`. Usar diretamente.

Nenhum componente novo é criado.

## Arquivos novos

```text
src/
  content/falarSecretaria.ts       # toda a copy estática da página
  data/falarSecretaria.ts          # assuntos + mensagens WhatsApp
  lib/atendimento.ts               # horário de atendimento (estrutura, sem lógica ativa)
  features/falarSecretaria/
    FalarSecretariaPage.tsx        # composição + resolver de ações
  pages/FalarSecretaria.tsx        # apenas <FalarSecretariaPage />
```

## 1. Ações genéricas (não limitar ao WhatsApp)

Tipo `AssuntoAction` discriminado, preparado para crescer sem mudar arquitetura:

```ts
export type AssuntoAction =
  | { kind: 'whatsapp'; mensagem: string }
  | { kind: 'navegar'; to: string }
  | { kind: 'telefone'; numero: string }
  | { kind: 'modal'; modalId: string }
  | { kind: 'formulario'; formId: string }
  | { kind: 'link'; href: string; external?: boolean }
```

`AssuntoSecretaria`:
```ts
{
  id: string
  icon: LucideIcon       // BadgeDollarSign, CalendarClock, ShieldCheck, CircleHelp
  titulo: string
  descricao: string
  acao: AssuntoAction
  ctaLabel?: string      // opcional; default vem de content.ctaPadrao
}
```

Resolver único na página (`FalarSecretariaPage.tsx`):

```ts
function executarAcao(acao: AssuntoAction) {
  switch (acao.kind) {
    case 'whatsapp':   window.open(whatsappComMensagem(acao.mensagem), '_blank'); break
    case 'navegar':    navigate(acao.to); break
    case 'telefone':   window.location.href = `tel:${acao.numero}`; break
    case 'link':       window.open(acao.href, acao.external ? '_blank' : '_self'); break
    case 'modal':      /* hook futuro */ break
    case 'formulario': /* hook futuro */ break
  }
}
```

Hoje todos os 4 cards usam `kind: 'whatsapp'`. Trocar um para `navegar` ou `telefone` no futuro = editar só os dados.

## 2. Mensagens 100% na camada de dados

Mensagens do WhatsApp ficam apenas dentro de `acao.mensagem` em `data/falarSecretaria.ts`. Nenhuma string de mensagem entra em componente React. O resolver acima lê de `acao.mensagem` — nunca de constantes em componente.

```ts
export const assuntos: AssuntoSecretaria[] = [
  { id: 'valores',     icon: BadgeDollarSign, titulo: 'Valores dos exames',
    descricao: '…',    acao: { kind: 'whatsapp', mensagem: 'Olá! Gostaria de informações sobre valores dos exames.' } },
  { id: 'agendamento', icon: CalendarClock,   titulo: 'Agendamento',
    descricao: '…',    acao: { kind: 'whatsapp', mensagem: 'Olá! Preciso de ajuda com meu agendamento.' } },
  { id: 'convenios',   icon: ShieldCheck,     titulo: 'Convênios',
    descricao: '…',    acao: { kind: 'whatsapp', mensagem: 'Olá! Gostaria de informações sobre convênios.' } },
  { id: 'outra',       icon: CircleHelp,      titulo: 'Outra dúvida',
    descricao: '…',    acao: { kind: 'whatsapp', mensagem: 'Olá! Tenho uma dúvida e gostaria de falar com a secretaria.' } },
]
```

## 3. Preparação para horário de atendimento (sem lógica agora)

Novo `src/lib/atendimento.ts` centraliza a configuração e a API, **sem implementar a verificação ativa**:

```ts
export type Janela = { inicio: string; fim: string }  // 'HH:MM'

export const HORARIO_ATENDIMENTO = {
  diasUteis: [1, 2, 3, 4, 5],
  janelas: [
    { inicio: '08:00', fim: '11:00' },
    { inicio: '12:30', fim: '17:30' },
  ] as Janela[],
  timezone: 'America/Sao_Paulo',
}

export type StatusAtendimento = 'disponivel' | 'fora_horario' | 'desconhecido'

// Stub — futuramente avalia a hora atual contra HORARIO_ATENDIMENTO.
export function getStatusAtendimento(): StatusAtendimento {
  return 'desconhecido'
}
```

`content/falarSecretaria.ts` já contempla as três mensagens possíveis, prontas para uso futuro:

```ts
horario: {
  titulo: 'Horário de atendimento',
  descricaoPadrao: 'Nosso atendimento pelo WhatsApp funciona das 08:00 às 11:00 e das 12:30 às 17:30, em dias úteis. Caso sua mensagem seja enviada fora desse horário, responderemos assim que possível.',
  mensagens: {
    disponivel:   'Atendimento disponível agora.',
    fora_horario: 'No momento estamos fora do horário de atendimento. Responderemos assim que possível.',
    desconhecido: null,  // usa descricaoPadrao
  },
}
```

Na página, o `CalloutCard` recebe `description` derivado de um helper:

```ts
const status = getStatusAtendimento()
const descricao = content.horario.mensagens[status] ?? content.horario.descricaoPadrao
```

Hoje retorna sempre `'desconhecido'` → exibe `descricaoPadrao` (texto do prompt). Quando a lógica real for ligada (só em `lib/atendimento.ts`), o layout não muda — apenas a mensagem.

## Composição da página

1. `PageShell`.
2. `SectionHeader` — eyebrow `FALE CONOSCO` / título / subtítulo.
3. `OptionGrid` → `assuntos.map(a => <InfoCard icon={a.icon} title={a.titulo} description={a.descricao} action={{ label: a.ctaLabel ?? content.ctaPadrao, icon: MessageCircle, onClick: () => executarAcao(a.acao) }} />)`.
4. `CalloutCard` (sem CTA, com ícone `Clock`) — `question = content.horario.titulo`, `description = descricao` (derivada do status).

Nenhuma string fixa em componente. Toda copy via `content/`, todas as ações via `data/`, todo número de telefone via `lib/contato.ts`, todo horário via `lib/atendimento.ts`.

## Responsividade

Idêntica a `/como-chegar`: `max-w-4xl`, grid 1 col mobile / 2 col `sm:`.

## Ponto oficial de contato humano

`/falar-secretaria` torna-se o destino canônico para "atendimento humano". Outros módulos futuros podem linkar para cá — nenhum link adicionado agora.

## Fora do escopo

- Implementação real de `getStatusAtendimento` (apenas stub).
- Chat, IA, fila, CRM, formulários, modais.
- Alterar `/`, `/agendar`, `/pre-agendamento`, `/preparo`, `/como-chegar`.
