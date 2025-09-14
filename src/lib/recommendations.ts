import { db } from './db'

export interface Recommendation {
  product: any
  score: number
  reason: string
}

export class RecommendationService {
  static async getRecommendations(
    userId?: string,
    productId?: string,
    limit: number = 8
  ): Promise<Recommendation[]> {
    const recommendations: Recommendation[] = []

    // 1. Category-based recommendations
    if (productId) {
      const categoryRecs = await this.getCategoryRecommendations(productId, limit)
      recommendations.push(...categoryRecs)
    }

    // 2. User-based collaborative filtering
    if (userId) {
      const userRecs = await this.getUserBasedRecommendations(userId, limit)
      recommendations.push(...userRecs)
    }

    // 3. Popular products
    const popularRecs = await this.getPopularRecommendations(limit)
    recommendations.push(...popularRecs)

    // 4. Recently viewed based recommendations
    if (userId) {
      const recentRecs = await this.getRecentlyViewedRecommendations(userId, limit)
      recommendations.push(...recentRecs)
    }

    // Remove duplicates and sort by score
    const uniqueRecommendations = this.deduplicateRecommendations(recommendations)
    return uniqueRecommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }

  static async getCategoryRecommendations(
    productId: string,
    limit: number = 4
  ): Promise<Recommendation[]> {
    try {
      const product = await db.product.findUnique({
        where: { id: productId },
        select: { category: true, subcategory: true, tags: true }
      })

      if (!product) return []

      const recommendations = await db.product.findMany({
        where: {
          id: { not: productId },
          isActive: true,
          OR: [
            { category: product.category },
            { subcategory: product.subcategory },
            { tags: { hasSome: product.tags } }
          ]
        },
        include: {
          variants: true,
          reviews: {
            select: { rating: true }
          },
          _count: {
            select: { reviews: true }
          }
        },
        take: limit * 2 // Get more to filter later
      })

      return recommendations.map(rec => ({
        product: rec,
        score: this.calculateCategoryScore(rec, product),
        reason: `Similar to ${product.category} items`
      }))
    } catch (error) {
      console.error('Failed to get category recommendations:', error)
      return []
    }
  }

  static async getUserBasedRecommendations(
    userId: string,
    limit: number = 4
  ): Promise<Recommendation[]> {
    try {
      // Get user's order history
      const userOrders = await db.order.findMany({
        where: { userId },
        include: {
          items: {
            include: {
              product: {
                select: { category: true, subcategory: true, tags: true }
              }
            }
          }
        }
      })

      if (userOrders.length === 0) return []

      // Extract user preferences
      const userCategories = new Set<string>()
      const userTags = new Set<string>()
      const purchasedProducts = new Set<string>()

      userOrders.forEach(order => {
        order.items.forEach(item => {
          purchasedProducts.add(item.productId)
          userCategories.add(item.product.category)
          if (item.product.subcategory) {
            userCategories.add(item.product.subcategory)
          }
          item.product.tags.forEach(tag => userTags.add(tag))
        })
      })

      // Find products similar to user preferences
      const recommendations = await db.product.findMany({
        where: {
          id: { notIn: Array.from(purchasedProducts) },
          isActive: true,
          OR: [
            { category: { in: Array.from(userCategories) } },
            { tags: { hasSome: Array.from(userTags) } }
          ]
        },
        include: {
          variants: true,
          reviews: {
            select: { rating: true }
          },
          _count: {
            select: { reviews: true }
          }
        },
        take: limit * 2
      })

      return recommendations.map(rec => ({
        product: rec,
        score: this.calculateUserPreferenceScore(rec, userCategories, userTags),
        reason: 'Based on your preferences'
      }))
    } catch (error) {
      console.error('Failed to get user-based recommendations:', error)
      return []
    }
  }

  static async getPopularRecommendations(limit: number = 4): Promise<Recommendation[]> {
    try {
      const popularProducts = await db.product.findMany({
        where: {
          isActive: true,
          rating: { gte: 4.0 },
          reviewCount: { gte: 5 }
        },
        include: {
          variants: true,
          reviews: {
            select: { rating: true }
          },
          _count: {
            select: { reviews: true }
          }
        },
        orderBy: [
          { rating: 'desc' },
          { reviewCount: 'desc' }
        ],
        take: limit
      })

      return popularProducts.map(rec => ({
        product: rec,
        score: this.calculatePopularityScore(rec),
        reason: 'Popular choice'
      }))
    } catch (error) {
      console.error('Failed to get popular recommendations:', error)
      return []
    }
  }

