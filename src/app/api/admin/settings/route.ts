import { NextRequest, NextResponse } from 'next/server'
import { AuthService, requireAuth, ADMIN_PERMISSIONS } from '@/lib/auth'

// GET /api/admin/settings - Get application settings
export async function GET(request: NextRequest) {
  try {
    // Check authentication and permissions
    const admin = await requireAuth([ADMIN_PERMISSIONS.SETTINGS_VIEW])(request)
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // In a real application, you would store settings in the database
    // For now, we'll return default settings
    const settings = {
      general: {
        siteName: 'OmoOniBag',
        siteDescription: 'Luxury Fashion for the Modern Woman',
        siteUrl: 'https://omoonibag.com',
        adminEmail: 'admin@omoonibag.com',
        supportEmail: 'support@omoonibag.com',
        phone: '+234 123 456 7890',
        address: 'Lagos, Nigeria',
        timezone: 'Africa/Lagos',
        currency: 'NGN',
        language: 'en'
      },
      store: {
        storeName: 'OmoOniBag Store',
        storeDescription: 'Premium bags and shoes for the sophisticated woman',
        storeStatus: 'active', // active, maintenance, closed
        allowGuestCheckout: true,
        requireEmailVerification: false,
        autoApproveReviews: false,
        lowStockThreshold: 5,
        outOfStockThreshold: 0
      },
      shipping: {
        freeShippingThreshold: 50000,
        defaultShippingCost: 2000,
        shippingMethods: [
          { name: 'Standard Shipping', cost: 2000, days: '3-5' },
          { name: 'Express Shipping', cost: 5000, days: '1-2' },
          { name: 'Same Day Delivery', cost: 10000, days: 'Same day' }
        ],
        allowedCountries: ['Nigeria'],
        restrictedCountries: []
      },
      payment: {
        acceptedMethods: ['card', 'bank_transfer', 'paypal'],
        currency: 'NGN',
        taxRate: 7.5,
        enableTax: true,
        enableDiscounts: true,
        autoCapture: true
      },
      email: {
        fromName: 'OmoOniBag',
        fromEmail: 'noreply@omoonibag.com',
        replyTo: 'support@omoonibag.com',
        enableNotifications: true,
        enableOrderEmails: true,
        enableMarketingEmails: true
      },
      seo: {
        metaTitle: 'OmoOniBag - Luxury Fashion for the Modern Woman',
        metaDescription: 'Discover our collection of premium bags and shoes designed for the sophisticated woman. Quality craftsmanship meets contemporary style.',
        metaKeywords: 'luxury bags, designer shoes, women fashion, premium accessories',
        enableSitemap: true,
        enableRobots: true,
        googleAnalyticsId: '',
        facebookPixelId: ''
      },
      social: {
        facebook: 'https://facebook.com/omoonibag',
        instagram: 'https://instagram.com/omoonibag',
        twitter: 'https://twitter.com/omoonibag',
        youtube: 'https://youtube.com/omoonibag',
        linkedin: 'https://linkedin.com/company/omoonibag'
      },
      maintenance: {
        enableMaintenanceMode: false,
        maintenanceMessage: 'We are currently performing maintenance. Please check back soon.',
        allowedIPs: ['127.0.0.1', '::1']
      }
    }

    return NextResponse.json({
      success: true,
      data: settings
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/settings - Update application settings
export async function PUT(request: NextRequest) {
  try {
    // Check authentication and permissions
    const admin = await requireAuth([ADMIN_PERMISSIONS.SETTINGS_UPDATE])(request)
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { category, settings } = body

    if (!category || !settings) {
      return NextResponse.json(
        { success: false, error: 'Category and settings are required' },
        { status: 400 }
      )
    }

    // In a real application, you would update settings in the database
    // For now, we'll just return success
    console.log(`Updating ${category} settings:`, settings)

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully'
    })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}





