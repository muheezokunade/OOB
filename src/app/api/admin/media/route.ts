import { NextRequest, NextResponse } from 'next/server'
import { AuthService, requireAuth, ADMIN_PERMISSIONS } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/admin/media - Get all media files
export async function GET(request: NextRequest) {
  try {
    // Check authentication and permissions
    const admin = await requireAuth([ADMIN_PERMISSIONS.CONTENT_VIEW])(request)
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const mimeType = searchParams.get('mimeType')

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { filename: { contains: search, mode: 'insensitive' } },
        { originalName: { contains: search, mode: 'insensitive' } },
        { alt: { contains: search, mode: 'insensitive' } },
        { caption: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (category && category !== 'all') {
      where.category = category
    }

    if (mimeType && mimeType !== 'all') {
      if (mimeType === 'image') {
        where.mimeType = { startsWith: 'image/' }
      } else if (mimeType === 'video') {
        where.mimeType = { startsWith: 'video/' }
      } else if (mimeType === 'document') {
        where.mimeType = { in: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] }
      }
    }

    // Execute query
    const [media, total] = await Promise.all([
      db.media.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      db.media.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: {
        media,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }
    })
  } catch (error) {
    console.error('Error fetching media:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch media' },
      { status: 500 }
    )
  }
}

// POST /api/admin/media - Upload new media file
export async function POST(request: NextRequest) {
  try {
    // Check authentication and permissions
    const admin = await requireAuth([ADMIN_PERMISSIONS.CONTENT_CREATE])(request)
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string
    const alt = formData.get('alt') as string
    const caption = formData.get('caption') as string
    const tags = formData.get('tags') as string

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'video/mp4',
      'video/webm',
      'application/pdf'
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'File type not allowed' },
        { status: 400 }
      )
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 10MB' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const filename = `${timestamp}-${randomString}.${fileExtension}`

    // In a real application, you would upload to a cloud storage service
    // For now, we'll simulate the upload and store metadata
    const url = `/uploads/${filename}`

    // Create media record
    const media = await db.media.create({
      data: {
        filename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        url,
        alt: alt || null,
        caption: caption || null,
        category: category || null,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        uploadedBy: admin.id
      }
    })

    return NextResponse.json({
      success: true,
      data: media,
      message: 'File uploaded successfully'
    })
  } catch (error) {
    console.error('Error uploading media:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