  static async getRecentlyViewedRecommendations(
    userId: string,
    limit: number = 4
  ): Promise<Recommendation[]> {
    try {
      const recentViews = await db.productView.findMany({
        where: { userId },
        include: {
          product: {
            select: { category: true, subcategory: true, tags: true }
          }
        },
        orderBy: { viewedAt: 'desc' },
        take: 5
      })

      if (recentViews.length === 0) return []

      const recentCategories = new Set<string>()
      const recentTags = new Set<string>()

      recentViews.forEach(view => {
        recentCategories.add(view.product.category)
        if (view.product.subcategory) {
          recentCategories.add(view.product.subcategory)
        }
        view.product.tags.forEach(tag => recentTags.add(tag))
      })

      const viewedProductIds = recentViews.map(v => v.productId)

      const recommendations = await db.product.findMany({
        where: {
          id: { notIn: viewedProductIds },
          isActive: true,
          OR: [
            { category: { in: Array.from(recentCategories) } },
            { tags: { hasSome: Array.from(recentTags) } }
          ]
        },
        include: {
          variants: true,
          reviews: {
            select: { rating: true }
          },
          _count: {
            select: { reviews: true }
          }
        },
        take: limit
      })

      return recommendations.map(rec => ({
        product: rec,
        score: this.calculateRecentViewScore(rec, recentCategories, recentTags),
        reason: 'Based on your recent views'
      }))
    } catch (error) {
      console.error('Failed to get recently viewed recommendations:', error)
      return []
    }
  }

  static calculateCategoryScore(product: any, referenceProduct: any): number {
    let score = 0

    // Category match
    if (product.category === referenceProduct.category) score += 0.4
    if (product.subcategory === referenceProduct.subcategory) score += 0.3

    // Tag overlap
    const commonTags = product.tags.filter((tag: string) =>
      referenceProduct.tags.includes(tag)
    )
    score += (commonTags.length / referenceProduct.tags.length) * 0.3

    return Math.min(score, 1.0)
  }

  static calculateUserPreferenceScore(
    product: any,
    userCategories: Set<string>,
    userTags: Set<string>
  ): number {
    let score = 0

    // Category preference
    if (userCategories.has(product.category)) score += 0.4
    if (userCategories.has(product.subcategory)) score += 0.3

    // Tag preference
    const matchingTags = product.tags.filter((tag: string) => userTags.has(tag))
    score += (matchingTags.length / userTags.size) * 0.3

    return Math.min(score, 1.0)
  }

  static calculatePopularityScore(product: any): number {
    const rating = Number(product.rating) || 0
    const reviewCount = product.reviewCount || 0

    // Normalize rating (0-5 scale)
    const normalizedRating = rating / 5

    // Normalize review count (log scale)
    const normalizedReviews = Math.log10(reviewCount + 1) / 3

    return (normalizedRating * 0.7) + (normalizedReviews * 0.3)
  }

  static calculateRecentViewScore(
    product: any,
    recentCategories: Set<string>,
    recentTags: Set<string>
  ): number {
    let score = 0

    if (recentCategories.has(product.category)) score += 0.5
    if (recentCategories.has(product.subcategory)) score += 0.3

    const matchingTags = product.tags.filter((tag: string) => recentTags.has(tag))
    score += (matchingTags.length / recentTags.size) * 0.2

    return Math.min(score, 1.0)
  }

  static deduplicateRecommendations(recommendations: Recommendation[]): Recommendation[] {
    const seen = new Set<string>()
    const unique: Recommendation[] = []

    for (const rec of recommendations) {
      if (!seen.has(rec.product.id)) {
        seen.add(rec.product.id)
        unique.push(rec)
      }
    }

    return unique
  }

  static async getTrendingProducts(limit: number = 8): Promise<any[]> {
    try {
      // Get products with high view count in the last 7 days
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

      const trendingViews = await db.productView.groupBy({
        by: ['productId'],
        where: {
          viewedAt: { gte: sevenDaysAgo }
        },
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

      const productIds = trendingViews.map(t => t.productId)

      const products = await db.product.findMany({
        where: {
          id: { in: productIds },
          isActive: true
        },
        include: {
          variants: true,
          reviews: {
            select: { rating: true }
          },
          _count: {
            select: { reviews: true }
          }
        }
      })

      // Sort by view count
      return products.sort((a, b) => {
        const aViews = trendingViews.find(t => t.productId === a.id)?._count.productId || 0
        const bViews = trendingViews.find(t => t.productId === b.id)?._count.productId || 0
        return bViews - aViews
      })
    } catch (error) {
      console.error('Failed to get trending products:', error)
      return []
    }
  }
}


