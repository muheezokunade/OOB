'use client'

import { useState } from 'react'
import { X, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react'
import { useShopStore, getUniqueValues } from '@/store/shop-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { formatCurrency } from '@/store/cart-store'
import { cn } from '@/lib/utils'
import { Product } from '@/data/products'

interface FilterSidebarProps {
  allProducts: Product[]
  isOpen: boolean
  onClose: () => void
}

export function FilterSidebar({ allProducts, isOpen, onClose }: FilterSidebarProps) {
  const {
    filters,
    setFilter,
    updatePriceRange,
    toggleColor,
    toggleSize,
    toggleMaterial,
    resetFilters,
    totalResults
  } = useShopStore()

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    colors: true,
    sizes: true,
    materials: true,
    status: true
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Get unique values for filters
  const availableColors = getUniqueValues(allProducts, 'colors')
  const availableSizes = getUniqueValues(allProducts, 'sizes').filter(Boolean)
  const availableMaterials = getUniqueValues(allProducts, 'materials')

  // Count active filters
  const activeFilterCount = 
    filters.colors.length +
    filters.sizes.length +
    filters.materials.length +
    (filters.inStock ? 1 : 0) +
    (filters.onSale ? 1 : 0) +
    (filters.isNew ? 1 : 0) +
    (filters.isBestSeller ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < filters.maxPrice ? 1 : 0)

  const handlePriceChange = (value: number[]) => {
    updatePriceRange(value[0], value[1])
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 bg-gradient-to-b from-cream to-fog border-r border-gold/20 shadow-xl lg:shadow-none z-50 lg:z-auto transition-transform duration-300 overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold/20 lg:hidden">
          <div>
            <h2 className="text-lg font-serif font-semibold text-ink">Filters</h2>
            <p className="text-sm text-ink/60">{totalResults} products found</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block p-6 border-b border-gold/20">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-semibold text-ink">Filters</h2>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-ink/60 hover:text-ink"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset ({activeFilterCount})
              </Button>
            )}
          </div>
          <p className="text-sm text-ink/60 mt-1">{totalResults} products found</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Price Range */}
          <Card className="bg-white/50 border-gold/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-ink">Price Range</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection('price')}
                  className="p-1 h-auto"
                >
                  {expandedSections.price ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            {expandedSections.price && (
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={handlePriceChange}
                    max={filters.maxPrice}
                    min={0}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-ink/70">
                    <span>{formatCurrency(filters.priceRange[0])}</span>
                    <span>{formatCurrency(filters.priceRange[1])}</span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Colors */}
          {availableColors.length > 0 && (
            <Card className="bg-white/50 border-gold/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-ink">
                    Colors {filters.colors.length > 0 && `(${filters.colors.length})`}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection('colors')}
                    className="p-1 h-auto"
                  >
                    {expandedSections.colors ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {expandedSections.colors && (
                <CardContent className="pt-0">
                  <div className="grid grid-cols-4 gap-2">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={cn(
                          "w-10 h-10 rounded-full border-2 transition-all relative",
                          filters.colors.includes(color)
                            ? "border-gold shadow-lg scale-110"
                            : "border-stone hover:border-gold/50"
                        )}
                        style={{ backgroundColor: color }}
                        title={color}
                      >
                        {filters.colors.includes(color) && (
                          <div className="absolute inset-0 rounded-full border-2 border-white/50" />
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          )}

          {/* Sizes */}
          {availableSizes.length > 0 && (
            <Card className="bg-white/50 border-gold/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-ink">
                    Sizes {filters.sizes.length > 0 && `(${filters.sizes.length})`}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection('sizes')}
                    className="p-1 h-auto"
                  >
                    {expandedSections.sizes ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {expandedSections.sizes && (
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={cn(
                          "px-3 py-1 rounded-md border text-sm font-medium transition-all",
                          filters.sizes.includes(size)
                            ? "border-gold bg-gold text-ink"
                            : "border-stone text-ink hover:border-gold"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          )}

          {/* Materials */}
          {availableMaterials.length > 0 && (
            <Card className="bg-white/50 border-gold/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-ink">
                    Materials {filters.materials.length > 0 && `(${filters.materials.length})`}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection('materials')}
                    className="p-1 h-auto"
                  >
                    {expandedSections.materials ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {expandedSections.materials && (
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {availableMaterials.map((material) => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox
                          id={`material-${material}`}
                          checked={filters.materials.includes(material)}
                          onCheckedChange={() => toggleMaterial(material)}
                        />
                        <label
                          htmlFor={`material-${material}`}
                          className="text-sm text-ink cursor-pointer"
                        >
                          {material}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          )}

          {/* Product Status */}
          <Card className="bg-white/50 border-gold/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-ink">Product Status</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection('status')}
                  className="p-1 h-auto"
                >
                  {expandedSections.status ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            {expandedSections.status && (
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="in-stock"
                      checked={filters.inStock}
                      onCheckedChange={(checked) => setFilter('inStock', !!checked)}
                    />
                    <label htmlFor="in-stock" className="text-sm text-ink cursor-pointer">
                      In Stock Only
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="on-sale"
                      checked={filters.onSale}
                      onCheckedChange={(checked) => setFilter('onSale', !!checked)}
                    />
                    <label htmlFor="on-sale" className="text-sm text-ink cursor-pointer">
                      On Sale
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="new-arrivals"
                      checked={filters.isNew}
                      onCheckedChange={(checked) => setFilter('isNew', !!checked)}
                    />
                    <label htmlFor="new-arrivals" className="text-sm text-ink cursor-pointer">
                      New Arrivals
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="best-sellers"
                      checked={filters.isBestSeller}
                      onCheckedChange={(checked) => setFilter('isBestSeller', !!checked)}
                    />
                    <label htmlFor="best-sellers" className="text-sm text-ink cursor-pointer">
                      Best Sellers
                    </label>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden p-6 border-t border-gold/20 bg-white/80 backdrop-blur-sm">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-gold/30 text-gold hover:bg-gold hover:text-ink"
              onClick={resetFilters}
            >
              Reset
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold"
              onClick={onClose}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

