// Client-safe Cloudinary utilities
// This file doesn't import the Cloudinary SDK to avoid Node.js dependencies

export interface CloudinaryOptions {
  width?: number
  height?: number
  quality?: string | number
  format?: string
  crop?: string
  gravity?: string
  effect?: string
  radius?: string
  fetch_format?: string
}

/**
 * Generate optimized Cloudinary URL without importing the SDK
 * This is a client-safe function that constructs URLs manually
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: CloudinaryOptions = {}
): string {
  // If it's already a full URL, return as is
  if (publicId.startsWith('http://') || publicId.startsWith('https://')) {
    return publicId
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your-cloud-name'
  
  const defaultOptions = {
    quality: 'auto',
    fetch_format: 'auto',
    ...options
  }

  // Build transformation string
  const transformations: string[] = []
  
  if (defaultOptions.width) transformations.push(`w_${defaultOptions.width}`)
  if (defaultOptions.height) transformations.push(`h_${defaultOptions.height}`)
  if (defaultOptions.crop) transformations.push(`c_${defaultOptions.crop}`)
  if (defaultOptions.gravity) transformations.push(`g_${defaultOptions.gravity}`)
  if (defaultOptions.quality) transformations.push(`q_${defaultOptions.quality}`)
  if (defaultOptions.fetch_format) transformations.push(`f_${defaultOptions.fetch_format}`)
  if (defaultOptions.effect) transformations.push(`e_${defaultOptions.effect}`)
  if (defaultOptions.radius) transformations.push(`r_${defaultOptions.radius}`)

  const transformationString = transformations.length > 0 
    ? transformations.join(',') + '/'
    : ''

  // Construct the URL
  const url = `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}${publicId}`
  
  return url
}

/**
 * Extract public ID from a Cloudinary URL
 */
export function extractPublicId(url: string): string {
  if (!url.includes('cloudinary.com')) {
    return url
  }

  const parts = url.split('/upload/')
  if (parts.length < 2) return url

  const afterUpload = parts[1]
  const publicIdParts = afterUpload.split('/')
  
  // Remove the last part if it has a file extension
  const lastPart = publicIdParts[publicIdParts.length - 1]
  if (lastPart.includes('.')) {
    publicIdParts[publicIdParts.length - 1] = lastPart.split('.')[0]
  }

  return publicIdParts.join('/')
}

/**
 * Check if a URL is a Cloudinary URL
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes('cloudinary.com')
}
