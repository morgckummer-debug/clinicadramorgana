-- ════════════════════════════════════════════════════════════════════════════
-- BOOTSTRAP COMPLETO DO BANCO — Painel de Pré-Agendamentos
--
-- Recria TODO o backend em um projeto Supabase novo e vazio: tabelas, índices,
-- RLS, funções, bucket de arquivos e realtime.
--
-- COMO RODAR
--   Supabase Dashboard → SQL Editor → New query → cole este arquivo → Run.
--
-- É seguro rodar mais de uma vez (idempotente).
--
-- As migrations em supabase/migrations/ são INCREMENTAIS e pressupõem um banco
-- que já existe — NÃO rode aquelas num projeto novo. Este arquivo já inclui
-- tudo o que elas fazem, consolidado.
-- ════════════════════════════════════════════════════════════════════════════

-- ── 1. Tabelas ──────────────────────────────────────────────────────────────

create table if not exists public.pacientes (
  id               uuid        primary key default gen_random_uuid(),
  nome             text        not null,
  cpf              text        not null unique,   -- somente dígitos
  telefone         text        not null,          -- somente dígitos
  data_nascimento  date,
  criado_em        timestamptz not null default now(),
  -- lista negra
  bloqueado        boolean     not null default false,
  motivo_bloqueio  text,
  bloqueado_em     timestamptz,
  bloqueado_por    text,
  desbloqueado_em  timestamptz,
  desbloqueado_por text
);

create table if not exists public.pre_agendamentos (
  id                     uuid        primary key default gen_random_uuid(),
  paciente_id            uuid        not null references public.pacientes(id) on delete cascade,
  canal                  text        not null default 'site',
  categoria              text,
  exame                  text,
  convenio               text[],
  preferencia_turno      text,
  medico_preferido       text,
  pedido_url             text,       -- URLs separadas por vírgula
  observacoes            text,
  status                 text        not null default 'pendente',
  atendente_nome         text,
  nota_secretaria        text,
  inicio_atendimento_em  timestamptz,
  consentimento_dados    boolean     not null default false,
  consentimento_dados_em timestamptz,
  criado_em              timestamptz not null default now(),
  constraint pre_agendamentos_status_check
    check (status in ('pendente','em_atendimento','aguardando_resposta','agendado'))
);

-- Índices para as consultas do painel
create index if not exists idx_pre_ag_status     on public.pre_agendamentos (status);
create index if not exists idx_pre_ag_criado_em  on public.pre_agendamentos (criado_em);
create index if not exists idx_pre_ag_inicio_at  on public.pre_agendamentos (inicio_atendimento_em);
create index if not exists idx_pre_ag_paciente   on public.pre_agendamentos (paciente_id);
create index if not exists idx_pacientes_bloq    on public.pacientes (bloqueado) where bloqueado;

-- ── 2. RLS ──────────────────────────────────────────────────────────────────
-- O formulário público (anon) NÃO fala com as tabelas direto: tudo passa
-- pelas funções SECURITY DEFINER abaixo. Só a secretária autenticada lê/escreve.

alter table public.pacientes        enable row level security;
alter table public.pre_agendamentos enable row level security;

drop policy if exists authenticated_select_all_pacientes        on public.pacientes;
drop policy if exists authenticated_update_pacientes            on public.pacientes;
drop policy if exists authenticated_select_all_pre_agendamentos on public.pre_agendamentos;
drop policy if exists authenticated_update_pre_agendamentos     on public.pre_agendamentos;

create policy authenticated_select_all_pacientes
  on public.pacientes for select to authenticated using (true);

create policy authenticated_update_pacientes
  on public.pacientes for update to authenticated using (true) with check (true);

create policy authenticated_select_all_pre_agendamentos
  on public.pre_agendamentos for select to authenticated using (true);

create policy authenticated_update_pre_agendamentos
  on public.pre_agendamentos for update to authenticated using (true) with check (true);

-- ── 3. Função que cria o pré-agendamento (usada pelo formulário público) ────
-- Recebe os dados já validados no front, normaliza CPF/telefone, reaproveita
-- a paciente se o CPF já existir e recusa quem está na lista negra.

