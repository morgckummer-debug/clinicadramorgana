## Erro de build
```
Could not load /dev-server/src/assets/logo-clinica.png
(imported by src/components/conversation/ConversationHeader.tsx)
```
O arquivo virou `logo-clinica.webp` na otimização anterior, mas o import ficou apontando para `.png`.

## Correção (1 linha)
Em `src/components/conversation/ConversationHeader.tsx`:
```diff
- import logo from '@/assets/logo-clinica.png'
+ import logo from '@/assets/logo-clinica.webp'
```

## O que NÃO muda
Nenhuma rota é tocada. O `App.tsx` permanece com:
`/`, `/v1`, `/v2`, `/exames/:slug`, `/videos`, `/agendar`, `/pre-agendamento`, `/painel/login`, `/painel`, `/painel/:id` + rotas legadas.

## Verificação
Rodar `bun run build` e confirmar exit 0.