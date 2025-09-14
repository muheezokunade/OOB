'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { X, ChevronRight, Search, ShoppingBag, MessageCircle } from 'lucide-react'

interface NavigationItem {
  name: string
  href: string
  submenu?: {
    name: string
    href: string
    items?: { name: string; href: string }[]
  }[]
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navigation: NavigationItem[]
}

export function MobileMenu({ isOpen, onClose, navigation }: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  const handleSubItemClick = (href: string) => {
    // Navigate immediately without collapsing parent
    window.location.href = href
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background border-l border-border shadow-elevated">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-serif text-lg font-bold">Menu</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <button
                        className="flex w-full items-center justify-between py-3 text-left font-medium text-foreground hover:text-gold transition-colors"
                        onClick={() => toggleExpanded(item.name)}
                      >
                        <span>{item.name}</span>
                        <ChevronRight 
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            expandedItems.includes(item.name) && "rotate-90"
                          )}
                        />
                      </button>
                      
                      {expandedItems.includes(item.name) && (
                        <div className="ml-4 space-y-1 border-l border-border pl-4">
                          {item.submenu.map((subItem) => (
                            <div key={subItem.name}>
                              <button
                                className="flex w-full items-center justify-between py-2 text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => toggleExpanded(subItem.name)}
                              >
                                <span>{subItem.name}</span>
                                {subItem.items && (
                                  <ChevronRight 
                                    className={cn(
                                      "h-3 w-3 transition-transform duration-200",
                                      expandedItems.includes(subItem.name) && "rotate-90"
                                    )}
                                  />
                                )}
                              </button>
                              
                              {subItem.items && expandedItems.includes(subItem.name) && (
                                <div className="ml-4 space-y-1 border-l border-border pl-4">
                                  {subItem.items.map((subSubItem) => (
                                    <Link
                                      key={subSubItem.name}
                                      href={subSubItem.href}
                                      className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                      onClick={() => handleSubItemClick(subSubItem.href)}
                                    >
                                      {subSubItem.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-3 font-medium text-foreground hover:text-gold transition-colors"
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Footer Actions */}
          <div className="border-t border-border p-4 space-y-3">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Cart
              </Button>
            </div>
            
            <Button
              variant="accent"
              size="sm"
              className="w-full"
              onClick={() => {
                window.open('https://wa.me/2349061819572', '_blank')
                onClose()
              }}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Message on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

