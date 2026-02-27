'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { Message } from '@/types'

interface ChatMessageProps {
  message: Message
  index: number
}

export function ChatMessage({ message, index }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground'
        }`}
      >
        {isUser ? 'You' : 'AI'}
      </div>
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg ${
          isUser ? 'flex justify-end' : 'flex justify-start'
        }`}
      >
        <div
          className={`rounded-lg px-4 py-2.5 ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-none'
              : 'glass rounded-bl-none'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
          <span className="text-xs opacity-70 mt-1 block">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function ChatContainer({
  messages,
}: {
  messages: Message[]
}) {
  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No messages yet. Start a conversation!</p>
        </div>
      ) : (
        messages.map((msg, idx) => (
          <ChatMessage key={msg.id} message={msg} index={idx} />
        ))
      )}
    </div>
  )
}
