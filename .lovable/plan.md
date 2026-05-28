## Trocar imagem do bloco "Sobre a Clínica"

### Ação

1. **Copiar a nova foto** `user-uploads://MK.png` para `src/assets/dra-morgana-sobre.png` (PNG transparente, preservando o recorte sem fundo).

2. **Atualizar `src/pages/IndexV2.tsx`** (seção `About`, linhas 237-256):
   - Trocar o import `draHeroV2` pela nova imagem.
   - Substituir o `<img>` por uma estrutura com **fundo esfumaçado** atrás da foto recortada, em harmonia com a paleta do site (wine/champagne/rosa suave):
     - Container com gradiente radial suave: do `champagne/30` no centro para `transparent` nas bordas, criando halo aveludado.
     - Camada extra com `bg-gradient-rose` em baixa opacidade para dar profundidade.
     - Leve `blur` nas camadas de fundo para o efeito "esfumaçado".
     - Foto (PNG transparente) sobreposta, sem `rounded-sm`/`shadow-elegant` recortando o sujeito — sombra sutil apenas embaixo via drop-shadow.
   - Manter a moldura champagne deslocada e o badge "+50 mil pacientes" como estão.

### O que NÃO muda

- Texto, tipografia, layout em grid, badge de estatística.
- Demais seções da página.
- Tokens de cor do design system (uso apenas dos existentes: `champagne`, `wine-deep`, `gradient-rose`).
