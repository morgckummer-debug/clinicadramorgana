## Plano

Vou corrigir em duas frentes: garantir que o pré-agendamento seja realmente criado no banco e garantir que o painel mostre/acuse erros em vez de parecer vazio.

### 1. Corrigir a função de criação do pré-agendamento
- Criar uma migration substituindo `criar_pre_agendamento` por uma versão determinística.
- A função vai:
  - validar nome, CPF e telefone mínimos;
  - criar ou atualizar o paciente pelo CPF;
  - sempre inserir um novo registro em `pre_agendamentos` com status `pendente`;
  - retornar o `id` do pré-agendamento criado;
  - não engolir erros silenciosamente.
- Conceder permissão de execução da RPC para o formulário público e para usuários autenticados.

### 2. Corrigir permissões de leitura/atualização do painel
- Adicionar `GRANT`s explícitos para `pacientes` e `pre_agendamentos` para usuários autenticados do painel.
- Manter dados sensíveis protegidos: não liberar leitura direta dessas tabelas para visitantes anônimos.
- Garantir acesso administrativo interno com `service_role`.

### 3. Corrigir falso sucesso no formulário
- Atualizar `ConversationEngine.tsx` para tratar a RPC como sucesso apenas se ela retornar o `id` criado.
- Se a função não retornar `id`, o formulário deve mostrar erro real em vez de tela de sucesso falsa.

### 4. Corrigir diagnóstico no painel
- Atualizar `Dashboard.tsx` para não ignorar erros das consultas.
- Se houver erro de permissão, join com paciente ou falha de consulta, exibir/logar o erro em vez de mostrar “nenhum resultado” silenciosamente.

### Resultado esperado
- Um novo pré-agendamento, como “Nayara”, deve entrar como `pendente` e aparecer na lista do painel.
- Se o banco recusar a gravação ou leitura, a aplicação vai mostrar/logar o erro real para não mascarar o problema novamente.