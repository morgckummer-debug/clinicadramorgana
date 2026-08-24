import { createClient } from '@supabase/supabase-js'

// Valores do projeto Supabase em uso. Ficam no código de propósito: a chave
// anon é pública por natureza (vai embutida no bundle que qualquer visitante
// baixa) e quem protege os dados são as políticas de RLS.
const URL_PADRAO = 'https://hbrjufcagpibatxhzgtc.supabase.co'
const ANON_PADRAO = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhicmp1ZmNhZ3BpYmF0eGh6Z3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1OTQwNDcsImV4cCI6MjEwMzE3MDA0N30.YSx4IQC-4kJrxSL8TiREtvA1U9d9tAS9EjABl-Zz9eM'

/**
 * Uma variável de ambiente mal preenchida (espaço sobrando, sem https://,
 * barra no fim) derruba todas as chamadas com "Failed to fetch", e a origem
 * fica invisível porque o valor só existe no painel da hospedagem. Aqui o
 * valor é validado e, se não servir, o do código assume.
 */
function resolverUrl(): string {
  const bruto = (import.meta.env.VITE_SUPABASE_URL ?? '').trim().replace(/\/+$/, '')
  if (!bruto) return URL_PADRAO
  try {
    const u = new URL(bruto)
    if (u.protocol !== 'https:') throw new Error('protocolo não é https')
    return u.origin
  } catch {
    console.warn('⚠️ VITE_SUPABASE_URL inválida — usando o valor do código. Recebido:', JSON.stringify(bruto))
    return URL_PADRAO
  }
}

function resolverChave(): string {
  const bruto = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim()
  if (!bruto) return ANON_PADRAO
  // Um JWT tem três partes separadas por ponto; qualquer outra coisa é engano.
  if (bruto.split('.').length !== 3) {
    console.warn('⚠️ VITE_SUPABASE_ANON_KEY não parece um JWT — usando o valor do código.')
    return ANON_PADRAO
  }
  return bruto
}

export const supabaseUrl = resolverUrl()
const supabaseAnonKey = resolverChave()

/** Host em uso, para as mensagens de erro dizerem com quem o app tentou falar. */
export const supabaseHost = new URL(supabaseUrl).host

// Cliente principal — usado pelo painel
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente para o formulário de pacientes — sessão separada para que
// o signOut anônimo do formulário não afete a sessão da secretaria no painel
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    storageKey: 'public-auth',
  },
})

export type Database = {
  public: {
    Tables: {
      pacientes: {
        Row: {
          id: string
          nome: string
          cpf: string
          telefone: string
          data_nascimento: string | null
          criado_em: string
          bloqueado: boolean
          motivo_bloqueio: string | null
          bloqueado_em: string | null
          bloqueado_por: string | null
        }
        Insert: Omit<Database['public']['Tables']['pacientes']['Row'], 'id' | 'criado_em' | 'bloqueado'>
      }
      pre_agendamentos: {
        Row: {
          id: string
          paciente_id: string
          canal: string
          categoria: string | null
          exame: string | null
          convenio: string[] | null
          preferencia_turno: string | null
          medico_preferido: string | null
          pedido_url: string | null
          observacoes: string | null
          status: string
          atendente_nome: string | null
          criado_em: string
        }
        Insert: Omit<Database['public']['Tables']['pre_agendamentos']['Row'], 'id' | 'criado_em' | 'status' | 'atendente_nome'>
      }
    }
  }
}
