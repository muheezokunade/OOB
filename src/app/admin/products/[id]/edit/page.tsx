'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Save, X } from 'lucide-react'

export default function EditProductPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const productId = params?.id

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<any | null>(null)

  useEffect(() => {
    const load = async () => {
      if (!productId) return
      try {
        setLoading(true)
        const res = await fetch(`/api/admin/products/${productId}`)
        const json = await res.json()
        if (json?.success) setForm(json.data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [productId])

  const handleSave = async () => {
    if (!form) return
    try {
      setSaving(true)
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) router.push('/admin/products')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !form) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gold" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-semibold text-ink">Edit Product</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gold text-gold" onClick={() => router.back()}>
            <X className="w-4 h-4 mr-2" /> Cancel
          </Button>
          <Button className="bg-gold text-ink" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </div>

      <Card className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Name</label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Price (₦)</label>
            <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Category</label>
            <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Stock</label>
            <Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">SKU</label>
            <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Description</label>
          <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Image URL</label>
          <Input value={form.image || ''} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        </div>
      </Card>
    </div>
  )
}


