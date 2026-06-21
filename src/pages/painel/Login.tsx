import { useState, FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
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

  if (!loading && session) return <Navigate to="/painel" replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
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

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(160deg, #1a0a2e 0%, #2d1457 50%, #1a0a2e 100%)' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #C9A84C, transparent)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #7C3FB5, transparent)' }} />
      </div>

      <div className="relative w-full max-w-sm animate-fade-up">
        <div className="flex justify-center mb-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #C9A84C, #E2C97E, #C9A84C)', boxShadow: '0 0 40px rgba(201,168,76,0.3)' }}
          >
            <span className="font-serif text-3xl font-light" style={{ color: '#2d1457', letterSpacing: '0.05em' }}>MK</span>
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="font-serif leading-tight" style={{ fontSize: '2rem', color: '#E2C97E', letterSpacing: '0.04em', textShadow: '0 2px 20px rgba(201,168,76,0.4)' }}>
            Assistente de<br />Agendamento
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px flex-1 opacity-30" style={{ background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
            <span className="font-serif text-2xl font-light" style={{ color: '#C9A84C', letterSpacing: '0.3em' }}>MK</span>
            <div className="h-px flex-1 opacity-30" style={{ background: 'linear-gradient(to left, transparent, #C9A84C)' }} />
          </div>
          <p className="text-xs font-light mt-3 tracking-widest uppercase" style={{ color: 'rgba(226,201,126,0.5)' }}>
            Clínica Dra. Morgana Kummer
          </p>
        </div>

        <div className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <div className="space-y-1.5">
            <label className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: 'rgba(226,201,126,0.7)' }}>
              Seu nome
            </label>
            <select
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full h-10 px-3 rounded-lg text-sm font-light focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(201,168,76,0.3)', color: '#f0e6d3', colorScheme: 'dark' }}
            >
              <option value="" style={{ background: '#2d1457' }}>Selecione seu nome</option>
              {SECRETARIAS.map((s) => (
                <option key={s} value={s} style={{ background: '#2d1457' }}>{s}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: 'rgba(226,201,126,0.7)' }}>
              Senha
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="pr-10 font-light border-0 focus-visible:ring-0"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(201,168,76,0.3)', color: '#f0e6d3' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'rgba(226,201,126,0.5)' }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 font-light text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[11px] tracking-[0.3em] uppercase font-semibold transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            style={{ background: 'linear-gradient(135deg, #C9A84C, #E2C97E, #C9A84C)', color: '#2d1457', boxShadow: '0 4px 20px rgba(201,168,76,0.3)' }}
          >
            {submitting ? (
              <span className="w-4 h-4 rounded-full border-2 border-[#2d1457]/40 border-t-[#2d1457] animate-spin" />
            ) : 'Entrar'}
          </button>
        </div>

        <p className="text-center text-[10px] font-light mt-6 tracking-widest" style={{ color: 'rgba(226,201,126,0.3)' }}>
          Acesso exclusivo · Equipe MK
        </p>
      </div>
    </div>
  )
}
