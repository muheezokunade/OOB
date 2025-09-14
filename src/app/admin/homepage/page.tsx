'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { HeroImageUpload, ProductShowcaseImageUpload } from '@/components/ui/high-quality-image-upload'
import { Save, Eye, RefreshCw, Upload, Type, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

interface HomepageContent {
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  heroButtonText: string
  heroButtonLink: string
  featuredTitle: string
  featuredSubtitle: string
  featuredProducts: string[]
  isActive: boolean
}

export default function HomepageManagement() {
  const [content, setContent] = useState<HomepageContent>({
    heroTitle: 'The Latest & Greatest',
    heroSubtitle: 'Hot off our design table. These pieces represent the future of Nigerian luxury fashion.',
    heroImage: '',
    heroButtonText: 'Shop Now',
    heroButtonLink: '/shop',
    featuredTitle: 'Featured Products',
    featuredSubtitle: 'Discover our handpicked selection of premium items',
    featuredProducts: [],
    isActive: true
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/admin/homepage')
        const json = await res.json()
        if (json?.data) setContent(json.data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
      const res = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(content),
      })
      if (!res.ok) throw new Error('Save failed')
      toast.success('Homepage content saved successfully!')
    } catch (error) {
      toast.error('Failed to save homepage content')
    } finally {
      setSaving(false)
    }
  }

  const handlePreview = () => {
    window.open('/', '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-ink">Homepage Management</h1>
          <p className="text-ink/60 mt-1">Manage your homepage content, images, and layout</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePreview}
            className="border-gold/30 text-gold hover:bg-gold hover:text-ink"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-gold text-ink hover:bg-gold/90"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hero Section */}
        <Card className="bg-white/90 border border-gold/20 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-gold/10 to-yellow-400/10 border-b border-gold/20">
            <CardTitle className="flex items-center gap-2 text-ink">
              <Type className="w-5 h-5 text-gold" />
              Hero Section
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heroTitle">Hero Title</Label>
              <Input
                id="heroTitle"
                value={content.heroTitle}
                onChange={(e) => setContent(prev => ({ ...prev, heroTitle: e.target.value }))}
                placeholder="Enter hero title"
                className="border-gold/20 focus:border-gold"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
              <Textarea
                id="heroSubtitle"
                value={content.heroSubtitle}
                onChange={(e) => setContent(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                placeholder="Enter hero subtitle"
                className="border-gold/20 focus:border-gold min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heroButtonText">Button Text</Label>
                <Input
                  id="heroButtonText"
                  value={content.heroButtonText}
                  onChange={(e) => setContent(prev => ({ ...prev, heroButtonText: e.target.value }))}
                  placeholder="Button text"
                  className="border-gold/20 focus:border-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroButtonLink">Button Link</Label>
                <Input
                  id="heroButtonLink"
                  value={content.heroButtonLink}
                  onChange={(e) => setContent(prev => ({ ...prev, heroButtonLink: e.target.value }))}
                  placeholder="/shop"
                  className="border-gold/20 focus:border-gold"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hero Image */}
        <Card className="bg-white/90 border border-gold/20 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-gold/10 to-yellow-400/10 border-b border-gold/20">
            <CardTitle className="flex items-center gap-2 text-ink">
              <ImageIcon className="w-5 h-5 text-gold" />
              Hero Image
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <HeroImageUpload
              value={content.heroImage}
              onChange={(url) => setContent(prev => ({ ...prev, heroImage: url }))}
            />
            <p className="text-sm text-ink/60 mt-2">
              High-quality hero image • Recommended size: 1920x1080px • Lossless compression
            </p>
          </CardContent>
        </Card>

        {/* Featured Section */}
        <Card className="bg-white/90 border border-gold/20 shadow-xl lg:col-span-2">
          <CardHeader className="bg-gradient-to-r from-gold/10 to-yellow-400/10 border-b border-gold/20">
            <CardTitle className="flex items-center gap-2 text-ink">
              <Type className="w-5 h-5 text-gold" />
              Featured Products Section
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="featuredTitle">Section Title</Label>
                <Input
                  id="featuredTitle"
                  value={content.featuredTitle}
                  onChange={(e) => setContent(prev => ({ ...prev, featuredTitle: e.target.value }))}
                  placeholder="Featured Products"
                  className="border-gold/20 focus:border-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="featuredSubtitle">Section Subtitle</Label>
                <Input
                  id="featuredSubtitle"
                  value={content.featuredSubtitle}
                  onChange={(e) => setContent(prev => ({ ...prev, featuredSubtitle: e.target.value }))}
                  placeholder="Discover our handpicked selection"
                  className="border-gold/20 focus:border-gold"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Featured Products</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`product-${index}`}>Product {index}</Label>
                    <Input
                      id={`product-${index}`}
                      placeholder="Product name or ID"
                      className="border-gold/20 focus:border-gold"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Featured Product Images</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="space-y-2">
                    <Label>Product {index} Image</Label>
                    <ProductShowcaseImageUpload
                      value={content.featuredProducts[index - 1] || ''}
                      onChange={(url) => {
                        const newProducts = [...content.featuredProducts]
                        newProducts[index - 1] = url
                        setContent(prev => ({ ...prev, featuredProducts: newProducts }))
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="bg-white/90 border border-gold/20 shadow-xl lg:col-span-2">
          <CardHeader className="bg-gradient-to-r from-gold/10 to-yellow-400/10 border-b border-gold/20">
            <CardTitle className="flex items-center gap-2 text-ink">
              <RefreshCw className="w-5 h-5 text-gold" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="isActive" className="text-base font-medium">Homepage Active</Label>
                <p className="text-sm text-ink/60">Enable or disable the homepage content</p>
              </div>
              <Switch
                id="isActive"
                checked={content.isActive}
                onCheckedChange={(checked) => setContent(prev => ({ ...prev, isActive: checked }))}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
