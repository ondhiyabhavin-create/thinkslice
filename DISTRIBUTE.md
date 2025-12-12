# Distributing ThinSLICE as a Standalone Package

## Option 1: Create a Ready-to-Open ZIP (Recommended)

### Step 1: Build the static site
```bash
npm run build
```

This will create an `out/` folder with all the static files.

### Step 2: Create a simple launcher
Create a file called `START.html` in the `out/` folder with this content:

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=./index.html">
    <title>ThinSLICE</title>
</head>
<body>
    <p>Redirecting to ThinSLICE...</p>
    <p>If you are not redirected, <a href="./index.html">click here</a>.</p>
</body>
</html>
```

### Step 3: Zip the `out/` folder
Zip the entire `out/` folder and name it `ThinSLICE-Standalone.zip`

### Step 4: Instructions for Recipient
Include these instructions:

**To open ThinSLICE:**
1. Extract the ZIP file
2. Open the `out` folder
3. Double-click `index.html` (or `START.html` if included)
4. The site will open in your default browser

**Note:** Some browsers may block local file access. If the site doesn't load properly:
- Use Chrome/Edge and allow local file access, OR
- Use a simple HTTP server (see Option 2)

## Option 2: Include a Simple HTTP Server (Best Experience)

For the best experience, include a simple HTTP server script that recipients can double-click.

### For Windows: Create `start-server.bat`
```batch
@echo off
echo Starting ThinSLICE...
cd out
python -m http.server 8000
pause
```

### For Mac/Linux: Create `start-server.sh`
```bash
#!/bin/bash
cd out
python3 -m http.server 8000
```

Then recipients can:
1. Extract the ZIP
2. Double-click `start-server.bat` (Windows) or `start-server.sh` (Mac/Linux)
3. Open browser to `http://localhost:8000`

## Option 3: Use a Portable Server Tool

Include a portable HTTP server like `http-server` (Node.js) or use Python's built-in server (requires Python installed).

## Quick Build Script

Create `build-for-distribution.bat` (Windows) or `build-for-distribution.sh` (Mac/Linux):

**Windows version:**
```batch
@echo off
echo Building ThinSLICE for distribution...
call npm run build
echo.
echo Build complete! The 'out' folder is ready to zip and distribute.
echo.
pause
```

This makes it easy to rebuild before distributing.

