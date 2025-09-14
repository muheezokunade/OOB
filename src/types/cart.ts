export interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  subcategory: string
  color?: string
  size?: string
  quantity: number
  maxQuantity?: number
  inStock: boolean
  isPreOrder?: boolean
  estimatedDelivery?: string
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
  isLoading: boolean
  subtotal: number
  tax: number
  shipping: number
  total: number
  appliedCoupon?: {
    code: string
    discount: number
    type: 'percentage' | 'fixed'
  }
}

export interface CartActions {
  // Cart management
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string, color?: string, size?: string) => void
  updateQuantity: (id: string, quantity: number, color?: string, size?: string) => void
  clearCart: () => void
  
  // Cart drawer
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  
  // Calculations
  calculateTotals: () => void
  
  // Coupons
  applyCoupon: (code: string) => Promise<boolean>
  removeCoupon: () => void
  
  // Persistence
  loadCart: () => void
  saveCart: () => void
}

export type CartStore = CartState & CartActions

export interface ShippingOption {
  id: string
  name: string
  description: string
  price: number
  estimatedDays: string
  icon: string
}

export interface PaymentMethod {
  id: string
  name: string
  type: 'card' | 'bank' | 'digital'
  icon: string
  description?: string
}



