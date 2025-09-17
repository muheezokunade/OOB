import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/admin/customers - Get all customers for admin
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (status && status !== 'all') {
      if (status === 'active') {
        where.isActive = true
      } else if (status === 'inactive') {
        where.isActive = false
      }
    }

    if (dateFrom || dateTo) {
      where.createdAt = {}
      if (dateFrom) {
        where.createdAt.gte = new Date(dateFrom)
      }
      if (dateTo) {
        where.createdAt.lte = new Date(dateTo)
      }
    }

    // Execute query
    const [customers, total] = await Promise.all([
      db.user.findMany({
        where,
        include: {
          addresses: true,
          orders: {
            select: {
              id: true,
              total: true,
              status: true,
              createdAt: true
            },
            orderBy: { createdAt: 'desc' },
            take: 5
          },
          _count: {
            select: {
              orders: true,
              reviews: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      db.user.count({ where })
    ])

    // Calculate customer stats
    const customersWithStats = customers.map(customer => {
      const totalSpent = customer.orders.reduce((sum, order) => sum + Number(order.total), 0)
      const lastOrder = customer.orders[0]
      
      return {
        ...customer,
        totalSpent,
        lastOrderDate: lastOrder?.createdAt,
        averageOrderValue: customer.orders.length > 0 ? totalSpent / customer.orders.length : 0
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        customers: customersWithStats,
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
    console.error('Error fetching admin customers:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch customers' },
      { status: 500 }
    )
  }
}





