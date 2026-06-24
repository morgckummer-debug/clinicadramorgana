import { Link, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { commonContent } from '@/content/common'

type PageShellProps = {
  children: ReactNode
  backTo?: string
  backLabel?: string
  useHistory?: boolean
}

export function PageShell({
  children,
  backTo = '/',
  backLabel = commonContent.voltarAoSite,
  useHistory = false,
}: PageShellProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (useHistory) {
      navigate(-1)
    } else {
      navigate(backTo)
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      <header className="flex items-center px-6 py-5 border-b border-champagne/20">
        <Link to="/">
          <img
            src="/logo-horiz.png"
            alt="Clínica Dra. Morgana"
            className="h-14 w-auto"
          />
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pt-5 pb-12">
        <div className="w-full max-w-4xl">{children}</div>
      </main>

      <div className="flex justify-center pb-10">
        {useHistory ? (
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-300 cursor-pointer"
            style={{ backgroundColor: '#FDDCB5', color: '#5B2D8E', border: '1px solid #5B2D8E' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {backLabel}
          </button>
        ) : (
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-300"
            style={{ backgroundColor: '#FDDCB5', color: '#5B2D8E', border: '1px solid #5B2D8E' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {backLabel}
          </Link>
        )}
      </div>
    </div>
  )
}
