'use client'

import React, { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatFileSize, validateFileType, validateFileSize } from '@/lib/file-utils'
import { GlassButton } from './glass-card'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSizeMB?: number
  label?: string
  multiple?: boolean
}

export function FileUpload({
  onFileSelect,
  accept = '.pdf,.doc,.docx,.txt',
  maxSizeMB = 10,
  label = 'Upload File',
  multiple = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFile = (file: File) => {
    setError('')

    // Validate file type
    const acceptTypes = accept.split(',').map((t) => t.trim())
    if (!validateFileType(file, acceptTypes)) {
      setError(`Invalid file type. Accepted types: ${accept}`)
      return
    }

    // Validate file size
    if (!validateFileSize(file, maxSizeMB)) {
      setError(`File size exceeds ${maxSizeMB}MB limit`)
      return
    }

    setSelectedFile(file)
    onFileSelect(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    setSelectedFile(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3">
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`glass rounded-lg p-6 border-2 border-dashed transition-all cursor-pointer ${
          isDragging
            ? 'border-primary bg-primary/10'
            : 'border-border/50 hover:border-primary/50'
        }`}
        animate={{
          backgroundColor: isDragging ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0)',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleChange}
          accept={accept}
          className="hidden"
          aria-label="File input"
        />

        <div
          className="flex flex-col items-center justify-center gap-3"
          onClick={handleClick}
        >
          <Upload className="w-6 h-6 text-muted-foreground" />
          <div className="text-center">
            <p className="font-medium text-foreground">{label}</p>
            <p className="text-sm text-muted-foreground">
              or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Max size: {maxSizeMB}MB
            </p>
          </div>
          <GlassButton size="sm" variant="outline" type="button">
            Browse Files
          </GlassButton>
        </div>
      </motion.div>

      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{selectedFile.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatFileSize(selectedFile.size)}
            </p>
          </div>
          <button
            onClick={handleRemove}
            className="ml-4 p-1.5 hover:bg-destructive/20 rounded transition-colors"
            aria-label="Remove file"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-lg p-3 border border-destructive/50 bg-destructive/10"
        >
          <p className="text-sm text-destructive">{error}</p>
        </motion.div>
      )}
    </div>
  )
}
