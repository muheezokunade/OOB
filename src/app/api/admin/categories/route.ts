import { NextRequest, NextResponse } from 'next/server'
import { categoryStorage } from '@/lib/category-storage'

export async function GET() {
  const items = categoryStorage.list()
  return NextResponse.json({ success: true, data: { categories: items } })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body.name || !body.slug) {
      return NextResponse.json({ success: false, error: 'name and slug are required' }, { status: 400 })
    }
    const created = categoryStorage.create({
      name: body.name,
      slug: body.slug,
      description: body.description,
      parentId: body.parentId || undefined,
      isActive: body.isActive !== false
    })
    return NextResponse.json({ success: true, data: created, message: 'Category created successfully' })
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Failed to create category' }, { status: 500 })
  }
}


