#!/usr/bin/env node

/**
 * Optimization Checker
 * Shows before/after comparison of optimizations
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Checking Optimization Status\n');
console.log('='.repeat(60));

// Check if optimizations have been applied
const checks = {
  lazyImage: {
    name: 'Lazy Loading Component',
    file: 'src/components/LazyImage.jsx',
    status: false
  },
  optimizedMain: {
    name: 'Optimized main.jsx',
    file: 'src/main.jsx',
    check: 'requestIdleCallback',
    status: false
  },
  optimizedVite: {
    name: 'Enhanced Vite Config',
    file: 'vite.config.js',
    check: 'chunkSizeWarningLimit',
    status: false
  },
  optimizedCSS: {
    name: 'Optimized CSS',
    file: 'src/index.css',
    check: 'will-change',
    status: false
  },
  optimizedHTML: {
    name: 'Optimized HTML',
    file: 'index.html',
    check: 'dns-prefetch',
    status: false
  }
};

// Check each optimization
Object.keys(checks).forEach(key => {
  const check = checks[key];
  
  if (fs.existsSync(check.file)) {
    if (check.check) {
      const content = fs.readFileSync(check.file, 'utf8');
      check.status = content.includes(check.check);
    } else {
      check.status = true;
    }
  }
});

// Display results
console.log('\n📋 Code Optimizations:\n');
Object.keys(checks).forEach(key => {
  const check = checks[key];
  const icon = check.status ? '✅' : '❌';
  console.log(`${icon} ${check.name}`);
});

// Check image optimization
console.log('\n📸 Image Optimization:\n');

function getImageStats() {
  const images = [];
  const dirs = ['public', 'public/certificates'];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    
    fs.readdirSync(dir).forEach(file => {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        const hasBackup = fs.existsSync(filePath + '.backup');
        const hasWebP = fs.existsSync(filePath.replace(ext, '.webp'));
        
        images.push({
          name: file,
          size: stats.size,
          optimized: hasBackup,
          webp: hasWebP
        });
      }
    });
  });
  
  return images;
}

const images = getImageStats();
const totalSize = images.reduce((sum, img) => sum + img.size, 0);
const optimizedCount = images.filter(img => img.optimized).length;
const webpCount = images.filter(img => img.webp).length;

console.log(`Total Images: ${images.length}`);
console.log(`Total Size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Optimized: ${optimizedCount}/${images.length} ${optimizedCount === images.length ? '✅' : '⚠️'}`);
console.log(`WebP Created: ${webpCount}/${images.length} ${webpCount === images.length ? '✅' : '⚠️'}`);

if (images.length > 0) {
  console.log('\nLargest Images:');
  images
    .sort((a, b) => b.size - a.size)
    .slice(0, 5)
    .forEach(img => {
      const sizeKB = (img.size / 1024).toFixed(1);
      const status = img.optimized ? '✅' : '⚠️';
      console.log(`  ${status} ${img.name}: ${sizeKB} KB`);
    });
}

// Check build
console.log('\n🏗️  Build Status:\n');

const distExists = fs.existsSync('dist');
console.log(`${distExists ? '✅' : '❌'} Production build exists`);

if (distExists) {
  const distSize = getDirSize('dist');
  console.log(`Build size: ${(distSize / 1024 / 1024).toFixed(2)} MB`);
}

// Recommendations
console.log('\n💡 Recommendations:\n');

const recommendations = [];

if (optimizedCount < images.length) {
  recommendations.push('Run: node optimize-images-simple.js (after npm install sharp)');
}

if (webpCount < images.length) {
  recommendations.push('Create WebP versions for better compression');
}

if (!distExists) {
  recommendations.push('Run: npm run build');
}

const allOptimized = Object.values(checks).every(c => c.status);
if (!allOptimized) {
  recommendations.push('Some code optimizations are missing - check files');
}

if (recommendations.length === 0) {
  console.log('✅ All optimizations applied! Ready to deploy.');
  console.log('\nNext steps:');
  console.log('1. Run: npm run build');
  console.log('2. Test: npm run preview');
  console.log('3. Deploy the dist folder');
} else {
  recommendations.forEach((rec, i) => {
    console.log(`${i + 1}. ${rec}`);
  });
}

console.log('\n' + '='.repeat(60));
console.log('\n📚 For detailed info, see: PERFORMANCE_OPTIMIZATION_REPORT.md\n');

// Helper function
function getDirSize(dirPath) {
  let size = 0;
  
  function traverse(currentPath) {
    if (!fs.existsSync(currentPath)) return;
    
    const items = fs.readdirSync(currentPath);
    items.forEach(item => {
      const fullPath = path.join(currentPath, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        traverse(fullPath);
      } else {
        size += stats.size;
      }
    });
  }
  
  traverse(dirPath);
  return size;
}
