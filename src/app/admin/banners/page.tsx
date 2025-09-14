'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, Eye, Calendar, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useBannerStore } from '@/store/banner-store'
import { BannerImageUpload } from '@/components/ui/image-upload'
import { CloudinaryImage } from '@/components/ui/cloudinary-image'

interface Banner {
  id: string
  title: string
  subtitle?: string
  image: string
  link?: string
  linkText?: string
  type: string
  category?: string
  priority: number
  isActive: boolean
  startDate?: string
  endDate?: string
  createdAt: string
  updatedAt: string
}

export default function BannersPage() {
  const { banners, loading, fetchBanners, createBanner, updateBanner, deleteBanner } = useBannerStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: '',
    link: '',
    linkText: '',
    type: 'hero',
    category: '',
    priority: 0,
    isActive: true,
    startDate: '',
    endDate: ''
  })

  useEffect(() => {
    fetchBanners()
  }, [fetchBanners])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingBanner) {
        await updateBanner(editingBanner.id, formData)
        toast.success('Banner updated successfully')
      } else {
        await createBanner(formData)
        toast.success('Banner created successfully')
      }
      
      setIsDialogOpen(false)
      setEditingBanner(null)
      resetForm()
    } catch (error) {
      toast.error('Error saving banner')
    }
  }

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || '',
      image: banner.image,
      link: banner.link || '',
      linkText: banner.linkText || '',
      type: banner.type,
      category: banner.category || '',
      priority: banner.priority,
      isActive: banner.isActive,
      startDate: banner.startDate ? banner.startDate.split('T')[0] : '',
      endDate: banner.endDate ? banner.endDate.split('T')[0] : ''
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return

    try {
      await deleteBanner(id)
      toast.success('Banner deleted successfully')
    } catch (error) {
      toast.error('Error deleting banner')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      image: '',
      link: '',
      linkText: '',
      type: 'hero',
      category: '',
      priority: 0,
      isActive: true,
      startDate: '',
      endDate: ''
    })
  }

  const openCreateDialog = () => {
    setEditingBanner(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hero': return 'bg-blue-100 text-blue-800'
      case 'product': return 'bg-green-100 text-green-800'
      case 'announcement': return 'bg-yellow-100 text-yellow-800'
      case 'promotion': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading banners...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Banner Management</h1>
          <p className="text-muted-foreground">Manage your homepage banners and promotional content</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? 'Edit Banner' : 'Create New Banner'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hero">Hero Banner</SelectItem>
                      <SelectItem value="product">Product Showcase</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="promotion">Promotion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Textarea
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="image">Banner Image *</Label>
                <BannerImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  type={formData.type as any}
                />
                {formData.image && (
                  <div className="mt-2">
                    <Label htmlFor="imageUrl">Image URL (for reference)</Label>
                    <Input
                      id="imageUrl"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="link">Link URL</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="/shop/bags"
                  />
                </div>
                <div>
                  <Label htmlFor="linkText">Link Text</Label>
                  <Input
                    id="linkText"
                    value={formData.linkText}
                    onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                    placeholder="Shop Now"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="bags, shoes, new-arrivals"
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Input
                    id="priority"
                    type="number"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBanner ? 'Update Banner' : 'Create Banner'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <Card key={banner.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <CloudinaryImage
                src={banner.image}
                alt={banner.title}
                width={400}
                height={300}
                className="w-full h-full object-cover"
                quality="auto"
                crop="fill"
                gravity="auto"
              />
              <div className="absolute top-2 right-2">
                <Badge className={getTypeColor(banner.type)}>
                  {banner.type}
                </Badge>
              </div>
              {!banner.isActive && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive">Inactive</Badge>
                </div>
              )}
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-2">{banner.title}</CardTitle>
              {banner.subtitle && (
                <p className="text-sm text-muted-foreground line-clamp-2">{banner.subtitle}</p>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm text-muted-foreground">
                {banner.category && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Category:</span>
                    <Badge variant="outline" className="text-xs">{banner.category}</Badge>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="font-medium">Priority:</span>
                  <span>{banner.priority}</span>
                </div>
                {banner.startDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(banner.startDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(banner)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(banner.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <Badge variant={banner.isActive ? "default" : "secondary"}>
                  {banner.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {banners.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No banners yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first banner to showcase your products and announcements
            </p>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Banner
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
