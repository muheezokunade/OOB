'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Eye, 
  Mail, 
  Reply,
  Archive,
  Trash2,
  Clock,
  CheckCircle,
  Star,
  Download,
  MoreHorizontal
} from 'lucide-react'

// Mock message data
const messages = [
  {
    id: 'MSG-001',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    subject: 'Question about product availability',
    message: 'Hi, I\'m interested in the Luxury Leather Tote in black. Is it available in size medium? Also, do you offer international shipping?',
    date: '2024-01-15',
    time: '14:30',
    status: 'new',
    priority: 'normal',
    category: 'product_inquiry'
  },
  {
    id: 'MSG-002',
    name: 'Mary Okonkwo',
    email: 'mary.o@email.com',
    subject: 'Order tracking issue',
    message: 'I placed an order last week (ORD-002) but haven\'t received any tracking information. Can you please help me track my order?',
    date: '2024-01-14',
    time: '10:15',
    status: 'replied',
    priority: 'high',
    category: 'order_support'
  },
  {
    id: 'MSG-003',
    name: 'Grace Adebayo',
    email: 'grace.a@email.com',
    subject: 'Return request',
    message: 'I received my order but the size doesn\'t fit. I\'d like to return it for a different size. What\'s the return process?',
    date: '2024-01-13',
    time: '16:45',
    status: 'new',
    priority: 'normal',
    category: 'returns'
  },
  {
    id: 'MSG-004',
    name: 'Blessing Okafor',
    email: 'blessing.o@email.com',
    subject: 'Custom order inquiry',
    message: 'I love your designs! Do you offer custom bags? I\'m looking for a specific color combination for my wedding.',
    date: '2024-01-12',
    time: '09:20',
    status: 'new',
    priority: 'low',
    category: 'custom_order'
  },
  {
    id: 'MSG-005',
    name: 'Joyce Nwosu',
    email: 'joyce.n@email.com',
    subject: 'Partnership opportunity',
    message: 'I run a fashion blog and would love to collaborate with OmoOniBag. Are you interested in partnerships?',
    date: '2024-01-11',
    time: '13:10',
    status: 'replied',
    priority: 'normal',
    category: 'partnership'
  }
]

export default function AdminMessagesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedMessage, setSelectedMessage] = useState<any>(null)

  const statusOptions = ['all', 'new', 'replied', 'archived']
  const priorityOptions = ['all', 'low', 'normal', 'high']
  const categoryOptions = ['all', 'product_inquiry', 'order_support', 'returns', 'custom_order', 'partnership']

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter
    const matchesCategory = categoryFilter === 'all' || message.category === categoryFilter
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { color: 'bg-blue-100 text-blue-800', text: 'New' },
      replied: { color: 'bg-green-100 text-green-800', text: 'Replied' },
      archived: { color: 'bg-gray-100 text-gray-800', text: 'Archived' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    
    return (
      <Badge className={config.color}>
        {config.text}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { color: 'bg-gray-100 text-gray-800', text: 'Low' },
      normal: { color: 'bg-blue-100 text-blue-800', text: 'Normal' },
      high: { color: 'bg-red-100 text-red-800', text: 'High' }
    }
    
    const config = priorityConfig[priority as keyof typeof priorityConfig]
    
    return (
      <Badge className={config.color}>
        {config.text}
      </Badge>
    )
  }

  const getCategoryLabel = (category: string) => {
    const categoryLabels = {
      product_inquiry: 'Product Inquiry',
      order_support: 'Order Support',
      returns: 'Returns',
      custom_order: 'Custom Order',
      partnership: 'Partnership'
    }
    return categoryLabels[category as keyof typeof categoryLabels] || category
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-ink">Messages</h1>
          <p className="text-muted-foreground">Manage customer inquiries and support requests</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-ink">
            <Download className="w-4 h-4 mr-2" />
            Export Messages
          </Button>
          <Button className="bg-gold text-ink hover:bg-gold/90">
            <Mail className="w-4 h-4 mr-2" />
            Send Broadcast
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
              <p className="text-2xl font-bold text-ink">156</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">New Messages</p>
              <p className="text-2xl font-bold text-ink">12</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Replied</p>
              <p className="text-2xl font-bold text-ink">134</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">High Priority</p>
              <p className="text-2xl font-bold text-ink">3</p>
            </div>
            <Star className="w-8 h-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search messages by name, email, subject, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
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

          {/* Priority Filter */}
          <div className="flex gap-2">
            {priorityOptions.map((priority) => (
              <Button
                key={priority}
                variant={priorityFilter === priority ? "default" : "outline"}
                size="sm"
                onClick={() => setPriorityFilter(priority)}
                className={priorityFilter === priority ? "bg-gold text-ink" : ""}
              >
                {priority === 'all' ? 'All Priority' : priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md text-sm bg-background"
            >
              <option value="all">All Categories</option>
              {categoryOptions.slice(1).map((category) => (
                <option key={category} value={category}>
                  {getCategoryLabel(category)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages Table */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-ink">
                Messages ({filteredMessages.length})
              </h3>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filter
              </Button>
            </div>

            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedMessage?.id === message.id 
                      ? 'border-gold bg-gold/5' 
                      : 'border-border hover:border-gold/30'
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-ink">{message.name}</h4>
                        <span className="text-sm text-muted-foreground">({message.email})</span>
                      </div>
                      <p className="font-medium text-ink mb-1">{message.subject}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(message.status)}
                        {getPriorityBadge(message.priority)}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {message.date} at {message.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {getCategoryLabel(message.category)}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Reply className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                        <Archive className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Message Details */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            {selectedMessage ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-ink">Message Details</h3>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">From</label>
                    <p className="text-ink">{selectedMessage.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Subject</label>
                    <p className="text-ink">{selectedMessage.subject}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Category</label>
                    <Badge variant="outline" className="mt-1">
                      {getCategoryLabel(selectedMessage.category)}
                    </Badge>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status & Priority</label>
                    <div className="flex gap-2 mt-1">
                      {getStatusBadge(selectedMessage.status)}
                      {getPriorityBadge(selectedMessage.priority)}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Date & Time</label>
                    <p className="text-ink">{selectedMessage.date} at {selectedMessage.time}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Message</label>
                    <div className="mt-2 p-3 bg-muted/30 rounded-lg">
                      <p className="text-ink text-sm leading-relaxed">{selectedMessage.message}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button className="flex-1 bg-gold text-ink hover:bg-gold/90">
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                  <Button variant="outline" size="sm">
                    <Archive className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a message to view details</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}






