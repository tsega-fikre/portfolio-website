#!/usr/bin/env node

/**
 * Simple Image Optimizer
 * Uses sharp (pure Node.js) - no external dependencies needed
 * Run: npm install sharp && node optimize-images-simple.js
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is installed
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.log('📦 Installing sharp for image optimization...');
  console.log('Run: npm install --save-dev sharp');
  console.log('Then run this script again.');
  process.exit(1);
}

const publicDir = './public';
const imageExtensions = ['.png', '.jpg', '.jpeg'];

console.log('🚀 Optimizing images with sharp...\n');

function findImages(dir) {
  const files = [];
  
  function traverse(currentPath) {
    if (!fs.existsSync(currentPath)) return;
    
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

async function optimizeImage(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  const backupPath = imagePath + '.backup';
  
  // Skip if already optimized
  if (fs.existsSync(backupPath)) {
    console.log(`  ⏭️  Already optimized: ${imagePath}`);
    return;
  }
  
  try {
    // Create backup
    fs.copyFileSync(imagePath, backupPath);
    
    const originalSize = fs.statSync(imagePath).size;
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    // Optimize based on format
    if (ext === '.png') {
      await image
        .png({ 
          quality: 85, 
          compressionLevel: 9,
          adaptiveFiltering: true,
          palette: true
        })
        .toFile(imagePath + '.tmp');
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await image
        .jpeg({ 
          quality: 80, 
          progressive: true,
          mozjpeg: true
        })
        .toFile(imagePath + '.tmp');
    }
    
    // Also create WebP version
    const webpPath = imagePath.replace(ext, '.webp');
    await sharp(imagePath)
      .webp({ quality: ext === '.png' ? 90 : 80 })
      .toFile(webpPath);
    
    // Replace original with optimized
    fs.renameSync(imagePath + '.tmp', imagePath);
    
    const newSize = fs.statSync(imagePath).size;
    const webpSize = fs.statSync(webpPath).size;
    const saved = originalSize - newSize;
    const webpSaved = originalSize - webpSize;
    const percent = Math.round((saved / originalSize) * 100);
    const webpPercent = Math.round((webpSaved / originalSize) * 100);
    
    console.log(`  ✓ ${imagePath}`);
    console.log(`    Original: ${(originalSize / 1024).toFixed(1)}KB`);
    console.log(`    Optimized: ${(newSize / 1024).toFixed(1)}KB (saved ${percent}%)`);
    console.log(`    WebP: ${(webpSize / 1024).toFixed(1)}KB (saved ${webpPercent}%)`);
    console.log('');
  } catch (error) {
    console.error(`  ❌ Error optimizing ${imagePath}:`, error.message);
    // Restore backup if optimization failed
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, imagePath);
      fs.unlinkSync(backupPath);
    }
  }
}

async function main() {
  const images = findImages(publicDir);
  console.log(`Found ${images.length} images to optimize\n`);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  for (const imagePath of images) {
    await optimizeImage(imagePath);
  }
  
  console.log('✅ Image optimization complete!');
  console.log('\n📝 To restore originals:');
  console.log('  find public -name "*.backup" -exec bash -c \'mv "$0" "${0%.backup}"\' {} \\;');
  console.log('\n🚀 Next: Run "npm run build" to build optimized site');
}

main().catch(console.error);
