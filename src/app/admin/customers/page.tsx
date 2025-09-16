'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Mail, 
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingBag,
  Download,
  UserPlus,
  MoreHorizontal,
  Loader2
} from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  location: string
  registrationDate: string
  lastActive: string
  totalOrders: number
  totalSpent: number
  status: 'active' | 'inactive' | 'blocked'
}

// Mock customer data (fallback)
const mockCustomers = [
  {
    id: 'CUST-001',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+234 801 234 5678',
    location: 'Lagos, Nigeria',
    registrationDate: '2024-01-10',
    lastActive: '2024-01-15',
    totalOrders: 5,
    totalSpent: 180000,
    status: 'active'
  },
  {
    id: 'CUST-002',
    name: 'Mary Okonkwo',
    email: 'mary.o@email.com',
    phone: '+234 802 345 6789',
    location: 'Abuja, Nigeria',
    registrationDate: '2024-01-08',
    lastActive: '2024-01-14',
    totalOrders: 3,
    totalSpent: 95000,
    status: 'active'
  },
  {
    id: 'CUST-003',
    name: 'Grace Adebayo',
    email: 'grace.a@email.com',
    phone: '+234 803 456 7890',
    location: 'Port Harcourt, Nigeria',
    registrationDate: '2024-01-05',
    lastActive: '2024-01-13',
    totalOrders: 2,
    totalSpent: 56000,
    status: 'active'
  },
  {
    id: 'CUST-004',
    name: 'Blessing Okafor',
    email: 'blessing.o@email.com',
    phone: '+234 804 567 8901',
    location: 'Kano, Nigeria',
    registrationDate: '2024-01-03',
    lastActive: '2024-01-12',
    totalOrders: 1,
    totalSpent: 55000,
    status: 'active'
  },
  {
    id: 'CUST-005',
    name: 'Joyce Nwosu',
    email: 'joyce.n@email.com',
    phone: '+234 805 678 9012',
    location: 'Ibadan, Nigeria',
    registrationDate: '2024-01-01',
    lastActive: '2024-01-11',
    totalOrders: 4,
    totalSpent: 152000,
    status: 'active'
  }
]

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('registrationDate')

  useEffect(() => {
    fetchCustomers()
  }, [searchTerm, statusFilter])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (statusFilter !== 'all') params.append('status', statusFilter)
      
      const response = await fetch(`/api/admin/users?${params}`)
      const data = await response.json()
      const list: Customer[] = data?.data?.users ?? (mockCustomers as any)
      setCustomers(list)
    } catch (error) {
      console.error('Failed to fetch customers:', error)
      // Fallback to mock data
      setCustomers(mockCustomers as any)
    } finally {
      setLoading(false)
    }
  }

  const statusOptions = ['all', 'active', 'inactive', 'blocked']

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (customer.phone?.includes(searchTerm) ?? false) ||
                         customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'totalSpent':
        return b.totalSpent - a.totalSpent
      case 'totalOrders':
        return b.totalOrders - a.totalOrders
      case 'lastActive':
        return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
      default:
        return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()
    }
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', text: 'Active' },
      inactive: { color: 'bg-yellow-100 text-yellow-800', text: 'Inactive' },
      blocked: { color: 'bg-red-100 text-red-800', text: 'Blocked' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    
    return (
      <Badge className={config.color}>
        {config.text}
      </Badge>
    )
  }

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 200000) return { tier: 'VIP', color: 'bg-gold/20 text-gold' }
    if (totalSpent >= 100000) return { tier: 'Gold', color: 'bg-yellow-100 text-yellow-800' }
    if (totalSpent >= 50000) return { tier: 'Silver', color: 'bg-gray-100 text-gray-800' }
    return { tier: 'Bronze', color: 'bg-orange-100 text-orange-800' }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-ink">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-ink">
            <Download className="w-4 h-4 mr-2" />
            Export Customers
          </Button>
          <Button className="bg-gold text-ink hover:bg-gold/90">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
              <p className="text-2xl font-bold text-ink">1,234</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
              <p className="text-2xl font-bold text-ink">1,156</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">New This Month</p>
              <p className="text-2xl font-bold text-ink">89</p>
            </div>
            <UserPlus className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">VIP Customers</p>
              <p className="text-2xl font-bold text-ink">45</p>
            </div>
            <DollarSign className="w-8 h-8 text-gold" />
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
                placeholder="Search customers by name, email, phone, or location..."
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

          {/* Sort */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-border rounded-md text-sm bg-background"
            >
              <option value="registrationDate">Newest First</option>
              <option value="name">Name A-Z</option>
              <option value="totalSpent">Highest Spent</option>
              <option value="totalOrders">Most Orders</option>
              <option value="lastActive">Recently Active</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Customers Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-ink">
            Customers ({filteredCustomers.length})
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
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Registration</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Orders</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Total Spent</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tier</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => {
                const tier = getCustomerTier(customer.totalSpent)
                return (
                  <tr key={customer.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gold to-yellow-400 rounded-full flex items-center justify-center">
                          <span className="text-ink font-semibold text-sm">
                            {customer.name.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-ink">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm text-ink">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{customer.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm text-ink">{customer.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm text-ink">{customer.registrationDate}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm text-ink">{customer.totalOrders}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-ink">
                      ₦{customer.totalSpent.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={tier.color}>
                        {tier.tier}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(customer.status)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

