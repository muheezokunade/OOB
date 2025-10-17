import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET all collections
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get('active')
    const isFeatured = searchParams.get('featured')

    const where: any = {}
    
    if (isActive === 'true') {
      where.isActive = true
    }
    
    if (isFeatured === 'true') {
      where.isFeatured = true
    }

    const collections = await prisma.collection.findMany({
      where,
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(collections)
  } catch (error) {
    console.error('Error fetching collections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    )
  }
}

// POST create new collection
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { title, slug, description, image, badge, href, category, priority, isActive, isFeatured } = body

    // Validate required fields
    if (!title || !slug || !description || !image || !href) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingCollection = await prisma.collection.findUnique({
      where: { slug }
    })

    if (existingCollection) {
      return NextResponse.json(
        { error: 'Collection with this slug already exists' },
        { status: 409 }
      )
    }

    const collection = await prisma.collection.create({
      data: {
        title,
        slug,
        description,
        image,
        badge,
        href,
        category,
        priority: priority || 0,
        isActive: isActive !== undefined ? isActive : true,
        isFeatured: isFeatured !== undefined ? isFeatured : false
      }
    })

    return NextResponse.json(collection, { status: 201 })
  } catch (error) {
    console.error('Error creating collection:', error)
    return NextResponse.json(
      { error: 'Failed to create collection' },
      { status: 500 }
    )
  }
}

