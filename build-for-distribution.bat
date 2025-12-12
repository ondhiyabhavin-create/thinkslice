@echo off
echo ==========================================
echo Building ThinSLICE for Distribution
echo ==========================================
echo.

echo Step 1: Building static site...
call npm run build
if errorlevel 1 (
    echo Build failed! Please check for errors.
    pause
    exit /b 1
)

echo.
echo Step 2: Copying launcher files...
if not exist "out\START.html" (
    copy /Y "out\START.html" "out\START.html" >nul 2>&1
)
if not exist "out\README.txt" (
    copy /Y "out\README.txt" "out\README.txt" >nul 2>&1
)

echo.
echo ==========================================
echo Build Complete!
echo ==========================================
echo.
echo The 'out' folder is ready to distribute.
echo.
echo To create a ZIP file:
echo 1. Right-click the 'out' folder
echo 2. Select "Send to" > "Compressed (zipped) folder"
echo 3. Rename it to "ThinSLICE-Standalone.zip"
echo.
echo Recipients can extract and open index.html directly!
echo.
pause

