import { NextRequest, NextResponse } from 'next/server'

// Mock wishlist data - in a real app, this would come from a database
const wishlists: any[] = []

// GET /api/wishlist - Get user wishlist
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    // In a real app, you would:
    // 1. Validate user authentication
    // 2. Query database for wishlist items

    let wishlist = wishlists.find(w => w.userId === userId)

    if (!wishlist) {
      wishlist = {
        id: `wishlist-${Date.now()}`,
        userId,
        items: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      wishlists.push(wishlist)
    }

    return NextResponse.json({
      success: true,
      data: wishlist
    })
  } catch (error) {
    console.error('Error fetching wishlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch wishlist' },
      { status: 500 }
    )
  }
}

// POST /api/wishlist - Add item to wishlist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, product } = body

    if (!userId || !product) {
      return NextResponse.json(
        { success: false, error: 'User ID and product are required' },
        { status: 400 }
      )
    }

    // Find or create wishlist
    let wishlist = wishlists.find(w => w.userId === userId)

    if (!wishlist) {
      wishlist = {
        id: `wishlist-${Date.now()}`,
        userId,
        items: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      wishlists.push(wishlist)
    }

    // Check if item already exists in wishlist
    const existingItem = wishlist.items.find((item: any) => item.id === product.id)

    if (existingItem) {
      return NextResponse.json(
        { success: false, error: 'Item already in wishlist' },
        { status: 409 }
      )
    }

    // Add item to wishlist
    wishlist.items.push({
      ...product,
      addedAt: new Date().toISOString()
    })

    wishlist.updatedAt = new Date().toISOString()

    return NextResponse.json({
      success: true,
      data: wishlist,
      message: 'Item added to wishlist successfully'
    })
  } catch (error) {
    console.error('Error adding item to wishlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add item to wishlist' },
      { status: 500 }
    )
  }
}

// DELETE /api/wishlist - Remove item from wishlist
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const productId = searchParams.get('productId')

    if (!userId || !productId) {
      return NextResponse.json(
        { success: false, error: 'User ID and product ID are required' },
        { status: 400 }
      )
    }

    // Find wishlist
    const wishlist = wishlists.find(w => w.userId === userId)

    if (!wishlist) {
      return NextResponse.json(
        { success: false, error: 'Wishlist not found' },
        { status: 404 }
      )
    }

    // Remove item from wishlist
    const itemIndex = wishlist.items.findIndex((item: any) => item.id === productId)

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Item not found in wishlist' },
        { status: 404 }
      )
    }

    wishlist.items.splice(itemIndex, 1)
    wishlist.updatedAt = new Date().toISOString()

    return NextResponse.json({
      success: true,
      data: wishlist,
      message: 'Item removed from wishlist successfully'
    })
  } catch (error) {
    console.error('Error removing item from wishlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove item from wishlist' },
      { status: 500 }
    )
  }
}





