import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'https://hbrjufcagpibatxhzgtc.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhicmp1ZmNhZ3BpYmF0eGh6Z3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1OTQwNDcsImV4cCI6MjEwMzE3MDA0N30.YSx4IQC-4kJrxSL8TiREtvA1U9d9tAS9EjABl-Zz9eM'

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
