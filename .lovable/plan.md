## Problema

O preview está com erro porque o pacote `@supabase/supabase-js` foi removido das dependências do `package.json`, mas continua sendo importado em `src/lib/supabase.ts`. Como `AuthContext`, `Login`, `Dashboard`, `ConversationEngine` e o fluxo de pré-agendamento dependem desse arquivo, qualquer rota que carrega esses módulos (`/agendar`, `/pre-agendamento`, `/painel`, `/painel/login`) quebra ao tentar resolver o import — daí os 404/erros que você está vendo.

As rotas em si continuam declaradas corretamente em `src/App.tsx` (`/agendar`, `/pre-agendamento`, `/painel`, `/painel/login`, `/painel/:id`, `/videos`, `/exames/:slug`). O problema é puramente a dependência faltando.

## Correção

1. Reinstalar `@supabase/supabase-js` como dependência do projeto (`bun add @supabase/supabase-js`).
2. Após instalado, rebuildar e validar que:
   - `/` carrega normal,
   - `/agendar` abre o Portal do Paciente,
   - `/painel/login` abre a tela de login,
   - `/pre-agendamento` abre o fluxo conversacional.
3. Se ainda restar algum import quebrado após a instalação, fazer um `rg "from '@supabase"` para confirmar que todos os caminhos resolvem.

Nenhuma rota será removida ou alterada — só a dependência será reposta.