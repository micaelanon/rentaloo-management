'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/app-shell'
import { CaseTable } from '@/components/case-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockCases } from '@/data/mock-data'
import type { OperationType, CaseStatus } from '@/types'
import { Search, FilePlus, Filter } from 'lucide-react'

type FilterTab = 'todos' | OperationType | CaseStatus

export default function ExpedientesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterTab>('todos')

  const filteredCases = useMemo(() => {
    let result = [...mockCases]

    // Apply tab filter
    if (activeFilter !== 'todos') {
      if (['alquiler', 'venta', 'reserva', 'arras'].includes(activeFilter)) {
        result = result.filter(c => c.tipo === activeFilter)
      } else if (['borrador', 'revision', 'pendiente_firma', 'completado'].includes(activeFilter)) {
        result = result.filter(c => c.estado === activeFilter)
      }
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(c => 
        c.referencia.toLowerCase().includes(query) ||
        c.inmueble.direccion.toLowerCase().includes(query) ||
        c.inmueble.ciudad.toLowerCase().includes(query) ||
        c.clientePrincipal.nombre.toLowerCase().includes(query) ||
        c.clientePrincipal.apellidos.toLowerCase().includes(query)
      )
    }

    return result
  }, [activeFilter, searchQuery])

  return (
    <AppShell>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Expedientes</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Gestiona todos los expedientes y documentos de operaciones inmobiliarias.
          </p>
        </div>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/nuevo-documento">
            <FilePlus className="h-4 w-4 mr-2" />
            Nuevo documento
          </Link>
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Buscar por referencia, inmueble o cliente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Tabs */}
        <Tabs 
          value={activeFilter} 
          onValueChange={(v) => setActiveFilter(v as FilterTab)}
          className="w-full lg:w-auto"
        >
          <TabsList className="h-auto flex-wrap justify-start bg-muted/50 p-1">
            <TabsTrigger value="todos" className="text-xs">
              Todos
            </TabsTrigger>
            <TabsTrigger value="alquiler" className="text-xs">
              Alquiler
            </TabsTrigger>
            <TabsTrigger value="venta" className="text-xs">
              Venta
            </TabsTrigger>
            <TabsTrigger value="reserva" className="text-xs">
              Reserva
            </TabsTrigger>
            <TabsTrigger value="arras" className="text-xs">
              Arras
            </TabsTrigger>
            <TabsTrigger value="pendiente_firma" className="text-xs">
              Pendiente
            </TabsTrigger>
            <TabsTrigger value="completado" className="text-xs">
              Completado
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Mostrando <span className="font-medium text-foreground">{filteredCases.length}</span> expedientes
        </p>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Más filtros
        </Button>
      </div>

      {/* Cases Table */}
      <CaseTable cases={filteredCases} />
    </AppShell>
  )
}
