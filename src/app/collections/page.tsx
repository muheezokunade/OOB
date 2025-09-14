import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getProductsByCategory, getProductsBySubcategory, getBestSellers } from '@/data/products'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ProductCard } from '@/components/product-card'
import { ArrowRight, Star, Sparkles, Award, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Collections | OmoOniBag - Curated Collections',
  description: 'Discover our carefully curated collections of luxury bags and shoes. From everyday essentials to statement pieces.',
}

const collections = [
  {
    id: 'new-arrivals',
    title: 'New Arrivals',
    description: 'Fresh designs for the modern woman. Discover our latest collection of handcrafted bags and shoes.',
    image: '/images/collections/new-arrivals.svg',
    href: '/shop?collection=new',
    badge: 'New',
    products: getProductsByCategory('Bags').filter(p => p.isNew).slice(0, 3)
  },
  {
    id: 'best-sellers',
    title: 'Best Sellers',
    description: 'Our most loved pieces, chosen by women who appreciate quality and style.',
    image: '/images/collections/best-sellers.svg',
    href: '/shop?collection=bestsellers',
    badge: 'Popular',
    products: getBestSellers().slice(0, 3)
  },
  {
    id: 'owambe-collection',
    title: 'Owambe Collection',
    description: 'Bold, beautiful designs perfect for Nigerian celebrations and special occasions.',
    image: '/images/collections/owambe.svg',
    href: '/shop/shoes/owambe',
    badge: 'Exclusive',
    products: getProductsBySubcategory('Owambe').slice(0, 3)
  },
  {
    id: 'professional-edit',
    title: 'Professional Edit',
    description: 'Sophisticated designs that transition seamlessly from boardroom to events.',
    image: '/images/collections/professional.svg',
    href: '/shop/shoes/office',
    badge: 'Trending',
    products: getProductsBySubcategory('Office').slice(0, 3)
  }
]

export default function CollectionsPage() {
  const newProducts = getProductsByCategory('Bags').filter(p => p.isNew)
  const bestSellers = getBestSellers()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-fog">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Curated Collections
            </Badge>
            <h1 className="display-xl mb-6">Our Collections</h1>
            <p className="text-lg text-muted-foreground">
              Discover our carefully curated collections of luxury bags and shoes. 
              Each piece is thoughtfully selected to complement your style and elevate your wardrobe.
            </p>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {collections.map((collection, index) => (
              <Link key={collection.id} href={collection.href} className="group">
                <Card className="overflow-hidden border-0 shadow-soft hover:shadow-elevated transition-all duration-500 group-hover:-translate-y-2">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-6 left-6">
                      <Badge variant="accent" className="text-xs shadow-lg">
                        {collection.badge}
                      </Badge>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="h2 mb-2">{collection.title}</h3>
                      <p className="text-sm opacity-90 mb-4 line-clamp-2">
                        {collection.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                        <span>Explore Collection</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-fog">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Star className="w-4 h-4 mr-2" />
              Featured Products
            </Badge>
            <h2 className="display-lg mb-6">Handpicked for You</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our team has carefully selected these standout pieces that embody the perfect 
              blend of style, quality, and craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-16">
            <div>
              <Badge variant="outline" className="mb-4">
                <TrendingUp className="w-4 h-4 mr-2" />
                Latest Additions
              </Badge>
              <h2 className="display-lg mb-4">New Arrivals</h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                Stay ahead of the trends with our newest collection of bags and shoes.
              </p>
            </div>
            
            <Link href="/shop?filter=new" className="hidden lg:block">
              <Button variant="outline" className="group">
                View All New Items
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 lg:hidden">
            <Link href="/shop?filter=new">
              <Button variant="outline" className="group">
                View All New Items
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ink text-cream">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-gold text-ink">
              <Award className="w-4 h-4 mr-2" />
              Premium Quality
            </Badge>
            <h2 className="display-lg mb-6">A bag for every girl, every time.</h2>
            <p className="text-lg mb-8 opacity-90">
              From everyday essentials to statement pieces for special occasions, 
              find the perfect bag or shoe to complete your look.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-gold text-ink hover:bg-gold/90 w-full sm:w-auto">
                  Shop All Collections
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-cream text-cream hover:bg-cream hover:text-ink w-full sm:w-auto">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}