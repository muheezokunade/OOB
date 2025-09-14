// Simple in-memory storage for products (temporary solution)
// In production, this would be replaced with a real database

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  subcategory: string
  description: string
  longDescription?: string
  images: string[]
  stock: number
  sku: string
  materials: string[]
  sizes: string[]
  colors: string[]
  weight?: number
  dimensions?: string
  specifications?: any
  careInstructions: string[]
  tags: string[]
  isActive: boolean
  isNew?: boolean
  isBestSeller?: boolean
  isOutOfStock?: boolean
  createdAt: string
  updatedAt: string
}

// In-memory storage
let products: Product[] = [
  {
    id: '1',
    name: 'Luxury Leather Tote',
    price: 45000,
    originalPrice: 55000,
    category: 'Bags',
    subcategory: 'Totes',
    description: 'A sophisticated tote crafted from premium Italian leather. Perfect for the modern professional who values both style and functionality.',
    longDescription: 'This luxury leather tote represents the pinnacle of craftsmanship and design. Made from the finest Italian leather, each piece is carefully selected and treated to ensure durability and a beautiful patina that develops over time.',
    images: ['/images/products/luxury-tote.svg'],
    stock: 15,
    sku: 'LUX-TOTE-001',
    materials: ['Italian Leather', 'Brass Hardware', 'Cotton Lining'],
    sizes: ['One Size'],
    colors: ['#0B0B0B', '#8B4513', '#654321'],
    weight: 1.2,
    dimensions: '40cm x 30cm x 15cm',
    careInstructions: ['Wipe with dry cloth', 'Store in dust bag', 'Avoid water'],
    tags: ['luxury', 'leather', 'professional', 'tote'],
    isActive: true,
    isNew: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Elegant Evening Clutch',
    price: 25000,
    category: 'Bags',
    subcategory: 'Clutches',
    description: 'A stunning evening clutch that adds a touch of luxury to any outfit. Perfect for special occasions and formal events.',
    images: ['/images/products/elegant-clutch.svg'],
    stock: 8,
    sku: 'ELE-CLUTCH-001',
    materials: ['Metallic Leather', 'Gold Hardware', 'Silk Lining'],
    sizes: ['One Size'],
    colors: ['#C7A955', '#FFD700', '#B8860B'],
    weight: 0.3,
    dimensions: '20cm x 15cm x 5cm',
    careInstructions: ['Handle with care', 'Store in protective pouch'],
    tags: ['evening', 'clutch', 'luxury', 'formal'],
    isActive: true,
    isBestSeller: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Owambe Statement Heels',
    price: 32000,
    category: 'Shoes',
    subcategory: 'Owambe',
    description: 'Make a statement at your next owambe with these stunning heels. Bold, beautiful, and designed to turn heads.',
    images: ['/images/products/designer-heels.svg'],
    stock: 12,
    sku: 'OWA-HEELS-001',
    materials: ['Patent Leather', 'Metal Heel', 'Cushioned Insole'],
    sizes: ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9'],
    colors: ['#DC143C', '#B22222', '#8B0000'],
    weight: 0.8,
    dimensions: 'Heel: 10cm',
    careInstructions: ['Wipe with damp cloth', 'Store in shoe box'],
    tags: ['owambe', 'heels', 'statement', 'party'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Comfort Leather Slippers',
    price: 18000,
    category: 'Shoes',
    subcategory: 'Slippers',
    description: 'Ultra-comfortable slippers made from soft leather. Perfect for lounging at home or quick errands.',
    images: ['/images/products/comfortable-slippers.svg'],
    stock: 20,
    sku: 'COM-SLIP-001',
    materials: ['Soft Leather', 'Memory Foam Insole', 'Rubber Sole'],
    sizes: ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    colors: ['#F5DEB3', '#DEB887', '#D2B48C'],
    weight: 0.5,
    dimensions: 'Flat sole',
    careInstructions: ['Machine washable', 'Air dry'],
    tags: ['comfort', 'slippers', 'home', 'casual'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export const productStorage = {
  // Get all products
  getAll: (): Product[] => {
    return products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  // Get product by ID
  getById: (id: string): Product | undefined => {
    return products.find(p => p.id === id)
  },

  // Create new product
  create: (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    products.push(newProduct)
    return newProduct
  },

  // Update product
  update: (id: string, updates: Partial<Product>): Product | null => {
    const index = products.findIndex(p => p.id === id)
    if (index === -1) return null
    
    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return products[index]
  },

  // Delete product
  delete: (id: string): boolean => {
    const index = products.findIndex(p => p.id === id)
    if (index === -1) return false
    
    products.splice(index, 1)
    return true
  },

  // Search products
  search: (query: string): Product[] => {
    const lowercaseQuery = query.toLowerCase()
    return products.filter(p => 
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.sku.toLowerCase().includes(lowercaseQuery) ||
      p.materials.some(m => m.toLowerCase().includes(lowercaseQuery)) ||
      p.tags.some(t => t.toLowerCase().includes(lowercaseQuery))
    )
  },

  // Filter by category
  getByCategory: (category: string): Product[] => {
    return products.filter(p => p.category === category)
  },

  // Get active products only
  getActive: (): Product[] => {
    return products.filter(p => p.isActive)
  }
}

export type { Product }

