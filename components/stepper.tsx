'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface Step {
  id: number
  label: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  const current = steps[currentStep - 1]

  return (
    <nav aria-label="Progreso" className="w-full">
      {/* Mobile: compact indicator */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {current?.label}
          </span>
          <span className="text-xs text-muted-foreground">
            Paso {currentStep} de {steps.length}
          </span>
        </div>
        <div className="flex gap-1">
          {steps.map((step) => {
            const isCompleted = step.id < currentStep
            const isCurrent = step.id === currentStep
            const isClickable = onStepClick && (isCompleted || isCurrent)

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => isClickable && onStepClick?.(step.id)}
                disabled={!isClickable}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-all',
                  isCompleted && 'bg-accent',
                  isCurrent && 'bg-primary',
                  !isCompleted && !isCurrent && 'bg-border',
                  isClickable && 'cursor-pointer'
                )}
                aria-label={`Paso ${step.id}: ${step.label}`}
              />
            )
          })}
        </div>
        {current?.description && (
          <p className="text-xs text-muted-foreground mt-1.5">{current.description}</p>
        )}
      </div>

      {/* Desktop: full horizontal stepper */}
      <ol className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep
          const isCurrent = step.id === currentStep
          const isClickable = onStepClick && (isCompleted || isCurrent)

          return (
            <li 
              key={step.id} 
              className={cn(
                'flex items-center flex-1',
                index !== steps.length - 1 && 'after:content-[""] after:flex-1 after:h-0.5 after:mx-4',
                index !== steps.length - 1 && (isCompleted ? 'after:bg-accent' : 'after:bg-border')
              )}
            >
              <button
                type="button"
                onClick={() => isClickable && onStepClick?.(step.id)}
                disabled={!isClickable}
                className={cn(
                  'flex flex-col items-center gap-2 group',
                  isClickable && 'cursor-pointer',
                  !isClickable && 'cursor-default'
                )}
              >
                <span 
                  className={cn(
                    'flex items-center justify-center h-10 w-10 rounded-full text-sm font-semibold transition-all border-2',
                    isCompleted && 'bg-accent border-accent text-accent-foreground',
                    isCurrent && 'bg-primary border-primary text-primary-foreground',
                    !isCompleted && !isCurrent && 'bg-background border-border text-muted-foreground',
                    isClickable && 'group-hover:ring-4 group-hover:ring-accent/20'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </span>
                <div className="flex flex-col items-center">
                  <span className={cn(
                    'text-xs font-medium whitespace-nowrap',
                    isCurrent ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    {step.label}
                  </span>
                  {step.description && (
                    <span className="text-[10px] text-muted-foreground hidden lg:block">
                      {step.description}
                    </span>
                  )}
                </div>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
