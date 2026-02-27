'use server'

import OpenAI from 'openai'
import type {
  ResumeAnalysisResult,
  LearningRoadmap,
  ProjectRecommendation,
} from '@/types'

const apiKey = process.env.OPENAI_API_KEY
let client: OpenAI | null = null

if (apiKey) {
  client = new OpenAI({ apiKey })
}

// Fallback mock data for when OpenAI is not configured
const mockResumeAnalysis: ResumeAnalysisResult = {
  strengths: [
    'Strong technical foundation with 5+ years of experience',
    'Demonstrated leadership in cross-functional teams',
    'Excellent problem-solving and communication skills',
  ],
  areasForImprovement: [
    'Limited cloud architecture experience',
    'Could showcase more open-source contributions',
    'Need stronger metrics and impact quantification',
  ],
  recommendations: [
    'Add AWS or GCP certifications to strengthen cloud skills',
    'Contribute to popular open-source projects',
    'Quantify impact with specific metrics and percentages',
    'Include more technical achievements and innovations',
  ],
  overallScore: 7.8,
  summary:
    'Your resume demonstrates solid technical expertise and leadership potential. Focus on quantifying your impact and expanding your cloud architecture knowledge.',
}

const mockRoadmap: LearningRoadmap = {
  title: 'Full Stack Development Mastery',
  duration: '6-9 months',
  topics: [
    {
      name: 'Advanced JavaScript & TypeScript',
      duration: '2 weeks',
      subtopics: ['Advanced patterns', 'Type system mastery', 'Performance optimization'],
      difficulty: 'intermediate',
    },
    {
      name: 'React & Next.js Deep Dive',
      duration: '3 weeks',
      subtopics: ['Server components', 'API routes', 'Deployment strategies'],
      difficulty: 'intermediate',
    },
    {
      name: 'Database Design & Optimization',
      duration: '2 weeks',
      subtopics: ['SQL advanced queries', 'Indexing', 'Query optimization'],
      difficulty: 'advanced',
    },
    {
      name: 'System Design & Architecture',
      duration: '4 weeks',
      subtopics: ['Scalability', 'Microservices', 'Distributed systems'],
      difficulty: 'advanced',
    },
  ],
  resources: [
    {
      title: 'Advanced JavaScript Course',
      type: 'course',
      description: 'Deep dive into advanced JavaScript concepts',
    },
    {
      title: 'System Design Interview',
      type: 'book',
      description: 'Comprehensive guide to system design',
    },
  ],
}

const mockProjectRecommendation: ProjectRecommendation = {
  title: 'Real-time Collaborative Code Editor',
  description:
    'Build a web-based code editor with real-time collaboration features, similar to Google Docs but for code.',
  difficulty: 'advanced',
  technologies: ['Next.js', 'WebSockets', 'TypeScript', 'Tailwind CSS', 'Prisma'],
  estimatedDuration: '4-6 weeks',
  learningOutcomes: [
    'Real-time synchronization with WebSockets',
    'Complex state management',
    'Database design for concurrent editing',
    'Performance optimization at scale',
  ],
  resources: [
    {
      title: 'WebSocket Programming Guide',
      type: 'tutorial',
      description: 'Learn WebSocket fundamentals',
    },
    {
      title: 'CRDT Algorithm Explained',
      type: 'article',
      description: 'Understanding Conflict-free Replicated Data Types',
    },
  ],
}

export async function analyzeResume(fileContent: string): Promise<ResumeAnalysisResult> {
  if (!client) {
    return mockResumeAnalysis
  }

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are an expert career coach and resume reviewer. Analyze the provided resume and give constructive feedback.
          
          Respond with a JSON object containing:
          - strengths: array of 3-4 key strengths
          - areasForImprovement: array of 3-4 areas to improve
          - recommendations: array of 4-5 actionable recommendations
          - overallScore: number between 0-10
          - summary: brief 1-2 sentence summary`,
        },
        {
          role: 'user',
          content: `Please analyze this resume:\n\n${fileContent}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const content = response.choices[0].message.content
    if (!content) return mockResumeAnalysis

    const parsed = JSON.parse(content)
    return {
      strengths: parsed.strengths || mockResumeAnalysis.strengths,
      areasForImprovement: parsed.areasForImprovement || mockResumeAnalysis.areasForImprovement,
      recommendations: parsed.recommendations || mockResumeAnalysis.recommendations,
      overallScore: parsed.overallScore || 7.5,
      summary: parsed.summary || mockResumeAnalysis.summary,
    }
  } catch (error) {
    console.error('Error analyzing resume:', error)
    return mockResumeAnalysis
  }
}

