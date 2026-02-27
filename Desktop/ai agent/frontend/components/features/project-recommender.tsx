'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Target, BookOpen } from 'lucide-react'
import { GlassCard, GlassButton } from '../glass-card'
import { LoadingState } from '../loading-state'
import { recommendProjects } from '@/lib/ai-service'
import type { ProjectRecommendation } from '@/types'

export function ProjectRecommender() {
  const [skills, setSkills] = useState('')
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>(
    'intermediate'
  )
  const [projects, setProjects] = useState<ProjectRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const handleRecommend = async () => {
    if (!skills.trim()) return

    setIsLoading(true)
    try {
      const result = await recommendProjects(skills, level)
      setProjects(result)
      setSelectedProject(null)
    } catch (error) {
      console.error('Error recommending projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Get Project Recommendations</h3>
        <p className="text-muted-foreground text-sm">
          Find the perfect projects to level up your skills based on your abilities.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="space-y-4">
          <GlassCard>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Your Skills
                </label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g., React, Node.js, Python, AWS"
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate multiple skills with commas
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Your Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['beginner', 'intermediate', 'advanced'] as const).map(
                    (lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setLevel(lvl)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          level === lvl
                            ? 'bg-primary text-primary-foreground'
                            : 'glass hover:bg-white/20'
                        }`}
                      >
                        {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                      </button>
                    )
                  )}
                </div>
              </div>

              <GlassButton
                onClick={handleRecommend}
                disabled={isLoading || !skills.trim()}
                className="w-full"
              >
                {isLoading ? 'Finding projects...' : 'Get Recommendations'}
              </GlassButton>
            </div>
          </GlassCard>

          {isLoading && <LoadingState text="Finding perfect projects..." />}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Projects Grid */}
          <div className="grid gap-4">
            {projects.map((project, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() =>
                  setSelectedProject(selectedProject === i ? null : i)
                }
                className="text-left"
              >
                <GlassCard className="hover:scale-105 transition-transform">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-lg">
                          {project.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {project.description}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ml-4 ${
                          project.difficulty === 'beginner'
                            ? 'bg-green-500/20 text-green-300'
                            : project.difficulty === 'intermediate'
                              ? 'bg-yellow-500/20 text-yellow-300'
                              : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {project.difficulty.charAt(0).toUpperCase() +
                          project.difficulty.slice(1)}
                      </span>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, j) => (
                        <span
                          key={j}
                          className="text-xs bg-primary/20 text-primary px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="w-4 h-4" />
                      {project.estimatedDuration}
                    </div>
                  </div>
                </GlassCard>
              </motion.button>
            ))}
          </div>

          {/* Expanded Project Details */}
          {selectedProject !== null && projects[selectedProject] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <GlassCard>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-primary">
                    Learning Outcomes
                  </h4>
                  <div className="space-y-2">
                    {projects[selectedProject].learningOutcomes.map((outcome, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-3"
                      >
                        <Zap className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{outcome}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {projects[selectedProject].resources.length > 0 && (
                <GlassCard>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-accent" />
                      <h4 className="font-semibold">Resources</h4>
                    </div>
                    <div className="space-y-2">
                      {projects[selectedProject].resources.map((resource, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-3 bg-background/50 rounded border border-border"
                        >
                          <p className="font-medium text-sm text-foreground">
                            {resource.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {resource.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              )}
            </motion.div>
          )}

          <GlassButton
            onClick={() => {
              setProjects([])
              setSkills('')
              setSelectedProject(null)
            }}
            variant="outline"
            className="w-full"
          >
            Get Other Recommendations
          </GlassButton>
        </motion.div>
      )}
    </div>
  )
}
