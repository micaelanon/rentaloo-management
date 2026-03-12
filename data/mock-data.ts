import type { 
  Client, 
  Property, 
  Case, 
  Template, 
  Task, 
  Settings 
} from '@/types'

export const mockClients: Client[] = [
  {
    id: 'cli-001',
    nombre: 'María',
    apellidos: 'García López',
    dni: '32456789A',
    email: 'maria.garcia@email.com',
    telefono: '+34 981 234 567',
    direccion: 'Rúa Real, 45, 2º A, 15001 A Coruña',
    rol: 'propietario',
    operacionAsociada: 'EXP-2026-0018',
    createdAt: '2025-11-15'
  },
  {
    id: 'cli-002',
    nombre: 'Carlos',
    apellidos: 'Fernández Rodríguez',
    dni: '45678912B',
    email: 'carlos.fernandez@email.com',
    telefono: '+34 686 543 210',
    direccion: 'Avda. de la Marina, 12, 3º B, 15001 A Coruña',
    rol: 'inquilino',
    operacionAsociada: 'EXP-2026-0018',
    createdAt: '2026-01-20'
  },
  {
    id: 'cli-003',
    nombre: 'Ana',
    apellidos: 'Martínez Vázquez',
    dni: '78912345C',
    email: 'ana.martinez@email.com',
    telefono: '+34 620 111 222',
    direccion: 'Rúa Orzán, 78, 1º, 15002 A Coruña',
    rol: 'comprador',
    operacionAsociada: 'EXP-2026-0015',
    createdAt: '2026-02-01'
  },
  {
    id: 'cli-004',
    nombre: 'José Manuel',
    apellidos: 'Pérez Iglesias',
    dni: '12345678D',
    email: 'jm.perez@email.com',
    telefono: '+34 981 876 543',
    direccion: 'Praza de Pontevedra, 3, 4º, 15003 A Coruña',
    rol: 'vendedor',
    operacionAsociada: 'EXP-2026-0015',
    createdAt: '2025-09-10'
  },
  {
    id: 'cli-005',
    nombre: 'Laura',
    apellidos: 'Sánchez Novo',
    dni: '98765432E',
    email: 'laura.sanchez@email.com',
    telefono: '+34 655 333 444',
    direccion: 'Avda. de Arteixo, 156, bajo, 15008 A Coruña',
    rol: 'propietario',
    createdAt: '2026-01-05'
  },
  {
    id: 'cli-006',
    nombre: 'Pedro',
    apellidos: 'López Castro',
    dni: '65432198F',
    email: 'pedro.lopez@email.com',
    telefono: '+34 622 555 666',
    direccion: 'Rúa Barcelona, 22, 2º C, 15010 A Coruña',
    rol: 'inquilino',
    operacionAsociada: 'EXP-2026-0020',
    createdAt: '2026-02-28'
  }
]

export const mockProperties: Property[] = [
  {
    id: 'prop-001',
    direccion: 'Rúa Real, 45, 2º A',
    ciudad: 'A Coruña',
    codigoPostal: '15001',
    referenciaCatastral: '9872301QH4897N0001WX',
    tipo: 'piso',
    estado: 'alquilado',
    modalidad: 'alquiler',
    amueblado: true,
    habitaciones: 3,
    banos: 2,
    metrosCuadrados: 95,
    precioAlquiler: 850,
    rentabilidadEstimada: 5.2,
    createdAt: '2024-06-15'
  },
  {
    id: 'prop-002',
    direccion: 'Avda. de la Marina, 78, 5º',
    ciudad: 'A Coruña',
    codigoPostal: '15001',
    referenciaCatastral: '9872302QH4897N0002AB',
    tipo: 'piso',
    estado: 'disponible',
    modalidad: 'venta',
    amueblado: false,
    habitaciones: 4,
    banos: 2,
    metrosCuadrados: 120,
    precioVenta: 285000,
    createdAt: '2025-03-20'
  },
  {
    id: 'prop-003',
    direccion: 'Rúa Orzán, 156, bajo',
    ciudad: 'A Coruña',
    codigoPostal: '15002',
    referenciaCatastral: '9872303QH4897N0003CD',
    tipo: 'local',
    estado: 'disponible',
    modalidad: 'alquiler',
    amueblado: false,
    metrosCuadrados: 85,
    precioAlquiler: 1200,
    rentabilidadEstimada: 7.1,
    createdAt: '2025-08-10'
  },
  {
    id: 'prop-004',
    direccion: 'Praza de Pontevedra, 12, 3º B',
    ciudad: 'A Coruña',
    codigoPostal: '15003',
    referenciaCatastral: '9872304QH4897N0004EF',
    tipo: 'piso',
    estado: 'reservado',
    modalidad: 'venta',
    amueblado: true,
    habitaciones: 2,
    banos: 1,
    metrosCuadrados: 75,
    precioVenta: 195000,
    createdAt: '2025-01-05'
  },
  {
    id: 'prop-005',
    direccion: 'Rúa San Andrés, 89, 1º',
    ciudad: 'A Coruña',
    codigoPostal: '15003',
    referenciaCatastral: '9872305QH4897N0005GH',
    tipo: 'piso',
    estado: 'disponible',
    modalidad: 'turistico',
    amueblado: true,
    habitaciones: 2,
    banos: 1,
    metrosCuadrados: 60,
    precioAlquiler: 90,
    rentabilidadEstimada: 9.8,
    observaciones: 'Ideal para alquiler vacacional. Vistas al puerto.',
    createdAt: '2024-11-20'
  },
  {
    id: 'prop-006',
    direccion: 'Avda. de Arteixo, 234, 4º A',
    ciudad: 'A Coruña',
    codigoPostal: '15008',
    referenciaCatastral: '9872306QH4897N0006IJ',
    tipo: 'piso',
    estado: 'gestion',
    modalidad: 'gestion',
    amueblado: false,
    habitaciones: 3,
    banos: 1,
    metrosCuadrados: 88,
    precioAlquiler: 700,
    rentabilidadEstimada: 4.8,
    createdAt: '2026-01-15'
  }
]

