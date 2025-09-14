'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { CloudinaryImage } from '@/components/ui/cloudinary-image'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  folder?: string
  tags?: string
  className?: string
  disabled?: boolean
  accept?: string
  maxSize?: number // in MB
}

export function ImageUpload({
  value,
  onChange,
  folder = 'omo-oni-bag',
  tags,
  className,
  disabled = false,
  accept = 'image/*',
  maxSize = 5
}: ImageUploadProps) {
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

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`)
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)
      if (tags) formData.append('tags', tags)

      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/upload/cloudinary', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Upload failed')
      }

      const result = await response.json()
      onChange(result.data.secure_url)
      toast.success('Image uploaded successfully!')
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
          <CloudinaryImage
            src={value}
            alt="Uploaded image"
            width={200}
            height={200}
            className="w-full h-48 object-cover rounded-lg border border-gray-200"
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
      ) : (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${uploading ? 'pointer-events-none' : ''}
          `}
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
            <div className="flex flex-col items-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, WebP up to {maxSize}MB
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Specialized upload component for banners
export function BannerImageUpload({
  value,
  onChange,
  type = 'hero'
}: {
  value?: string
  onChange: (url: string) => void
  type?: 'hero' | 'product' | 'announcement' | 'promotion'
}) {
  return (
    <ImageUpload
      value={value}
      onChange={onChange}
      folder={`omo-oni-bag/banners/${type}`}
      tags={`banner,${type}`}
      maxSize={10} // Banners can be larger
    />
  )
}

// Specialized upload component for products
export function ProductImageUpload({
  value,
  onChange,
  category = 'general'
}: {
  value?: string
  onChange: (url: string) => void
  category?: string
}) {
  return (
    <ImageUpload
      value={value}
      onChange={onChange}
      folder={`omo-oni-bag/products/${category}`}
      tags={`product,${category}`}
    />
  )
}
