// Social media integration utilities

export interface SocialShareData {
  title: string
  description: string
  url: string
  image?: string
  hashtags?: string[]
}

export class SocialMediaService {
  static shareOnFacebook(data: SocialShareData): void {
    const url = new URL('https://www.facebook.com/sharer/sharer.php')
    url.searchParams.set('u', data.url)
    url.searchParams.set('quote', data.title)
    
    this.openShareWindow(url.toString(), 'Facebook')
  }

  static shareOnTwitter(data: SocialShareData): void {
    const url = new URL('https://twitter.com/intent/tweet')
    url.searchParams.set('text', `${data.title} - ${data.description}`)
    url.searchParams.set('url', data.url)
    
    if (data.hashtags && data.hashtags.length > 0) {
      url.searchParams.set('hashtags', data.hashtags.join(','))
    }
    
    this.openShareWindow(url.toString(), 'Twitter')
  }

  static shareOnInstagram(data: SocialShareData): void {
    // Instagram doesn't support direct URL sharing, so we'll copy to clipboard
    const text = `${data.title}\n\n${data.description}\n\n${data.url}`
    this.copyToClipboard(text)
    
    // Open Instagram in new tab
    window.open('https://www.instagram.com/', '_blank')
  }

  static shareOnWhatsApp(data: SocialShareData): void {
    const text = `${data.title}\n\n${data.description}\n\n${data.url}`
    const url = new URL('https://wa.me/')
    url.searchParams.set('text', text)
    
    this.openShareWindow(url.toString(), 'WhatsApp')
  }

  static shareOnLinkedIn(data: SocialShareData): void {
    const url = new URL('https://www.linkedin.com/sharing/share-offsite/')
    url.searchParams.set('url', data.url)
    url.searchParams.set('title', data.title)
    url.searchParams.set('summary', data.description)
    
    this.openShareWindow(url.toString(), 'LinkedIn')
  }

  static shareOnPinterest(data: SocialShareData): void {
    const url = new URL('https://pinterest.com/pin/create/button/')
    url.searchParams.set('url', data.url)
    url.searchParams.set('description', data.description)
    url.searchParams.set('media', data.image || '')
    
    this.openShareWindow(url.toString(), 'Pinterest')
  }

  static shareViaEmail(data: SocialShareData): void {
    const subject = encodeURIComponent(data.title)
    const body = encodeURIComponent(`${data.description}\n\n${data.url}`)
    const url = `mailto:?subject=${subject}&body=${body}`
    
    window.location.href = url
  }

  static shareViaSMS(data: SocialShareData): void {
    const text = encodeURIComponent(`${data.title} - ${data.url}`)
    const url = `sms:?body=${text}`
    
    window.location.href = url
  }

  static copyToClipboard(text: string): Promise<void> {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text)
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      return new Promise((resolve, reject) => {
        if (document.execCommand('copy')) {
          resolve()
        } else {
          reject(new Error('Failed to copy text'))
        }
        document.body.removeChild(textArea)
      })
    }
  }

  private static openShareWindow(url: string, platform: string): void {
    const width = 600
    const height = 400
    const left = (window.screen.width - width) / 2
    const top = (window.screen.height - height) / 2
    
    window.open(
      url,
      `${platform}Share`,
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    )
  }

  static getSocialLinks() {
    return {
      instagram: 'https://instagram.com/omo_oni_bag',
      facebook: 'https://facebook.com/omo_oni_bag',
      twitter: 'https://twitter.com/omo_oni_bag',
      whatsapp: 'https://wa.me/2349061819572',
      email: 'mailto:info@omo-oni-bag.com'
    }
  }

  static generateProductShareData(product: any): SocialShareData {
    return {
      title: product.name,
      description: product.description,
      url: `${window.location.origin}/shop/${product.id}`,
      image: product.image,
      hashtags: ['OmoOniBag', 'LuxuryFashion', 'NigerianFashion', product.category]
    }
  }

  static generateBlogShareData(article: any): SocialShareData {
    return {
      title: article.title,
      description: article.excerpt,
      url: `${window.location.origin}/blog/${article.slug}`,
      image: article.featuredImage,
      hashtags: ['OmoOniBag', 'FashionBlog', 'StyleTips', article.category]
    }
  }
}

// Social login integration
export class SocialLoginService {
  static async loginWithGoogle(): Promise<any> {
    // In a real implementation, you would integrate with Google OAuth
    // This is a placeholder for the Google OAuth flow
    return new Promise((resolve, reject) => {
      // Simulate Google OAuth
      setTimeout(() => {
        resolve({
          id: 'google_user_id',
          email: 'user@gmail.com',
          name: 'Google User',
          picture: 'https://via.placeholder.com/150'
        })
      }, 1000)
    })
  }

  static async loginWithFacebook(): Promise<any> {
    // In a real implementation, you would integrate with Facebook Login
    // This is a placeholder for the Facebook Login flow
    return new Promise((resolve, reject) => {
      // Simulate Facebook Login
      setTimeout(() => {
        resolve({
          id: 'facebook_user_id',
          email: 'user@facebook.com',
          name: 'Facebook User',
          picture: 'https://via.placeholder.com/150'
        })
      }, 1000)
    })
  }

  static async loginWithApple(): Promise<any> {
    // In a real implementation, you would integrate with Apple Sign In
    // This is a placeholder for the Apple Sign In flow
    return new Promise((resolve, reject) => {
      // Simulate Apple Sign In
      setTimeout(() => {
        resolve({
          id: 'apple_user_id',
          email: 'user@icloud.com',
          name: 'Apple User',
          picture: 'https://via.placeholder.com/150'
        })
      }, 1000)
    })
  }
}

// Social proof utilities
export class SocialProofService {
  static generateTestimonialData() {
    return [
      {
        id: 1,
        name: 'Adebayo Johnson',
        location: 'Lagos, Nigeria',
        rating: 5,
        comment: 'The quality of my OmoOniBag shoes is exceptional. I get compliments every time I wear them!',
        product: 'Luxury Heels',
        image: 'https://via.placeholder.com/150',
        verified: true
      },
      {
        id: 2,
        name: 'Chioma Okonkwo',
        location: 'Abuja, Nigeria',
        rating: 5,
        comment: 'Beautiful handbags that are both stylish and functional. Perfect for any occasion.',
        product: 'Designer Handbag',
        image: 'https://via.placeholder.com/150',
        verified: true
      },
      {
        id: 3,
        name: 'Fatima Ibrahim',
        location: 'Kano, Nigeria',
        rating: 5,
        comment: 'Fast delivery and excellent customer service. My order arrived in perfect condition.',
        product: 'Elegant Tote',
        image: 'https://via.placeholder.com/150',
        verified: true
      }
    ]
  }

  static generateReviewStats() {
    return {
      totalReviews: 1247,
      averageRating: 4.8,
      ratingDistribution: {
        5: 892,
        4: 234,
        3: 89,
        2: 23,
        1: 9
      },
      recentReviews: 156
    }
  }

  static generateTrustSignals() {
    return [
      {
        icon: 'shield',
        title: 'Secure Payment',
        description: 'Your payment information is encrypted and secure'
      },
      {
        icon: 'truck',
        title: 'Fast Delivery',
        description: 'Free shipping on orders over ₦50,000'
      },
      {
        icon: 'refresh',
        title: 'Easy Returns',
        description: '14-day return policy for all items'
      },
      {
        icon: 'star',
        title: 'Quality Guarantee',
        description: 'Premium materials and craftsmanship'
      }
    ]
  }
}





