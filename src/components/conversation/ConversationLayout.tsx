import { ReactNode } from 'react'

interface ConversationLayoutProps {
  children: ReactNode
}

export function ConversationLayout({ children }: ConversationLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-lg min-w-0">
          {children}
        </div>
      </div>
    </div>
  )
}