create or replace function public.criar_pre_agendamento(
  p_nome              text,
  p_cpf               text,
  p_data_nascimento   date,
  p_telefone          text,
  p_canal             text,
  p_categoria         text,
  p_exame             text,
  p_convenio          text[],
  p_preferencia_turno text,
  p_medico_preferido  text,
  p_pedido_url        text,
  p_observacoes       text
)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_cpf        text := regexp_replace(coalesce(p_cpf, ''),      '[^0-9]', '', 'g');
  v_tel        text := regexp_replace(coalesce(p_telefone, ''), '[^0-9]', '', 'g');
  v_paciente   uuid;
  v_bloqueado  boolean;
  v_id         uuid;
begin
  if v_cpf = '' or coalesce(trim(p_nome), '') = '' then
    raise exception 'Nome e CPF são obrigatórios.';
  end if;

  select id, bloqueado into v_paciente, v_bloqueado
  from public.pacientes where cpf = v_cpf;

  if v_paciente is null then
    insert into public.pacientes (nome, cpf, telefone, data_nascimento)
    values (trim(p_nome), v_cpf, v_tel, p_data_nascimento)
    returning id into v_paciente;
  else
    if v_bloqueado then
      raise exception 'Paciente bloqueada para agendamento online.';
    end if;
    -- mantém o cadastro atualizado com o que a paciente informou agora
    update public.pacientes
       set nome            = trim(p_nome),
           telefone        = v_tel,
           data_nascimento = coalesce(p_data_nascimento, data_nascimento)
     where id = v_paciente;
  end if;

  insert into public.pre_agendamentos (
    paciente_id, canal, categoria, exame, convenio,
    preferencia_turno, medico_preferido, pedido_url, observacoes
  ) values (
    v_paciente, coalesce(p_canal, 'site'), p_categoria, p_exame, p_convenio,
    p_preferencia_turno, p_medico_preferido, p_pedido_url, p_observacoes
  )
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.criar_pre_agendamento(text,text,date,text,text,text,text,text[],text,text,text,text) from public;
grant execute on function public.criar_pre_agendamento(text,text,date,text,text,text,text,text[],text,text,text,text) to anon, authenticated;

-- ── 4. Consentimento LGPD ───────────────────────────────────────────────────

create or replace function public.registrar_consentimento_lgpd(p_id uuid)
returns void
language sql
security definer
set search_path = public, pg_temp
as $$
  update public.pre_agendamentos
     set consentimento_dados    = true,
         consentimento_dados_em = now()
   where id = p_id;
$$;

revoke all on function public.registrar_consentimento_lgpd(uuid) from public;
grant execute on function public.registrar_consentimento_lgpd(uuid) to anon, authenticated;

-- ── 5. Verificação de bloqueio por CPF ──────────────────────────────────────

create or replace function public.verificar_bloqueio_cpf(p_cpf text)
returns boolean
language sql
security definer
stable
set search_path = public, pg_temp
as $$
  select coalesce(
    (select bloqueado from public.pacientes
      where cpf = regexp_replace(p_cpf, '[^0-9]', '', 'g') limit 1),
    false
  );
$$;

revoke all on function public.verificar_bloqueio_cpf(text) from public;
grant execute on function public.verificar_bloqueio_cpf(text) to anon, authenticated;

-- ── 6. Bucket dos pedidos médicos ───────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('pedidos', 'pedidos', true)
on conflict (id) do update set public = true;

drop policy if exists pedidos_insert_publico on storage.objects;
drop policy if exists pedidos_select_publico on storage.objects;

create policy pedidos_insert_publico on storage.objects
  for insert to anon, authenticated with check (bucket_id = 'pedidos');

create policy pedidos_select_publico on storage.objects
  for select to anon, authenticated using (bucket_id = 'pedidos');

-- ── 7. Realtime (o painel atualiza sozinho quando chega paciente nova) ──────

alter table public.pre_agendamentos replica identity full;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
     where pubname = 'supabase_realtime'
       and schemaname = 'public'
       and tablename  = 'pre_agendamentos'
  ) then
    alter publication supabase_realtime add table public.pre_agendamentos;
  end if;
end $$;

-- ════════════════════════════════════════════════════════════════════════════
-- FIM. Depois disto, crie os logins das secretárias em Authentication → Users:
--   adriana@dramorgana.com.br · morgckummer@gmail.com
-- (marque "Auto Confirm User" para não depender de e-mail de confirmação)
-- ════════════════════════════════════════════════════════════════════════════
