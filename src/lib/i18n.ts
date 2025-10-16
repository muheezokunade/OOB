// Internationalization (i18n) support

export interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  rtl: boolean
}

export interface Translation {
  [key: string]: string | Translation
}

export const supportedLanguages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    rtl: false
  },
  {
    code: 'yo',
    name: 'Yoruba',
    nativeName: 'Yorùbá',
    flag: '🇳🇬',
    rtl: false
  },
  {
    code: 'ig',
    name: 'Igbo',
    nativeName: 'Igbo',
    flag: '🇳🇬',
    rtl: false
  },
  {
    code: 'ha',
    name: 'Hausa',
    nativeName: 'Hausa',
    flag: '🇳🇬',
    rtl: false
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    rtl: false
  }
]

export const translations: Record<string, Translation> = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      shop: 'Shop',
      collections: 'Collections',
      about: 'About',
      contact: 'Contact',
      blog: 'Blog',
      account: 'Account',
      cart: 'Cart',
      wishlist: 'Wishlist',
      search: 'Search'
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      remove: 'Remove',
      continue: 'Continue',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      open: 'Open',
      view: 'View',
      select: 'Select',
      filter: 'Filter',
      sort: 'Sort',
      search: 'Search',
      clear: 'Clear',
      apply: 'Apply',
      reset: 'Reset',
      submit: 'Submit',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      ok: 'OK'
    },
    // Product
    product: {
      name: 'Product Name',
      price: 'Price',
      originalPrice: 'Original Price',
      description: 'Description',
      specifications: 'Specifications',
      materials: 'Materials',
      careInstructions: 'Care Instructions',
      size: 'Size',
      color: 'Color',
      quantity: 'Quantity',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      addToCart: 'Add to Cart',
      addToWishlist: 'Add to Wishlist',
      removeFromWishlist: 'Remove from Wishlist',
      buyNow: 'Buy Now',
      reviews: 'Reviews',
      rating: 'Rating',
      relatedProducts: 'Related Products',
      recentlyViewed: 'Recently Viewed',
      recommendations: 'You Might Also Like'
    },
    // Cart
    cart: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      item: 'Item',
      items: 'Items',
      quantity: 'Quantity',
      price: 'Price',
      total: 'Total',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      tax: 'Tax',
      discount: 'Discount',
      coupon: 'Coupon Code',
      applyCoupon: 'Apply Coupon',
      checkout: 'Checkout',
      continueShopping: 'Continue Shopping',
      removeItem: 'Remove Item',
      updateQuantity: 'Update Quantity'
    },
    // Checkout
    checkout: {
      title: 'Checkout',
      shippingAddress: 'Shipping Address',
      billingAddress: 'Billing Address',
      paymentMethod: 'Payment Method',
      orderReview: 'Order Review',
      placeOrder: 'Place Order',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      city: 'City',
      state: 'State',
      country: 'Country',
      postalCode: 'Postal Code',
      additionalInfo: 'Additional Information',
      sameAsShipping: 'Same as shipping address',
      orderNotes: 'Order Notes',
      termsAndConditions: 'Terms and Conditions',
      privacyPolicy: 'Privacy Policy',
      agreeToTerms: 'I agree to the terms and conditions'
    },
    // User Account
    account: {
      title: 'My Account',
      profile: 'Profile',
      orders: 'Orders',
      addresses: 'Addresses',
      preferences: 'Preferences',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      forgotPassword: 'Forgot Password',
      resetPassword: 'Reset Password',
      changePassword: 'Change Password',
      personalInfo: 'Personal Information',
      orderHistory: 'Order History',
      orderDetails: 'Order Details',
      trackingNumber: 'Tracking Number',
      orderStatus: 'Order Status',
      orderDate: 'Order Date',
      orderTotal: 'Order Total'
    },
    // Messages
    messages: {
      welcome: 'Welcome to OmoOniBag',
      thankYou: 'Thank you for your order!',
      orderConfirmed: 'Your order has been confirmed',
      orderShipped: 'Your order has been shipped',
      orderDelivered: 'Your order has been delivered',
      itemAddedToCart: 'Item added to cart',
      itemRemovedFromCart: 'Item removed from cart',
      itemAddedToWishlist: 'Item added to wishlist',
      itemRemovedFromWishlist: 'Item removed from wishlist',
      loginSuccess: 'Login successful',
      logoutSuccess: 'Logout successful',
      registrationSuccess: 'Registration successful',
      profileUpdated: 'Profile updated successfully',
      passwordChanged: 'Password changed successfully',
      emailSent: 'Email sent successfully',
      newsletterSubscribed: 'Newsletter subscription successful',
      contactFormSubmitted: 'Contact form submitted successfully'
    },
    // Errors
    errors: {
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number',
      passwordTooShort: 'Password must be at least 8 characters',
      passwordsDoNotMatch: 'Passwords do not match',
      loginFailed: 'Login failed. Please check your credentials',
      registrationFailed: 'Registration failed. Please try again',
      orderFailed: 'Order failed. Please try again',
      paymentFailed: 'Payment failed. Please try again',
      networkError: 'Network error. Please check your connection',
      serverError: 'Server error. Please try again later',
      notFound: 'Page not found',
      unauthorized: 'Unauthorized access',
      forbidden: 'Access forbidden'
    }
  },
  yo: {
    // Navigation
    nav: {
      home: 'Ilé',
      shop: 'Tità',
      collections: 'Àkójọpọ̀',
      about: 'Nípa',
      contact: 'Ìbániṣọ̀rọ̀',
      blog: 'Àkọsílẹ̀',
      account: 'Àkàọ̀jọ',
      cart: 'Kàtì',
      wishlist: 'Ifẹ́',
      search: 'Wá'
    },
    // Common
    common: {
      loading: 'N gbé...',
      error: 'Àṣìṣe',
      success: 'Àṣeyọrí',
      cancel: 'Fagilee',
      save: 'Fi pamọ́',
      delete: 'Paarẹ',
      edit: 'Ṣatunkọ',
      add: 'Fi kun',
      remove: 'Yọ kuro',
      continue: 'Tẹsiwaju',
      back: 'Pada',
      next: 'Tókàn',
      previous: 'Tẹlẹ',
      close: 'Pa',
      open: 'Ṣii',
      view: 'Wo',
      select: 'Yan',
      filter: 'Yan',
      sort: 'To',
      search: 'Wá',
      clear: 'Paarẹ',
      apply: 'Lo',
      reset: 'Tun',
      submit: 'Fi ranṣẹ',
      confirm: 'Jẹrisi',
      yes: 'Bẹẹni',
      no: 'Rara',
      ok: 'Dara'
    },
    // Product
    product: {
      name: 'Orúkọ Ẹja',
      price: 'Owo',
      originalPrice: 'Owo Ibẹrẹ',
      description: 'Àpèjúwe',
      specifications: 'Àmì-ẹrọ',
      materials: 'Ohun elo',
      careInstructions: 'Awọn ilana Itọju',
      size: 'Iwọn',
      color: 'Awọ',
      quantity: 'Iye',
      inStock: 'Ninu Iṣura',
      outOfStock: 'Kò sí Ninu Iṣura',
      addToCart: 'Fi kun Kàtì',
      addToWishlist: 'Fi kun Ifẹ́',
      removeFromWishlist: 'Yọ kuro Ninu Ifẹ́',
      buyNow: 'Ra Bayi',
      reviews: 'Àgbéyẹwo',
      rating: 'Idiwọn',
      relatedProducts: 'Awọn Ẹja Tọkantọkan',
      recentlyViewed: 'Ti Wo Laipe',
      recommendations: 'O Le Fẹran Paapaa'
    }
  },
  ig: {
    // Navigation
    nav: {
      home: 'Ụlọ',
      shop: 'Ịzụ',
      collections: 'Nchịkọta',
      about: 'Banyere',
      contact: 'Mkpọtụrụ',
      blog: 'Blọgụ',
      account: 'Akaụntụ',
      cart: 'Ụgbọ ala',
      wishlist: 'Chọrọ',
      search: 'Chọọ'
    },
    // Common
    common: {
      loading: 'Na-ebu...',
      error: 'Njehie',
      success: 'Ihe ịga nke ọma',
      cancel: 'Kagbuo',
      save: 'Chekwaa',
      delete: 'Hichapụ',
      edit: 'Dezie',
      add: 'Tinye',
      remove: 'Wepụ',
      continue: 'Gaa nihu',
      back: 'Lagha',
      next: 'Nke ọzọ',
      previous: 'Nke gara aga',
      close: 'Mechie',
      open: 'Meghee',
      view: 'Lelee',
      select: 'Họrọ',
      filter: 'Ihe nzacha',
      sort: 'Hazie',
      search: 'Chọọ',
      clear: 'Kpochapụ',
      apply: 'Tinye noru',
      reset: 'Togharịa',
      submit: 'Nyefee',
      confirm: 'Kwenye',
      yes: 'Ee',
      no: 'Mba',
      ok: 'Ọ dị mma'
    }
  },
  ha: {
    // Navigation
    nav: {
      home: 'Gida',
      shop: 'Sayarwa',
      collections: 'Tarin',
      about: 'Game da',
      contact: 'Lambobi',
      blog: 'Shafin',
      account: 'Asusu',
      cart: 'Katin',
      wishlist: 'So',
      search: 'Nemo'
    },
    // Common
    common: {
      loading: 'Ana ɗauka...',
      error: 'Kuskure',
      success: 'Nasara',
      cancel: 'Soke',
      save: 'Ajiye',
      delete: 'Share',
      edit: 'Gyara',
      add: 'Ƙara',
      remove: 'Cire',
      continue: 'Ci gaba',
      back: 'Komawa',
      next: 'Na gaba',
      previous: 'Na baya',
      close: 'Rufe',
      open: 'Bude',
      view: 'Duba',
      select: 'Zaɓi',
      filter: 'Tace',
      sort: 'Tsara',
      search: 'Nemo',
      clear: 'Share',
      apply: 'Aiwatar',
      reset: 'Sake saita',
      submit: 'Aika',
      confirm: 'Tabbata',
      yes: 'Ee',
      no: 'A\'a',
      ok: 'Lafiya'
    }
  },
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      shop: 'Boutique',
      collections: 'Collections',
      about: 'À propos',
      contact: 'Contact',
      blog: 'Blog',
      account: 'Compte',
      cart: 'Panier',
      wishlist: 'Liste de souhaits',
      search: 'Rechercher'
    },
    // Common
    common: {
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      cancel: 'Annuler',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      remove: 'Retirer',
      continue: 'Continuer',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      close: 'Fermer',
      open: 'Ouvrir',
      view: 'Voir',
      select: 'Sélectionner',
      filter: 'Filtrer',
      sort: 'Trier',
      search: 'Rechercher',
      clear: 'Effacer',
      apply: 'Appliquer',
      reset: 'Réinitialiser',
      submit: 'Soumettre',
      confirm: 'Confirmer',
      yes: 'Oui',
      no: 'Non',
      ok: 'OK'
    }
  }
}

