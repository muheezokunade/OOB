'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  AlertTriangle, 
  MessageSquare, 
  Truck,
  TrendingUp,
  TrendingDown,
  Eye,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from 'lucide-react'

interface DashboardData {
  stats: {
    totalProducts: number
    totalOrders: number
    totalCustomers: number
    totalRevenue: number
    lowStockProducts: number
    pendingOrders: number
    orderGrowth: number
    revenueGrowth: number
  }
  recentOrders: Array<{
    id: string
    orderNumber: string
    customer: string
    amount: number
    status: string
    date: string
  }>
  topProducts: Array<{
    id: string
    name: string
    price: number
    image: string
    rating: number
    reviewCount: number
    totalSold: number
    orderCount: number
    revenue: number
  }>
  salesChart: Array<{
    date: string
    revenue: number
    orders: number
  }>
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/dashboard')
      const data = await response.json()
      
      if (data.success) {
        setDashboardData(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} days ago`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
        <span className="ml-2 text-ink/60">Loading dashboard...</span>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-ink mb-2">Failed to load dashboard</h3>
        <p className="text-ink/60 mb-4">Please try refreshing the page.</p>
        <Button onClick={fetchDashboardData} className="bg-gold text-ink hover:bg-gold/90">
          Retry
        </Button>
      </div>
    )
  }

  const stats = [
    {
      title: 'Total Products',
      value: dashboardData.stats.totalProducts.toString(),
      change: '+12%',
      changeType: 'positive' as const,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Orders This Month',
      value: dashboardData.stats.totalOrders.toString(),
      change: `${dashboardData.stats.orderGrowth > 0 ? '+' : ''}${dashboardData.stats.orderGrowth.toFixed(1)}%`,
      changeType: dashboardData.stats.orderGrowth >= 0 ? 'positive' as const : 'negative' as const,
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Customers',
      value: dashboardData.stats.totalCustomers.toLocaleString(),
      change: '+15%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(dashboardData.stats.totalRevenue),
      change: `${dashboardData.stats.revenueGrowth > 0 ? '+' : ''}${dashboardData.stats.revenueGrowth.toFixed(1)}%`,
      changeType: dashboardData.stats.revenueGrowth >= 0 ? 'positive' as const : 'negative' as const,
      icon: DollarSign,
      color: 'text-gold',
      bgColor: 'bg-gold/10'
    },
    {
      title: 'Low Stock Alerts',
      value: dashboardData.stats.lowStockProducts.toString(),
      change: '-2',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Pending Messages',
      value: '12',
      change: '+3',
      changeType: 'negative' as const,
      icon: MessageSquare,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Pending Orders',
      value: dashboardData.stats.pendingOrders.toString(),
      change: '-1',
      changeType: 'positive' as const,
      icon: Truck,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ]
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-ink">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-ink">
            <Eye className="w-4 h-4 mr-2" />
            View Site
          </Button>
          <Button className="bg-gold text-ink hover:bg-gold/90">
            <TrendingUp className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-cream/30 border-gold/20 hover:border-gold/40 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-ink/70">{stat.title}</p>
                  <p className="text-2xl font-bold text-ink mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-ink/60">vs last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center shadow-md`}>
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart Placeholder */}
        <Card className="p-6 bg-gradient-to-br from-white to-cream/30 border-gold/20 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-ink">Sales Overview</h3>
            <Button variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold hover:text-ink">View Details</Button>
          </div>
          <div className="h-64 bg-gradient-to-br from-gold/10 to-yellow-100/30 rounded-lg flex items-center justify-center border border-gold/20">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gold mx-auto mb-2" />
              <p className="text-ink/70">Sales chart will be displayed here</p>
              <p className="text-sm text-ink/60">Integration with Chart.js or similar</p>
            </div>
          </div>
        </Card>

        {/* Top Products */}
        <Card className="p-6 bg-gradient-to-br from-white to-fog/30 border-gold/20 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-ink">Top Products</h3>
            <Button variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold hover:text-ink">View All</Button>
          </div>
          <div className="space-y-4">
            {dashboardData.topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gold to-yellow-400 rounded-full flex items-center justify-center text-ink font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-2">
                    {product.image && (
                      <img src={product.image} alt={product.name} className="w-8 h-8 rounded object-cover" />
                    )}
                    <div>
                      <p className="font-medium text-ink">{product.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-gold fill-current" />
                        <span className="text-sm text-muted-foreground">{product.rating?.toFixed(1) || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-ink">{formatCurrency(product.revenue)}</p>
                  <p className="text-sm text-muted-foreground">{product.totalSold} sold</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-ink">Recent Orders</h3>
          <Button variant="outline" size="sm">View All Orders</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-ink">{order.orderNumber}</td>
                  <td className="py-3 px-4 text-ink">{order.customer}</td>
                  <td className="py-3 px-4 font-semibold text-ink">{formatCurrency(order.amount)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{formatDate(order.date)}</td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-ink mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-20 flex flex-col gap-2 border-gold text-gold hover:bg-gold hover:text-ink">
            <Package className="w-6 h-6" />
            <span>Add New Product</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2 border-gold text-gold hover:bg-gold hover:text-ink">
            <MessageSquare className="w-6 h-6" />
            <span>View Messages</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2 border-gold text-gold hover:bg-gold hover:text-ink">
            <TrendingUp className="w-6 h-6" />
            <span>Generate Report</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}
