import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/product-card";
import { HeroBanner } from "@/components/hero-banner";
import { getNewProducts, getBestSellers } from "@/data/products";
import { ArrowRight, Star, Sparkles, Heart, TrendingUp, Award, Zap, ShoppingBag } from "lucide-react";
import { db } from '@/lib/db'

export default async function Home() {
  const newProducts = getNewProducts();
  const bestSellers = getBestSellers();
  const homepage = await db.homepageContent.findFirst({ orderBy: { updatedAt: 'desc' } })

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Hero Section with Split Layout */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #C7A955 2px, transparent 2px),
                              radial-gradient(circle at 75% 75%, #C7A955 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
            {/* Left Content */}
            <div className="space-y-8 lg:pr-8">
              <div className="space-y-6">
                <Badge variant="accent" className="text-sm px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Nigerian Luxury Fashion
                </Badge>
                
                <h1 className="display-2xl text-foreground leading-tight">
                  {homepage?.heroTitle ?? (
                    <>
                      Every Girl <br />
                      <span className="text-gold italic">Deserves</span> <br />
                      Her Perfect Moment
                    </>
                  )}
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  {homepage?.heroSubtitle ?? 'Bags and shoes that tell your story. From Lagos boardrooms to Abuja galas, we create pieces that elevate your everyday into something extraordinary.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="xl" className="group">
                  <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  {homepage?.heroButtonText ?? 'Explore Collection'}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="xl" variant="outline" className="group">
                  <Heart className="w-5 h-5 mr-2" />
                  Our Story
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">50+</div>
                  <div className="text-sm text-muted-foreground">Unique Designs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>

            {/* Right Visual - Dynamic Banner */}
            <div className="relative">
              <HeroBanner />
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Categories Grid */}
      <section className="py-20 bg-fog">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Shop by Category
            </Badge>
            <h2 className="display-xl mb-6">Find Your Perfect Match</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you&apos;re preparing for a boardroom presentation or a weekend getaway, 
              we have the perfect piece for every occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bags Category */}
            <Link href="/shop/bags" className="group">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/images/features/bags-feature.svg"
                    alt="Luxury Bags Collection"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-background">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="accent" className="text-xs">
                        Premium Collection
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-background/20 text-background border-background/20">
                        15+ Styles
                      </Badge>
                    </div>
                    
                    <h3 className="h1 mb-3">Luxury Bags</h3>
                    <p className="text-background/80 mb-4">
                      From boardroom briefcases to weekend totes, discover bags that command attention.
                    </p>
                    
                    <div className="flex items-center gap-2 text-gold group-hover:gap-4 transition-all">
                      <span className="font-medium">Explore Bags</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Shoes Category */}
            <Link href="/shop/shoes" className="group">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <div className="relative aspect-[16/10]">
            <Image
                    src="/images/features/shoes-feature.svg"
                    alt="Designer Shoes Collection"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-background">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="accent" className="text-xs">
                        Trending Now
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-background/20 text-background border-background/20">
                        12+ Styles
                      </Badge>
                    </div>
                    
                    <h3 className="h1 mb-3">Designer Shoes</h3>
                    <p className="text-background/80 mb-4">
                      From owambe heels to office pumps, step into confidence with every stride.
                    </p>
                    
                    <div className="flex items-center gap-2 text-gold group-hover:gap-4 transition-all">
                      <span className="font-medium">Explore Shoes</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <Badge variant="accent" className="mb-4">
                <Star className="w-4 h-4 mr-2" />
                Customer Favorites
              </Badge>
              <h2 className="display-xl mb-4">Pieces They Can&apos;t Stop Talking About</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                These are the pieces that have captured hearts and turned heads. 
                Discover what makes them special.
              </p>
            </div>
            
            <Link href="/shop/bestsellers">
              <Button variant="outline" size="lg" className="group">
                View All Bestsellers
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map((product, index) => (
              <div key={product.id} className="animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals with Bento Grid */}
      <section className="py-20 bg-coal text-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="accent" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2 text-ink" />
              Fresh Arrivals
            </Badge>
            <h2 className="display-xl mb-6 text-background">The Latest & Greatest</h2>
            <p className="text-lg text-background/80 max-w-2xl mx-auto">
              Hot off our design table. These pieces represent the future of Nigerian luxury fashion.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Large Featured Product */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden bg-background border-0 h-full">
                <div className="relative aspect-[16/12] lg:aspect-[16/10]">
          <Image
                    src={newProducts[0]?.images[0] || "/images/products/luxury-tote-black-1.svg"}
                    alt="Featured New Arrival"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <Badge variant="accent" className="mb-3">
                      Just Dropped
                    </Badge>
                    <h3 className="h1 text-background mb-2">{newProducts[0]?.name}</h3>
                    <p className="text-background/90 mb-4">{newProducts[0]?.description}</p>
                    <Button variant="secondary" size="lg">
                      Discover More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* New Products Grid */}
            <div className="space-y-6">
              {newProducts.slice(1, 3).map((product) => (
                <ProductCard key={product.id} product={product} variant="compact" />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/shop/new">
              <Button variant="accent" size="xl" className="group">
                <Sparkles className="w-5 h-5 mr-2" />
                See All New Arrivals
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Promise Section */}
      <section className="py-20 bg-gradient-to-br from-cream via-fog to-stone">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Award className="w-4 h-4 mr-2" />
              The OmoOniBag Promise
            </Badge>
            <h2 className="display-xl mb-6">Why Choose Us?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We&apos;re not just selling accessories; we&apos;re crafting confidence, 
              one beautiful piece at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-background/50 backdrop-blur-sm">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Star className="h-8 w-8 text-ink" />
                </div>
                <h3 className="h2 mb-4">Premium Quality</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Each piece is meticulously crafted using the finest materials and time-honored techniques. 
                  Quality that speaks for itself.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-background/50 backdrop-blur-sm">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Zap className="h-8 w-8 text-ink" />
                </div>
                <h3 className="h2 mb-4">Lightning Fast Delivery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Same-day delivery in Osogbo, 1-4 days nationwide. Your perfect piece shouldn&apos;t keep you waiting.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-background/50 backdrop-blur-sm">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Heart className="h-8 w-8 text-ink" />
                </div>
                <h3 className="h2 mb-4">Love Guarantee</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Not in love? 24-48 hour easy exchanges. Because you deserve to feel amazing in everything you wear.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community & Social Proof */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="accent" className="mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Join the Community
            </Badge>
            <h2 className="display-xl mb-6">Follow Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get behind-the-scenes access, styling tips, and be the first to see new collections.
            </p>
          </div>

          {/* Instagram Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Link
                key={i}
                href="https://instagram.com/omo-oni-bag"
          target="_blank"
          rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl"
        >
          <Image
                  src={`/images/instagram/ig-${i}.svg`}
                  alt={`Instagram post ${i}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-coal/0 group-hover:bg-coal/20 transition-colors duration-300 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter Signup */}
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-gold/10 to-gold/5 border-gold/20">
            <CardContent className="p-8 text-center">
              <h3 className="h2 mb-4">Stay in the Loop</h3>
              <p className="text-muted-foreground mb-6">
                Be the first to know about new drops, exclusive offers, and styling secrets.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                />
                <Button variant="accent" size="lg" className="group">
                  Join Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                Join 500+ fashion lovers. Unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}