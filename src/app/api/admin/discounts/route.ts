import { NextRequest, NextResponse } from 'next/server'
import { AuthService, requireAuth, ADMIN_PERMISSIONS } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/admin/discounts - Get all discount codes
export async function GET(request: NextRequest) {
  try {
    // Check authentication and permissions
    const admin = await requireAuth([ADMIN_PERMISSIONS.SETTINGS_VIEW])(request)
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    const type = searchParams.get('type')

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (status && status !== 'all') {
      if (status === 'active') {
        where.isActive = true
        where.startsAt = { lte: new Date() }
        where.expiresAt = { gte: new Date() }
      } else if (status === 'inactive') {
        where.isActive = false
      } else if (status === 'expired') {
        where.expiresAt = { lt: new Date() }
      } else if (status === 'upcoming') {
        where.startsAt = { gt: new Date() }
      }
    }

    if (type && type !== 'all') {
      where.type = type
    }

    // Execute query
    const [discounts, total] = await Promise.all([
      db.discountCode.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      db.discountCode.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: {
        discounts,
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
    console.error('Error fetching discounts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch discounts' },
      { status: 500 }
    )
  }
}

// POST /api/admin/discounts - Create new discount code
export async function POST(request: NextRequest) {
  try {
    // Check authentication and permissions
    const admin = await requireAuth([ADMIN_PERMISSIONS.SETTINGS_UPDATE])(request)
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      code,
      name,
      description,
      type,
      value,
      minOrderAmount,
      maxDiscountAmount,
      usageLimit,
      startsAt,
      expiresAt
    } = body

    // Validate input
    if (!code || !name || !type || !value || !startsAt || !expiresAt) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate discount type
    const validTypes = ['percentage', 'fixed_amount', 'free_shipping']
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid discount type' },
        { status: 400 }
      )
    }

    // Validate value based on type
    if (type === 'percentage' && (value < 0 || value > 100)) {
      return NextResponse.json(
        { success: false, error: 'Percentage must be between 0 and 100' },
        { status: 400 }
      )
    }

    if (type === 'fixed_amount' && value < 0) {
      return NextResponse.json(
        { success: false, error: 'Fixed amount must be positive' },
        { status: 400 }
      )
    }

    // Check if code already exists
    const existingDiscount = await db.discountCode.findUnique({
      where: { code }
    })

    if (existingDiscount) {
      return NextResponse.json(
        { success: false, error: 'Discount code already exists' },
        { status: 400 }
      )
    }

    // Create discount code
    const discount = await db.discountCode.create({
      data: {
        code,
        name,
        description,
        type,
        value,
        minOrderAmount: minOrderAmount || null,
        maxDiscountAmount: maxDiscountAmount || null,
        usageLimit: usageLimit || null,
        startsAt: new Date(startsAt),
        expiresAt: new Date(expiresAt)
      }
    })

    return NextResponse.json({
      success: true,
      data: discount,
      message: 'Discount code created successfully'
    })
  } catch (error) {
    console.error('Error creating discount:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create discount code' },
      { status: 500 }
    )
  }
}


