# Git Export Instructions for Korea Stay Tracker

## Step-by-Step Git Setup

### 1. Create Your Git Repository
1. Go to GitHub, GitLab, or your preferred Git platform
2. Create a new repository named `korea-stay-tracker`
3. Copy the repository URL (e.g., `https://github.com/yourusername/korea-stay-tracker.git`)

### 2. Download Project Files
You need to download/copy these files from your Replit project:

#### Essential Files to Copy:
```
📁 client/                 (entire folder)
📁 server/                 (entire folder) 
📁 shared/                 (entire folder)
📄 package.json
📄 package-lock.json
📄 tsconfig.json
📄 vite.config.ts
📄 tailwind.config.ts
📄 postcss.config.js
📄 drizzle.config.ts
📄 components.json
📄 .gitignore
📄 README.md
📄 replit.md
📄 GIT_TRANSFER_GUIDE.md
```

#### Files to SKIP (don't copy):
```
❌ .replit
❌ .replit.json
❌ .breakpoints
❌ node_modules/
❌ dist/
❌ .env files
```

### 3. Local Git Setup Commands
Once you have the files in a local folder:

```bash
# Navigate to your project folder
cd path/to/your/korea-stay-tracker

# Initialize Git repository
git init

# Add remote repository
git remote add origin https://github.com/yourusername/korea-stay-tracker.git

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Korea Stay Tracker with iOS 18 design and passcode protection"

# Push to GitHub
git push -u origin main
```

### 4. Environment Setup for New Location
Create a `.env` file in your new location:

```env
DATABASE_URL=your_postgresql_connection_string
PGDATABASE=your_database_name
PGHOST=your_database_host
PGPASSWORD=your_database_password
PGPORT=5432
PGUSER=your_database_user
SESSION_SECRET=your_session_secret_key
```

### 5. Install and Run
```bash
# Install dependencies
npm install

# Set up database schema
npm run db:push

# Start development server
npm run dev
```

## Alternative: Use Replit's Git Integration

### Option A: Fork to GitHub via Replit
1. In your Replit project, click the version control icon
2. Select "Create GitHub repository"
3. Follow the prompts to sync with GitHub

### Option B: Download as ZIP
1. In Replit, go to Files panel
2. Click the three dots menu
3. Select "Download as ZIP"
4. Extract and follow local setup steps above

## Deployment Options After Git Setup

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically

### Railway
1. Connect GitHub repository
2. Add PostgreSQL database
3. Set environment variables
4. Deploy

### Render
1. Connect GitHub repository
2. Choose "Web Service" 
3. Add PostgreSQL database
4. Configure environment variables

## Key Features Preserved
✅ 4-digit passcode protection (code: "0513")
✅ iOS 18 glassmorphism design
✅ Rolling 16-month calendar view
✅ 183-day visa compliance tracking
✅ PostgreSQL data persistence
✅ Mobile-optimized interface

## Support
- Complete documentation in `replit.md`
- Setup guide in `GIT_TRANSFER_GUIDE.md`
- Technical details in `README.md`

Your project is ready for professional Git management and deployment!