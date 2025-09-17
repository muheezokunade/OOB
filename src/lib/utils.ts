import { type ClassValue, clsx } from "clsx"
import type { CartItem } from '@/types/cart'
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatWhatsAppMessage(productName: string, price: number): string {
  const message = `Hi! I'm interested in the ${productName} (${formatPrice(price)}). Can you tell me more about availability and delivery?`
  return encodeURIComponent(message)
}

export function getWhatsAppUrl(phone: string, message?: string): string {
  const envPhone = (process.env.NEXT_PUBLIC_SALES_WHATSAPP || '').trim()
  const effectivePhone = (envPhone || phone).replace(/\D/g, '')
  const baseUrl = `https://wa.me/${effectivePhone}`
  return message ? `${baseUrl}?text=${message}` : baseUrl
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj)
}

export function buildWhatsAppCartMessage(
  items: CartItem[],
  totals: { subtotal: number; tax: number; shipping: number; total: number }
): string {
  const lines: string[] = []
  lines.push('Hello! I would like to place an order with the following items:')
  lines.push('')
  if (items.length === 0) {
    lines.push('- (Cart is empty)')
  } else {
    for (const item of items) {
      const variantBits: string[] = []
      if (item.color) variantBits.push(`Color: ${item.color}`)
      if (item.size) variantBits.push(`Size: ${item.size}`)
      const variant = variantBits.length ? ` (${variantBits.join(', ')})` : ''
      lines.push(`• ${item.name}${variant} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`)
    }
  }
  lines.push('')
  lines.push(`Subtotal: ${formatPrice(totals.subtotal)}`)
  lines.push(`Tax: ${formatPrice(totals.tax)}`)
  lines.push(`Shipping: ${totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping)}`)
  lines.push(`Total: ${formatPrice(totals.total)}`)
  lines.push('')
  lines.push('Please advise on payment and delivery options. Thank you!')
  return encodeURIComponent(lines.join('\n'))
}

