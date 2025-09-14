import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin users
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  // Check if admins already exist
  const existingAdmins = await prisma.admin.findMany()
  
  if (existingAdmins.length === 0) {
    const admins = await Promise.all([
      prisma.admin.create({
        data: {
          email: 'admin@omoonibag.com',
          password: hashedPassword,
          firstName: 'Super',
          lastName: 'Admin',
          role: 'super_admin',
          permissions: [
            'products:view', 'products:create', 'products:update', 'products:delete',
            'orders:view', 'orders:update', 'orders:delete',
            'customers:view', 'customers:update', 'customers:delete',
            'content:view', 'content:create', 'content:update', 'content:delete',
            'analytics:view', 'reports:view',
            'settings:view', 'settings:update',
            'admins:view', 'admins:create', 'admins:update', 'admins:delete'
          ],
          isActive: true
        }
      }),
      prisma.admin.create({
        data: {
          email: 'manager@omoonibag.com',
          password: hashedPassword,
          firstName: 'Content',
          lastName: 'Manager',
          role: 'manager',
          permissions: [
            'products:view', 'products:create', 'products:update',
            'orders:view', 'orders:update',
            'customers:view',
            'content:view', 'content:create', 'content:update',
            'analytics:view'
          ],
          isActive: true
        }
      })
    ])
    console.log(`✅ Created ${admins.length} admin users`)
  } else {
    console.log(`✅ Admin users already exist (${existingAdmins.length} found)`)
  }

  // Create sample products (only if they don't exist)
  const existingProducts = await prisma.product.findMany()
  let products = existingProducts
  
  if (existingProducts.length === 0) {
    products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Luxury Tote Bag',
        description: 'Elegant and spacious tote bag perfect for everyday use',
        longDescription: 'This luxurious tote bag combines style and functionality. Made from premium leather with gold hardware accents, it features multiple compartments for organization and a comfortable shoulder strap.',
        price: 75000,
        originalPrice: 85000,
        category: 'Bags',
        subcategory: 'Totes',
        image: '/images/products/luxury-tote.jpg',
        images: ['/images/products/luxury-tote-1.jpg', '/images/products/luxury-tote-2.jpg'],
        stock: 15,
        sku: 'LTB-001',
        weight: 0.8,
        dimensions: { length: 35, width: 15, height: 25 },
        materials: ['Premium Leather', 'Gold Hardware'],
        specifications: {
          'Material': 'Premium Leather',
          'Dimensions': '35cm x 15cm x 25cm',
          'Weight': '0.8kg',
          'Color': 'Black',
          'Hardware': 'Gold'
        },
        careInstructions: [
          'Store in dust bag when not in use',
          'Clean with soft, dry cloth',
          'Avoid exposure to direct sunlight',
          'Do not machine wash'
        ],
        tags: ['luxury', 'tote', 'leather', 'everyday', 'premium'],
        rating: 4.8,
        reviewCount: 24,
        isActive: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Designer Heels',
        description: 'Sophisticated high heels for special occasions',
        longDescription: 'These stunning designer heels feature a classic silhouette with modern details. The comfortable heel height and premium materials ensure both style and comfort for extended wear.',
        price: 50000,
        originalPrice: 60000,
        category: 'Shoes',
        subcategory: 'Heels',
        image: '/images/products/designer-heels.jpg',
        images: ['/images/products/designer-heels-1.jpg', '/images/products/designer-heels-2.jpg'],
        stock: 8,
        sku: 'DH-002',
        weight: 0.6,
        dimensions: { length: 28, width: 10, height: 12 },
        materials: ['Premium Leather', 'Rubber Sole'],
        specifications: {
          'Material': 'Premium Leather',
          'Heel Height': '10cm',
          'Size Range': '36-42',
          'Color': 'Black',
          'Sole': 'Rubber'
        },
        careInstructions: [
          'Store with shoe trees',
          'Clean with leather cleaner',
          'Protect from water',
          'Rotate with other shoes'
        ],
        tags: ['heels', 'designer', 'leather', 'formal', 'elegant'],
        rating: 4.9,
        reviewCount: 18,
        isActive: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Elegant Clutch',
        description: 'Perfect evening clutch for special events',
        longDescription: 'This elegant clutch is the perfect accessory for evening events. Its compact design and luxurious materials make it both practical and stylish.',
        price: 35000,
        originalPrice: 40000,
        category: 'Bags',
        subcategory: 'Clutches',
        image: '/images/products/elegant-clutch.jpg',
        images: ['/images/products/elegant-clutch-1.jpg', '/images/products/elegant-clutch-2.jpg'],
        stock: 12,
        sku: 'EC-003',
        weight: 0.3,
        dimensions: { length: 20, width: 5, height: 15 },
        materials: ['Satin', 'Gold Hardware'],
        specifications: {
          'Material': 'Premium Satin',
          'Dimensions': '20cm x 5cm x 15cm',
          'Weight': '0.3kg',
          'Color': 'Gold',
          'Closure': 'Magnetic'
        },
        careInstructions: [
          'Handle with care',
          'Store in protective pouch',
          'Avoid sharp objects',
          'Professional cleaning recommended'
        ],
        tags: ['clutch', 'evening', 'elegant', 'satin', 'gold'],
        rating: 4.7,
        reviewCount: 15,
        isActive: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Comfortable Slippers',
        description: 'Luxurious house slippers for ultimate comfort',
        longDescription: 'These premium house slippers provide exceptional comfort and style. Made from soft materials with a non-slip sole, perfect for indoor relaxation.',
        price: 25000,
        originalPrice: 30000,
        category: 'Shoes',
        subcategory: 'Slippers',
        image: '/images/products/comfortable-slippers.jpg',
        images: ['/images/products/comfortable-slippers-1.jpg', '/images/products/comfortable-slippers-2.jpg'],
        stock: 20,
        sku: 'CS-004',
        weight: 0.4,
        dimensions: { length: 26, width: 10, height: 8 },
        materials: ['Soft Fabric', 'Memory Foam', 'Rubber Sole'],
        specifications: {
          'Material': 'Soft Fabric Upper',
          'Insole': 'Memory Foam',
          'Sole': 'Non-slip Rubber',
          'Size Range': '36-42',
          'Color': 'Beige'
        },
        careInstructions: [
          'Machine washable',
          'Air dry only',
          'Do not bleach',
          'Remove insoles before washing'
        ],
        tags: ['slippers', 'comfort', 'house', 'soft', 'relaxation'],
        rating: 4.6,
        reviewCount: 22,
        isActive: true
      }
    })
    ])

    console.log(`✅ Created ${products.length} products`)
  } else {
    console.log(`✅ Products already exist (${existingProducts.length} found)`)
  }

  // Create product variants (only if they don't exist)
  const existingVariants = await prisma.productVariant.findMany()
  
  if (existingVariants.length === 0) {
    const variants = await Promise.all([
    // Tote bag variants
    prisma.productVariant.create({
      data: {
        productId: products[0].id,
        size: 'One Size',
        color: 'Black',
        stock: 10,
        sku: 'LTB-001-BLK'
      }
    }),
    prisma.productVariant.create({
      data: {
        productId: products[0].id,
        size: 'One Size',
        color: 'Brown',
        stock: 5,
        sku: 'LTB-001-BRN'
      }
    }),
    // Heels variants
    prisma.productVariant.create({
      data: {
        productId: products[1].id,
        size: '38',
        color: 'Black',
        stock: 3,
        sku: 'DH-002-BLK-38'
      }
    }),
    prisma.productVariant.create({
      data: {
        productId: products[1].id,
        size: '39',
        color: 'Black',
        stock: 2,
        sku: 'DH-002-BLK-39'
      }
    }),
    prisma.productVariant.create({
      data: {
        productId: products[1].id,
        size: '40',
        color: 'Black',
        stock: 3,
        sku: 'DH-002-BLK-40'
      }
    })
    ])

    console.log(`✅ Created ${variants.length} product variants`)
  } else {
    console.log(`✅ Product variants already exist (${existingVariants.length} found)`)
  }

  // Create sample blog posts
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: 'The Art of Luxury Fashion',
        slug: 'art-of-luxury-fashion',
        excerpt: 'Discover the craftsmanship and attention to detail that goes into creating luxury fashion pieces.',
        content: 'Luxury fashion is more than just clothing and accessories—it\'s an art form that combines traditional craftsmanship with modern innovation...',
        author: 'OmoOniBag Team',
        tags: ['luxury', 'fashion', 'craftsmanship'],
        category: 'Fashion',
        isPublished: true,
        publishedAt: new Date()
      }
    }),
    prisma.blogPost.create({
      data: {
        title: 'How to Care for Your Leather Bags',
        slug: 'care-for-leather-bags',
        excerpt: 'Essential tips for maintaining the beauty and longevity of your leather handbags.',
        content: 'Leather bags are an investment that can last for years with proper care. Here are our expert tips for keeping your leather accessories in pristine condition...',
        author: 'OmoOniBag Team',
        tags: ['leather', 'care', 'maintenance', 'bags'],
        category: 'Care',
        isPublished: true,
        publishedAt: new Date()
      }
    }),
    prisma.blogPost.create({
      data: {
        title: 'Nigerian Fashion Trends 2024',
        slug: 'nigerian-fashion-trends-2024',
        excerpt: 'Explore the latest fashion trends emerging from Nigeria\'s vibrant fashion scene.',
        content: 'Nigeria\'s fashion industry continues to evolve, blending traditional elements with contemporary styles. Here are the trends that are defining 2024...',
        author: 'OmoOniBag Team',
        tags: ['nigerian', 'fashion', 'trends', '2024'],
        category: 'Trends',
        isPublished: true,
        publishedAt: new Date()
      }
    })
  ])

  console.log(`✅ Created ${blogPosts.length} blog posts`)

  // Create sample newsletter subscribers
  const subscribers = await Promise.all([
    prisma.newsletterSubscriber.create({
      data: {
        email: 'customer1@example.com',
        firstName: 'Adebayo',
        lastName: 'Johnson',
        status: 'active'
      }
    }),
    prisma.newsletterSubscriber.create({
      data: {
        email: 'customer2@example.com',
        firstName: 'Chioma',
        lastName: 'Okonkwo',
        status: 'active'
      }
    }),
    prisma.newsletterSubscriber.create({
      data: {
        email: 'customer3@example.com',
        firstName: 'Fatima',
        lastName: 'Ibrahim',
        status: 'active'
      }
    })
  ])

  console.log(`✅ Created ${subscribers.length} newsletter subscribers`)

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
