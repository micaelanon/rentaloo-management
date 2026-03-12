'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Property } from '@/types'
import { 
  getPropertyTypeLabel, 
  getPropertyStatusLabel, 
  getModalityLabel 
} from '@/data/mock-data'
import { 
  Building2, 
  MapPin, 
  BedDouble, 
  Square, 
  MoreHorizontal,
  TrendingUp,
  Euro
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface PropertyCardProps {
  property: Property
  className?: string
}

const statusColors: Record<string, string> = {
  disponible: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  alquilado: 'bg-blue-50 text-blue-700 border-blue-200',
  vendido: 'bg-slate-50 text-slate-600 border-slate-200',
  reservado: 'bg-amber-50 text-amber-700 border-amber-200',
  gestion: 'bg-violet-50 text-violet-700 border-violet-200'
}

const modalityColors: Record<string, string> = {
  venta: 'bg-pink-50 text-pink-700 border-pink-200',
  alquiler: 'bg-primary/10 text-primary border-primary/20',
  turistico: 'bg-orange-50 text-orange-700 border-orange-200',
  gestion: 'bg-cyan-50 text-cyan-700 border-cyan-200'
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const formatCurrency = (amount?: number) => {
    if (!amount) return null
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount)
  }

  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <Building2 className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {property.direccion}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>{property.ciudad}</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                  <DropdownMenuItem>Editar inmueble</DropdownMenuItem>
                  <DropdownMenuItem>Crear expediente</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant="outline" className={statusColors[property.estado]}>
                {getPropertyStatusLabel(property.estado)}
              </Badge>
              <Badge variant="outline" className={modalityColors[property.modalidad]}>
                {getModalityLabel(property.modalidad)}
              </Badge>
              <Badge variant="secondary">
                {getPropertyTypeLabel(property.tipo)}
              </Badge>
            </div>

            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              {property.habitaciones && (
                <div className="flex items-center gap-1">
                  <BedDouble className="h-4 w-4" />
                  <span>{property.habitaciones} hab.</span>
                </div>
              )}
              {property.metrosCuadrados && (
                <div className="flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  <span>{property.metrosCuadrados} m²</span>
                </div>
              )}
              {property.amueblado && (
                <Badge variant="outline" className="text-xs">Amueblado</Badge>
              )}
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t">
              <div className="flex items-center gap-2">
                {property.precioAlquiler && (
                  <span className="text-sm font-semibold text-foreground flex items-center gap-1">
                    <Euro className="h-3.5 w-3.5" />
                    {formatCurrency(property.precioAlquiler)}/mes
                  </span>
                )}
                {property.precioVenta && (
                  <span className="text-sm font-semibold text-foreground flex items-center gap-1">
                    <Euro className="h-3.5 w-3.5" />
                    {formatCurrency(property.precioVenta)}
                  </span>
                )}
              </div>
              {property.rentabilidadEstimada && (
                <div className="flex items-center gap-1 text-accent text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  <span>{property.rentabilidadEstimada}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
