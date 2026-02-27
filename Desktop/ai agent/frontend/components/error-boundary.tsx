'use client'

import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, RotateCw } from 'lucide-react'
import { GlassButton } from './glass-card'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, retry: () => void) => ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error('[v0] Error caught by boundary:', error)
  }

  retry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.retry)
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-lg p-6 m-4 border border-destructive/50"
        >
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-destructive mb-2">Something went wrong</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {this.state.error.message || 'An unexpected error occurred'}
              </p>
              <GlassButton
                size="sm"
                variant="outline"
                onClick={this.retry}
                className="flex items-center gap-2"
              >
                <RotateCw className="w-4 h-4" />
                Try again
              </GlassButton>
            </div>
          </div>
        </motion.div>
      )
    }

    return this.props.children
  }
}
