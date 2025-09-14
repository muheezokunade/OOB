import { NextRequest, NextResponse } from 'next/server'
import { AuthService, requireAuth, ADMIN_PERMISSIONS } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/admin/export - Export data
export async function GET(request: NextRequest) {
  try {
    // Check authentication and permissions
    const admin = await requireAuth([ADMIN_PERMISSIONS.REPORTS_VIEW])(request)
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // products, orders, customers, messages
    const format = searchParams.get('format') || 'csv' // csv, json, xlsx
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Export type is required' },
        { status: 400 }
      )
    }

    let data: any[] = []
    let filename = ''

    // Build date filter
    const dateFilter: any = {}
    if (dateFrom) {
      dateFilter.gte = new Date(dateFrom)
    }
    if (dateTo) {
      dateFilter.lte = new Date(dateTo)
    }

    switch (type) {
      case 'products':
        data = await db.product.findMany({
          where: dateFilter.createdAt ? { createdAt: dateFilter } : {},
          include: {
            variants: true,
            _count: {
              select: {
                reviews: true,
                orderItems: true
              }
            }
          }
        })
        filename = `products-export-${new Date().toISOString().split('T')[0]}.${format}`
        break

      case 'orders':
        data = await db.order.findMany({
          where: dateFilter.createdAt ? { createdAt: dateFilter } : {},
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true
              }
            },
            items: {
              include: {
                product: {
                  select: {
                    name: true,
                    sku: true
                  }
                }
              }
            }
          }
        })
        filename = `orders-export-${new Date().toISOString().split('T')[0]}.${format}`
        break

      case 'customers':
        data = await db.user.findMany({
          where: dateFilter.createdAt ? { createdAt: dateFilter } : {},
          include: {
            _count: {
              select: {
                orders: true,
                reviews: true
              }
            }
          }
        })
        filename = `customers-export-${new Date().toISOString().split('T')[0]}.${format}`
        break

      case 'messages':
        data = await db.contactMessage.findMany({
          where: dateFilter.createdAt ? { createdAt: dateFilter } : {}
        })
        filename = `messages-export-${new Date().toISOString().split('T')[0]}.${format}`
        break

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid export type' },
          { status: 400 }
        )
    }

    if (format === 'json') {
      return new NextResponse(JSON.stringify(data, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="${filename}"`
        }
      })
    }

    if (format === 'csv') {
      // Convert to CSV
      const csv = convertToCSV(data)
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}"`
        }
      })
    }

    // For xlsx, you would need to use a library like xlsx
    // For now, return JSON
    return new NextResponse(JSON.stringify(data, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })
  } catch (error) {
    console.error('Error exporting data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to export data' },
      { status: 500 }
    )
  }
}

// Helper function to convert data to CSV
function convertToCSV(data: any[]): string {
  if (data.length === 0) return ''

  // Get headers from first object
  const headers = Object.keys(data[0])
  
  // Create CSV header row
  const csvHeaders = headers.join(',')
  
  // Create CSV data rows
  const csvRows = data.map(row => {
    return headers.map(header => {
      const value = row[header]
      // Handle nested objects and arrays
      if (typeof value === 'object' && value !== null) {
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`
      }
      // Handle strings with commas or quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    }).join(',')
  })
  
  return [csvHeaders, ...csvRows].join('\n')
}


