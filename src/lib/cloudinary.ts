import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export { cloudinary }

// Image upload utility
export async function uploadImage(
  file: File | Buffer,
  folder: string = 'omo-oni-bag',
  options: {
    public_id?: string
    transformation?: any
    tags?: string[]
  } = {}
): Promise<{
  public_id: string
  secure_url: string
  width: number
  height: number
}> {
  try {
    const result = await cloudinary.uploader.upload(
      file as any,
      {
        folder,
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto',
        ...options
      }
    )

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error('Failed to upload image')
  }
}

// Generate optimized image URL
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
  const defaultOptions = {
    quality: 'auto',
    fetch_format: 'auto',
    ...options
  }

  return cloudinary.url(publicId, defaultOptions)
}

// Delete image from Cloudinary
export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw new Error('Failed to delete image')
  }
}

// Get image info
export async function getImageInfo(publicId: string) {
  try {
    const result = await cloudinary.api.resource(publicId)
    return result
  } catch (error) {
    console.error('Cloudinary get info error:', error)
    throw new Error('Failed to get image info')
  }
}

// Transform existing image
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
  return cloudinary.url(publicId, transformations)
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
