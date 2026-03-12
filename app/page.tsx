'use client'

import { AppShell } from '@/components/app-shell'
import { StatCard } from '@/components/stat-card'
import { QuickActions } from '@/components/quick-actions'
import { RecentCases } from '@/components/recent-cases'
import { TaskList } from '@/components/task-list'
import { getStats } from '@/data/mock-data'

export default function DashboardPage() {
  const stats = getStats()

  return (
    <AppShell>
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Resumen de tu actividad y accesos directos.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Expedientes activos"
          value={stats.expedientesActivos}
          icon="folder"
          variant="accent"
        />
        <StatCard
          title="Documentos generados"
          value={stats.documentosGenerados}
          icon="file"
        />
        <StatCard
          title="Firmas pendientes"
          value={stats.firmasPendientes}
          icon="pen"
        />
        <StatCard
          title="En curso"
          value={stats.operacionesEnCurso}
          icon="trending"
        />
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <RecentCases />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <TaskList />
        </div>
      </div>
    </AppShell>
  )
}
