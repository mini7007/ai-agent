'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning'
  animated?: boolean
}

export function Badge({
  children,
  variant = 'primary',
  animated = false,
  className,
  ...props
}: BadgeProps) {
  const variantClasses = {
    primary: 'bg-primary/20 text-primary border border-primary/30',
    secondary: 'bg-secondary/20 text-secondary border border-secondary/30',
    accent: 'bg-accent/20 text-accent border border-accent/30',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  }

  const Component = animated ? motion.div : 'div'

  return (
    <Component
      className={cn(
        'inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium',
        variantClasses[variant],
        className,
      )}
      {...(animated && {
        animate: { scale: [1, 1.02, 1] },
        transition: { duration: 2, repeat: Infinity },
      })}
      {...props}
    >
      {children}
    </Component>
  )
}
