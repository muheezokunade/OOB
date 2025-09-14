'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Download,
  Calendar,
  DollarSign,
  Users,
  ShoppingCart,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  RefreshCw,
  FileText,
  PieChart,
  Target,
  Globe
} from 'lucide-react'

// Mock analytics data
const analyticsData = {
  overview: {
    totalRevenue: 2400000,
    revenueChange: 23,
    totalOrders: 347,
    ordersChange: 12,
    totalCustomers: 1234,
    customersChange: 15,
    averageOrderValue: 6915,
    aovChange: 8,
    conversionRate: 3.2,
    conversionChange: 0.5,
    returnRate: 2.1,
    returnChange: -0.3
  },
  topProducts: [
    { name: 'Luxury Leather Tote', sales: 45, revenue: 2025000, growth: 15 },
    { name: 'Elegant Evening Clutch', sales: 32, revenue: 800000, growth: 8 },
    { name: 'Owambe Statement Heels', sales: 28, revenue: 896000, growth: 22 },
    { name: 'Professional Office Pumps', sales: 25, revenue: 700000, growth: 12 },
    { name: 'Classic Handbag', sales: 22, revenue: 836000, growth: 5 }
  ],
  customerSegments: [
    { segment: 'VIP Customers', count: 45, revenue: 900000, percentage: 37.5 },
    { segment: 'Gold Customers', count: 89, revenue: 712000, percentage: 29.7 },
    { segment: 'Silver Customers', count: 156, revenue: 468000, percentage: 19.5 },
    { segment: 'Bronze Customers', count: 944, revenue: 320000, percentage: 13.3 }
  ],
  trafficSources: [
    { source: 'Organic Search', visitors: 12450, percentage: 42.3, conversionRate: 3.8 },
    { source: 'Social Media', visitors: 8930, percentage: 30.4, conversionRate: 2.1 },
    { source: 'Direct', visitors: 4567, percentage: 15.5, conversionRate: 5.2 },
    { source: 'Email Marketing', visitors: 2103, percentage: 7.2, conversionRate: 8.9 },
    { source: 'Paid Ads', visitors: 1356, percentage: 4.6, conversionRate: 4.3 }
  ],
  salesByRegion: [
    { region: 'Lagos', sales: 145, revenue: 1200000, percentage: 50 },
    { region: 'Abuja', sales: 89, revenue: 720000, percentage: 30 },
    { region: 'Port Harcourt', sales: 56, revenue: 280000, percentage: 12 },
    { region: 'Kano', sales: 34, revenue: 136000, percentage: 5.7 },
    { region: 'Others', sales: 23, revenue: 64000, percentage: 2.3 }
  ]
}

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState('last_30_days')
  const [reportType, setReportType] = useState('overview')

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last_7_days', label: 'Last 7 Days' },
    { value: 'last_30_days', label: 'Last 30 Days' },
    { value: 'last_90_days', label: 'Last 90 Days' },
    { value: 'this_year', label: 'This Year' }
  ]

  const reportTypes = [
    { value: 'overview', label: 'Overview', icon: BarChart3 },
    { value: 'sales', label: 'Sales Report', icon: DollarSign },
    { value: 'products', label: 'Product Performance', icon: Package },
    { value: 'customers', label: 'Customer Analytics', icon: Users },
    { value: 'traffic', label: 'Traffic Sources', icon: Globe },
    { value: 'regional', label: 'Regional Sales', icon: Target }
  ]

  const renderTrendIcon = (change: number) => {
    return change >= 0 ? (
      <ArrowUpRight className="w-4 h-4 text-green-600" />
    ) : (
      <ArrowDownRight className="w-4 h-4 text-red-600" />
    )
  }

  const renderTrendText = (change: number) => {
    const color = change >= 0 ? 'text-green-600' : 'text-red-600'
    const symbol = change >= 0 ? '+' : ''
    return (
      <span className={`text-sm font-medium ${color}`}>
        {symbol}{change}%
      </span>
    )
  }

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-ink">₦{analyticsData.overview.totalRevenue.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2">
                {renderTrendIcon(analyticsData.overview.revenueChange)}
                {renderTrendText(analyticsData.overview.revenueChange)}
                <span className="text-sm text-muted-foreground">vs last period</span>
              </div>
            </div>
            <DollarSign className="w-8 h-8 text-gold" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold text-ink">{analyticsData.overview.totalOrders}</p>
              <div className="flex items-center gap-1 mt-2">
                {renderTrendIcon(analyticsData.overview.ordersChange)}
                {renderTrendText(analyticsData.overview.ordersChange)}
                <span className="text-sm text-muted-foreground">vs last period</span>
              </div>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
              <p className="text-2xl font-bold text-ink">{analyticsData.overview.totalCustomers}</p>
              <div className="flex items-center gap-1 mt-2">
                {renderTrendIcon(analyticsData.overview.customersChange)}
                {renderTrendText(analyticsData.overview.customersChange)}
                <span className="text-sm text-muted-foreground">vs last period</span>
              </div>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Order Value</p>
              <p className="text-2xl font-bold text-ink">₦{analyticsData.overview.averageOrderValue.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2">
                {renderTrendIcon(analyticsData.overview.aovChange)}
                {renderTrendText(analyticsData.overview.aovChange)}
                <span className="text-sm text-muted-foreground">vs last period</span>
              </div>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-bold text-ink">{analyticsData.overview.conversionRate}%</p>
              <div className="flex items-center gap-1 mt-2">
                {renderTrendIcon(analyticsData.overview.conversionChange)}
                {renderTrendText(analyticsData.overview.conversionChange)}
                <span className="text-sm text-muted-foreground">vs last period</span>
              </div>
            </div>
            <Target className="w-8 h-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Return Rate</p>
              <p className="text-2xl font-bold text-ink">{analyticsData.overview.returnRate}%</p>
              <div className="flex items-center gap-1 mt-2">
                {renderTrendIcon(analyticsData.overview.returnChange)}
                {renderTrendText(analyticsData.overview.returnChange)}
                <span className="text-sm text-muted-foreground">vs last period</span>
              </div>
            </div>
            <RefreshCw className="w-8 h-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-ink mb-4">Revenue Trend</h3>
          <div className="h-64 bg-gradient-to-br from-gold/10 to-yellow-100/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gold mx-auto mb-2" />
              <p className="text-muted-foreground">Revenue chart will be displayed here</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-ink mb-4">Sales by Category</h3>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <p className="text-muted-foreground">Pie chart will be displayed here</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )

  const renderProductsReport = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-ink mb-6">Top Performing Products</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Sales</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Revenue</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Growth</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.topProducts.map((product, index) => (
              <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-gold to-yellow-400 rounded-full flex items-center justify-center text-ink font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium text-ink">{product.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-ink">{product.sales}</td>
                <td className="py-4 px-4 font-semibold text-ink">₦{product.revenue.toLocaleString()}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    {renderTrendIcon(product.growth)}
                    {renderTrendText(product.growth)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )

  const renderCustomersReport = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-ink mb-6">Customer Segments</h3>
      <div className="space-y-4">
        {analyticsData.customerSegments.map((segment, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gold rounded-full"></div>
              <div>
                <p className="font-medium text-ink">{segment.segment}</p>
                <p className="text-sm text-muted-foreground">{segment.count} customers</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-ink">₦{segment.revenue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{segment.percentage}% of total</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )

  const renderTrafficReport = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-ink mb-6">Traffic Sources</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Source</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Visitors</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Percentage</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.trafficSources.map((source, index) => (
              <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-4 px-4 font-medium text-ink">{source.source}</td>
                <td className="py-4 px-4 text-ink">{source.visitors.toLocaleString()}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gold h-2 rounded-full" 
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground">{source.percentage}%</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-ink">{source.conversionRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )

  const renderRegionalReport = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-ink mb-6">Sales by Region</h3>
      <div className="space-y-4">
        {analyticsData.salesByRegion.map((region, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-ink">{region.region}</p>
                <p className="text-sm text-muted-foreground">{region.sales} orders</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-ink">₦{region.revenue.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${region.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground">{region.percentage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )

  const renderReportContent = () => {
    switch (reportType) {
      case 'overview':
        return renderOverviewReport()
      case 'products':
        return renderProductsReport()
      case 'customers':
        return renderCustomersReport()
      case 'traffic':
        return renderTrafficReport()
      case 'regional':
        return renderRegionalReport()
      default:
        return renderOverviewReport()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-ink">Reports & Analytics</h1>
          <p className="text-muted-foreground">Track your business performance and insights</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-ink">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gold text-ink hover:bg-gold/90">
            <FileText className="w-4 h-4 mr-2" />
            Schedule Report
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-muted-foreground mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-muted-foreground mb-2">Report Type</label>
            <div className="flex flex-wrap gap-2">
              {reportTypes.map((type) => {
                const IconComponent = type.icon
                return (
                  <Button
                    key={type.value}
                    variant={reportType === type.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setReportType(type.value)}
                    className={reportType === type.value ? "bg-gold text-ink" : ""}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {type.label}
                  </Button>
                )
              })}
            </div>
          </div>

          <div className="flex items-end gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </Card>

      {/* Report Content */}
      {renderReportContent()}
    </div>
  )
}

