'use client'

import { AppShell } from '@/components/app-shell'
import { DocumentTemplateCard } from '@/components/document-template-card'
import { Button } from '@/components/ui/button'
import { mockTemplates } from '@/data/mock-data'
import { Plus, FileText } from 'lucide-react'

export default function PlantillasPage() {
  return (
    <AppShell>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Plantillas</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Modelos de documentos disponibles para generar nuevos expedientes.
          </p>
        </div>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Nueva plantilla
        </Button>
      </div>

      {/* Info Banner */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">
              Plantillas de documentos inmobiliarios
            </h3>
            <p className="text-sm text-muted-foreground">
              Selecciona cualquier plantilla para crear un nuevo documento. 
              Los formularios se adaptan automáticamente al tipo de operación y 
              el documento se genera con la estructura legal correspondiente.
            </p>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mockTemplates.map((template) => (
          <DocumentTemplateCard key={template.id} template={template} />
        ))}
      </div>

      {/* Usage Stats */}
      <div className="mt-8 pt-8 border-t">
        <h3 className="text-lg font-semibold text-foreground mb-4">Estadísticas de uso</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Contratos de alquiler</p>
            <p className="text-2xl font-bold text-foreground mt-1">24</p>
            <p className="text-xs text-muted-foreground">este mes</p>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Alquiler temporada</p>
            <p className="text-2xl font-bold text-foreground mt-1">8</p>
            <p className="text-xs text-muted-foreground">este mes</p>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Contratos de arras</p>
            <p className="text-2xl font-bold text-foreground mt-1">5</p>
            <p className="text-xs text-muted-foreground">este mes</p>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Reservas de compra</p>
            <p className="text-2xl font-bold text-foreground mt-1">3</p>
            <p className="text-xs text-muted-foreground">este mes</p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
