-- Lista negra de pacientes.
--
-- Adiciona campos de bloqueio à tabela pacientes, uma policy de UPDATE
-- para secretárias e uma função RPC acessível pelo formulário público
-- (papel anon) para impedir o pré-agendamento de pacientes bloqueadas.
--
-- COMO RODAR: Supabase Dashboard → Database → SQL Editor → cole e execute.

-- ── 1. Colunas de bloqueio ───────────────────────────────────────────────────

ALTER TABLE pacientes
  ADD COLUMN IF NOT EXISTS bloqueado      boolean     NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS motivo_bloqueio text,
  ADD COLUMN IF NOT EXISTS bloqueado_em   timestamptz,
  ADD COLUMN IF NOT EXISTS bloqueado_por  text;

-- ── 2. Policy de UPDATE para secretárias ────────────────────────────────────

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'pacientes'
      AND policyname = 'authenticated_update_pacientes'
  ) THEN
    CREATE POLICY "authenticated_update_pacientes"
      ON pacientes
      FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- ── 3. Função para verificar bloqueio por CPF (acessível ao papel anon) ─────

CREATE OR REPLACE FUNCTION verificar_bloqueio_cpf(p_cpf text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT COALESCE(
    (SELECT bloqueado
     FROM   pacientes
     WHERE  cpf = regexp_replace(p_cpf, '[^0-9]', '', 'g')
     LIMIT  1),
    false
  );
$$;

GRANT EXECUTE ON FUNCTION verificar_bloqueio_cpf(text) TO anon;
