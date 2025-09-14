'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Eye, 
  Truck, 
  CheckCircle, 
  XCircle,
  Clock,
  Download,
  Printer,
  Loader2
} from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  status: string
  paymentStatus: string
  total: number
  createdAt: string
  user: {
    firstName: string
    lastName: string
    email: string
  }
  items: Array<{
    id: string
    quantity: number
    price: number
    product: {
      name: string
      sku: string
    }
  }>
  shippingAddress?: {
    street: string
    city: string
    state: string
    country: string
  }
}

// Mock order data (fallback)
const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    date: '2024-01-15',
    status: 'shipped',
    paymentStatus: 'paid',
    total: 45000,
    items: 2,
    shippingAddress: 'Lagos, Nigeria'
  },
  {
    id: 'ORD-002',
    customer: 'Mary Okonkwo',
    email: 'mary.o@email.com',
    date: '2024-01-14',
    status: 'processing',
    paymentStatus: 'paid',
    total: 32000,
    items: 1,
    shippingAddress: 'Abuja, Nigeria'
  },
  {
    id: 'ORD-003',
    customer: 'Grace Adebayo',
    email: 'grace.a@email.com',
    date: '2024-01-13',
    status: 'delivered',
    paymentStatus: 'paid',
    total: 28000,
    items: 1,
    shippingAddress: 'Port Harcourt, Nigeria'
  },
  {
    id: 'ORD-004',
    customer: 'Blessing Okafor',
    email: 'blessing.o@email.com',
    date: '2024-01-12',
    status: 'pending',
    paymentStatus: 'pending',
    total: 55000,
    items: 3,
    shippingAddress: 'Kano, Nigeria'
  },
  {
    id: 'ORD-005',
    customer: 'Joyce Nwosu',
    email: 'joyce.n@email.com',
    date: '2024-01-11',
    status: 'shipped',
    paymentStatus: 'paid',
    total: 38000,
    items: 2,
    shippingAddress: 'Ibadan, Nigeria'
  }
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')

  useEffect(() => {
    fetchOrders()
  }, [searchTerm, statusFilter, paymentFilter])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (paymentFilter !== 'all') params.append('paymentStatus', paymentFilter)
      
      const response = await fetch(`/api/admin/orders?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setOrders(data.data.orders)
      } else {
        // Fallback to mock data
        setOrders(mockOrders as any)
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
      // Fallback to mock data
      setOrders(mockOrders as any)
    } finally {
      setLoading(false)
    }
  }

  const statusOptions = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']
  const paymentOptions = ['all', 'paid', 'pending', 'failed']

  const filteredOrders = orders.filter(order => {
    const customerName = `${order.user?.firstName || ''} ${order.user?.lastName || ''}`.toLowerCase()
    const matchesSearch = order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customerName.includes(searchTerm.toLowerCase()) ||
                         order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter
    return matchesSearch && matchesStatus && matchesPayment
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      processing: { color: 'bg-blue-100 text-blue-800', icon: Clock },
      shipped: { color: 'bg-purple-100 text-purple-800', icon: Truck },
      delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    const IconComponent = config.icon
    
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getPaymentBadge = (status: string) => {
    const statusConfig = {
      paid: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      failed: { color: 'bg-red-100 text-red-800', icon: XCircle }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    const IconComponent = config.icon
    
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-ink">Orders</h1>
          <p className="text-muted-foreground">Manage customer orders and fulfillment</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-ink">
            <Download className="w-4 h-4 mr-2" />
            Export Orders
          </Button>
          <Button className="bg-gold text-ink hover:bg-gold/90">
            <Printer className="w-4 h-4 mr-2" />
            Print Reports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold text-ink">124</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
              <p className="text-2xl font-bold text-ink">8</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Shipped Orders</p>
              <p className="text-2xl font-bold text-ink">15</p>
            </div>
            <Truck className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Delivered Orders</p>
              <p className="text-2xl font-bold text-ink">98</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID, customer, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {statusOptions.map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className={statusFilter === status ? "bg-gold text-ink" : ""}
              >
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>

          {/* Payment Filter */}
          <div className="flex gap-2">
            {paymentOptions.map((payment) => (
              <Button
                key={payment}
                variant={paymentFilter === payment ? "default" : "outline"}
                size="sm"
                onClick={() => setPaymentFilter(payment)}
                className={paymentFilter === payment ? "bg-gold text-ink" : ""}
              >
                {payment === 'all' ? 'All Payments' : payment.charAt(0).toUpperCase() + payment.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-ink">
            Orders ({filteredOrders.length})
          </h3>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Items</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Total</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payment</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gold mx-auto mb-2" />
                    <p className="text-ink/60">Loading orders...</p>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <ShoppingCart className="w-12 h-12 text-ink/40 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-ink mb-2">No orders found</h3>
                    <p className="text-ink/60">Try adjusting your search or filter criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 font-medium text-ink">{order.orderNumber || order.id}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-ink">
                          {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Unknown Customer'}
                        </p>
                        <p className="text-sm text-muted-foreground">{order.user?.email || 'No email'}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-ink">{order.items?.length || 0}</td>
                    <td className="py-4 px-4 font-semibold text-ink">
                      ₦{order.total.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      {getPaymentBadge(order.paymentStatus)}
                    </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {order.status === 'pending' && (
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          <Truck className="w-4 h-4" />
                        </Button>
                      )}
                      {order.status === 'shipped' && (
                        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

