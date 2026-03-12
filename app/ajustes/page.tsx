'use client'

import { AppShell } from '@/components/app-shell'
import { RentalooLogo } from '@/components/rentaloo-logo'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { mockSettings } from '@/data/mock-data'
import { toast } from 'sonner'
import { 
  Building2, 
  FileText, 
  Palette, 
  Save, 
  Upload,
  Hash
} from 'lucide-react'

export default function AjustesPage() {
  const handleSave = () => {
    toast.success('Ajustes guardados correctamente')
  }

  return (
    <AppShell>
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Ajustes</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Configuración general de Rentaloo Docs y personalización de documentos.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <CardTitle>Datos de empresa</CardTitle>
              </div>
              <CardDescription>
                Información de la empresa que aparecerá en los documentos generados.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombreEmpresa">Nombre de la empresa</Label>
                <Input 
                  id="nombreEmpresa"
                  defaultValue={mockSettings.nombreEmpresa}
                />
              </div>
              <div className="space-y-2">
                <Label>Logo de empresa</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-32 rounded-lg border bg-muted flex items-center justify-center">
                    <RentalooLogo />
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Cambiar logo
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Formato recomendado: PNG o SVG, máximo 2MB
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Document Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Configuración de documentos</CardTitle>
              </div>
              <CardDescription>
                Personaliza el formato y contenido de los documentos generados.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="formatoNumeracion" className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Formato de numeración de expedientes
                </Label>
                <Input 
                  id="formatoNumeracion"
                  defaultValue={mockSettings.formatoNumeracion}
                  placeholder="EXP-{YYYY}-{NNNN}"
                />
                <p className="text-xs text-muted-foreground">
                  Variables disponibles: {'{YYYY}'} (año), {'{MM}'} (mes), {'{NNNN}'} (número secuencial)
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="textoPie">Texto de pie de documento</Label>
                <Textarea 
                  id="textoPie"
                  rows={3}
                  defaultValue={mockSettings.textoPieDocumento}
                  placeholder="Texto que aparecerá al final de todos los documentos..."
                />
                <p className="text-xs text-muted-foreground">
                  Este texto se incluirá automáticamente en todos los documentos generados.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Brand Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle>Identidad visual</CardTitle>
              </div>
              <CardDescription>
                Colores y estilos que se aplicarán a la interfaz y documentos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Color principal</Label>
                <div className="flex items-center gap-3">
                  <div 
                    className="h-10 w-10 rounded-lg border shadow-sm"
                    style={{ backgroundColor: '#0F2C43' }}
                  />
                  <Input 
                    defaultValue="#0F2C43"
                    className="w-32 font-mono text-sm"
                  />
                  <span className="text-sm text-muted-foreground">Navy Rentaloo</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Color de acento</Label>
                <div className="flex items-center gap-3">
                  <div 
                    className="h-10 w-10 rounded-lg border shadow-sm"
                    style={{ backgroundColor: '#3AB598' }}
                  />
                  <Input 
                    defaultValue="#3AB598"
                    className="w-32 font-mono text-sm"
                  />
                  <span className="text-sm text-muted-foreground">Teal Rentaloo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Vista previa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-4 border">
                <div className="flex items-center gap-2 mb-3">
                  <RentalooLogo variant="icon" className="h-6 w-6" />
                  <span className="text-sm font-semibold">RENTALOO</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="h-2 w-full bg-muted rounded"></div>
                  <div className="h-2 w-3/4 bg-muted rounded"></div>
                  <div className="h-2 w-1/2 bg-muted rounded"></div>
                </div>
                <div className="mt-4 pt-3 border-t text-[10px] text-muted-foreground line-clamp-2">
                  {mockSettings.textoPieDocumento}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Actions */}
          <Card>
            <CardContent className="pt-6">
              <Button 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={handleSave}
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar cambios
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Los cambios se aplicarán a los nuevos documentos generados.
              </p>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-foreground mb-2">Rentaloo Docs</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Sistema interno de gestión documental para operaciones inmobiliarias.
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Versión: 1.0.0 (Demo)</p>
                <p>Última actualización: Marzo 2026</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
