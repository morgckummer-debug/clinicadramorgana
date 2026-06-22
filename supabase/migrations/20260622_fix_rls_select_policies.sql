-- Corrige visibilidade de pré-agendamentos no painel.
--
-- Contexto: registros criados via formulário público (papel 'anon' ou sessão
-- anônima) podem estar invisíveis ao painel autenticado se a policy de SELECT
-- do papel 'authenticated' tiver restrições por auth.uid().
--
-- Esta migration garante que qualquer usuário autenticado (secretária) veja
-- TODOS os pré-agendamentos e pacientes, independente de quem os criou.
--
-- COMO RODAR: Supabase Dashboard → Database → SQL Editor → cole e execute.

-- ── pre_agendamentos ────────────────────────────────────────────────────────

-- Remove policies restritivas de SELECT para authenticated, se existirem
DO $$ DECLARE r RECORD; BEGIN
  FOR r IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'pre_agendamentos'
      AND cmd        = 'SELECT'
      AND roles      @> ARRAY['authenticated']::name[]
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON pre_agendamentos', r.policyname);
  END LOOP;
END $$;

-- Cria policy permissiva: qualquer autenticado vê tudo
CREATE POLICY "authenticated_select_all_pre_agendamentos"
  ON pre_agendamentos
  FOR SELECT
  TO authenticated
  USING (true);

-- ── pacientes ───────────────────────────────────────────────────────────────

DO $$ DECLARE r RECORD; BEGIN
  FOR r IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'pacientes'
      AND cmd        = 'SELECT'
      AND roles      @> ARRAY['authenticated']::name[]
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON pacientes', r.policyname);
  END LOOP;
END $$;

CREATE POLICY "authenticated_select_all_pacientes"
  ON pacientes
  FOR SELECT
  TO authenticated
  USING (true);
