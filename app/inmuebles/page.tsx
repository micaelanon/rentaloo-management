'use client'

import { useState, useMemo } from 'react'
import { AppShell } from '@/components/app-shell'
import { PropertyCard } from '@/components/property-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockProperties } from '@/data/mock-data'
import type { PropertyStatus, PropertyModality } from '@/types'
import { Search, Plus, Building2 } from 'lucide-react'

type FilterTab = 'todos' | PropertyStatus | PropertyModality

export default function InmueblesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterTab>('todos')

  const filteredProperties = useMemo(() => {
    let result = [...mockProperties]

    if (activeFilter !== 'todos') {
      if (['disponible', 'alquilado', 'vendido', 'reservado', 'gestion'].includes(activeFilter)) {
        result = result.filter(p => p.estado === activeFilter)
      } else if (['venta', 'alquiler', 'turistico'].includes(activeFilter)) {
        result = result.filter(p => p.modalidad === activeFilter)
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.direccion.toLowerCase().includes(query) ||
        p.ciudad.toLowerCase().includes(query) ||
        p.referenciaCatastral.toLowerCase().includes(query)
      )
    }

    return result
  }, [activeFilter, searchQuery])

  return (
    <AppShell>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Inmuebles</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Cartera de propiedades en gestión, alquiler y venta.
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Añadir inmueble
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Buscar por dirección, ciudad o referencia..."
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
            <TabsTrigger value="disponible" className="text-xs shrink-0">Disponibles</TabsTrigger>
            <TabsTrigger value="alquilado" className="text-xs shrink-0">Alquilados</TabsTrigger>
            <TabsTrigger value="reservado" className="text-xs shrink-0">Reservados</TabsTrigger>
            <TabsTrigger value="venta" className="text-xs shrink-0">En venta</TabsTrigger>
            <TabsTrigger value="alquiler" className="text-xs shrink-0">En alquiler</TabsTrigger>
            <TabsTrigger value="turistico" className="text-xs shrink-0">Turístico</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{filteredProperties.length}</span> inmuebles encontrados
        </p>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            No se encontraron inmuebles
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            No hay inmuebles que coincidan con los filtros seleccionados.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </AppShell>
  )
}
