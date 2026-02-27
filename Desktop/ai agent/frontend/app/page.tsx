'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Code, BookOpen, Lightbulb, Menu, X } from 'lucide-react'
import { GlassCard, GlassButton } from '@/components/glass-card'
import { FeatureTabs } from '@/components/feature-tabs'
import { ResumeAnalyzer } from '@/components/features/resume-analyzer'
import { CodingAssistant } from '@/components/features/coding-assistant'
import { LearningRoadmapComponent } from '@/components/features/learning-roadmap'
import { ProjectRecommender } from '@/components/features/project-recommender'
import type { FeatureTab } from '@/types'

export default function Page() {
  const [activeTab, setActiveTab] = useState('resume')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features: FeatureTab[] = [
    {
      id: 'resume',
      label: 'Resume Analyzer',
      icon: <FileText className="w-5 h-5" />,
      component: <ResumeAnalyzer />,
    },
    {
      id: 'coding',
      label: 'Coding Assistant',
      icon: <Code className="w-5 h-5" />,
      component: <CodingAssistant />,
    },
    {
      id: 'roadmap',
      label: 'Learning Roadmap',
      icon: <BookOpen className="w-5 h-5" />,
      component: <LearningRoadmapComponent />,
    },
    {
      id: 'projects',
      label: 'Project Finder',
      icon: <Lightbulb className="w-5 h-5" />,
      component: <ProjectRecommender />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/50 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary" />
              <h1 className="text-xl font-bold gradient-text hidden sm:block">
                Prime Route
              </h1>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === feature.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {feature.icon}
                  <span className="hidden lg:inline">{feature.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 space-y-2"
            >
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => {
                    setActiveTab(feature.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === feature.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {feature.icon}
                  {feature.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-16 text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block mb-4 px-4 py-2 rounded-full glass border border-primary/30"
            >
              <span className="text-sm font-medium gradient-text">AI-Powered Career Advancement</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance"
            >
              Your AI-Powered <span className="gradient-text">Career Copilot</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance"
            >
              Elevate your career with AI-driven insights. Analyze resumes, solve coding
              problems, generate learning roadmaps, and discover projects tailored to your goals.
            </motion.p>
          </motion.section>

          {/* Feature Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-4 mb-16"
          >
            {features.map((feature, i) => (
              <motion.button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
                className="text-left"
              >
                <GlassCard className="h-full hover:scale-105 transition-transform">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-foreground">{feature.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.id === 'resume' &&
                        'Get AI-powered feedback on your resume to stand out'}
                      {feature.id === 'coding' &&
                        'Get hints, solutions, and guidance on coding problems'}
                      {feature.id === 'roadmap' &&
                        'Create personalized learning paths for any skill'}
                      {feature.id === 'projects' &&
                        'Discover projects that match your skill level'}
                    </p>
                  </div>
                </GlassCard>
              </motion.button>
            ))}
          </motion.div>

          {/* Active Feature Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-lg p-6 lg:p-8 mb-16"
          >
            <FeatureTabs tabs={features} defaultTabId={activeTab} />
          </motion.div>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <GlassCard className="max-w-2xl mx-auto">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  Ready to Transform Your Career?
                </h3>
                <p className="text-muted-foreground">
                  Start using Prime Route today and unlock your full potential with AI-powered
                  career guidance.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <GlassButton size="lg" variant="primary">
                    Get Started Now
                  </GlassButton>
                  <GlassButton size="lg" variant="outline">
                    Learn More
                  </GlassButton>
                </div>
              </div>
            </GlassCard>
          </motion.section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 backdrop-blur-xl bg-background/50 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-secondary" />
              <span className="font-semibold">Prime Route</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by AI for your career success
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
