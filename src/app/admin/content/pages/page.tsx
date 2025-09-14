'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  Globe,
  Loader2
} from 'lucide-react'

interface Page {
  id: string
  title: string
  slug: string
  content: string
  status: 'published' | 'draft'
  metaTitle?: string
  metaDescription?: string
  lastModified: string
  author: string
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    status: 'draft' as 'published' | 'draft',
    metaTitle: '',
    metaDescription: ''
  })

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      setLoading(true)
      // Mock data for now - replace with actual API call
      const mockPages: Page[] = [
        {
          id: '1',
          title: 'About Us',
          slug: 'about',
          content: 'OmoOniBag is a luxury fashion brand dedicated to creating exquisite bags and shoes for the modern woman...',
          status: 'published',
          metaTitle: 'About OmoOniBag - Luxury Fashion Brand',
          metaDescription: 'Learn about OmoOniBag\'s commitment to luxury, quality, and empowering women through fashion.',
          lastModified: '2024-01-15',
          author: 'Admin User'
        },
        {
          id: '2',
          title: 'Contact Us',
          slug: 'contact',
          content: 'Get in touch with our team. We\'re here to help with any questions about our products...',
          status: 'published',
          metaTitle: 'Contact OmoOniBag - Get in Touch',
          metaDescription: 'Contact OmoOniBag for customer support, product inquiries, and partnership opportunities.',
          lastModified: '2024-01-14',
          author: 'Admin User'
        },
        {
          id: '3',
          title: 'Returns & Exchanges',
          slug: 'returns',
          content: 'We want you to be completely satisfied with your purchase. Here\'s our return and exchange policy...',
          status: 'published',
          metaTitle: 'Returns & Exchanges - OmoOniBag',
          metaDescription: 'Learn about OmoOniBag\'s return and exchange policy for your peace of mind.',
          lastModified: '2024-01-13',
          author: 'Admin User'
        },
        {
          id: '4',
          title: 'Privacy Policy',
          slug: 'privacy',
          content: 'Your privacy is important to us. This policy explains how we collect, use, and protect your information...',
          status: 'draft',
          metaTitle: 'Privacy Policy - OmoOniBag',
          metaDescription: 'Read OmoOniBag\'s privacy policy to understand how we protect your personal information.',
          lastModified: '2024-01-12',
          author: 'Admin User'
        },
        {
          id: '5',
          title: 'Terms of Service',
          slug: 'terms',
          content: 'By using our website and services, you agree to these terms and conditions...',
          status: 'draft',
          metaTitle: 'Terms of Service - OmoOniBag',
          metaDescription: 'Read OmoOniBag\'s terms of service for using our website and services.',
          lastModified: '2024-01-11',
          author: 'Admin User'
        }
      ]
      setPages(mockPages)
    } catch (error) {
      console.error('Failed to fetch pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingPage) {
        // Update existing page
        const response = await fetch(`/api/admin/pages/${editingPage.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (response.ok) {
          fetchPages()
          setEditingPage(null)
          setFormData({ title: '', slug: '', content: '', status: 'draft', metaTitle: '', metaDescription: '' })
        }
      } else {
        // Create new page
        const response = await fetch('/api/admin/pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (response.ok) {
          fetchPages()
          setShowAddForm(false)
          setFormData({ title: '', slug: '', content: '', status: 'draft', metaTitle: '', metaDescription: '' })
        }
      }
    } catch (error) {
      console.error('Failed to save page:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      try {
        const response = await fetch(`/api/admin/pages/${id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          fetchPages()
        }
      } catch (error) {
        console.error('Failed to delete page:', error)
      }
    }
  }

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: pages.length,
    published: pages.filter(p => p.status === 'published').length,
    draft: pages.filter(p => p.status === 'draft').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-ink">Content Pages</h1>
          <p className="text-muted-foreground">Manage your website pages and content</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-gold text-ink hover:bg-gold/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Page
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Pages</p>
              <p className="text-2xl font-bold text-ink">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Published</p>
              <p className="text-2xl font-bold text-green-600">{stats.published}</p>
            </div>
            <Globe className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Drafts</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.draft}</p>
            </div>
            <FileText className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search pages..."
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
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Add/Edit Form */}
      {(showAddForm || editingPage) && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-ink mb-4">
            {editingPage ? 'Edit Page' : 'Add New Page'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Page Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter page title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Slug</label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="page-slug"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'published' | 'draft' }))}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter page content"
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background min-h-[200px]"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Meta Title</label>
                <Input
                  value={formData.metaTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                  placeholder="SEO meta title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Meta Description</label>
                <Input
                  value={formData.metaDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                  placeholder="SEO meta description"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="bg-gold text-ink hover:bg-gold/90">
                {editingPage ? 'Update Page' : 'Add Page'}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingPage(null)
                  setFormData({ title: '', slug: '', content: '', status: 'draft', metaTitle: '', metaDescription: '' })
                }}
                className="border-gold text-gold hover:bg-gold hover:text-ink"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Pages List */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-ink mb-4">Pages</h2>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-gold" />
            <span className="ml-2 text-ink/60">Loading pages...</span>
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-ink/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-ink mb-2">No pages found</h3>
            <p className="text-ink/60 mb-4">Create your first page to get started.</p>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gold text-ink hover:bg-gold/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Page
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPages.map((page) => (
              <div key={page.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-ink">{page.title}</h3>
                      <Badge variant={page.status === 'published' ? "default" : "secondary"}>
                        {page.status === 'published' ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Slug: /{page.slug}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {page.content.substring(0, 150)}...
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Author: {page.author}</span>
                      <span>Modified: {new Date(page.lastModified).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`/${page.slug}`, '_blank')}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingPage(page)
                        setFormData({
                          title: page.title,
                          slug: page.slug,
                          content: page.content,
                          status: page.status,
                          metaTitle: page.metaTitle || '',
                          metaDescription: page.metaDescription || ''
                        })
                      }}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(page.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
