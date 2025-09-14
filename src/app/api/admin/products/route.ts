import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/admin/products - Get all products for admin
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const status = searchParams.get('status')

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (category && category !== 'all') {
      where.category = category
    }

    if (status && status !== 'all') {
      if (status === 'active') {
        where.isActive = true
      } else if (status === 'inactive') {
        where.isActive = false
      } else if (status === 'out-of-stock') {
        where.stock = 0
      } else if (status === 'low-stock') {
        where.stock = { lte: 5, gt: 0 }
      }
    }

    // Execute query
    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          variants: true,
          reviews: {
            select: {
              rating: true
            }
          },
          _count: {
            select: {
              reviews: true,
              orderItems: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      db.product.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }
    })
  } catch (error) {
    console.error('Error fetching admin products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/admin/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create product
    const product = await db.product.create({
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

    // Create variants if provided
    if (body.variants && body.variants.length > 0) {
      await Promise.all(
        body.variants.map((variant: any) =>
          db.productVariant.create({
            data: {
              productId: product.id,
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

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully'
    })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
