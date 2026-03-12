'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { mockTasks } from '@/data/mock-data'
import { cn } from '@/lib/utils'
import { Calendar, AlertCircle } from 'lucide-react'
import { format, isPast, isToday } from 'date-fns'
import { es } from 'date-fns/locale'

const priorityConfig = {
  alta: { label: 'Alta', className: 'bg-red-50 text-red-700 border-red-200' },
  media: { label: 'Media', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  baja: { label: 'Baja', className: 'bg-slate-50 text-slate-600 border-slate-200' }
}

export function TaskList() {
  const pendingTasks = mockTasks.filter(t => !t.completada).slice(0, 4)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          Tareas pendientes
          {pendingTasks.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {pendingTasks.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {pendingTasks.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <p className="text-sm">No tienes tareas pendientes</p>
          </div>
        ) : (
          pendingTasks.map((task) => {
            const isOverdue = task.fechaLimite && isPast(new Date(task.fechaLimite)) && !isToday(new Date(task.fechaLimite))
            const isDueToday = task.fechaLimite && isToday(new Date(task.fechaLimite))
            
            return (
              <div
                key={task.id}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-lg border transition-colors',
                  isOverdue ? 'border-red-200 bg-red-50/50' : 'border-border hover:bg-muted/50'
                )}
              >
                <Checkbox 
                  id={task.id}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <label 
                    htmlFor={task.id}
                    className="text-sm font-medium cursor-pointer block"
                  >
                    {task.titulo}
                  </label>
                  {task.descripcion && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {task.descripcion}
                    </p>
                  )}
                  <div className="flex items-center gap-2 flex-wrap">
                    {task.expedienteRef && (
                      <span className="text-xs font-mono text-muted-foreground">
                        {task.expedienteRef}
                      </span>
                    )}
                    <Badge 
                      variant="outline" 
                      className={cn('text-xs', priorityConfig[task.prioridad].className)}
                    >
                      {priorityConfig[task.prioridad].label}
                    </Badge>
                  </div>
                </div>
                {task.fechaLimite && (
                  <div className={cn(
                    'flex items-center gap-1 text-xs shrink-0',
                    isOverdue ? 'text-red-600' : isDueToday ? 'text-amber-600' : 'text-muted-foreground'
                  )}>
                    {isOverdue && <AlertCircle className="h-3 w-3" />}
                    <Calendar className="h-3 w-3" />
                    <span>
                      {format(new Date(task.fechaLimite), 'd MMM', { locale: es })}
                    </span>
                  </div>
                )}
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
