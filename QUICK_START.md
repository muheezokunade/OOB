# 🚀 Quick Start Guide - Database & Cloudinary Setup

## 🎯 **Goal**: Set up production database and image uploads for your live site

Your app is already deployed at: **https://classy-monstera-9dcad4.netlify.app**

## 📋 **Prerequisites**

You need to create accounts for:
1. **Supabase** (free PostgreSQL database): https://supabase.com
2. **Cloudinary** (free image hosting): https://cloudinary.com

## 🚀 **Quick Setup (Recommended)**

Run the automated setup script:

```bash
node setup-production.js
```

This script will:
- ✅ Guide you through entering your credentials
- ✅ Set up your database with all tables
- ✅ Generate secure JWT secrets
- ✅ Provide exact environment variables for Netlify

## 📝 **Manual Setup (Alternative)**

### Step 1: Database Setup
1. Create Supabase account and project
2. Get your connection string from Settings → Database
3. Run: `node setup-db.js`

### Step 2: Cloudinary Setup
1. Create Cloudinary account
2. Get your cloud name, API key, and secret from dashboard
3. Follow the guide in `setup-cloudinary.md`

## 🔧 **Environment Variables for Netlify**

After running the setup, add these to Netlify:
- Go to: https://app.netlify.com/projects/classy-monstera-9dcad4/settings/deploys#environment-variables

```bash
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
JWT_SECRET=[generated-secret]
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=[your-cloud-name]
CLOUDINARY_API_KEY=[your-api-key]
CLOUDINARY_API_SECRET=[your-api-secret]
NEXT_PUBLIC_APP_URL=https://classy-monstera-9dcad4.netlify.app
```

## ✅ **Testing Your Setup**

1. **Redeploy** your Netlify site (add environment variables first)
2. **Test the live site**: https://classy-monstera-9dcad4.netlify.app
3. **Test admin panel**: https://classy-monstera-9dcad4.netlify.app/admin/login
4. **Test image uploads** in the admin panel
5. **Check your database** in Supabase dashboard

## 🆘 **Need Help?**

- **Database issues**: Check `setup-database.md`
- **Cloudinary issues**: Check `setup-cloudinary.md`
- **General deployment**: Check `DEPLOYMENT_GUIDE.md`

## 🎉 **What You'll Get**

Once set up, your luxury fashion platform will have:
- ✅ **Live database** with all product data
- ✅ **Image uploads** working perfectly
- ✅ **Admin panel** fully functional
- ✅ **User accounts** and authentication
- ✅ **Shopping cart** and checkout
- ✅ **Order management** system

**Ready to start? Run `node setup-production.js` and follow the prompts!** 🚀




