import { useState, FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { SECRETARIAS, nomeParaEmail } from '@/lib/secretarias'

export default function Login() {
  const { signIn, session, loading } = useAuth()
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [resetMsg, setResetMsg] = useState('')

  const handleForgotPassword = async () => {
    if (!SECRETARIAS.includes(nome)) {
      setError('Selecione seu nome antes de redefinir a senha.')
      return
    }
    const email = nomeParaEmail(nome)
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/painel/login`,
    })
    setResetMsg(`E-mail de redefinição enviado para ${email}.`)
  }

  if (!loading && session) return <Navigate to="/painel" replace />

  const doLogin = async () => {
    setError('')
    if (!SECRETARIAS.includes(nome)) {
      setError('Nome não encontrado.')
      return
    }
    setSubmitting(true)
    const err = await signIn(nomeParaEmail(nome), password, nome)
    if (err) {
      setError('Nome ou senha incorretos.')
      setSubmitting(false)
    } else {
      navigate('/painel')
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    doLogin()
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(160deg, #faf8f5 0%, #f3eef9 50%, #faf8f5 100%)' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #C9A84C, transparent)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #7C3FB5, transparent)' }} />
        <div className="absolute top-2/3 left-1/3 w-40 h-40 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #C9A84C, transparent)' }} />
      </div>

      <div className="relative w-full max-w-sm animate-fade-up">
        <div className="flex justify-center mb-5">
          <img src="/logo-horiz.png" alt="Clínica Dra. Morgana Kummer" width={350} height={56} className="h-14 w-auto object-contain" loading="eager" />
        </div>

        <div className="text-center mb-10">
          <h1 className="font-serif leading-tight" style={{ fontSize: '2rem', color: '#3B1A5C', letterSpacing: '0.04em' }}>
            Assistente de<br />Agendamento
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px flex-1 opacity-40" style={{ background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
            <span className="font-serif text-2xl font-light" style={{ color: '#C9A84C', letterSpacing: '0.3em' }}>MK</span>
            <div className="h-px flex-1 opacity-40" style={{ background: 'linear-gradient(to left, transparent, #C9A84C)' }} />
          </div>
        </div>

        <div className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(201,168,76,0.25)', boxShadow: '0 8px 40px rgba(91,45,142,0.08)' }}>
          <div className="space-y-1.5">
            <label className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: 'rgba(91,45,142,0.6)' }}>
              Seu nome
            </label>
            <select
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full h-12 px-3 rounded-lg text-base font-light focus:outline-none"
              style={{ background: 'rgba(91,45,142,0.04)', border: '1px solid rgba(201,168,76,0.35)', color: '#3B1A5C' }}
            >
              <option value="">Selecione seu nome</option>
              {SECRETARIAS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: 'rgba(91,45,142,0.6)' }}>
              Senha
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    doLogin()
                  }
                }}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="pr-10 font-light border-0 focus-visible:ring-0 text-base h-12"
                style={{ background: 'rgba(91,45,142,0.04)', border: '1px solid rgba(201,168,76,0.35)', color: '#3B1A5C' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'rgba(91,45,142,0.4)' }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 font-light text-center">{error}</p>
          )}
          {resetMsg && (
            <p className="text-sm font-light text-center" style={{ color: '#5B2D8E' }}>{resetMsg}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[11px] tracking-[0.3em] uppercase font-semibold transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            style={{ background: 'linear-gradient(135deg, #5B2D8E, #7C3FB5, #5B2D8E)', color: '#E2C97E', boxShadow: '0 4px 20px rgba(91,45,142,0.3)' }}
          >
            {submitting ? (
              <span className="w-4 h-4 rounded-full border-2 border-[#E2C97E]/40 border-t-[#E2C97E] animate-spin" />
            ) : 'Entrar'}
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-[10px] font-light tracking-widest underline underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: 'rgba(91,45,142,0.45)' }}
          >
            Esqueceu a senha?
          </button>
        </div>

        <p className="text-center text-[10px] font-light mt-4 tracking-widest" style={{ color: 'rgba(91,45,142,0.3)' }}>
          Acesso exclusivo · Equipe MK
        </p>
      </div>
    </div>
  )
}
