## Compactar seção "Experiência diferenciada com a Dra. Morgana"

### 1. Nova imagem
Gerar `src/assets/premium-belly.jpg` — close em formato quadrado/paisagem das mãos da gestante sobre a barriga, luz natural quente, tom acolhedor e sofisticado, paleta combinando com dourado/vinho.

### 2. Reduzir tamanho da seção
Em `src/components/site/PremiumExperience.tsx`:
- Padding da section: `py-16 md:py-24` → `py-10 md:py-14`
- Padding do card: `p-8 md:p-14` → `p-6 md:p-10`
- Gap do grid: `gap-10 md:gap-14` → `gap-8 md:gap-10`
- Título: `text-3xl md:text-[2.6rem]` → `text-2xl md:text-[1.9rem]`
- Subtítulo: `text-base md:text-lg` → `text-sm md:text-base`, encurtar margens
- Lista de diferenciais: reduzir margem superior e tamanho dos ícones/círculos
- Botão CTA: reduzir padding `px-7 py-4` → `px-6 py-3`

### 3. Trocar imagem e proporção
- Substituir `premium-pregnant.jpg` por `premium-belly.jpg`
- Aspect ratio: `aspect-[3/4]` → `aspect-square` (ou `aspect-[4/5]`) para reduzir altura vertical
- Atualizar `alt` para refletir o novo conteúdo ("Close das mãos da gestante sobre a barriga")
- Remover o arquivo antigo `src/assets/premium-pregnant.jpg`

### Fora de escopo
HERO, restante do layout, paleta, copy textual da seção (mantém título, subtítulo e diferenciais atuais).