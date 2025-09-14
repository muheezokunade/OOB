# 🗄️ Database Setup Guide

## Step 1: Get Your Supabase Connection String

1. Go to https://supabase.com and create a new project
2. Go to **Settings** → **Database**
3. Copy the **Connection string** (URI format)
4. It should look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

## Step 2: Set Environment Variables in Netlify

1. Go to your Netlify admin panel: https://app.netlify.com/projects/classy-monstera-9dcad4
2. Navigate to **Site Settings** → **Environment Variables**
3. Add the following variables:

```bash
# Database Configuration
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secure-jwt-secret-key-here-min-32-characters

# App URL
NEXT_PUBLIC_APP_URL=https://classy-monstera-9dcad4.netlify.app
```

## Step 3: Run Database Migrations

After setting the environment variables, run these commands locally:

```bash
# Install dependencies (if not already done)
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Seed the database with sample data
npx prisma db seed
```

## Step 4: Verify Database Connection

You can verify the connection by:

1. Going to your Supabase dashboard
2. Navigate to **Table Editor**
3. You should see all the tables created (users, products, orders, etc.)

## Step 5: Test the Application

1. Visit your live site: https://classy-monstera-9dcad4.netlify.app
2. Try creating an account
3. Check if data is being saved in your Supabase database

## Troubleshooting

### If migrations fail:
- Make sure your DATABASE_URL is correct
- Check that your Supabase project is active
- Verify your database password is correct

### If you get connection errors:
- Ensure your Supabase project is not paused
- Check the connection string format
- Make sure you're using the correct project reference

## Next Steps

Once the database is set up, we'll configure Cloudinary for image uploads!

