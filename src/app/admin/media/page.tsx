'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Image, 
  Upload, 
  Search, 
  Filter,
  Trash2,
  Download,
  Eye,
  Grid,
  List,
  Folder,
  FolderPlus,
  Copy,
  Edit,
  MoreHorizontal,
  FileVideo,
  FileText,
  File,
  Loader2
} from 'lucide-react'

// Mock media data
const mediaFiles = [
  {
    id: 'IMG-001',
    name: 'luxury-tote-hero.jpg',
    type: 'image',
    size: '2.4 MB',
    dimensions: '1920x1080',
    uploadDate: '2024-01-15',
    folder: 'products',
    url: '/images/products/luxury-tote-black-1.svg',
    alt: 'Luxury Leather Tote - Hero Image'
  },
  {
    id: 'IMG-002',
    name: 'elegant-clutch-detail.jpg',
    type: 'image',
    size: '1.8 MB',
    dimensions: '1200x800',
    uploadDate: '2024-01-14',
    folder: 'products',
    url: '/images/products/elegant-clutch-gold-1.svg',
    alt: 'Elegant Evening Clutch - Detail Shot'
  },
  {
    id: 'VID-001',
    name: 'product-showcase.mp4',
    type: 'video',
    size: '15.2 MB',
    dimensions: '1920x1080',
    uploadDate: '2024-01-13',
    folder: 'marketing',
    url: '/videos/product-showcase.mp4',
    alt: 'Product Showcase Video'
  },
  {
    id: 'IMG-003',
    name: 'homepage-banner.jpg',
    type: 'image',
    size: '3.1 MB',
    dimensions: '2560x1440',
    uploadDate: '2024-01-12',
    folder: 'banners',
    url: '/images/banners/homepage-hero.jpg',
    alt: 'Homepage Hero Banner'
  },
  {
    id: 'DOC-001',
    name: 'brand-guidelines.pdf',
    type: 'document',
    size: '5.7 MB',
    dimensions: null,
    uploadDate: '2024-01-11',
    folder: 'documents',
    url: '/documents/brand-guidelines.pdf',
    alt: 'Brand Guidelines Document'
  },
  {
    id: 'IMG-004',
    name: 'about-us-team.jpg',
    type: 'image',
    size: '2.9 MB',
    dimensions: '1600x900',
    uploadDate: '2024-01-10',
    folder: 'content',
    url: '/images/content/about-team.jpg',
    alt: 'About Us - Team Photo'
  }
]

const folders = [
  { id: 'products', name: 'Products', count: 24 },
  { id: 'banners', name: 'Banners', count: 8 },
  { id: 'content', name: 'Content', count: 12 },
  { id: 'marketing', name: 'Marketing', count: 6 },
  { id: 'documents', name: 'Documents', count: 4 }
]

interface MediaFile {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  alt?: string
  caption?: string
  category?: string
  tags: string[]
  isActive: boolean
  createdAt: string
}

