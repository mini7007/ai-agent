export async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result
      if (typeof content === 'string') {
        resolve(content)
      } else {
        reject(new Error('Failed to read file'))
      }
    }
    reader.onerror = () => reject(new Error('File read error'))
    reader.readAsText(file)
  })
}

export async function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === 'string') {
        resolve(result.split(',')[1] || '')
      } else {
        reject(new Error('Failed to read file'))
      }
    }
    reader.onerror = () => reject(new Error('File read error'))
    reader.readAsDataURL(file)
  })
}

export function validateFileType(file: File, allowedTypes: string[]) {
  const allowedExtensions = allowedTypes.map(type =>
    type.trim().toLowerCase()
  )

  const fileName = file.name.toLowerCase()

  return allowedExtensions.some(ext => fileName.endsWith(ext))
}

export function validateFileSize(file: File, maxSizeInMB: number): boolean {
  return file.size <= maxSizeInMB * 1024 * 1024
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

// Extract text from common file formats
export async function extractTextFromFile(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase() || ''

  // For text files and PDFs converted to text
  if (['txt', 'md', 'json', 'xml'].includes(extension)) {
    return await readFileAsText(file)
  }

  // For Word documents and other formats, we'd need additional processing
  // For now, we'll try to read as text
  try {
    return await readFileAsText(file)
  } catch {
    throw new Error(`Unsupported file format: ${extension}`)
  }
}
