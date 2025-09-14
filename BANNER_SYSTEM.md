# Dynamic Banner System

This document describes the dynamic banner system implemented for the OmoOniBag website.

## Features

- **Multiple Banner Types**: Hero, Product, Announcement, and Promotion banners
- **Auto-sliding**: Banners automatically slide with customizable intervals
- **Admin Management**: Full CRUD operations through the admin panel
- **Priority System**: Control banner display order with priority values
- **Date-based Display**: Set start and end dates for time-sensitive banners
- **Category Filtering**: Organize banners by categories (bags, shoes, new-arrivals, etc.)
- **Responsive Design**: Works seamlessly across all device sizes

## Database Schema

The `Banner` model includes:
- `id`: Unique identifier
- `title`: Banner title (required)
- `subtitle`: Optional subtitle text
- `image`: Image URL (required)
- `link`: Optional link URL
- `linkText`: Optional link button text
- `type`: Banner type (hero, product, announcement, promotion)
- `category`: Optional category for filtering
- `priority`: Display priority (higher numbers appear first)
- `isActive`: Whether the banner is active
- `startDate`: Optional start date for display
- `endDate`: Optional end date for display
- `createdAt`/`updatedAt`: Timestamps

## API Endpoints

### GET /api/banners
- Query parameters: `type`, `category`, `active`
- Returns filtered list of banners ordered by priority and creation date

### POST /api/banners
- Creates a new banner (admin only)
- Requires authentication token

### GET /api/banners/[id]
- Returns a specific banner

### PUT /api/banners/[id]
- Updates a banner (admin only)
- Requires authentication token

### DELETE /api/banners/[id]
- Deletes a banner (admin only)
- Requires authentication token

## Components

### DynamicBanner
The main banner component with auto-sliding functionality:
- Configurable slide interval
- Navigation arrows
- Dot indicators
- Pause on hover
- Auto-play indicator

### HeroBanner
Wrapper component for hero banners that:
- Fetches hero-type banners
- Handles loading states
- Integrates with the banner store

### Admin Interface
Full-featured admin panel at `/admin/banners`:
- Create, edit, delete banners
- Preview banner images
- Set priority and dates
- Toggle active status

## Usage

### Adding Banners via Admin Panel
1. Navigate to `/admin/banners`
2. Click "Add Banner"
3. Fill in the required fields:
   - Title (required)
   - Image URL (required)
   - Type (required)
4. Set optional fields like subtitle, link, category, priority
5. Configure start/end dates if needed
6. Save the banner

### Using Banners in Components
```tsx
import { DynamicBanner } from '@/components/dynamic-banner'

<DynamicBanner
  banners={banners}
  autoSlideInterval={5000}
  showIndicators={true}
  showNavigation={true}
/>
```

### Banner Types
- **hero**: Main homepage banners
- **product**: Product showcase banners
- **announcement**: General announcements
- **promotion**: Sales and promotional content

## State Management

The system uses Zustand for state management with the `useBannerStore`:
- Centralized banner data
- Loading and error states
- CRUD operations
- Automatic cache management

## Styling

Banners use Tailwind CSS classes and follow the design system:
- Consistent with the overall brand aesthetic
- Responsive design patterns
- Smooth animations and transitions
- Accessible color contrasts

## Future Enhancements

Potential improvements:
- Image upload functionality
- Banner templates
- A/B testing capabilities
- Analytics integration
- Multi-language support
- Video banner support
