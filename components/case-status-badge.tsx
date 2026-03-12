'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { CaseStatus, OperationType } from '@/types'

interface CaseStatusBadgeProps {
  status: CaseStatus
  className?: string
}

const statusConfig: Record<CaseStatus, { label: string; className: string }> = {
  borrador: {
    label: 'Borrador',
    className: 'bg-muted text-muted-foreground border-muted-foreground/20'
  },
  revision: {
    label: 'En revisión',
    className: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  pendiente_firma: {
    label: 'Pendiente de firma',
    className: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  completado: {
    label: 'Completado',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }
}

export function CaseStatusBadge({ status, className }: CaseStatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <Badge 
      variant="outline" 
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  )
}

interface OperationTypeBadgeProps {
  type: OperationType
  className?: string
}

const operationConfig: Record<OperationType, { label: string; className: string }> = {
  alquiler: {
    label: 'Alquiler',
    className: 'bg-primary/10 text-primary border-primary/20'
  },
  venta: {
    label: 'Venta',
    className: 'bg-violet-50 text-violet-700 border-violet-200'
  },
  reserva: {
    label: 'Reserva',
    className: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  arras: {
    label: 'Arras',
    className: 'bg-pink-50 text-pink-700 border-pink-200'
  }
}

export function OperationTypeBadge({ type, className }: OperationTypeBadgeProps) {
  const config = operationConfig[type]
  
  return (
    <Badge 
      variant="outline" 
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  )
}
