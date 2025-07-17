# Korea Stay Tracker - replit.md

## Overview

This is a full-stack web application designed to track stays in Korea for visa compliance purposes. The application helps users monitor their 183-day annual limit for tourist stays, providing a dashboard with real-time calculations of days used and remaining in a rolling 365-day period.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Material UI (MUI) with Material Design 3 components
- **Design System**: Google Material Design 3 with Material You color palette
- **Styling**: Material UI sx prop system with custom theme configuration
- **Form Handling**: React Hook Form with Zod validation and Material UI components
- **Authentication**: Replit OpenID Connect integration with session management

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful API endpoints for CRUD operations
- **Development**: Hot module replacement via Vite middleware in development
- **Security**: Replit authentication system protecting all API endpoints
- **Session Management**: PostgreSQL-backed session storage with connect-pg-simple

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL via Neon Database serverless connection
- **Production Storage**: DatabaseStorage implementation using Drizzle ORM
- **Schema**: Simplified table design for stay records with entry/exit date tracking

## Key Components

### Database Schema
```typescript
stays: {
  id: serial (primary key)
  entryDate: date (required)
  exitDate: date (required) 
}
```

### API Endpoints
- `GET /api/stays` - Retrieve all stays
- `GET /api/stays/:id` - Retrieve specific stay
- `POST /api/stays` - Create new stay
- `PUT /api/stays/:id` - Update existing stay (incomplete in current implementation)
- `DELETE /api/stays/:id` - Delete stay (incomplete in current implementation)

### Frontend Components
- **Dashboard Overview**: Real-time stats display with progress indicators
- **Add Stay Form**: Form for creating new stay entries with validation
- **Stays List**: Display and management of existing stays
- **Rolling Calendar**: 16-month view with critical 365-day window highlighting for comprehensive visa tracking
- **Stats Section**: Monthly breakdown and analytics
- **Edit Modal**: For modifying existing stays
- **Unified Interface**: Single view combining dashboard statistics and rolling calendar

### Validation Layer
- **Shared Schema**: Zod schemas in `/shared/schema.ts` for consistent validation
- **Date Validation**: Ensures exit date is after or equal to entry date
- **Rolling Period Calculation**: Tracks 183-day limit within any 365-day period

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **Server Processing**: Express routes handle requests with validation via Zod schemas
3. **Data Storage**: Operations performed through storage abstraction layer
4. **Response**: JSON responses with appropriate HTTP status codes
5. **Client Updates**: Query cache invalidation triggers UI updates

## External Dependencies

### Production Dependencies
- **UI Components**: Material UI (MUI) component library with Material Design 3
- **Database**: Neon Database serverless PostgreSQL
- **Date Handling**: date-fns for date calculations and formatting
- **Form Management**: React Hook Form with Zod resolvers and Material UI integration
- **Styling**: Material UI theming system with custom Material You palette

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **Vite**: Development server and build tool
- **Drizzle Kit**: Database migrations and schema management
- **ESBuild**: Production backend bundling

## Deployment Strategy

### Development Environment
- **Local Server**: Vite dev server on port 5000
- **Hot Reload**: Full-stack hot module replacement
- **Database**: In-memory storage for development
- **Environment**: Configured for Replit development environment

### Production Build
- **Frontend**: Static build to `dist/public` directory
- **Backend**: ESBuild bundle to `dist/index.js`
- **Static Serving**: Express serves built frontend in production
- **Database**: PostgreSQL via DATABASE_URL environment variable
- **Deployment**: Configured for autoscale deployment on Replit

### Key Configuration Files
- `vite.config.ts`: Frontend build configuration with path aliases
- `drizzle.config.ts`: Database configuration and migrations
- `package.json`: Scripts for development, building, and production
- `.replit`: Replit-specific configuration for modules and deployment

## Changelog

```
Changelog:
- June 15, 2025. Initial setup with React/Express stack
- June 15, 2025. Migrated from in-memory to PostgreSQL database storage
- June 15, 2025. Simplified schema to track only entry/exit dates (removed optional fields)
- June 15, 2025. Successfully applied Google Material Design 3 UI transformation
- June 15, 2025. Implemented calendar view with tabbed interface for visual stay tracking
- June 15, 2025. Transformed calendar view into comprehensive year view showing all 12 months
- June 15, 2025. Converted to rolling calendar showing 12-month period ending today for visa compliance
- June 15, 2025. Removed day counting features from rolling calendar for simplified visual tracking
- June 15, 2025. Added light yellow highlighting for critical 365-day visa compliance window ending today
- June 15, 2025. Expanded rolling calendar to show 24 months in 2 rows for comprehensive stay tracking
- June 15, 2025. Adjusted rolling calendar to show 16 months in 4 rows of 4 for optimal viewing
- June 15, 2025. Merged Dashboard and Rolling Calendar tabs into unified single-view interface
- June 15, 2025. Refined calendar visual design: adjusted spacing, repositioned borders to match content width, optimized month label positioning
- June 15, 2025. Updated dashboard progress indicator to show remaining days instead of percentage for better visa compliance tracking
- June 15, 2025. Added warning color theme for remaining days chip when less than 30 days left for enhanced visual alerts
- June 15, 2025. Extended warning theme to entire progress card with background color, border accent, and color adjustments
- June 15, 2025. Implemented bold warning style with full border, gradient background, enhanced shadow, and subtle overlay effects
- June 15, 2025. Repositioned warning card to top of dashboard for maximum visibility when approaching 183-day limit
- June 15, 2025. Adjusted dashboard layout: progress card appears first in normal state, warning card at top in alert state
- June 15, 2025. Removed redundant Alert card component for cleaner dashboard design
- June 15, 2025. Implemented Replit authentication system to secure the application with user login requirement
- June 15, 2025. Added authentication tables (users, sessions) to PostgreSQL database for secure session management
- June 15, 2025. Protected all API endpoints with authentication middleware requiring valid login
- June 15, 2025. Created landing page for unauthorized users with sign-in functionality
- June 15, 2025. Added sign out button to main dashboard for user session management
- June 15, 2025. Applied comprehensive iOS 18 design system transformation with glassmorphism effects
- June 15, 2025. Updated typography to SF Pro Display/Text fonts matching Apple's system fonts
- June 15, 2025. Implemented iOS Blue (#007AFF) color scheme with authentic iOS system colors
- June 15, 2025. Added backdrop blur effects and translucent cards throughout the interface
- June 15, 2025. Enhanced all components with modern iOS-style gradients, shadows, and animations
- June 15, 2025. Optimized mobile layout design with responsive spacing, typography, and touch-friendly interfaces
- June 15, 2025. Fixed calendar view padding and completed stays list iOS transformation with glassmorphism styling
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```