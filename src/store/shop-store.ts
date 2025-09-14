import { create } from 'zustand'
import { Product } from '@/data/products'

export interface FilterState {
  // Category/Subcategory
  category?: string
  subcategory?: string
  
  // Price
  priceRange: [number, number]
  maxPrice: number
  
  // Attributes
  colors: string[]
  sizes: string[]
  materials: string[]
  
  // Status
  inStock: boolean
  onSale: boolean
  isNew: boolean
  isBestSeller: boolean
  
  // Search
  searchQuery: string
}

export interface SortOption {
  value: string
  label: string
  field: keyof Product | 'relevance'
  direction: 'asc' | 'desc'
}

export const sortOptions: SortOption[] = [
  { value: 'relevance', label: 'Relevance', field: 'relevance', direction: 'desc' },
  { value: 'newest', label: 'Newest First', field: 'isNew', direction: 'desc' },
  { value: 'price-low', label: 'Price: Low to High', field: 'price', direction: 'asc' },
  { value: 'price-high', label: 'Price: High to Low', field: 'price', direction: 'desc' },
  { value: 'name-asc', label: 'Name: A to Z', field: 'name', direction: 'asc' },
  { value: 'name-desc', label: 'Name: Z to A', field: 'name', direction: 'desc' },
  { value: 'popularity', label: 'Most Popular', field: 'isBestSeller', direction: 'desc' }
]

interface ShopState {
  // Filters
  filters: FilterState
  activeSort: string
  
  // Pagination
  currentPage: number
  itemsPerPage: number
  
  // UI State
  isFiltersOpen: boolean
  viewMode: 'grid' | 'list'
  
  // Results
  filteredProducts: Product[]
  totalPages: number
  totalResults: number
}

interface ShopActions {
  // Filter actions
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  updatePriceRange: (min: number, max: number) => void
  toggleColor: (color: string) => void
  toggleSize: (size: string) => void
  toggleMaterial: (material: string) => void
  resetFilters: () => void
  
  // Search
  setSearchQuery: (query: string) => void
  
  // Sort
  setSort: (sortValue: string) => void
  
  // Pagination
  setPage: (page: number) => void
  setItemsPerPage: (count: number) => void
  
  // UI
  toggleFilters: () => void
  setViewMode: (mode: 'grid' | 'list') => void
  
  // Filter products
  filterProducts: (allProducts: Product[]) => void
}

const initialFilters: FilterState = {
  priceRange: [0, 100000],
  maxPrice: 100000,
  colors: [],
  sizes: [],
  materials: [],
  inStock: false,
  onSale: false,
  isNew: false,
  isBestSeller: false,
  searchQuery: ''
}

