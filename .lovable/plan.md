
# Modal Informativo Reutilizável (Horário de Funcionamento)

Componente genérico e reutilizável, sem rota. Nenhuma página existente é tocada.

## Arquivos novos

```text
src/
  content/businessHours.ts              # copy específica de horários
  components/common/InfoModal.tsx       # modal genérico, renomeado para refletir reuso
```

## 1. Estrutura totalmente genérica (ajuste #1)

O componente não assume que os blocos são "horários". Estrutura abstrata, reutilizável para "Contatos", "Documentos", "Informações importantes", etc.

```ts
// src/content/businessHours.ts
export type InfoBloco = {
  id: string
  icon: LucideIcon
  titulo: string
  linhas: string[]   // cada string é uma linha de texto livre
}

export const businessHoursContent = {
  titulo: 'Horário de funcionamento',
  subtitulo: 'Confira nossos horários de atendimento.',
  blocos: [
    {
      id: 'clinica',
      icon: Hospital,
      titulo: 'Atendimento na clínica',
      linhas: [
        'Segunda a sexta-feira — 07h00 às 18h00',
        'Sábado — 07h30 às 12h00',
      ],
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      titulo: 'Atendimento pelo WhatsApp',
      linhas: [
        'Segunda a sexta-feira — 08h00 às 11h00',
        '12h30 às 17h30',
      ],
    },
  ] as InfoBloco[],
  observacao: 'Domingos e feriados não possuem atendimento.',
  botaoPrimario: {
    label: 'Falar com a nossa equipe',
    mensagemWhatsapp: 'Olá! Gostaria de falar com a equipe da clínica.',
  },
  botaoSecundario: {
    label: 'Fechar',
  },
}
```

`InfoBloco` usa apenas `icon + titulo + linhas[]` — sem campos específicos de horário. Cada `linha` é texto livre: quem consome decide o formato ("Seg a Sex — 07:00" ou "Cartão de identidade", etc).

## 2. Botões opcionais (ajuste #2)

Ambos os botões são controlados pela presença/absença nas props de conteúdo:

```ts
type InfoModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  content: {
    titulo: string
    subtitulo?: string
    blocos: InfoBloco[]
    observacao?: string
    botaoPrimario?: {
      label: string
      acao: () => void   // default fornecido pelo caller ou fallback WhatsApp
    }
    botaoSecundario?: {
      label: string
      acao?: () => void   // default: fecha o modal
    }
  }
}
```

- `botaoPrimario` ausente → nenhum botão primário renderizado.
- `botaoSecundario` ausente → nenhum botão secundário renderizado.
- Quando ambos ausentes, modal exibe apenas conteúdo + observação, sem ações.
- Layout dos botões: mesma estrutura do `InfoModal` existente (`flex-col-reverse sm:flex-row sm:justify-end gap-2`).

## 3. Composição visual

Mesma identidade visual dos demais módulos:

- `Dialog` / `DialogContent` — `max-w-md rounded-3xl border-champagne/40 bg-background p-7`.
- `DialogHeader` — `font-comfortaa text-wine-deep text-xl font-light` + `DialogDescription text-foreground/60 font-light`.
- Blocos — `rounded-2xl border border-champagne/40 bg-white p-5 flex gap-4`:
  - `IconBadge icon={bloco.icon} size="md"`.
  - Coluna texto: `titulo` em `text-[13px] font-medium text-wine-deep`, `linhas` mapeadas em `text-[15px] text-foreground/80 font-light` separadas por `gap-1`.
- Observação — `text-[11px] text-foreground/55 font-light text-center mt-2`, condicional.
- Rodapé de ações — condicional. Primário: `bg-wine-deep text-wine-foreground hover:bg-wine`, ícone opcional via prop `icon` no `botaoPrimario`. Secundário: `text-wine-deep hover:bg-rose/60`.

## 4. WhatsApp (default da página de horários)

Em `BusinessHoursModal` (wrapper no feature), o `botaoPrimario.acao` default abre WhatsApp com `content.botaoPrimario.mensagemWhatsapp` usando `whatsappComMensagem` de `@/lib/contato.ts`. O componente `InfoModal` puro não conhece WhatsApp — recebe apenas `acao()` genérica.

## 5. Reutilização futura

Exemplo de reuso sem horários:

```ts
const conteudoDocumentos = {
  titulo: 'Documentos necessários',
  subtitulo: 'Leve os seguintes itens no dia do exame.',
  blocos: [
    { id: 'id', icon: FileText, titulo: 'Identificação', linhas: ['RG ou CNH', 'Cartão do convênio'] },
  ],
  observacao: 'Não é necessário jejum para este exame.',
  botaoSecundario: { label: 'Entendi' },
  // sem botaoPrimario → apenas um botão
}
```

O componente `InfoModal` renderiza corretamente sem alterações.

## 6. Fora do escopo

- Status "Aberto agora" / verificação de hora atual.
- Feriados, calendário, timezone runtime.
- Alteração em qualquer página existente.
- Integração com Hub Principal (futuro).
