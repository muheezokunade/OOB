'use client'

import { useEffect, useState } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Plus, Minus, X, ShoppingBag, Truck, Gift, CreditCard, Shield, Star, Tag } from 'lucide-react'
import { useCartStore, formatCurrency } from '@/store/cart-store'
import { buildWhatsAppCartMessage, getWhatsAppUrl } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function CartPage() {
  const {
    items,
    subtotal,
    tax,
    shipping,
    total,
    appliedCoupon,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
    calculateTotals
  } = useCartStore()

  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  // Calculate totals on mount and when items change
  useEffect(() => {
    calculateTotals()
  }, [items, calculateTotals])

  const itemCount = items.reduce((count, item) => count + item.quantity, 0)
  const freeShippingThreshold = 50000
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return
    
    setIsApplyingCoupon(true)
    setCouponError('')
    
    const success = await applyCoupon(couponCode.trim())
    
    if (success) {
      setCouponCode('')
    } else {
      setCouponError('Invalid coupon code')
    }
    
    setIsApplyingCoupon(false)
  }

  const handleRemoveCoupon = () => {
    removeCoupon()
    setCouponError('')
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/shop">
              <Button variant="ghost" size="icon" className="text-ink/70 hover:text-ink">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-serif font-semibold text-ink">Shopping Cart</h1>
          </div>

          {/* Empty State */}
          <Card className="max-w-md mx-auto text-center bg-gradient-to-br from-white to-cream/30 border-gold/20">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-gold" />
              </div>
              <h2 className="text-xl font-serif font-semibold text-ink mb-3">Your cart is empty</h2>
              <p className="text-ink/60 mb-6">Discover our luxury collection of bags and shoes</p>
              <Link href="/shop">
                <Button className="bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold">
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/shop">
              <Button variant="ghost" size="icon" className="text-ink/70 hover:text-ink">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-serif font-semibold text-ink">Shopping Cart</h1>
              <p className="text-ink/60">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
            </div>
          </div>
          
          {items.length > 0 && (
            <Button
              variant="ghost"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear Cart
            </Button>
          )}
        </div>

        {/* Free Shipping Progress */}
        {remainingForFreeShipping > 0 && (
          <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-5 h-5 text-green-600" />
                <p className="font-medium text-green-800">
                  Add {formatCurrency(remainingForFreeShipping)} more for FREE shipping!
                </p>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` 
                  }}
                />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.color}-${item.size}`} className="bg-gradient-to-br from-white to-cream/30 border-gold/20">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 bg-stone/20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                      {item.isPreOrder && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full" />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-ink">{item.name}</h3>
                          <p className="text-sm text-ink/60">{item.category} • {item.subcategory}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id, item.color, item.size)}
                          className="text-ink/40 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Variants */}
                      <div className="flex items-center gap-3 mb-3">
                        {item.color && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-ink/60">Color:</span>
                            <Badge variant="outline" className="border-gold/30 text-xs">
                              {item.color}
                            </Badge>
                          </div>
                        )}
                        {item.size && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-ink/60">Size:</span>
                            <Badge variant="outline" className="border-gold/30 text-xs">
                              {item.size}
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-stone/20 rounded-lg p-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 hover:bg-gold hover:text-ink"
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium text-ink w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 hover:bg-gold hover:text-ink"
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                              disabled={item.quantity >= (item.maxQuantity || 99)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-ink">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <p className="text-sm text-ink/60 line-through">
                              {formatCurrency(item.originalPrice * item.quantity)}
                            </p>
                          )}
                          <p className="text-xs text-ink/60">
                            {formatCurrency(item.price)} each
                          </p>
                        </div>
                      </div>

                      {/* Stock Status */}
                      {!item.inStock && (
                        <p className="text-sm text-red-600 mt-2">Currently out of stock</p>
                      )}
                      {item.isPreOrder && (
                        <p className="text-sm text-yellow-600 mt-2">
                          Pre-order • Estimated delivery: {item.estimatedDelivery}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon Code */}
            <Card className="bg-gradient-to-br from-white to-cream/30 border-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-ink">
                  <Tag className="w-5 h-5 text-gold" />
                  Coupon Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appliedCoupon ? (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">
                          {appliedCoupon.code}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveCoupon}
                        className="text-green-600 hover:text-green-700"
                      >
                        Remove
                      </Button>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      Saving {appliedCoupon.type === 'percentage' 
                        ? `${appliedCoupon.discount}%` 
                        : formatCurrency(appliedCoupon.discount)}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                        className="border-gold/20 focus:border-gold"
                      />
                      <Button
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim() || isApplyingCoupon}
                        variant="outline"
                        className="border-gold/30 text-gold hover:bg-gold hover:text-ink"
                      >
                        {isApplyingCoupon ? 'Applying...' : 'Apply'}
                      </Button>
                    </div>
                    {couponError && (
                      <p className="text-sm text-red-600">{couponError}</p>
                    )}
                    <div className="text-xs text-ink/60">
                      <p>Available codes: WELCOME10, FREESHIP, NEWCUSTOMER, LUXURY20</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-gradient-to-br from-white to-cream/30 border-gold/20">
              <CardHeader>
                <CardTitle className="text-ink">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/70">Subtotal ({itemCount} items)</span>
                    <span className="text-ink font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>
                        -{appliedCoupon.type === 'percentage' 
                          ? formatCurrency(subtotal * (appliedCoupon.discount / 100))
                          : formatCurrency(appliedCoupon.discount)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/70">Tax</span>
                    <span className="text-ink font-medium">{formatCurrency(tax)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-ink/70">Shipping</span>
                      {shipping === 0 && (
                        <Badge variant="outline" className="text-xs border-green-200 text-green-600">
                          FREE
                        </Badge>
                      )}
                    </div>
                    <span className="text-ink font-medium">
                      {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                    </span>
                  </div>
                </div>

                <Separator className="border-gold/20" />

                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-ink">Total</span>
                  <span className="text-ink">{formatCurrency(total)}</span>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-4 pt-4 text-xs text-ink/60">
                  <div className="flex flex-col items-center text-center">
                    <Shield className="w-5 h-5 text-gold mb-1" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Truck className="w-5 h-5 text-gold mb-1" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Star className="w-5 h-5 text-gold mb-1" />
                    <span>Premium Quality</span>
                  </div>
                </div>

                {/* Actions */}
                <Link href="/checkout" className="block">
                  <Button 
                    className="w-full bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold shadow-lg hover:shadow-gold/25"
                    size="lg"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-green-300 text-green-700 hover:bg-green-50"
                  onClick={() => {
                    const msg = buildWhatsAppCartMessage(items, { subtotal, tax, shipping, total })
                    const url = getWhatsAppUrl('2349061819572', msg)
                    window.open(url, '_blank')
                  }}
                >
                  Share Cart to WhatsApp
                </Button>
                <Link href="/cart/invoice" className="block">
                  <Button variant="outline" className="w-full">View Invoice</Button>
                </Link>

                <p className="text-xs text-ink/60 text-center">
                  Taxes and shipping calculated at checkout
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}






