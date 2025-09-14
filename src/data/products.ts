export interface ProductVariant {
  color: string
  colorHex: string
  sizes: {
    size: string
    stock: number
    price?: number // Optional price override for size
  }[]
  images: string[]
}

export interface ProductReview {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  date: string
  verified: boolean
  images?: string[]
}

export interface ProductSpecification {
  label: string
  value: string
}

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  colors: string[]
  category: string
  subcategory: string
  description: string
  longDescription?: string
  materials: string[]
  isNew?: boolean
  isBestSeller?: boolean
  isOutOfStock?: boolean
  isPreOrder?: boolean
  estimatedDelivery?: string
  sizes?: string[]
  maxQuantity?: number
  stock: number
  variants?: ProductVariant[]
  reviews?: ProductReview[]
  rating: number
  reviewCount: number
  specifications: ProductSpecification[]
  careInstructions?: string[]
  tags: string[]
  relatedProducts?: string[] // Array of product IDs
  sku: string
  weight?: string
  dimensions?: {
    length: string
    width: string
    height: string
  }
}

export const products: Product[] = [
  {
    id: 'luxury-tote-black',
    name: 'Luxury Leather Tote',
    price: 45000,
    originalPrice: 55000,
    images: [
      '/images/products/luxury-tote.svg',
      '/images/products/luxury-tote.svg',
      '/images/products/luxury-tote.svg'
    ],
    colors: ['#0B0B0B', '#8B4513', '#654321'],
    category: 'Bags',
    subcategory: 'Totes',
    description: 'A sophisticated tote crafted from premium Italian leather. Perfect for the modern professional who values both style and functionality.',
    longDescription: 'This luxury leather tote represents the pinnacle of craftsmanship and design. Made from the finest Italian leather, each piece is carefully selected and treated to ensure durability and a beautiful patina that develops over time. The spacious interior features multiple pockets and compartments, making it perfect for organizing your daily essentials while maintaining an elegant silhouette.',
    materials: ['Italian Leather', 'Brass Hardware', 'Cotton Lining'],
    isNew: true,
    sizes: ['One Size'],
    stock: 15,
    maxQuantity: 3,
    rating: 4.8,
    reviewCount: 124,
    sku: 'OOB-LT-001',
    weight: '1.2kg',
    dimensions: {
      length: '35cm',
      width: '15cm',
      height: '30cm'
    },
    specifications: [
      { label: 'Material', value: 'Premium Italian Leather' },
      { label: 'Hardware', value: 'Antique Brass' },
      { label: 'Lining', value: '100% Cotton' },
      { label: 'Closure', value: 'Magnetic Snap' },
      { label: 'Handle Drop', value: '25cm' },
      { label: 'Interior Pockets', value: '3 (1 Zippered, 2 Open)' },
      { label: 'Care', value: 'Professional Leather Care Recommended' }
    ],
    careInstructions: [
      'Store in dust bag when not in use',
      'Avoid exposure to direct sunlight for extended periods',
      'Clean with a soft, dry cloth',
      'Use leather conditioner every 6 months',
      'Avoid contact with water and harsh chemicals'
    ],
    tags: ['luxury', 'leather', 'tote', 'professional', 'italian', 'handcrafted'],
    relatedProducts: ['elegant-clutch-gold', 'classic-handbag-brown', 'premium-crossbody-tan'],
    variants: [
      {
        color: 'Black',
        colorHex: '#0B0B0B',
        sizes: [
          { size: 'One Size', stock: 15 }
        ],
        images: [
          '/images/products/luxury-tote-black-1.svg',
          '/images/products/luxury-tote-black-2.svg',
          '/images/products/luxury-tote-black-3.svg'
        ]
      },
      {
        color: 'Cognac',
        colorHex: '#8B4513',
        sizes: [
          { size: 'One Size', stock: 8 }
        ],
        images: [
          '/images/products/luxury-tote-cognac-1.svg',
          '/images/products/luxury-tote-cognac-2.svg',
          '/images/products/luxury-tote-cognac-3.svg'
        ]
      },
      {
        color: 'Chocolate',
        colorHex: '#654321',
        sizes: [
          { size: 'One Size', stock: 12 }
        ],
        images: [
          '/images/products/luxury-tote-chocolate-1.svg',
          '/images/products/luxury-tote-chocolate-2.svg',
          '/images/products/luxury-tote-chocolate-3.svg'
        ]
      }
    ],
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Adaora N.',
        rating: 5,
        title: 'Absolutely stunning quality!',
        comment: 'This tote exceeded my expectations. The leather is incredibly soft and the craftsmanship is outstanding. Perfect size for work and travel.',
        date: '2024-01-15',
        verified: true
      },
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Kemi A.',
        rating: 5,
        title: 'Worth every naira',
        comment: 'I was hesitant about the price but this bag is worth every penny. The quality is exceptional and it goes with everything.',
        date: '2024-01-10',
        verified: true
      },
      {
        id: 'r3',
        userId: 'u3',
        userName: 'Funmi O.',
        rating: 4,
        title: 'Beautiful bag, great for work',
        comment: 'Love the professional look and the spacious interior. Only wish it came with a shoulder strap option.',
        date: '2024-01-05',
        verified: true
      }
    ]
  },
  {
    id: 'elegant-clutch-gold',
    name: 'Elegant Evening Clutch',
    price: 25000,
    images: [
      '/images/products/elegant-clutch.svg',
      '/images/products/elegant-clutch.svg'
    ],
    colors: ['#C7A955', '#FFD700', '#B8860B'],
    category: 'Bags',
    subcategory: 'Clutches',
    description: 'A stunning evening clutch that adds a touch of luxury to any outfit. Perfect for special occasions and formal events.',
    materials: ['Metallic Leather', 'Gold Hardware', 'Silk Lining'],
    isBestSeller: true,
    sizes: ['One Size'],
    stock: 20,
    rating: 4.6,
    reviewCount: 89,
    sku: 'OOB-EC-002',
    specifications: [
      { label: 'Material', value: 'Metallic Leather' },
      { label: 'Hardware', value: 'Gold Plated' },
      { label: 'Lining', value: 'Silk' },
      { label: 'Closure', value: 'Chain Strap' },
      { label: 'Dimensions', value: '25cm x 15cm x 5cm' }
    ],
    tags: ['evening', 'clutch', 'gold', 'luxury', 'formal'],
    relatedProducts: ['luxury-tote-black', 'evening-clutch-silver']
  },
  {
    id: 'classic-handbag-brown',
    name: 'Classic Handbag',
    price: 38000,
    images: [
      '/images/products/classic-handbag-brown-1.svg',
      '/images/products/classic-handbag-brown-2.svg',
      '/images/products/classic-handbag-brown-3.svg'
    ],
    colors: ['#8B4513', '#A0522D', '#D2691E'],
    category: 'Bags',
    subcategory: 'Handbags',
    description: 'Timeless design meets modern functionality. This classic handbag is a wardrobe essential that never goes out of style.',
    materials: ['Genuine Leather', 'Stainless Steel Hardware', 'Canvas Lining'],
    sizes: ['One Size'],
    stock: 12,
    rating: 4.7,
    reviewCount: 67,
    sku: 'OOB-CH-003',
    specifications: [
      { label: 'Material', value: 'Genuine Leather' },
      { label: 'Hardware', value: 'Stainless Steel' },
      { label: 'Lining', value: 'Canvas' },
      { label: 'Style', value: 'Classic Handbag' }
    ],
    tags: ['classic', 'handbag', 'leather', 'brown', 'timeless']
  },
  {
    id: 'comfort-slippers-beige',
    name: 'Comfort Leather Slippers',
    price: 18000,
    images: [
      '/images/products/comfortable-slippers.svg',
      '/images/products/comfortable-slippers.svg'
    ],
    colors: ['#F5DEB3', '#DEB887', '#D2B48C'],
    category: 'Shoes',
    subcategory: 'Slippers',
    description: 'Ultra-comfortable slippers made from soft leather. Perfect for lounging at home or quick errands.',
    materials: ['Soft Leather', 'Memory Foam Insole', 'Rubber Sole'],
    isNew: true,
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    stock: 25,
    rating: 4.5,
    reviewCount: 43,
    sku: 'OOB-CS-004',
    specifications: [
      { label: 'Material', value: 'Soft Leather' },
      { label: 'Insole', value: 'Memory Foam' },
      { label: 'Sole', value: 'Rubber' },
      { label: 'Style', value: 'Comfort Slippers' }
    ],
    tags: ['comfort', 'slippers', 'leather', 'beige', 'casual']
  },
  {
    id: 'owambe-heels-red',
    name: 'Owambe Statement Heels',
    price: 32000,
    images: [
      '/images/products/designer-heels.svg',
      '/images/products/designer-heels.svg',
      '/images/products/designer-heels.svg'
    ],
    colors: ['#DC143C', '#B22222', '#8B0000'],
    category: 'Shoes',
    subcategory: 'Owambe',
    description: 'Make a statement at your next owambe with these stunning heels. Bold, beautiful, and designed to turn heads.',
    materials: ['Patent Leather', 'Metal Heel', 'Cushioned Insole'],
    isBestSeller: true,
    sizes: ['35', '36', '37', '38', '39', '40', '41'],
    stock: 18,
    rating: 4.9,
    reviewCount: 156,
    sku: 'OOB-OH-005',
    specifications: [
      { label: 'Material', value: 'Patent Leather' },
      { label: 'Heel', value: 'Metal' },
      { label: 'Insole', value: 'Cushioned' },
      { label: 'Style', value: 'Statement Heels' }
    ],
    tags: ['owambe', 'heels', 'red', 'statement', 'party']
  },
  {
    id: 'office-pumps-black',
    name: 'Professional Office Pumps',
    price: 28000,
    images: [
      '/images/products/office-pumps-black-1.svg',
      '/images/products/office-pumps-black-2.svg'
    ],
    colors: ['#0B0B0B', '#2F2F2F', '#696969'],
    category: 'Shoes',
    subcategory: 'Office',
    description: 'Professional pumps designed for the modern working woman. Comfortable enough for all-day wear, stylish enough for any office.',
    materials: ['Leather Upper', 'Leather Lining', 'Rubber Sole'],
    sizes: ['35', '36', '37', '38', '39', '40', '41', '42'],
    stock: 22,
    rating: 4.6,
    reviewCount: 89,
    sku: 'OOB-OP-006',
    specifications: [
      { label: 'Upper', value: 'Leather' },
      { label: 'Lining', value: 'Leather' },
      { label: 'Sole', value: 'Rubber' },
      { label: 'Style', value: 'Professional Pumps' }
    ],
    tags: ['office', 'pumps', 'black', 'professional', 'work']
  },
  {
    id: 'mini-crossbody-tan',
    name: 'Mini Crossbody Bag',
    price: 22000,
    images: [
      '/images/products/mini-crossbody-tan-1.svg',
      '/images/products/mini-crossbody-tan-2.svg'
    ],
    colors: ['#D2B48C', '#BC9A6A', '#8B7355'],
    category: 'Bags',
    subcategory: 'Handbags',
    description: 'A compact crossbody bag that holds all your essentials. Perfect for days when you want to travel light.',
    materials: ['Genuine Leather', 'Adjustable Strap', 'Magnetic Closure'],
    sizes: ['One Size'],
    stock: 16,
    rating: 4.4,
    reviewCount: 52,
    sku: 'OOB-MC-007',
    specifications: [
      { label: 'Material', value: 'Genuine Leather' },
      { label: 'Strap', value: 'Adjustable' },
      { label: 'Closure', value: 'Magnetic' },
      { label: 'Style', value: 'Mini Crossbody' }
    ],
    tags: ['mini', 'crossbody', 'tan', 'compact', 'travel']
  },
  {
    id: 'weekend-tote-navy',
    name: 'Weekend Getaway Tote',
    price: 35000,
    images: [
      '/images/products/weekend-tote-navy-1.svg',
      '/images/products/weekend-tote-navy-2.svg',
      '/images/products/weekend-tote-navy-3.svg'
    ],
    colors: ['#000080', '#191970', '#4169E1'],
    category: 'Bags',
    subcategory: 'Totes',
    description: 'Spacious and stylish, this tote is perfect for weekend getaways or daily commutes. Roomy enough for all your essentials.',
    materials: ['Canvas Exterior', 'Leather Trim', 'Interior Pockets'],
    sizes: ['One Size'],
    stock: 14,
    rating: 4.5,
    reviewCount: 78,
    sku: 'OOB-WT-008',
    specifications: [
      { label: 'Exterior', value: 'Canvas' },
      { label: 'Trim', value: 'Leather' },
      { label: 'Pockets', value: 'Interior' },
      { label: 'Style', value: 'Weekend Tote' }
    ],
    tags: ['weekend', 'tote', 'navy', 'spacious', 'getaway']
  },
  {
    id: 'casual-flats-white',
    name: 'Casual Ballet Flats',
    price: 15000,
    images: [
      '/images/products/casual-flats-white-1.svg',
      '/images/products/casual-flats-white-2.svg'
    ],
    colors: ['#FFFFFF', '#F8F8FF', '#F0F8FF'],
    category: 'Shoes',
    subcategory: 'Slippers',
    description: 'Classic ballet flats that never go out of style. Comfortable and versatile for any casual occasion.',
    materials: ['Leather Upper', 'Leather Lining', 'Flexible Sole'],
    sizes: ['35', '36', '37', '38', '39', '40', '41', '42'],
    stock: 30,
    rating: 4.3,
    reviewCount: 95,
    sku: 'OOB-CF-009',
    specifications: [
      { label: 'Upper', value: 'Leather' },
      { label: 'Lining', value: 'Leather' },
      { label: 'Sole', value: 'Flexible' },
      { label: 'Style', value: 'Ballet Flats' }
    ],
    tags: ['casual', 'flats', 'white', 'ballet', 'versatile']
  },
  {
    id: 'evening-clutch-silver',
    name: 'Silver Evening Clutch',
    price: 26000,
    images: [
      '/images/products/evening-clutch-silver-1.svg',
      '/images/products/evening-clutch-silver-2.svg'
    ],
    colors: ['#C0C0C0', '#A8A8A8', '#808080'],
    category: 'Bags',
    subcategory: 'Clutches',
    description: 'A shimmering silver clutch that adds glamour to any evening ensemble. Perfect for parties and special events.',
    materials: ['Metallic Leather', 'Silver Hardware', 'Satin Lining'],
    sizes: ['One Size'],
    stock: 19,
    rating: 4.7,
    reviewCount: 61,
    sku: 'OOB-EC-010',
    specifications: [
      { label: 'Material', value: 'Metallic Leather' },
      { label: 'Hardware', value: 'Silver' },
      { label: 'Lining', value: 'Satin' },
      { label: 'Style', value: 'Evening Clutch' }
    ],
    tags: ['evening', 'clutch', 'silver', 'glamour', 'party']
  },
  {
    id: 'business-briefcase-black',
    name: 'Professional Briefcase',
    price: 55000,
    images: [
      '/images/products/business-briefcase-black-1.svg',
      '/images/products/business-briefcase-black-2.svg',
      '/images/products/business-briefcase-black-3.svg'
    ],
    colors: ['#0B0B0B', '#2F2F2F', '#1C1C1C'],
    category: 'Bags',
    subcategory: 'Totes',
    description: 'A sophisticated briefcase for the modern professional. Spacious compartments and premium materials.',
    materials: ['Full Grain Leather', 'Brass Hardware', 'Organized Interior'],
    isNew: true,
    sizes: ['One Size'],
    stock: 8,
    rating: 4.8,
    reviewCount: 34,
    sku: 'OOB-BB-011',
    specifications: [
      { label: 'Material', value: 'Full Grain Leather' },
      { label: 'Hardware', value: 'Brass' },
      { label: 'Interior', value: 'Organized' },
      { label: 'Style', value: 'Professional Briefcase' }
    ],
    tags: ['business', 'briefcase', 'black', 'professional', 'premium']
  },
  {
    id: 'party-heels-gold',
    name: 'Party Gold Heels',
    price: 30000,
    images: [
      '/images/products/designer-heels.svg',
      '/images/products/designer-heels.svg'
    ],
    colors: ['#FFD700', '#C7A955', '#B8860B'],
    category: 'Shoes',
    subcategory: 'Owambe',
    description: 'Stunning gold heels perfect for parties and celebrations. Comfortable heel height with maximum style impact.',
    materials: ['Metallic Leather', 'Gold Hardware', 'Cushioned Insole'],
    isOutOfStock: true,
    sizes: ['35', '36', '37', '38', '39', '40', '41'],
    stock: 0,
    rating: 4.9,
    reviewCount: 127,
    sku: 'OOB-PH-012',
    specifications: [
      { label: 'Material', value: 'Metallic Leather' },
      { label: 'Hardware', value: 'Gold' },
      { label: 'Insole', value: 'Cushioned' },
      { label: 'Style', value: 'Party Heels' }
    ],
    tags: ['party', 'heels', 'gold', 'celebration', 'stunning']
  }
]

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase())
}

