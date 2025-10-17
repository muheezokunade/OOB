'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Star,
  Loader2,
  Image as ImageIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Collection {
  id: string
  title: string
  slug: string
  description: string
  image: string
  badge: string | null
  href: string
  category: string | null
  priority: number
  isActive: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminCollectionsPage() {
  const router = useRouter()
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchCollections()
  }, [])

  const fetchCollections = async () => {
    try {
      const response = await fetch('/api/collections')
      if (response.ok) {
        const data = await response.json()
        setCollections(data)
      }
    } catch (error) {
      console.error('Error fetching collections:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this collection?')) {
      return
    }

    setDeletingId(id)
    try {
      const response = await fetch(`/api/collections/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setCollections(collections.filter(c => c.id !== id))
      } else {
        alert('Failed to delete collection')
      }
    } catch (error) {
      console.error('Error deleting collection:', error)
      alert('Failed to delete collection')
    } finally {
      setDeletingId(null)
    }
  }

  const toggleStatus = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/collections/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive })
      })

      if (response.ok) {
        setCollections(collections.map(c => 
          c.id === id ? { ...c, isActive: !isActive } : c
        ))
      }
    } catch (error) {
      console.error('Error updating collection status:', error)
    }
  }

  const toggleFeatured = async (id: string, isFeatured: boolean) => {
    try {
      const response = await fetch(`/api/collections/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !isFeatured })
      })

      if (response.ok) {
        setCollections(collections.map(c => 
          c.id === id ? { ...c, isFeatured: !isFeatured } : c
        ))
      }
    } catch (error) {
      console.error('Error updating collection featured status:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-ink">Collections</h1>
          <p className="text-muted-foreground mt-1">Manage your product collections</p>
        </div>
        <Button onClick={() => router.push('/admin/collections/new')}>
          <Plus className="w-4 h-4 mr-2" />
          Add Collection
        </Button>
      </div>

      {/* Collections Grid */}
      {collections.length === 0 ? (
        <Card className="p-12 text-center">
          <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-ink mb-2">No collections yet</h3>
          <p className="text-muted-foreground mb-6">Create your first collection to get started.</p>
          <Button onClick={() => router.push('/admin/collections/new')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Collection
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Card key={collection.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-video">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  {collection.isFeatured && (
                    <Badge variant="accent" className="text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge variant={collection.isActive ? 'default' : 'secondary'} className="text-xs">
                    {collection.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-ink mb-1">{collection.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {collection.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>Priority: {collection.priority}</span>
                  {collection.badge && (
                    <Badge variant="outline" className="text-xs">
                      {collection.badge}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleStatus(collection.id, collection.isActive)}
                    className="flex-1"
                  >
                    {collection.isActive ? (
                      <>
                        <EyeOff className="w-3 h-3 mr-1" />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3 mr-1" />
                        Activate
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFeatured(collection.id, collection.isFeatured)}
                    className="flex-1"
                  >
                    <Star className={`w-3 h-3 mr-1 ${collection.isFeatured ? 'fill-current' : ''}`} />
                    {collection.isFeatured ? 'Unfeature' : 'Feature'}
                  </Button>
                </div>

                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/admin/collections/${collection.id}/edit`)}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(collection.id)}
                    disabled={deletingId === collection.id}
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    {deletingId === collection.id ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <>
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

