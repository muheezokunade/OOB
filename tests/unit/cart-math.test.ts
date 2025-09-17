import { calculateTotals } from '@/lib/cart-math'

const items = [
  { id: 'a', name: 'A', price: 10000, category: 'Bags', subcategory: 'Totes', image: '/x.svg', quantity: 2, inStock: true },
  { id: 'b', name: 'B', price: 5000, category: 'Shoes', subcategory: 'Flats', image: '/y.svg', quantity: 1, inStock: true },
] as any

test('calculate totals without coupon', () => {
  const r = calculateTotals(items)
  expect(r.subtotal).toBe(25000)
  // 7.5% of 25k = 1875 (rounded)
  expect(r.tax).toBe(1875)
  // shipping since subtotal < 50k
  expect(r.shipping).toBe(2500)
  expect(r.total).toBe(25000 + 1875 + 2500)
})

test('calculate totals with percentage coupon', () => {
  const r = calculateTotals(items, { type: 'percentage', discount: 10 })
  // subtotal 25k - 10% = 22.5k, tax 1688 (rounded), shipping 2500
  expect(r.subtotal).toBe(25000)
  expect(r.tax).toBe(1688)
  expect(r.shipping).toBe(2500)
  expect(r.total).toBe(22500 + 1688 + 2500)
})


