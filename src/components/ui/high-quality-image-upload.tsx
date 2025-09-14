'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface HighQualityImageUploadProps {
  value?: string
  onChange: (url: string) => void
  className?: string
  disabled?: boolean
  accept?: string
  maxSize?: number // in MB
  aspectRatio?: string
}

export function HighQualityImageUpload({
  value,
  onChange,
  className,
  disabled = false,
  accept = 'image/*',
  maxSize = 20, // Higher limit for high quality
  aspectRatio = '16/9'
}: HighQualityImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (higher limit for high quality)
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`)
      return
    }

    setUploading(true)

    try {
      // Create a direct URL from the file (bypass Cloudinary)
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        console.log('High-quality direct upload result:', result)
        onChange(result)
        toast.success('High-quality image uploaded successfully!')
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    if (disabled) return

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleRemove = () => {
    onChange('')
  }

  const handleClick = () => {
    if (!disabled && !uploading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className={className}>
      {value ? (
        <div className="relative group">
          <div 
            className="relative overflow-hidden rounded-lg border border-gold/20"
            style={{ aspectRatio }}
          >
            <img
              src={value}
              alt="High quality image"
              className="w-full h-full object-cover"
            />
            {!disabled && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleRemove}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          <p className="text-xs text-ink/60 mt-2">
            High-quality image • Click to replace
          </p>
        </div>
      ) : (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${dragOver ? 'border-gold bg-gold/5' : 'border-gold/30 hover:border-gold/50'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${uploading ? 'pointer-events-none' : ''}
          `}
          style={{ aspectRatio }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileInputChange}
            className="hidden"
            disabled={disabled || uploading}
          />
          
          {uploading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-gold mb-2" />
              <p className="text-sm text-ink/60">Uploading high-quality image...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-gold" />
              </div>
              <p className="text-sm text-ink/60 mb-2 font-medium">
                Upload High-Quality Image
              </p>
              <p className="text-xs text-ink/50">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-ink/40 mt-1">
                PNG, JPG, WebP up to {maxSize}MB • Lossless quality
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Specialized component for hero images
export function HeroImageUpload({
  value,
  onChange
}: {
  value?: string
  onChange: (url: string) => void
}) {
  return (
    <HighQualityImageUpload
      value={value}
      onChange={onChange}
      aspectRatio="16/9"
      maxSize={25} // Even higher for hero images
    />
  )
}

// Specialized component for product showcase images
export function ProductShowcaseImageUpload({
  value,
  onChange
}: {
  value?: string
  onChange: (url: string) => void
}) {
  return (
    <HighQualityImageUpload
      value={value}
      onChange={onChange}
      aspectRatio="4/3"
      maxSize={20}
    />
  )
}
