'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { 
  FolderOpen, 
  FileText, 
  PenLine, 
  TrendingUp,
  Users,
  Building2,
  Euro,
  Calendar
} from 'lucide-react'

type IconName = 'folder' | 'file' | 'pen' | 'trending' | 'users' | 'building' | 'euro' | 'calendar'

const iconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
  folder: FolderOpen,
  file: FileText,
  pen: PenLine,
  trending: TrendingUp,
  users: Users,
  building: Building2,
  euro: Euro,
  calendar: Calendar
}

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon: IconName
  trend?: {
    value: number
    label: string
    positive?: boolean
  }
  variant?: 'default' | 'accent' | 'muted'
  className?: string
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  variant = 'default',
  className
}: StatCardProps) {
  const Icon = iconMap[icon]

  return (
    <Card className={cn(
      'relative overflow-hidden transition-all hover:shadow-md',
      variant === 'accent' && 'border-accent/30 bg-accent/5',
      className
    )}>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1 md:space-y-2">
            <p className="text-xs md:text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">{value}</p>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            {trend && (
              <p className={cn(
                'text-xs font-medium flex items-center gap-1',
                trend.positive ? 'text-accent' : 'text-destructive'
              )}>
                <span>{trend.positive ? '+' : ''}{trend.value}%</span>
                <span className="text-muted-foreground font-normal">{trend.label}</span>
              </p>
            )}
          </div>
          <div className={cn(
            'h-10 w-10 md:h-12 md:w-12 rounded-lg flex items-center justify-center shrink-0',
            variant === 'accent' 
              ? 'bg-accent text-accent-foreground' 
              : 'bg-muted text-muted-foreground'
          )}>
            <Icon className="h-5 w-5 md:h-6 md:w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
