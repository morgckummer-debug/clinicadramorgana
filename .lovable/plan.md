## Reestruturar categorias de exames conforme o site original

Hoje o projeto tem **3 categorias** (Obstétrico, Ginecológico, Medicina Interna). O site oficial tem **6**. Vou expandir a tipagem, adicionar as 3 novas categorias e cadastrar os exames que faltam.

---

### Mapa final das categorias (igual ao site)

**1. Obstétrico** (já existe — só adicionar 1 item)
- Obstétrico Simples *(novo — entrada simples sem TN/Doppler)*
- 1º Trimestre (TV) ✓
- Obstétrico com TN ✓
- Obstétrico com Doppler ✓
- Morfológico 1º/2º/3º Trimestre ✓
- Obstétrico 3D/4D ✓
- PBF ✓
- Ecocardiograma Fetal ✓
- *(Colo Uterino e Cerclagem continuam aqui, embora não apareçam na grade do site — manter)*

**2. Medicina Interna** (adicionar 2)
- Abdome Total ✓ · Abdome Superior ✓ · Hipocôndrio Direito ✓ · Rins e Vias Urinárias ✓ · Pélvico Masculino ✓
- Pélvico Infantil *(novo)*
- Partes Moles *(novo)*

**3. Ginecológico** (já completo)
- Transvaginal ✓ · Transvaginal 3D ✓ · Transv. com Doppler ✓ · Rastreamento de Ovulação ✓ · Endometriose Profunda ✓ · Períneo ✓
- *(Mamas e Axilas — verificar se já existe ou criar como novo)*

**4. Vascular** *(categoria nova)*
- Duplex Scan (MMII)
- Carótidas e Vertebrais
- Aorta e Ilíacas

**5. Tireóide e Cervical** *(categoria nova)*
- Tireóide com Doppler
- Cervical com Doppler
- Glândulas Salivares

**6. Pediátrico** *(categoria nova)*
- Abdominal Total
- Rins e Vias Urinárias (pediátrico)
- Transfontanela

---

### Mudanças técnicas em `src/data/exams.ts`

1. **Expandir `ExamCategory`:**
   ```ts
   export type ExamCategory =
     | "Obstétrico"
     | "Ginecológico"
     | "Medicina Interna"
     | "Vascular"
     | "Tireóide e Cervical"
     | "Pediátrico";
   ```

2. **Atualizar `categoryThumbs` e `categoryDescriptions`** com as 3 novas categorias. Reutilizar `thumb-pediatrico.jpg` (já existe em `src/assets/`). Para Vascular e Tireóide, gerar 2 thumbnails novas com `imagegen` no mesmo estilo (premium, fundo lilás/champagne, ilustração estilizada).

3. **Adicionar ~11 exames novos** ao array `exams[]`, todos com a mesma estrutura mínima (`slug`, `legacySlug` quando o site tiver URL própria, `category`, `title`, `shortDesc`, `longDesc`, `preparation`, `duration`, `whatToBring`). Conteúdo factual e enxuto — sem `sections` ricas nem `faq` por enquanto (posso enriquecer depois conforme você for me passando as URLs do site original, exatamente como fizemos com Colo Uterino e Cerclagem).

4. **Verificar grade da home (`src/components/site/Exams.tsx`)** — hoje ela tem categorias fictícias hard-coded (Ginecológico/3D/Geral/Doppler). Trocar para renderizar dinamicamente as 6 categorias reais a partir de `categoryDescriptions` + `getExamsByCategory`, espelhando o layout da imagem que você mandou.

---

### O que NÃO faço neste plano

- **Não vou redigir o conteúdo completo** (sections, FAQ, imagens internas) dos 11 exames novos agora. Cada um entra com texto curto de placeholder médico. Depois você me passa as URLs (igual fizemos com `/colo-uterino` e `/cerclagem`) e eu enriqueço um por um.
- **Não mexo em rotas / `legacySlug`** dos exames já existentes.

### Pergunta antes de implementar

Confirma que posso seguir assim? Ou prefere que eu **já redija o conteúdo completo dos 11 exames novos** agora (vai dar uma resposta longa e o texto será meu, não do site)?