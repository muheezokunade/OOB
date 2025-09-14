import { NextRequest, NextResponse } from 'next/server'
import { productStorage } from '@/lib/product-storage'

// GET /api/admin/products - Get all products for admin
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const status = searchParams.get('status')

    let products = productStorage.getAll()

    // Apply filters
    if (search) {
      products = productStorage.search(search)
    }

    if (category && category !== 'all') {
      products = products.filter(p => p.category === category)
    }

    if (status && status !== 'all') {
      if (status === 'active') {
        products = products.filter(p => p.isActive)
      } else if (status === 'inactive') {
        products = products.filter(p => !p.isActive)
      } else if (status === 'out-of-stock') {
        products = products.filter(p => p.stock === 0)
      } else if (status === 'low-stock') {
        products = products.filter(p => p.stock <= 5 && p.stock > 0)
      }
    }

    // Pagination
    const total = products.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = products.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        products: paginatedProducts,
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

    // Create product using storage
    const newProduct = productStorage.create({
      name: body.name,
      description: body.description || '',
      longDescription: body.longDescription,
      price: parseFloat(body.price),
      originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : undefined,
      category: body.category,
      subcategory: body.subcategory || '',
      images: body.images || [],
      stock: parseInt(body.stock) || 0,
      sku: body.sku || `SKU-${Date.now()}`,
      materials: body.materials || [],
      sizes: body.sizes || [],
      colors: body.colors || [],
      weight: body.weight ? parseFloat(body.weight) : undefined,
      dimensions: body.dimensions,
      specifications: body.specifications,
      careInstructions: body.careInstructions || [],
      tags: body.tags || [],
      isActive: body.isActive !== false,
      isNew: body.isNew || false,
      isBestSeller: body.isBestSeller || false,
      isOutOfStock: body.isOutOfStock || false
    })

    return NextResponse.json({
      success: true,
      data: newProduct,
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

