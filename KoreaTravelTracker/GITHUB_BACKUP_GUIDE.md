# GitHub Backup Guide - Korea Stay Tracker

## Quick Backup Methods

### Method 1: Using Replit's GitHub Integration (Recommended)
1. **Connect to GitHub:**
   - In your Replit project, click the "Version Control" icon in the left sidebar
   - Click "Connect to GitHub" or "Create GitHub Repository"
   - Authorize Replit to access your GitHub account
   - Choose "Create new repository" or "Connect to existing repository"

2. **Repository Setup:**
   - Repository name: `korea-stay-tracker`
   - Description: "Korea Stay Tracker - iOS 18 design with 4-digit passcode protection"
   - Choose Public or Private visibility
   - Click "Create & Connect"

3. **Initial Sync:**
   - Replit will automatically push all your files
   - Your project will be available at: `https://github.com/yourusername/korea-stay-tracker`

### Method 2: Manual Download & Git Setup
1. **Download Project:**
   - In Replit Files panel, click the three dots menu (⋯)
   - Select "Download as ZIP"
   - Extract the ZIP file locally

2. **Create GitHub Repository:**
   - Go to GitHub.com → "New repository"
   - Name: `korea-stay-tracker`
   - Don't initialize with README (your project has one)
   - Copy the repository URL

3. **Local Git Setup:**
   ```bash
   cd path/to/extracted/project
   git init
   git remote add origin https://github.com/yourusername/korea-stay-tracker.git
   git add .
   git commit -m "Initial backup: Korea Stay Tracker with future stays support"
   git push -u origin main
   ```

## What Gets Backed Up

### ✅ Essential Files
- Complete React frontend with iOS 18 design
- Express backend with passcode authentication
- PostgreSQL database schemas
- All configuration files (package.json, vite.config.ts, etc.)
- Documentation and setup guides

### ✅ Key Features Preserved
- 4-digit passcode protection (code: "0513")
- Future and past stay input capability
- Rolling 16-month calendar view
- 183-day visa compliance tracking
- Blue circles for future stays, red for past stays
- Mobile-optimized glassmorphism design

### ❌ Not Included
- node_modules/ (excluded by .gitignore)
- .env files (for security)
- .replit configuration files
- Temporary build files

## After Backup Setup

### Environment Variables for New Deployment
```env
DATABASE_URL=your_postgresql_connection_string
PGDATABASE=your_database_name
PGHOST=your_database_host
PGPASSWORD=your_database_password
PGPORT=5432
PGUSER=your_database_user
SESSION_SECRET=your_session_secret_key
```

### Installation Commands
```bash
# Install dependencies
npm install

# Set up database schema
npm run db:push

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment Options After Backup

### Vercel (Recommended)
- Connect your GitHub repository
- Set environment variables
- Automatic deployment on push

### Railway
- Import from GitHub
- Add PostgreSQL database
- Configure environment variables

### Render
- Connect GitHub repository
- Add PostgreSQL service
- Set environment variables

## Repository Structure
```
korea-stay-tracker/
├── client/                 # React frontend
├── server/                 # Express backend
├── shared/                 # Type definitions
├── package.json           # Dependencies
├── README.md              # Project documentation
├── .gitignore             # Git exclusions
└── documentation files    # Setup guides
```

## Recent Updates Included
- ✅ Future stay input capability added
- ✅ Visual distinction: blue (future) vs red (past) stays
- ✅ Enhanced tooltips for planned vs completed stays
- ✅ Updated form descriptions and validation
- ✅ Comprehensive calendar legend

Your project is ready for professional GitHub backup and can be deployed anywhere that supports Node.js and PostgreSQL!