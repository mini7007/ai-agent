'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number
  max?: number
  label?: string
  showLabel?: boolean
  animated?: boolean
  className?: string
}

export function Progress({
  value,
  max = 100,
  label,
  showLabel = true,
  animated = true,
  className,
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={cn('w-full', className)}>
      {showLabel && label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-xs text-muted-foreground">
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      <div className="w-full h-2 rounded-full glass overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={animated ? { duration: 0.8, ease: 'easeOut' } : { duration: 0 }}
        />
      </div>
    </div>
  )
}

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
  className?: string
}

export function StepIndicator({
  steps,
  currentStep,
  className,
}: StepIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <motion.div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all',
              index < currentStep
                ? 'bg-primary text-primary-foreground'
                : index === currentStep
                  ? 'glass border border-primary'
                  : 'glass border border-muted'
            )}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {index < currentStep ? '✓' : index + 1}
          </motion.div>

          {index < steps.length - 1 && (
            <motion.div
              className={cn(
                'flex-1 h-0.5',
                index < currentStep ? 'bg-primary' : 'bg-muted'
              )}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
              style={{ originX: 0 }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
