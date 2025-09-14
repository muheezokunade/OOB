'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Percent, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Copy,
  Eye,
  Calendar,
  DollarSign,
  Users,
  Tag,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'

// Mock discount data
const discounts = [
  {
    id: 'DISC-001',
    code: 'WELCOME20',
    name: 'Welcome Discount',
    description: '20% off for new customers',
    type: 'percentage',
    value: 20,
    minPurchase: 25000,
    maxUses: 100,
    currentUses: 45,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'active',
    applicableTo: 'all'
  },
  {
    id: 'DISC-002',
    code: 'FREESHIP',
    name: 'Free Shipping',
    description: 'Free shipping on orders over ₦50,000',
    type: 'free_shipping',
    value: 0,
    minPurchase: 50000,
    maxUses: null,
    currentUses: 234,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'active',
    applicableTo: 'all'
  },
  {
    id: 'DISC-003',
    code: 'SUMMER15',
    name: 'Summer Sale',
    description: '15% off summer collection',
    type: 'percentage',
    value: 15,
    minPurchase: 30000,
    maxUses: 200,
    currentUses: 89,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    status: 'scheduled',
    applicableTo: 'category'
  },
  {
    id: 'DISC-004',
    code: 'FIXED5K',
    name: 'Fixed Discount',
    description: '₦5,000 off any order',
    type: 'fixed',
    value: 5000,
    minPurchase: 40000,
    maxUses: 50,
    currentUses: 50,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    status: 'expired',
    applicableTo: 'all'
  },
  {
    id: 'DISC-005',
    code: 'VIP30',
    name: 'VIP Customer Discount',
    description: '30% off for VIP customers',
    type: 'percentage',
    value: 30,
    minPurchase: 0,
    maxUses: null,
    currentUses: 12,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'active',
    applicableTo: 'customer_group'
  }
]

export default function AdminDiscountsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedDiscount, setSelectedDiscount] = useState<any>(null)

  const statusOptions = ['all', 'active', 'scheduled', 'expired', 'disabled']
  const typeOptions = ['all', 'percentage', 'fixed', 'free_shipping']

  const filteredDiscounts = discounts.filter(discount => {
    const matchesSearch = discount.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discount.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || discount.status === statusFilter
    const matchesType = typeFilter === 'all' || discount.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      scheduled: { color: 'bg-blue-100 text-blue-800', icon: Clock },
      expired: { color: 'bg-red-100 text-red-800', icon: XCircle },
      disabled: { color: 'bg-gray-100 text-gray-800', icon: XCircle }
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

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      percentage: { color: 'bg-purple-100 text-purple-800', text: 'Percentage' },
      fixed: { color: 'bg-blue-100 text-blue-800', text: 'Fixed Amount' },
      free_shipping: { color: 'bg-green-100 text-green-800', text: 'Free Shipping' }
    }
    
    const config = typeConfig[type as keyof typeof typeConfig]
    
    return (
      <Badge className={config.color}>
        {config.text}
      </Badge>
    )
  }

  const formatValue = (type: string, value: number) => {
    switch (type) {
      case 'percentage':
        return `${value}%`
      case 'fixed':
        return `₦${value.toLocaleString()}`
      case 'free_shipping':
        return 'Free Shipping'
      default:
        return value
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-ink">Discount Codes</h1>
          <p className="text-muted-foreground">Manage discount codes and promotional campaigns</p>
        </div>
        <Button className="bg-gold text-ink hover:bg-gold/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Discount
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Discounts</p>
              <p className="text-2xl font-bold text-ink">24</p>
            </div>
            <Percent className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Discounts</p>
              <p className="text-2xl font-bold text-ink">8</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Savings</p>
              <p className="text-2xl font-bold text-ink">₦2.4M</p>
            </div>
            <DollarSign className="w-8 h-8 text-gold" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Uses</p>
              <p className="text-2xl font-bold text-ink">1,234</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search discounts by code, name, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
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
          <div className="flex gap-2">
            {typeOptions.map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter(type)}
                className={typeFilter === type ? "bg-gold text-ink" : ""}
              >
                {type === 'all' ? 'All Types' : type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Discounts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Discounts List */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-ink">
                Discounts ({filteredDiscounts.length})
              </h3>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filter
              </Button>
            </div>

            <div className="space-y-4">
              {filteredDiscounts.map((discount) => (
                <div
                  key={discount.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedDiscount?.id === discount.id 
                      ? 'border-gold bg-gold/5' 
                      : 'border-border hover:border-gold/30'
                  }`}
                  onClick={() => setSelectedDiscount(discount)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-gold" />
                          <span className="font-mono text-lg font-bold text-ink">{discount.code}</span>
                        </div>
                        <div className="flex gap-2">
                          {getStatusBadge(discount.status)}
                          {getTypeBadge(discount.type)}
                        </div>
                      </div>
                      <h4 className="font-medium text-ink mb-1">{discount.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{discount.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Value: {formatValue(discount.type, discount.value)}</span>
                        <span>Min: ₦{discount.minPurchase.toLocaleString()}</span>
                        {discount.maxUses && (
                          <span>Uses: {discount.currentUses}/{discount.maxUses}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{discount.startDate} - {discount.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Discount Details */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            {selectedDiscount ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-ink">Discount Details</h3>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Code</label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-lg font-bold text-ink">{selectedDiscount.code}</span>
                      <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="text-ink mt-1">{selectedDiscount.name}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <p className="text-ink mt-1">{selectedDiscount.description}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Type & Value</label>
                    <div className="flex gap-2 mt-1">
                      {getTypeBadge(selectedDiscount.type)}
                      <span className="text-ink font-semibold">
                        {formatValue(selectedDiscount.type, selectedDiscount.value)}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="mt-1">
                      {getStatusBadge(selectedDiscount.status)}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Min Purchase</label>
                    <p className="text-ink mt-1">₦{selectedDiscount.minPurchase.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Usage</label>
                    <div className="mt-1">
                      {selectedDiscount.maxUses ? (
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>{selectedDiscount.currentUses} used</span>
                            <span>{selectedDiscount.maxUses} total</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-gold h-2 rounded-full" 
                              style={{ 
                                width: `${(selectedDiscount.currentUses / selectedDiscount.maxUses) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-ink">{selectedDiscount.currentUses} uses (unlimited)</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Valid Period</label>
                    <div className="mt-1 text-sm text-ink">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{selectedDiscount.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3" />
                        <span>{selectedDiscount.endDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Applicable To</label>
                    <Badge variant="outline" className="mt-1">
                      {selectedDiscount.applicableTo.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button className="flex-1 bg-gold text-ink hover:bg-gold/90">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Percent className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a discount to view details</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}



