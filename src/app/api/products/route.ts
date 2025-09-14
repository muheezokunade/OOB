import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ProductSearchService } from '@/lib/search'

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

    // Use the advanced search service
    const searchResult = await ProductSearchService.search({
      query: search || undefined,
      category: category || undefined,
      subcategory: subcategory || undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      colors: colors ? colors.split(',') : undefined,
      sizes: sizes ? sizes.split(',') : undefined,
      materials: materials ? materials.split(',') : undefined,
      sortBy: sort as any,
      page,
      limit
    })

    return NextResponse.json({
      success: true,
      data: searchResult
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
