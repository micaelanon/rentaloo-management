'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Search, 
  FilePlus, 
  Bell, 
  Settings,
  LogOut,
  User,
  Menu
} from 'lucide-react'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/expedientes': 'Expedientes',
  '/nuevo-documento': 'Nuevo Documento',
  '/clientes': 'Clientes',
  '/inmuebles': 'Inmuebles',
  '/plantillas': 'Plantillas',
  '/ajustes': 'Ajustes',
}

interface AppHeaderProps {
  sidebarOpen?: boolean
  onSidebarToggle?: () => void
}

export function AppHeader({ sidebarOpen, onSidebarToggle }: AppHeaderProps) {
  const pathname = usePathname()
  const title = pageTitles[pathname] || 'Rentaloo Docs'

  return (
    <header className="sticky top-0 z-30 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Left side - Menu + Title */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Mobile hamburger */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={onSidebarToggle}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menú</span>
          </Button>
          
          <h1 className="text-lg md:text-xl font-semibold text-foreground truncate">
            {title}
          </h1>
        </div>

        {/* Center - Search (hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search"
              placeholder="Buscar expedientes, clientes, inmuebles..."
              className="pl-10 bg-muted/50 border-transparent focus:border-input focus:bg-background"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:flex bg-accent hover:bg-accent/90 text-accent-foreground text-sm">
            <Link href="/nuevo-documento">
              <FilePlus className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Nuevo documento</span>
              <span className="md:hidden">Nuevo</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-accent rounded-full" />
            <span className="sr-only">Notificaciones</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                  MR
                </div>
                <span className="sr-only">Menú de usuario</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">María Rodríguez</p>
                  <p className="text-xs text-muted-foreground">maria@rentaloo.es</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Mi perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Ajustes
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
