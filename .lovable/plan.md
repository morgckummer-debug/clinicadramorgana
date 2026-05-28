# Plano: CTAs de "Agendar exame" em destaque

## Objetivo
Aumentar a conversão de agendamentos via WhatsApp com 3 pontos de contato visualmente integrados ao design atual (wine + champagne, Comfortaa), sem poluir a experiência.

## 1. Barra fixa no topo (todas as páginas)
Novo componente `src/components/site/AnnouncementBar.tsx`:
- Faixa fina (~36px) acima da Navbar, fundo `bg-wine-deep` com linha champagne sutil
- Texto curto à esquerda: "Atendimento humanizado · Laudo no mesmo dia"
- CTA à direita: "Agendar exame no WhatsApp →" em champagne
- Botão de fechar (X) com persistência em `localStorage` (`cta-bar-dismissed`)
- Responsivo: em mobile mostra só o CTA
- Ajustar `Navbar` para `top-9` quando a barra está ativa (estado compartilhado simples via `localStorage` + custom event)

Incluir em `IndexV2.tsx`, `Index.tsx` e `ExamDetail.tsx`.

## 2. Botão flutuante lateral "Agendar exame"
Novo componente `src/components/site/ScheduleFab.tsx`:
- Pílula vertical fixa na lateral direita, abaixo do WhatsApp atual
- Fundo champagne, texto wine-deep, rotacionado 90°: "Agendar exame"
- Aparece após scroll > 600px com fade-up
- Some/aparece junto com o WhatsAppFab existente
- Em mobile vira um segundo FAB redondo (ícone calendário) empilhado acima do WhatsApp

Adicionar nas mesmas páginas onde o `WhatsAppFab` já existe.

## 3. Banner final nas páginas de exame
Novo bloco em `src/pages/ExamDetail.tsx`, logo antes do `Footer`:
- Seção full-width com fundo `bg-wine-deep`, padding generoso
- Título grande Comfortaa: "Pronta para agendar seu {nome do exame}?"
- Subtítulo curto sobre atendimento humanizado / laudo no mesmo dia
- CTA grande champagne: "Falar no WhatsApp"
- Linha decorativa champagne em cima, igual ao padrão do `Contact`

## Detalhes técnicos
- WhatsApp link reutilizado: `https://api.whatsapp.com/send?phone=5531993910212`
- Todos os CTAs usam tokens semânticos já definidos (`wine-deep`, `champagne`, `wine-foreground`) — sem cores hardcoded
- Animações suaves (`animate-fade-up`, `transition-all duration-500`) seguindo o padrão atual
- Z-index coordenado: AnnouncementBar (z-50), Navbar (z-40 quando há barra), FABs (z-40)
- Acessibilidade: `aria-label` em todos os botões e ícones, foco visível
- Sem mudanças de dados, rotas ou lógica de negócio

## Fora de escopo
- Link para `dramorganakummer.lovable.app` (decidido: não agora)
- Mudanças no formulário de contato ou no componente `Contact` existente
- Nova lógica de tracking/analytics
