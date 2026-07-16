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
      className="min-h-screen flex flex-col items-center justify-start pt-10 md:justify-center md:pt-0 px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(295 47% 96%) 0%, hsl(295 40% 98%) 45%, hsl(295 45% 97%) 100%)' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="painel-blob"
          style={{ top: -120, left: -100, width: 420, height: 420, background: 'radial-gradient(circle, hsl(295 47% 83% / 0.55), transparent 70%)', filter: 'blur(50px)' }}
        />
        <div
          className="painel-blob"
          style={{ top: 220, right: -140, width: 480, height: 480, background: 'radial-gradient(circle, hsl(289 33% 56% / 0.30), transparent 70%)', filter: 'blur(60px)', animationDirection: 'reverse' }}
        />
        <div
          className="painel-blob"
          style={{ bottom: -160, left: '20%', width: 520, height: 520, background: 'radial-gradient(circle, hsl(295 47% 90% / 0.6), transparent 70%)', filter: 'blur(70px)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm animate-fade-up">
        <div className="flex justify-center mb-10">
          <img src="/icone-ext.png" alt="Assistente de Agendamento" className="h-40 w-auto object-contain" />
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: 'rgba(91,45,142,0.6)' }}>
              Seu nome
            </label>
            <select
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full h-12 px-3 rounded-[14px] text-base font-light backdrop-blur-md focus:outline-none"
              style={{ background: 'hsl(0 0% 100% / 0.55)', border: '1px solid hsl(0 0% 100% / 0.7)', color: '#3B1A5C' }}
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
                className="pr-10 font-light border-0 focus-visible:ring-0 text-base h-12 rounded-[14px] backdrop-blur-md"
                style={{ background: 'hsl(0 0% 100% / 0.55)', border: '1px solid hsl(0 0% 100% / 0.7)', color: '#3B1A5C' }}
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
            className="text-xs font-medium tracking-widest underline underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: 'rgba(91,45,142,0.75)' }}
          >
            Esqueceu a senha?
          </button>
        </div>

        <p className="text-center text-sm font-medium mt-4 tracking-widest" style={{ color: 'rgba(91,45,142,0.55)' }}>
          Acesso exclusivo · Equipe MK
        </p>
      </div>
    </div>
  )
}
