'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Camera, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Grid,
  List,
  Heart,
  Share2,
  Download,
  Upload,
  Star,
  Tag
} from 'lucide-react'

// Mock lookbook data
const lookbookItems = [
  {
    id: 'LOOK-001',
    title: 'Spring Elegance Collection',
    description: 'A sophisticated look featuring our signature tote paired with minimalist accessories.',
    category: 'Editorial',
    season: 'Spring 2024',
    photographer: 'Alex Fashion',
    model: 'Grace Model',
    location: 'Lagos Studio',
    shootDate: '2024-01-15',
    status: 'published',
    featuredImage: '/images/lookbook/spring-elegance.jpg',
    images: [
      '/images/lookbook/spring-elegance-1.jpg',
      '/images/lookbook/spring-elegance-2.jpg',
      '/images/lookbook/spring-elegance-3.jpg'
    ],
    products: [
      { id: 'luxury-tote-black', name: 'Luxury Leather Tote', price: 45000 },
      { id: 'elegant-clutch-gold', name: 'Elegant Evening Clutch', price: 25000 }
    ],
    tags: ['spring', 'elegant', 'minimalist', 'professional'],
    likes: 234,
    shares: 56,
    views: 1890
  },
  {
    id: 'LOOK-002',
    title: 'Urban Chic Street Style',
    description: 'Bold street style look combining luxury accessories with contemporary fashion.',
    category: 'Street Style',
    season: 'All Season',
    photographer: 'Mike Street',
    model: 'Sarah Urban',
    location: 'Victoria Island',
    shootDate: '2024-01-12',
    status: 'published',
    featuredImage: '/images/lookbook/urban-chic.jpg',
    images: [
      '/images/lookbook/urban-chic-1.jpg',
      '/images/lookbook/urban-chic-2.jpg'
    ],
    products: [
      { id: 'mini-crossbody-tan', name: 'Mini Crossbody Bag', price: 22000 },
      { id: 'casual-flats-white', name: 'Casual Ballet Flats', price: 15000 }
    ],
    tags: ['street', 'urban', 'casual', 'trendy'],
    likes: 189,
    shares: 43,
    views: 1456
  },
  {
    id: 'LOOK-003',
    title: 'Evening Glamour',
    description: 'Sophisticated evening look perfect for special occasions and events.',
    category: 'Evening',
    season: 'Winter 2024',
    photographer: 'Joy Glamour',
    model: 'Blessing Elite',
    location: 'Luxury Hotel',
    shootDate: '2024-01-10',
    status: 'draft',
    featuredImage: '/images/lookbook/evening-glamour.jpg',
    images: [
      '/images/lookbook/evening-glamour-1.jpg',
      '/images/lookbook/evening-glamour-2.jpg',
      '/images/lookbook/evening-glamour-3.jpg',
      '/images/lookbook/evening-glamour-4.jpg'
    ],
    products: [
      { id: 'elegant-clutch-gold', name: 'Elegant Evening Clutch', price: 25000 },
      { id: 'party-heels-gold', name: 'Party Gold Heels', price: 30000 }
    ],
    tags: ['evening', 'glamour', 'luxury', 'formal'],
    likes: 0,
    shares: 0,
    views: 0
  },
  {
    id: 'LOOK-004',
    title: 'Office Power Dressing',
    description: 'Professional power look for the modern working woman.',
    category: 'Professional',
    season: 'All Season',
    photographer: 'Grace Professional',
    model: 'Mary Executive',
    location: 'Corporate Office',
    shootDate: '2024-01-08',
    status: 'scheduled',
    featuredImage: '/images/lookbook/office-power.jpg',
    images: [
      '/images/lookbook/office-power-1.jpg',
      '/images/lookbook/office-power-2.jpg'
    ],
    products: [
      { id: 'business-briefcase-black', name: 'Professional Briefcase', price: 55000 },
      { id: 'office-pumps-black', name: 'Professional Office Pumps', price: 28000 }
    ],
    tags: ['office', 'professional', 'power', 'executive'],
    likes: 0,
    shares: 0,
    views: 0
  }
]

const categories = ['All', 'Editorial', 'Street Style', 'Evening', 'Professional', 'Casual']
const seasons = ['All Season', 'Spring 2024', 'Summer 2024', 'Fall 2024', 'Winter 2024']

