'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, TrendingUp, CheckCircle } from 'lucide-react'
import { GlassCard, GlassButton } from '../glass-card'
import { FileUpload } from '../file-upload'
import { LoadingState } from '../loading-state'
import { analyzeResume } from '@/lib/ai-service'
import { extractTextFromFile } from '@/lib/file-utils'
import type { ResumeAnalysisResult } from '@/types'

export function ResumeAnalyzer() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ResumeAnalysisResult | null>(null)
  const [error, setError] = useState<string>('')

  const handleFileSelect = async (file: File) => {
    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const content = await extractTextFromFile(file)
      const analysis = await analyzeResume(content)
      setResult(analysis)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to analyze resume'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
        <p className="text-muted-foreground text-sm">
          Get AI-powered feedback on your resume to improve your career prospects.
        </p>
      </div>

      <FileUpload
        onFileSelect={handleFileSelect}
        accept=".pdf,.doc,.docx,.txt"
        label="Upload Resume"
      />

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-lg p-4 border border-destructive/50 bg-destructive/10"
        >
          <p className="text-sm text-destructive">{error}</p>
        </motion.div>
      )}

      {isLoading && <LoadingState text="Analyzing your resume..." />}

      {result && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Overall Score */}
          <GlassCard>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">Overall Score</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {result.summary}
                  </p>
                </div>
                <div className="text-4xl font-bold text-primary">
                  {result.overallScore.toFixed(1)}/10
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${result.overallScore * 10}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </GlassCard>

          {/* Strengths */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-accent" />
              <h4 className="font-semibold">Your Strengths</h4>
            </div>
            <div className="space-y-2">
              {result.strengths.map((strength, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-lg p-3"
                >
                  <p className="text-sm text-foreground">{strength}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <h4 className="font-semibold">Areas to Improve</h4>
            </div>
            <div className="space-y-2">
              {result.areasForImprovement.map((area, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-lg p-3 border border-secondary/30"
                >
                  <p className="text-sm text-foreground">{area}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h4 className="font-semibold">Recommendations</h4>
            </div>
            <div className="space-y-2">
              {result.recommendations.map((rec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-lg p-3 border border-primary/30"
                >
                  <div className="flex gap-3">
                    <div className="text-primary font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm text-foreground">{rec}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <GlassButton
            onClick={() => setResult(null)}
            variant="outline"
            className="w-full"
          >
            Analyze Another Resume
          </GlassButton>
        </motion.div>
      )}
    </div>
  )
}
