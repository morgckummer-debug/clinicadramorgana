import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { AuthError, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export type SignInFailure = {
  /** Mensagem original devolvida pelo Supabase (para diagnóstico). */
  message: string
  /** true quando o login falhou por não conseguir falar com o servidor. */
  offline: boolean
  /** true quando o e-mail existe mas ainda não foi confirmado. */
  emailNaoConfirmado: boolean
  /** true quando o Supabase bloqueou por excesso de tentativas. */
  muitasTentativas: boolean
  /** Código devolvido pelo Supabase, quando houver. */
  codigo?: string
}

interface AuthContextValue {
  session: Session | null
  loading: boolean
  userName: string | null
  signIn: (email: string, password: string, nome: string) => Promise<SignInFailure | null>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

/**
 * Se o Supabase não responder, não deixamos o painel preso no spinner:
 * depois deste tempo assumimos "sem sessão" e mandamos para o login.
 */
const SESSION_TIMEOUT_MS = 8000

/** Classifica o erro do Supabase para que a tela de login mostre a causa real. */
function classificarErro(error: AuthError | Error): SignInFailure {
  const message = error.message ?? 'Erro desconhecido'
  const texto = message.toLowerCase()
  const status = 'status' in error ? error.status : undefined

  // Falha de rede: fetch rejeitado (status 0/ausente) ou erro de conexão.
  const offline =
    error.name === 'AuthRetryableFetchError' ||
    texto.includes('failed to fetch') ||
    texto.includes('networkerror') ||
    texto.includes('load failed') ||
    status === 0 ||
    status === 502 ||
    status === 503 ||
    status === 504

  return {
    message,
    offline,
    emailNaoConfirmado: texto.includes('email not confirmed') || texto.includes('not confirmed'),
    muitasTentativas: status === 429 || texto.includes('rate limit') || texto.includes('too many'),
    codigo: 'code' in error ? (error.code as string | undefined) : undefined,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState<string | null>(
    () => localStorage.getItem('secretaria_nome')
  )

  useEffect(() => {
    let ativo = true

    const encerrarCarregamento = () => {
      if (ativo) setLoading(false)
    }

    // Rede fora do ar ou Supabase lento não podem travar o painel para sempre.
    const timeout = window.setTimeout(() => {
      if (ativo) {
        console.warn('⚠️ Supabase demorou demais para responder — seguindo sem sessão.')
        encerrarCarregamento()
      }
    }, SESSION_TIMEOUT_MS)

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!ativo) return
        if (error) console.warn('⚠️ Não foi possível recuperar a sessão:', error.message)
        setSession(data?.session ?? null)
      })
      .catch((err) => {
        console.warn('⚠️ Falha ao consultar a sessão do Supabase:', err)
        if (ativo) setSession(null)
      })
      .finally(() => {
        window.clearTimeout(timeout)
        encerrarCarregamento()
      })

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!ativo) return
      if (event === 'SIGNED_OUT') {
        console.warn('⚠️ Sessão encerrada pelo Supabase — evento:', event)
      }
      setSession(session)
      // Assim que o Supabase se manifesta já sabemos o estado real da sessão.
      encerrarCarregamento()
      if (!session) {
        setUserName(null)
        localStorage.removeItem('secretaria_nome')
      }
    })

    return () => {
      ativo = false
      window.clearTimeout(timeout)
      listener.subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string, nome: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        // Registra só a resposta do provedor (nunca a senha) — sem isto, um
        // login recusado é indistinguível de outro para quem dá suporte.
        console.warn('[login] recusado pelo Supabase:', {
          email,
          mensagem: error.message,
          status: error.status,
          codigo: error.code,
        })
        return classificarErro(error)
      }
      // Publica a sessão aqui em vez de esperar o onAuthStateChange: sem isto o
      // navigate('/painel') pode chegar antes, e o ProtectedRoute devolve a
      // secretária para o login mesmo com a senha correta.
      if (data?.session) setSession(data.session)
      console.info('[login] autenticado:', email)
    } catch (err) {
      // signInWithPassword pode lançar quando o fetch falha antes de virar AuthError.
      console.warn('[login] falhou antes de obter resposta do Supabase:', err)
      return classificarErro(err instanceof Error ? err : new Error(String(err)))
    }
    setUserName(nome)
    localStorage.setItem('secretaria_nome', nome)
    return null
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.warn('⚠️ Falha ao encerrar a sessão no servidor:', err)
    } finally {
      setSession(null)
      setUserName(null)
      localStorage.removeItem('secretaria_nome')
    }
  }

  return (
    <AuthContext.Provider value={{ session, loading, userName, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
