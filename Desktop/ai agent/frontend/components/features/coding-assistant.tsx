'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, RotateCcw } from 'lucide-react'
import { GlassCard, GlassButton } from '../glass-card'
import { ChatContainer } from '../chat-message'
import { CodeBlock } from '../code-block'
import { LoadingState } from '../loading-state'
import {
  generateCodingHint,
  generateSolution,
  chatWithAssistant,
} from '@/lib/ai-service'
import type { Message } from '@/types'

export function CodingAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content:
        'Hello! I\'m your coding assistant. You can ask me coding questions, get hints for problems, or request solutions. What would you like help with?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Check for special commands
      let response = ''

      if (content.toLowerCase().startsWith('/hint')) {
        const problem = content.substring(6).trim()
        response = await generateCodingHint(problem)
      } else if (content.toLowerCase().startsWith('/solution')) {
        const problem = content.substring(9).trim()
        response = await generateSolution(problem, selectedLanguage)
      } else {
        response = await chatWithAssistant([
          ...messages,
          userMessage,
        ])
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setMessages([
      {
        id: '0',
        role: 'assistant',
        content:
          'Hello! I\'m your coding assistant. You can ask me coding questions, get hints for problems, or request solutions. What would you like help with?',
        timestamp: new Date(),
      },
    ])
    setInput('')
  }

  return (
    <div className="space-y-4 flex flex-col h-[600px]">
      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pr-4 no-scrollbar"
      >
        <ChatContainer messages={messages} />
        {isLoading && <LoadingState text="Thinking..." />}
      </div>

      {/* Language Selector */}
      <div className="glass rounded-lg p-3">
        <label className="text-sm text-muted-foreground mb-2 block">
          Programming Language
        </label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-sm text-foreground"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="rust">Rust</option>
        </select>
      </div>

      {/* Commands Info */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>
          <strong>/hint [problem]</strong> - Get a hint
        </p>
        <p>
          <strong>/solution [problem]</strong> - Get complete solution
        </p>
      </div>

      {/* Input Area */}
      <div className="glass rounded-lg p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSendMessage(input)
            }
          }}
          placeholder="Ask a coding question..."
          className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none"
          disabled={isLoading}
        />
        <GlassButton
          onClick={() => handleSendMessage(input)}
          disabled={isLoading || !input.trim()}
          size="sm"
        >
          <Send className="w-4 h-4" />
        </GlassButton>
        <GlassButton
          onClick={handleReset}
          variant="outline"
          size="sm"
        >
          <RotateCcw className="w-4 h-4" />
        </GlassButton>
      </div>
    </div>
  )
}