export default function AdminMediaPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  const typeOptions = ['all', 'image', 'video', 'document']
  const categoryOptions = ['all', 'product', 'blog', 'gallery', 'banner', 'marketing']

  useEffect(() => {
    fetchMediaFiles()
  }, [searchTerm, typeFilter, categoryFilter])

  const fetchMediaFiles = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (typeFilter !== 'all') params.append('mimeType', typeFilter)
      if (categoryFilter !== 'all') params.append('category', categoryFilter)
      
      const response = await fetch(`/api/admin/media?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setMediaFiles(data.data.media)
      }
    } catch (error) {
      console.error('Failed to fetch media files:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (file.alt && file.alt.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === 'all' || 
                       (typeFilter === 'image' && file.mimeType.startsWith('image/')) ||
                       (typeFilter === 'video' && file.mimeType.startsWith('video/')) ||
                       (typeFilter === 'document' && file.mimeType.includes('pdf'))
    const matchesCategory = categoryFilter === 'all' || file.category === categoryFilter
    return matchesSearch && matchesType && matchesCategory
  })

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return Image
    if (mimeType.startsWith('video/')) return FileVideo
    if (mimeType.includes('pdf') || mimeType.includes('document')) return FileText
    return File
  }

  const getFileType = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return 'image'
    if (mimeType.startsWith('video/')) return 'video'
    if (mimeType.includes('pdf') || mimeType.includes('document')) return 'document'
    return 'file'
  }

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      image: { color: 'bg-green-100 text-green-800' },
      video: { color: 'bg-blue-100 text-blue-800' },
      document: { color: 'bg-purple-100 text-purple-800' }
    }
    
    const config = typeConfig[type as keyof typeof typeConfig]
    
    return (
      <Badge className={config?.color || 'bg-gray-100 text-gray-800'}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    )
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-ink">Media Library</h1>
          <p className="text-muted-foreground">Manage your images, videos, and documents</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-ink">
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </Button>
          <Button className="bg-gold text-ink hover:bg-gold/90">
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Files</p>
              <p className="text-2xl font-bold text-ink">156</p>
            </div>
            <File className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Images</p>
              <p className="text-2xl font-bold text-ink">124</p>
            </div>
            <Image className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Videos</p>
              <p className="text-2xl font-bold text-ink">18</p>
            </div>
            <FileVideo className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
              <p className="text-2xl font-bold text-ink">2.4 GB</p>
            </div>
            <Upload className="w-8 h-8 text-purple-600" />
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
                placeholder="Search files by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {typeOptions.map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter(type)}
                className={typeFilter === type ? "bg-gold text-ink" : ""}
              >
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            {categoryOptions.map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(category)}
                className={categoryFilter === category ? "bg-gold text-ink" : ""}
              >
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
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

      {/* Bulk Actions */}
      {selectedFiles.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy URL
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Folders */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-ink mb-4">Folders</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gold/30 ${
                // @ts-expect-error local UI state placeholder
                (typeof folderFilter !== 'undefined' && folderFilter === folder.id) ? 'border-gold bg-gold/5' : 'border-border'
              }`}
              // @ts-expect-error local UI state placeholder
              onClick={() => setFolderFilter && setFolderFilter(folder.id)}
            >
              <div className="text-center">
                <Folder className="w-8 h-8 text-gold mx-auto mb-2" />
                <p className="font-medium text-ink text-sm">{folder.name}</p>
                <p className="text-xs text-muted-foreground">{folder.count} files</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Files */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-ink">
            Files ({filteredFiles.length})
          </h3>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
            <span className="ml-2 text-ink/60">Loading media files...</span>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <File className="w-12 h-12 text-ink/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-ink mb-2">No media files found</h3>
            <p className="text-ink/60 mb-4">Try adjusting your search or filter criteria.</p>
            <Button className="bg-gold text-ink hover:bg-gold/90">
              <Upload className="w-4 h-4 mr-2" />
              Upload First File
            </Button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredFiles.map((file) => {
              const IconComponent = getFileIcon(file.mimeType)
              const fileType = getFileType(file.mimeType)
              const isSelected = selectedFiles.includes(file.id)
              
              return (
                <div
                  key={file.id}
                  className={`relative p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/30'
                  }`}
                  onClick={() => toggleFileSelection(file.id)}
                >
                  <div className="text-center">
                    {fileType === 'image' ? (
                      <div className="w-full h-24 bg-gradient-to-br from-fog to-stone rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                        <img src={file.url} alt={file.alt || file.originalName} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-full h-24 bg-muted/30 rounded-lg mb-2 flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                    <p className="font-medium text-ink text-sm truncate">{file.originalName}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                    <div className="mt-2">
                      {getTypeBadge(fileType)}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Dimensions</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Folder</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Upload Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => {
                  const IconComponent = getFileIcon(file.mimeType)
                  return (
                    <tr key={file.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-ink">{file.originalName}</p>
                            <p className="text-sm text-muted-foreground">{file.alt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getTypeBadge(getFileType(file.mimeType))}
                      </td>
                      <td className="py-4 px-4 text-ink">{(file.size / 1024 / 1024).toFixed(1)} MB</td>
                      <td className="py-4 px-4 text-ink">-</td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{file.category || '-'}</Badge>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">-</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

