import { type ClassValue, clsx } from "clsx"
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
  const baseUrl = `https://wa.me/${phone.replace(/\D/g, '')}`
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

