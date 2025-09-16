// Script to set homepage content via API
// Using built-in fetch (Node.js 18+)

async function setHomepageViaAPI() {
  try {
    console.log('Setting homepage content via API...')
    
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

    const response = await fetch('http://localhost:3000/api/setup/homepage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content)
    })

    const result = await response.json()

    if (response.ok && result.success) {
      console.log('✅ Homepage content set successfully via API!')
      console.log('Content details:')
      console.log('- Hero Title:', result.data.heroTitle)
      console.log('- Hero Subtitle:', result.data.heroSubtitle)
      console.log('- Hero Button Text:', result.data.heroButtonText)
      console.log('- Is Active:', result.data.isActive)
    } else {
      console.log('❌ Failed to set homepage content:', result.error || result.message)
      if (result.details) {
        console.log('Details:', result.details)
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('Please make sure:')
    console.log('1. The development server is running on localhost:3000')
    console.log('2. The database is properly configured')
  }
}

// Wait a bit for the server to start, then try the API call
setTimeout(setHomepageViaAPI, 5000)
