## Objetivo

Adicionar validação completa de CPF brasileiro na pergunta de CPF (`q4`) do formulário de pré-agendamento, exibindo erro inline e bloqueando o avanço enquanto o CPF for inválido.

## Regras de validação

- Aceitar entrada com ou sem máscara (a máscara `000.000.000-00` já existe).
- Remover caracteres não numéricos antes de validar.
- Exigir exatamente 11 dígitos.
- Rejeitar sequências com todos os dígitos iguais (`00000000000`, `11111111111`, …, `99999999999`).
- Validar os dois dígitos verificadores pelo algoritmo oficial (módulo 11).
- Enquanto o CPF estiver incompleto (menos de 11 dígitos), **não** mostrar mensagem de erro — apenas manter o botão "Continuar" desabilitado.
- Quando os 11 dígitos estiverem preenchidos e o CPF for inválido:
  - Exibir a mensagem **"CPF inválido. Por favor, verifique os números digitados."** abaixo do campo (mesmo estilo já usado para erro de data).
  - Manter o botão "Continuar" desabilitado, impedindo o avanço.

## Mudanças técnicas

1. **`src/lib/utils.ts`** — adicionar utilitário `isValidCPF(value: string): boolean` que normaliza dígitos, descarta repetidos e valida os dois DVs por módulo 11.

2. **`src/components/conversation/QuestionRenderer.tsx`** (bloco `input`/`textarea`, linhas 94–118) — quando `question.mask === 'cpf'`:
   - Calcular `isCpfComplete` (11 dígitos) e `cpfError`.
   - Passar `error={cpfError}` ao `TextAnswer` (a infraestrutura de erro inline já existe, linhas 78–80 de `TextAnswer.tsx`).

3. **`src/components/conversation/ConversationEngine.tsx`** (função `isAnswered`, ~linhas 152–159) — para `mask === 'cpf'`, retornar `true` somente se `isValidCPF(strValue)`. Isso desabilita "Continuar" para CPF inválido sem alterar nenhuma outra lógica do fluxo.

Nenhuma alteração em backend, RPC, schema ou demais perguntas. Comportamento dos outros campos (data, telefone, etc.) permanece intacto.
