'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center space-x-1 text-sm text-ink/60", className)}>
      <Link 
        href="/" 
        className="flex items-center hover:text-ink transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="w-4 h-4 text-ink/40" />
          {item.href && !item.isActive ? (
            <Link 
              href={item.href}
              className="hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={cn(
              item.isActive && "text-ink font-medium"
            )}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}






