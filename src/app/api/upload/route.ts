import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// POST /api/upload - Upload image
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string || 'general'

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads', type)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const fileName = `${timestamp}-${randomString}.${fileExtension}`
    const filePath = join(uploadDir, fileName)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Return file information
    const fileUrl = `/uploads/${type}/${fileName}`
    
    return NextResponse.json({
      success: true,
      data: {
        fileName,
        fileUrl,
        fileSize: file.size,
        fileType: file.type,
        uploadedAt: new Date().toISOString()
      },
      message: 'File uploaded successfully'
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

// GET /api/upload - Get uploaded files (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'general'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // In a real app, you would:
    // 1. Validate admin authentication
    // 2. Query database for uploaded files
    // 3. Apply filters and pagination

    // For now, return mock data
    const mockFiles = [
      {
        id: 'file-1',
        fileName: 'product-1.jpg',
        fileUrl: '/uploads/products/product-1.jpg',
        fileSize: 1024000,
        fileType: 'image/jpeg',
        type: 'product',
        uploadedAt: new Date().toISOString()
      },
      {
        id: 'file-2',
        fileName: 'banner-1.png',
        fileUrl: '/uploads/banners/banner-1.png',
        fileSize: 2048000,
        fileType: 'image/png',
        type: 'banner',
        uploadedAt: new Date().toISOString()
      }
    ]

    // Filter by type
    const filteredFiles = type === 'all' ? mockFiles : mockFiles.filter(f => f.type === type)

    // Apply pagination
    const total = filteredFiles.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedFiles = filteredFiles.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        files: paginatedFiles,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: endIndex < total,
          hasPrev: page > 1
        }
      }
    })
  } catch (error) {
    console.error('Error fetching files:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch files' },
      { status: 500 }
    )
  }
}





