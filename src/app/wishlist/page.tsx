'use client'

import { useAuthStore } from '@/store/auth-store'
import { useWishlistStore } from '@/store/wishlist-store'
import { useCartStore } from '@/store/cart-store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Heart, ShoppingBag, Eye, Trash2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProductCard } from '@/components/product-card'
import { formatCurrency } from '@/store/cart-store'
import { AuthModal } from '@/components/auth/auth-modal'
import { products } from '@/data/products'

export default function WishlistPage() {
  const { isAuthenticated, openAuthModal } = useAuthStore()
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore()
  const { addItem, openCart } = useCartStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal('login')
    }
  }, [isAuthenticated, openAuthModal])

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.images?.[0],
      category: product.category,
      subcategory: product.subcategory,
      inStock: (product as any).stock ? (product as any).stock > 0 : true,
      quantity: 1,
      size: (product as any).variants?.sizes?.[0] || 'One Size',
      color: (product as any).variants?.colors?.[0] || 'Default'
    })
    openCart()
  }

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId)
  }

  const handleMoveAllToCart = () => {
    items.forEach(it => {
      const product = products.find(p => p.id === it.productId)
      if (!product) return
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || (product as any).image,
        category: product.category,
        subcategory: product.subcategory,
        inStock: (product as any).stock ? (product as any).stock > 0 : true,
        quantity: 1,
        size: (product as any).variants?.sizes?.[0] || 'One Size',
        color: (product as any).variants?.colors?.[0] || 'Default'
      })
    })
    clearWishlist()
    openCart()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream to-fog flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-serif font-semibold text-ink mb-2">Please log in</h2>
          <p className="text-ink/60">You need to be logged in to view your wishlist.</p>
        </div>
        <AuthModal />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-ink/60 hover:text-ink"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-serif font-semibold text-ink">My Wishlist</h1>
            <p className="text-ink/60">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
            <CardContent className="p-8 text-center">
              <Heart className="w-16 h-16 text-ink/30 mx-auto mb-4" />
              <h2 className="text-xl font-serif font-semibold text-ink mb-2">Your wishlist is empty</h2>
              <p className="text-ink/60 mb-6">
                Save items you love by clicking the heart icon on any product.
              </p>
              <Button 
                onClick={() => router.push('/shop')}
                className="bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold"
              >
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Wishlist Actions */}
            <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-gold/10 text-gold border-gold/20">
                      {items.length} items
                    </Badge>
                    <p className="text-sm text-ink/60">
                      Total value: {formatCurrency(items.reduce((sum: number, it) => {
                        const p = products.find(pr => pr.id === it.productId)
                        return sum + (p?.price || 0)
                      }, 0))}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleMoveAllToCart}
                      className="bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Move All to Cart
                    </Button>
                    <Button
                      onClick={clearWishlist}
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Wishlist Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((it) => {
                const product = products.find(p => p.id === it.productId)
                if (!product) return null
                return (
                <Card key={product.id} className="bg-gradient-to-b from-cream to-fog/30 border-gold/20 group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <div className="w-full h-full bg-gray-100" />
                      
                      {/* Quick Actions */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex flex-col gap-2">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="w-8 h-8 bg-white/90 hover:bg-white"
                            onClick={() => router.push(`/shop/${product.id}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="w-8 h-8 bg-white/90 hover:bg-white text-red-500 hover:text-red-600"
                            onClick={() => handleRemoveFromWishlist(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Wishlist Badge */}
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-red-500 text-white">
                          <Heart className="w-3 h-3 mr-1 fill-current" />
                          Saved
                        </Badge>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-medium text-ink mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-ink/60 mb-2">{product.category}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-ink">{formatCurrency(product.price)}</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-sm text-ink/60 line-through">
                              {formatCurrency(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        {product.rating && (
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-ink/60">★</span>
                            <span className="text-sm text-ink/60">{product.rating}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold"
                          size="sm"
                        >
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          onClick={() => router.push(`/shop/${product.id}`)}
                          variant="outline"
                          size="sm"
                          className="border-gold/30 text-gold hover:bg-gold hover:text-ink"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                )
              })}
            </div>

            {/* Bottom Actions */}
            <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20 mt-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-ink mb-1">Ready to purchase?</h3>
                    <p className="text-sm text-ink/60">
                      Move all items to your cart and proceed to checkout
                    </p>
                  </div>
                  <Button
                    onClick={handleMoveAllToCart}
                    className="bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Move All to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}