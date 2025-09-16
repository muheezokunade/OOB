import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Care Instructions | OmoOniBag',
  description: 'Learn how to properly care for your luxury bags and shoes to maintain their beauty and longevity.',
}

export default function CarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-ink mb-8">Care Instructions</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Leather Care */}
            <div className="bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-semibold text-ink mb-6">👜 Leather Bag Care</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-ink mb-3">Daily Care</h3>
                  <ul className="space-y-2 text-ink/70 text-sm">
                    <li>• Wipe with dry, soft cloth after each use</li>
                    <li>• Store in dust bag when not in use</li>
                    <li>• Avoid overstuffing to maintain shape</li>
                    <li>• Keep away from direct sunlight</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-ink mb-3">Weekly Care</h3>
                  <ul className="space-y-2 text-ink/70 text-sm">
                    <li>• Clean with leather conditioner</li>
                    <li>• Remove dust and debris</li>
                    <li>• Check hardware for tarnishing</li>
                    <li>• Air out in well-ventilated area</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-ink mb-3">What to Avoid</h3>
                  <ul className="space-y-2 text-ink/70 text-sm">
                    <li>• Water and moisture</li>
                    <li>• Harsh chemicals</li>
                    <li>• Extreme temperatures</li>
                    <li>• Rough surfaces</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Shoe Care */}
            <div className="bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-semibold text-ink mb-6">👠 Shoe Care</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-ink mb-3">After Each Wear</h3>
                  <ul className="space-y-2 text-ink/70 text-sm">
                    <li>• Wipe soles with damp cloth</li>
                    <li>• Remove dirt and debris</li>
                    <li>• Air dry completely</li>
                    <li>• Use shoe trees for shape</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-ink mb-3">Weekly Maintenance</h3>
                  <ul className="space-y-2 text-ink/70 text-sm">
                    <li>• Clean with appropriate cleaner</li>
                    <li>• Condition leather uppers</li>
                    <li>• Polish for shine</li>
                    <li>• Check for wear and tear</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-ink mb-3">Storage Tips</h3>
                  <ul className="space-y-2 text-ink/70 text-sm">
                    <li>• Store in original boxes</li>
                    <li>• Use shoe bags for protection</li>
                    <li>• Keep in cool, dry place</li>
                    <li>• Rotate shoes regularly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-ink mb-6">🛠️ Professional Care Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🧽</span>
                </div>
                <h3 className="font-semibold text-ink mb-2">Deep Cleaning</h3>
                <p className="text-ink/60 text-sm">Professional cleaning and conditioning for all leather goods</p>
                <p className="text-gold font-medium mt-2">From ₦5,000</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔧</span>
                </div>
                <h3 className="font-semibold text-ink mb-2">Repairs</h3>
                <p className="text-ink/60 text-sm">Hardware replacement, stitching, and structural repairs</p>
                <p className="text-gold font-medium mt-2">From ₦3,000</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="font-semibold text-ink mb-2">Restoration</h3>
                <p className="text-ink/60 text-sm">Complete restoration to like-new condition</p>
                <p className="text-gold font-medium mt-2">From ₦8,000</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gold/10 border border-gold/20 rounded-2xl p-6">
            <h3 className="font-semibold text-ink mb-3">💡 Pro Tip</h3>
            <p className="text-ink/70">
              Regular maintenance is key to preserving your luxury items. A little care goes a long way in maintaining the beauty and value of your OmoOniBag pieces.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}



