import { NextRequest, NextResponse } from 'next/server'
import { productStorage } from '@/lib/product-storage'

// GET /api/admin/products/[id] - Get single product for admin
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = productStorage.getById(id)

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error('Error fetching admin product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/products/[id] - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const updated = productStorage.update(id, {
      name: body.name,
      description: body.description,
      longDescription: body.longDescription,
      price: body.price ? parseFloat(body.price) : undefined,
      originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : undefined,
      category: body.category,
      subcategory: body.subcategory,
      images: body.images,
      stock: body.stock ? parseInt(body.stock) : undefined,
      sku: body.sku,
      materials: body.materials,
      sizes: body.sizes,
      colors: body.colors,
      weight: body.weight ? parseFloat(body.weight) : undefined,
      dimensions: body.dimensions,
      specifications: body.specifications,
      careInstructions: body.careInstructions,
      tags: body.tags,
      isActive: body.isActive
    })

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: updated, message: 'Product updated successfully' })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/products/[id] - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const ok = productStorage.delete(id)
    if (!ok) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true, message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}




