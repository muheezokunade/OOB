// Analytics integration for Google Analytics 4 and Facebook Pixel

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
    dataLayer: any[]
  }
}

export class AnalyticsService {
  private static instance: AnalyticsService
  private isInitialized = false

  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService()
    }
    return AnalyticsService.instance
  }

  public initialize() {
    if (this.isInitialized) return

    // Initialize Google Analytics 4
    this.initializeGA4()
    
    // Initialize Facebook Pixel
    this.initializeFacebookPixel()

    this.isInitialized = true
  }

  private initializeGA4() {
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    
    if (!GA_MEASUREMENT_ID) return

    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function() {
      window.dataLayer.push(arguments)
    }
    
    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href
    })
  }

  private initializeFacebookPixel() {
    const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
    
    if (!FACEBOOK_PIXEL_ID) return

    // Load Facebook Pixel script
    const script = document.createElement('script')
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${FACEBOOK_PIXEL_ID}');
      fbq('track', 'PageView');
    `
    document.head.appendChild(script)

    // Initialize fbq
    ;(window as any).fbq = (window as any).fbq || function() {
      ;((window as any).fbq.q = (window as any).fbq.q || []).push(arguments)
    }
  }

  // Page tracking
  public trackPageView(url: string, title: string) {
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_title: title,
        page_location: url
      })
    }

    if (window.fbq) {
      window.fbq('track', 'PageView')
    }
  }

  // E-commerce tracking
  public trackPurchase(orderData: {
    transaction_id: string
    value: number
    currency: string
    items: Array<{
      item_id: string
      item_name: string
      category: string
      quantity: number
      price: number
    }>
  }) {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: orderData.transaction_id,
        value: orderData.value,
        currency: orderData.currency,
        items: orderData.items
      })
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        value: orderData.value,
        currency: orderData.currency,
        content_ids: orderData.items.map(item => item.item_id),
        content_type: 'product'
      })
    }
  }

  public trackAddToCart(productData: {
    item_id: string
    item_name: string
    category: string
    quantity: number
    price: number
  }) {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'NGN',
        value: productData.price * productData.quantity,
        items: [productData]
      })
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'AddToCart', {
        value: productData.price * productData.quantity,
        currency: 'NGN',
        content_ids: [productData.item_id],
        content_type: 'product'
      })
    }
  }

  public trackRemoveFromCart(productData: {
    item_id: string
    item_name: string
    category: string
    quantity: number
    price: number
  }) {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'remove_from_cart', {
        currency: 'NGN',
        value: productData.price * productData.quantity,
        items: [productData]
      })
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'RemoveFromCart', {
        value: productData.price * productData.quantity,
        currency: 'NGN',
        content_ids: [productData.item_id],
        content_type: 'product'
      })
    }
  }

  public trackViewItem(productData: {
    item_id: string
    item_name: string
    category: string
    price: number
  }) {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'NGN',
        value: productData.price,
        items: [productData]
      })
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        value: productData.price,
        currency: 'NGN',
        content_ids: [productData.item_id],
        content_type: 'product'
      })
    }
  }

  public trackBeginCheckout(value: number, items: any[]) {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'NGN',
        value: value,
        items: items
      })
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        value: value,
        currency: 'NGN',
        content_type: 'product'
      })
    }
  }

  public trackSearch(searchTerm: string) {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'search', {
        search_term: searchTerm
      })
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'Search', {
        search_string: searchTerm
      })
    }
  }

  public trackSignUp(method: string = 'email') {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'sign_up', {
        method: method
      })
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        content_name: 'User Registration'
      })
    }
  }

  public trackLogin(method: string = 'email') {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'login', {
        method: method
      })
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        content_name: 'User Login'
      })
    }
  }

  public trackNewsletterSignup() {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'newsletter_signup')
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Newsletter Signup'
      })
    }
  }

  public trackContactForm() {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'contact_form_submit')
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Contact Form'
      })
    }
  }

  public trackWhatsAppClick() {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'whatsapp_click')
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'Contact', {
        content_name: 'WhatsApp Contact'
      })
    }
  }

  public trackWishlistAdd(productId: string) {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'add_to_wishlist', {
        item_id: productId
      })
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'AddToWishlist', {
        content_ids: [productId],
        content_type: 'product'
      })
    }
  }

  public trackCustomEvent(eventName: string, parameters: Record<string, any> = {}) {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, parameters)
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('trackCustom', eventName, parameters)
    }
  }
}

// Export singleton instance
export const analytics = AnalyticsService.getInstance()

// React hook for analytics
export function useAnalytics() {
  return {
    trackPageView: (url: string, title: string) => analytics.trackPageView(url, title),
    trackPurchase: (orderData: any) => analytics.trackPurchase(orderData),
    trackAddToCart: (productData: any) => analytics.trackAddToCart(productData),
    trackRemoveFromCart: (productData: any) => analytics.trackRemoveFromCart(productData),
    trackViewItem: (productData: any) => analytics.trackViewItem(productData),
    trackBeginCheckout: (value: number, items: any[]) => analytics.trackBeginCheckout(value, items),
    trackSearch: (searchTerm: string) => analytics.trackSearch(searchTerm),
    trackSignUp: (method?: string) => analytics.trackSignUp(method),
    trackLogin: (method?: string) => analytics.trackLogin(method),
    trackNewsletterSignup: () => analytics.trackNewsletterSignup(),
    trackContactForm: () => analytics.trackContactForm(),
    trackWhatsAppClick: () => analytics.trackWhatsAppClick(),
    trackWishlistAdd: (productId: string) => analytics.trackWishlistAdd(productId),
    trackCustomEvent: (eventName: string, parameters?: Record<string, any>) => 
      analytics.trackCustomEvent(eventName, parameters)
  }
}


