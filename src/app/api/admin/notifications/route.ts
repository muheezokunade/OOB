import { NextRequest, NextResponse } from 'next/server'
import { AuthService, requireAuth, ADMIN_PERMISSIONS } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/admin/notifications - Get admin notifications
export async function GET(request: NextRequest) {
  try {
    // Check authentication and permissions
    const admin = await requireAuth([ADMIN_PERMISSIONS.ANALYTICS_VIEW])(request)
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get various notification data
    const [
      lowStockProducts,
      pendingOrders,
      unreadMessages,
      recentReviews,
      systemAlerts
    ] = await Promise.all([
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

      // Unread messages
      db.contactMessage.count({
        where: {
          isRead: false
        }
      }),

      // Recent reviews (last 7 days)
      db.review.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }),

      // System alerts (placeholder)
      Promise.resolve(0)
    ])

    const notifications = [
      {
        id: 'low-stock',
        type: 'warning',
        title: 'Low Stock Alert',
        message: `${lowStockProducts} products are running low on stock`,
        count: lowStockProducts,
        priority: lowStockProducts > 0 ? 'high' : 'normal',
        action: '/admin/products?status=low-stock',
        icon: 'Package'
      },
      {
        id: 'pending-orders',
        type: 'info',
        title: 'Pending Orders',
        message: `${pendingOrders} orders are pending processing`,
        count: pendingOrders,
        priority: pendingOrders > 5 ? 'high' : 'normal',
        action: '/admin/orders?status=pending',
        icon: 'ShoppingCart'
      },
      {
        id: 'unread-messages',
        type: 'info',
        title: 'Unread Messages',
        message: `${unreadMessages} contact messages are unread`,
        count: unreadMessages,
        priority: unreadMessages > 0 ? 'high' : 'normal',
        action: '/admin/messages?isRead=false',
        icon: 'MessageSquare'
      },
      {
        id: 'recent-reviews',
        type: 'success',
        title: 'Recent Reviews',
        message: `${recentReviews} new reviews in the last 7 days`,
        count: recentReviews,
        priority: 'normal',
        action: '/admin/products',
        icon: 'Star'
      }
    ]

    // Filter out notifications with zero counts
    const activeNotifications = notifications.filter(notification => notification.count > 0)

    return NextResponse.json({
      success: true,
      data: {
        notifications: activeNotifications,
        totalCount: activeNotifications.reduce((sum, n) => sum + n.count, 0)
      }
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

// POST /api/admin/notifications/send - Send email notification
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
    const { type, recipients, subject, message, data } = body

    if (!type || !recipients || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // In a real application, you would integrate with an email service
    // For now, we'll simulate the email sending
    console.log('Sending email notification:', {
      type,
      recipients,
      subject,
      message,
      data,
      sentBy: admin.email,
      sentAt: new Date()
    })

    return NextResponse.json({
      success: true,
      message: 'Email notification sent successfully'
    })
  } catch (error) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}





