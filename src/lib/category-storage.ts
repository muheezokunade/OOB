export interface CategoryRecord {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  isActive: boolean
  productCount: number
  createdAt: string
  updatedAt: string
}

let categories: CategoryRecord[] = [
  {
    id: '1',
    name: 'Bags',
    slug: 'bags',
    description: 'Luxury handbags and purses',
    isActive: true,
    productCount: 24,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Shoes',
    slug: 'shoes',
    description: 'Elegant footwear for every occasion',
    isActive: true,
    productCount: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export const categoryStorage = {
  list(): CategoryRecord[] {
    return categories
  },
  get(id: string): CategoryRecord | undefined {
    return categories.find(c => c.id === id)
  },
  create(data: Omit<CategoryRecord, 'id' | 'createdAt' | 'updatedAt' | 'productCount'> & { productCount?: number }): CategoryRecord {
    const now = new Date().toISOString()
    const record: CategoryRecord = {
      id: Date.now().toString(),
      name: data.name,
      slug: data.slug,
      description: data.description,
      parentId: data.parentId,
      isActive: data.isActive ?? true,
      productCount: data.productCount ?? 0,
      createdAt: now,
      updatedAt: now
    }
    categories.push(record)
    return record
  },
  update(id: string, updates: Partial<CategoryRecord>): CategoryRecord | null {
    const idx = categories.findIndex(c => c.id === id)
    if (idx === -1) return null
    categories[idx] = { ...categories[idx], ...updates, updatedAt: new Date().toISOString() }
    return categories[idx]
  },
  delete(id: string): boolean {
    const idx = categories.findIndex(c => c.id === id)
    if (idx === -1) return false
    categories.splice(idx, 1)
    return true
  }
}

export type { CategoryRecord as Category }


