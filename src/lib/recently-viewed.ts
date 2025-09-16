import { db } from './db'

export interface RecentlyViewedProduct {
  id: string
  name: string
  price: number
  image: string
  category: string
  viewedAt: Date
}

export class RecentlyViewedService {
  static async trackProductView(
    productId: string,
    userId?: string,
    sessionId?: string
  ): Promise<void> {
    try {
      // Check if view already exists for this user/session and product
      const existingView = await db.productView.findFirst({
        where: {
          productId,
          OR: [
            { userId: userId || undefined },
            { sessionId: sessionId || undefined }
          ]
        }
      })

      if (existingView) {
        // Update existing view timestamp
        await db.productView.update({
          where: { id: existingView.id },
          data: { viewedAt: new Date() }
        })
      } else {
        // Create new view record
        await db.productView.create({
          data: {
            productId,
            userId: userId || null,
            sessionId: sessionId || null
          }
        })
      }
    } catch (error) {
      console.error('Failed to track product view:', error)
    }
  }

  static async getRecentlyViewed(
    userId?: string,
    sessionId?: string,
    limit: number = 10
  ): Promise<RecentlyViewedProduct[]> {
    try {
      const views = await db.productView.findMany({
        where: {
          OR: [
            { userId: userId || undefined },
            { sessionId: sessionId || undefined }
          ]
        },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              image: true,
              category: true
            }
          }
        },
        orderBy: {
          viewedAt: 'desc'
        },
        take: limit
      })

      return views.map(view => ({
        id: view.product.id,
        name: view.product.name,
        price: Number(view.product.price),
        image: view.product.image,
        category: view.product.category,
        viewedAt: view.viewedAt
      }))
    } catch (error) {
      console.error('Failed to get recently viewed products:', error)
      return []
    }
  }

  static async getPopularProducts(limit: number = 10): Promise<any[]> {
    try {
      const popularProducts = await db.productView.groupBy({
        by: ['productId'],
        _count: {
          productId: true
        },
        orderBy: {
          _count: {
            productId: 'desc'
          }
        },
        take: limit
      })

      const productIds = popularProducts.map(p => p.productId)

      const products = await db.product.findMany({
        where: {
          id: { in: productIds },
          isActive: true
        },
        include: {
          variants: true,
          reviews: {
            select: {
              rating: true
            }
          },
          _count: {
            select: {
              reviews: true
            }
          }
        }
      })

      // Sort products by view count
      const sortedProducts = products.sort((a, b) => {
        const aViews = popularProducts.find(p => p.productId === a.id)?._count.productId || 0
        const bViews = popularProducts.find(p => p.productId === b.id)?._count.productId || 0
        return bViews - aViews
      })

      return sortedProducts
    } catch (error) {
      console.error('Failed to get popular products:', error)
      return []
    }
  }

  static async getViewAnalytics(days: number = 30): Promise<{
    totalViews: number
    uniqueProducts: number
    uniqueUsers: number
    topProducts: { productId: string; views: number }[]
  }> {
    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      const [totalViews, uniqueProducts, uniqueUsers, topProducts] = await Promise.all([
        db.productView.count({
          where: {
            viewedAt: { gte: startDate }
          }
        }),
        db.productView.groupBy({
          by: ['productId'],
          where: {
            viewedAt: { gte: startDate }
          }
        }).then(result => result.length),
        db.productView.groupBy({
          by: ['userId'],
          where: {
            viewedAt: { gte: startDate },
            userId: { not: null }
          }
        }).then(result => result.length),
        db.productView.groupBy({
          by: ['productId'],
          where: {
            viewedAt: { gte: startDate }
          },
          _count: {
            productId: true
          },
          orderBy: {
            _count: {
              productId: 'desc'
            }
          },
          take: 10
        })
      ])

      return {
        totalViews,
        uniqueProducts,
        uniqueUsers,
        topProducts: topProducts.map(p => ({
          productId: p.productId,
          views: p._count.productId
        }))
      }
    } catch (error) {
      console.error('Failed to get view analytics:', error)
      return {
        totalViews: 0,
        uniqueProducts: 0,
        uniqueUsers: 0,
        topProducts: []
      }
    }
  }

  static async clearUserHistory(userId: string): Promise<void> {
    try {
      await db.productView.deleteMany({
        where: { userId }
      })
    } catch (error) {
      console.error('Failed to clear user history:', error)
    }
  }

  static async clearSessionHistory(sessionId: string): Promise<void> {
    try {
      await db.productView.deleteMany({
        where: { sessionId }
      })
    } catch (error) {
      console.error('Failed to clear session history:', error)
    }
  }
}




