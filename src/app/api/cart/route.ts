import { NextRequest, NextResponse } from 'next/server'

// Mock cart data - in a real app, this would come from a database
const carts: any[] = []

// GET /api/cart - Get user cart
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const sessionId = searchParams.get('sessionId')

    // In a real app, you would:
    // 1. Validate user authentication or session
    // 2. Query database for cart items
    // 3. Calculate totals and apply discounts

    let cart = carts.find(c => 
      (userId && c.userId === userId) || 
      (sessionId && c.sessionId === sessionId)
    )

    if (!cart) {
      cart = {
        id: `cart-${Date.now()}`,
        userId: userId || null,
        sessionId: sessionId || null,
        items: [],
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        coupon: null,
        discount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      carts.push(cart)
    }

    return NextResponse.json({
      success: true,
      data: cart
    })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, sessionId, item } = body

    // Validate required fields
    if (!item || !item.id || !item.quantity) {
      return NextResponse.json(
        { success: false, error: 'Invalid item data' },
        { status: 400 }
      )
    }

    // Find or create cart
    let cart = carts.find(c => 
      (userId && c.userId === userId) || 
      (sessionId && c.sessionId === sessionId)
    )

    if (!cart) {
      cart = {
        id: `cart-${Date.now()}`,
        userId: userId || null,
        sessionId: sessionId || null,
        items: [],
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        coupon: null,
        discount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      carts.push(cart)
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (cartItem: any) => 
        cartItem.id === item.id && 
        cartItem.size === item.size && 
        cartItem.color === item.color
    )

    if (existingItemIndex >= 0) {
      // Update quantity
      cart.items[existingItemIndex].quantity += item.quantity
    } else {
      // Add new item
      cart.items.push({
        ...item,
        addedAt: new Date().toISOString()
      })
    }

    // Recalculate totals
    cart.subtotal = cart.items.reduce((sum: number, cartItem: any) => 
      sum + (cartItem.price * cartItem.quantity), 0
    )
    cart.tax = Math.round(cart.subtotal * 0.075) // 7.5% VAT
    cart.total = cart.subtotal + cart.tax + cart.shipping - cart.discount
    cart.updatedAt = new Date().toISOString()

    return NextResponse.json({
      success: true,
      data: cart,
      message: 'Item added to cart successfully'
    })
  } catch (error) {
    console.error('Error adding item to cart:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add item to cart' },
      { status: 500 }
    )
  }
}

// PUT /api/cart - Update cart item
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, sessionId, itemId, quantity, size, color } = body

    // Find cart
    const cart = carts.find(c => 
      (userId && c.userId === userId) || 
      (sessionId && c.sessionId === sessionId)
    )

    if (!cart) {
      return NextResponse.json(
        { success: false, error: 'Cart not found' },
        { status: 404 }
      )
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex(
      (cartItem: any) => 
        cartItem.id === itemId && 
        cartItem.size === size && 
        cartItem.color === color
    )

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Item not found in cart' },
        { status: 404 }
      )
    }

    if (quantity <= 0) {
      // Remove item
      cart.items.splice(itemIndex, 1)
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity
    }

    // Recalculate totals
    cart.subtotal = cart.items.reduce((sum: number, cartItem: any) => 
      sum + (cartItem.price * cartItem.quantity), 0
    )
    cart.tax = Math.round(cart.subtotal * 0.075) // 7.5% VAT
    cart.total = cart.subtotal + cart.tax + cart.shipping - cart.discount
    cart.updatedAt = new Date().toISOString()

    return NextResponse.json({
      success: true,
      data: cart,
      message: 'Cart updated successfully'
    })
  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update cart' },
      { status: 500 }
    )
  }
}

// DELETE /api/cart - Clear cart
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const sessionId = searchParams.get('sessionId')

    // Find cart
    const cartIndex = carts.findIndex(c => 
      (userId && c.userId === userId) || 
      (sessionId && c.sessionId === sessionId)
    )

    if (cartIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Cart not found' },
        { status: 404 }
      )
    }

    // Clear cart items
    carts[cartIndex].items = []
    carts[cartIndex].subtotal = 0
    carts[cartIndex].tax = 0
    carts[cartIndex].shipping = 0
    carts[cartIndex].total = 0
    carts[cartIndex].coupon = null
    carts[cartIndex].discount = 0
    carts[cartIndex].updatedAt = new Date().toISOString()

    return NextResponse.json({
      success: true,
      data: carts[cartIndex],
      message: 'Cart cleared successfully'
    })
  } catch (error) {
    console.error('Error clearing cart:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to clear cart' },
      { status: 500 }
    )
  }
}





