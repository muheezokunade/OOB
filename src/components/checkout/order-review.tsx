'use client'

import { MapPin, CreditCard, Truck, Package, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CartItem, formatCurrency } from '@/store/cart-store'
import { ShippingMethod, PaymentData } from '@/store/order-store'

interface Address {
  firstName: string
  lastName: string
  phone: string
  street: string
  city: string
  state: string
  country: string
  postalCode: string
  additionalInfo: string
}

interface OrderReviewProps {
  items: CartItem[]
  shippingAddress: Address
  billingAddress: Address
  shippingMethod: ShippingMethod
  paymentMethod: string
  subtotal: number
  shipping: number
  tax: number
  total: number
  orderNotes: string
}

export function OrderReview({
  items,
  shippingAddress,
  billingAddress,
  shippingMethod,
  paymentMethod,
  subtotal,
  shipping,
  tax,
  total,
  orderNotes
}: OrderReviewProps) {
  const formatAddress = (address: Address) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}`
  }

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card'
      case 'paystack':
        return 'Paystack'
      case 'flutterwave':
        return 'Flutterwave'
      default:
        return method
    }
  }

  return (
    <div className="space-y-6">
      {/* Order Items */}
      <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-ink">
            <Package className="w-5 h-5 text-gold" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-white/50 rounded-lg">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-ink">{item.name}</h3>
                  <p className="text-sm text-ink/60">Size: {item.size || 'One Size'}</p>
                  <p className="text-sm text-ink/60">Color: {item.color || 'Default'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-ink/60">Qty: {item.quantity}</p>
                  <p className="font-medium text-ink">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gold/20 pt-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Subtotal</span>
                <span className="text-ink">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Shipping</span>
                <span className="text-ink">{formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Tax (7.5%)</span>
                <span className="text-ink">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t border-gold/20 pt-2">
                <span className="text-ink">Total</span>
                <span className="text-ink">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Information */}
      <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-ink">
            <MapPin className="w-5 h-5 text-gold" />
            Shipping Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-ink mb-2">Shipping Address</h4>
            <div className="p-3 bg-white/50 rounded-lg">
              <p className="text-ink">
                {shippingAddress.firstName} {shippingAddress.lastName}
              </p>
              <p className="text-ink">{shippingAddress.phone}</p>
              <p className="text-ink">{formatAddress(shippingAddress)}</p>
              {shippingAddress.additionalInfo && (
                <p className="text-ink/60 mt-1">{shippingAddress.additionalInfo}</p>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-ink mb-2">Shipping Method</h4>
            <div className="p-3 bg-white/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-ink">{shippingMethod.name}</p>
                  <p className="text-sm text-ink/60">{shippingMethod.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-ink">{formatCurrency(shippingMethod.price)}</p>
                  <p className="text-sm text-ink/60">{shippingMethod.estimatedDays} days</p>
                </div>
              </div>
              {shippingMethod.features && shippingMethod.features.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {shippingMethod.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-ink">
            <CreditCard className="w-5 h-5 text-gold" />
            Billing Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-ink mb-2">Billing Address</h4>
            <div className="p-3 bg-white/50 rounded-lg">
              <p className="text-ink">
                {billingAddress.firstName} {billingAddress.lastName}
              </p>
              <p className="text-ink">{billingAddress.phone}</p>
              <p className="text-ink">{formatAddress(billingAddress)}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-ink mb-2">Payment Method</h4>
            <div className="p-3 bg-white/50 rounded-lg">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gold" />
                <span className="text-ink">{getPaymentMethodName(paymentMethod)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Notes */}
      {orderNotes && (
        <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-ink">
              <FileText className="w-5 h-5 text-gold" />
              Order Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-white/50 rounded-lg">
              <p className="text-ink">{orderNotes}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Terms and Conditions */}
      <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            <h4 className="font-medium text-ink">Terms and Conditions</h4>
            <div className="space-y-2 text-sm text-ink/60">
              <p>• By placing this order, you agree to our terms and conditions.</p>
              <p>• All sales are final. Returns are accepted within 14 days of delivery.</p>
              <p>• We will send you a confirmation email once your order is processed.</p>
              <p>• Delivery times are estimates and may vary based on location.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
