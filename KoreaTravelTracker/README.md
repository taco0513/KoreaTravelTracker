# Korea Stay Tracker

A comprehensive web application for tracking international stays in Korea, featuring advanced monitoring and visualization of travel regulations through an intuitive, mobile-responsive interface with iOS 18 design language.

## Features

- **Visa Compliance Tracking**: Monitor 183-day annual limit within rolling 365-day periods
- **4-Digit Passcode Protection**: Secure access with numeric keypad (code: "0513")
- **iOS 18 Design**: Complete Apple design system with glassmorphism effects
- **Rolling Calendar**: 16-month view with critical window highlighting
- **Real-time Calculations**: Automatic compliance monitoring and warnings
- **Mobile Optimized**: Touch-friendly interface with responsive design
- **Stay Management**: Add, edit, and delete stay records with date validation

## Tech Stack

- **Frontend**: React 18, TypeScript, Material UI, iOS design system
- **Backend**: Express.js, TypeScript, RESTful API
- **Database**: PostgreSQL with Drizzle ORM
- **Build Tool**: Vite with hot module replacement
- **Styling**: Material UI with custom iOS theming

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation
```bash
# Clone repository
git clone <your-repo-url>
cd korea-stay-tracker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Push database schema
npm run db:push

# Start development server
npm run dev
```

### Environment Variables
```
DATABASE_URL=postgresql://username:password@host:port/database
PGDATABASE=your_database_name
PGHOST=your_host
PGPASSWORD=your_password
PGPORT=5432
PGUSER=your_username
SESSION_SECRET=your_secret_key
```

## Usage

1. **Access**: Enter passcode "0513" on the numeric keypad
2. **Add Stays**: Use the form to record entry and exit dates
3. **Monitor Compliance**: Check dashboard for remaining days and warnings
4. **View Calendar**: Navigate through the 16-month rolling calendar
5. **Track Progress**: Monitor the critical 365-day window highlighted in yellow

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and helpers
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data access layer
│   └── db.ts             # Database connection
├── shared/               # Shared types and schemas
└── package.json         # Project configuration
```

## API Endpoints

- `GET /api/stays` - Get all stays
- `POST /api/stays` - Create new stay
- `PUT /api/stays/:id` - Update stay
- `DELETE /api/stays/:id` - Delete stay

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Database operations
npm run db:push     # Apply schema changes
npm run db:studio   # Open database studio

# Type checking
npm run type-check
```

## Deployment

The application is configured for multiple deployment platforms:

- **Replit**: Ready for Replit Deployments
- **Vercel**: Compatible with serverless deployment
- **Railway**: PostgreSQL-friendly platform
- **Render**: Full-stack application hosting

## License

Private project for personal visa compliance tracking.

## Support

For questions or issues, refer to the comprehensive documentation in `replit.md` and `GIT_TRANSFER_GUIDE.md`.