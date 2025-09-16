import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types/cart'
import { Address } from './auth-store'

export interface Order {
  id: string
  orderNumber: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  items: CartItem[]
  
  // Pricing
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  
  // Addresses
  shippingAddress: Address
  billingAddress: Address
  
  // Payment
  paymentMethod: 'card' | 'bank_transfer' | 'paystack' | 'flutterwave'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentReference?: string
  
  // Shipping
  shippingMethod: ShippingMethod
  estimatedDelivery: string
  trackingNumber?: string
  
  // Timestamps
  createdAt: string
  updatedAt: string
  deliveredAt?: string
  
  // Additional info
  notes?: string
  customerEmail: string
  customerPhone: string
}

export interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
  estimatedDays: string
  carrier?: string
  features?: string[]
}

export interface OrderTracking {
  orderId: string
  trackingNumber: string
  status: Order['status']
  events: TrackingEvent[]
}

export interface TrackingEvent {
  id: string
  timestamp: string
  status: string
  description: string
  location?: string
}

export interface PaymentData {
  method: Order['paymentMethod']
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardName?: string
  bankCode?: string
  accountNumber?: string
}

interface OrderState {
  orders: Order[]
  currentOrder: Order | null
  isLoading: boolean
  error: string | null
  
  // Checkout state
  checkoutStep: 'shipping' | 'payment' | 'review' | 'complete'
  selectedShippingMethod: ShippingMethod | null
  selectedPaymentMethod: Order['paymentMethod'] | null
  paymentData: PaymentData | null
  
  // Available options
  shippingMethods: ShippingMethod[]
}

interface OrderActions {
  // Order management
  createOrder: (orderData: CreateOrderData) => Promise<Order>
  getOrder: (orderId: string) => Order | undefined
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>
  cancelOrder: (orderId: string) => Promise<void>
  
  // Order tracking
  trackOrder: (trackingNumber: string) => Promise<OrderTracking>
  
  // Checkout flow
  setCheckoutStep: (step: OrderState['checkoutStep']) => void
  selectShippingMethod: (method: ShippingMethod) => void
  selectPaymentMethod: (method: Order['paymentMethod']) => void
  setPaymentData: (data: PaymentData) => void
  
  // Payment processing
  processPayment: (paymentData: PaymentData) => Promise<{ success: boolean; reference?: string }>
  
  // Utilities
  calculateOrderTotal: (items: CartItem[], shipping: number, tax?: number, discount?: number) => number
  generateOrderNumber: () => string
  
  // Error handling
  clearError: () => void
}

export interface CreateOrderData {
  items: CartItem[]
  shippingAddress: Address
  billingAddress: Address
  shippingMethod: ShippingMethod
  paymentMethod: Order['paymentMethod']
  paymentData: PaymentData
  notes?: string
  customerEmail: string
  customerPhone: string
}

// Mock shipping methods
const defaultShippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    description: 'Delivery within Lagos (5-7 business days)',
    price: 2000,
    estimatedDays: '5-7 business days',
    carrier: 'GIG Logistics'
  },
  {
    id: 'express',
    name: 'Express Delivery',
    description: 'Delivery within Lagos (2-3 business days)',
    price: 3500,
    estimatedDays: '2-3 business days',
    carrier: 'DHL'
  },
  {
    id: 'next_day',
    name: 'Next Day Delivery',
    description: 'Delivery within Lagos (1 business day)',
    price: 5000,
    estimatedDays: '1 business day',
    carrier: 'FedEx'
  },
  {
    id: 'interstate',
    name: 'Interstate Delivery',
    description: 'Delivery outside Lagos (7-14 business days)',
    price: 4000,
    estimatedDays: '7-14 business days',
    carrier: 'GIG Logistics'
  }
]

// Mock API functions
const mockApiCall = <T>(data: T, delay = 1000): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.9) {
        reject(new Error('Network error occurred'))
        return
      }
      resolve(data)
    }, delay)
  })
}

const generateId = () => Math.random().toString(36).substr(2, 9)

