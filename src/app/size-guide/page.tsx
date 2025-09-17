import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Size Guide | OmoOniBag',
  description: 'Find the perfect fit for your luxury bags and shoes with our comprehensive size guide.',
}

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-ink mb-8">Size Guide</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bag Sizes */}
            <div className="bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-semibold text-ink mb-6">👜 Bag Sizes</h2>
              
              <div className="space-y-6">
                <div className="border border-gold/20 rounded-lg p-4">
                  <h3 className="font-semibold text-ink mb-2">Small (Clutch)</h3>
                  <div className="text-sm text-ink/70 space-y-1">
                    <p>Dimensions: 20cm x 15cm x 5cm</p>
                    <p>Perfect for: Evening events, minimal essentials</p>
                    <p>Fits: Phone, cards, lipstick, keys</p>
                  </div>
                </div>
                
                <div className="border border-gold/20 rounded-lg p-4">
                  <h3 className="font-semibold text-ink mb-2">Medium (Handbag)</h3>
                  <div className="text-sm text-ink/70 space-y-1">
                    <p>Dimensions: 30cm x 20cm x 10cm</p>
                    <p>Perfect for: Daily use, work, shopping</p>
                    <p>Fits: Laptop (13"), tablet, wallet, makeup</p>
                  </div>
                </div>
                
                <div className="border border-gold/20 rounded-lg p-4">
                  <h3 className="font-semibold text-ink mb-2">Large (Tote)</h3>
                  <div className="text-sm text-ink/70 space-y-1">
                    <p>Dimensions: 40cm x 30cm x 15cm</p>
                    <p>Perfect for: Travel, work, gym</p>
                    <p>Fits: Laptop (15"), books, water bottle</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shoe Sizes */}
            <div className="bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-semibold text-ink mb-6">👠 Shoe Sizes</h2>
              
              <div className="space-y-6">
                <div className="border border-gold/20 rounded-lg p-4">
                  <h3 className="font-semibold text-ink mb-2">UK Sizes</h3>
                  <div className="grid grid-cols-4 gap-2 text-sm text-ink/70">
                    <div>UK 3</div>
                    <div>UK 4</div>
                    <div>UK 5</div>
                    <div>UK 6</div>
                    <div>UK 7</div>
                    <div>UK 8</div>
                    <div>UK 9</div>
                    <div>UK 10</div>
                  </div>
                </div>
                
                <div className="border border-gold/20 rounded-lg p-4">
                  <h3 className="font-semibold text-ink mb-2">US Sizes</h3>
                  <div className="grid grid-cols-4 gap-2 text-sm text-ink/70">
                    <div>US 5</div>
                    <div>US 6</div>
                    <div>US 7</div>
                    <div>US 8</div>
                    <div>US 9</div>
                    <div>US 10</div>
                    <div>US 11</div>
                    <div>US 12</div>
                  </div>
                </div>
                
                <div className="border border-gold/20 rounded-lg p-4">
                  <h3 className="font-semibold text-ink mb-2">EU Sizes</h3>
                  <div className="grid grid-cols-4 gap-2 text-sm text-ink/70">
                    <div>EU 35</div>
                    <div>EU 36</div>
                    <div>EU 37</div>
                    <div>EU 38</div>
                    <div>EU 39</div>
                    <div>EU 40</div>
                    <div>EU 41</div>
                    <div>EU 42</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-ink mb-6">📏 How to Measure</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-ink mb-4">For Bags:</h3>
                <div className="space-y-3 text-ink/70">
                  <div className="flex items-start gap-3">
                    <span className="text-gold font-bold">1.</span>
                    <p>Measure length from left to right edge</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gold font-bold">2.</span>
                    <p>Measure height from top to bottom</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gold font-bold">3.</span>
                    <p>Measure depth from front to back</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-ink mb-4">For Shoes:</h3>
                <div className="space-y-3 text-ink/70">
                  <div className="flex items-start gap-3">
                    <span className="text-gold font-bold">1.</span>
                    <p>Stand on a piece of paper</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gold font-bold">2.</span>
                    <p>Mark the longest part of your foot</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gold font-bold">3.</span>
                    <p>Measure from heel to toe in cm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




