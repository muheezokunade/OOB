'use client'

import { useEffect } from 'react'
import { X, Plus, Minus, ShoppingBag, Truck, Gift } from 'lucide-react'
import { useCartStore, formatCurrency } from '@/store/cart-store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'

export function CartDrawer() {
  const {
    items,
    isOpen,
    subtotal,
    shipping,
    total,
    appliedCoupon,
    closeCart,
    updateQuantity,
    removeItem,
    calculateTotals
  } = useCartStore()

  // Calculate totals on mount and when items change
  useEffect(() => {
    calculateTotals()
  }, [items, calculateTotals])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, closeCart])

  const itemCount = items.reduce((count, item) => count + item.quantity, 0)
  const freeShippingThreshold = 50000
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div className={`
        fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-b from-cream to-fog 
        shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold/20 bg-gradient-to-r from-ink to-coal">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-yellow-400 rounded-lg flex items-center justify-center shadow-lg">
              <ShoppingBag className="w-5 h-5 text-ink" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-semibold text-cream">Shopping Bag</h2>
              <p className="text-sm text-fog">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeCart}
            className="text-cream hover:bg-stone/30"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100vh-80px)]">
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-yellow-400/20 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-gold" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-ink mb-2">Your bag is empty</h3>
              <p className="text-ink/60 mb-6">Start shopping to add items to your bag</p>
              <Button 
                onClick={closeCart}
                className="bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Free Shipping Progress */}
              {remainingForFreeShipping > 0 && (
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gold/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-green-600" />
                    <p className="text-sm font-medium text-green-800">
                      Add {formatCurrency(remainingForFreeShipping)} more for FREE shipping!
                    </p>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` 
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="bg-white rounded-lg p-4 shadow-md border border-gold/20">
                    <div className="flex gap-3">
                      {/* Product Image */}
                      <div className="relative w-16 h-16 bg-stone/20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                        {item.isPreOrder && (
                          <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full" />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-ink text-sm truncate">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-semibold text-ink">
                            {formatCurrency(item.price)}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-xs text-ink/60 line-through">
                              {formatCurrency(item.originalPrice)}
                            </span>
                          )}
                        </div>
                        
                        {/* Variants */}
                        <div className="flex items-center gap-2 mt-1">
                          {item.color && (
                            <Badge variant="outline" className="text-xs px-2 py-0.5 border-gold/30">
                              {item.color}
                            </Badge>
                          )}
                          {item.size && (
                            <Badge variant="outline" className="text-xs px-2 py-0.5 border-gold/30">
                              {item.size}
                            </Badge>
                          )}
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-7 h-7 border-gold/30 hover:bg-gold hover:text-ink"
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium text-ink w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-7 h-7 border-gold/30 hover:bg-gold hover:text-ink"
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                              disabled={item.quantity >= (item.maxQuantity || 99)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id, item.color, item.size)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs px-2"
                          >
                            Remove
                          </Button>
                        </div>

                        {/* Stock Status */}
                        {!item.inStock && (
                          <p className="text-xs text-red-600 mt-1">Out of stock</p>
                        )}
                        {item.isPreOrder && (
                          <p className="text-xs text-yellow-600 mt-1">
                            Pre-order • Ships {item.estimatedDelivery}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-gold/20 bg-white/50 backdrop-blur-sm">
                {/* Applied Coupon */}
                {appliedCoupon && (
                  <div className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gold/20">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Coupon "{appliedCoupon.code}" applied
                      </span>
                      <span className="text-sm text-green-600">
                        -{appliedCoupon.type === 'percentage' 
                          ? `${appliedCoupon.discount}%` 
                          : formatCurrency(appliedCoupon.discount)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Totals */}
                <div className="p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/70">Subtotal</span>
                    <span className="text-ink font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/70">Shipping</span>
                    <span className="text-ink font-medium">
                      {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold border-t border-gold/20 pt-2">
                    <span className="text-ink">Total</span>
                    <span className="text-ink">{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 space-y-3">
                  <Link href="/cart" onClick={closeCart}>
                    <Button variant="outline" className="w-full border-gold/30 text-gold hover:bg-gold hover:text-ink">
                      View Full Cart
                    </Button>
                  </Link>
                  <Link href="/checkout" onClick={closeCart}>
                    <Button className="w-full bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold shadow-lg">
                      Secure Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

