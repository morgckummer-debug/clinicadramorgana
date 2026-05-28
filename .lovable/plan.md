## Alterações na seção PremiumExperience

Atualizar `src/components/site/PremiumExperience.tsx` com nova paleta, novos textos e imagem.

### 1. Paleta — dourado / branco / amarelo com texto roxo

Substituir o gradiente atual (champagne/wine) por uma combinação dourada elegante:

- Fundo do card: `linear-gradient(135deg, #FFFDF7 0%, #FBF3DC 45%, #F5E6B8 100%)` (branco quente → dourado claro → dourado champanhe)
- Borda fina dourada: `border-[#E8D38A]/60`
- Brilhos radiais sutis em tons de dourado/amarelo pálido (substituem os blobs atuais)
- Sombra: `0 30px 80px -30px hsl(var(--wine-deep) / 0.25)` (mantém o roxo discreto para coesão)
- **Toda a tipografia** (eyebrow, headline, parágrafo, diferenciais) em `text-wine-deep` (roxo já existente no design system)
- Círculos dos ícones: fundo dourado suave `bg-[#F5E6B8]/60` com borda `border-[#E8D38A]` e ícone em `text-wine-deep`
- CTA: mantém `bg-wine-deep text-wine-foreground` (roxo profundo) — único acento roxo sólido, contrasta lindamente com o dourado

Os dois hex dourados (`#FBF3DC`, `#F5E6B8`, `#E8D38A`, `#FFFDF7`) ficam isolados neste componente premium — não poluem o design system global.

### 2. Textos

- **Headline:** "Uma experiência diferenciada com a Dra. Morgana"
- **Parágrafo (novo):** "Atendimento realizado pessoalmente pela Dra. Morgana, em um ambiente exclusivo pensado para proporcionar mais acolhimento, tecnologia e tranquilidade."
- Eyebrow, diferenciais e CTA permanecem iguais.

### 3. Imagem da gestante à direita

- Gerar imagem com `imagegen` (premium): retrato editorial de uma gestante feliz, luz natural quente, tons creme/dourado suaves, sorriso sereno, mão sobre a barriga, fundo desfocado neutro — estética premium, sem cara de banco de imagens médico.
- Salvar em `src/assets/premium-pregnant.jpg`, formato retrato (768×1024).
- Importar como ES6 e renderizar na coluna direita dentro de um `rounded-2xl overflow-hidden` com leve sombra dourada.

### 4. Layout

Reestruturar grid para acomodar a imagem:

- `md:grid-cols-2` com `gap-10 md:gap-14`, `items-center`
- **Coluna esquerda:** eyebrow + headline + parágrafo + lista de diferenciais (compacta, abaixo do parágrafo) + CTA
- **Coluna direita:** imagem da gestante em card arredondado, com leve glow dourado atrás
- Mobile: imagem aparece acima do conteúdo textual

A lista de diferenciais que antes ocupava a coluna direita migra para baixo do parágrafo na esquerda, em formato compacto de 2 colunas (`grid-cols-1 sm:grid-cols-2 gap-3`), cada item com ícone pequeno + texto.

### 5. Fora do escopo

- Não mexer em Hero, Navbar, Footer, outras seções.
- Não alterar tokens globais do design system.
- Sem novas dependências.
