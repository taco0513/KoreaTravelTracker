# Korea Stay Tracker - Git Transfer Guide

## Project Overview
This is a complete Korea Stay Tracker application with iOS 18 design and 4-digit passcode protection. The app tracks visa compliance for the 183-day annual limit with a rolling calendar view.

## Technology Stack
- **Frontend**: React 18 + TypeScript + Material UI + iOS 18 Design
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL (Neon Database)
- **Authentication**: 4-digit passcode system (code: "0513")
- **Build Tool**: Vite
- **ORM**: Drizzle ORM

## Files to Include in Git Repository

### Essential Project Files
```
├── client/                 # Frontend React application
├── server/                 # Backend Express server
├── shared/                 # Shared types and schemas
├── package.json           # Dependencies and scripts
├── package-lock.json      # Dependency lock file
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── drizzle.config.ts      # Database configuration
├── components.json        # UI components configuration
├── replit.md             # Project documentation
└── GIT_TRANSFER_GUIDE.md # This guide
```

### Files to Exclude (.gitignore)
```
# Dependencies
node_modules/
.npm
.yarn

# Build outputs
dist/
build/

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Dependency directories
node_modules/

# Optional npm cache directory
.npm

# ESLint cache
.eslintcache

# Replit files
.replit
.replit.json
.breakpoints

# Database
*.db
*.sqlite

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

## Setup Instructions for New Repository

### 1. Create Repository
1. Create a new repository on GitHub/GitLab/etc.
2. Clone it locally: `git clone <your-repo-url>`

### 2. Copy Project Files
Copy all the project files (excluding those in .gitignore) to your new repository.

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup
1. Set up a PostgreSQL database (Neon Database recommended)
2. Add DATABASE_URL to your environment variables
3. Run database migrations: `npm run db:push`

### 5. Environment Variables
Create a `.env` file with:
```
DATABASE_URL=your_postgresql_connection_string
PGDATABASE=your_db_name
PGHOST=your_db_host
PGPASSWORD=your_db_password
PGPORT=5432
PGUSER=your_db_user
SESSION_SECRET=your_session_secret
```

### 6. Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Database operations
npm run db:push     # Apply schema changes
npm run db:studio   # Open database studio
```

## Key Features
- ✅ 4-digit passcode protection (code: "0513")
- ✅ iOS 18 glassmorphism design
- ✅ Rolling 16-month calendar view
- ✅ 183-day visa limit tracking
- ✅ Stay entry/exit date management
- ✅ Real-time compliance calculations
- ✅ Mobile-optimized interface
- ✅ PostgreSQL data persistence

## Deployment Options
- **Replit**: Ready for Replit Deployments
- **Vercel**: Compatible with Vercel deployment
- **Netlify**: Can be deployed with serverless functions
- **Railway**: PostgreSQL-friendly deployment platform
- **Render**: Full-stack application deployment

## Important Notes
- The passcode is hardcoded as "0513" in the application
- Database schema includes users and sessions tables (though only sessions is used)
- All API endpoints are protected by the passcode system
- The app tracks stays within rolling 365-day periods
- Calendar shows 16 months ending 2 months after today by default

## Contact & Support
This application was built for Korea visa compliance tracking with a focus on the 183-day annual limit rule.