export const getProductsBySubcategory = (subcategory: string) => {
  return products.filter(product => product.subcategory.toLowerCase() === subcategory.toLowerCase())
}

export const getProductById = (id: string) => {
  return products.find(product => product.id === id)
}

export const getNewProducts = () => {
  return products.filter(product => product.isNew)
}

export const getBestSellers = () => {
  return products.filter(product => product.isBestSeller)
}

// Helper function to add default values for products missing new fields
const addDefaultFields = (product: any): Product => {
  return {
    ...product,
    stock: product.stock ?? 10,
    rating: product.rating ?? 4.5,
    reviewCount: product.reviewCount ?? 15,
    sku: product.sku ?? `OOB-${product.id.slice(0, 3).toUpperCase()}-001`,
    specifications: product.specifications ?? [
      { label: 'Material', value: product.materials[0] || 'Premium Materials' },
      { label: 'Category', value: product.category },
      { label: 'Style', value: product.subcategory }
    ],
    tags: product.tags ?? [product.category.toLowerCase(), product.subcategory.toLowerCase()],
    relatedProducts: product.relatedProducts ?? []
  }
}

// Override getProductById to include default fields
export const getProductByIdWithDefaults = (id: string): Product | undefined => {
  const product = products.find(p => p.id === id)
  return product ? addDefaultFields(product) : undefined
}

// Get price range for a set of products
export const getPriceRange = (products: Product[]): [number, number] => {
  if (products.length === 0) return [0, 100000]
  
  const prices = products.map(p => p.price)
  return [Math.min(...prices), Math.max(...prices)]
}
