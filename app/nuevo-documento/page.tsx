'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { AppShell } from '@/components/app-shell'
import { Stepper } from '@/components/stepper'
import { FormSection, FormRow } from '@/components/form-section'
import { DocumentPreview } from '@/components/document-preview'
import { ActionToolbar } from '@/components/action-toolbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockTemplates, generateNewReference } from '@/data/mock-data'
import type { DocumentType, DocumentData, PropertyType } from '@/types'
import { toast } from 'sonner'
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Home, 
  Scroll, 
  Users, 
  Euro, 
  Calendar,
  Check
} from 'lucide-react'

const steps = [
  { id: 1, label: 'Plantilla', description: 'Tipo de documento' },
  { id: 2, label: 'Intervinientes', description: 'Datos personales' },
  { id: 3, label: 'Inmueble', description: 'Datos del inmueble' },
  { id: 4, label: 'Económico', description: 'Condiciones' },
  { id: 5, label: 'Cláusulas', description: 'Fechas y términos' },
  { id: 6, label: 'Revisión', description: 'Vista previa final' },
]

function NuevoDocumentoContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialType = searchParams.get('tipo') as DocumentType | null
  
  const [currentStep, setCurrentStep] = useState(1)
  const [documentType, setDocumentType] = useState<DocumentType>(initialType || 'alquiler_larga_duracion')
  const [referencia] = useState(generateNewReference())
  
  const [documentData, setDocumentData] = useState<DocumentData>({
    arrendador: { nombre: '', apellidos: '', dni: '', email: '', telefono: '', direccion: '' },
    arrendatario: { nombre: '', apellidos: '', dni: '', email: '', telefono: '', direccion: '' },
    propietario: { nombre: '', apellidos: '', dni: '', email: '', telefono: '', direccion: '' },
    comprador: { nombre: '', apellidos: '', dni: '', email: '', telefono: '', direccion: '' },
    vendedor: { nombre: '', apellidos: '', dni: '', email: '', telefono: '', direccion: '' },
    inmueble: {
      direccion: '',
      ciudad: '',
      codigoPostal: '',
      referenciaCatastral: '',
      tipo: 'piso',
      amueblado: false,
      habitaciones: undefined,
      banos: undefined,
      metrosCuadrados: undefined,
      observaciones: ''
    },
    condiciones: {
      renta: undefined,
      fianza: undefined,
      senal: undefined,
      precioVenta: undefined,
      honorarios: undefined,
      cuentaBancaria: '',
      suministrosIncluidos: false,
      gastosIncluidos: []
    },
    clausulas: {
      fechaInicio: '',
      fechaFin: '',
      duracion: undefined,
      limiteFirma: '',
      mascotasPermitidas: false,
      ocupacionMaxima: undefined,
      observaciones: '',
      clausulasEspeciales: ''
    }
  })

  // Update field helper
  const updateField = <T extends keyof DocumentData>(
    section: T, 
    field: keyof NonNullable<DocumentData[T]>, 
    value: unknown
  ) => {
    setDocumentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = () => {
    toast.success('Documento generado correctamente', {
      description: `Expediente ${referencia} creado con éxito.`
    })
    router.push('/expedientes')
  }

  // Get the labels based on document type
  const isAlquiler = documentType === 'alquiler_larga_duracion' || documentType === 'alquiler_temporada'
  const isCompraventa = documentType === 'arras' || documentType === 'reserva_compra'

  // Step 1: Template Selection
  const renderStep1 = () => (
    <div className="space-y-6">
      <FormSection title="Selecciona el tipo de documento" description="Elige la plantilla que mejor se adapte a tu operación.">
        <div className="grid gap-4 md:grid-cols-2">
          {mockTemplates.map((template) => (
            <Card 
              key={template.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                documentType === template.tipo 
                  ? 'ring-2 ring-accent border-accent' 
                  : 'hover:border-accent/50'
              }`}
              onClick={() => setDocumentType(template.tipo)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  {documentType === template.tipo && (
                    <Badge className="bg-accent text-accent-foreground">
                      <Check className="h-3 w-3 mr-1" />
                      Seleccionado
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base mt-3">{template.nombre}</CardTitle>
                <CardDescription className="text-sm">
                  {template.descripcion}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </FormSection>
    </div>
  )

  // Step 2: Parties
  const renderStep2 = () => {
    if (isAlquiler) {
      return (
        <div className="space-y-8">
          <FormSection 
            title="Datos del arrendador" 
            description="Propietario o representante legal del inmueble."
          >
            <FormRow>
              <div className="space-y-2">
                <Label htmlFor="arrendador-nombre">Nombre</Label>
                <Input 
                  id="arrendador-nombre"
                  placeholder="María"
                  value={documentData.arrendador?.nombre || ''}
                  onChange={(e) => updateField('arrendador', 'nombre', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arrendador-apellidos">Apellidos</Label>
                <Input 
                  id="arrendador-apellidos"
                  placeholder="García López"
                  value={documentData.arrendador?.apellidos || ''}
                  onChange={(e) => updateField('arrendador', 'apellidos', e.target.value)}
                />
              </div>
            </FormRow>
            <FormRow>
              <div className="space-y-2">
                <Label htmlFor="arrendador-dni">DNI/NIE</Label>
                <Input 
                  id="arrendador-dni"
                  placeholder="12345678A"
                  value={documentData.arrendador?.dni || ''}
                  onChange={(e) => updateField('arrendador', 'dni', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arrendador-telefono">Teléfono</Label>
                <Input 
                  id="arrendador-telefono"
                  type="tel"
                  placeholder="+34 600 000 000"
                  value={documentData.arrendador?.telefono || ''}
                  onChange={(e) => updateField('arrendador', 'telefono', e.target.value)}
                />
              </div>
            </FormRow>
            <FormRow>
              <div className="space-y-2">
                <Label htmlFor="arrendador-email">Email</Label>
                <Input 
                  id="arrendador-email"
                  type="email"
                  placeholder="email@ejemplo.com"
                  value={documentData.arrendador?.email || ''}
                  onChange={(e) => updateField('arrendador', 'email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arrendador-direccion">Dirección</Label>
                <Input 
                  id="arrendador-direccion"
                  placeholder="Rúa Real, 45, 2º A, 15001 A Coruña"
                  value={documentData.arrendador?.direccion || ''}
                  onChange={(e) => updateField('arrendador', 'direccion', e.target.value)}
                />
              </div>
            </FormRow>
          </FormSection>

          <FormSection 
            title="Datos del arrendatario" 
            description="Persona que ocupará la vivienda."
          >
            <FormRow>
              <div className="space-y-2">
                <Label htmlFor="arrendatario-nombre">Nombre</Label>
                <Input 
                  id="arrendatario-nombre"
                  placeholder="Carlos"
                  value={documentData.arrendatario?.nombre || ''}
                  onChange={(e) => updateField('arrendatario', 'nombre', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arrendatario-apellidos">Apellidos</Label>
                <Input 
                  id="arrendatario-apellidos"
                  placeholder="Fernández Rodríguez"
                  value={documentData.arrendatario?.apellidos || ''}
                  onChange={(e) => updateField('arrendatario', 'apellidos', e.target.value)}
                />
              </div>
            </FormRow>
            <FormRow>
              <div className="space-y-2">
                <Label htmlFor="arrendatario-dni">DNI/NIE</Label>
                <Input 
                  id="arrendatario-dni"
                  placeholder="87654321B"
                  value={documentData.arrendatario?.dni || ''}
                  onChange={(e) => updateField('arrendatario', 'dni', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arrendatario-telefono">Teléfono</Label>
                <Input 
                  id="arrendatario-telefono"
                  type="tel"
                  placeholder="+34 600 000 000"
                  value={documentData.arrendatario?.telefono || ''}
                  onChange={(e) => updateField('arrendatario', 'telefono', e.target.value)}
                />
              </div>
            </FormRow>
            <FormRow>
              <div className="space-y-2">
                <Label htmlFor="arrendatario-email">Email</Label>
                <Input 
                  id="arrendatario-email"
                  type="email"
                  placeholder="email@ejemplo.com"
                  value={documentData.arrendatario?.email || ''}
                  onChange={(e) => updateField('arrendatario', 'email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arrendatario-direccion">Dirección actual</Label>
                <Input 
                  id="arrendatario-direccion"
                  placeholder="Dirección actual del arrendatario"
                  value={documentData.arrendatario?.direccion || ''}
                  onChange={(e) => updateField('arrendatario', 'direccion', e.target.value)}
                />
              </div>
            </FormRow>
          </FormSection>
        </div>
      )
    }

    // For compraventa (arras, reserva)
    return (
      <div className="space-y-8">
        <FormSection 
          title={documentType === 'arras' ? 'Datos del vendedor' : 'Datos del propietario'} 
          description="Titular actual del inmueble."
        >
          <FormRow>
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input 
                placeholder="José Manuel"
                value={documentType === 'arras' ? documentData.vendedor?.nombre || '' : documentData.propietario?.nombre || ''}
                onChange={(e) => updateField(documentType === 'arras' ? 'vendedor' : 'propietario', 'nombre', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Apellidos</Label>
              <Input 
                placeholder="Pérez Iglesias"
                value={documentType === 'arras' ? documentData.vendedor?.apellidos || '' : documentData.propietario?.apellidos || ''}
                onChange={(e) => updateField(documentType === 'arras' ? 'vendedor' : 'propietario', 'apellidos', e.target.value)}
              />
            </div>
          </FormRow>
          <FormRow>
            <div className="space-y-2">
              <Label>DNI/NIE</Label>
              <Input 
                placeholder="12345678A"
                value={documentType === 'arras' ? documentData.vendedor?.dni || '' : documentData.propietario?.dni || ''}
                onChange={(e) => updateField(documentType === 'arras' ? 'vendedor' : 'propietario', 'dni', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Teléfono</Label>
              <Input 
                type="tel"
                placeholder="+34 600 000 000"
                value={documentType === 'arras' ? documentData.vendedor?.telefono || '' : documentData.propietario?.telefono || ''}
                onChange={(e) => updateField(documentType === 'arras' ? 'vendedor' : 'propietario', 'telefono', e.target.value)}
              />
            </div>
          </FormRow>
          <FormRow columns={1}>
            <div className="space-y-2">
              <Label>Dirección</Label>
              <Input 
                placeholder="Dirección completa"
                value={documentType === 'arras' ? documentData.vendedor?.direccion || '' : documentData.propietario?.direccion || ''}
                onChange={(e) => updateField(documentType === 'arras' ? 'vendedor' : 'propietario', 'direccion', e.target.value)}
              />
            </div>
          </FormRow>
        </FormSection>

        <FormSection 
          title="Datos del comprador" 
          description="Persona interesada en la compra."
        >
          <FormRow>
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input 
                placeholder="Ana"
                value={documentData.comprador?.nombre || ''}
                onChange={(e) => updateField('comprador', 'nombre', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Apellidos</Label>
              <Input 
                placeholder="Martínez Vázquez"
                value={documentData.comprador?.apellidos || ''}
                onChange={(e) => updateField('comprador', 'apellidos', e.target.value)}
              />
            </div>
          </FormRow>
          <FormRow>
            <div className="space-y-2">
              <Label>DNI/NIE</Label>
              <Input 
                placeholder="87654321B"
                value={documentData.comprador?.dni || ''}
                onChange={(e) => updateField('comprador', 'dni', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Teléfono</Label>
              <Input 
                type="tel"
                placeholder="+34 600 000 000"
                value={documentData.comprador?.telefono || ''}
                onChange={(e) => updateField('comprador', 'telefono', e.target.value)}
              />
            </div>
          </FormRow>
          <FormRow columns={1}>
            <div className="space-y-2">
              <Label>Dirección</Label>
              <Input 
                placeholder="Dirección completa"
                value={documentData.comprador?.direccion || ''}
                onChange={(e) => updateField('comprador', 'direccion', e.target.value)}
              />
            </div>
          </FormRow>
        </FormSection>
      </div>
    )
  }

  // Step 3: Property
  const renderStep3 = () => (
    <div className="space-y-6">
      <FormSection title="Datos del inmueble" description="Información completa del inmueble objeto del contrato.">
        <FormRow columns={1}>
          <div className="space-y-2">
            <Label htmlFor="inmueble-direccion">Dirección completa</Label>
            <Input 
              id="inmueble-direccion"
              placeholder="Rúa Real, 45, 2º A"
              value={documentData.inmueble?.direccion || ''}
              onChange={(e) => updateField('inmueble', 'direccion', e.target.value)}
            />
          </div>
        </FormRow>
        <FormRow columns={3}>
          <div className="space-y-2">
            <Label htmlFor="inmueble-ciudad">Ciudad</Label>
            <Input 
              id="inmueble-ciudad"
              placeholder="A Coruña"
              value={documentData.inmueble?.ciudad || ''}
              onChange={(e) => updateField('inmueble', 'ciudad', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inmueble-cp">Código postal</Label>
            <Input 
              id="inmueble-cp"
              placeholder="15001"
              value={documentData.inmueble?.codigoPostal || ''}
              onChange={(e) => updateField('inmueble', 'codigoPostal', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inmueble-catastral">Ref. catastral</Label>
            <Input 
              id="inmueble-catastral"
              placeholder="9872301QH4897N0001WX"
              value={documentData.inmueble?.referenciaCatastral || ''}
              onChange={(e) => updateField('inmueble', 'referenciaCatastral', e.target.value)}
            />
          </div>
        </FormRow>
        <FormRow columns={3}>
          <div className="space-y-2">
            <Label>Tipo de inmueble</Label>
            <Select 
              value={documentData.inmueble?.tipo || 'piso'}
              onValueChange={(v) => updateField('inmueble', 'tipo', v as PropertyType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="piso">Piso</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="local">Local comercial</SelectItem>
                <SelectItem value="oficina">Oficina</SelectItem>
                <SelectItem value="garaje">Garaje</SelectItem>
                <SelectItem value="trastero">Trastero</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="inmueble-habitaciones">Habitaciones</Label>
            <Input 
              id="inmueble-habitaciones"
              type="number"
              min="0"
              placeholder="3"
              value={documentData.inmueble?.habitaciones || ''}
              onChange={(e) => updateField('inmueble', 'habitaciones', e.target.value ? parseInt(e.target.value) : undefined)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inmueble-metros">Metros cuadrados</Label>
            <Input 
              id="inmueble-metros"
              type="number"
              min="0"
              placeholder="90"
              value={documentData.inmueble?.metrosCuadrados || ''}
              onChange={(e) => updateField('inmueble', 'metrosCuadrados', e.target.value ? parseInt(e.target.value) : undefined)}
            />
          </div>
        </FormRow>
        <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
          <Switch 
            id="amueblado"
            checked={documentData.inmueble?.amueblado || false}
            onCheckedChange={(checked) => updateField('inmueble', 'amueblado', checked)}
          />
          <div>
            <Label htmlFor="amueblado" className="cursor-pointer">Inmueble amueblado</Label>
            <p className="text-xs text-muted-foreground">Marcar si el inmueble incluye mobiliario</p>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="inmueble-observaciones">Observaciones del inmueble</Label>
          <Textarea 
            id="inmueble-observaciones"
            placeholder="Características especiales, estado de conservación, instalaciones..."
            rows={3}
            value={documentData.inmueble?.observaciones || ''}
            onChange={(e) => updateField('inmueble', 'observaciones', e.target.value)}
          />
        </div>
      </FormSection>
    </div>
  )

  // Step 4: Economic conditions
  const renderStep4 = () => (
    <div className="space-y-6">
      <FormSection 
        title="Condiciones económicas" 
        description={isAlquiler ? "Renta, fianza y gastos del arrendamiento." : "Precio y señal de la operación."}
      >
        {isAlquiler ? (
          <>
            <FormRow>
              <div className="space-y-2">
                <Label htmlFor="renta">Renta mensual (€)</Label>
                <Input 
                  id="renta"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="850"
                  value={documentData.condiciones?.renta || ''}
                  onChange={(e) => updateField('condiciones', 'renta', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fianza">Fianza (€)</Label>
                <Input 
                  id="fianza"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="850"
                  value={documentData.condiciones?.fianza || ''}
                  onChange={(e) => updateField('condiciones', 'fianza', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
            </FormRow>
            <div className="space-y-2">
              <Label htmlFor="cuenta">Cuenta bancaria para el pago</Label>
              <Input 
                id="cuenta"
                placeholder="ES12 1234 5678 9012 3456 7890"
                value={documentData.condiciones?.cuentaBancaria || ''}
                onChange={(e) => updateField('condiciones', 'cuentaBancaria', e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Switch 
                id="suministros"
                checked={documentData.condiciones?.suministrosIncluidos || false}
                onCheckedChange={(checked) => updateField('condiciones', 'suministrosIncluidos', checked)}
              />
              <div>
                <Label htmlFor="suministros" className="cursor-pointer">Suministros incluidos</Label>
                <p className="text-xs text-muted-foreground">Agua, luz, gas incluidos en la renta</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <FormRow>
              <div className="space-y-2">
                <Label htmlFor="precioVenta">Precio de venta (€)</Label>
                <Input 
                  id="precioVenta"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="285000"
                  value={documentData.condiciones?.precioVenta || ''}
                  onChange={(e) => updateField('condiciones', 'precioVenta', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senal">{documentType === 'arras' ? 'Cantidad de arras (€)' : 'Señal de reserva (€)'}</Label>
                <Input 
                  id="senal"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="10000"
                  value={documentData.condiciones?.senal || ''}
                  onChange={(e) => updateField('condiciones', 'senal', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
            </FormRow>
            <div className="space-y-2">
              <Label htmlFor="honorarios">Honorarios de intermediación (€)</Label>
              <Input 
                id="honorarios"
                type="number"
                min="0"
                step="0.01"
                placeholder="5000"
                value={documentData.condiciones?.honorarios || ''}
                onChange={(e) => updateField('condiciones', 'honorarios', e.target.value ? parseFloat(e.target.value) : undefined)}
              />
            </div>
          </>
        )}
      </FormSection>
    </div>
  )

  // Step 5: Clauses and dates
  const renderStep5 = () => (
    <div className="space-y-6">
      <FormSection title="Fechas y duración" description="Plazos del contrato.">
        <FormRow>
          <div className="space-y-2">
            <Label htmlFor="fechaInicio">{isAlquiler ? 'Fecha de inicio' : 'Fecha de firma'}</Label>
            <Input 
              id="fechaInicio"
              type="date"
              value={documentData.clausulas?.fechaInicio || ''}
              onChange={(e) => updateField('clausulas', 'fechaInicio', e.target.value)}
            />
          </div>
          {isAlquiler ? (
            <div className="space-y-2">
              <Label htmlFor="duracion">Duración (meses)</Label>
              <Input 
                id="duracion"
                type="number"
                min="1"
                placeholder="12"
                value={documentData.clausulas?.duracion || ''}
                onChange={(e) => updateField('clausulas', 'duracion', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="limiteFirma">Fecha límite para escritura</Label>
              <Input 
                id="limiteFirma"
                type="date"
                value={documentData.clausulas?.limiteFirma || ''}
                onChange={(e) => updateField('clausulas', 'limiteFirma', e.target.value)}
              />
            </div>
          )}
        </FormRow>
      </FormSection>

      {isAlquiler && (
        <FormSection title="Condiciones especiales" description="Términos adicionales del arrendamiento.">
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <Switch 
              id="mascotas"
              checked={documentData.clausulas?.mascotasPermitidas || false}
              onCheckedChange={(checked) => updateField('clausulas', 'mascotasPermitidas', checked)}
            />
            <div>
              <Label htmlFor="mascotas" className="cursor-pointer">Mascotas permitidas</Label>
              <p className="text-xs text-muted-foreground">Permitir animales de compañía en la vivienda</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ocupacion">Ocupación máxima (personas)</Label>
            <Input 
              id="ocupacion"
              type="number"
              min="1"
              placeholder="4"
              value={documentData.clausulas?.ocupacionMaxima || ''}
              onChange={(e) => updateField('clausulas', 'ocupacionMaxima', e.target.value ? parseInt(e.target.value) : undefined)}
            />
          </div>
        </FormSection>
      )}

      <FormSection title="Cláusulas adicionales" description="Términos especiales que se incluirán en el contrato.">
        <div className="space-y-2">
          <Label htmlFor="clausulasEspeciales">Cláusulas especiales (opcional)</Label>
          <Textarea 
            id="clausulasEspeciales"
            placeholder="Añade aquí cualquier condición especial acordada entre las partes..."
            rows={4}
            value={documentData.clausulas?.clausulasEspeciales || ''}
            onChange={(e) => updateField('clausulas', 'clausulasEspeciales', e.target.value)}
          />
        </div>
      </FormSection>
    </div>
  )

  // Step 6: Review
  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
            <Check className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Documento listo para generar</p>
            <p className="text-sm text-muted-foreground">Revisa la vista previa y genera el documento cuando esté todo correcto.</p>
          </div>
        </div>
      </div>
      <ActionToolbar />
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return renderStep4()
      case 5: return renderStep5()
      case 6: return renderStep6()
      default: return null
    }
  }

  return (
    <AppShell>
      {/* Header with reference */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="font-mono">{referencia}</Badge>
            <Badge className="bg-amber-100 text-amber-800 border-amber-200">Borrador</Badge>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Nuevo documento</h2>
        </div>
      </div>

      {/* Stepper */}
      <div className="mb-8 p-4 bg-card rounded-lg border">
        <Stepper 
          steps={steps} 
          currentStep={currentStep}
          onStepClick={(step) => step <= currentStep && setCurrentStep(step)}
        />
      </div>

      {/* Main content: Form + Preview */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                {currentStep === 1 && <FileText className="h-5 w-5" />}
                {currentStep === 2 && <Users className="h-5 w-5" />}
                {currentStep === 3 && <Home className="h-5 w-5" />}
                {currentStep === 4 && <Euro className="h-5 w-5" />}
                {currentStep === 5 && <Calendar className="h-5 w-5" />}
                {currentStep === 6 && <Scroll className="h-5 w-5" />}
                {steps[currentStep - 1].label}
              </CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {renderCurrentStep()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>
            {currentStep < steps.length ? (
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                Siguiente
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleFinish} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Check className="h-4 w-4 mr-2" />
                Finalizar y guardar
              </Button>
            )}
          </div>
        </div>

        {/* Document Preview Panel */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Vista previa del documento</h3>
            <Badge variant="secondary">Actualización en tiempo real</Badge>
          </div>
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto rounded-lg">
            <DocumentPreview 
              documentType={documentType}
              documentData={documentData}
              referencia={referencia}
            />
          </div>
        </div>
      </div>
    </AppShell>
  )
}

export default function NuevoDocumentoPage() {
  return (
    <Suspense fallback={
      <AppShell>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-muted-foreground">Cargando...</div>
        </div>
      </AppShell>
    }>
      <NuevoDocumentoContent />
    </Suspense>
  )
}
