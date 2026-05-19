## Atualizar conteúdo dos 3 exames

Vou puxar os textos das páginas existentes em `dramorgana.com.br` e adaptá-los ao formato narrativo (hero + sections + faq) já usado em Translucência Nucal, Doppler e Morfológicos. Slugs e `legacySlug` preservados — só conteúdo muda.

Arquivo único editado: `src/data/exams.ts` (3 objetos).

---

### 1. Perfil Biofísico Fetal — `slug: "perfil-biofisico-fetal"` (`/pbf`)

- **hero.tagline:** "Avaliação do bem-estar fetal."
- **hero.intro:** Texto adaptado do "O que é?": ultrassom que combina observação em tempo real com medida do líquido amniótico para verificar oxigenação e nutrição do bebê.
- **Sections:**
  1. `paragraph` — *Para que serve* — vitalidade do bebê em gestações de risco, suspeita de sofrimento fetal, hipertensão, diabetes gestacional, RCIU, diminuição de movimentos.
  2. `list` — *Como é feito* — 4 parâmetros avaliados (movimentos corporais, movimentos respiratórios, tônus fetal, índice de líquido amniótico). Footer: "Cada item recebe 0 ou 2 pontos. Resultado final de 0 a 8."
  3. `list` — *Como é interpretado* — 8/8 normal; 6/8 duvidoso (pode exigir cardiotocografia); 4/8 ou menos anormal (possível sofrimento fetal, pode exigir antecipação do parto).
- **preparation / duration / whatToBring:** mantidos como já estão.

---

### 2. Ecocardiograma Fetal — `slug: "ecocardiograma-fetal"` (`/ecocardiograma`)

- **hero.tagline:** "Um exame que salva vidas."
- **hero.intro:** Ultrassom especializado que avalia em detalhes o coração do bebê — anatomia, funcionamento e fluxo sanguíneo.
- **Sections:**
  1. `paragraph` — *Por que é tão importante* — detecta cardiopatias congênitas precocemente, permitindo planejar intervenções no nascimento, acompanhamento na gravidez e escolha da maternidade adequada.
  2. `highlight` — *Quando deve ser feito* — entre 24 e 28 semanas; mais cedo ou repetido em casos de suspeita ou histórico familiar.
  3. `list` — *Benefícios* — atendimento imediato ao nascer (ex.: DSAV, Tetralogia de Fallot); preparo emocional dos pais; maior chance de recuperação; menor custo futuro.
  4. `highlight` — *Indicação* — TODAS as gestantes, especialmente com diabetes, lúpus, gestação gemelar ou histórico familiar de cardiopatia.
- **FAQ:** 5 perguntas do site (preparo, segurança, duração, substitui o morfológico?, e se for detectada alteração).
- **duration:** "Cerca de 1 hora" (ajustado conforme o site).

---

### 3. Abdome Total — `slug: "abdome-total"` (`/abdome-total`)

- **hero.tagline:** "Avaliação completa dos órgãos abdominais."
- **hero.intro:** Examina a maioria dos órgãos do abdome — fígado, rins, aorta, pâncreas, vesícula biliar, baço e bexiga. Não substitui exame específico para estômago e intestino.
- **Sections:**
  1. `list` — *O que ele pode detectar* — fígado/vesícula (cirrose, esteatose, cálculo, tumores, pólipos); rins (cálculos, cistos, tumores, hidronefrose, malformações); pâncreas (pancreatite, cistos, tumores); baço (esplenomegalia, tumores, cistos); aorta (aneurismas, trombose); bexiga (cálculos, tumores).
  2. `paragraph` — *Importância do diagnóstico* — detecção precoce de patologias, monitoramento de condições crônicas, orientação para exames complementares.
  3. `list` — *Preparo* — itens do site: jejum de 8h, dieta leve na véspera (orientações específicas), 4 copos de água 2h antes, não esvaziar a bexiga, Dimeticona/Simeticona de 6/6h na véspera e em jejum no dia. Footer com obs. 1 e 2 (crianças/tarde e sonda vesical).
- **duration / whatToBring:** mantidos.
- **preparation:** removido o campo simples (substituído pela seção de Preparo acima) para não duplicar.

---

### Observações

- Não vou alterar imagens nem adicionar `hero.image` (não há assets locais para essas 3 páginas ainda). Se quiser que eu importe as imagens originais do site, é um passo extra.
- Nenhum slug, rota ou `legacySlug` será alterado — `/pbf`, `/ecocardiograma` e `/abdome-total` continuam funcionando.
- Nenhum outro arquivo é tocado.
