import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { AuthService } from '@/lib/auth'

const prisma = new PrismaClient()

// GET /api/banners/[id] - Get single banner (public)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const banner = await prisma.banner.findUnique({
      where: { id: params.id }
    })

    if (!banner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }

    return NextResponse.json(banner)
  } catch (error) {
    console.error('Error fetching banner:', error)
    return NextResponse.json(
      { error: 'Failed to fetch banner' },
      { status: 500 }
    )
  }
}

// PUT /api/banners/[id] - Update banner (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const existingBanner = await prisma.banner.findUnique({
      where: { id: params.id }
    })

    if (!existingBanner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }

    const banner = await prisma.banner.update({
      where: { id: params.id },
      data: {
        title: title || existingBanner.title,
        subtitle,
        image: image || existingBanner.image,
        link,
        linkText,
        type: type || existingBanner.type,
        category,
        priority: priority !== undefined ? priority : existingBanner.priority,
        isActive: isActive !== undefined ? isActive : existingBanner.isActive,
        startDate: startDate ? new Date(startDate) : existingBanner.startDate,
        endDate: endDate ? new Date(endDate) : existingBanner.endDate
      }
    })

    return NextResponse.json(banner)
  } catch (error) {
    console.error('Error updating banner:', error)
    return NextResponse.json(
      { error: 'Failed to update banner' },
      { status: 500 }
    )
  }
}

// DELETE /api/banners/[id] - Delete banner (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const admin = await AuthService.validateSession(token)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const existingBanner = await prisma.banner.findUnique({
      where: { id: params.id }
    })

    if (!existingBanner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }

    await prisma.banner.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Banner deleted successfully' })
  } catch (error) {
    console.error('Error deleting banner:', error)
    return NextResponse.json(
      { error: 'Failed to delete banner' },
      { status: 500 }
    )
  }
}