export const mockCases: Case[] = [
  {
    id: 'case-001',
    referencia: 'EXP-2026-0018',
    tipo: 'alquiler',
    documentType: 'alquiler_larga_duracion',
    inmuebleId: 'prop-001',
    inmueble: mockProperties[0],
    clientePrincipalId: 'cli-002',
    clientePrincipal: mockClients[1],
    estado: 'pendiente_firma',
    fecha: '2026-03-01',
    updatedAt: '2026-03-08'
  },
  {
    id: 'case-002',
    referencia: 'EXP-2026-0015',
    tipo: 'arras',
    documentType: 'arras',
    inmuebleId: 'prop-002',
    inmueble: mockProperties[1],
    clientePrincipalId: 'cli-003',
    clientePrincipal: mockClients[2],
    estado: 'completado',
    fecha: '2026-02-15',
    updatedAt: '2026-02-28'
  },
  {
    id: 'case-003',
    referencia: 'EXP-2026-0020',
    tipo: 'alquiler',
    documentType: 'alquiler_temporada',
    inmuebleId: 'prop-005',
    inmueble: mockProperties[4],
    clientePrincipalId: 'cli-006',
    clientePrincipal: mockClients[5],
    estado: 'revision',
    fecha: '2026-03-05',
    updatedAt: '2026-03-10'
  },
  {
    id: 'case-004',
    referencia: 'EXP-2026-0012',
    tipo: 'reserva',
    documentType: 'reserva_compra',
    inmuebleId: 'prop-004',
    inmueble: mockProperties[3],
    clientePrincipalId: 'cli-003',
    clientePrincipal: mockClients[2],
    estado: 'completado',
    fecha: '2026-01-28',
    updatedAt: '2026-02-10'
  },
  {
    id: 'case-005',
    referencia: 'EXP-2026-0022',
    tipo: 'alquiler',
    documentType: 'alquiler_larga_duracion',
    inmuebleId: 'prop-006',
    inmueble: mockProperties[5],
    clientePrincipalId: 'cli-001',
    clientePrincipal: mockClients[0],
    estado: 'borrador',
    fecha: '2026-03-10',
    updatedAt: '2026-03-10'
  }
]

export const mockTemplates: Template[] = [
  {
    id: 'tpl-001',
    nombre: 'Contrato de Alquiler de Larga Duración',
    descripcion: 'Contrato estándar de arrendamiento de vivienda habitual conforme a la LAU.',
    tipo: 'alquiler_larga_duracion',
    estado: 'activo',
    ultimaActualizacion: '2026-02-15'
  },
  {
    id: 'tpl-002',
    nombre: 'Contrato de Alquiler de Temporada',
    descripcion: 'Contrato para arrendamientos de uso distinto a vivienda habitual.',
    tipo: 'alquiler_temporada',
    estado: 'activo',
    ultimaActualizacion: '2026-01-20'
  },
  {
    id: 'tpl-003',
    nombre: 'Contrato de Arras',
    descripcion: 'Documento de arras penitenciales para compraventa de inmuebles.',
    tipo: 'arras',
    estado: 'activo',
    ultimaActualizacion: '2026-02-01'
  },
  {
    id: 'tpl-004',
    nombre: 'Reserva de Compra de Vivienda',
    descripcion: 'Documento de reserva con señal para garantizar una operación de compraventa.',
    tipo: 'reserva_compra',
    estado: 'activo',
    ultimaActualizacion: '2025-12-10'
  }
]

