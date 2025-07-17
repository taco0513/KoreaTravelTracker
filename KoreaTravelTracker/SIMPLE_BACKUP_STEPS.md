# Simple GitHub Backup Steps

## Step 1: Download Your Project
1. In Replit, go to the **Files** panel on the left
2. Click the **three dots (⋯)** at the top of the Files panel
3. Select **"Download as ZIP"**
4. Save the ZIP file to your computer

## Step 2: Create GitHub Repository
1. Go to **GitHub.com** and sign in
2. Click the **green "New"** button or **"+"** → "New repository"
3. Repository name: `korea-stay-tracker`
4. Description: `Korea Stay Tracker with iOS design and future stays support`
5. Choose **Public** or **Private**
6. **Don't check** "Add a README file" (your project already has one)
7. Click **"Create repository"**

## Step 3: Upload Your Files
GitHub will show you an empty repository page with instructions. You have two options:

### Option A: Upload via GitHub Web Interface (Easiest)
1. On your new repository page, click **"uploading an existing file"**
2. Extract your downloaded ZIP file
3. Drag and drop all the extracted files into GitHub
4. Scroll down and click **"Commit changes"**

### Option B: Use Git Commands (More Professional)
If you have Git installed on your computer:
```bash
# Extract your ZIP file first, then:
cd path/to/your/extracted/project
git init
git add .
git commit -m "Initial backup: Korea Stay Tracker with future stays"
git remote add origin https://github.com/yourusername/korea-stay-tracker.git
git push -u origin main
```

## What You're Backing Up
✅ Complete app with iOS 18 design  
✅ 4-digit passcode protection  
✅ Future and past stay tracking  
✅ Rolling calendar with blue/red indicators  
✅ All source code and documentation  

## After Backup
Your Korea Stay Tracker will be safely stored on GitHub at:
`https://github.com/yourusername/korea-stay-tracker`

You can then deploy it on platforms like Vercel, Railway, or Render using your GitHub repository.