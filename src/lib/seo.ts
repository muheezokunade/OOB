import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
  price?: number
  currency?: string
  availability?: 'in stock' | 'out of stock' | 'preorder'
  brand?: string
  category?: string
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = '/og-image.jpg',
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = [],
    price,
    currency = 'NGN',
    availability,
    brand = 'OmoOniBag',
    category
  } = config

  const fullTitle = title.includes('OmoOniBag') ? title : `${title} | OmoOniBag`
  const fullDescription = description || 'Discover luxury shoes and bags from OmoOniBag. Premium quality, elegant designs, and exceptional craftsmanship for the modern woman.'

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: [
      'luxury shoes',
      'designer bags',
      'women fashion',
      'Nigerian fashion',
      'premium accessories',
      'elegant footwear',
      'handbags',
      'OmoOniBag',
      ...keywords
    ].join(', '),
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      type: type === 'product' ? 'website' : type,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      siteName: 'OmoOniBag',
      locale: 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [image],
      creator: '@omo_oni_bag'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    alternates: {
      canonical: url
    }
  }

  // Add structured data for products
  if (type === 'product' && price) {
    metadata.other = {
      'product:price:amount': price.toString(),
      'product:price:currency': currency,
      'product:availability': availability || 'in stock',
      'product:brand': brand,
      'product:category': category
    }
  }

  // Add article metadata
  if (type === 'article') {
    metadata.other = {
      'article:author': author,
      'article:section': section,
      'article:tag': tags.join(', '),
      'article:published_time': publishedTime,
      'article:modified_time': modifiedTime
    }
  }

  return metadata
}

export function generateProductStructuredData(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images || [product.image],
    brand: {
      '@type': 'Brand',
      name: 'OmoOniBag'
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'NGN',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'OmoOniBag'
      }
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount
    } : undefined,
    sku: product.sku,
    weight: product.weight ? {
      '@type': 'QuantitativeValue',
      value: product.weight,
      unitCode: 'KGM'
    } : undefined,
    dimensions: product.dimensions ? {
      '@type': 'QuantitativeValue',
      width: product.dimensions.width,
      height: product.dimensions.height,
      depth: product.dimensions.length,
      unitCode: 'CMT'
    } : undefined
  }
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OmoOniBag',
    description: 'Luxury shoes and bags for the modern woman. Premium quality, elegant designs, and exceptional craftsmanship.',
    url: 'https://omo-oni-bag.com',
    logo: 'https://omo-oni-bag.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+234-906-181-9572',
      contactType: 'customer service',
      availableLanguage: 'English'
    },
    sameAs: [
      'https://instagram.com/omo_oni_bag',
      'https://facebook.com/omo_oni_bag',
      'https://twitter.com/omo_oni_bag'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NG',
      addressLocality: 'Lagos',
      addressRegion: 'Lagos State'
    }
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateArticleStructuredData(article: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'OmoOniBag',
      logo: {
        '@type': 'ImageObject',
        url: 'https://omo-oni-bag.com/logo.png'
      }
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://omo-oni-bag.com/blog/${article.slug}`
    }
  }
}

export function generateWebSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OmoOniBag',
    url: 'https://omo-oni-bag.com',
    description: 'Luxury shoes and bags for the modern woman',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://omo-oni-bag.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

export function generateSitemapData(pages: Array<{ url: string; lastModified: string; changeFrequency: string; priority: number }>) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${page.url}</loc>
      <lastmod>${page.lastModified}</lastmod>
      <changefreq>${page.changeFrequency}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `).join('')}
</urlset>`
}

export function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: https://omo-oni-bag.com/sitemap.xml

# Block admin pages
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/`
}