export const useOrderStore = create<OrderState & OrderActions>()(
  persist(
    (set, get) => ({
      // Initial state
      orders: [],
      currentOrder: null,
      isLoading: false,
      error: null,
      checkoutStep: 'shipping',
      selectedShippingMethod: null,
      selectedPaymentMethod: null,
      paymentData: null,
      shippingMethods: defaultShippingMethods,

      // Order management
      createOrder: async (orderData: CreateOrderData) => {
        set({ isLoading: true, error: null })

        try {
          const orderId = generateId()
          const orderNumber = get().generateOrderNumber()
          
          const subtotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          const shipping = orderData.shippingMethod.price
          const tax = Math.round(subtotal * 0.075) // 7.5% VAT
          const total = subtotal + shipping + tax

          const newOrder: Order = {
            id: orderId,
            orderNumber,
            status: 'pending',
            items: orderData.items,
            subtotal,
            shipping,
            tax,
            discount: 0,
            total,
            shippingAddress: orderData.shippingAddress,
            billingAddress: orderData.billingAddress,
            paymentMethod: orderData.paymentMethod,
            paymentStatus: 'pending',
            shippingMethod: orderData.shippingMethod,
            estimatedDelivery: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            notes: orderData.notes,
            customerEmail: orderData.customerEmail,
            customerPhone: orderData.customerPhone
          }

          await mockApiCall(newOrder)

          const orders = get().orders
          set({
            orders: [newOrder, ...orders],
            currentOrder: newOrder,
            isLoading: false,
            checkoutStep: 'complete'
          })

          return newOrder
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to create order'
          })
          throw error
        }
      },

      getOrder: (orderId: string) => {
        const orders = get().orders
        return orders.find(order => order.id === orderId)
      },

      updateOrderStatus: async (orderId: string, status: Order['status']) => {
        set({ isLoading: true, error: null })

        try {
          await mockApiCall({ success: true })

          const orders = get().orders
          const updatedOrders = orders.map(order => 
            order.id === orderId 
              ? { 
                  ...order, 
                  status, 
                  updatedAt: new Date().toISOString(),
                  deliveredAt: status === 'delivered' ? new Date().toISOString() : order.deliveredAt
                }
              : order
          )

          set({
            orders: updatedOrders,
            isLoading: false
          })
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to update order'
          })
        }
      },

      cancelOrder: async (orderId: string) => {
        await get().updateOrderStatus(orderId, 'cancelled')
      },

      // Order tracking
      trackOrder: async (trackingNumber: string) => {
        set({ isLoading: true, error: null })

        try {
          const mockTracking: OrderTracking = {
            orderId: generateId(),
            trackingNumber,
            status: 'shipped',
            events: [
              {
                id: '1',
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'Order Confirmed',
                description: 'Your order has been confirmed and is being prepared'
              },
              {
                id: '2',
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'In Transit',
                description: 'Your order is on its way',
                location: 'Lagos, Nigeria'
              },
              {
                id: '3',
                timestamp: new Date().toISOString(),
                status: 'Out for Delivery',
                description: 'Your order is out for delivery',
                location: 'Your City'
              }
            ]
          }

          await mockApiCall(mockTracking)

          set({ isLoading: false })
          return mockTracking
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to track order'
          })
          throw error
        }
      },

      // Checkout flow
      setCheckoutStep: (step) => {
        set({ checkoutStep: step })
      },

      selectShippingMethod: (method) => {
        set({ selectedShippingMethod: method })
      },

      selectPaymentMethod: (method) => {
        set({ selectedPaymentMethod: method })
      },

      setPaymentData: (data) => {
        set({ paymentData: data })
      },

      // Payment processing
      processPayment: async (paymentData: PaymentData) => {
        set({ isLoading: true, error: null })

        try {
          // Mock payment processing
          const paymentResult = {
            success: true,
            reference: `PAY_${generateId().toUpperCase()}`
          }

          await mockApiCall(paymentResult, 2000)

          set({ isLoading: false })
          return paymentResult
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Payment processing failed'
          })
          return { success: false }
        }
      },

      // Utilities
      calculateOrderTotal: (items, shipping, tax = 0, discount = 0) => {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        return subtotal + shipping + tax - discount
      },

      generateOrderNumber: () => {
        const timestamp = Date.now().toString().slice(-6)
        const random = Math.random().toString(36).substr(2, 4).toUpperCase()
        return `OMO${timestamp}${random}`
      },

      clearError: () => {
        set({ error: null })
      }
    }),
    {
      name: 'order-storage',
      partialize: (state) => ({
        orders: state.orders
      })
    }
  )
)



