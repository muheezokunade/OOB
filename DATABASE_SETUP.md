# Database Setup Guide

This guide will help you set up the PostgreSQL database for the OmoOniBag e-commerce platform.

## Prerequisites

1. **PostgreSQL** installed on your system
2. **Node.js** and **npm** installed
3. **Prisma CLI** (already installed)

## Step 1: Install PostgreSQL

### macOS (using Homebrew)
```bash
brew install postgresql
brew services start postgresql
```

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Windows
Download and install from: https://www.postgresql.org/download/windows/

## Step 2: Create Database

1. **Connect to PostgreSQL:**
```bash
sudo -u postgres psql
```

2. **Create database and user:**
```sql
CREATE DATABASE omo_oni_bag;
CREATE USER omo_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE omo_oni_bag TO omo_user;
\q
```

## Step 3: Configure Environment Variables

1. **Copy the environment template:**
```bash
cp env.example .env.local
```

2. **Update the database URL in `.env.local`:**
```env
DATABASE_URL="postgresql://omo_user:your_secure_password@localhost:5432/omo_oni_bag?schema=public"
```

## Step 4: Run Database Migrations

1. **Generate Prisma client:**
```bash
npx prisma generate
```

2. **Create and apply migrations:**
```bash
npx prisma migrate dev --name init
```

3. **Seed the database (optional):**
```bash
npx prisma db seed
```

## Step 5: Verify Setup

1. **Open Prisma Studio to view your database:**
```bash
npx prisma studio
```

2. **Check database connection:**
```bash
npx prisma db pull
```

## Database Schema Overview

The database includes the following main tables:

### Core Tables
- **users** - User accounts and profiles
- **products** - Product catalog
- **orders** - Order management
- **carts** - Shopping carts
- **wishlists** - User wishlists

### Supporting Tables
- **addresses** - User addresses
- **reviews** - Product reviews
- **blog_posts** - Blog content
- **newsletter_subscribers** - Newsletter subscriptions
- **product_views** - Analytics tracking
- **search_queries** - Search analytics

## Production Setup

### 1. Production Database
For production, consider using:
- **Supabase** (PostgreSQL with real-time features)
- **PlanetScale** (MySQL-compatible)
- **Railway** (PostgreSQL hosting)
- **AWS RDS** (Managed PostgreSQL)

### 2. Environment Variables
Update your production environment variables:
```env
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
```

### 3. Database Migrations
```bash
npx prisma migrate deploy
```

## Backup and Restore

### Backup
```bash
pg_dump -h localhost -U omo_user -d omo_oni_bag > backup.sql
```

### Restore
```bash
psql -h localhost -U omo_user -d omo_oni_bag < backup.sql
```

## Troubleshooting

### Common Issues

1. **Connection refused:**
   - Ensure PostgreSQL is running
   - Check if the port (5432) is open
   - Verify username and password

2. **Permission denied:**
   - Grant proper permissions to the database user
   - Check database ownership

3. **Migration errors:**
   - Reset the database: `npx prisma migrate reset`
   - Check for conflicting schema changes

### Useful Commands

```bash
# Reset database
npx prisma migrate reset

# View database status
npx prisma migrate status

# Generate new migration
npx prisma migrate dev --name migration_name

# Deploy migrations to production
npx prisma migrate deploy

# Open Prisma Studio
npx prisma studio

# Format Prisma schema
npx prisma format
```

## Performance Optimization

### 1. Indexes
The schema includes optimized indexes for:
- User lookups
- Product searches
- Order queries
- Analytics queries

### 2. Connection Pooling
For production, consider using:
- **PgBouncer** for connection pooling
- **Prisma Accelerate** for global caching

### 3. Monitoring
Set up monitoring for:
- Query performance
- Connection usage
- Database size
- Slow queries

## Security Best Practices

1. **Use strong passwords**
2. **Limit database user permissions**
3. **Enable SSL connections in production**
4. **Regular security updates**
5. **Backup encryption**
6. **Network security (firewall rules)**

## Next Steps

After setting up the database:

1. **Test the API endpoints**
2. **Seed sample data**
3. **Configure production environment**
4. **Set up monitoring and backups**
5. **Deploy to production**

The database is now ready to support the full OmoOniBag e-commerce platform with all advanced features including search, recommendations, analytics, and multi-language support.


