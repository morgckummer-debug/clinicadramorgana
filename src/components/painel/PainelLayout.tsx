import { ReactNode, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Ban, LogOut, KeyRound, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'

function AlterarSenhaModal({ onClose }: { onClose: () => void }) {
  const [nova, setNova] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (nova.length < 6) { setErro('A senha deve ter pelo menos 6 caracteres.'); return }
    if (nova !== confirmar) { setErro('As senhas não coincidem.'); return }
    setErro('')
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: nova })
    setLoading(false)
    if (error) { setErro('Não foi possível alterar a senha. Tente novamente.'); return }
    setOk(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-fade-up">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-lg font-light" style={{ color: '#5B2D8E' }}>Alterar senha</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-wine-deep transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {ok ? (
          <div className="text-center py-4 space-y-3">
            <p className="text-sm text-foreground/80 font-light">Senha alterada com sucesso!</p>
            <button onClick={onClose} className="text-[11px] tracking-[0.2em] uppercase underline underline-offset-4" style={{ color: '#5B2D8E' }}>
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium">Nova senha</label>
              <Input type="password" value={nova} onChange={(e) => setNova(e.target.value)} placeholder="••••••••" required className="bg-card border-border/60 font-light" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium">Confirmar senha</label>
              <Input type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} placeholder="••••••••" required className="bg-card border-border/60 font-light" />
            </div>
            {erro && <p className="text-sm text-red-500 font-light text-center">{erro}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[11px] tracking-[0.25em] uppercase font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #5B2D8E, #7C3FB5)', color: '#E2C97E' }}
            >
              {loading ? <span className="w-4 h-4 rounded-full border-2 border-[#E2C97E]/40 border-t-[#E2C97E] animate-spin" /> : 'Salvar'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export function PainelLayout({ children }: { children: ReactNode }) {
  const { signOut, userName } = useAuth()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="manifest"]')
    if (link) link.href = '/painel.webmanifest'
    return () => { if (link) link.href = '/site.webmanifest' }
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/painel/login')
  }

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
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

      <header className="glass-header relative z-10 px-6 py-4 flex items-center justify-between sticky top-0">
        <Link to="/painel" className="flex items-center">
          <img
            src="/icone-ext.png"
            alt="Clínica Dra. Morgana Kummer"
            className="h-16 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-3">
          {userName && (
            <span className="text-[11px] text-muted-foreground hidden sm:block mr-1">{userName}</span>
          )}
          <Link
            to="/painel/lista-negra"
            className="glass-icon-btn flex items-center justify-center text-red-500 hover:text-red-600 transition-colors duration-300"
            title="Lista negra"
          >
            <Ban className="w-4 h-4" strokeWidth={2.5} />
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="glass-icon-btn flex items-center justify-center text-wine-deep/80 hover:text-wine-deep transition-colors duration-300"
            title="Alterar senha"
          >
            <KeyRound className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleSignOut}
            className="glass-icon-btn flex items-center justify-center text-wine-deep/80 hover:text-wine-deep transition-colors duration-300"
            title="Sair"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl py-8 px-4 relative z-10">
        {children}
      </main>

      {showModal && <AlterarSenhaModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
