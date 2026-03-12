'use client'

import { AppShell } from '@/components/app-shell'
import { DocumentTemplateCard } from '@/components/document-template-card'
import { Button } from '@/components/ui/button'
import { mockTemplates } from '@/data/mock-data'
import { Plus } from 'lucide-react'

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

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mockTemplates.map((template) => (
          <DocumentTemplateCard key={template.id} template={template} />
        ))}
      </div>
    </AppShell>
  )
}
