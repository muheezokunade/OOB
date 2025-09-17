import { NextRequest, NextResponse } from 'next/server'
import { categoryStorage } from '@/lib/category-storage'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const item = categoryStorage.get(id)
  if (!item) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true, data: item })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const updated = categoryStorage.update(id, {
      name: body.name,
      slug: body.slug,
      description: body.description,
      parentId: body.parentId || undefined,
      isActive: typeof body.isActive === 'boolean' ? body.isActive : undefined
    })
    if (!updated) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: updated, message: 'Category updated successfully' })
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const ok = categoryStorage.delete(id)
  if (!ok) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true, message: 'Category deleted successfully' })
}


