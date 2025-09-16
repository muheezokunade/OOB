// Script to update homepage content via API
const fetch = require('node-fetch')

async function updateHomepageViaAPI() {
  try {
    console.log('Updating homepage content via API...')
    
    const content = {
      heroTitle: 'Every Girl Deserves Her Perfect Moment',
      heroSubtitle: 'Bags and shoes that tell your story. From Lagos boardrooms to Abuja galas, we create pieces that elevate your everyday into something extraordinary.',
      heroButtonText: 'Explore Collection',
      heroButtonLink: '/shop',
      heroImage: '/images/hero/main-hero.svg',
      featuredTitle: 'Featured Products',
      featuredSubtitle: 'Discover our handpicked selection of premium items',
      featuredProducts: [],
      isActive: true
    }

    // Try to update via API (this will require admin authentication)
    const response = await fetch('http://localhost:3000/api/admin/homepage', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Note: This will fail without proper admin token, but let's try
      },
      body: JSON.stringify(content)
    })

    if (response.ok) {
      const result = await response.json()
      console.log('✅ Homepage content updated via API!')
      console.log('Result:', result)
    } else {
      console.log('❌ API call failed:', response.status, response.statusText)
      console.log('This is expected without admin authentication')
      console.log('Please use the admin panel at /admin/homepage to update the content')
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('Please make sure the development server is running on localhost:3000')
  }
}

// Wait a bit for the server to start, then try the API call
setTimeout(updateHomepageViaAPI, 3000)
