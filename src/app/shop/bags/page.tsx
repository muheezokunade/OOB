'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, Grid3X3, List, SortAsc } from 'lucide-react'
import { getProductsByCategory, getPriceRange } from '@/data/products'
import { useShopStore, sortOptions } from '@/store/shop-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FilterSidebar } from '@/components/shop/filter-sidebar'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Pagination } from '@/components/ui/pagination'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

function BagsPageContent() {
  const searchParams = useSearchParams()
  // Get subcategory from URL path or search params
  const pathSegments = typeof window !== 'undefined' ? window.location.pathname.split('/') : []
  const subcategoryFromPath = pathSegments[pathSegments.indexOf('bags') + 1]
  const subcategory = subcategoryFromPath || searchParams.get('subcategory')
  
  const {
    filters,
    activeSort,
    currentPage,
    totalPages,
    totalResults,
    filteredProducts,
    isFiltersOpen,
    viewMode,
    setFilter,
    setSearchQuery,
    setSort,
    setPage,
    toggleFilters,
    setViewMode,
    filterProducts
  } = useShopStore()

  // Get all bags
  const allProducts = getProductsByCategory('Bags')
  
  // Set up initial filters
  useEffect(() => {
    setFilter('category', 'Bags')
    if (subcategory) {
      setFilter('subcategory', subcategory)
    } else {
      setFilter('subcategory', undefined)
    }
    
    // Set price range based on available products
    const [minPrice, maxPrice] = getPriceRange(allProducts)
    setFilter('maxPrice', maxPrice)
    setFilter('priceRange', [0, maxPrice])
  }, [subcategory, setFilter])

  // Filter products when filters change
  useEffect(() => {
    filterProducts(allProducts)
  }, [filters, activeSort, currentPage, filterProducts])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
  }

  const handleSortChange = (value: string) => {
    setSort(value)
  }

  const handlePageChange = (page: number) => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Shop', href: '/shop' },
    { label: 'Bags', href: '/shop/bags', isActive: !subcategory }
  ]

  if (subcategory) {
    breadcrumbItems.push({
      label: subcategory.charAt(0).toUpperCase() + subcategory.slice(1),
      href: `/shop/bags/${subcategory}`,
      isActive: true
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-serif font-semibold text-ink">
              {subcategory ? `${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} Bags` : 'Bags'}
            </h1>
            {(filters.isNew || filters.isBestSeller) && (
              <Badge variant="accent" className="text-xs">
                {filters.isNew && 'New Arrivals'}
                {filters.isBestSeller && 'Best Sellers'}
              </Badge>
            )}
          </div>
          <p className="text-ink/70 text-lg max-w-2xl">
            {subcategory 
              ? `Discover our collection of ${subcategory} bags, crafted with premium materials and attention to detail.`
              : 'Discover our complete collection of luxury bags, from everyday essentials to statement pieces.'
            }
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ink/40" />
            <Input
              placeholder="Search bags..."
              value={filters.searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 border-gold/20 focus:border-gold"
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center gap-3">
            {/* Filter Toggle (Mobile) */}
            <Button
              variant="outline"
              onClick={toggleFilters}
              className="lg:hidden border-gold/30 text-gold hover:bg-gold hover:text-ink"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : v === true) && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  Active
                </Badge>
              )}
            </Button>

            {/* Sort */}
            <Select value={activeSort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-48 border-gold/20 focus:border-gold">
                <SortAsc className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="hidden sm:flex border border-gold/20 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2",
                  viewMode === 'grid' 
                    ? "bg-gold text-ink hover:bg-gold/90" 
                    : "text-ink/60 hover:text-ink hover:bg-stone/30"
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2",
                  viewMode === 'list' 
                    ? "bg-gold text-ink hover:bg-gold/90" 
                    : "text-ink/60 hover:text-ink hover:bg-stone/30"
                )}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-ink/60">
            Showing {filteredProducts.length > 0 ? ((currentPage - 1) * 12) + 1 : 0}-
            {Math.min(currentPage * 12, totalResults)} of {totalResults} products
          </p>
          
          {totalPages > 1 && (
            <p className="text-sm text-ink/60">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar 
              allProducts={allProducts}
              isOpen={isFiltersOpen}
              onClose={() => {}}
            />
          </div>

          {/* Mobile Filter Sidebar */}
          <FilterSidebar 
            allProducts={allProducts}
            isOpen={isFiltersOpen}
            onClose={toggleFilters}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              /* No Results */
              <Card className="text-center py-16 bg-gradient-to-br from-white to-cream/30 border-gold/20">
                <CardContent>
                  <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-gold" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-ink mb-3">No products found</h3>
                  <p className="text-ink/60 mb-6">
                    Try adjusting your filters or search terms to find what you&apos;re looking for.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilter('searchQuery', '')
                      // Reset other filters while keeping category
                      setFilter('colors', [])
                      setFilter('sizes', [])
                      setFilter('materials', [])
                      setFilter('inStock', false)
                      setFilter('onSale', false)
                      setFilter('isNew', false)
                      setFilter('isBestSeller', false)
                    }}
                    className="border-gold/30 text-gold hover:bg-gold hover:text-ink"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Products Grid */}
                <div className={cn(
                  "grid gap-6 mb-8",
                  viewMode === 'grid'
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                )}>
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      variant={viewMode === 'list' ? 'compact' : 'default'}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="mt-8"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BagsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BagsPageContent />
    </Suspense>
  )
}
