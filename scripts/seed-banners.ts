import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedBanners() {
  try {
    // Clear existing banners
    await prisma.banner.deleteMany({})

    // Create sample banners
    const banners = [
      {
        title: "New Collection Launch",
        subtitle: "Discover our latest luxury bags and shoes designed for the modern Nigerian woman",
        image: "/images/hero/main-hero.svg",
        link: "/shop/new",
        linkText: "Shop New Collection",
        type: "hero",
        category: "new-arrivals",
        priority: 10,
        isActive: true
      },
      {
        title: "Premium Quality Guaranteed",
        subtitle: "Handcrafted with love and attention to detail. Every piece tells a story.",
        image: "/images/features/bags-feature.svg",
        link: "/about",
        linkText: "Learn More",
        type: "hero",
        category: "quality",
        priority: 8,
        isActive: true
      },
      {
        title: "Trending Now",
        subtitle: "The pieces everyone is talking about. Don't miss out on these favorites.",
        image: "/images/features/shoes-feature.svg",
        link: "/shop/bestsellers",
        linkText: "Shop Trending",
        type: "hero",
        category: "bestsellers",
        priority: 6,
        isActive: true
      },
      {
        title: "Special Promotion",
        subtitle: "Limited time offer on selected items. Free shipping on orders over ₦50,000",
        image: "/images/products/luxury-tote-black-1.svg",
        link: "/shop/sale",
        linkText: "Shop Sale",
        type: "promotion",
        category: "sale",
        priority: 9,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      }
    ]

    for (const banner of banners) {
      await prisma.banner.create({
        data: banner
      })
    }

    console.log('✅ Sample banners created successfully!')
  } catch (error) {
    console.error('❌ Error seeding banners:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedBanners()


