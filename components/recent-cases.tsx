'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CaseStatusBadge, OperationTypeBadge } from './case-status-badge'
import { mockCases } from '@/data/mock-data'
import { ArrowRight, Building2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export function RecentCases() {
  const recentCases = mockCases.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Expedientes recientes</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/expedientes">
              Ver todos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {recentCases.map((caseItem) => (
            <Link
              key={caseItem.id}
              href={`/expedientes/${caseItem.id}`}
              className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-medium text-foreground">
                    {caseItem.referencia}
                  </span>
                  <OperationTypeBadge type={caseItem.tipo} />
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {caseItem.inmueble.direccion}, {caseItem.inmueble.ciudad}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <CaseStatusBadge status={caseItem.estado} />
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(caseItem.updatedAt), { 
                    addSuffix: true, 
                    locale: es 
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
