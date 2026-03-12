'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Client } from '@/types'
import { getRoleLabel } from '@/data/mock-data'
import { Phone, Mail, MapPin, MoreHorizontal, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ClientCardProps {
  client: Client
  className?: string
}

const roleColors: Record<string, string> = {
  propietario: 'bg-blue-50 text-blue-700 border-blue-200',
  inquilino: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  comprador: 'bg-violet-50 text-violet-700 border-violet-200',
  vendedor: 'bg-orange-50 text-orange-700 border-orange-200'
}

export function ClientCard({ client, className }: ClientCardProps) {
  const initials = `${client.nombre.charAt(0)}${client.apellidos.charAt(0)}`

  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground truncate">
                  {client.nombre} {client.apellidos}
                </h3>
                <Badge 
                  variant="outline" 
                  className={cn('mt-1', roleColors[client.rol])}
                >
                  {getRoleLabel(client.rol)}
                </Badge>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Ver perfil completo</DropdownMenuItem>
                  <DropdownMenuItem>Editar datos</DropdownMenuItem>
                  <DropdownMenuItem>Ver expedientes</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{client.telefono}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{client.direccion}</span>
              </div>
            </div>

            {client.operacionAsociada && (
              <div className="mt-3 pt-3 border-t">
                <span className="text-xs text-muted-foreground">Expediente: </span>
                <span className="text-xs font-mono font-medium text-primary">
                  {client.operacionAsociada}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
