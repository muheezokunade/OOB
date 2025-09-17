// Standalone script to set homepage content
// Run this after setting up your database connection

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function setHomepageContent() {
  try {
    console.log('Setting homepage content...')
    
    // Check if homepage content exists
    const existing = await prisma.homepageContent.findFirst()
    
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

    let result
    if (existing) {
      result = await prisma.homepageContent.update({
        where: { id: existing.id },
        data: { ...content, updatedAt: new Date() }
      })
      console.log('✅ Updated existing homepage content')
    } else {
      result = await prisma.homepageContent.create({ data: content })
      console.log('✅ Created new homepage content')
    }

    console.log('Homepage content set successfully:')
    console.log('- Hero Title:', result.heroTitle)
    console.log('- Hero Subtitle:', result.heroSubtitle)
    console.log('- Hero Button Text:', result.heroButtonText)
    console.log('- Is Active:', result.isActive)
    
  } catch (error) {
    console.error('❌ Error setting homepage content:', error.message)
    
    if (error.code === 'P1001') {
      console.log('\n💡 Database connection failed. Please ensure:')
      console.log('1. Your database is running')
      console.log('2. Your .env file has the correct DATABASE_URL')
      console.log('3. You have run: npx prisma generate')
      console.log('4. You have run: npx prisma db push')
    }
  } finally {
    await prisma.$disconnect()
  }
}

setHomepageContent()

