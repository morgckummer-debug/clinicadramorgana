## Objetivo

Adicionar uma seção premium na home destacando o atendimento exclusivo da Dra. Morgana, com CTA levando para o site dedicado (`https://dramorganakummer.lovable.app`). Sem mexer no Hero nem reformular o layout existente.

## Localização

Inserir **entre a seção "Sobre" e a seção "Exames"** em `src/pages/IndexV2.tsx` (entre as linhas 300 e 305). Esse ponto é natural: depois da apresentação da clínica, antes do catálogo de exames — funciona como uma "promessa" antes da lista.

## Novo componente

Criar `src/components/site/PremiumExperience.tsx` — bloco isolado e reutilizável.

### Visual

- Container `container mx-auto` com `py-16 md:py-24` (respiro generoso)
- Card horizontal com:
  - Fundo `bg-gradient-to-br from-champagne via-champagne-light to-champagne` (dourado suave)
  - Borda fina `border border-champagne-dark/30`
  - `rounded-3xl`, `shadow-[0_20px_60px_-20px_hsl(var(--wine-deep)/0.25)]`
  - Padding `p-10 md:p-16`
  - Texto em `text-wine-deep` (roxo profundo já existente no design system)
- Layout grid `md:grid-cols-[1.4fr_1fr]`:
  - Coluna esquerda: eyebrow ("Atendimento exclusivo" em uppercase, tracking-widest, com linha champagne), headline em Comfortaa, parágrafo, CTA
  - Coluna direita: lista vertical dos 4 diferenciais, cada um com ícone fino lucide (`UserRound`, `Sparkles`, `HeartHandshake`, `Clock`) em circulo champagne-dark/15

### Brilho de fundo (discreto)

Pseudo-blob radial `before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,hsl(var(--champagne-light)/0.6),transparent_60%)]` + um segundo blob sutil pulsando lentamente (`animate-[pulse_6s_ease-in-out_infinite]`) — muito leve, longe de "anúncio".

### Animação de entrada

`IntersectionObserver` ativando classes `opacity-100 translate-y-0` (de `opacity-0 translate-y-6`) com `transition-all duration-700 ease-out`. Sem libs extras.

### CTA

Botão `<a href="https://dramorganakummer.lovable.app" target="_blank" rel="noopener">`:
- `bg-wine-deep text-wine-foreground`
- `rounded-full px-8 py-4`
- Texto: **"Reservar horário exclusivo"** + ícone `ArrowUpRight`
- Hover: `hover:bg-wine` + `group-hover:translate-x-1` no ícone + brilho leve via `shadow-[0_10px_30px_-10px_hsl(var(--wine-deep)/0.5)]`

## Conteúdo (literal)

- **Eyebrow:** "Atendimento exclusivo"
- **Headline:** "Uma experiência diferenciada em medicina fetal"
- **Parágrafo:** "Atendimento realizado pessoalmente pela Dra. Morgana, referência em ultrassonografia obstétrica e medicina fetal, em um ambiente exclusivo pensado para proporcionar mais acolhimento, tecnologia e tranquilidade."
- **Diferenciais:**
  - Atendimento pessoal e individualizado
  - Equipamentos de última geração
  - Ambiente exclusivo e acolhedor
  - Mais tempo dedicado ao exame
- **CTA:** "Reservar horário exclusivo"

## Integração

Em `src/pages/IndexV2.tsx`:
1. `import { PremiumExperience } from "@/components/site/PremiumExperience"`
2. Inserir `<PremiumExperience />` logo após o fechamento da seção `#sobre` (linha 300), antes de `#exames`.

## Fora do escopo

- Não alterar Hero, Navbar, Footer, AnnouncementBar, FABs.
- Não alterar `Index.tsx` antigo nem `ExamDetail.tsx`.
- Não mexer em `dramorganakummer.lovable.app` — apenas linkar.
- Sem tracking/analytics novos.

## Detalhes técnicos

- Tokens semânticos já existentes: `champagne`, `champagne-light`, `champagne-dark`, `wine-deep`, `wine`, `wine-foreground`.
- Sem cores hard-coded. Sem novas dependências.
- Mobile-first: em telas <md, grid colapsa para 1 coluna, diferenciais ficam abaixo do CTA com `gap-4`.
- Acessibilidade: `aria-label` no CTA explicando que abre site externo, `aria-labelledby` na section.
