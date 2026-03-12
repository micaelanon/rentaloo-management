'use client'

import { cn } from '@/lib/utils'

interface RentalooLogoProps {
  variant?: 'full' | 'icon'
  className?: string
  inverted?: boolean
}

export function RentalooLogo({ variant = 'full', className, inverted = false }: RentalooLogoProps) {
  // Use hex colors directly for better compatibility
  const navyColor = '#0F2C43'
  const tealColor = '#3AB598'
  
  if (variant === 'icon') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* House shape */}
          <path 
            d="M20 4L4 16V36H16V26H24V36H36V16L20 4Z" 
            fill={inverted ? '#ffffff' : navyColor}
          />
          {/* Accent roof line */}
          <path 
            d="M20 4L4 16H10L20 8L30 16H36L20 4Z" 
            fill={tealColor}
          />
        </svg>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 shrink-0"
      >
        <path 
          d="M20 4L4 16V36H16V26H24V36H36V16L20 4Z" 
          fill={inverted ? '#ffffff' : navyColor}
        />
        <path 
          d="M20 4L4 16H10L20 8L30 16H36L20 4Z" 
          fill={tealColor}
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className={cn(
          'text-lg font-bold tracking-tight',
          inverted ? 'text-white' : 'text-primary'
        )}>
          RENTALOO
        </span>
        <span className="text-[10px] font-medium tracking-wider text-accent">
          DOCS
        </span>
      </div>
    </div>
  )
}
