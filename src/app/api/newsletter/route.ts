import { NextRequest, NextResponse } from 'next/server'

// Mock newsletter subscribers - in a real app, this would come from a database
const subscribers: any[] = []

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName, lastName } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Check if already subscribed
    const existingSubscriber = subscribers.find(s => s.email === email)
    if (existingSubscriber) {
      return NextResponse.json(
        { success: false, error: 'Email already subscribed' },
        { status: 409 }
      )
    }

    // Add subscriber
    const newSubscriber = {
      id: `subscriber-${Date.now()}`,
      email,
      firstName: firstName || '',
      lastName: lastName || '',
      status: 'active',
      subscribedAt: new Date().toISOString(),
      lastEmailSent: null
    }

    subscribers.push(newSubscriber)

    // In a real app, you would:
    // 1. Save to database
    // 2. Send welcome email
    // 3. Add to email marketing platform (Mailchimp, ConvertKit, etc.)

    return NextResponse.json({
      success: true,
      data: newSubscriber,
      message: 'Successfully subscribed to newsletter'
    })
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}

// GET /api/newsletter - Get newsletter subscribers (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const status = searchParams.get('status')

    // In a real app, you would:
    // 1. Validate admin authentication
    // 2. Query database with filters and pagination

    let filteredSubscribers = subscribers

    if (status) {
      filteredSubscribers = filteredSubscribers.filter(s => s.status === status)
    }

    // Apply pagination
    const total = filteredSubscribers.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedSubscribers = filteredSubscribers.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        subscribers: paginatedSubscribers,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: endIndex < total,
          hasPrev: page > 1
        }
      }
    })
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}

// DELETE /api/newsletter - Unsubscribe from newsletter
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find subscriber
    const subscriberIndex = subscribers.findIndex(s => s.email === email)
    
    if (subscriberIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Email not found in subscribers' },
        { status: 404 }
      )
    }

    // Update status to unsubscribed
    subscribers[subscriberIndex].status = 'unsubscribed'
    subscribers[subscriberIndex].unsubscribedAt = new Date().toISOString()

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    })
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
}
