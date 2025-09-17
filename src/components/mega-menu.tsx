'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SubmenuItem {
  name: string
  href: string
  items?: { name: string; href: string }[]
}

interface MegaMenuProps {
  submenu: SubmenuItem[]
  className?: string
}

export function MegaMenu({ submenu, className }: MegaMenuProps) {
  return (
    <div className={cn(
      "absolute top-full left-0 w-screen max-w-4xl bg-background border border-border shadow-elevated",
      "animate-in slide-in-from-top-2 duration-200",
      className
    )}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {submenu.map((section) => (
            <div key={section.name} className="space-y-4">
              <Link
                href={section.href}
                className="block text-lg font-semibold text-foreground hover:text-gold transition-colors"
              >
                {section.name}
              </Link>
              
              {section.items && (
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        
        {/* Featured Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">New Arrivals</h4>
              <p className="text-sm text-muted-foreground">
                Discover our latest collection of premium bags and shoes
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Best Sellers</h4>
              <p className="text-sm text-muted-foreground">
                Our most loved pieces, handpicked by our customers
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Collections</h4>
              <p className="text-sm text-muted-foreground">
                Curated looks for every occasion and style
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}