export default function AdminLookbookPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedLook, setSelectedLook] = useState<any>(null)

  const statusOptions = ['all', 'published', 'draft', 'scheduled']

  const filteredLooks = lookbookItems.filter(look => {
    const matchesSearch = look.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         look.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         look.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || look.status === statusFilter
    const matchesCategory = categoryFilter === 'All' || look.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { color: 'bg-green-100 text-green-800', icon: Eye },
      draft: { color: 'bg-yellow-100 text-yellow-800', icon: Edit },
      scheduled: { color: 'bg-blue-100 text-blue-800', icon: Calendar }
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
          <h1 className="text-3xl font-serif font-semibold text-ink">Lookbook Manager</h1>
          <p className="text-muted-foreground">Create and manage your fashion lookbooks</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-ink">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
          <Button className="bg-gold text-ink hover:bg-gold/90">
            <Plus className="w-4 h-4 mr-2" />
            New Lookbook
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Looks</p>
              <p className="text-2xl font-bold text-ink">36</p>
            </div>
            <Camera className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Published</p>
              <p className="text-2xl font-bold text-ink">28</p>
            </div>
            <Eye className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Views</p>
              <p className="text-2xl font-bold text-ink">24.5K</p>
            </div>
            <Star className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Engagement</p>
              <p className="text-2xl font-bold text-ink">12.3%</p>
            </div>
            <Heart className="w-8 h-8 text-red-600" />
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
                placeholder="Search lookbooks by title, description, or tags..."
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
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md text-sm bg-background"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? "bg-gold text-ink" : ""}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? "bg-gold text-ink" : ""}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Lookbook Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lookbook Grid/List */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-ink">
                Lookbooks ({filteredLooks.length})
              </h3>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filter
              </Button>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLooks.map((look) => (
                  <div
                    key={look.id}
                    className={`group cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedLook?.id === look.id ? 'ring-2 ring-gold' : ''
                    }`}
                    onClick={() => setSelectedLook(look)}
                  >
                    {/* Featured Image */}
                    <div className="relative aspect-[4/5] bg-gradient-to-br from-fog to-stone rounded-lg overflow-hidden mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Camera className="w-12 h-12 text-ink/60" />
                      </div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        {getStatusBadge(look.status)}
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 right-3">
                        <Badge variant="outline" className="bg-white/90">
                          {look.category}
                        </Badge>
                      </div>
                      
                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                        <Button size="sm" className="bg-white text-ink hover:bg-gray-100">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-white text-ink hover:bg-gray-100">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-white text-ink hover:bg-gray-100">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {/* Image Count */}
                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-black/70 text-white">
                          {look.images.length} photos
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-ink group-hover:text-gold transition-colors">
                        {look.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {look.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{look.shootDate}</span>
                        <span>•</span>
                        <User className="w-3 h-3" />
                        <span>{look.photographer}</span>
                      </div>
                      
                      {look.status === 'published' && (
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{look.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            <span>{look.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="w-3 h-3" />
                            <span>{look.shares}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-1">
                        {look.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                        {look.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{look.tags.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLooks.map((look) => (
                  <div
                    key={look.id}
                    className={`flex gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedLook?.id === look.id 
                        ? 'border-gold bg-gold/5' 
                        : 'border-border hover:border-gold/30'
                    }`}
                    onClick={() => setSelectedLook(look)}
                  >
                    {/* Thumbnail */}
                    <div className="w-24 h-32 bg-gradient-to-br from-fog to-stone rounded-lg flex-shrink-0 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-ink/60" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(look.status)}
                          <Badge variant="outline">{look.category}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {look.images.length} photos
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-ink mb-1">{look.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {look.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{look.shootDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{look.photographer}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {look.tags.slice(0, 4).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Stats & Actions */}
                    <div className="flex flex-col justify-between items-end">
                      {look.status === 'published' && (
                        <div className="text-right text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{look.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            <span>{look.likes}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-1 mt-2">
                        <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Lookbook Details */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            {selectedLook ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-ink">Lookbook Details</h3>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Title</label>
                    <p className="text-ink mt-1 font-medium">{selectedLook.title}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status & Category</label>
                    <div className="flex gap-2 mt-1">
                      {getStatusBadge(selectedLook.status)}
                      <Badge variant="outline">{selectedLook.category}</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <p className="text-ink mt-1 text-sm">{selectedLook.description}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Shoot Details</label>
                    <div className="mt-1 space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span>{selectedLook.shootDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Camera className="w-3 h-3 text-muted-foreground" />
                        <span>{selectedLook.photographer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 text-muted-foreground" />
                        <span>{selectedLook.model}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 text-muted-foreground">📍</span>
                        <span>{selectedLook.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Featured Products</label>
                    <div className="mt-1 space-y-2">
                      {selectedLook.products.map((product: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                          <span className="text-sm text-ink">{product.name}</span>
                          <span className="text-sm font-medium text-gold">₦{product.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tags</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedLook.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Images</label>
                    <p className="text-ink mt-1">{selectedLook.images.length} photos</p>
                  </div>
                  
                  {selectedLook.status === 'published' && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Performance</label>
                      <div className="mt-1 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            Views
                          </span>
                          <span className="font-medium">{selectedLook.views}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            Likes
                          </span>
                          <span className="font-medium">{selectedLook.likes}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Share2 className="w-3 h-3" />
                            Shares
                          </span>
                          <span className="font-medium">{selectedLook.shares}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button className="flex-1 bg-gold text-ink hover:bg-gold/90">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a lookbook to view details</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}





