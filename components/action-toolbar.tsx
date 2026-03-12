'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import {
  Save,
  FileText,
  FileDown,
  Copy,
  Send,
  Clock,
  StickyNote,
  ChevronDown
} from 'lucide-react'

export function ActionToolbar() {
  const handleAction = (action: string) => {
    const messages: Record<string, string> = {
      'guardar': 'Borrador guardado correctamente',
      'generar': 'Documento generado correctamente',
      'pdf': 'Preparando PDF para descarga...',
      'docx': 'Preparando DOCX para descarga...',
      'duplicar': 'Expediente duplicado',
      'pendiente': 'Marcado como pendiente de firma',
      'email': 'Email preparado para enviar',
      'nota': 'Nota añadida al expediente'
    }
    toast.success(messages[action] || 'Acción completada')
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleAction('guardar')}
      >
        <Save className="h-4 w-4 mr-2" />
        Guardar borrador
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            Exportar
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleAction('pdf')}>
            <FileText className="mr-2 h-4 w-4" />
            Preparar PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction('docx')}>
            <FileDown className="mr-2 h-4 w-4" />
            Preparar DOCX
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Más acciones
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleAction('duplicar')}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicar expediente
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction('pendiente')}>
            <Clock className="mr-2 h-4 w-4" />
            Marcar pendiente de firma
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleAction('email')}>
            <Send className="mr-2 h-4 w-4" />
            Enviar por email
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction('nota')}>
            <StickyNote className="mr-2 h-4 w-4" />
            Añadir nota interna
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button 
        className="bg-accent hover:bg-accent/90 text-accent-foreground ml-auto"
        onClick={() => handleAction('generar')}
      >
        <FileText className="h-4 w-4 mr-2" />
        Generar documento
      </Button>
    </div>
  )
}
