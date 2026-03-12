'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { 
  FileText, 
  FileCheck, 
  FilePen, 
  FolderPlus,
  ArrowRight
} from 'lucide-react'

const actions = [
  {
    label: 'Nuevo contrato',
    description: 'Alquiler larga duración o temporada',
    icon: FileText,
    href: '/nuevo-documento?tipo=alquiler_larga_duracion',
    color: 'bg-primary/10 text-primary hover:bg-primary/20'
  },
  {
    label: 'Nueva reserva',
    description: 'Reserva de compra de vivienda',
    icon: FileCheck,
    href: '/nuevo-documento?tipo=reserva_compra',
    color: 'bg-orange-50 text-orange-600 hover:bg-orange-100'
  },
  {
    label: 'Nuevo documento de arras',
    description: 'Arras penitenciales',
    icon: FilePen,
    href: '/nuevo-documento?tipo=arras',
    color: 'bg-pink-50 text-pink-600 hover:bg-pink-100'
  },
  {
    label: 'Crear expediente',
    description: 'Nuevo expediente vacío',
    icon: FolderPlus,
    href: '/expedientes/nuevo',
    color: 'bg-accent/10 text-accent hover:bg-accent/20'
  }
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Acciones rápidas</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={cn(
              'flex items-center gap-4 p-4 rounded-lg transition-all group',
              action.color
            )}
          >
            <div className="h-10 w-10 rounded-lg bg-background/80 flex items-center justify-center shrink-0">
              <action.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{action.label}</p>
              <p className="text-xs opacity-70">{action.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
