'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Template } from '@/types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { FileText, Clock, ArrowRight, MoreHorizontal, Copy, Edit, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DocumentTemplateCardProps {
  template: Template
  className?: string
}

const typeIcons: Record<string, string> = {
  alquiler_larga_duracion: 'bg-primary/10 text-primary',
  alquiler_temporada: 'bg-orange-50 text-orange-600',
  arras: 'bg-pink-50 text-pink-600',
  reserva_compra: 'bg-violet-50 text-violet-600'
}

export function DocumentTemplateCard({ template, className }: DocumentTemplateCardProps) {
  return (
    <Card className={cn('hover:shadow-md transition-all group', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={cn(
            'h-12 w-12 rounded-lg flex items-center justify-center',
            typeIcons[template.tipo]
          )}>
            <FileText className="h-6 w-6" />
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={template.estado === 'activo' 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border-amber-200'
              }
            >
              {template.estado === 'activo' ? 'Activa' : 'Borrador'}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar plantilla
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-foreground mb-1">
            {template.nombre}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {template.descripcion}
          </p>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>
            Actualizada {format(new Date(template.ultimaActualizacion), "d 'de' MMMM, yyyy", { locale: es })}
          </span>
        </div>

        <Button 
          asChild 
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Link href={`/nuevo-documento?tipo=${template.tipo}`}>
            Usar plantilla
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
