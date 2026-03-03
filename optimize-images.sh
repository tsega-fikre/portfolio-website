#!/bin/bash

# Image Optimization Script
# This script optimizes PNG and JPG images for web performance

echo "🚀 Starting image optimization..."

# Check if imagemagick is installed
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick not found. Installing..."
    sudo apt-get update && sudo apt-get install -y imagemagick
fi

# Optimize PNG files
echo "📦 Optimizing PNG files..."
find public/certificates -name "*.png" -type f | while read file; do
    echo "  Processing: $file"
    # Create backup
    cp "$file" "$file.backup"
    # Optimize: reduce quality slightly, strip metadata, progressive
    convert "$file" -strip -quality 85 -define png:compression-level=9 "$file.tmp" && mv "$file.tmp" "$file"
    
    # Get file sizes
    original_size=$(stat -f%z "$file.backup" 2>/dev/null || stat -c%s "$file.backup")
    new_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
    saved=$((original_size - new_size))
    percent=$((saved * 100 / original_size))
    
    echo "    ✓ Saved: $saved bytes ($percent%)"
done

# Optimize JPG files
echo "📦 Optimizing JPG files..."
find public -name "*.jpg" -o -name "*.jpeg" -type f | while read file; do
    echo "  Processing: $file"
    # Create backup
    cp "$file" "$file.backup"
    # Optimize: reduce quality, strip metadata, progressive
    convert "$file" -strip -interlace Plane -quality 80 "$file.tmp" && mv "$file.tmp" "$file"
    
    # Get file sizes
    original_size=$(stat -f%z "$file.backup" 2>/dev/null || stat -c%s "$file.backup")
    new_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
    saved=$((original_size - new_size))
    percent=$((saved * 100 / original_size))
    
    echo "    ✓ Saved: $saved bytes ($percent%)"
done

echo ""
echo "✅ Image optimization complete!"
echo ""
echo "To restore original images, run:"
echo "  find public -name '*.backup' -exec bash -c 'mv \"\$0\" \"\${0%.backup}\"' {} \;"
