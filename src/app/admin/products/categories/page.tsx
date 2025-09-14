'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Tag, 
  Plus,
  Edit,
  Trash2,
  Search,
  Loader2
} from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  isActive: boolean
  productCount: number
  createdAt: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentId: '',
    isActive: true
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      // Mock data for now - replace with actual API call
      const mockCategories: Category[] = [
        {
          id: '1',
          name: 'Bags',
          slug: 'bags',
          description: 'Luxury handbags and purses',
          isActive: true,
          productCount: 24,
          createdAt: '2024-01-01'
        },
        {
          id: '2',
          name: 'Shoes',
          slug: 'shoes',
          description: 'Elegant footwear for every occasion',
          isActive: true,
          productCount: 18,
          createdAt: '2024-01-01'
        },
        {
          id: '3',
          name: 'Totes',
          slug: 'totes',
          description: 'Large capacity bags for daily use',
          parentId: '1',
          isActive: true,
          productCount: 8,
          createdAt: '2024-01-01'
        },
        {
          id: '4',
          name: 'Clutches',
          slug: 'clutches',
          description: 'Evening bags and small purses',
          parentId: '1',
          isActive: true,
          productCount: 12,
          createdAt: '2024-01-01'
        },
        {
          id: '5',
          name: 'Heels',
          slug: 'heels',
          description: 'High-heeled shoes for special occasions',
          parentId: '2',
          isActive: true,
          productCount: 10,
          createdAt: '2024-01-01'
        },
        {
          id: '6',
          name: 'Flats',
          slug: 'flats',
          description: 'Comfortable flat shoes for everyday wear',
          parentId: '2',
          isActive: true,
          productCount: 8,
          createdAt: '2024-01-01'
        }
      ]
      setCategories(mockCategories)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingCategory) {
        // Update existing category
        const response = await fetch(`/api/admin/categories/${editingCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (response.ok) {
          fetchCategories()
          setEditingCategory(null)
          setFormData({ name: '', slug: '', description: '', parentId: '', isActive: true })
        }
      } else {
        // Create new category
        const response = await fetch('/api/admin/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (response.ok) {
          fetchCategories()
          setShowAddForm(false)
          setFormData({ name: '', slug: '', description: '', parentId: '', isActive: true })
        }
      }
    } catch (error) {
      console.error('Failed to save category:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch(`/api/admin/categories/${id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          fetchCategories()
        }
      } catch (error) {
        console.error('Failed to delete category:', error)
      }
    }
  }

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const parentCategories = categories.filter(cat => !cat.parentId)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-ink">Product Categories</h1>
          <p className="text-muted-foreground">Manage your product categories and subcategories</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-gold text-ink hover:bg-gold/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Categories</p>
              <p className="text-2xl font-bold text-ink">{categories.length}</p>
            </div>
            <Tag className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Parent Categories</p>
              <p className="text-2xl font-bold text-ink">{parentCategories.length}</p>
            </div>
            <Tag className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Subcategories</p>
              <p className="text-2xl font-bold text-ink">{categories.length - parentCategories.length}</p>
            </div>
            <Tag className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Categories</p>
              <p className="text-2xl font-bold text-ink">{categories.filter(c => c.isActive).length}</p>
            </div>
            <Tag className="w-8 h-8 text-gold" />
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Add/Edit Form */}
      {(showAddForm || editingCategory) && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-ink mb-4">
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Category Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Slug</label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="category-slug"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Parent Category</label>
                <select
                  value={formData.parentId}
                  onChange={(e) => setFormData(prev => ({ ...prev, parentId: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background"
                >
                  <option value="">No parent (main category)</option>
                  {parentCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="rounded border-border"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-ink">
                  Active
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter category description"
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background min-h-[80px]"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="bg-gold text-ink hover:bg-gold/90">
                {editingCategory ? 'Update Category' : 'Add Category'}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingCategory(null)
                  setFormData({ name: '', slug: '', description: '', parentId: '', isActive: true })
                }}
                className="border-gold text-gold hover:bg-gold hover:text-ink"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Categories List */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-ink mb-4">Categories</h2>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-gold" />
            <span className="ml-2 text-ink/60">Loading categories...</span>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <Tag className="w-12 h-12 text-ink/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-ink mb-2">No categories found</h3>
            <p className="text-ink/60 mb-4">Create your first category to get started.</p>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gold text-ink hover:bg-gold/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCategories.map((category) => {
              const parent = categories.find(c => c.id === category.parentId)
              return (
                <div key={category.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-ink">{category.name}</h3>
                        <Badge variant={category.isActive ? "default" : "secondary"}>
                          {category.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        {parent && (
                          <Badge variant="outline">
                            {parent.name}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {category.description || 'No description'}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Slug: {category.slug}</span>
                        <span>Products: {category.productCount}</span>
                        <span>Created: {new Date(category.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingCategory(category)
                          setFormData({
                            name: category.name,
                            slug: category.slug,
                            description: category.description || '',
                            parentId: category.parentId || '',
                            isActive: category.isActive
                          })
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}
