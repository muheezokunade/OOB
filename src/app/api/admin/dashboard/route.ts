import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/admin/dashboard - Get dashboard analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30' // days

    const days = parseInt(period)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Get basic counts
    const [
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue,
      lowStockProducts,
      pendingOrders,
      recentOrders,
      topProducts
    ] = await Promise.all([
      // Total products
      db.product.count({
        where: { isActive: true }
      }),

      // Total orders in period
      db.order.count({
        where: {
          createdAt: { gte: startDate }
        }
      }),

      // Total customers
      db.user.count({
        where: { isActive: true }
      }),

      // Total revenue in period
      db.order.aggregate({
        where: {
          createdAt: { gte: startDate },
          status: { not: 'cancelled' }
        },
        _sum: {
          total: true
        }
      }),

      // Low stock products
      db.product.count({
        where: {
          stock: { lte: 5, gt: 0 },
          isActive: true
        }
      }),

      // Pending orders
      db.order.count({
        where: {
          status: { in: ['pending', 'processing'] }
        }
      }),

      // Recent orders
      db.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        }
      }),

      // Top products by sales
      db.orderItem.groupBy({
        by: ['productId'],
        where: {
          order: {
            createdAt: { gte: startDate },
            status: { not: 'cancelled' }
          }
        },
        _sum: {
          quantity: true
        },
        _count: {
          productId: true
        },
        orderBy: {
          _sum: {
            quantity: 'desc'
          }
        },
        take: 5
      })
    ])

    // Get product details for top products
    const topProductIds = topProducts.map(p => p.productId)
    const topProductDetails = await db.product.findMany({
      where: {
        id: { in: topProductIds }
      },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        rating: true,
        reviewCount: true
      }
    })

    // Combine top products with sales data
    const topProductsWithSales = topProductDetails.map(product => {
      const salesData = topProducts.find(p => p.productId === product.id)
      return {
        ...product,
        totalSold: salesData?._sum.quantity || 0,
        orderCount: salesData?._count.productId || 0,
        revenue: Number(product.price) * (salesData?._sum.quantity || 0)
      }
    })

    // Get previous period data for comparison
    const previousStartDate = new Date()
    previousStartDate.setDate(previousStartDate.getDate() - (days * 2))
    const previousEndDate = new Date()
    previousEndDate.setDate(previousEndDate.getDate() - days)

    const [
      previousOrders,
      previousRevenue
    ] = await Promise.all([
      db.order.count({
        where: {
          createdAt: {
            gte: previousStartDate,
            lte: previousEndDate
          }
        }
      }),
      db.order.aggregate({
        where: {
          createdAt: {
            gte: previousStartDate,
            lte: previousEndDate
          },
          status: { not: 'cancelled' }
        },
        _sum: {
          total: true
        }
      })
    ])

    // Calculate growth percentages
    const orderGrowth = previousOrders > 0 
      ? ((totalOrders - previousOrders) / previousOrders) * 100 
      : 0

    const revenueGrowth = previousRevenue._sum.total 
      ? ((Number(totalRevenue._sum.total) - Number(previousRevenue._sum.total)) / Number(previousRevenue._sum.total)) * 100
      : 0

    // Get sales chart data (daily sales for the period)
    const salesChartData = []
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)

      const daySales = await db.order.aggregate({
        where: {
          createdAt: {
            gte: date,
            lt: nextDate
          },
          status: { not: 'cancelled' }
        },
        _sum: {
          total: true
        },
        _count: {
          id: true
        }
      })

      salesChartData.push({
        date: date.toISOString().split('T')[0],
        revenue: Number(daySales._sum.total) || 0,
        orders: daySales._count.id || 0
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalProducts,
          totalOrders,
          totalCustomers,
          totalRevenue: Number(totalRevenue._sum.total) || 0,
          lowStockProducts,
          pendingOrders,
          orderGrowth: Math.round(orderGrowth * 100) / 100,
          revenueGrowth: Math.round(revenueGrowth * 100) / 100
        },
        recentOrders: recentOrders.map(order => ({
          id: order.id,
          orderNumber: order.orderNumber,
          customer: `${order.user.firstName} ${order.user.lastName}`,
          amount: Number(order.total),
          status: order.status,
          date: order.createdAt
        })),
        topProducts: topProductsWithSales,
        salesChart: salesChartData
      }
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}




