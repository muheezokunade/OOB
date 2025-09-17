'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  Clock,
  CheckCircle,
  XCircle,
  Heart,
  MessageCircle,
  Share2
} from 'lucide-react'

// Mock blog data
const blogPosts = [
  {
    id: 'BLOG-001',
    title: 'The Art of Luxury: How OmoOniBag Crafts Timeless Pieces',
    slug: 'art-of-luxury-crafting-timeless-pieces',
    excerpt: 'Discover the meticulous process behind every OmoOniBag creation, from material selection to the final stitch.',
    content: 'At OmoOniBag, luxury is not just about the final product—it\'s about the journey...',
    status: 'published',
    category: 'Behind the Scenes',
    tags: ['craftsmanship', 'luxury', 'handmade'],
    author: 'Sarah Creative',
    publishDate: '2024-01-15',
    lastModified: '2024-01-15',
    featuredImage: '/images/blog/craftsmanship.jpg',
    views: 1234,
    likes: 89,
    comments: 12
  },
  {
    id: 'BLOG-002',
    title: 'Spring 2024 Fashion Trends: What Every Woman Should Know',
    slug: 'spring-2024-fashion-trends',
    excerpt: 'From bold colors to minimalist designs, explore the fashion trends that will define spring 2024.',
    content: 'As we transition into spring 2024, fashion enthusiasts are embracing...',
    status: 'published',
    category: 'Fashion Trends',
    tags: ['trends', 'spring', '2024', 'fashion'],
    author: 'Grace Fashion',
    publishDate: '2024-01-12',
    lastModified: '2024-01-14',
    featuredImage: '/images/blog/spring-trends.jpg',
    views: 2156,
    likes: 145,
    comments: 28
  },
  {
    id: 'BLOG-003',
    title: 'How to Style Your Luxury Bag for Every Occasion',
    slug: 'style-luxury-bag-every-occasion',
    excerpt: 'Master the art of accessorizing with our comprehensive guide to styling luxury bags.',
    content: 'A luxury bag is more than an accessory—it\'s a statement...',
    status: 'draft',
    category: 'Style Guide',
    tags: ['styling', 'bags', 'fashion', 'tips'],
    author: 'Mary Style',
    publishDate: null,
    lastModified: '2024-01-10',
    featuredImage: '/images/blog/bag-styling.jpg',
    views: 0,
    likes: 0,
    comments: 0
  },
  {
    id: 'BLOG-004',
    title: 'Sustainable Fashion: Our Commitment to the Environment',
    slug: 'sustainable-fashion-commitment',
    excerpt: 'Learn about OmoOniBag\'s eco-friendly initiatives and sustainable fashion practices.',
    content: 'Sustainability is at the heart of everything we do at OmoOniBag...',
    status: 'scheduled',
    category: 'Sustainability',
    tags: ['sustainability', 'environment', 'eco-friendly'],
    author: 'Joy Green',
    publishDate: '2024-01-20',
    lastModified: '2024-01-08',
    featuredImage: '/images/blog/sustainability.jpg',
    views: 0,
    likes: 0,
    comments: 0
  }
]

const categories = ['All', 'Behind the Scenes', 'Fashion Trends', 'Style Guide', 'Sustainability', 'Brand News']

export default function AdminBlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)

  const statusOptions = ['all', 'published', 'draft', 'scheduled']

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter
    const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      draft: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
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
          <h1 className="text-3xl font-serif font-semibold text-ink">Blog Manager</h1>
          <p className="text-muted-foreground">Create and manage your blog content</p>
        </div>
        <Button className="bg-gold text-ink hover:bg-gold/90">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
              <p className="text-2xl font-bold text-ink">24</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Published</p>
              <p className="text-2xl font-bold text-ink">18</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Views</p>
              <p className="text-2xl font-bold text-ink">15.2K</p>
            </div>
            <Eye className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Engagement</p>
              <p className="text-2xl font-bold text-ink">8.7%</p>
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
                placeholder="Search posts by title, content, or tags..."
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
        </div>
      </Card>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Posts List */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-ink">
                Blog Posts ({filteredPosts.length})
              </h3>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedPost?.id === post.id 
                      ? 'border-gold bg-gold/5' 
                      : 'border-border hover:border-gold/30'
                  }`}
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="flex gap-4">
                    {/* Featured Image */}
                    <div className="w-32 h-24 bg-gradient-to-br from-fog to-stone rounded-lg flex-shrink-0 flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-ink/60" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(post.status)}
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-ink mb-2 line-clamp-2">{post.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{post.publishDate || post.lastModified}</span>
                          </div>
                        </div>
                        
                        {post.status === 'published' && (
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 mt-2">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{post.tags.length - 3} more</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Post Editor/Details */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            {selectedPost ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-ink">Post Details</h3>
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
                      <Input value={selectedPost.title} className="mt-1" />
                    ) : (
                      <p className="text-ink mt-1 font-medium">{selectedPost.title}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Slug</label>
                    {isEditing ? (
                      <Input value={selectedPost.slug} className="mt-1" />
                    ) : (
                      <p className="text-ink mt-1 text-sm font-mono">/{selectedPost.slug}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="mt-1">
                      {getStatusBadge(selectedPost.status)}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Category</label>
                    {isEditing ? (
                      <select className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background">
                        {categories.slice(1).map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Badge variant="outline" className="mt-1">{selectedPost.category}</Badge>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Author</label>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-ink">{selectedPost.author}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tags</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedPost.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Excerpt</label>
                    {isEditing ? (
                      <textarea 
                        value={selectedPost.excerpt}
                        className="w-full mt-1 p-2 border border-border rounded-md text-sm"
                        rows={3}
                      />
                    ) : (
                      <p className="text-ink mt-1 text-sm">{selectedPost.excerpt}</p>
                    )}
                  </div>
                  
                  {selectedPost.status === 'published' && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Performance</label>
                      <div className="mt-1 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            Views
                          </span>
                          <span className="font-medium">{selectedPost.views}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            Likes
                          </span>
                          <span className="font-medium">{selectedPost.likes}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            Comments
                          </span>
                          <span className="font-medium">{selectedPost.comments}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Dates</label>
                    <div className="mt-1 space-y-1 text-sm">
                      {selectedPost.publishDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span>Published: {selectedPost.publishDate}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span>Modified: {selectedPost.lastModified}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button className="flex-1 bg-gold text-ink hover:bg-gold/90">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Post
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a post to view details</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}






