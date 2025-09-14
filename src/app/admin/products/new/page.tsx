'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ProductImageUpload } from '@/components/ui/image-upload'
import { 
  Package, 
  Save,
  Upload,
  Plus,
  Trash2,
  X,
  Loader2
} from 'lucide-react'

export default function AddProductPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    longDescription: '',
    price: '',
    originalPrice: '',
    category: '',
    subcategory: '',
    sku: '',
    stock: '',
    weight: '',
    dimensions: '',
    materials: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    careInstructions: [] as string[],
    tags: [] as string[],
    images: [] as string[],
    isActive: true,
    isNew: false,
    isBestSeller: false,
    variants: [] as Array<{
      id: string
      name: string
      price: string
      stock: string
      attributes: Record<string, string>
    }>
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // API call to create product
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        // Redirect to products list
        window.location.href = '/admin/products'
      }
    } catch (error) {
      console.error('Failed to create product:', error)
    } finally {
      setLoading(false)
    }
  }

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, {
        id: Date.now().toString(),
        name: '',
        price: '',
        stock: '',
        attributes: {}
      }]
    }))
  }

  const removeVariant = (id: string) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter(v => v.id !== id)
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-ink">Add New Product</h1>
          <p className="text-muted-foreground">Create a new product for your store</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => window.history.back()}
          className="border-gold text-gold hover:bg-gold hover:text-ink"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-ink mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Product Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter product name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">SKU</label>
              <Input
                value={formData.sku}
                onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                placeholder="Enter SKU"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Price (₦)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Stock Quantity</label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                placeholder="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background"
                required
              >
                <option value="">Select category</option>
                <option value="Bags">Bags</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Subcategory</label>
              <select
                value={formData.subcategory}
                onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background"
              >
                <option value="">Select subcategory</option>
                {formData.category === 'Bags' && (
                  <>
                    <option value="Totes">Totes</option>
                    <option value="Handbags">Handbags</option>
                    <option value="Clutches">Clutches</option>
                    <option value="Crossbody">Crossbody</option>
                  </>
                )}
                {formData.category === 'Shoes' && (
                  <>
                    <option value="Heels">Heels</option>
                    <option value="Slippers">Slippers</option>
                    <option value="Office">Office</option>
                    <option value="Owambe">Owambe</option>
                  </>
                )}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-ink mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter product description"
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background min-h-[100px]"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-ink mb-2">Long Description</label>
              <textarea
                value={formData.longDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background min-h-[100px]"
                placeholder="Detailed product description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background"
                placeholder="0.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Dimensions</label>
              <input
                type="text"
                value={formData.dimensions}
                onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background"
                placeholder="e.g., 40cm x 30cm x 15cm"
              />
            </div>
          </div>
        </Card>

        {/* Product Details */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-ink mb-4">Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Materials</label>
              <input
                type="text"
                value={formData.materials.join(', ')}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  materials: e.target.value.split(',').map(m => m.trim()).filter(m => m) 
                }))}
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background"
                placeholder="e.g., Italian Leather, Brass Hardware"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Sizes</label>
              <input
                type="text"
                value={formData.sizes.join(', ')}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  sizes: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                }))}
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background"
                placeholder="e.g., UK 5, UK 6, UK 7"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Colors (Hex codes)</label>
              <input
                type="text"
                value={formData.colors.join(', ')}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  colors: e.target.value.split(',').map(c => c.trim()).filter(c => c) 
                }))}
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background"
                placeholder="e.g., #0B0B0B, #8B4513, #654321"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Care Instructions</label>
              <input
                type="text"
                value={formData.careInstructions.join(', ')}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  careInstructions: e.target.value.split(',').map(c => c.trim()).filter(c => c) 
                }))}
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background"
                placeholder="e.g., Wipe with dry cloth, Store in dust bag"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-ink mb-2">Tags</label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) 
                }))}
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background"
                placeholder="e.g., luxury, leather, professional, tote"
              />
            </div>
          </div>
        </Card>

        {/* Product Status */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-ink mb-4">Product Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="rounded border-border"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-ink">Active</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isNew"
                checked={formData.isNew}
                onChange={(e) => setFormData(prev => ({ ...prev, isNew: e.target.checked }))}
                className="rounded border-border"
              />
              <label htmlFor="isNew" className="text-sm font-medium text-ink">New Product</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isBestSeller"
                checked={formData.isBestSeller}
                onChange={(e) => setFormData(prev => ({ ...prev, isBestSeller: e.target.checked }))}
                className="rounded border-border"
              />
              <label htmlFor="isBestSeller" className="text-sm font-medium text-ink">Best Seller</label>
            </div>
          </div>
        </Card>

        {/* Product Images */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-ink mb-4">Product Images</h2>
          <div className="space-y-4">
            <ProductImageUpload
              value={formData.images[0] || ''}
              onChange={(url) => {
                if (url && !formData.images.includes(url)) {
                  setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, url]
                  }))
                }
              }}
              category={formData.category || 'general'}
            />
            
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="aspect-square object-cover rounded-lg border border-gold/20"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 p-0 text-red-600 hover:text-red-700 bg-white/80 hover:bg-white"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index)
                      }))}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Product Variants */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-ink">Product Variants</h2>
            <Button
              type="button"
              variant="outline"
              onClick={addVariant}
              className="border-gold text-gold hover:bg-gold hover:text-ink"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Variant
            </Button>
          </div>
          
          {formData.variants.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-ink/40 mx-auto mb-4" />
              <p className="text-ink/60">No variants added yet</p>
              <p className="text-sm text-muted-foreground">Add variants for different sizes, colors, etc.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.variants.map((variant, index) => (
                <div key={variant.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-ink">Variant {index + 1}</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeVariant(variant.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">Variant Name</label>
                      <Input
                        value={variant.name}
                        onChange={(e) => {
                          const newVariants = [...formData.variants]
                          newVariants[index].name = e.target.value
                          setFormData(prev => ({ ...prev, variants: newVariants }))
                        }}
                        placeholder="e.g., Small, Red, Leather"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">Price (₦)</label>
                      <Input
                        type="number"
                        value={variant.price}
                        onChange={(e) => {
                          const newVariants = [...formData.variants]
                          newVariants[index].price = e.target.value
                          setFormData(prev => ({ ...prev, variants: newVariants }))
                        }}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">Stock</label>
                      <Input
                        type="number"
                        value={variant.stock}
                        onChange={(e) => {
                          const newVariants = [...formData.variants]
                          newVariants[index].stock = e.target.value
                          setFormData(prev => ({ ...prev, variants: newVariants }))
                        }}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => window.history.back()}
            className="border-gold text-gold hover:bg-gold hover:text-ink"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-gold text-ink hover:bg-gold/90"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Product
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