export const mockTasks: Task[] = [
  {
    id: 'task-001',
    titulo: 'Recoger firma de contrato',
    descripcion: 'Contactar con Carlos Fernández para coordinar firma del contrato de alquiler.',
    expedienteRef: 'EXP-2026-0018',
    fechaLimite: '2026-03-15',
    completada: false,
    prioridad: 'alta'
  },
  {
    id: 'task-002',
    titulo: 'Verificar documentación inquilino',
    descripcion: 'Solicitar nóminas y contrato de trabajo actualizados.',
    expedienteRef: 'EXP-2026-0020',
    fechaLimite: '2026-03-12',
    completada: false,
    prioridad: 'media'
  },
  {
    id: 'task-003',
    titulo: 'Preparar escritura notaría',
    descripcion: 'Coordinar con notaría fecha para firma de escritura pública.',
    expedienteRef: 'EXP-2026-0015',
    fechaLimite: '2026-03-20',
    completada: true,
    prioridad: 'alta'
  },
  {
    id: 'task-004',
    titulo: 'Actualizar inventario piso',
    descripcion: 'Fotografiar y documentar el inventario del inmueble antes de la entrega.',
    expedienteRef: 'EXP-2026-0022',
    fechaLimite: '2026-03-18',
    completada: false,
    prioridad: 'baja'
  }
]

export const mockSettings: Settings = {
  nombreEmpresa: 'RENTALOO Gestión Inmobiliaria S.L.',
  formatoNumeracion: 'EXP-{YYYY}-{NNNN}',
  colorMarca: '#0F2C43',
  textoPieDocumento: 'Este documento ha sido generado por RENTALOO Gestión Inmobiliaria S.L. con domicilio en Rúa Real, 100, 15001 A Coruña. CIF: B-12345678.'
}

// Stats helpers
export const getStats = () => {
  const expedientesActivos = mockCases.filter(c => c.estado !== 'completado').length
  const documentosGenerados = mockCases.length
  const firmasPendientes = mockCases.filter(c => c.estado === 'pendiente_firma').length
  const operacionesEnCurso = mockCases.filter(c => c.estado === 'revision' || c.estado === 'borrador').length
  
  return {
    expedientesActivos,
    documentosGenerados,
    firmasPendientes,
    operacionesEnCurso
  }
}

// Funciones de utilidad
export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    borrador: 'Borrador',
    revision: 'En revisión',
    pendiente_firma: 'Pendiente de firma',
    completado: 'Completado'
  }
  return labels[status] || status
}

export const getOperationLabel = (type: string): string => {
  const labels: Record<string, string> = {
    alquiler: 'Alquiler',
    venta: 'Venta',
    reserva: 'Reserva',
    arras: 'Arras'
  }
  return labels[type] || type
}

export const getDocumentTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    alquiler_larga_duracion: 'Alquiler Larga Duración',
    alquiler_temporada: 'Alquiler Temporada',
    arras: 'Contrato de Arras',
    reserva_compra: 'Reserva de Compra'
  }
  return labels[type] || type
}

export const getRoleLabel = (role: string): string => {
  const labels: Record<string, string> = {
    propietario: 'Propietario',
    inquilino: 'Inquilino',
    comprador: 'Comprador',
    vendedor: 'Vendedor'
  }
  return labels[role] || role
}

export const getPropertyTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    piso: 'Piso',
    casa: 'Casa',
    local: 'Local comercial',
    oficina: 'Oficina',
    garaje: 'Garaje',
    trastero: 'Trastero'
  }
  return labels[type] || type
}

export const getPropertyStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    disponible: 'Disponible',
    alquilado: 'Alquilado',
    vendido: 'Vendido',
    reservado: 'Reservado',
    gestion: 'En gestión'
  }
  return labels[status] || status
}

export const getModalityLabel = (modality: string): string => {
  const labels: Record<string, string> = {
    venta: 'Venta',
    alquiler: 'Alquiler',
    turistico: 'Turístico',
    gestion: 'Gestión integral'
  }
  return labels[modality] || modality
}

// Generar nueva referencia
export const generateNewReference = (): string => {
  const year = new Date().getFullYear()
  const num = Math.floor(Math.random() * 9000) + 1000
  return `EXP-${year}-${num.toString().padStart(4, '0')}`
}
