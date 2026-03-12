'use client'

import { useState } from 'react'
import { AppSidebar } from './app-sidebar'
import { AppHeader } from './app-header'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AppSidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <AppSidebar mobile isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="md:pl-64">
        <AppHeader sidebarOpen={sidebarOpen} onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
