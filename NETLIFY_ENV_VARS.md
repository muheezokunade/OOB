# 🔧 Netlify Environment Variables

## Add these environment variables to your Netlify site:

**Go to**: https://app.netlify.com/projects/classy-monstera-9dcad4/settings/deploys#environment-variables

### Database Configuration
```
DATABASE_URL=postgresql://neondb_owner:npg_jdMZ49UFlQGu@ep-damp-darkness-adhc2kgy-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### JWT Secret (for admin authentication)
```
JWT_SECRET=4d4769f076ef93f5750f8b9c50a3ab153eaaf43ee4e81777568694a33f674567
```

### Cloudinary Configuration
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=10kQ55WgLS-UCIgWrz8LilBbKK0
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

### App Configuration
```
NEXT_PUBLIC_APP_URL=https://classy-monstera-9dcad4.netlify.app
NEXT_PUBLIC_WHATSAPP_NUMBER=+2349061819572
```

## ⚠️ Missing Information

You need to provide:
1. **Cloudinary Cloud Name** - Found in your Cloudinary dashboard
2. **Cloudinary API Secret** - Found in your Cloudinary dashboard (Settings → Security → API Keys)

## 📝 Steps to Add Environment Variables:

1. Go to your Netlify admin panel
2. Navigate to **Site Settings** → **Environment Variables**
3. Click **"Add a variable"**
4. Add each variable above (copy and paste the exact values)
5. Click **"Save"**
6. Redeploy your site

## 🚀 After Adding Variables:

1. **Redeploy** your site (or push a new commit)
2. **Test your live site**: https://classy-monstera-9dcad4.netlify.app
3. **Test admin login**: https://classy-monstera-9dcad4.netlify.app/admin/login
4. **Test image uploads** in the admin panel

## 🔍 Testing Checklist:

- [ ] Home page loads correctly
- [ ] Admin login works
- [ ] Image uploads work
- [ ] Database operations work
- [ ] All features function properly



