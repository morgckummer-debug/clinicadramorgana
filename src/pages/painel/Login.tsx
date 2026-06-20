import { useState, FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Input } from '@/components/ui/input'

export default function Login() {
  const { signIn, session, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && session) return <Navigate to="/painel" replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const err = await signIn(email, password)
    if (err) {
      setError('E-mail ou senha incorretos.')
      setSubmitting(false)
    } else {
      navigate('/painel')
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm animate-fade-up">

        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-medium">
            Acesso restrito
          </span>
          <h1 className="font-comfortaa text-wine-deep text-2xl font-light mt-2">
            Painel da Secretária
          </h1>
          <p className="text-sm text-muted-foreground font-light mt-1">
            Clínica Dra. Morgana Kummer
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium">
              E-mail
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoComplete="email"
              className="bg-card border-border/60 font-light"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium">
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
                className="bg-card border-border/60 font-light pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-wine-deep transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 font-light text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-wine-deep text-wine-foreground px-6 py-3.5 rounded-full text-[11px] tracking-[0.25em] uppercase font-semibold transition-all duration-500 hover:bg-wine shadow-soft hover:shadow-elegant disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {submitting ? (
              <span className="w-4 h-4 rounded-full border-2 border-wine-foreground/40 border-t-wine-foreground animate-spin" />
            ) : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-[10px] text-muted-foreground font-light mt-8">
          Acesso exclusivo para equipe da clínica.
        </p>
      </div>
    </div>
  )
}
