## Diagnóstico

O console do print mostra:
- `📝 Enviando para RPC:` — payload OK
- `✅ RPC executado com sucesso` — o `criar_pre_agendamento` retornou sem erro

Mesmo assim a tela mostra "Algo deu errado". A causa está em `savePreAgendamento` (`src/components/conversation/ConversationEngine.tsx`), no bloco que roda **depois** do RPC:

```ts
const countAntes = await countPreAgendamentos()
// ... await supabase.rpc(...) ok ...
if (countAntes !== null) {
  const countDepois = await countPreAgendamentos()
  if (countDepois !== null && countDepois <= countAntes) {
    throw new Error('O agendamento não foi registrado...')
  }
}
```

O RPC é `SECURITY DEFINER` e insere normalmente, mas o role `anon` (sessão pública do formulário) não enxerga linhas de `pre_agendamentos` por RLS — o que é correto, pois são dados sensíveis de pacientes. Resultado: `countDepois` vê o mesmo número de antes, a função lança erro e a UI cai na tela "Algo deu errado", mesmo com o registro salvo. Quando o usuário clica "Tentar novamente", cria duplicatas — o que explica também o comportamento estranho que você relatou no painel logo após a remoção dos links.

A verificação só fazia sentido enquanto o anon tinha leitura ampla. Hoje é um falso negativo garantido.

## Mudança

Arquivo único: `src/components/conversation/ConversationEngine.tsx`

1. Remover a função `countPreAgendamentos()`.
2. Em `savePreAgendamento`, remover `countAntes = await countPreAgendamentos()` antes do RPC e todo o bloco `if (countAntes !== null) { ... }` após o RPC.
3. Manter o `throw error` quando o próprio RPC retorna erro — essa é a única fonte de verdade confiável do lado do cliente.

Nada mais muda: payload, fluxo, validações, telas de sucesso/erro/bloqueio permanecem iguais.

## Verificação após implementar

- Preencher o formulário até o fim → deve ir direto para a tela de sucesso.
- Conferir no painel/Supabase que o registro aparece em `pre_agendamentos`.
- Console deve continuar mostrando `✅ RPC executado com sucesso` e **não** deve mais cair no `catch`.

## Observação (não faz parte desta mudança)

Se no futuro quiser uma verificação real de gravação, o caminho correto é o próprio RPC `criar_pre_agendamento` retornar o `id` da linha criada e o cliente checar `data` — sem depender de RLS de SELECT no anon.
