## Uniformizar fundo das fotos do Corpo Clínico

### Diagnóstico

As fotos `src/assets/team/paulo.png` e `andre.png` foram salvas com um **fundo rosa opaco embutido** (~rgb 223,186,223). As demais (`morgana`, `barbara`, `darlei`, `carolina`, `maria-amelia`) são **transparentes**, então deixam aparecer a cor da moldura oval (`bg-wine-deep/10` em `IndexV2.tsx`), que é o rosa claro que o usuário quer manter.

### Ação

Reprocessar apenas os dois PNGs problemáticos, removendo o fundo rosa e salvando como transparente — sem tocar nas demais fotos nem no componente.

Script (Python/Pillow):
- Para cada PNG (`paulo.png`, `andre.png`):
  - Abrir em RGBA.
  - Fazer flood-fill a partir dos 4 cantos com tolerância suficiente para apagar todo o fundo rosa contíguo (~±35 por canal), tornando alpha=0.
  - Suavizar borda do alpha (leve blur de 1px) para evitar serrilhado.
  - Salvar sobrescrevendo o arquivo original.

Após o processamento, as duas fotos ficam transparentes e a moldura oval do componente passa a determinar a cor de fundo, igualando o visual ao das outras.

### O que NÃO muda

- Código da seção Corpo Clínico em `IndexV2.tsx`.
- Demais fotos da equipe.
- Cor/forma da moldura oval.
