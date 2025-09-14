# Cloudinary Setup Guide

This guide will help you set up Cloudinary for optimized image delivery in your OmoOniBag application.

## 1. Create a Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email address

## 2. Get Your Cloudinary Credentials

1. Log into your Cloudinary dashboard
2. Go to the "Dashboard" section
3. Copy the following values:
   - **Cloud Name** (e.g., `your-cloud-name`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `your-api-secret`)

## 3. Set Up Environment Variables

Create a `.env.local` file in your project root and add:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Important:** Replace the placeholder values with your actual Cloudinary credentials.

## 4. Features Enabled

With Cloudinary integration, you now have:

### 🚀 **Performance Benefits:**
- **Automatic Image Optimization** - Images are automatically optimized for different devices and screen sizes
- **Format Conversion** - Images are served in the best format (WebP, AVIF) for each browser
- **Responsive Images** - Different sizes are generated automatically
- **Lazy Loading** - Images load only when needed
- **CDN Delivery** - Images are served from Cloudinary's global CDN

### 📸 **Upload Features:**
- **Drag & Drop Upload** - Easy image upload in admin panel
- **Automatic Compression** - Images are compressed without quality loss
- **Folder Organization** - Images are organized in folders (banners, products, etc.)
- **Tagging System** - Images can be tagged for easy management

### 🎨 **Image Transformations:**
- **Auto Crop & Resize** - Images are automatically cropped and resized
- **Quality Optimization** - Automatic quality adjustment based on content
- **Format Optimization** - Best format selection for each use case
- **Gravity Detection** - Smart cropping focuses on important parts of images

## 5. Usage Examples

### Banner Images
```tsx
<CloudinaryImage
  src="banner-image-url"
  alt="Banner description"
  width={800}
  height={1000}
  quality="auto"
  crop="fill"
  gravity="auto"
/>
```

### Product Images
```tsx
<ProductImage
  src="product-image-url"
  alt="Product name"
  size="medium" // thumbnail, medium, large, zoom
/>
```

### Upload Component
```tsx
<BannerImageUpload
  value={imageUrl}
  onChange={setImageUrl}
  type="hero" // hero, product, announcement, promotion
/>
```

## 6. Admin Panel Integration

The admin panel now includes:
- **Image Upload Interface** - Drag & drop image upload
- **Preview Functionality** - See images before saving
- **Optimized Display** - All images in admin are optimized
- **Folder Organization** - Images are automatically organized

## 7. Performance Monitoring

Cloudinary provides:
- **Analytics Dashboard** - Track image usage and performance
- **Bandwidth Monitoring** - Monitor data transfer
- **Storage Management** - Track storage usage

## 8. Best Practices

1. **Use Appropriate Sizes** - Don't upload images larger than needed
2. **Optimize Before Upload** - Compress images before uploading when possible
3. **Use Descriptive Names** - Name your images descriptively
4. **Organize with Folders** - Use folders to organize images
5. **Add Tags** - Tag images for easy searching and management

## 9. Troubleshooting

### Common Issues:

**Images not loading:**
- Check your environment variables
- Verify Cloudinary credentials
- Ensure images are uploaded successfully

**Upload failures:**
- Check file size (max 5MB for regular uploads, 10MB for banners)
- Verify file format (JPEG, PNG, WebP supported)
- Check admin authentication

**Performance issues:**
- Use appropriate image sizes
- Enable lazy loading
- Use quality="auto" for automatic optimization

## 10. Support

For Cloudinary-specific issues:
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Cloudinary Support](https://support.cloudinary.com)

For application-specific issues:
- Check the application logs
- Verify environment variables
- Test with different image formats and sizes
