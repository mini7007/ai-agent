'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export function CodeBlock({ code, language = 'javascript', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="glass rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between bg-card/50 px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          {title && (
            <span className="text-sm text-muted-foreground ml-4">{title}</span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">{language}</span>
      </div>
      <div className="relative">
        <pre className="px-4 py-4 overflow-x-auto text-sm text-foreground">
          <code>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded bg-white/10 hover:bg-white/20 transition-colors"
          title="Copy code"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-accent" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>
    </motion.div>
  )
}

export function CodeBlockWithTabs({
  blocks,
}: {
  blocks: Array<{ title: string; code: string; language?: string }>
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="space-y-2">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {blocks.map((block, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              i === activeIndex
                ? 'bg-primary text-primary-foreground'
                : 'bg-white/5 text-muted-foreground hover:bg-white/10'
            }`}
          >
            {block.title}
          </button>
        ))}
      </div>
      <CodeBlock
        code={blocks[activeIndex].code}
        language={blocks[activeIndex].language}
        title={blocks[activeIndex].title}
      />
    </div>
  )
}
