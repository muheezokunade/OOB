'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { WhatsAppCTA } from '@/components/whatsapp-cta'
import { Instagram, MessageCircle, Mail } from 'lucide-react'

const footerLinks = {
  shop: [
    { name: 'Bags', href: '/shop/bags' },
    { name: 'Shoes', href: '/shop/shoes' },
    { name: 'New Arrivals', href: '/shop/new' },
    { name: 'Best Sellers', href: '/shop/bestsellers' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Collections', href: '/collections' },
    { name: 'Careers', href: '/careers' },
  ],
  support: [
    { name: 'Delivery & Returns', href: '/delivery' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Care Instructions', href: '/care' },
    { name: 'FAQ', href: '/faq' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Refund Policy', href: '/refunds' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
}

export function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Newsletter signup logic here
    console.log('Newsletter signup')
  }

  return (
    <footer className="bg-coal text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-4">OmoOniBag</h3>
              <p className="text-background/80 leading-relaxed max-w-md">
                A bag for every girl, every time. Luxury without clutter. 
                Curated bags and shoes crafted to elevate everyday moments.
              </p>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="font-medium">Stay Updated</h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
                    required
                  />
                  <Button type="submit" variant="accent" size="sm">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-background/60">
                  Get updates on new collections and exclusive offers
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">09061819572</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span className="text-sm">hello@omo-oni-bag.com</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h4 className="font-medium">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/80 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-medium">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/80 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="font-medium">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/80 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-background/60">
              <span>&copy; 2024 OmoOniBag. All rights reserved.</span>
              <div className="flex gap-4">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Link
                href="https://instagram.com/omo-oni-bag"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 hover:text-background transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://tiktok.com/@omo-oni-bag"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 hover:text-background transition-colors"
                aria-label="Follow us on TikTok"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <WhatsAppCTA />
    </footer>
  )
}