export async function generateCodingHint(
  problem: string,
  userAttempt?: string,
): Promise<string> {
  if (!client) {
    return 'Try breaking down the problem into smaller steps. Consider what data structures might be useful. Think about edge cases.'
  }

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are an expert coding mentor. Provide helpful hints to guide the user toward solving the problem, but don't give away the complete solution.
          Keep responses concise (2-3 sentences) and focus on the next logical step.`,
        },
        {
          role: 'user',
          content: userAttempt
            ? `Problem: ${problem}\n\nMy attempt:\n${userAttempt}\n\nWhat should I try next?`
            : `I'm stuck on this problem: ${problem}\n\nCan you give me a hint?`,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    })

    return response.choices[0].message.content || 'Try a different approach!'
  } catch (error) {
    console.error('Error generating hint:', error)
    return 'Try a different approach!'
  }
}

export async function generateSolution(problem: string, language: string): Promise<string> {
  if (!client) {
    return `// Solution for: ${problem}
// This is a mock solution

function solve(input) {
  // Implement your solution here
  return result
}`
  }

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are an expert programmer. Provide a clean, well-commented solution in ${language}.
          Include time and space complexity analysis as comments.`,
        },
        {
          role: 'user',
          content: `Solve this problem in ${language}:\n\n${problem}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    return response.choices[0].message.content || 'Unable to generate solution'
  } catch (error) {
    console.error('Error generating solution:', error)
    return 'Unable to generate solution'
  }
}

export async function generateLearningRoadmap(topic: string): Promise<LearningRoadmap> {
  if (!client) {
    return { ...mockRoadmap, title: `Mastering ${topic}` }
  }

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are an expert learning path designer. Create a comprehensive learning roadmap.
          
          Respond with a JSON object containing:
          - title: string
          - duration: string (e.g., "3-6 months")
          - topics: array of objects with {name, duration, subtopics[], difficulty}
          - resources: array of objects with {title, type, description}`,
        },
        {
          role: 'user',
          content: `Create a detailed learning roadmap for: ${topic}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const content = response.choices[0].message.content
    if (!content) return mockRoadmap

    const parsed = JSON.parse(content)
    return {
      title: parsed.title || `Mastering ${topic}`,
      duration: parsed.duration || '6-9 months',
      topics: parsed.topics || mockRoadmap.topics,
      resources: parsed.resources || mockRoadmap.resources,
    }
  } catch (error) {
    console.error('Error generating roadmap:', error)
    return mockRoadmap
  }
}

export async function recommendProjects(
  skills: string,
  level: 'beginner' | 'intermediate' | 'advanced',
): Promise<ProjectRecommendation[]> {
  if (!client) {
    return [mockProjectRecommendation]
  }

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are a project recommender. Based on the user's skills and level, recommend relevant projects.
          
          Respond with a JSON array of objects containing:
          - title: string
          - description: string
          - difficulty: 'beginner' | 'intermediate' | 'advanced'
          - technologies: string[]
          - estimatedDuration: string
          - learningOutcomes: string[]
          - resources: array of {title, type, description}`,
        },
        {
          role: 'user',
          content: `I have these skills: ${skills} and I'm at ${level} level. What projects should I build?`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const content = response.choices[0].message.content
    if (!content) return [mockProjectRecommendation]

    const parsed = JSON.parse(content)
    return Array.isArray(parsed) ? parsed : [parsed]
  } catch (error) {
    console.error('Error recommending projects:', error)
    return [mockProjectRecommendation]
  }
}

export async function chatWithAssistant(messages: Array<{
  role: 'user' | 'assistant'
  content: string
}>): Promise<string> {
  if (!client) {
    return "I'm a mock AI assistant. In a real implementation, I would provide detailed responses based on your questions about coding, career development, and learning paths."
  }

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: messages as Parameters<typeof client.chat.completions.create>[0]['messages'],
      temperature: 0.7,
      max_tokens: 1000,
    })

    return response.choices[0].message.content || 'Unable to generate response'
  } catch (error) {
    console.error('Error in chat:', error)
    return 'Unable to generate response'
  }
}
