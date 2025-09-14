# OmoOniBag - Luxury Fashion E-commerce

A premium, design-focused Next.js e-commerce website for OmoOniBag, a Nigerian luxury shoe & bag label. Built with Next.js App Router, Tailwind CSS, and shadcn/ui components.

## 🎨 Design Philosophy

**Brand DNA**: "A bag for every girl, every time." Luxury without clutter.

This project prioritizes design quality with a focus on:
- Editorial photography framing
- Generous whitespace
- Balanced type hierarchy
- Consistent grids
- Refined hover/motion effects

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd omo-oni-bag
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Features

### Core Pages
- **Home**: Hero section, featured collections, new arrivals, best sellers
- **Shop**: Product listing with filters and sorting
- **Product**: Detailed product pages with image galleries
- **About**: Brand story and mission
- **Contact**: Contact form and business information
- **Style Guide**: Design system documentation

### Components
- Responsive navigation with mega menu
- Mobile-first design with drawer navigation
- Product cards with hover effects
- WhatsApp integration
- Newsletter signup
- Social media integration

### Design System
- **Typography**: Playfair Display (headings) + Inter (body)
- **Colors**: Ink, Coal, Cream, Fog, Stone, Gold
- **Spacing**: 4px base unit scale
- **Grid**: 12-col desktop, 8-col tablet, 4-col mobile

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Playfair Display, Inter)
- **Testing**: Playwright
- **TypeScript**: Full type safety

## 📱 Responsive Design

- **Mobile**: 375px+ (4-column grid)
- **Tablet**: 768px+ (8-column grid)  
- **Desktop**: 1024px+ (12-column grid)
- **Container**: Max-width 1320px

## 🎨 Customization

### Changing Brand Tokens

1. Update colors in `tailwind.config.ts`:
```typescript
colors: {
  ink: '#0B0B0B',
  coal: '#111111',
  cream: '#F6F3EE',
  // ... other colors
}
```

2. Update CSS variables in `src/app/globals.css`:
```css
:root {
  --ink: #0B0B0B;
  --coal: #111111;
  --cream: #F6F3EE;
  // ... other variables
}
```

### Adding a New Collection

1. Add products to `src/data/products.ts`:
```typescript
{
  id: 'new-product-id',
  name: 'Product Name',
  price: 25000,
  images: ['/images/products/product-1.svg'],
  colors: ['#000000'],
  category: 'Bags',
  subcategory: 'Totes',
  // ... other properties
}
```

2. Update navigation in `src/components/navbar.tsx` if needed.

### Swapping Fonts

1. Update Google Fonts import in `src/app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=NewFont:wght@400;500;600&display=swap');
```

2. Update font families in `tailwind.config.ts`:
```typescript
fontFamily: {
  serif: ['NewFont', 'serif'],
  sans: ['Inter', 'sans-serif'],
}
```

## 🧪 Testing

Run Playwright tests:
```bash
npm run test
```

The test suite includes:
- Mobile navigation functionality
- Responsive design verification
- Component interaction testing

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── shop/              # Shop pages
│   ├── style/             # Style guide
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── navbar.tsx        # Navigation
│   ├── footer.tsx        # Footer
│   ├── hero.tsx          # Hero section
│   ├── product-card.tsx  # Product display
│   └── whatsapp-cta.tsx  # WhatsApp integration
├── data/                 # Data files
│   └── products.ts       # Product data
├── lib/                  # Utilities
│   └── utils.ts          # Helper functions
└── design/               # Design tokens
    └── tokens.ts         # Design system tokens
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

Build the project:
```bash
npm run build
```

The built files will be in the `.next` directory.

## 📞 Contact & Support

- **Phone**: 09061819572
- **WhatsApp**: [Message us](https://wa.me/2349061819572)
- **Email**: hello@omo-oni-bag.com
- **Instagram**: [@OmoOniBag](https://instagram.com/omo-oni-bag)

## 📄 License

This project is proprietary to OmoOniBag. All rights reserved.

## 🤝 Contributing

This is a private project. For internal development:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 Notes

- All images are currently placeholder SVGs
- Replace with actual product photography for production
- WhatsApp integration requires phone number configuration
- Email functionality needs backend implementation
