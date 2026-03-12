'use client'

import { AppSidebar } from './app-sidebar'
import { AppHeader } from './app-header'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="pl-64">
        <AppHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
