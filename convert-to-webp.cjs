#!/usr/bin/env node

/**
 * Image to WebP Converter
 * Converts PNG/JPG images to WebP format for better performance
 * Run: node convert-to-webp.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = './public';
const imageExtensions = ['.png', '.jpg', '.jpeg'];

console.log('🚀 Converting images to WebP format...\n');

// Check if cwebp is installed
try {
  execSync('which cwebp', { stdio: 'ignore' });
} catch (error) {
  console.log('⚠️  cwebp not found. Install with:');
  console.log('   sudo apt-get install webp');
  console.log('   or brew install webp (macOS)');
  process.exit(1);
}

function findImages(dir) {
  const files = [];
  
  function traverse(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    items.forEach(item => {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else {
        const ext = path.extname(item).toLowerCase();
        if (imageExtensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    });
  }
  
  traverse(dir);
  return files;
}

function convertToWebP(imagePath) {
  const ext = path.extname(imagePath);
  const webpPath = imagePath.replace(ext, '.webp');
  
  // Skip if WebP already exists
  if (fs.existsSync(webpPath)) {
    console.log(`  ⏭️  Skipping (already exists): ${webpPath}`);
    return;
  }
  
  try {
    const quality = ext === '.png' ? 90 : 80;
    execSync(`cwebp -q ${quality} "${imagePath}" -o "${webpPath}"`, { stdio: 'ignore' });
    
    const originalSize = fs.statSync(imagePath).size;
    const webpSize = fs.statSync(webpPath).size;
    const saved = originalSize - webpSize;
    const percent = Math.round((saved / originalSize) * 100);
    
    console.log(`  ✓ ${imagePath}`);
    console.log(`    → ${webpPath}`);
    console.log(`    💾 Saved: ${(saved / 1024).toFixed(1)}KB (${percent}%)\n`);
  } catch (error) {
    console.error(`  ❌ Error converting ${imagePath}:`, error.message);
  }
}

// Find and convert all images
const images = findImages(publicDir);
console.log(`Found ${images.length} images to convert\n`);

images.forEach(convertToWebP);

console.log('✅ WebP conversion complete!');
console.log('\n📝 Next steps:');
console.log('1. Update your components to use WebP images with fallbacks');
console.log('2. Example: <picture>');
console.log('     <source srcSet="image.webp" type="image/webp" />');
console.log('     <img src="image.jpg" alt="..." />');
console.log('   </picture>');
