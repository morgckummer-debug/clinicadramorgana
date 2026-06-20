import { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export function PainelLayout({ children }: { children: ReactNode }) {
  const { signOut, session } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/painel/login')
  }

  return (
    <div className="min-h-screen bg-[#faf9f8] flex flex-col">
      <header className="bg-white border-b border-border/50 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link to="/painel" className="flex flex-col gap-0.5">
          <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground font-medium">
            Painel Interno
          </span>
          <span className="font-comfortaa text-wine-deep text-sm font-semibold leading-none">
            Clínica Dra. Morgana Kummer
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-[11px] text-muted-foreground hidden sm:block">
            {session?.user.email}
          </span>
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
    </div>
  )
}
