import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartStore, CartItem } from '@/types/cart'

const TAX_RATE = 0.075 // 7.5% tax rate
const FREE_SHIPPING_THRESHOLD = 50000 // ₦50,000 for free shipping
const STANDARD_SHIPPING = 2500 // ₦2,500 standard shipping

// Available coupons (in real app, this would come from API)
const AVAILABLE_COUPONS = {
  'WELCOME10': { discount: 10, type: 'percentage' as const },
  'FREESHIP': { discount: 2500, type: 'fixed' as const },
  'NEWCUSTOMER': { discount: 15, type: 'percentage' as const },
  'LUXURY20': { discount: 20, type: 'percentage' as const },
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isOpen: false,
      isLoading: false,
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      appliedCoupon: undefined,

      // Cart management actions
      addItem: (newItem) => {
        const { items } = get()
        const quantity = newItem.quantity || 1
        
        // Create unique identifier including color and size
        const itemKey = `${newItem.id}-${newItem.color || 'default'}-${newItem.size || 'default'}`
        
        // Check if item already exists
        const existingItemIndex = items.findIndex(
          item => `${item.id}-${item.color || 'default'}-${item.size || 'default'}` === itemKey
        )

        let updatedItems: CartItem[]

        if (existingItemIndex >= 0) {
          // Update quantity of existing item
          updatedItems = items.map((item, index) => {
            if (index === existingItemIndex) {
              const newQuantity = Math.min(
                item.quantity + quantity,
                item.maxQuantity || 99
              )
              return { ...item, quantity: newQuantity }
            }
            return item
          })
        } else {
          // Add new item
          const cartItem: CartItem = {
            ...newItem,
            quantity: Math.min(quantity, newItem.maxQuantity || 99)
          }
          updatedItems = [...items, cartItem]
        }

        set({ items: updatedItems })
        get().calculateTotals()
        get().saveCart()
      },

      removeItem: (id, color, size) => {
        const { items } = get()
        const itemKey = `${id}-${color || 'default'}-${size || 'default'}`
        
        const updatedItems = items.filter(
          item => `${item.id}-${item.color || 'default'}-${item.size || 'default'}` !== itemKey
        )

        set({ items: updatedItems })
        get().calculateTotals()
        get().saveCart()
      },

      updateQuantity: (id, quantity, color, size) => {
        if (quantity <= 0) {
          get().removeItem(id, color, size)
          return
        }

        const { items } = get()
        const itemKey = `${id}-${color || 'default'}-${size || 'default'}`
        
        const updatedItems = items.map(item => {
          if (`${item.id}-${item.color || 'default'}-${item.size || 'default'}` === itemKey) {
            return {
              ...item,
              quantity: Math.min(quantity, item.maxQuantity || 99)
            }
          }
          return item
        })

        set({ items: updatedItems })
        get().calculateTotals()
        get().saveCart()
      },

      clearCart: () => {
        set({ 
          items: [], 
          appliedCoupon: undefined,
          subtotal: 0,
          tax: 0,
          shipping: 0,
          total: 0
        })
        get().saveCart()
      },

      // Cart drawer actions
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),

      // Calculations
      calculateTotals: () => {
        const { items, appliedCoupon } = get()
        
        // Calculate subtotal
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        
        // Apply coupon discount
        let discountAmount = 0
        if (appliedCoupon) {
          if (appliedCoupon.type === 'percentage') {
            discountAmount = subtotal * (appliedCoupon.discount / 100)
          } else {
            discountAmount = appliedCoupon.discount
          }
        }
        
        const discountedSubtotal = Math.max(0, subtotal - discountAmount)
        
        // Calculate shipping
        const shipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING
        
        // Calculate tax
        const tax = discountedSubtotal * TAX_RATE
        
        // Calculate total
        const total = discountedSubtotal + tax + shipping

        set({
          subtotal,
          tax: Math.round(tax),
          shipping,
          total: Math.round(total)
        })
      },

      // Coupon actions
      applyCoupon: async (code) => {
        const coupon = AVAILABLE_COUPONS[code.toUpperCase() as keyof typeof AVAILABLE_COUPONS]
        
        if (!coupon) {
          return false
        }

        set({
          appliedCoupon: {
            code: code.toUpperCase(),
            discount: coupon.discount,
            type: coupon.type
          }
        })
        
        get().calculateTotals()
        get().saveCart()
        return true
      },

      removeCoupon: () => {
        set({ appliedCoupon: undefined })
        get().calculateTotals()
        get().saveCart()
      },

      // Persistence actions
      loadCart: () => {
        // This will be handled by the persist middleware
        get().calculateTotals()
      },

      saveCart: () => {
        // This will be handled by the persist middleware
      },
    }),
    {
      name: 'omoonibag-cart',
      partialize: (state) => ({
        items: state.items,
        appliedCoupon: state.appliedCoupon,
      }),
    }
  )
)

// Helper functions
export const useCartItemCount = () => {
  return useCartStore(state => state.items.reduce((count, item) => count + item.quantity, 0))
}

export const useCartTotal = () => {
  return useCartStore(state => state.total)
}

export const useCartSubtotal = () => {
  return useCartStore(state => state.subtotal)
}

export const getCartItemKey = (item: CartItem) => {
  return `${item.id}-${item.color || 'default'}-${item.size || 'default'}`
}

// Format currency helper
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}






