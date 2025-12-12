#!/bin/bash

echo "=========================================="
echo "Building ThinSLICE for Distribution"
echo "=========================================="
echo ""

echo "Step 1: Building static site..."
npm run build

if [ $? -ne 0 ]; then
    echo "Build failed! Please check for errors."
    exit 1
fi

echo ""
echo "Step 2: Ensuring launcher files exist..."
# Files should already be in out/ folder

echo ""
echo "=========================================="
echo "Build Complete!"
echo "=========================================="
echo ""
echo "The 'out' folder is ready to distribute."
echo ""
echo "To create a ZIP file:"
echo "  zip -r ThinSLICE-Standalone.zip out/"
echo ""
echo "Recipients can extract and open index.html directly!"
echo ""

