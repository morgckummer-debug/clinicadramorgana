import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-champagne border-t-wine-deep animate-spin" />
      </div>
    )
  }

  if (!session) return <Navigate to="/painel/login" replace />

  return <>{children}</>
}
