'use client'

import { useRouter } from 'next/navigation'
import { CheckCircle, Package, Mail, Phone, ArrowRight, Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function OrderConfirmation() {
  const router = useRouter()

  // Mock order data - in real app, this would come from the order store
  const orderData = {
    orderNumber: 'OOB-2024-001234',
    status: 'confirmed',
    estimatedDelivery: '3-5 business days',
    total: 125000,
    items: [
      { name: 'Luxury Tote Bag', quantity: 1, price: 75000 },
      { name: 'Designer Heels', quantity: 1, price: 50000 }
    ],
    shippingAddress: {
      name: 'Adebayo Johnson',
      address: '123 Victoria Island, Lagos, Lagos State 101241, Nigeria'
    },
    trackingNumber: 'TRK-789456123'
  }

  const handleContinueShopping = () => {
    router.push('/shop')
  }

  const handleViewOrder = () => {
    router.push('/account/orders')
  }

  const handleDownloadInvoice = () => {
    // In a real app, this would generate and download the invoice
    console.log('Downloading invoice...')
  }

  const handleShareOrder = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My OmoOniBag Order',
        text: `I just placed an order at OmoOniBag! Order #${orderData.orderNumber}`,
        url: window.location.origin
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`Check out my OmoOniBag order: ${orderData.orderNumber}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-serif font-semibold text-ink mb-2">
              Order Confirmed!
            </h1>
            <p className="text-ink/60">
              Thank you for your purchase. We&apos;ve received your order and will process it shortly.
            </p>
          </div>

          {/* Order Summary Card */}
          <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-ink">
                <Package className="w-5 h-5 text-gold" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-ink/60">Order Number</span>
                <span className="font-mono font-medium text-ink">{orderData.orderNumber}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-ink/60">Status</span>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-ink/60">Total Amount</span>
                <span className="font-semibold text-ink">₦{orderData.total.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-ink/60">Estimated Delivery</span>
                <span className="text-ink">{orderData.estimatedDelivery}</span>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20 mb-6">
            <CardHeader>
              <CardTitle className="text-ink">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div>
                      <p className="font-medium text-ink">{item.name}</p>
                      <p className="text-sm text-ink/60">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-ink">₦{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-ink">
                <Package className="w-5 h-5 text-gold" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium text-ink">{orderData.shippingAddress.name}</p>
                <p className="text-ink/60">{orderData.shippingAddress.address}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink/60">Tracking Number</span>
                <span className="font-mono text-ink">{orderData.trackingNumber}</span>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20 mb-6">
            <CardHeader>
              <CardTitle className="text-ink">What&apos;s Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gold mt-0.5" />
                  <div>
                    <p className="font-medium text-ink">Confirmation Email</p>
                    <p className="text-sm text-ink/60">
                      We&apos;ve sent a confirmation email with your order details and tracking information.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-gold mt-0.5" />
                  <div>
                    <p className="font-medium text-ink">Order Processing</p>
                    <p className="text-sm text-ink/60">
                      Your order is being prepared and will be shipped within 1-2 business days.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gold mt-0.5" />
                  <div>
                    <p className="font-medium text-ink">Customer Support</p>
                    <p className="text-sm text-ink/60">
                      Need help? Contact us via WhatsApp or email for any questions about your order.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <Button
                onClick={handleContinueShopping}
                className="flex-1 bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button
                onClick={handleViewOrder}
                variant="outline"
                className="flex-1 border-gold/30 text-gold hover:bg-gold hover:text-ink"
              >
                View Order
              </Button>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleDownloadInvoice}
                variant="outline"
                className="flex-1 border-gold/30 text-gold hover:bg-gold hover:text-ink"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
              
              <Button
                onClick={handleShareOrder}
                variant="outline"
                className="flex-1 border-gold/30 text-gold hover:bg-gold hover:text-ink"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Order
              </Button>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 mt-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-green-900">Need immediate assistance?</p>
                  <p className="text-sm text-green-700">Chat with us on WhatsApp for instant support</p>
                </div>
                <Button
                  onClick={() => window.open('https://wa.me/2349061819572', '_blank')}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Chat Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}





