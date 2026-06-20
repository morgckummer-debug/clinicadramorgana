import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
        }
        Insert: Omit<Database['public']['Tables']['pacientes']['Row'], 'id' | 'criado_em'>
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
          criado_em: string
        }
        Insert: Omit<Database['public']['Tables']['pre_agendamentos']['Row'], 'id' | 'criado_em' | 'status'>
      }
    }
  }
}
