'use client'

import { useAuthStore } from '@/store/auth-store'
import { useOrderStore } from '@/store/order-store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ArrowLeft, Package, Eye, Download, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatCurrency } from '@/store/cart-store'
import { AuthModal } from '@/components/auth/auth-modal'

export default function OrdersPage() {
  const { isAuthenticated, openAuthModal } = useAuthStore()
  const { orders, getOrderStatus, getOrderTracking } = useOrderStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal('login')
    }
  }, [isAuthenticated, openAuthModal])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream to-fog flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-serif font-semibold text-ink mb-2">Please log in</h2>
          <p className="text-ink/60">You need to be logged in to view your orders.</p>
        </div>
        <AuthModal />
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

  const handleViewOrder = (orderId: string) => {
    router.push(`/account/orders/${orderId}`)
  }

  const handleDownloadInvoice = (orderId: string) => {
    // In a real app, this would generate and download the invoice
    console.log('Downloading invoice for order:', orderId)
  }

  const handleTrackOrder = (orderId: string) => {
    const tracking = getOrderTracking(orderId)
    if (tracking) {
      // In a real app, this would open the tracking page
      console.log('Tracking order:', tracking)
    }
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
            <h1 className="text-3xl font-serif font-semibold text-ink">My Orders</h1>
            <p className="text-ink/60">Track and manage your orders</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
            <CardContent className="p-8 text-center">
              <Package className="w-16 h-16 text-ink/30 mx-auto mb-4" />
              <h2 className="text-xl font-serif font-semibold text-ink mb-2">No orders yet</h2>
              <p className="text-ink/60 mb-6">You haven&apos;t placed any orders yet. Start shopping to see your orders here.</p>
              <Button 
                onClick={() => router.push('/shop')}
                className="bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold"
              >
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-ink">Order #{order.orderNumber}</CardTitle>
                        <p className="text-sm text-ink/60">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Order Items */}
                      <div className="space-y-2">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-ink truncate">{item.name}</p>
                              <p className="text-xs text-ink/60">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-medium text-ink">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-sm text-ink/60">+{order.items.length - 2} more items</p>
                        )}
                      </div>

                      {/* Order Total */}
                      <div className="flex items-center justify-between pt-2 border-t border-gold/20">
                        <span className="font-medium text-ink">Total</span>
                        <span className="font-semibold text-ink">{formatCurrency(order.total)}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewOrder(order.id)}
                          className="flex-1 border-gold/30 text-gold hover:bg-gold hover:text-ink"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        
                        {order.status === 'shipped' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTrackOrder(order.id)}
                            className="flex-1 border-gold/30 text-gold hover:bg-gold hover:text-ink"
                          >
                            <Truck className="w-4 h-4 mr-2" />
                            Track
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadInvoice(order.id)}
                          className="border-gold/30 text-gold hover:bg-gold hover:text-ink"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {orders.filter(order => order.status === 'pending' || order.status === 'confirmed').map((order) => (
                <Card key={order.id} className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-ink">Order #{order.orderNumber}</CardTitle>
                        <p className="text-sm text-ink/60">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-ink truncate">{item.name}</p>
                              <p className="text-xs text-ink/60">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-medium text-ink">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gold/20">
                        <span className="font-medium text-ink">Total</span>
                        <span className="font-semibold text-ink">{formatCurrency(order.total)}</span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewOrder(order.id)}
                          className="flex-1 border-gold/30 text-gold hover:bg-gold hover:text-ink"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadInvoice(order.id)}
                          className="border-gold/30 text-gold hover:bg-gold hover:text-ink"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="shipped" className="space-y-4">
              {orders.filter(order => order.status === 'shipped').map((order) => (
                <Card key={order.id} className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-ink">Order #{order.orderNumber}</CardTitle>
                        <p className="text-sm text-ink/60">Shipped on {new Date(order.updatedAt).toLocaleDateString()}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-ink truncate">{item.name}</p>
                              <p className="text-xs text-ink/60">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-medium text-ink">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gold/20">
                        <span className="font-medium text-ink">Total</span>
                        <span className="font-semibold text-ink">{formatCurrency(order.total)}</span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewOrder(order.id)}
                          className="flex-1 border-gold/30 text-gold hover:bg-gold hover:text-ink"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTrackOrder(order.id)}
                          className="flex-1 border-gold/30 text-gold hover:bg-gold hover:text-ink"
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          Track
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="delivered" className="space-y-4">
              {orders.filter(order => order.status === 'delivered').map((order) => (
                <Card key={order.id} className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-ink">Order #{order.orderNumber}</CardTitle>
                        <p className="text-sm text-ink/60">Delivered on {new Date(order.updatedAt).toLocaleDateString()}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-ink truncate">{item.name}</p>
                              <p className="text-xs text-ink/60">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-medium text-ink">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gold/20">
                        <span className="font-medium text-ink">Total</span>
                        <span className="font-semibold text-ink">{formatCurrency(order.total)}</span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewOrder(order.id)}
                          className="flex-1 border-gold/30 text-gold hover:bg-gold hover:text-ink"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadInvoice(order.id)}
                          className="border-gold/30 text-gold hover:bg-gold hover:text-ink"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}


