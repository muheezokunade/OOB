import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'

// POST endpoint to set homepage content (setup only - no auth required)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const data = {
      heroTitle: body.heroTitle || 'Every Girl Deserves Her Perfect Moment',
      heroSubtitle: body.heroSubtitle || 'Bags and shoes that tell your story. From Lagos boardrooms to Abuja galas, we create pieces that elevate your everyday into something extraordinary.',
      heroButtonText: body.heroButtonText || 'Explore Collection',
      heroButtonLink: body.heroButtonLink || '/shop',
      heroImage: body.heroImage || '/images/hero/main-hero.svg',
      featuredTitle: body.featuredTitle || 'Featured Products',
      featuredSubtitle: body.featuredSubtitle || 'Discover our handpicked selection of premium items',
      featuredProducts: body.featuredProducts || [],
      isActive: body.isActive ?? true,
    }

    const existing = await prisma.homepageContent.findFirst()
    const saved = existing
      ? await prisma.homepageContent.update({ where: { id: existing.id }, data })
      : await prisma.homepageContent.create({ data })

    return NextResponse.json({ 
      success: true, 
      message: 'Homepage content set successfully',
      data: saved 
    })
  } catch (error) {
    console.error('Error setting homepage content:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to set homepage content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

