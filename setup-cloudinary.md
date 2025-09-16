# ☁️ Cloudinary Setup Guide

## Step 1: Create Cloudinary Account

1. Go to https://cloudinary.com
2. Click **"Sign Up For Free"**
3. Fill in your details:
   - Full name
   - Email address
   - Password
   - Company (optional)
4. Verify your email address

## Step 2: Get Your Cloudinary Credentials

Once logged in to your Cloudinary dashboard:

1. **Cloud Name**: Found at the top of your dashboard
2. **API Key**: Go to **Settings** → **Security** → **API Keys**
3. **API Secret**: Same location as API Key (click "Show" to reveal)

## Step 3: Set Environment Variables in Netlify

1. Go to your Netlify admin panel: https://app.netlify.com/projects/classy-monstera-9dcad4
2. Navigate to **Site Settings** → **Environment Variables**
3. Add these Cloudinary variables:

```bash
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Step 4: Test Image Upload

After setting the environment variables:

1. Redeploy your Netlify site
2. Go to your admin panel: https://classy-monstera-9dcad4.netlify.app/admin/login
3. Try uploading an image in the admin panel
4. Check your Cloudinary dashboard to see if images are being uploaded

## Step 5: Configure Cloudinary Settings (Optional)

### Upload Presets
1. Go to **Settings** → **Upload**
2. Create upload presets for different image types:
   - **Product images**: Auto-optimize, WebP format
   - **Banner images**: Auto-optimize, high quality
   - **User avatars**: Auto-optimize, square crop

### Security Settings
1. Go to **Settings** → **Security**
2. Configure allowed file types: `jpg, jpeg, png, webp`
3. Set maximum file size: `10MB`
4. Enable signed uploads for security

## Troubleshooting

### If uploads fail:
- Check that all three environment variables are set correctly
- Verify your API key and secret are correct
- Make sure your Cloudinary account is active

### If images don't display:
- Check that `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set
- Verify the image URLs are being generated correctly
- Check browser console for any errors

## Free Tier Limits

Cloudinary's free tier includes:
- 25 GB storage
- 25 GB bandwidth per month
- 25,000 transformations per month
- 1,000 API requests per month

This should be sufficient for development and small to medium production use.

## Next Steps

Once Cloudinary is configured:
1. Test image uploads in the admin panel
2. Verify images display correctly on the frontend
3. Test the complete user flow with real data



