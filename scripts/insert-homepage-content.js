// Script to insert homepage content into the database
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function insertHomepageContent() {
  try {
    console.log('Inserting homepage content into database...')
    
    // First, delete any existing homepage content
    await prisma.homepageContent.deleteMany({})
    console.log('Cleared existing homepage content')
    
    // Insert new homepage content
    const homepageContent = await prisma.homepageContent.create({
      data: {
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
    })

    console.log('✅ Homepage content inserted successfully!')
    console.log('Content details:')
    console.log('- Hero Title:', homepageContent.heroTitle)
    console.log('- Hero Subtitle:', homepageContent.heroSubtitle)
    console.log('- Hero Button Text:', homepageContent.heroButtonText)
    console.log('- Hero Button Link:', homepageContent.heroButtonLink)
    console.log('- Is Active:', homepageContent.isActive)
    
  } catch (error) {
    console.error('❌ Error inserting homepage content:', error.message)
    if (error.code === 'P2002') {
      console.log('Note: This might be a unique constraint error. Trying to update instead...')
      try {
        const existing = await prisma.homepageContent.findFirst()
        if (existing) {
          const updated = await prisma.homepageContent.update({
            where: { id: existing.id },
            data: {
              heroTitle: 'Every Girl Deserves Her Perfect Moment',
              heroSubtitle: 'Bags and shoes that tell your story. From Lagos boardrooms to Abuja galas, we create pieces that elevate your everyday into something extraordinary.',
              heroButtonText: 'Explore Collection',
              heroButtonLink: '/shop',
              heroImage: '/images/hero/main-hero.svg',
              featuredTitle: 'Featured Products',
              featuredSubtitle: 'Discover our handpicked selection of premium items',
              featuredProducts: [],
              isActive: true,
              updatedAt: new Date()
            }
          })
          console.log('✅ Homepage content updated successfully!')
          console.log('Updated content:', updated.heroTitle)
        }
      } catch (updateError) {
        console.error('❌ Error updating homepage content:', updateError.message)
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}

insertHomepageContent()
