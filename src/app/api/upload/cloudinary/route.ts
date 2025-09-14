import { NextRequest, NextResponse } from 'next/server'
import { uploadImage } from '@/lib/cloudinary'
import { AuthService } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const admin = await AuthService.validateSession(token)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'omo-oni-bag'
    const tags = formData.get('tags') as string
    const quality = formData.get('quality') as string
    const format = formData.get('format') as string
    const flags = formData.get('flags') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' 
      }, { status: 400 })
    }

    // Dynamic file size validation based on folder
    let maxSize = 5 * 1024 * 1024 // Default 5MB
    if (folder.includes('high-quality') || folder.includes('homepage')) {
      maxSize = 25 * 1024 * 1024 // 25MB for high-quality images
    }

    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: `File too large. Maximum size is ${Math.round(maxSize / (1024 * 1024))}MB.` 
      }, { status: 400 })
    }

    // Prepare upload options
    const uploadOptions: any = {
      tags: tags ? tags.split(',') : undefined
    }

    // Add quality settings for high-quality uploads
    if (quality) {
      uploadOptions.quality = quality
    }
    if (format) {
      uploadOptions.format = format
    }
    if (flags) {
      uploadOptions.flags = flags
    }

    // Upload to Cloudinary
    const result = await uploadImage(file, folder, uploadOptions)

    return NextResponse.json({
      success: true,
      data: {
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height
      }
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}

// DELETE endpoint to remove images
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const admin = await AuthService.validateSession(token)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { publicId } = await request.json()

    if (!publicId) {
      return NextResponse.json({ error: 'No public ID provided' }, { status: 400 })
    }

    // Delete from Cloudinary
    const { deleteImage } = await import('@/lib/cloudinary')
    await deleteImage(publicId)

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    })

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}

