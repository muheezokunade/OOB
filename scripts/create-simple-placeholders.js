// Simple script to create basic placeholder images using canvas
const fs = require('fs');
const path = require('path');

// Create a simple SVG placeholder
function createSVGPlaceholder(width, height, text, bgColor = '#F6F3EE', textColor = '#0B0B0B') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="${textColor}" text-anchor="middle" dy=".3em">${text}</text>
  </svg>`;
}

// Image configurations
const images = [
  // Hero images
  { path: 'public/images/hero/main-hero.jpg', width: 1920, height: 1080, text: 'OmoOniBag Hero', bgColor: '#0B0B0B', textColor: '#F6F3EE' },
  
  // Feature images
  { path: 'public/images/features/bags-feature.jpg', width: 800, height: 600, text: 'Luxury Bags', bgColor: '#8B4513', textColor: '#F6F3EE' },
  { path: 'public/images/features/shoes-feature.jpg', width: 800, height: 600, text: 'Designer Shoes', bgColor: '#C7A955', textColor: '#0B0B0B' },
  
  // Product images - using different colors for variety
  { path: 'public/images/products/luxury-tote-black-1.jpg', width: 600, height: 750, text: 'Luxury Tote', bgColor: '#0B0B0B', textColor: '#F6F3EE' },
  { path: 'public/images/products/luxury-tote-black-2.jpg', width: 600, height: 750, text: 'Luxury Tote', bgColor: '#111111', textColor: '#F6F3EE' },
  { path: 'public/images/products/luxury-tote-black-3.jpg', width: 600, height: 750, text: 'Luxury Tote', bgColor: '#2F2F2F', textColor: '#F6F3EE' },
  { path: 'public/images/products/elegant-clutch-gold-1.jpg', width: 600, height: 750, text: 'Gold Clutch', bgColor: '#C7A955', textColor: '#0B0B0B' },
  { path: 'public/images/products/elegant-clutch-gold-2.jpg', width: 600, height: 750, text: 'Gold Clutch', bgColor: '#FFD700', textColor: '#0B0B0B' },
  { path: 'public/images/products/classic-handbag-brown-1.jpg', width: 600, height: 750, text: 'Brown Handbag', bgColor: '#8B4513', textColor: '#F6F3EE' },
  { path: 'public/images/products/classic-handbag-brown-2.jpg', width: 600, height: 750, text: 'Brown Handbag', bgColor: '#A0522D', textColor: '#F6F3EE' },
  { path: 'public/images/products/classic-handbag-brown-3.jpg', width: 600, height: 750, text: 'Brown Handbag', bgColor: '#D2691E', textColor: '#F6F3EE' },
  { path: 'public/images/products/comfort-slippers-beige-1.jpg', width: 600, height: 750, text: 'Beige Slippers', bgColor: '#F5DEB3', textColor: '#0B0B0B' },
  { path: 'public/images/products/comfort-slippers-beige-2.jpg', width: 600, height: 750, text: 'Beige Slippers', bgColor: '#DEB887', textColor: '#0B0B0B' },
  { path: 'public/images/products/owambe-heels-red-1.jpg', width: 600, height: 750, text: 'Red Heels', bgColor: '#DC143C', textColor: '#F6F3EE' },
  { path: 'public/images/products/owambe-heels-red-2.jpg', width: 600, height: 750, text: 'Red Heels', bgColor: '#B22222', textColor: '#F6F3EE' },
  { path: 'public/images/products/owambe-heels-red-3.jpg', width: 600, height: 750, text: 'Red Heels', bgColor: '#8B0000', textColor: '#F6F3EE' },
  { path: 'public/images/products/office-pumps-black-1.jpg', width: 600, height: 750, text: 'Black Pumps', bgColor: '#0B0B0B', textColor: '#F6F3EE' },
  { path: 'public/images/products/office-pumps-black-2.jpg', width: 600, height: 750, text: 'Black Pumps', bgColor: '#2F2F2F', textColor: '#F6F3EE' },
  { path: 'public/images/products/mini-crossbody-tan-1.jpg', width: 600, height: 750, text: 'Tan Crossbody', bgColor: '#D2B48C', textColor: '#0B0B0B' },
  { path: 'public/images/products/mini-crossbody-tan-2.jpg', width: 600, height: 750, text: 'Tan Crossbody', bgColor: '#BC9A6A', textColor: '#0B0B0B' },
  { path: 'public/images/products/weekend-tote-navy-1.jpg', width: 600, height: 750, text: 'Navy Tote', bgColor: '#000080', textColor: '#F6F3EE' },
  { path: 'public/images/products/weekend-tote-navy-2.jpg', width: 600, height: 750, text: 'Navy Tote', bgColor: '#191970', textColor: '#F6F3EE' },
  { path: 'public/images/products/weekend-tote-navy-3.jpg', width: 600, height: 750, text: 'Navy Tote', bgColor: '#4169E1', textColor: '#F6F3EE' },
  { path: 'public/images/products/casual-flats-white-1.jpg', width: 600, height: 750, text: 'White Flats', bgColor: '#FFFFFF', textColor: '#0B0B0B' },
  { path: 'public/images/products/casual-flats-white-2.jpg', width: 600, height: 750, text: 'White Flats', bgColor: '#F8F8FF', textColor: '#0B0B0B' },
  { path: 'public/images/products/evening-clutch-silver-1.jpg', width: 600, height: 750, text: 'Silver Clutch', bgColor: '#C0C0C0', textColor: '#0B0B0B' },
  { path: 'public/images/products/evening-clutch-silver-2.jpg', width: 600, height: 750, text: 'Silver Clutch', bgColor: '#A8A8A8', textColor: '#0B0B0B' },
  { path: 'public/images/products/business-briefcase-black-1.jpg', width: 600, height: 750, text: 'Black Briefcase', bgColor: '#0B0B0B', textColor: '#F6F3EE' },
  { path: 'public/images/products/business-briefcase-black-2.jpg', width: 600, height: 750, text: 'Black Briefcase', bgColor: '#1C1C1C', textColor: '#F6F3EE' },
  { path: 'public/images/products/business-briefcase-black-3.jpg', width: 600, height: 750, text: 'Black Briefcase', bgColor: '#2F2F2F', textColor: '#F6F3EE' },
  { path: 'public/images/products/party-heels-gold-1.jpg', width: 600, height: 750, text: 'Gold Heels', bgColor: '#FFD700', textColor: '#0B0B0B' },
  { path: 'public/images/products/party-heels-gold-2.jpg', width: 600, height: 750, text: 'Gold Heels', bgColor: '#C7A955', textColor: '#0B0B0B' },
  
  // Instagram images
  { path: 'public/images/instagram/ig-1.jpg', width: 400, height: 400, text: 'IG Post 1', bgColor: '#F6F3EE', textColor: '#0B0B0B' },
  { path: 'public/images/instagram/ig-2.jpg', width: 400, height: 400, text: 'IG Post 2', bgColor: '#E7E3DD', textColor: '#0B0B0B' },
  { path: 'public/images/instagram/ig-3.jpg', width: 400, height: 400, text: 'IG Post 3', bgColor: '#D9D9D9', textColor: '#0B0B0B' },
  { path: 'public/images/instagram/ig-4.jpg', width: 400, height: 400, text: 'IG Post 4', bgColor: '#C7A955', textColor: '#0B0B0B' },
  { path: 'public/images/instagram/ig-5.jpg', width: 400, height: 400, text: 'IG Post 5', bgColor: '#111111', textColor: '#F6F3EE' },
  { path: 'public/images/instagram/ig-6.jpg', width: 400, height: 400, text: 'IG Post 6', bgColor: '#0B0B0B', textColor: '#F6F3EE' },
];

// Create directories and files
images.forEach(image => {
  // Ensure directory exists
  const dir = path.dirname(image.path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Create SVG placeholder
  const svg = createSVGPlaceholder(image.width, image.height, image.text, image.bgColor, image.textColor);
  
  // Save as SVG (we'll use .jpg extension but it's actually SVG for now)
  fs.writeFileSync(image.path.replace('.jpg', '.svg'), svg);
  console.log(`Created: ${image.path.replace('.jpg', '.svg')}`);
});

console.log('All placeholder images created as SVG files!');
console.log('Note: These are SVG files with .svg extension. For production, convert to actual JPG/PNG files.');



