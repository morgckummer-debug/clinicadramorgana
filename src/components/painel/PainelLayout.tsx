import { ReactNode, useState } from 'react'
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

  const handleSignOut = async () => {
    await signOut()
    navigate('/painel/login')
  }

  return (
    <div className="min-h-screen bg-[#faf9f8] flex flex-col">
      <header className="bg-white border-b border-border/50 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link to="/painel" className="flex items-center">
          <img
            src="/icone-ext.png"
            alt="Clínica Dra. Morgana Kummer"
            className="h-16 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          {userName && (
            <span className="text-[11px] text-muted-foreground hidden sm:block">{userName}</span>
          )}
          <Link
            to="/painel/lista-negra"
            className="flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-red-500 transition-colors duration-300"
            title="Lista negra"
          >
            <Ban className="w-3.5 h-3.5" />
            <span className="hidden sm:block">Lista negra</span>
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-wine-deep transition-colors duration-300"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span className="hidden sm:block">Alterar senha</span>
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-wine-deep transition-colors duration-300"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sair
          </button>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl py-8 px-4">
        {children}
      </main>

      {showModal && <AlterarSenhaModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
