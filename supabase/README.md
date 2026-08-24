# Backend (Supabase)

## Arquivos

| Arquivo | O que é |
|---|---|
| `bootstrap.sql` | **Recria o backend inteiro do zero.** Use num projeto Supabase novo e vazio. |
| `migrations/*.sql` | Alterações incrementais aplicadas ao banco antigo. **Não rode num projeto novo** — elas pressupõem tabelas que ainda não existem. O `bootstrap.sql` já contém tudo o que elas fazem. |

## Recriar o backend num projeto novo

1. Crie o projeto em <https://supabase.com/dashboard> e guarde a senha do banco.
2. **SQL Editor → New query** → cole todo o `bootstrap.sql` → **Run**.
3. **Authentication → Users → Add user** para cada secretária, marcando
   *Auto Confirm User* (senão o login falha com "Email not confirmed"):
   - `adriana@dramorgana.com.br`
   - `morgckummer@gmail.com`
   - `yasmin@dramorgana.com.br`

   Os e-mails precisam bater exatamente com `src/lib/secretarias.ts`.
4. **Settings → API**: copie a *Project URL* e a chave *anon public*.
5. Atualize `src/lib/supabase.ts` (ou as variáveis `VITE_SUPABASE_URL` e
   `VITE_SUPABASE_ANON_KEY` na Vercel) e faça o deploy.

## O que o `bootstrap.sql` cria

- **Tabelas** `pacientes` e `pre_agendamentos` (com a FK em cascata e índices
  para as consultas do painel).
- **RLS**: só a secretária autenticada lê e escreve. O formulário público não
  toca nas tabelas direto.
- **Funções** `SECURITY DEFINER` que o formulário público usa:
  - `criar_pre_agendamento(...)` → cria/reaproveita a paciente pelo CPF,
    recusa quem está na lista negra e devolve o `id` do pré-agendamento.
  - `registrar_consentimento_lgpd(id)` → marca o consentimento.
  - `verificar_bloqueio_cpf(cpf)` → consulta de bloqueio.
- **Bucket** `pedidos` (público) para os pedidos médicos enviados no formulário.
- **Realtime** em `pre_agendamentos`, que faz o painel avisar sozinho quando
  chega paciente nova.

## Status possíveis

`pendente` · `em_atendimento` · `aguardando_resposta` · `agendado`

Garantidos por `CHECK` na tabela — um status fora dessa lista é recusado.

## Nota

O schema base nunca esteve versionado: as migrations só tinham as alterações
incrementais. O `bootstrap.sql` foi reconstruído a partir do código da
aplicação e validado contra um PostgreSQL 16 real (criação, reaproveitamento
de paciente por CPF, normalização de CPF/telefone, consentimento, lista negra,
`CHECK` de status e cascade), inclusive rodando duas vezes para confirmar que
é idempotente.
