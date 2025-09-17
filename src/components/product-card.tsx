'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn, formatPrice, formatWhatsAppMessage, getWhatsAppUrl } from '@/lib/utils'
import { ShoppingBag, MessageCircle, Check } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { CartItem } from '@/types/cart'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  colors: string[]
  category: string
  subcategory: string
  isNew?: boolean
  isBestSeller?: boolean
  isOutOfStock?: boolean
  maxQuantity?: number
}

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact'
  className?: string
}

export function ProductCard({ product, variant = 'default', className }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [showAddedFeedback, setShowAddedFeedback] = useState(false)
  
  // Ensure we never pass an empty string to the Image component
  const currentImageSrc = (product.images?.[currentImageIndex] || '').trim()
  const hasCurrentImage = currentImageSrc.length > 0
  
  const { addItem, openCart } = useCartStore()

  const handleWhatsAppClick = () => {
    const message = formatWhatsAppMessage(product.name, product.price)
    const url = getWhatsAppUrl('2349061819572', message)
    window.open(url, '_blank')
  }

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (product.isOutOfStock || isAdding) return
    
    setIsAdding(true)
    
    // Create cart item from product
    const cartItem: Omit<CartItem, 'quantity'> = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: (product.images?.[0] || '').trim() || '/window.svg',
      category: product.category,
      subcategory: product.subcategory,
      inStock: !product.isOutOfStock,
      maxQuantity: product.maxQuantity,
      // Default to first color if available
      color: product.colors[0] || undefined,
    }
    
    // Add to cart
    addItem(cartItem)
    
    // Show feedback
    setShowAddedFeedback(true)
    setTimeout(() => {
      setShowAddedFeedback(false)
      setIsAdding(false)
    }, 1000)
    
    // Auto-open cart after a delay
    setTimeout(() => {
      openCart()
    }, 500)
  }

  return (
    <Card 
      className={cn(
        "group cursor-pointer overflow-hidden transition-all duration-250 hover:shadow-elevated hover:-translate-y-1",
        variant === 'compact' && "h-auto",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/shop/${product.id}`}>
        <div className="relative aspect-[4/5] overflow-hidden">
          {hasCurrentImage ? (
            <Image
              src={currentImageSrc}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-all duration-300",
                isHovered && product.images.length > 1 && "scale-105"
              )}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
              No image
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge variant="accent" className="text-xs">
                New
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge variant="default" className="text-xs">
                Best Seller
              </Badge>
            )}
            {product.isOutOfStock && (
              <Badge variant="destructive" className="text-xs">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className={cn(
            "absolute top-3 right-3 flex flex-col gap-2 opacity-0 transition-opacity duration-200",
            isHovered && "opacity-100"
          )}>
            <Button
              size="icon"
              variant="secondary"
              className={cn(
                "h-8 w-8 bg-background/90 backdrop-blur-sm hover:bg-background transition-all duration-200",
                showAddedFeedback && "bg-green-500 text-white"
              )}
              onClick={handleQuickAdd}
              disabled={product.isOutOfStock || isAdding}
            >
              {showAddedFeedback ? (
                <Check className="h-4 w-4" />
              ) : (
                <ShoppingBag className="h-4 w-4" />
              )}
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-background/90 backdrop-blur-sm hover:bg-background"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>

          {/* Image Navigation */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-1 w-6 rounded-full transition-all duration-200",
                    index === currentImageIndex ? "bg-gold" : "bg-background/50"
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentImageIndex(index)
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-sm leading-tight line-clamp-2">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {product.category}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">
              {formatPrice(product.price)}
            </span>
            
            {/* Color Swatches */}
            {product.colors.length > 0 && (
              <div className="flex gap-1">
                {product.colors.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="h-4 w-4 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                {product.colors.length > 3 && (
                  <div className="h-4 w-4 rounded-full border border-border bg-muted flex items-center justify-center">
                    <span className="text-xs">+{product.colors.length - 3}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              className={cn(
                "flex-1 transition-all duration-200",
                showAddedFeedback && "bg-green-500 hover:bg-green-600"
              )}
              onClick={handleQuickAdd}
              disabled={product.isOutOfStock || isAdding}
            >
              {showAddedFeedback ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Added!
                </>
              ) : isAdding ? (
                'Adding...'
              ) : product.isOutOfStock ? (
                'Join Waitlist'
              ) : (
                'Add to Cart'
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
