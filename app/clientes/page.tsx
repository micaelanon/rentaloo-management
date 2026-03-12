'use client'

import { useState, useMemo } from 'react'
import { AppShell } from '@/components/app-shell'
import { ClientCard } from '@/components/client-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockClients } from '@/data/mock-data'
import type { ClientRole } from '@/types'
import { Search, UserPlus, Users } from 'lucide-react'

type FilterTab = 'todos' | ClientRole

export default function ClientesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterTab>('todos')

  const filteredClients = useMemo(() => {
    let result = [...mockClients]

    if (activeFilter !== 'todos') {
      result = result.filter(c => c.rol === activeFilter)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(c => 
        c.nombre.toLowerCase().includes(query) ||
        c.apellidos.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.telefono.includes(query)
      )
    }

    return result
  }, [activeFilter, searchQuery])

  return (
    <AppShell>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Clientes</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Directorio de propietarios, inquilinos, compradores y vendedores.
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <UserPlus className="h-4 w-4 mr-2" />
          Añadir cliente
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Buscar por nombre, email o teléfono..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs 
          value={activeFilter} 
          onValueChange={(v) => setActiveFilter(v as FilterTab)}
        >
          <TabsList className="h-auto bg-muted/50 p-1 flex-nowrap overflow-x-auto no-scrollbar">
            <TabsTrigger value="todos" className="text-xs shrink-0">Todos</TabsTrigger>
            <TabsTrigger value="propietario" className="text-xs shrink-0">Propietarios</TabsTrigger>
            <TabsTrigger value="inquilino" className="text-xs shrink-0">Inquilinos</TabsTrigger>
            <TabsTrigger value="comprador" className="text-xs shrink-0">Compradores</TabsTrigger>
            <TabsTrigger value="vendedor" className="text-xs shrink-0">Vendedores</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{filteredClients.length}</span> clientes encontrados
        </p>
      </div>

      {/* Clients Grid */}
      {filteredClients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            No se encontraron clientes
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            No hay clientes que coincidan con los filtros seleccionados.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}
    </AppShell>
  )
}
