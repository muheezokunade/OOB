'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { getOptimizedImageUrl } from '@/lib/cloudinary'

interface CloudinaryImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: string | number
  crop?: string
  gravity?: string
  effect?: string
  radius?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  fill?: boolean
  style?: React.CSSProperties
  onClick?: () => void
}

export function CloudinaryImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 'auto',
  crop = 'fill',
  gravity = 'auto',
  effect,
  radius,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  style,
  onClick
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Check if the image is already a Cloudinary URL
  const isCloudinaryUrl = src.includes('cloudinary.com')
  
  // If it's not a Cloudinary URL, use it as is (for local images)
  const imageSrc = isCloudinaryUrl 
    ? getOptimizedImageUrl(src, {
        width: fill ? undefined : width,
        height: fill ? undefined : height,
        quality,
        crop,
        gravity,
        effect,
        radius: radius ? `${radius}px` : undefined
      })
    : src

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-gray-100 text-gray-400",
          className
        )}
        style={fill ? { width: '100%', height: '100%' } : { width, height }}
      >
        <span className="text-sm">Failed to load image</span>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center"
          style={fill ? { width: '100%', height: '100%' } : { width, height }}
        >
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
      )}
      
      <Image
        src={imageSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes}
        style={style}
        onClick={onClick}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}

// Preset components for common use cases
export function BannerImage({ src, alt, type = 'hero', ...props }: CloudinaryImageProps & { type?: 'hero' | 'product' | 'announcement' | 'promotion' }) {
  const transformations = {
    hero: { width: 800, height: 1000, crop: 'fill', gravity: 'auto' },
    product: { width: 600, height: 600, crop: 'fill', gravity: 'auto' },
    announcement: { width: 1200, height: 400, crop: 'fill', gravity: 'auto' },
    promotion: { width: 1000, height: 500, crop: 'fill', gravity: 'auto' }
  }

  return (
    <CloudinaryImage
      src={src}
      alt={alt}
      {...transformations[type]}
      {...props}
    />
  )
}

export function ProductImage({ src, alt, size = 'medium', ...props }: CloudinaryImageProps & { size?: 'thumbnail' | 'medium' | 'large' | 'zoom' }) {
  const transformations = {
    thumbnail: { width: 200, height: 200, crop: 'fill', gravity: 'auto' },
    medium: { width: 400, height: 400, crop: 'fill', gravity: 'auto' },
    large: { width: 800, height: 800, crop: 'fill', gravity: 'auto' },
    zoom: { width: 1200, height: 1200, crop: 'fill', gravity: 'auto' }
  }

  return (
    <CloudinaryImage
      src={src}
      alt={alt}
      {...transformations[size]}
      {...props}
    />
  )
}
