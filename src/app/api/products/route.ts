import { NextRequest, NextResponse } from 'next/server'
import { productStorage } from '@/lib/product-storage'

// GET /api/products - Get all products with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const subcategory = searchParams.get('subcategory')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const colors = searchParams.get('colors')
    const sizes = searchParams.get('sizes')
    const materials = searchParams.get('materials')
    const sort = searchParams.get('sort')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    let products = productStorage.getActive()

    // Apply filters
    if (search) {
      products = productStorage.search(search).filter(p => p.isActive)
    }

    if (category && category !== 'all') {
      products = products.filter(p => p.category === category)
    }

    if (subcategory && subcategory !== 'all') {
      products = products.filter(p => p.subcategory === subcategory)
    }

    if (minPrice) {
      products = products.filter(p => p.price >= parseFloat(minPrice))
    }

    if (maxPrice) {
      products = products.filter(p => p.price <= parseFloat(maxPrice))
    }

    if (colors) {
      const colorList = colors.split(',')
      products = products.filter(p => 
        p.colors.some(color => colorList.includes(color))
      )
    }

    if (sizes) {
      const sizeList = sizes.split(',')
      products = products.filter(p => 
        p.sizes.some(size => sizeList.includes(size))
      )
    }

    if (materials) {
      const materialList = materials.split(',')
      products = products.filter(p => 
        p.materials.some(material => materialList.includes(material))
      )
    }

    // Apply sorting
    if (sort) {
      switch (sort) {
        case 'price-low':
          products.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          products.sort((a, b) => b.price - a.price)
          break
        case 'newest':
          products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          break
        case 'oldest':
          products.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          break
        case 'name':
          products.sort((a, b) => a.name.localeCompare(b.name))
          break
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
        },
        filters: {
          categories: [...new Set(products.map(p => p.category))],
          subcategories: [...new Set(products.map(p => p.subcategory))],
          colors: [...new Set(products.flatMap(p => p.colors))],
          sizes: [...new Set(products.flatMap(p => p.sizes))],
          materials: [...new Set(products.flatMap(p => p.materials))],
          priceRange: {
            min: Math.min(...products.map(p => p.price)),
            max: Math.max(...products.map(p => p.price))
          }
        }
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create new product (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // In a real app, you would:
    // 1. Validate admin authentication
    // 2. Validate product data
    // 3. Save to database
    // 4. Handle image uploads
    
    const newProduct = {
      id: `product-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

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
