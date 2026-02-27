export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ResumeAnalysisResult {
  strengths: string[]
  areasForImprovement: string[]
  recommendations: string[]
  overallScore: number
  summary: string
}

export interface CodeProblem {
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
}

export interface LearningRoadmap {
  title: string
  duration: string
  topics: RoadmapTopic[]
  resources: Resource[]
}

export interface RoadmapTopic {
  name: string
  duration: string
  subtopics: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface Resource {
  title: string
  type: 'tutorial' | 'article' | 'course' | 'book' | 'project'
  url?: string
  description: string
}

export interface ProjectRecommendation {
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  technologies: string[]
  estimatedDuration: string
  learningOutcomes: string[]
  resources: Resource[]
}

export interface FeatureTab {
  id: string
  label: string
  icon: React.ReactNode
  component: React.ReactNode
}
