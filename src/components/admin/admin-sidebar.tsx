'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  FileText, 
  MessageSquare, 
  Percent, 
  Settings, 
  Image, 
  BookOpen, 
  BarChart3, 
  Shield,
  Crown,
  ChevronDown,
  ChevronRight,
  Monitor
} from 'lucide-react'

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    badge: null
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: Package,
    badge: null,
    submenu: [
      { title: 'All Products', href: '/admin/products' },
      { title: 'Add Product', href: '/admin/products/new' },
      { title: 'Categories', href: '/admin/products/categories' },
      { title: 'Inventory', href: '/admin/products/inventory' }
    ]
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
    badge: '3'
  },
  {
    title: 'Customers',
    href: '/admin/customers',
    icon: Users,
    badge: null
  },
  {
    title: 'Content',
    href: '/admin/content',
    icon: FileText,
    badge: null,
    submenu: [
      { title: 'Pages', href: '/admin/content/pages' },
      { title: 'Blog', href: '/admin/content/blog' },
      { title: 'Lookbook', href: '/admin/content/lookbook' }
    ]
  },
  {
    title: 'Banners',
    href: '/admin/banners',
    icon: Monitor,
    badge: null
  },
  {
    title: 'Messages',
    href: '/admin/messages',
    icon: MessageSquare,
    badge: '5'
  },
  {
    title: 'Discounts',
    href: '/admin/discounts',
    icon: Percent,
    badge: null
  },
  {
    title: 'Media',
    href: '/admin/media',
    icon: Image,
    badge: null
  },
  {
    title: 'Reports',
    href: '/admin/reports',
    icon: BarChart3,
    badge: null
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    badge: null
  }
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  return (
    <div className="w-64 bg-gradient-to-b from-cream to-fog border-r border-gold/20 shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-gold/20 bg-gradient-to-r from-ink to-coal">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gold to-yellow-400 rounded-lg flex items-center justify-center shadow-lg">
            <Crown className="w-6 h-6 text-ink" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-semibold text-cream">OmoOniBag</h1>
            <p className="text-xs text-fog">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const isExpanded = expandedItems.includes(item.title)
          const hasSubmenu = item.submenu && item.submenu.length > 0

          return (
            <div key={item.title}>
              <div
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer group",
                  isActive 
                    ? "bg-gradient-to-r from-gold/20 to-yellow-400/20 text-ink border border-gold/30 shadow-md" 
                    : "text-ink/70 hover:text-ink hover:bg-stone/30"
                )}
                onClick={() => hasSubmenu ? toggleExpanded(item.title) : null}
              >
                <Link 
                  href={hasSubmenu ? '#' : item.href}
                  className="flex items-center gap-3 flex-1"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
                
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {hasSubmenu && (
                    isExpanded ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </div>

              {/* Submenu */}
              {hasSubmenu && isExpanded && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.submenu.map((subItem) => {
                    const isSubActive = pathname === subItem.href
                    return (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-3 p-2 rounded-lg text-sm transition-all duration-200",
                          isSubActive 
                            ? "bg-gold/10 text-gold font-medium border border-gold/20" 
                            : "text-ink/60 hover:text-ink hover:bg-stone/20"
                        )}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        {subItem.title}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
