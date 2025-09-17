const fs = require('fs');
const path = require('path');

// Create placeholder images using simple HTML files that can be converted to images
const products = [
  { name: 'luxury-tote', title: 'Luxury Tote', color: 'FFD700' },
  { name: 'elegant-clutch', title: 'Elegant Clutch', color: '8B4513' },
  { name: 'designer-heels', title: 'Designer Heels', color: '000000' },
  { name: 'comfortable-slippers', title: 'Comfortable Slippers', color: 'F5DEB3' }
];

// Create SVG placeholders
products.forEach(product => {
  const svg = `
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="#${product.color}"/>
  <rect x="50" y="50" width="700" height="500" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="10,5"/>
  <text x="400" y="300" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="#FFFFFF">
    ${product.title}
  </text>
  <text x="400" y="350" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#FFFFFF" opacity="0.8">
    OmoOniBag
  </text>
</svg>`;

  const filePath = path.join(__dirname, '..', 'public', 'images', 'products', `${product.name}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`Created ${filePath}`);
});

console.log('All placeholder images created successfully!');