export const useShopStore = create<ShopState & ShopActions>((set, get) => ({
  // Initial state
  filters: initialFilters,
  activeSort: 'relevance',
  currentPage: 1,
  itemsPerPage: 12,
  isFiltersOpen: false,
  viewMode: 'grid',
  filteredProducts: [],
  totalPages: 0,
  totalResults: 0,

  // Filter actions
  setFilter: (key, value) => {
    set(state => ({
      filters: { ...state.filters, [key]: value },
      currentPage: 1 // Reset to first page when filters change
    }))
  },

  updatePriceRange: (min, max) => {
    set(state => ({
      filters: { ...state.filters, priceRange: [min, max] },
      currentPage: 1
    }))
  },

  toggleColor: (color) => {
    set(state => {
      const colors = state.filters.colors.includes(color)
        ? state.filters.colors.filter(c => c !== color)
        : [...state.filters.colors, color]
      
      return {
        filters: { ...state.filters, colors },
        currentPage: 1
      }
    })
  },

  toggleSize: (size) => {
    set(state => {
      const sizes = state.filters.sizes.includes(size)
        ? state.filters.sizes.filter(s => s !== size)
        : [...state.filters.sizes, size]
      
      return {
        filters: { ...state.filters, sizes },
        currentPage: 1
      }
    })
  },

  toggleMaterial: (material) => {
    set(state => {
      const materials = state.filters.materials.includes(material)
        ? state.filters.materials.filter(m => m !== material)
        : [...state.filters.materials, material]
      
      return {
        filters: { ...state.filters, materials },
        currentPage: 1
      }
    })
  },

  resetFilters: () => {
    set({
      filters: { ...initialFilters, maxPrice: get().filters.maxPrice },
      currentPage: 1
    })
  },

  // Search
  setSearchQuery: (query) => {
    set(state => ({
      filters: { ...state.filters, searchQuery: query },
      currentPage: 1
    }))
  },

  // Sort
  setSort: (sortValue) => {
    set({ activeSort: sortValue, currentPage: 1 })
  },

  // Pagination
  setPage: (page) => {
    set({ currentPage: page })
  },

  setItemsPerPage: (count) => {
    set({ itemsPerPage: count, currentPage: 1 })
  },

  // UI
  toggleFilters: () => {
    set(state => ({ isFiltersOpen: !state.isFiltersOpen }))
  },

  setViewMode: (mode) => {
    set({ viewMode: mode })
  },

  // Filter products
  filterProducts: (allProducts) => {
    const { filters, activeSort, currentPage, itemsPerPage } = get()
    
    let filtered = allProducts.filter(product => {
      // Category filter
      if (filters.category && product.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false
      }
      
      // Subcategory filter
      if (filters.subcategory && product.subcategory.toLowerCase() !== filters.subcategory.toLowerCase()) {
        return false
      }
      
      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }
      
      // Color filter
      if (filters.colors.length > 0 && !filters.colors.some(color => 
        product.colors.some(productColor => productColor.toLowerCase().includes(color.toLowerCase()))
      )) {
        return false
      }
      
      // Size filter
      if (filters.sizes.length > 0 && product.sizes && !filters.sizes.some(size =>
        product.sizes!.includes(size)
      )) {
        return false
      }
      
      // Material filter
      if (filters.materials.length > 0 && !filters.materials.some(material =>
        product.materials.some(productMaterial => 
          productMaterial.toLowerCase().includes(material.toLowerCase())
        )
      )) {
        return false
      }
      
      // Status filters
      if (filters.inStock && product.isOutOfStock) {
        return false
      }
      
      if (filters.onSale && (!product.originalPrice || product.originalPrice <= product.price)) {
        return false
      }
      
      if (filters.isNew && !product.isNew) {
        return false
      }
      
      if (filters.isBestSeller && !product.isBestSeller) {
        return false
      }
      
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const searchableText = [
          product.name,
          product.description,
          product.category,
          product.subcategory,
          ...product.materials,
          ...(product.tags || [])
        ].join(' ').toLowerCase()
        
        if (!searchableText.includes(query)) {
          return false
        }
      }
      
      return true
    })
    
    // Apply sorting
    const sortOption = sortOptions.find(option => option.value === activeSort)
    if (sortOption && sortOption.field !== 'relevance') {
      filtered.sort((a, b) => {
        const aValue = a[sortOption.field]
        const bValue = b[sortOption.field]
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOption.direction === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOption.direction === 'asc' 
            ? aValue - bValue
            : bValue - aValue
        }
        
        if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
          return sortOption.direction === 'asc'
            ? (aValue ? 1 : 0) - (bValue ? 1 : 0)
            : (bValue ? 1 : 0) - (aValue ? 1 : 0)
        }
        
        return 0
      })
    }
    
    // Calculate pagination
    const totalResults = filtered.length
    const totalPages = Math.ceil(totalResults / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedProducts = filtered.slice(startIndex, endIndex)
    
    set({
      filteredProducts: paginatedProducts,
      totalPages,
      totalResults
    })
  }
}))

// Helper functions
export const getUniqueValues = (products: Product[], field: keyof Product): string[] => {
  const values = new Set<string>()
  
  products.forEach(product => {
    const value = product[field]
    if (Array.isArray(value)) {
      value.forEach(v => values.add(v))
    } else if (typeof value === 'string') {
      values.add(value)
    }
  })
  
  return Array.from(values).sort()
}

export const getPriceRange = (products: Product[]): [number, number] => {
  if (products.length === 0) return [0, 100000]
  
  const prices = products.map(p => p.price)
  return [Math.min(...prices), Math.max(...prices)]
}



