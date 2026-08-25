-- ════════════════════════════════════════════════════════════════════════════
-- KEEP-ALIVE — evita que o Supabase pause o projeto por inatividade
--
-- No plano gratuito, um projeto sem atividade de BANCO por cerca de uma semana
-- é pausado. Projeto pausado é o que, mais para a frente, vira candidato a ser
-- descartado — e o plano gratuito não guarda backup nenhum do que havia lá.
--
-- Esta tabela existe só para dar ao robô diário (GitHub Actions →
-- scripts/supabase-keepalive.ts) uma escrita real para fazer todo dia. Um GET
-- na API pode não contar como atividade de banco; um UPDATE conta.
-- ════════════════════════════════════════════════════════════════════════════

create table if not exists public.manutencao_keepalive (
  id            smallint    primary key default 1,
  ultima_batida timestamptz not null default now(),
  origem        text,
  total_batidas bigint      not null default 0,
  constraint manutencao_keepalive_linha_unica check (id = 1)
);

insert into public.manutencao_keepalive (id) values (1) on conflict (id) do nothing;

alter table public.manutencao_keepalive enable row level security;

drop policy if exists authenticated_select_keepalive on public.manutencao_keepalive;

create policy authenticated_select_keepalive
  on public.manutencao_keepalive for select to authenticated using (true);

-- Escrita mínima, feita pelo robô. É SECURITY DEFINER e liberada para `anon`
-- de propósito: assim o keep-alive funciona mesmo antes de alguém cadastrar a
-- chave service_role nos segredos do GitHub. O estrago máximo de um abuso é
-- adiantar o relógio de uma única linha — que é exatamente o que se quer.
create or replace function public.registrar_keepalive(p_origem text default null)
returns timestamptz
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_agora timestamptz;
begin
  update public.manutencao_keepalive
     set ultima_batida = now(),
         origem        = coalesce(nullif(trim(p_origem), ''), origem),
         total_batidas = total_batidas + 1
   where id = 1
  returning ultima_batida into v_agora;

  if v_agora is null then
    insert into public.manutencao_keepalive (id, origem, total_batidas)
    values (1, nullif(trim(p_origem), ''), 1)
    on conflict (id) do update set ultima_batida = now()
    returning ultima_batida into v_agora;
  end if;

  return v_agora;
end;
$$;

revoke all on function public.registrar_keepalive(text) from public;
grant execute on function public.registrar_keepalive(text) to anon, authenticated;
