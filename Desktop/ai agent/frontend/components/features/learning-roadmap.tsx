'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, ChevronDown } from 'lucide-react'
import { GlassCard, GlassButton } from '../glass-card'
import { LoadingState } from '../loading-state'
import { generateLearningRoadmap } from '@/lib/ai-service'
import type { LearningRoadmap } from '@/types'

export function LearningRoadmapComponent() {
  const [topic, setTopic] = useState('')
  const [roadmap, setRoadmap] = useState<LearningRoadmap | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set())

  const handleGenerate = async () => {
    if (!topic.trim()) return

    setIsLoading(true)
    try {
      const result = await generateLearningRoadmap(topic)
      setRoadmap(result)
      setExpandedTopics(new Set([0]))
    } catch (error) {
      console.error('Error generating roadmap:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTopic = (index: number) => {
    const newExpanded = new Set(expandedTopics)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedTopics(newExpanded)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Generate Learning Roadmap</h3>
        <p className="text-muted-foreground text-sm">
          Create a personalized learning path for any skill or technology.
        </p>
      </div>

      {!roadmap ? (
        <div className="space-y-4">
          <GlassCard>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  What do you want to learn?
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleGenerate()
                  }}
                  placeholder="e.g., Machine Learning, Web Development, Mobile Apps"
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <GlassButton
                onClick={handleGenerate}
                disabled={isLoading || !topic.trim()}
                className="w-full"
              >
                {isLoading ? 'Generating...' : 'Generate Roadmap'}
              </GlassButton>
            </div>
          </GlassCard>

          {isLoading && <LoadingState text="Creating your learning roadmap..." />}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <GlassCard>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-primary">{roadmap.title}</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Estimated duration: {roadmap.duration}</span>
              </div>
            </div>
          </GlassCard>

          {/* Topics */}
          <div className="space-y-3">
            {roadmap.topics.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <button
                  onClick={() => toggleTopic(i)}
                  className="w-full glass rounded-lg p-4 flex items-center justify-between hover:bg-white/20 transition-all"
                >
                  <div className="flex items-center gap-3 flex-1 text-left">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground">{topic.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Duration: {topic.duration} • Difficulty:{' '}
                        <span className="capitalize">{topic.difficulty}</span>
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${
                      expandedTopics.has(i) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expanded Content */}
                {expandedTopics.has(i) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 ml-8 space-y-2"
                  >
                    {topic.subtopics.map((subtopic, j) => (
                      <div
                        key={j}
                        className="glass rounded-lg p-3 text-sm text-foreground"
                      >
                        • {subtopic}
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Resources */}
          {roadmap.resources.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                <h4 className="font-semibold">Recommended Resources</h4>
              </div>
              <div className="space-y-2">
                {roadmap.resources.map((resource, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">
                          {resource.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {resource.description}
                        </p>
                      </div>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded ml-2 whitespace-nowrap">
                        {resource.type}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <GlassButton
            onClick={() => {
              setRoadmap(null)
              setTopic('')
            }}
            variant="outline"
            className="w-full"
          >
            Create Another Roadmap
          </GlassButton>
        </motion.div>
      )}
    </div>
  )
}
