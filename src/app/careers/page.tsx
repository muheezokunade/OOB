import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers | OmoOniBag',
  description: 'Join our team and be part of Nigeria\'s premier luxury fashion brand. Explore career opportunities at OmoOniBag.',
}

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-ink mb-8">Join Our Team</h1>
          
          <div className="bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl mb-8">
            <h2 className="text-2xl font-semibold text-ink mb-6">🌟 Why Work With Us?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-gold text-xl">✨</span>
                  <div>
                    <h3 className="font-semibold text-ink">Creative Environment</h3>
                    <p className="text-ink/70 text-sm">Work in a dynamic, creative space where your ideas matter</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-gold text-xl">🚀</span>
                  <div>
                    <h3 className="font-semibold text-ink">Growth Opportunities</h3>
                    <p className="text-ink/70 text-sm">Advance your career in Nigeria's fastest-growing luxury brand</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-gold text-xl">👥</span>
                  <div>
                    <h3 className="font-semibold text-ink">Amazing Team</h3>
                    <p className="text-ink/70 text-sm">Collaborate with passionate, talented professionals</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-gold text-xl">💼</span>
                  <div>
                    <h3 className="font-semibold text-ink">Competitive Benefits</h3>
                    <p className="text-ink/70 text-sm">Health insurance, flexible hours, and employee discounts</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-gold text-xl">🎯</span>
                  <div>
                    <h3 className="font-semibold text-ink">Impact</h3>
                    <p className="text-ink/70 text-sm">Make a real difference in the Nigerian fashion industry</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-gold text-xl">🏆</span>
                  <div>
                    <h3 className="font-semibold text-ink">Recognition</h3>
                    <p className="text-ink/70 text-sm">Be part of an award-winning, innovative brand</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Open Positions */}
            <div className="bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-semibold text-ink mb-6">💼 Open Positions</h2>
              
              <div className="space-y-4">
                <div className="border border-gold/20 rounded-lg p-4">
                  <h3 className="font-semibold text-ink mb-2">Fashion Designer</h3>
                  <p className="text-ink/70 text-sm mb-2">Create stunning designs for our luxury collection</p>
                  <div className="flex items-center gap-4 text-xs text-ink/60">
                    <span>📍 Lagos</span>
                    <span>⏰ Full-time</span>
                    <span>💰 Competitive</span>
                  </div>
                </div>
                
                <div className="border border-gold/20 rounded-lg p-4">
                  <h3 className="font-semibold text-ink mb-2">Digital Marketing Specialist</h3>
                  <p className="text-ink/70 text-sm mb-2">Drive our online presence and customer engagement</p>
                  <div className="flex items-center gap-4 text-xs text-ink/60">
                    <span>📍 Remote</span>
                    <span>⏰ Full-time</span>
                    <span>💰 Competitive</span>
                  </div>
                </div>
                
                <div className="border border-gold/20 rounded-lg p-4">
                  <h3 className="font-semibold text-ink mb-2">Customer Experience Manager</h3>
                  <p className="text-ink/70 text-sm mb-2">Ensure exceptional service for our valued customers</p>
                  <div className="flex items-center gap-4 text-xs text-ink/60">
                    <span>📍 Lagos</span>
                    <span>⏰ Full-time</span>
                    <span>💰 Competitive</span>
                  </div>
                </div>
                
                <div className="border border-gold/20 rounded-lg p-4">
                  <h3 className="font-semibold text-ink mb-2">E-commerce Developer</h3>
                  <p className="text-ink/70 text-sm mb-2">Build and maintain our online platform</p>
                  <div className="flex items-center gap-4 text-xs text-ink/60">
                    <span>📍 Remote</span>
                    <span>⏰ Full-time</span>
                    <span>💰 Competitive</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Process */}
            <div className="bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-semibold text-ink mb-6">📝 How to Apply</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-ink">Send Your Application</h3>
                    <p className="text-ink/70 text-sm">Email your CV and cover letter to careers@omo-oni-bag.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-ink">Initial Review</h3>
                    <p className="text-ink/70 text-sm">Our team will review your application within 5 business days</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-ink">Interview Process</h3>
                    <p className="text-ink/70 text-sm">Phone screening followed by in-person or video interview</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-ink">Welcome Aboard!</h3>
                    <p className="text-ink/70 text-sm">Join our amazing team and start your journey with us</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gold/10 border border-gold/20 rounded-2xl p-8 shadow-xl text-center">
            <h2 className="text-2xl font-semibold text-ink mb-4">Ready to Join Us?</h2>
            <p className="text-ink/70 mb-6">
              Send your application today and be part of Nigeria's premier luxury fashion brand.
            </p>
            <a 
              href="mailto:careers@omo-oni-bag.com?subject=Career Application"
              className="inline-flex items-center gap-2 bg-gold text-ink px-6 py-3 rounded-lg font-medium hover:bg-gold/90 transition-colors"
            >
              📧 Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}