export class I18nService {
  private static instance: I18nService
  private currentLanguage: string = 'en'
  private fallbackLanguage: string = 'en'

  private constructor() {
    // Initialize with browser language or default
    this.initializeLanguage()
  }

  public static getInstance(): I18nService {
    if (!I18nService.instance) {
      I18nService.instance = new I18nService()
    }
    return I18nService.instance
  }

  private initializeLanguage(): void {
    // Check localStorage first
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage && this.isLanguageSupported(savedLanguage)) {
      this.currentLanguage = savedLanguage
      return
    }

    // Check browser language
    const browserLanguage = navigator.language.split('-')[0]
    if (this.isLanguageSupported(browserLanguage)) {
      this.currentLanguage = browserLanguage
      return
    }

    // Default to English
    this.currentLanguage = this.fallbackLanguage
  }

  private isLanguageSupported(code: string): boolean {
    return supportedLanguages.some(lang => lang.code === code)
  }

  public getCurrentLanguage(): string {
    return this.currentLanguage
  }

  public setLanguage(code: string): void {
    if (this.isLanguageSupported(code)) {
      this.currentLanguage = code
      localStorage.setItem('language', code)
      
      // Update document language and direction
      document.documentElement.lang = code
      const language = supportedLanguages.find(lang => lang.code === code)
      if (language) {
        document.documentElement.dir = language.rtl ? 'rtl' : 'ltr'
      }
    }
  }

  public getSupportedLanguages(): Language[] {
    return supportedLanguages
  }

  public t(key: string, params?: Record<string, string | number>): string {
    const translation = this.getTranslation(key)
    
    if (params) {
      return this.interpolate(translation, params)
    }
    
    return translation
  }

  private getTranslation(key: string): string {
    const keys = key.split('.')
    let translation: any = translations[this.currentLanguage]
    
    // Try current language first
    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k]
      } else {
        translation = null
        break
      }
    }
    
    // Fallback to English if not found
    if (!translation && this.currentLanguage !== this.fallbackLanguage) {
      translation = translations[this.fallbackLanguage]
      for (const k of keys) {
        if (translation && typeof translation === 'object' && k in translation) {
          translation = translation[k]
        } else {
          translation = key // Return key if not found anywhere
          break
        }
      }
    }
    
    return typeof translation === 'string' ? translation : key
  }

  private interpolate(text: string, params: Record<string, string | number>): string {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key]?.toString() || match
    })
  }

  public formatCurrency(amount: number, currency: string = 'NGN'): string {
    const locale = this.getLocale()
    
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
      }).format(amount)
    } catch (error) {
      return `${currency} ${amount.toLocaleString()}`
    }
  }

  public formatDate(date: Date | string): string {
    const locale = this.getLocale()
    const dateObj = typeof date === 'string' ? new Date(date) : date
    
    try {
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(dateObj)
    } catch (error) {
      return dateObj.toLocaleDateString()
    }
  }

  public formatNumber(number: number): string {
    const locale = this.getLocale()
    
    try {
      return new Intl.NumberFormat(locale).format(number)
    } catch (error) {
      return number.toString()
    }
  }

  private getLocale(): string {
    const language = supportedLanguages.find(lang => lang.code === this.currentLanguage)
    return language ? `${this.currentLanguage}-NG` : 'en-NG'
  }
}

// Export singleton instance
export const i18n = I18nService.getInstance()

// React hook for i18n
export function useTranslation() {
  return {
    t: (key: string, params?: Record<string, string | number>) => i18n.t(key, params),
    language: i18n.getCurrentLanguage(),
    setLanguage: (code: string) => i18n.setLanguage(code),
    supportedLanguages: i18n.getSupportedLanguages(),
    formatCurrency: (amount: number, currency?: string) => i18n.formatCurrency(amount, currency),
    formatDate: (date: Date | string) => i18n.formatDate(date),
    formatNumber: (number: number) => i18n.formatNumber(number)
  }
}
