import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
  const pages = ['/', '/shop', '/collections', '/about', '/contact']
  return pages.map((p) => ({ url: `${base}${p}`, changeFrequency: 'weekly', priority: p === '/' ? 1 : 0.7 }))
}


