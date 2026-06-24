import { Link, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
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
      <header className="flex items-center justify-between px-6 py-5 border-b border-champagne/20">
        <Link to="/">
          <img
            src="/logo-horiz.png"
            alt="Clínica Dra. Morgana"
            className="h-14 w-auto"
          />
        </Link>
        {useHistory ? (
          <button
            onClick={handleBack}
            className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-wine-deep transition-colors duration-300 bg-none border-none cursor-pointer"
          >
            {backLabel}
          </button>
        ) : (
          <Link
            to={backTo}
            className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-wine-deep transition-colors duration-300"
          >
            {backLabel}
          </Link>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pt-5 pb-12">
        <div className="w-full max-w-4xl">{children}</div>
      </main>
    </div>
  )
}
