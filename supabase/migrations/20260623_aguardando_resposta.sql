-- Suporte ao status 'aguardando_resposta' com handoff entre secretárias.
-- Rodar no SQL Editor do Supabase (Database > SQL Editor).
ALTER TABLE pre_agendamentos
  ADD COLUMN IF NOT EXISTS nota_secretaria text,
  ADD COLUMN IF NOT EXISTS inicio_atendimento_em timestamptz;
