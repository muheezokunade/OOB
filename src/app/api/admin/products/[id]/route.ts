import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/admin/products/[id] - Get single product for admin
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const product = await db.product.findUnique({
      where: { id },
      include: {
        variants: true,
        reviews: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        relatedProducts: {
          include: {
            related: {
              include: {
                variants: true
              }
            }
          }
        },
        _count: {
          select: {
            reviews: true,
            orderItems: true,
            productViews: true
          }
        }
      }
    })

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: product
    })
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

    // Check if product exists
    const existingProduct = await db.product.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Update product
    const product = await db.product.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        longDescription: body.longDescription,
        price: parseFloat(body.price),
        originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : null,
        category: body.category,
        subcategory: body.subcategory,
        image: body.image,
        images: body.images || [],
        stock: parseInt(body.stock) || 0,
        sku: body.sku,
        weight: body.weight ? parseFloat(body.weight) : null,
        dimensions: body.dimensions,
        materials: body.materials || [],
        specifications: body.specifications,
        careInstructions: body.careInstructions || [],
        tags: body.tags || [],
        isActive: body.isActive !== false
      },
      include: {
        variants: true
      }
    })

    // Update variants if provided
    if (body.variants) {
      // Delete existing variants
      await db.productVariant.deleteMany({
        where: { productId: id }
      })

      // Create new variants
      if (body.variants.length > 0) {
        await Promise.all(
          body.variants.map((variant: any) =>
            db.productVariant.create({
              data: {
                productId: id,
                size: variant.size,
                color: variant.color,
                stock: parseInt(variant.stock) || 0,
                price: variant.price ? parseFloat(variant.price) : null,
                sku: variant.sku
              }
            })
          )
        )
      }
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    })
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

    // Check if product exists
    const existingProduct = await db.product.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Delete product (this will cascade delete variants, reviews, etc.)
    await db.product.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
