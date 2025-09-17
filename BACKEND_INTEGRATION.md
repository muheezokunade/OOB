# Backend Integration Guide

This document outlines the backend integration features that have been implemented and provides guidance for further development.

## 🚀 Implemented Features

### 1. API Endpoints

#### Products API
- `GET /api/products` - Get all products with filtering, sorting, and pagination
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

#### Orders API
- `GET /api/orders` - Get user orders with filtering and pagination
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get single order
- `PUT /api/orders/[id]` - Update order status (admin only)

#### Users API
- `POST /api/users` - Register new user
- `GET /api/users` - Get user profile (authenticated)
- `POST /api/users/login` - User login

#### Cart API
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item
- `DELETE /api/cart` - Clear cart

#### Wishlist API
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist` - Add item to wishlist
- `DELETE /api/wishlist` - Remove item from wishlist

#### Email API
- `POST /api/email` - Send emails (order confirmations, newsletters, etc.)

#### Newsletter API
- `POST /api/newsletter` - Subscribe to newsletter
- `GET /api/newsletter` - Get subscribers (admin only)
- `DELETE /api/newsletter` - Unsubscribe from newsletter

#### Upload API
- `POST /api/upload` - Upload images
- `GET /api/upload` - Get uploaded files (admin only)

### 2. Authentication & Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes for admin operations
- Input validation and sanitization

### 3. Email Service Integration

- Nodemailer integration for SMTP
- Email templates for:
  - Order confirmations
  - Order shipped notifications
  - Order delivered notifications
  - Newsletter emails

### 4. File Upload System

- Image upload with validation
- File type and size restrictions
- Organized file storage structure
- Support for different upload types (products, banners, etc.)

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env.local` and configure:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=omo_oni_bag
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Payment Gateway Configuration
PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key
```

### Dependencies

The following packages have been installed:

```json
{
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "nodemailer": "^6.9.7",
  "@types/bcryptjs": "^2.4.6",
  "@types/jsonwebtoken": "^9.0.5",
  "@types/nodemailer": "^6.4.14"
}
```

## 🗄️ Database Integration

### Current State
- Mock data storage in memory
- TypeScript interfaces defined for all data models
- Database utility class prepared for integration

### Next Steps for Database Integration

1. **Choose Database Solution:**
   - PostgreSQL (recommended for production)
   - MySQL
   - MongoDB
   - Supabase (PostgreSQL with real-time features)

2. **Install Database Client:**
   ```bash
   # For PostgreSQL
   npm install pg @types/pg
   
   # For MySQL
   npm install mysql2 @types/mysql2
   
   # For MongoDB
   npm install mongodb mongoose
   ```

3. **Update Database Class:**
   - Implement actual database queries
   - Add connection pooling
   - Add transaction support
   - Add migration system

### Database Schema

The following tables/collections are defined:

- **products** - Product catalog
- **users** - User accounts
- **orders** - Order management
- **order_items** - Order line items
- **carts** - Shopping carts
- **cart_items** - Cart line items
- **wishlists** - User wishlists
- **wishlist_items** - Wishlist items
- **addresses** - User addresses
- **newsletter_subscribers** - Newsletter subscriptions
- **reviews** - Product reviews

## 📧 Email Service Setup

### Gmail SMTP Setup

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the app password in your environment variables

### Email Templates

Email templates are included for:
- Order confirmations
- Shipping notifications
- Delivery confirmations
- Newsletter emails

## 💳 Payment Gateway Integration

### Paystack Integration

1. Create Paystack account
2. Get API keys from dashboard
3. Configure environment variables
4. Implement payment processing in order creation

### Flutterwave Integration

1. Create Flutterwave account
2. Get API keys from dashboard
3. Configure environment variables
4. Implement payment processing

## 🖼️ Image Upload System

### File Structure
```
public/
  uploads/
    products/     # Product images
    banners/      # Banner images
    avatars/      # User avatars
    general/      # General uploads
```

### Security Features
- File type validation
- File size limits (5MB default)
- Unique filename generation
- Organized storage structure

## 🔍 Enhanced Features (To Implement)

### 1. Product Search & Filtering
- Full-text search implementation
- Advanced filtering options
- Search suggestions
- Search analytics

### 2. Recently Viewed Products
- Track user product views
- Store in localStorage or database
- Display on user dashboard

### 3. Product Recommendations
- Collaborative filtering
- Content-based recommendations
- Machine learning integration

### 4. SEO Optimizations
- Meta tags for products
- Structured data (JSON-LD)
- Sitemap generation
- URL optimization

### 5. Analytics Integration
- Google Analytics 4
- Facebook Pixel
- Custom event tracking
- Conversion tracking

### 6. Social Media Integration
- Social login (Google, Facebook)
- Social sharing
- Instagram feed integration
- Social proof widgets

### 7. Multi-language Support
- i18n implementation
- Language switching
- Localized content
- RTL support

## 🚀 Deployment Considerations

### Production Checklist

1. **Database:**
   - Set up production database
   - Configure connection pooling
   - Set up backups
   - Monitor performance

2. **Email Service:**
   - Use production SMTP service
   - Set up email monitoring
   - Configure bounce handling

3. **File Storage:**
   - Use cloud storage (AWS S3, Cloudinary)
   - Set up CDN
   - Configure image optimization

4. **Security:**
   - Use HTTPS
   - Configure CORS
   - Set up rate limiting
   - Enable security headers

5. **Monitoring:**
   - Set up error tracking
   - Configure logging
   - Set up performance monitoring
   - Configure alerts

## 📚 API Documentation

### Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Success message",
  "error": "Error message (if success: false)"
}
```

### Error Handling

- 400: Bad Request (validation errors)
- 401: Unauthorized (authentication required)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 409: Conflict (duplicate resource)
- 500: Internal Server Error

## 🔄 Next Steps

1. **Database Integration:**
   - Choose and set up database
   - Implement database queries
   - Add migration system

2. **Payment Processing:**
   - Integrate payment gateways
   - Implement webhook handling
   - Add payment status tracking

3. **Enhanced Features:**
   - Implement search functionality
   - Add recommendation system
   - Set up analytics

4. **Production Deployment:**
   - Set up CI/CD pipeline
   - Configure production environment
   - Set up monitoring and logging

This backend integration provides a solid foundation for the OmoOniBag e-commerce platform and can be extended based on specific business requirements.





