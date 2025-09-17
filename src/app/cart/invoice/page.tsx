'use client'

import { useEffect } from 'react'
import { useCartStore, formatCurrency } from '@/store/cart-store'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CartInvoicePage() {
  const { items, subtotal, tax, shipping, total, calculateTotals } = useCartStore()
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'OmoOniBag'
  const storeEmail = process.env.NEXT_PUBLIC_STORE_EMAIL || 'hello@omo-oni-bag.com'
  const storePhone = process.env.NEXT_PUBLIC_SALES_WHATSAPP || '2349061819572'
  const storeAddress = process.env.NEXT_PUBLIC_STORE_ADDRESS || 'Osogbo, Osun State, Nigeria'

  useEffect(() => {
    calculateTotals()
  }, [items, calculateTotals])

  return (
    <div className="min-h-screen bg-white text-ink">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-serif font-semibold">Invoice</h1>
          <div className="flex gap-2">
            <Button onClick={() => window.print()} className="bg-gold text-ink">Print / Save PDF</Button>
            <Link href="/cart">
              <Button variant="outline" className="border-gold text-gold">Back to Cart</Button>
            </Link>
          </div>
        </div>

        <div className="bg-white border border-gold/20 rounded-lg p-6">
          <div className="flex justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">{storeName}</h2>
              <p className="text-sm text-ink/60">{storeEmail} • {storePhone}</p>
              <p className="text-sm text-ink/60">{storeAddress}</p>
            </div>
            <div className="text-right text-sm text-ink/60">
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>Invoice #: CART-{Date.now()}</p>
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/20">
                <th className="text-left py-2">Item</th>
                <th className="text-left py-2">Options</th>
                <th className="text-right py-2">Qty</th>
                <th className="text-right py-2">Price</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={`${item.id}-${item.color}-${item.size}`} className="border-b border-gold/10">
                  <td className="py-2 pr-2">{item.name}</td>
                  <td className="py-2 pr-2 text-ink/60">
                    {item.color ? `Color: ${item.color}` : ''}
                    {item.size ? `${item.color ? ' • ' : ''}Size: ${item.size}` : ''}
                  </td>
                  <td className="py-2 text-right">{item.quantity}</td>
                  <td className="py-2 text-right">{formatCurrency(item.price)}</td>
                  <td className="py-2 text-right">{formatCurrency(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex flex-col items-end gap-1 text-sm">
            <div className="flex justify-between w-full max-w-sm">
              <span className="text-ink/70">Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between w-full max-w-sm">
              <span className="text-ink/70">Tax</span>
              <span className="font-medium">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between w-full max-w-sm">
              <span className="text-ink/70">Shipping</span>
              <span className="font-medium">{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between w-full max-w-sm text-base font-semibold border-t border-gold/20 pt-2 mt-2">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


