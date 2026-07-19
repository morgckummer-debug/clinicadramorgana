-- Consentimento específico para tratamento de dados pessoais (LGPD).
--
-- Este consentimento é coletado no próprio formulário de pré-agendamento,
-- separado de qualquer termo de responsabilidade assinado presencialmente
-- na clínica. É registrado por pré-agendamento (não sobrescreve o cadastro
-- do paciente), preservando um histórico de quando o consentimento foi dado.
--
-- Esta migration é 100% aditiva: não altera a função `criar_pre_agendamento`
-- existente nem nenhuma policy já em produção.
--
-- COMO RODAR: Supabase Dashboard → Database → SQL Editor → cole e execute.

-- ── 1. Colunas de consentimento em pre_agendamentos ─────────────────────────

ALTER TABLE pre_agendamentos
  ADD COLUMN IF NOT EXISTS consentimento_dados    boolean     NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consentimento_dados_em timestamptz;

-- ── 2. Função para registrar o consentimento (acessível ao papel anon) ──────
--
-- Recebe apenas o id do pré-agendamento já criado e marca o consentimento.
-- Não permite ler nem alterar nenhum outro campo — superfície mínima
-- exposta ao formulário público.

CREATE OR REPLACE FUNCTION registrar_consentimento_lgpd(p_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE pre_agendamentos
  SET    consentimento_dados    = true,
         consentimento_dados_em = now()
  WHERE  id = p_id;
$$;

GRANT EXECUTE ON FUNCTION registrar_consentimento_lgpd(uuid) TO anon;
