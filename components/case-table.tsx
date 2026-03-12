'use client'

import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CaseStatusBadge, OperationTypeBadge } from './case-status-badge'
import type { Case } from '@/types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { 
  MoreHorizontal, 
  Eye, 
  Copy, 
  FileText, 
  Send, 
  Trash2,
  Building2,
  ChevronRight
} from 'lucide-react'

interface CaseTableProps {
  cases: Case[]
}

export function CaseTable({ cases }: CaseTableProps) {
  if (cases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Building2 className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          No se encontraron expedientes
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          No hay expedientes que coincidan con los filtros seleccionados. Prueba a cambiar los criterios de búsqueda.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Mobile: card list */}
      <div className="md:hidden space-y-3">
        {cases.map((caseItem) => (
          <Link
            key={caseItem.id}
            href={`/expedientes/${caseItem.id}`}
            className="block rounded-lg border bg-card p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-sm font-medium text-primary">
                    {caseItem.referencia}
                  </span>
                  <OperationTypeBadge type={caseItem.tipo} />
                </div>
                <p className="text-sm font-medium text-foreground truncate">
                  {caseItem.inmueble.direccion}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {caseItem.clientePrincipal.nombre} {caseItem.clientePrincipal.apellidos}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t">
              <CaseStatusBadge status={caseItem.estado} />
              <span className="text-xs text-muted-foreground">
                {format(new Date(caseItem.fecha), 'd MMM yyyy', { locale: es })}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[140px]">Referencia</TableHead>
              <TableHead className="w-[100px]">Tipo</TableHead>
              <TableHead>Inmueble</TableHead>
              <TableHead>Cliente principal</TableHead>
              <TableHead className="w-[140px]">Estado</TableHead>
              <TableHead className="w-[100px]">Fecha</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseItem) => (
              <TableRow key={caseItem.id} className="group">
                <TableCell>
                  <Link 
                    href={`/expedientes/${caseItem.id}`}
                    className="font-mono text-sm font-medium text-primary hover:underline"
                  >
                    {caseItem.referencia}
                  </Link>
                </TableCell>
                <TableCell>
                  <OperationTypeBadge type={caseItem.tipo} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {caseItem.inmueble.direccion}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {caseItem.inmueble.ciudad}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {caseItem.clientePrincipal.nombre} {caseItem.clientePrincipal.apellidos}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {caseItem.clientePrincipal.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <CaseStatusBadge status={caseItem.estado} />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(caseItem.fecha), 'd MMM yyyy', { locale: es })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon-sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Acciones</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link href={`/expedientes/${caseItem.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver expediente
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Ver documento
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar por email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
