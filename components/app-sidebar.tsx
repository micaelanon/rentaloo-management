'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { RentalooLogo } from './rentaloo-logo'
import {
  LayoutDashboard,
  FolderOpen,
  FilePlus,
  Users,
  Building2,
  FileText,
  Settings,
  ChevronRight
} from 'lucide-react'

const navigationItems = [
  { 
    label: 'Dashboard', 
    href: '/', 
    icon: LayoutDashboard 
  },
  { 
    label: 'Expedientes', 
    href: '/expedientes', 
    icon: FolderOpen 
  },
  { 
    label: 'Nuevo documento', 
    href: '/nuevo-documento', 
    icon: FilePlus 
  },
  { 
    label: 'Clientes', 
    href: '/clientes', 
    icon: Users 
  },
  { 
    label: 'Inmuebles', 
    href: '/inmuebles', 
    icon: Building2 
  },
  { 
    label: 'Plantillas', 
    href: '/plantillas', 
    icon: FileText 
  },
  { 
    label: 'Ajustes', 
    href: '/ajustes', 
    icon: Settings 
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <Link href="/">
          <RentalooLogo inverted className="hover:opacity-90 transition-opacity" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
                isActive 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
              )}
            >
              <item.icon className={cn(
                'h-5 w-5 shrink-0 transition-colors',
                isActive ? 'text-sidebar-primary' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/70'
              )} />
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <ChevronRight className="h-4 w-4 text-sidebar-primary" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-accent/30">
          <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground text-sm font-semibold">
            MR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">María Rodríguez</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">Administración</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
