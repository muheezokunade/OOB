import { db } from './db'

export interface SearchFilters {
  query?: string
  category?: string
  subcategory?: string
  minPrice?: number
  maxPrice?: number
  colors?: string[]
  sizes?: string[]
  materials?: string[]
  tags?: string[]
  inStock?: boolean
  sortBy?: 'price-low' | 'price-high' | 'newest' | 'popular' | 'name' | 'rating'
  page?: number
  limit?: number
}

export interface SearchResult {
  products: any[]
  total: number
  page: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
  filters: SearchFilters
  suggestions?: string[]
}

export class ProductSearchService {
  static async search(filters: SearchFilters): Promise<SearchResult> {
    const {
      query,
      category,
      subcategory,
      minPrice,
      maxPrice,
      colors,
      sizes,
      materials,
      tags,
      inStock,
      sortBy = 'popular',
      page = 1,
      limit = 12
    } = filters

    // Build where clause
    const where: any = {
      isActive: true
    }

    // Text search
    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { tags: { has: query } },
        { category: { contains: query, mode: 'insensitive' } },
        { subcategory: { contains: query, mode: 'insensitive' } }
      ]
    }

    // Category filters
    if (category) {
      where.category = { equals: category, mode: 'insensitive' }
    }

    if (subcategory) {
      where.subcategory = { equals: subcategory, mode: 'insensitive' }
    }

    // Price filters
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {}
      if (minPrice !== undefined) where.price.gte = minPrice
      if (maxPrice !== undefined) where.price.lte = maxPrice
    }

    // Material filters
    if (materials && materials.length > 0) {
      where.materials = { hasSome: materials }
    }

    // Tag filters
    if (tags && tags.length > 0) {
      where.tags = { hasSome: tags }
    }

    // Stock filter
    if (inStock) {
      where.stock = { gt: 0 }
    }

    // Build orderBy clause
    let orderBy: any = {}
    switch (sortBy) {
      case 'price-low':
        orderBy = { price: 'asc' }
        break
      case 'price-high':
        orderBy = { price: 'desc' }
        break
      case 'newest':
        orderBy = { createdAt: 'desc' }
        break
      case 'popular':
        orderBy = { rating: 'desc' }
        break
      case 'name':
        orderBy = { name: 'asc' }
        break
      case 'rating':
        orderBy = { rating: 'desc' }
        break
      default:
        orderBy = { rating: 'desc' }
    }

    // Execute search
    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
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
      }),
      db.product.count({ where })
    ])

    // Filter by colors and sizes if specified
    let filteredProducts = products
    if (colors && colors.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.variants.some(variant =>
          colors.some(color => variant.color?.toLowerCase().includes(color.toLowerCase()))
        )
      )
    }

    if (sizes && sizes.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.variants.some(variant =>
          sizes.some(size => variant.size?.toLowerCase().includes(size.toLowerCase()))
        )
      )
    }

    // Generate search suggestions
    const suggestions = await this.generateSuggestions(query, category)

    // Log search query for analytics
    if (query) {
      await this.logSearchQuery(query, total)
    }

    return {
      products: filteredProducts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
      filters,
      suggestions
    }
  }

  static async generateSuggestions(query?: string, category?: string): Promise<string[]> {
    if (!query) return []

    const suggestions: string[] = []

    // Get product name suggestions
    const productSuggestions = await db.product.findMany({
      where: {
        name: { contains: query, mode: 'insensitive' },
        isActive: true
      },
      select: { name: true },
      take: 5
    })

    suggestions.push(...productSuggestions.map(p => p.name))

    // Get category suggestions
    const categorySuggestions = await db.product.findMany({
      where: {
        category: { contains: query, mode: 'insensitive' },
        isActive: true
      },
      select: { category: true },
      distinct: ['category'],
      take: 3
    })

    suggestions.push(...categorySuggestions.map(p => p.category))

    // Get tag suggestions
    const tagSuggestions = await db.product.findMany({
      where: {
        tags: { has: query },
        isActive: true
      },
      select: { tags: true },
      take: 10
    })

    const allTags = tagSuggestions.flatMap(p => p.tags)
    const uniqueTags = [...new Set(allTags)].filter(tag =>
      tag.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3)

    suggestions.push(...uniqueTags)

    return [...new Set(suggestions)].slice(0, 8)
  }

  static async logSearchQuery(query: string, results: number): Promise<void> {
    try {
      await db.searchQuery.create({
        data: {
          query,
          results
        }
      })
    } catch (error) {
      console.error('Failed to log search query:', error)
    }
  }

  static async getPopularSearches(limit: number = 10): Promise<{ query: string; count: number }[]> {
    const popularSearches = await db.searchQuery.groupBy({
      by: ['query'],
      _count: {
        query: true
      },
      orderBy: {
        _count: {
          query: 'desc'
        }
      },
      take: limit
    })

    return popularSearches.map(search => ({
      query: search.query,
      count: search._count.query
    }))
  }

  static async getSearchAnalytics(days: number = 30): Promise<{
    totalSearches: number
    uniqueQueries: number
    avgResults: number
    topQueries: { query: string; count: number }[]
  }> {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const [totalSearches, uniqueQueries, avgResults, topQueries] = await Promise.all([
      db.searchQuery.count({
        where: {
          createdAt: { gte: startDate }
        }
      }),
      db.searchQuery.groupBy({
        by: ['query'],
        where: {
          createdAt: { gte: startDate }
        }
      }).then(result => result.length),
      db.searchQuery.aggregate({
        where: {
          createdAt: { gte: startDate }
        },
        _avg: {
          results: true
        }
      }).then(result => result._avg.results || 0),
      this.getPopularSearches(10)
    ])

    return {
      totalSearches,
      uniqueQueries,
      avgResults: Math.round(avgResults),
      topQueries
    }
  }
}
