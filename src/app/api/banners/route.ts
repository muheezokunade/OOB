import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'
import { AuthService } from '@/lib/auth'

// GET /api/banners - Get all banners (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const category = searchParams.get('category')
    const active = searchParams.get('active')

    const where: any = {}
    
    if (type) where.type = type
    if (category) where.category = category
    if (active !== null) where.isActive = active === 'true'

    // Only show banners that are currently active based on date range
    const now = new Date()
    where.OR = [
      { startDate: null, endDate: null },
      { startDate: null, endDate: { gte: now } },
      { startDate: { lte: now }, endDate: null },
      { startDate: { lte: now }, endDate: { gte: now } }
    ]

    const banners = await prisma.banner.findMany({
      where,
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(banners)
  } catch (error) {
    console.error('Error fetching banners:', error)
    return NextResponse.json(
      { error: 'Failed to fetch banners' },
      { status: 500 }
    )
  }
}

// POST /api/banners - Create new banner (admin only)
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const admin = await AuthService.validateSession(token)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, subtitle, image, link, linkText, type, category, priority, isActive, startDate, endDate } = body

    if (!title || !image || !type) {
      return NextResponse.json(
        { error: 'Title, image, and type are required' },
        { status: 400 }
      )
    }

    const banner = await prisma.banner.create({
      data: {
        title,
        subtitle,
        image,
        link,
        linkText,
        type,
        category,
        priority: priority || 0,
        isActive: isActive !== false,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null
      }
    })

    return NextResponse.json(banner, { status: 201 })
  } catch (error) {
    console.error('Error creating banner:', error)
    return NextResponse.json(
      { error: 'Failed to create banner' },
      { status: 500 }
    )
  }
}
