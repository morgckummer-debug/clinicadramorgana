-- Adiciona coluna para registrar qual secretária está atendendo o paciente.
-- Rodar no SQL Editor do Supabase (Database > SQL Editor).
ALTER TABLE pre_agendamentos
  ADD COLUMN IF NOT EXISTS atendente_nome text;
