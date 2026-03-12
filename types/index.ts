// Tipos de documento
export type DocumentType = 
  | 'alquiler_larga_duracion'
  | 'alquiler_temporada'
  | 'arras'
  | 'reserva_compra'

// Estados de expediente
export type CaseStatus = 
  | 'borrador'
  | 'revision'
  | 'pendiente_firma'
  | 'completado'

// Tipos de operación
export type OperationType = 
  | 'alquiler'
  | 'venta'
  | 'reserva'
  | 'arras'

// Roles de cliente
export type ClientRole = 
  | 'propietario'
  | 'inquilino'
  | 'comprador'
  | 'vendedor'

// Estado de inmueble
export type PropertyStatus = 
  | 'disponible'
  | 'alquilado'
  | 'vendido'
  | 'reservado'
  | 'gestion'

// Modalidad de inmueble
export type PropertyModality = 
  | 'venta'
  | 'alquiler'
  | 'turistico'
  | 'gestion'

// Tipo de inmueble
export type PropertyType = 
  | 'piso'
  | 'casa'
  | 'local'
  | 'oficina'
  | 'garaje'
  | 'trastero'

// Interfaces principales
export interface Client {
  id: string
  nombre: string
  apellidos: string
  dni: string
  email: string
  telefono: string
  direccion: string
  rol: ClientRole
  operacionAsociada?: string
  createdAt: string
}

export interface Property {
  id: string
  direccion: string
  ciudad: string
  codigoPostal: string
  referenciaCatastral: string
  tipo: PropertyType
  estado: PropertyStatus
  modalidad: PropertyModality
  amueblado: boolean
  habitaciones?: number
  banos?: number
  metrosCuadrados?: number
  rentabilidadEstimada?: number
  precioAlquiler?: number
  precioVenta?: number
  observaciones?: string
  createdAt: string
}

export interface Case {
  id: string
  referencia: string
  tipo: OperationType
  documentType: DocumentType
  inmuebleId: string
  inmueble: Property
  clientePrincipalId: string
  clientePrincipal: Client
  estado: CaseStatus
  fecha: string
  updatedAt: string
  // Datos del documento
  documentData?: DocumentData
}

export interface DocumentData {
  // Intervinientes
  arrendador?: Interviniente
  arrendatario?: Interviniente
  propietario?: Interviniente
  comprador?: Interviniente
  vendedor?: Interviniente
  
  // Inmueble
  inmueble?: PropertyData
  
  // Condiciones económicas
  condiciones?: EconomicConditions
  
  // Fechas y cláusulas
  clausulas?: ClauseData
}

export interface Interviniente {
  nombre: string
  apellidos: string
  dni: string
  email: string
  telefono: string
  direccion: string
}

export interface PropertyData {
  direccion: string
  ciudad: string
  codigoPostal: string
  referenciaCatastral: string
  tipo: PropertyType
  amueblado: boolean
  habitaciones?: number
  banos?: number
  metrosCuadrados?: number
  observaciones?: string
}

export interface EconomicConditions {
  renta?: number
  fianza?: number
  senal?: number
  precioVenta?: number
  honorarios?: number
  cuentaBancaria?: string
  suministrosIncluidos?: boolean
  gastosIncluidos?: string[]
}

export interface ClauseData {
  fechaInicio?: string
  fechaFin?: string
  duracion?: number // en meses
  limiteFirma?: string
  mascotasPermitidas?: boolean
  ocupacionMaxima?: number
  observaciones?: string
  clausulasEspeciales?: string
}

export interface Template {
  id: string
  nombre: string
  descripcion: string
  tipo: DocumentType
  estado: 'activo' | 'borrador'
  ultimaActualizacion: string
}

export interface Task {
  id: string
  titulo: string
  descripcion?: string
  expedienteRef?: string
  fechaLimite?: string
  completada: boolean
  prioridad: 'alta' | 'media' | 'baja'
}

export interface Settings {
  nombreEmpresa: string
  logo?: string
  formatoNumeracion: string
  colorMarca: string
  textoPieDocumento: string
}
