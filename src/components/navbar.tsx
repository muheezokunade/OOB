'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, Search, ShoppingBag, MessageCircle, Heart } from 'lucide-react'
import { MobileMenu } from './mobile-menu'
import { MegaMenu } from './mega-menu'
import { CartDrawer } from './cart-drawer'
import { useCartStore, useCartItemCount } from '@/store/cart-store'
import { useWishlistStore } from '@/store/wishlist-store'

const navigation = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Shop',
    href: '/shop',
    submenu: [
      {
        name: 'Bags',
        href: '/shop/bags',
        items: [
          { name: 'Totes', href: '/shop/bags/totes' },
          { name: 'Handbags', href: '/shop/bags/handbags' },
          { name: 'Clutches', href: '/shop/bags/clutches' },
        ]
      },
      {
        name: 'Shoes',
        href: '/shop/shoes',
        items: [
          { name: 'Slippers', href: '/shop/shoes/slippers' },
          { name: 'Owambe', href: '/shop/shoes/owambe' },
          { name: 'Office', href: '/shop/shoes/office' },
        ]
      }
    ]
  },
  {
    name: 'Collections',
    href: '/collections',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const { openCart } = useCartStore()
  const itemCount = useCartItemCount()
  const { getWishlistCount } = useWishlistStore()
  const wishlistCount = getWishlistCount()

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-serif text-xl font-bold text-foreground">
                OmoOniBag
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-foreground hover:text-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                  
                  {/* Mega Menu */}
                  {item.submenu && activeSubmenu === item.name && (
                    <MegaMenu submenu={item.submenu} />
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center font-bold shadow-md">
                      {wishlistCount > 99 ? '99+' : wishlistCount}
                    </span>
                  )}
                  <span className="sr-only">Wishlist ({wishlistCount} items)</span>
                </Button>
              </Link>

              {/* Cart */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={openCart}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-gold to-yellow-400 rounded-full text-xs text-ink flex items-center justify-center font-bold shadow-md animate-pulse">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
                <span className="sr-only">Shopping cart ({itemCount} items)</span>
              </Button>

              {/* WhatsApp */}
              <Button
                variant="accent"
                size="sm"
                className="hidden sm:flex"
                onClick={() => window.open('https://wa.me/2349061819572', '_blank')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
      />

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  )
}
