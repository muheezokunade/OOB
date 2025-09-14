'use client'

import { useState } from 'react'
import { User, Heart, MapPin, Settings, Package, LogOut, Camera, Mail, Phone, Calendar } from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import { useWishlistStore } from '@/store/wishlist-store'
import { useOrderStore } from '@/store/order-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatCurrency } from '@/store/cart-store'
import { cn } from '@/lib/utils'

interface UserDashboardProps {
  className?: string
}

export function UserDashboard({ className }: UserDashboardProps) {
  const { user, logout, addresses } = useAuthStore()
  const { items: wishlistItems, getWishlistCount } = useWishlistStore()
  const { orders } = useOrderStore()
  const [activeTab, setActiveTab] = useState('overview')

  if (!user) return null

  const recentOrders = orders.slice(0, 3)
  const totalSpent = orders
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500'
      case 'shipped': return 'bg-blue-500'
      case 'processing': return 'bg-yellow-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className={cn("max-w-6xl mx-auto", className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-gold/10 to-yellow-400/10 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="w-20 h-20 border-2 border-gold">
              <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback className="bg-gradient-to-br from-gold to-yellow-400 text-ink text-xl font-bold">
                {getInitials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-gold/30 bg-white hover:bg-gold hover:text-ink"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-serif font-bold text-ink">
              Welcome back, {user.firstName}!
            </h1>
            <p className="text-ink/60 mt-1">
              Member since {new Date(user.createdAt).toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
            <div className="flex items-center gap-4 mt-3">
              <Badge variant={user.isEmailVerified ? 'default' : 'secondary'} className="text-xs">
                {user.isEmailVerified ? 'Verified' : 'Unverified'} Email
              </Badge>
              <div className="text-sm text-ink/60">
                {orders.length} Orders • {getWishlistCount()} Wishlist Items
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={logout}
            className="border-gold/30 text-gold hover:bg-gold hover:text-ink"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white/50 border border-gold/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-ink">
            <Package className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-gold data-[state=active]:text-ink">
            <Package className="w-4 h-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="data-[state=active]:bg-gold data-[state=active]:text-ink">
            <Heart className="w-4 h-4 mr-2" />
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="addresses" className="data-[state=active]:bg-gold data-[state=active]:text-ink">
            <MapPin className="w-4 h-4 mr-2" />
            Addresses
          </TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-gold data-[state=active]:text-ink">
            <Settings className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-white to-cream/30 border-gold/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-ink/60">Total Orders</p>
                    <p className="text-2xl font-bold text-ink">{orders.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-yellow-400/20 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-gold" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-cream/30 border-gold/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-ink/60">Total Spent</p>
                    <p className="text-2xl font-bold text-ink">{formatCurrency(totalSpent)}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-yellow-400/20 rounded-full flex items-center justify-center">
                    <span className="text-gold font-bold">₦</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-cream/30 border-gold/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-ink/60">Wishlist Items</p>
                    <p className="text-2xl font-bold text-ink">{getWishlistCount()}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-yellow-400/20 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-gold" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card className="bg-gradient-to-br from-white to-cream/30 border-gold/20">
            <CardHeader>
              <CardTitle className="text-ink">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-ink/30 mx-auto mb-3" />
                  <p className="text-ink/60">No orders yet</p>
                  <Button className="mt-4 bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold">
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-gold/10">
                      <div className="flex items-center gap-4">
                        <div className={cn("w-3 h-3 rounded-full", getStatusColor(order.status))} />
                        <div>
                          <p className="font-medium text-ink">Order #{order.orderNumber}</p>
                          <p className="text-sm text-ink/60">
                            {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-ink">{formatCurrency(order.total)}</p>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card className="bg-gradient-to-br from-white to-cream/30 border-gold/20">
            <CardHeader>
              <CardTitle className="text-ink">Order History</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-ink/30 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-ink mb-2">No orders found</h3>
                  <p className="text-ink/60 mb-6">You haven't placed any orders yet.</p>
                  <Button className="bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold">
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="p-6 bg-white/50 rounded-lg border border-gold/10">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-ink">Order #{order.orderNumber}</h3>
                          <p className="text-sm text-ink/60">
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="secondary" className="capitalize">
                          {order.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-ink/60">Total</p>
                          <p className="font-medium text-ink">{formatCurrency(order.total)}</p>
                        </div>
                        <div>
                          <p className="text-ink/60">Items</p>
                          <p className="font-medium text-ink">{order.items.length}</p>
                        </div>
                        <div>
                          <p className="text-ink/60">Payment</p>
                          <p className="font-medium text-ink capitalize">{order.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-ink/60">Shipping</p>
                          <p className="font-medium text-ink">{order.shippingMethod.name}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold hover:text-ink">
                          View Details
                        </Button>
                        {order.status === 'shipped' && (
                          <Button variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold hover:text-ink">
                            Track Order
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist">
          <Card className="bg-gradient-to-br from-white to-cream/30 border-gold/20">
            <CardHeader>
              <CardTitle className="text-ink">My Wishlist</CardTitle>
            </CardHeader>
            <CardContent>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-ink/30 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-ink mb-2">Your wishlist is empty</h3>
                  <p className="text-ink/60 mb-6">Save items you love for later.</p>
                  <Button className="bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold">
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <div key={item.productId} className="bg-white/50 rounded-lg border border-gold/10 p-4">
                      {item.product && (
                        <>
                          <div className="aspect-square bg-gray-100 rounded-lg mb-3" />
                          <h3 className="font-medium text-ink mb-1">{item.product.name}</h3>
                          <p className="text-gold font-medium">{formatCurrency(item.product.price)}</p>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" className="flex-1 bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold">
                              Add to Cart
                            </Button>
                            <Button variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold hover:text-ink">
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses">
          <Card className="bg-gradient-to-br from-white to-cream/30 border-gold/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-ink">Saved Addresses</CardTitle>
              <Button className="bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold">
                Add New Address
              </Button>
            </CardHeader>
            <CardContent>
              {addresses.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-ink/30 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-ink mb-2">No saved addresses</h3>
                  <p className="text-ink/60 mb-6">Add an address for faster checkout.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="p-4 bg-white/50 rounded-lg border border-gold/10">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-ink">{address.firstName} {address.lastName}</h3>
                            {address.isDefault && (
                              <Badge variant="secondary" className="text-xs">Default</Badge>
                            )}
                            <Badge variant="outline" className="text-xs capitalize">{address.type}</Badge>
                          </div>
                          <p className="text-sm text-ink/70">
                            {address.street}<br />
                            {address.city}, {address.state}<br />
                            {address.country}
                            {address.postalCode && ` ${address.postalCode}`}
                          </p>
                          <p className="text-sm text-ink/60 mt-1">{address.phone}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold hover:text-ink">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="space-y-6">
            {/* Personal Information */}
            <Card className="bg-gradient-to-br from-white to-cream/30 border-gold/20">
              <CardHeader>
                <CardTitle className="text-ink">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-ink">First Name</label>
                    <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg border border-gold/10">
                      <User className="w-4 h-4 text-ink/40" />
                      <span className="text-ink">{user.firstName}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-ink">Last Name</label>
                    <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg border border-gold/10">
                      <User className="w-4 h-4 text-ink/40" />
                      <span className="text-ink">{user.lastName}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-ink">Email Address</label>
                  <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg border border-gold/10">
                    <Mail className="w-4 h-4 text-ink/40" />
                    <span className="text-ink">{user.email}</span>
                    {user.isEmailVerified ? (
                      <Badge variant="default" className="ml-auto text-xs">Verified</Badge>
                    ) : (
                      <Badge variant="secondary" className="ml-auto text-xs">Unverified</Badge>
                    )}
                  </div>
                </div>

                {user.phone && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-ink">Phone Number</label>
                    <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg border border-gold/10">
                      <Phone className="w-4 h-4 text-ink/40" />
                      <span className="text-ink">{user.phone}</span>
                    </div>
                  </div>
                )}

                <Button className="bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="bg-gradient-to-br from-white to-cream/30 border-gold/20">
              <CardHeader>
                <CardTitle className="text-ink">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-ink">Language</label>
                    <div className="p-3 bg-white/50 rounded-lg border border-gold/10">
                      <span className="text-ink">{user.preferences.language === 'en' ? 'English' : 'Yoruba'}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-ink">Currency</label>
                    <div className="p-3 bg-white/50 rounded-lg border border-gold/10">
                      <span className="text-ink">{user.preferences.currency}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-gold/10">
                    <span className="text-ink">Newsletter Subscription</span>
                    <Badge variant={user.preferences.newsletter ? 'default' : 'secondary'}>
                      {user.preferences.newsletter ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-gold/10">
                    <span className="text-ink">SMS Notifications</span>
                    <Badge variant={user.preferences.smsNotifications ? 'default' : 'secondary'}>
                      {user.preferences.smsNotifications ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </div>

                <Button className="bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold">
                  Update Preferences
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}



