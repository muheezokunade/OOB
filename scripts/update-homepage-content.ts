import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateHomepageContent() {
  try {
    // Update or create homepage content with the specified text
    const homepageContent = await prisma.homepageContent.upsert({
      where: { id: 'default-homepage' },
      update: {
        heroTitle: 'Every Girl Deserves Her Perfect Moment',
        heroSubtitle: 'Bags and shoes that tell your story. From Lagos boardrooms to Abuja galas, we create pieces that elevate your everyday into something extraordinary.',
        heroButtonText: 'Explore Collection',
        heroButtonLink: '/shop',
        heroImage: '/images/hero/main-hero.svg',
        featuredTitle: 'Featured Products',
        featuredSubtitle: 'Discover our curated selection of premium bags and shoes',
        featuredProducts: [],
        isActive: true,
        updatedAt: new Date()
      },
      create: {
        id: 'default-homepage',
        heroTitle: 'Every Girl Deserves Her Perfect Moment',
        heroSubtitle: 'Bags and shoes that tell your story. From Lagos boardrooms to Abuja galas, we create pieces that elevate your everyday into something extraordinary.',
        heroButtonText: 'Explore Collection',
        heroButtonLink: '/shop',
        heroImage: '/images/hero/main-hero.svg',
        featuredTitle: 'Featured Products',
        featuredSubtitle: 'Discover our curated selection of premium bags and shoes',
        featuredProducts: [],
        isActive: true
      }
    })

    console.log('✅ Homepage content updated successfully!')
    console.log('Updated content:')
    console.log('- Hero Title:', homepageContent.heroTitle)
    console.log('- Hero Subtitle:', homepageContent.heroSubtitle)
    console.log('- Hero Button Text:', homepageContent.heroButtonText)
    
  } catch (error) {
    console.error('❌ Error updating homepage content:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateHomepageContent()

