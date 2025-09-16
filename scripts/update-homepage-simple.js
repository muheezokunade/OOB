// Simple script to update homepage content
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function updateHomepage() {
  try {
    console.log('Updating homepage content...')
    
    // First, try to find existing content
    const existing = await prisma.homepageContent.findFirst()
    
    const data = {
      heroTitle: 'Every Girl Deserves Her Perfect Moment',
      heroSubtitle: 'Bags and shoes that tell your story. From Lagos boardrooms to Abuja galas, we create pieces that elevate your everyday into something extraordinary.',
      heroButtonText: 'Explore Collection',
      heroButtonLink: '/shop',
      heroImage: '/images/hero/main-hero.svg',
      featuredTitle: 'Featured Products',
      featuredSubtitle: 'Discover our curated selection of premium bags and shoes',
      featuredProducts: [],
      isActive: true,
    }

    let result
    if (existing) {
      result = await prisma.homepageContent.update({
        where: { id: existing.id },
        data: { ...data, updatedAt: new Date() }
      })
      console.log('✅ Updated existing homepage content')
    } else {
      result = await prisma.homepageContent.create({ data })
      console.log('✅ Created new homepage content')
    }

    console.log('Updated content:')
    console.log('- Hero Title:', result.heroTitle)
    console.log('- Hero Subtitle:', result.heroSubtitle)
    console.log('- Hero Button Text:', result.heroButtonText)
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

updateHomepage()
