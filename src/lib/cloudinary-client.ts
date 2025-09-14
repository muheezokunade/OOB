// Client-safe Cloudinary utilities
// This file only contains functions that can run in the browser

// Generate optimized image URL (client-safe)
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: string | number
    format?: string
    crop?: string
    gravity?: string
    effect?: string
  } = {}
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  
  if (!cloudName) {
    console.warn('Cloudinary cloud name not configured')
    return publicId
  }

  // If the publicId is already a full URL, return it as is
  if (publicId.startsWith('http')) {
    return publicId
  }

  const defaultOptions = {
    quality: 'auto',
    fetch_format: 'auto',
    ...options
  }

  // Build URL manually for client-side usage
  const transformations = Object.entries(defaultOptions)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}_${value}`)
    .join(',')

  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`
  
  if (transformations) {
    return `${baseUrl}/${transformations}/${publicId}`
  }
  
  return `${baseUrl}/${publicId}`
}

// Transform existing image (client-safe)
export function transformImage(
  publicId: string,
  transformations: {
    width?: number
    height?: number
    crop?: string
    gravity?: string
    quality?: string | number
    format?: string
    effect?: string
    radius?: number
    border?: string
    shadow?: string
  }
): string {
  return getOptimizedImageUrl(publicId, transformations)
}

// Banner-specific transformations
export const bannerTransformations = {
  hero: {
    width: 800,
    height: 1000,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  },
  product: {
    width: 600,
    height: 600,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  },
  announcement: {
    width: 1200,
    height: 400,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  },
  promotion: {
    width: 1000,
    height: 500,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  }
}

// Product image transformations
export const productTransformations = {
  thumbnail: {
    width: 200,
    height: 200,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  },
  medium: {
    width: 400,
    height: 400,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  },
  large: {
    width: 800,
    height: 800,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  },
  zoom: {
    width: 1200,
    height: 1200,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  }
}
