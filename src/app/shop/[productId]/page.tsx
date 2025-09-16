'use client'

import { useEffect, useState } from 'react'
import { notFound, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  ShoppingBag, 
  Star, 
  Plus, 
  Minus, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  MessageCircle,
  Check,
  AlertCircle,
  Info
} from 'lucide-react'

import { getProductById, getProductByIdWithDefaults, Product, ProductVariant } from '@/data/products'
import { useCartStore, formatCurrency } from '@/store/cart-store'
import { useWishlistStore } from '@/store/wishlist-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

interface PageProps {
  params: Promise<{
    productId: string
  }>
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter()
  const [productId, setProductId] = useState<string>('')
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showAddedFeedback, setShowAddedFeedback] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews' | 'care'>('description')

  const { addItem, openCart } = useCartStore()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()

  useEffect(() => {
    params.then((resolvedParams) => {
      setProductId(resolvedParams.productId)
      const foundProduct = getProductByIdWithDefaults(resolvedParams.productId)
      setProduct(foundProduct || null)
      if (foundProduct) {
        setSelectedVariant(foundProduct.variants?.[0] || null)
      }
    })
  }, [params])

  const isWishlisted = product ? isInWishlist(product.id) : false

  if (!productId || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream to-fog flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-ink/70">Loading product...</p>
        </div>
      </div>
    )
  }

  // Get current images based on selected variant
  const currentImages = selectedVariant?.images || product.images
  const currentStock = selectedVariant?.sizes.find(s => s.size === selectedSize)?.stock || product.stock || 0
  const maxQuantityForSize = Math.min(currentStock, product.maxQuantity || 99)

  useEffect(() => {
    // Reset selected size when variant changes
    if (selectedVariant && selectedVariant.sizes.length > 0) {
      setSelectedSize(selectedVariant.sizes[0].size)
    } else if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0])
    }
  }, [selectedVariant, product.sizes])

  const handleAddToCart = async () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      alert('Please select a size')
      return
    }

    setIsAddingToCart(true)

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: currentImages[0],
      category: product.category,
      subcategory: product.subcategory,
      color: selectedVariant?.color,
      size: selectedSize || undefined,
      inStock: currentStock > 0,
      maxQuantity: maxQuantityForSize,
    }

    addItem({ ...cartItem, quantity })

    setShowAddedFeedback(true)
    setTimeout(() => {
      setShowAddedFeedback(false)
      setIsAddingToCart(false)
    }, 1000)

    setTimeout(() => {
      openCart()
    }, 500)
  }

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % currentImages.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)
  }

  // Get related products (excluding current product)
  const relatedProducts = product.relatedProducts 
    ? product.relatedProducts.map(id => getProductByIdWithDefaults(id)).filter(Boolean).slice(0, 4)
    : []

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-4 h-4',
          i < Math.floor(rating) ? 'fill-gold text-gold' : 'text-stone'
        )}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-ink/60 mb-6">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-ink transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-ink transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </div>

        {/* Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-ink/70 hover:text-ink"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-serif font-semibold text-ink">{product.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-ink/60">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <Card className="overflow-hidden bg-gradient-to-br from-white to-cream/30 border-gold/20">
              <div className="relative aspect-square group">
                <Image
                  src={currentImages[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-300",
                    isZoomed && "scale-150 cursor-zoom-out"
                  )}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onClick={() => setIsZoomed(!isZoomed)}
                />
                
                {/* Navigation Arrows */}
                {currentImages.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}

                {/* Zoom Icon */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-gradient-to-r from-gold to-yellow-400 text-ink">
                      New
                    </Badge>
                  )}
                  {product.isBestSeller && (
                    <Badge variant="secondary">
                      Best Seller
                    </Badge>
                  )}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <Badge variant="destructive">
                      Sale
                    </Badge>
                  )}
                </div>
              </div>
            </Card>

            {/* Thumbnail Images */}
            {currentImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {currentImages.map((image, index) => (
                  <button
                    key={index}
                    className={cn(
                      "relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
                      selectedImageIndex === index
                        ? "border-gold shadow-md"
                        : "border-transparent hover:border-gold/50"
                    )}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Price and Actions */}
            <Card className="p-6 bg-gradient-to-br from-white to-cream/30 border-gold/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-bold text-ink">
                      {formatCurrency(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-lg text-ink/60 line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <p className="text-ink/70">{product.description}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleWishlistToggle}
                    className={cn(
                      "transition-colors",
                      isWishlisted ? "text-red-500 hover:text-red-600" : "text-ink/60 hover:text-ink"
                    )}
                  >
                    <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleShare}
                    className="text-ink/60 hover:text-ink"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Color Selection */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-ink mb-2">
                    Color: {selectedVariant?.color}
                  </h3>
                  <div className="flex gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.color}
                        className={cn(
                          "w-10 h-10 rounded-full border-2 transition-all",
                          selectedVariant?.color === variant.color
                            ? "border-gold shadow-lg scale-110"
                            : "border-stone hover:border-gold/50"
                        )}
                        style={{ backgroundColor: variant.colorHex }}
                        onClick={() => setSelectedVariant(variant)}
                        title={variant.color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {((selectedVariant?.sizes && selectedVariant.sizes.length > 0) || 
                (product.sizes && product.sizes.length > 0)) && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-ink mb-2">Size: {selectedSize}</h3>
                  <div className="flex gap-2 flex-wrap">
                    {(selectedVariant?.sizes || product.sizes?.map(size => ({ size, stock: product.stock || 0 })) || []).map((sizeOption) => {
                      const sizeStock = typeof sizeOption === 'object' ? sizeOption.stock : product.stock || 0
                      const sizeValue = typeof sizeOption === 'object' ? sizeOption.size : sizeOption
                      
                      return (
                        <button
                          key={sizeValue}
                          className={cn(
                            "px-4 py-2 border rounded-lg text-sm font-medium transition-all",
                            selectedSize === sizeValue
                              ? "border-gold bg-gold text-ink"
                              : sizeStock > 0
                                ? "border-stone hover:border-gold text-ink"
                                : "border-stone/50 text-ink/40 cursor-not-allowed",
                          )}
                          onClick={() => sizeStock > 0 && setSelectedSize(sizeValue)}
                          disabled={sizeStock === 0}
                        >
                          {sizeValue}
                          {sizeStock === 0 && (
                            <span className="ml-1 text-xs">(Out of Stock)</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="mb-4">
                {currentStock > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">
                      {currentStock > 10 ? 'In Stock' : `Only ${currentStock} left in stock`}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Quantity Selection */}
              {currentStock > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-ink mb-2">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gold/30 rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 hover:bg-gold hover:text-ink"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-medium text-ink">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 hover:bg-gold hover:text-ink"
                        onClick={() => setQuantity(Math.min(maxQuantityForSize, quantity + 1))}
                        disabled={quantity >= maxQuantityForSize}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-ink/60">
                      Max: {maxQuantityForSize}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  className={cn(
                    "w-full h-12 text-base font-medium transition-all duration-200",
                    showAddedFeedback 
                      ? "bg-green-500 hover:bg-green-600 text-white" 
                      : "bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold"
                  )}
                  onClick={handleAddToCart}
                  disabled={currentStock === 0 || isAddingToCart || !selectedSize}
                >
                  {showAddedFeedback ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Added to Cart!
                    </>
                  ) : isAddingToCart ? (
                    'Adding...'
                  ) : currentStock === 0 ? (
                    'Out of Stock'
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Add to Cart • {formatCurrency(product.price * quantity)}
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-12 border-gold/30 text-gold hover:bg-gold hover:text-ink"
                  onClick={() => {
                    const message = `Hi! I'm interested in the ${product.name}. Can you tell me more about it?`
                    const whatsappUrl = `https://wa.me/2349061819572?text=${encodeURIComponent(message)}`
                    window.open(whatsappUrl, '_blank')
                  }}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Ask Questions
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gold/20">
                <div className="text-center">
                  <Truck className="w-6 h-6 text-gold mx-auto mb-1" />
                  <span className="text-xs text-ink/70">Free Shipping</span>
                  <p className="text-xs text-ink/50">Orders over ₦50k</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-gold mx-auto mb-1" />
                  <span className="text-xs text-ink/70">Secure Payment</span>
                  <p className="text-xs text-ink/50">SSL Protected</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 text-gold mx-auto mb-1" />
                  <span className="text-xs text-ink/70">Easy Returns</span>
                  <p className="text-xs text-ink/50">14-day policy</p>
                </div>
              </div>
            </Card>

            {/* Product Information Tabs */}
            <Card className="bg-gradient-to-br from-white to-cream/30 border-gold/20">
              <CardHeader>
                <div className="flex space-x-1 border-b border-gold/20">
                  {[
                    { id: 'description', label: 'Description' },
                    { id: 'specifications', label: 'Specifications' },
                    { id: 'reviews', label: 'Reviews' },
                    { id: 'care', label: 'Care' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={cn(
                        "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                        activeTab === tab.id
                          ? "border-gold text-ink"
                          : "border-transparent text-ink/60 hover:text-ink"
                      )}
                      onClick={() => setActiveTab(tab.id as any)}
                    >
                      {tab.label}
                      {tab.id === 'reviews' && ` (${product.reviewCount})`}
                    </button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                {activeTab === 'description' && (
                  <div className="space-y-4">
                    <p className="text-ink/80 leading-relaxed">
                      {product.longDescription || product.description}
                    </p>
                    <div>
                      <h4 className="font-medium text-ink mb-2">Materials</h4>
                      <ul className="list-disc list-inside text-ink/70 space-y-1">
                        {product.materials.map((material, index) => (
                          <li key={index}>{material}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="space-y-4">
                    <dl className="grid grid-cols-1 gap-3">
                      {product.specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between py-2 border-b border-gold/10">
                          <dt className="font-medium text-ink/80">{spec.label}</dt>
                          <dd className="text-ink/70">{spec.value}</dd>
                        </div>
                      ))}
                      <div className="flex justify-between py-2 border-b border-gold/10">
                        <dt className="font-medium text-ink/80">SKU</dt>
                        <dd className="text-ink/70">{product.sku}</dd>
                      </div>
                      {product.weight && (
                        <div className="flex justify-between py-2 border-b border-gold/10">
                          <dt className="font-medium text-ink/80">Weight</dt>
                          <dd className="text-ink/70">{product.weight}</dd>
                        </div>
                      )}
                      {product.dimensions && (
                        <div className="flex justify-between py-2 border-b border-gold/10">
                          <dt className="font-medium text-ink/80">Dimensions</dt>
                          <dd className="text-ink/70">
                            {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {/* Review Summary */}
                    <div className="flex items-center gap-6 p-4 bg-stone/10 rounded-lg">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-ink">{product.rating}</div>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          {renderStars(product.rating)}
                        </div>
                        <div className="text-sm text-ink/60 mt-1">{product.reviewCount} reviews</div>
                      </div>
                      <div className="flex-1">
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((stars) => {
                            const count = Math.floor(Math.random() * 30) // Mock data
                            const percentage = (count / product.reviewCount) * 100
                            return (
                              <div key={stars} className="flex items-center gap-2 text-sm">
                                <span className="w-3">{stars}</span>
                                <Star className="w-3 h-3 fill-gold text-gold" />
                                <div className="flex-1 bg-stone/20 rounded-full h-2">
                                  <div
                                    className="bg-gold h-2 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span className="w-8 text-ink/60">{count}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-4">
                      {product.reviews?.map((review) => (
                        <div key={review.id} className="border-b border-gold/10 pb-4 last:border-b-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-ink">{review.userName}</span>
                                {review.verified && (
                                  <Badge variant="outline" className="text-xs border-green-200 text-green-600">
                                    Verified Purchase
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                  {renderStars(review.rating)}
                                </div>
                                <span className="text-sm text-ink/60">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <h4 className="font-medium text-ink mb-1">{review.title}</h4>
                          <p className="text-ink/70 text-sm leading-relaxed">{review.comment}</p>
                        </div>
                      )) || (
                        <div className="text-center py-8 text-ink/60">
                          <Info className="w-8 h-8 mx-auto mb-2" />
                          <p>No reviews yet. Be the first to review this product!</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-ink mb-3">Care Instructions</h4>
                      {product.careInstructions ? (
                        <ul className="space-y-2">
                          {product.careInstructions.map((instruction, index) => (
                            <li key={index} className="flex items-start gap-2 text-ink/70">
                              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {instruction}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-ink/70">
                          Clean with a soft, dry cloth. Store in a cool, dry place away from direct sunlight.
                          For leather products, use appropriate leather care products.
                        </p>
                      )}
                    </div>
                    
                    <Separator className="border-gold/20" />
                    
                    <div>
                      <h4 className="font-medium text-ink mb-2">Warranty</h4>
                      <p className="text-ink/70 text-sm">
                        All OmoOniBag products come with a 1-year warranty against manufacturing defects.
                        Normal wear and tear is not covered under warranty.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-semibold text-ink mb-2">You Might Also Like</h2>
              <p className="text-ink/60">Discover more products from our collection</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct!.id} product={relatedProduct!} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
