'use client'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import type { DocumentType, DocumentData, PropertyType } from '@/types'
import { getDocumentTypeLabel, getPropertyTypeLabel } from '@/data/mock-data'
import { FileText } from 'lucide-react'

interface DocumentPreviewProps {
  documentType: DocumentType
  documentData: DocumentData
  referencia?: string
  className?: string
}

export function DocumentPreview({ 
  documentType, 
  documentData, 
  referencia,
  className 
}: DocumentPreviewProps) {
  const { arrendador, arrendatario, propietario, comprador, vendedor, inmueble, condiciones, clausulas } = documentData

  const formatCurrency = (amount?: number) => {
    if (!amount) return '___'
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount)
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '___'
    return new Date(dateStr).toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  const highlightIfEmpty = (value: string | undefined, fallback = '___') => {
    if (!value || value.trim() === '') {
      return <span className="bg-amber-100 text-amber-800 px-1 rounded">{fallback}</span>
    }
    return <span className="font-medium">{value}</span>
  }

  const renderAlquilerLargaDuracion = () => (
    <>
      {/* Header */}
      <div className="text-center border-b-2 border-foreground/20 pb-6 mb-6">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground mb-2">
          CONTRATO DE ARRENDAMIENTO DE VIVIENDA
        </h1>
        <p className="text-sm text-muted-foreground">
          Contrato de arrendamiento de vivienda habitual conforme a la Ley 29/1994, de 24 de noviembre, de Arrendamientos Urbanos
        </p>
        {referencia && (
          <Badge variant="outline" className="mt-3">
            Ref: {referencia}
          </Badge>
        )}
      </div>

      {/* Reunidos */}
      <section className="mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">I</span>
          REUNIDOS
        </h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            De una parte, como <strong>ARRENDADOR/A</strong>:
          </p>
          <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary">
            <p>
              D./Dña. {highlightIfEmpty(arrendador?.nombre && arrendador?.apellidos ? `${arrendador.nombre} ${arrendador.apellidos}` : undefined)}, 
              mayor de edad, con DNI núm. {highlightIfEmpty(arrendador?.dni)}, 
              y domicilio en {highlightIfEmpty(arrendador?.direccion)}.
            </p>
            {arrendador?.email && <p className="text-muted-foreground mt-1">Contacto: {arrendador.email} | {arrendador.telefono || '___'}</p>}
          </div>
          
          <p>
            De otra parte, como <strong>ARRENDATARIO/A</strong>:
          </p>
          <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-accent">
            <p>
              D./Dña. {highlightIfEmpty(arrendatario?.nombre && arrendatario?.apellidos ? `${arrendatario.nombre} ${arrendatario.apellidos}` : undefined)}, 
              mayor de edad, con DNI núm. {highlightIfEmpty(arrendatario?.dni)}, 
              y domicilio en {highlightIfEmpty(arrendatario?.direccion)}.
            </p>
            {arrendatario?.email && <p className="text-muted-foreground mt-1">Contacto: {arrendatario.email} | {arrendatario.telefono || '___'}</p>}
          </div>
        </div>
      </section>

      {/* Exponen */}
      <section className="mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">II</span>
          EXPONEN
        </h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            <strong>PRIMERO.</strong> Que el/la ARRENDADOR/A es propietario/a del inmueble sito en:
          </p>
          <div className="bg-accent/10 p-4 rounded-lg border">
            <p className="font-medium">{highlightIfEmpty(inmueble?.direccion)}</p>
            <p className="text-muted-foreground">
              {highlightIfEmpty(inmueble?.codigoPostal)} {highlightIfEmpty(inmueble?.ciudad)}
            </p>
            {inmueble?.referenciaCatastral && (
              <p className="text-xs text-muted-foreground mt-2">
                Ref. Catastral: {inmueble.referenciaCatastral}
              </p>
            )}
            <div className="flex gap-4 mt-3 text-xs">
              <span>Tipo: {inmueble?.tipo ? getPropertyTypeLabel(inmueble.tipo) : '___'}</span>
              <span>Amueblado: {inmueble?.amueblado ? 'Sí' : 'No'}</span>
              {inmueble?.habitaciones && <span>{inmueble.habitaciones} hab.</span>}
              {inmueble?.metrosCuadrados && <span>{inmueble.metrosCuadrados} m²</span>}
            </div>
          </div>
          <p>
            <strong>SEGUNDO.</strong> Que el/la ARRENDATARIO/A está interesado/a en arrendar dicho inmueble para destinarlo a su vivienda habitual y permanente.
          </p>
          <p>
            <strong>TERCERO.</strong> Que ambas partes, reconociéndose capacidad legal suficiente para contratar y obligarse, acuerdan suscribir el presente CONTRATO DE ARRENDAMIENTO DE VIVIENDA, con sujeción a las siguientes:
          </p>
        </div>
      </section>

      {/* Cláusulas */}
      <section className="mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">III</span>
          CLÁUSULAS
        </h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <div className="p-4 bg-muted/20 rounded-lg">
            <p className="font-semibold mb-2">PRIMERA. OBJETO Y DESTINO</p>
            <p>
              El/la ARRENDADOR/A cede en arrendamiento al ARRENDATARIO/A el inmueble descrito anteriormente, 
              que se destinará exclusivamente a vivienda habitual del arrendatario.
              {inmueble?.amueblado && ' La vivienda se arrienda amueblada según inventario adjunto.'}
            </p>
          </div>

          <div className="p-4 bg-muted/20 rounded-lg">
            <p className="font-semibold mb-2">SEGUNDA. DURACIÓN</p>
            <p>
              El arrendamiento se pacta por un período de {highlightIfEmpty(clausulas?.duracion ? `${clausulas.duracion} meses` : undefined)}, 
              con inicio el día {highlightIfEmpty(formatDate(clausulas?.fechaInicio))}.
            </p>
          </div>

          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <p className="font-semibold mb-2">TERCERA. RENTA</p>
            <p>
              La renta mensual se fija en <strong>{formatCurrency(condiciones?.renta)}</strong>, 
              pagaderos dentro de los siete primeros días de cada mes mediante transferencia bancaria a la cuenta:
            </p>
            <p className="font-mono text-sm mt-2 bg-background p-2 rounded">
              {highlightIfEmpty(condiciones?.cuentaBancaria)}
            </p>
          </div>

          <div className="p-4 bg-muted/20 rounded-lg">
            <p className="font-semibold mb-2">CUARTA. FIANZA</p>
            <p>
              A la firma del presente contrato, el/la ARRENDATARIO/A hace entrega de <strong>{formatCurrency(condiciones?.fianza)}</strong> en 
              concepto de fianza legal, equivalente a una mensualidad de renta.
            </p>
          </div>

          <div className="p-4 bg-muted/20 rounded-lg">
            <p className="font-semibold mb-2">QUINTA. GASTOS Y SUMINISTROS</p>
            <p>
              {condiciones?.suministrosIncluidos 
                ? 'Los gastos de suministros (agua, luz, gas) están incluidos en la renta mensual.'
                : 'Serán de cuenta del ARRENDATARIO/A los gastos de suministros (agua, luz, gas, internet) que se contraten a su nombre.'}
            </p>
          </div>

          {clausulas?.mascotasPermitidas !== undefined && (
            <div className={cn(
              'p-4 rounded-lg',
              clausulas.mascotasPermitidas ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'
            )}>
              <p className="font-semibold mb-2">SEXTA. ANIMALES DE COMPAÑÍA</p>
              <p>
                {clausulas.mascotasPermitidas 
                  ? 'Se permite la tenencia de animales de compañía en la vivienda arrendada, siempre que no causen molestias a los vecinos ni daños en el inmueble.'
                  : 'Queda expresamente prohibida la tenencia de animales de compañía en la vivienda arrendada.'}
              </p>
            </div>
          )}

          {clausulas?.ocupacionMaxima && (
            <div className="p-4 bg-muted/20 rounded-lg">
              <p className="font-semibold mb-2">SÉPTIMA. OCUPACIÓN</p>
              <p>
                La vivienda será ocupada por un máximo de {clausulas.ocupacionMaxima} personas.
              </p>
            </div>
          )}

          {clausulas?.clausulasEspeciales && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="font-semibold mb-2">CLÁUSULAS ADICIONALES</p>
              <p className="whitespace-pre-wrap">{clausulas.clausulasEspeciales}</p>
            </div>
          )}
        </div>
      </section>

      {/* Firmas */}
      <section className="mt-8 pt-6 border-t-2 border-foreground/20">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">IV</span>
          FIRMAS
        </h2>
        <p className="text-sm mb-6 text-muted-foreground">
          Y en prueba de conformidad con cuanto antecede, ambas partes firman el presente contrato por duplicado ejemplar 
          y a un solo efecto, en el lugar y fecha indicados.
        </p>
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center">
            <div className="h-24 border-b-2 border-foreground/30 mb-2"></div>
            <p className="text-sm font-medium">EL/LA ARRENDADOR/A</p>
            <p className="text-xs text-muted-foreground">
              {arrendador?.nombre} {arrendador?.apellidos}
            </p>
          </div>
          <div className="text-center">
            <div className="h-24 border-b-2 border-foreground/30 mb-2"></div>
            <p className="text-sm font-medium">EL/LA ARRENDATARIO/A</p>
            <p className="text-xs text-muted-foreground">
              {arrendatario?.nombre} {arrendatario?.apellidos}
            </p>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">
          En {inmueble?.ciudad || '___'}, a {formatDate(clausulas?.fechaInicio)}
        </p>
      </section>
    </>
  )

  const renderAlquilerTemporada = () => (
    <>
      <div className="text-center border-b-2 border-foreground/20 pb-6 mb-6">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground mb-2">
          CONTRATO DE ARRENDAMIENTO DE TEMPORADA
        </h1>
        <p className="text-sm text-muted-foreground">
          Arrendamiento para uso distinto al de vivienda habitual
        </p>
        {referencia && <Badge variant="outline" className="mt-3">Ref: {referencia}</Badge>}
      </div>

      <section className="mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-3">REUNIDOS</h2>
        <div className="space-y-3 text-sm">
          <p>
            <strong>ARRENDADOR/A:</strong> {highlightIfEmpty(arrendador?.nombre && arrendador?.apellidos ? `${arrendador.nombre} ${arrendador.apellidos}` : undefined)}, 
            DNI {highlightIfEmpty(arrendador?.dni)}
          </p>
          <p>
            <strong>ARRENDATARIO/A:</strong> {highlightIfEmpty(arrendatario?.nombre && arrendatario?.apellidos ? `${arrendatario.nombre} ${arrendatario.apellidos}` : undefined)}, 
            DNI {highlightIfEmpty(arrendatario?.dni)}
          </p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-3">INMUEBLE</h2>
        <div className="bg-accent/10 p-4 rounded-lg border text-sm">
          <p>{highlightIfEmpty(inmueble?.direccion)}, {highlightIfEmpty(inmueble?.ciudad)}</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-3">CONDICIONES</h2>
        <div className="space-y-3 text-sm">
          <p><strong>Período:</strong> Del {formatDate(clausulas?.fechaInicio)} al {formatDate(clausulas?.fechaFin)}</p>
          <p><strong>Renta total:</strong> {formatCurrency(condiciones?.renta)}</p>
          <p><strong>Fianza:</strong> {formatCurrency(condiciones?.fianza)}</p>
          <p><strong>Finalidad:</strong> Uso temporal distinto a vivienda habitual (vacaciones, trabajo temporal, estudios, etc.)</p>
        </div>
      </section>
    </>
  )

  const renderArras = () => (
    <>
      <div className="text-center border-b-2 border-foreground/20 pb-6 mb-6">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground mb-2">
          CONTRATO DE ARRAS PENITENCIALES
        </h1>
        <p className="text-sm text-muted-foreground">
          Documento privado de señal para compraventa de inmueble
        </p>
        {referencia && <Badge variant="outline" className="mt-3">Ref: {referencia}</Badge>}
      </div>

      <section className="mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-3">PARTES INTERVINIENTES</h2>
        <div className="space-y-3 text-sm">
          <div className="bg-muted/30 p-4 rounded-lg">
            <p><strong>VENDEDOR/A:</strong> {highlightIfEmpty(vendedor?.nombre && vendedor?.apellidos ? `${vendedor.nombre} ${vendedor.apellidos}` : undefined)}</p>
            <p>DNI: {highlightIfEmpty(vendedor?.dni)} | Domicilio: {highlightIfEmpty(vendedor?.direccion)}</p>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <p><strong>COMPRADOR/A:</strong> {highlightIfEmpty(comprador?.nombre && comprador?.apellidos ? `${comprador.nombre} ${comprador.apellidos}` : undefined)}</p>
            <p>DNI: {highlightIfEmpty(comprador?.dni)} | Domicilio: {highlightIfEmpty(comprador?.direccion)}</p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-3">INMUEBLE OBJETO DE LA COMPRAVENTA</h2>
        <div className="bg-accent/10 p-4 rounded-lg border text-sm">
          <p className="font-medium">{highlightIfEmpty(inmueble?.direccion)}</p>
          <p>{highlightIfEmpty(inmueble?.codigoPostal)} {highlightIfEmpty(inmueble?.ciudad)}</p>
          <p className="text-xs mt-2">Ref. Catastral: {highlightIfEmpty(inmueble?.referenciaCatastral)}</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-3">CONDICIONES ECONÓMICAS</h2>
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between p-3 bg-muted/20 rounded">
            <span>Precio de venta</span>
            <span className="font-bold">{formatCurrency(condiciones?.precioVenta)}</span>
          </div>
          <div className="flex justify-between p-3 bg-accent/20 rounded border border-accent/30">
            <span>Arras entregadas</span>
            <span className="font-bold text-accent">{formatCurrency(condiciones?.senal)}</span>
          </div>
          <div className="flex justify-between p-3 bg-muted/20 rounded">
            <span>Resto pendiente</span>
            <span className="font-bold">{formatCurrency((condiciones?.precioVenta || 0) - (condiciones?.senal || 0))}</span>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-3">PLAZOS</h2>
        <div className="text-sm p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p><strong>Fecha límite para escritura pública:</strong> {formatDate(clausulas?.limiteFirma)}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Si el comprador desistiera, perderá la cantidad entregada. Si el vendedor desistiera, deberá devolver el doble.
          </p>
        </div>
      </section>
    </>
  )

  const renderReservaCompra = () => (
    <>
      <div className="text-center border-b-2 border-foreground/20 pb-6 mb-6">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground mb-2">
          DOCUMENTO DE RESERVA DE COMPRA
        </h1>
        <p className="text-sm text-muted-foreground">
          Reserva de vivienda con entrega de señal
        </p>
        {referencia && <Badge variant="outline" className="mt-3">Ref: {referencia}</Badge>}
      </div>

      <section className="mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-3">PARTES</h2>
        <div className="space-y-3 text-sm">
          <p><strong>PROPIETARIO/A:</strong> {highlightIfEmpty(propietario?.nombre && propietario?.apellidos ? `${propietario.nombre} ${propietario.apellidos}` : undefined)}, DNI {highlightIfEmpty(propietario?.dni)}</p>
          <p><strong>RESERVANTE:</strong> {highlightIfEmpty(comprador?.nombre && comprador?.apellidos ? `${comprador.nombre} ${comprador.apellidos}` : undefined)}, DNI {highlightIfEmpty(comprador?.dni)}</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-3">INMUEBLE RESERVADO</h2>
        <div className="bg-accent/10 p-4 rounded-lg border text-sm">
          <p>{highlightIfEmpty(inmueble?.direccion)}, {highlightIfEmpty(inmueble?.ciudad)}</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-3">CONDICIONES DE LA RESERVA</h2>
        <div className="space-y-3 text-sm">
          <p><strong>Precio de venta acordado:</strong> {formatCurrency(condiciones?.precioVenta)}</p>
          <p><strong>Cantidad de reserva:</strong> {formatCurrency(condiciones?.senal)}</p>
          <p><strong>Plazo para formalizar arras:</strong> {formatDate(clausulas?.limiteFirma)}</p>
        </div>
      </section>
    </>
  )

  const renderDocument = () => {
    switch (documentType) {
      case 'alquiler_larga_duracion':
        return renderAlquilerLargaDuracion()
      case 'alquiler_temporada':
        return renderAlquilerTemporada()
      case 'arras':
        return renderArras()
      case 'reserva_compra':
        return renderReservaCompra()
      default:
        return (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Selecciona un tipo de documento para ver la vista previa</p>
          </div>
        )
    }
  }

  return (
    <div className={cn(
      'bg-white rounded-lg shadow-lg border p-5 md:p-8 lg:p-12 min-h-[600px]',
      'font-serif text-foreground',
      className
    )}>
      {renderDocument()}
    </div>
  )
}
