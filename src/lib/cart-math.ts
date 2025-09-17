import type { CartItem } from '@/types/cart'

export const TAX_RATE = 0.075 // 7.5%
export const FREE_SHIPPING_THRESHOLD = 50000
export const STANDARD_SHIPPING = 2500

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function calculateDiscount(subtotal: number, appliedCoupon?: { type: 'percentage' | 'fixed'; discount: number } | undefined): number {
  if (!appliedCoupon) return 0
  return appliedCoupon.type === 'percentage'
    ? subtotal * (appliedCoupon.discount / 100)
    : appliedCoupon.discount
}

export function calculateShipping(discountedSubtotal: number): number {
  return discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING
}

export function calculateTax(discountedSubtotal: number): number {
  return discountedSubtotal * TAX_RATE
}

export function calculateTotals(
  items: CartItem[],
  appliedCoupon?: { type: 'percentage' | 'fixed'; discount: number } | undefined
) {
  const subtotal = calculateSubtotal(items)
  const discount = calculateDiscount(subtotal, appliedCoupon)
  const discountedSubtotal = Math.max(0, subtotal - discount)
  const shipping = calculateShipping(discountedSubtotal)
  const taxRaw = calculateTax(discountedSubtotal)
  const tax = Math.round(taxRaw)
  const total = Math.round(discountedSubtotal + taxRaw + shipping)
  return { subtotal, tax, shipping, total }
}


