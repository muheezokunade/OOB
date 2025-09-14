'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Edit, 
  Eye, 
  Plus,
  Save,
  Trash2,
  Clock,
  CheckCircle,
  Globe,
  Search,
  Filter,
  Loader2
} from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage?: string
  status: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
  author?: {
    firstName: string
    lastName: string
  }
  tags: string[]
  category?: string
}

// Mock content data (fallback)
const mockContentPages = [
  {
    id: 'about',
    title: 'About Us',
    slug: 'about',
    status: 'published',
    lastModified: '2024-01-15',
    author: 'Admin User',
    content: 'OmoOniBag is a luxury fashion brand dedicated to creating exquisite bags and shoes for the modern woman...',
    metaTitle: 'About OmoOniBag - Luxury Fashion Brand',
    metaDescription: 'Learn about OmoOniBag\'s commitment to luxury, quality, and empowering women through fashion.'
  },
  {
    id: 'contact',
    title: 'Contact Us',
    slug: 'contact',
    status: 'published',
    lastModified: '2024-01-14',
    author: 'Admin User',
    content: 'Get in touch with our team. We\'re here to help with any questions about our products...',
    metaTitle: 'Contact OmoOniBag - Get in Touch',
    metaDescription: 'Contact OmoOniBag for customer support, product inquiries, and partnership opportunities.'
  },
  {
    id: 'returns',
    title: 'Returns & Exchanges',
    slug: 'returns',
    status: 'published',
    lastModified: '2024-01-13',
    author: 'Admin User',
    content: 'Our return policy ensures you\'re completely satisfied with your purchase...',
    metaTitle: 'Returns & Exchanges - OmoOniBag',
    metaDescription: 'Learn about OmoOniBag\'s return and exchange policy for hassle-free shopping.'
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    slug: 'privacy',
    status: 'draft',
    lastModified: '2024-01-12',
    author: 'Admin User',
    content: 'This privacy policy explains how we collect, use, and protect your personal information...',
    metaTitle: 'Privacy Policy - OmoOniBag',
    metaDescription: 'Read OmoOniBag\'s privacy policy to understand how we protect your data.'
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    slug: 'terms',
    status: 'draft',
    lastModified: '2024-01-11',
    author: 'Admin User',
    content: 'These terms and conditions govern your use of our website and services...',
    metaTitle: 'Terms of Service - OmoOniBag',
    metaDescription: 'Read OmoOniBag\'s terms of service for using our website and services.'
  }
]

export default function AdminContentPage() {
  const [contentPages, setContentPages] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedPage, setSelectedPage] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchContentPages()
  }, [searchTerm, statusFilter])

  const fetchContentPages = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (statusFilter !== 'all') params.append('status', statusFilter)
      
      const response = await fetch(`/api/admin/blog?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setContentPages(data.data.posts)
      } else {
        // Fallback to mock data
        setContentPages(mockContentPages as any)
      }
    } catch (error) {
      console.error('Failed to fetch content pages:', error)
      // Fallback to mock data
      setContentPages(mockContentPages as any)
    } finally {
      setLoading(false)
    }
  }

  const statusOptions = ['all', 'published', 'draft']

  const filteredPages = contentPages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      draft: { color: 'bg-yellow-100 text-yellow-800', icon: Clock }
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
          <h1 className="text-3xl font-serif font-semibold text-ink">Content Manager</h1>
          <p className="text-muted-foreground">Manage your website pages and content</p>
        </div>
        <Button className="bg-gold text-ink hover:bg-gold/90">
          <Plus className="w-4 h-4 mr-2" />
          New Page
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Pages</p>
              <p className="text-2xl font-bold text-ink">12</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Published</p>
              <p className="text-2xl font-bold text-ink">8</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Drafts</p>
              <p className="text-2xl font-bold text-ink">4</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
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
                placeholder="Search pages by title or content..."
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
        </div>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pages List */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-ink">
                Pages ({filteredPages.length})
              </h3>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {filteredPages.map((page) => (
                <div
                  key={page.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedPage?.id === page.id 
                      ? 'border-gold bg-gold/5' 
                      : 'border-border hover:border-gold/30'
                  }`}
                  onClick={() => setSelectedPage(page)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-ink">{page.title}</h4>
                        {getStatusBadge(page.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">/{page.slug}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{page.content}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Last modified: {page.lastModified} by {page.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                        <Globe className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Page Editor */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            {selectedPage ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-ink">Page Editor</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Title</label>
                    {isEditing ? (
                      <Input value={selectedPage.title} className="mt-1" />
                    ) : (
                      <p className="text-ink mt-1">{selectedPage.title}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Slug</label>
                    {isEditing ? (
                      <Input value={selectedPage.slug} className="mt-1" />
                    ) : (
                      <p className="text-ink mt-1">/{selectedPage.slug}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="mt-1">
                      {getStatusBadge(selectedPage.status)}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Meta Title</label>
                    {isEditing ? (
                      <Input value={selectedPage.metaTitle} className="mt-1" />
                    ) : (
                      <p className="text-ink mt-1 text-sm">{selectedPage.metaTitle}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Meta Description</label>
                    {isEditing ? (
                      <textarea 
                        value={selectedPage.metaDescription}
                        className="w-full mt-1 p-2 border border-border rounded-md text-sm"
                        rows={3}
                      />
                    ) : (
                      <p className="text-ink mt-1 text-sm">{selectedPage.metaDescription}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Content</label>
                    {isEditing ? (
                      <textarea 
                        value={selectedPage.content}
                        className="w-full mt-1 p-2 border border-border rounded-md text-sm"
                        rows={8}
                      />
                    ) : (
                      <div className="mt-2 p-3 bg-muted/30 rounded-lg">
                        <p className="text-ink text-sm leading-relaxed">{selectedPage.content}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Modified</label>
                    <p className="text-ink mt-1 text-sm">{selectedPage.lastModified} by {selectedPage.author}</p>
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Button className="flex-1 bg-gold text-ink hover:bg-gold/90">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a page to edit</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

