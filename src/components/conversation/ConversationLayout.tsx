import { ReactNode } from 'react'

interface ConversationLayoutProps {
  children: ReactNode
}

export function ConversationLayout({ children }: ConversationLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {children}
        </div>
      </div>
    </div>
  )
}
