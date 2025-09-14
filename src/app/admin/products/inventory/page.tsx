'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Package, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  Loader2
} from 'lucide-react'

interface InventoryItem {
  id: string
  name: string
  sku: string
  currentStock: number
  reservedStock: number
  availableStock: number
  lowStockThreshold: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  lastUpdated: string
  category: string
  price: number
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      setLoading(true)
      // Mock data for now - replace with actual API call
      const mockInventory: InventoryItem[] = [
        {
          id: '1',
          name: 'Luxury Leather Tote',
          sku: 'BAG-001',
          currentStock: 15,
          reservedStock: 3,
          availableStock: 12,
          lowStockThreshold: 5,
          status: 'in_stock',
          lastUpdated: '2024-01-15',
          category: 'Bags',
          price: 45000
        },
        {
          id: '2',
          name: 'Elegant Evening Clutch',
          sku: 'BAG-002',
          currentStock: 3,
          reservedStock: 1,
          availableStock: 2,
          lowStockThreshold: 5,
          status: 'low_stock',
          lastUpdated: '2024-01-14',
          category: 'Bags',
          price: 32000
        },
        {
          id: '3',
          name: 'Designer Heels',
          sku: 'SHOE-001',
          currentStock: 0,
          reservedStock: 0,
          availableStock: 0,
          lowStockThreshold: 3,
          status: 'out_of_stock',
          lastUpdated: '2024-01-13',
          category: 'Shoes',
          price: 55000
        },
        {
          id: '4',
          name: 'Comfortable Flats',
          sku: 'SHOE-002',
          currentStock: 8,
          reservedStock: 2,
          availableStock: 6,
          lowStockThreshold: 3,
          status: 'in_stock',
          lastUpdated: '2024-01-12',
          category: 'Shoes',
          price: 38000
        },
        {
          id: '5',
          name: 'Premium Crossbody Bag',
          sku: 'BAG-003',
          currentStock: 22,
          reservedStock: 4,
          availableStock: 18,
          lowStockThreshold: 5,
          status: 'in_stock',
          lastUpdated: '2024-01-11',
          category: 'Bags',
          price: 42000
        }
      ]
      setInventory(mockInventory)
    } catch (error) {
      console.error('Failed to fetch inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      in_stock: { color: 'bg-green-100 text-green-800', label: 'In Stock' },
      low_stock: { color: 'bg-yellow-100 text-yellow-800', label: 'Low Stock' },
      out_of_stock: { color: 'bg-red-100 text-red-800', label: 'Out of Stock' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    
    return (
      <Badge className={config?.color || 'bg-gray-100 text-gray-800'}>
        {config?.label || status}
      </Badge>
    )
  }

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const stats = {
    totalProducts: inventory.length,
    inStock: inventory.filter(item => item.status === 'in_stock').length,
    lowStock: inventory.filter(item => item.status === 'low_stock').length,
    outOfStock: inventory.filter(item => item.status === 'out_of_stock').length,
    totalValue: inventory.reduce((sum, item) => sum + (item.currentStock * item.price), 0)
  }

  const categories = [...new Set(inventory.map(item => item.category))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-ink">Inventory Management</h1>
          <p className="text-muted-foreground">Track and manage your product inventory</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-ink">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gold text-ink hover:bg-gold/90">
            <Package className="w-4 h-4 mr-2" />
            Update Stock
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Products</p>
              <p className="text-2xl font-bold text-ink">{stats.totalProducts}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">In Stock</p>
              <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold text-ink">₦{(stats.totalValue / 1000000).toFixed(1)}M</p>
            </div>
            <Package className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md text-sm bg-background"
            >
              <option value="all">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md text-sm bg-background"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Inventory Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-ink">
            Inventory ({filteredInventory.length} products)
          </h2>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-gold" />
            <span className="ml-2 text-ink/60">Loading inventory...</span>
          </div>
        ) : filteredInventory.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-ink/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-ink mb-2">No products found</h3>
            <p className="text-ink/60">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">SKU</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Current Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Available</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-ink">{item.name}</p>
                        <p className="text-sm text-muted-foreground">₦{item.price.toLocaleString()}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-sm text-ink">{item.sku}</td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className="py-4 px-4 text-ink">{item.currentStock}</td>
                    <td className="py-4 px-4 text-ink">{item.availableStock}</td>
                    <td className="py-4 px-4">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-4 px-4 font-semibold text-ink">
                      ₦{(item.currentStock * item.price).toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {new Date(item.lastUpdated).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
