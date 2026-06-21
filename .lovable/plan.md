## Objetivo
Corrigir o estilo do botão principal de pré-agendamento no Hero (`src/components/site/Hero.tsx`), garantindo fundo bege opaco, borda fina roxa e texto roxo, conforme solicitado.

## O que será feito

1. **Localizar o botão**  
   O botão "Agendar exame" está em `src/components/site/Hero.tsx`, atualmente com `style={{ background: '#FDDCB5', color: '#5B2D8E' }}` e sem borda.

2. **Aplicar os estilos solicitados**  
   - Fundo bege sólido (`#FDDCB5`) — garantir que não fique transparente.  
   - Borda fina roxa (`#5B2D8E`).  
   - Texto roxo (`#5B2D8E`).  
   - Manter o formato arredondado (`rounded-full`) e a sombra suave existente.

3. **Preferência técnica**  
   Se possível, converter o estilo inline para classes Tailwind usando os tokens semânticos do projeto (`bg-champagne`, `text-wine-deep`, `border-wine-deep`) para alinhar ao design system. Caso a cor bege específica (`#FDDCB5`) não tenha token equivalente, mantenho o valor inline apenas para esse par de cor/borda.

4. **Validação**  
   Verificar no preview se o botão aparece com fundo bege opaco, borda roxa fina e texto roxo, sem sobreposição transparente.

## Resultado esperado
Botão de "Agendar exame" no Hero com aparência sólida e elegante: fundo bege, contorno roxo fino e texto roxo.