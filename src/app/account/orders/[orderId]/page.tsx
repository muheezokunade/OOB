'use client'

import { useAuthStore } from '@/store/auth-store'
import { useOrderStore } from '@/store/order-store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeft, Package, MapPin, CreditCard, Download, Truck, Calendar, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/store/cart-store'
import { AuthModal } from '@/components/auth/auth-modal'

interface OrderDetailPageProps {
  params: Promise<{ orderId: string }>
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { isAuthenticated, openAuthModal } = useAuthStore()
  const { getOrder } = useOrderStore()
  const router = useRouter()
  const [orderId, setOrderId] = useState<string>('')
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setOrderId(resolvedParams.orderId)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal('login')
    }
  }, [isAuthenticated, openAuthModal])

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrder(orderId)
      setOrder(foundOrder)
    }
  }, [orderId, getOrder])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream to-fog flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-serif font-semibold text-ink mb-2">Please log in</h2>
          <p className="text-ink/60">You need to be logged in to view order details.</p>
        </div>
        <AuthModal />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream to-fog flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-ink/30 mx-auto mb-4" />
          <h2 className="text-xl font-serif font-semibold text-ink mb-2">Order not found</h2>
          <p className="text-ink/60 mb-6">The order you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.</p>
          <Button 
            onClick={() => router.push('/account/orders')}
            className="bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold"
          >
            Back to Orders
          </Button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'processing':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleDownloadInvoice = () => {
    // In a real app, this would generate and download the invoice
    console.log('Downloading invoice for order:', order.id)
  }

  const handleTrackOrder = () => {
    console.log('Track order', order.id)
  }

  const formatAddress = (address: any) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-ink/60 hover:text-ink"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-serif font-semibold text-ink">Order Details</h1>
            <p className="text-ink/60">Order #{order.orderNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-ink">
                  <Package className="w-5 h-5 text-gold" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <p className="text-sm text-ink/60 mt-2">
                      {order.status === 'pending' && 'Your order is being processed'}
                      {order.status === 'confirmed' && 'Your order has been confirmed'}
                      {order.status === 'processing' && 'Your order is being prepared'}
                      {order.status === 'shipped' && 'Your order is on its way'}
                      {order.status === 'delivered' && 'Your order has been delivered'}
                      {order.status === 'cancelled' && 'Your order has been cancelled'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-ink/60">Order Date</p>
                    <p className="font-medium text-ink">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
              <CardHeader>
                <CardTitle className="text-ink">Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white/50 rounded-lg">
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
                      {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                    </p>
                    <p className="text-ink">{order.shippingAddress.phone}</p>
                    <p className="text-ink">{formatAddress(order.shippingAddress)}</p>
                    {order.shippingAddress.additionalInfo && (
                      <p className="text-ink/60 mt-1">{order.shippingAddress.additionalInfo}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-ink mb-2">Shipping Method</h4>
                  <div className="p-3 bg-white/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-ink">{order.shippingMethod.name}</p>
                        <p className="text-sm text-ink/60">{order.shippingMethod.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-ink">{formatCurrency(order.shippingMethod.price)}</p>
                        <p className="text-sm text-ink/60">{order.shippingMethod.estimatedDays} days</p>
                      </div>
                    </div>
                  </div>
                </div>

                {order.trackingNumber && (
                  <div>
                    <h4 className="font-medium text-ink mb-2">Tracking Information</h4>
                    <div className="p-3 bg-white/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-ink">Tracking Number</p>
                          <p className="text-sm text-ink/60 font-mono">{order.trackingNumber}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleTrackOrder}
                          className="border-gold/30 text-gold hover:bg-gold hover:text-ink"
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          Track Package
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-ink">
                  <CreditCard className="w-5 h-5 text-gold" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-ink mb-2">Payment Method</h4>
                  <div className="p-3 bg-white/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gold" />
                      <span className="text-ink">{order.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-ink mb-2">Billing Address</h4>
                  <div className="p-3 bg-white/50 rounded-lg">
                    <p className="text-ink">
                      {order.billingAddress.firstName} {order.billingAddress.lastName}
                    </p>
                    <p className="text-ink">{order.billingAddress.phone}</p>
                    <p className="text-ink">{formatAddress(order.billingAddress)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20 sticky top-8">
              <CardHeader>
                <CardTitle className="text-ink">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/60">Subtotal</span>
                    <span className="text-ink">{formatCurrency(order.subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/60">Shipping</span>
                    <span className="text-ink">{formatCurrency(order.shipping)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/60">Tax</span>
                    <span className="text-ink">{formatCurrency(order.tax)}</span>
                  </div>
                  
                  <div className="flex justify-between font-semibold text-lg border-t border-gold/20 pt-2">
                    <span className="text-ink">Total</span>
                    <span className="text-ink">{formatCurrency(order.total)}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    onClick={handleDownloadInvoice}
                    variant="outline"
                    className="w-full border-gold/30 text-gold hover:bg-gold hover:text-ink"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>

                  {order.status === 'shipped' && (
                    <Button
                      onClick={handleTrackOrder}
                      variant="outline"
                      className="w-full border-gold/30 text-gold hover:bg-gold hover:text-ink"
                    >
                      <Truck className="w-4 h-4 mr-2" />
                      Track Package
                    </Button>
                  )}

                  <Button
                    onClick={() => window.open('https://wa.me/2349061819572', '_blank')}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


