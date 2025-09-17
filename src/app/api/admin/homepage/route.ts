import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'
import { requireAuth, ADMIN_PERMISSIONS } from '@/lib/auth'

// GET current homepage content
export async function GET(request: NextRequest) {
  try {
    const record = await prisma.homepageContent.findFirst({
      orderBy: { updatedAt: 'desc' }
    })
    return NextResponse.json({ success: true, data: record })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch' }, { status: 500 })
  }
}

// PUT upsert homepage content (admin only)
export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAuth([ADMIN_PERMISSIONS.SETTINGS_UPDATE])(request)
    if (!admin) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()

    const data = {
      heroTitle: body.heroTitle,
      heroSubtitle: body.heroSubtitle,
      heroImage: body.heroImage,
      heroButtonText: body.heroButtonText,
      heroButtonLink: body.heroButtonLink,
      featuredTitle: body.featuredTitle,
      featuredSubtitle: body.featuredSubtitle,
      featuredProducts: body.featuredProducts ?? [],
      isActive: body.isActive ?? true,
    }

    const existing = await prisma.homepageContent.findFirst()
    const saved = existing
      ? await prisma.homepageContent.update({ where: { id: existing.id }, data })
      : await prisma.homepageContent.create({ data })

    return NextResponse.json({ success: true, data: saved })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 })
  }
}





