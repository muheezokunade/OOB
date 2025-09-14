import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/data/products'

export interface WishlistItem {
  productId: string
  addedAt: string
  product?: Product
}

interface WishlistState {
  items: WishlistItem[]
  isLoading: boolean
  error: string | null
}

interface WishlistActions {
  addToWishlist: (productId: string) => Promise<void>
  removeFromWishlist: (productId: string) => Promise<void>
  toggleWishlist: (productId: string) => Promise<void>
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
  getWishlistCount: () => number
  loadWishlistProducts: (products: Product[]) => void
}

// Mock API function
const mockApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject(new Error('Network error occurred'))
        return
      }
      resolve(data)
    }, delay)
  })
}

export const useWishlistStore = create<WishlistState & WishlistActions>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isLoading: false,
      error: null,

      // Actions
      addToWishlist: async (productId: string) => {
        set({ isLoading: true, error: null })
        
        try {
          // Check if already in wishlist
          const items = get().items
          if (items.some(item => item.productId === productId)) {
            set({ isLoading: false })
            return
          }

          const newItem: WishlistItem = {
            productId,
            addedAt: new Date().toISOString()
          }

          await mockApiCall({ success: true })

          set({
            items: [...items, newItem],
            isLoading: false
          })
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to add to wishlist'
          })
        }
      },

      removeFromWishlist: async (productId: string) => {
        set({ isLoading: true, error: null })
        
        try {
          await mockApiCall({ success: true })

          const items = get().items
          const updatedItems = items.filter(item => item.productId !== productId)

          set({
            items: updatedItems,
            isLoading: false
          })
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to remove from wishlist'
          })
        }
      },

      toggleWishlist: async (productId: string) => {
        const isInWishlist = get().isInWishlist(productId)
        
        if (isInWishlist) {
          await get().removeFromWishlist(productId)
        } else {
          await get().addToWishlist(productId)
        }
      },

      clearWishlist: () => {
        set({ items: [], error: null })
      },

      isInWishlist: (productId: string) => {
        const items = get().items
        return items.some(item => item.productId === productId)
      },

      getWishlistCount: () => {
        return get().items.length
      },

      loadWishlistProducts: (products: Product[]) => {
        const items = get().items
        const itemsWithProducts = items.map(item => ({
          ...item,
          product: products.find(p => p.id === item.productId)
        }))

        set({ items: itemsWithProducts })
      }
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({
        items: state.items.map(item => ({
          productId: item.productId,
          addedAt: item.addedAt
        }))
      })
    }
  )
)