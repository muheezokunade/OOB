import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | OmoOniBag',
  description: 'Find answers to frequently asked questions about our luxury bags, shoes, shipping, returns, and more.',
}

export default function FAQPage() {
  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          q: "How long does shipping take?",
          a: "Standard delivery takes 3-5 business days within Lagos and 5-7 business days nationwide. Express delivery is available for 1-2 business days within Lagos."
        },
        {
          q: "Do you ship internationally?",
          a: "Currently, we only ship within Nigeria. We're working on international shipping options for the future."
        },
        {
          q: "Can I track my order?",
          a: "Yes! You'll receive a tracking number via email once your order ships. You can track your package in real-time."
        },
        {
          q: "What if I'm not home for delivery?",
          a: "Our delivery team will attempt delivery twice. If unsuccessful, your package will be held at our nearest pickup location for 7 days."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day return policy from the delivery date. Items must be unworn and in original packaging with tags attached."
        },
        {
          q: "How do I return an item?",
          a: "Contact our customer service team via WhatsApp (09061819572) or email (hello@omo-oni-bag.com) to initiate a return."
        },
        {
          q: "Are returns free?",
          a: "Returns are free for defective items or if we made an error. For other returns, a small return fee may apply."
        },
        {
          q: "How long do refunds take?",
          a: "Refunds are processed within 5-7 business days after we receive your returned item. The refund will be credited to your original payment method."
        }
      ]
    },
    {
      category: "Products & Sizing",
      questions: [
        {
          q: "How do I find my size?",
          a: "Check our comprehensive size guide on the website. You can also contact us for personalized sizing assistance."
        },
        {
          q: "Are your products authentic?",
          a: "Yes! All our products are 100% authentic luxury items. We source directly from trusted manufacturers and suppliers."
        },
        {
          q: "Do you offer custom sizes?",
          a: "We offer custom sizing for select products. Contact us to discuss your specific requirements."
        },
        {
          q: "What materials do you use?",
          a: "We use premium materials including genuine leather, high-quality fabrics, and durable hardware for all our products."
        }
      ]
    },
    {
      category: "Payment & Security",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards, bank transfers, and mobile money payments. All transactions are secure and encrypted."
        },
        {
          q: "Is my payment information secure?",
          a: "Yes! We use industry-standard SSL encryption to protect your payment information. We never store your card details."
        },
        {
          q: "Can I pay in installments?",
          a: "Yes! We offer flexible payment plans through our partner financial institutions. Contact us for more information."
        },
        {
          q: "Do you offer discounts?",
          a: "We regularly offer promotions and discounts. Sign up for our newsletter to stay updated on the latest offers."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-ink mb-8">Frequently Asked Questions</h1>
          
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-semibold text-ink mb-6">{category.category}</h2>
                
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-b border-gold/10 pb-4 last:border-b-0">
                      <h3 className="font-semibold text-ink mb-2">{faq.q}</h3>
                      <p className="text-ink/70 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gold/10 border border-gold/20 rounded-2xl p-8 shadow-xl text-center">
            <h2 className="text-2xl font-semibold text-ink mb-4">Still Have Questions?</h2>
            <p className="text-ink/70 mb-6">
              Our customer service team is here to help! Reach out to us anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/2349061819572"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                📱 WhatsApp
              </a>
              <a 
                href="mailto:hello@omo-oni-bag.com"
                className="inline-flex items-center gap-2 bg-gold text-ink px-6 py-3 rounded-lg font-medium hover:bg-gold/90 transition-colors"
              >
                📧 Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

