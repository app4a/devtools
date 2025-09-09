#!/usr/bin/env node

/**
 * Test script to simulate GitHub Pages build locally
 * This helps catch issues before deploying
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Testing GitHub Pages build locally...\n');

// Set environment variables to match GitHub Pages
process.env.GITHUB_PAGES = 'true';
process.env.NEXT_PUBLIC_BASE_PATH = 'developer-tools'; // Change this to your repo name

try {
  // Clean previous build
  console.log('🧹 Cleaning previous build...');
  if (fs.existsSync('out')) {
    fs.rmSync('out', { recursive: true });
  }
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true });
  }

  // Run tests
  console.log('🧪 Running tests...');
  execSync('npm test -- --passWithNoTests', { stdio: 'inherit' });

  // Build for GitHub Pages
  console.log('🔨 Building for GitHub Pages...');
  execSync('npm run build', { stdio: 'inherit' });

  // Create .nojekyll file
  console.log('📝 Creating .nojekyll file...');
  fs.writeFileSync('out/.nojekyll', '');

  // Check build output
  console.log('\n✅ Build successful!');
  console.log('\n📊 Build statistics:');
  
  const outDir = path.join(process.cwd(), 'out');
  const files = getAllFiles(outDir);
  
  console.log(`📁 Total files: ${files.length}`);
  console.log(`📦 Total size: ${formatBytes(getTotalSize(files))}`);
  
  // List main pages
  console.log('\n📄 Pages generated:');
  const htmlFiles = files.filter(f => f.endsWith('.html')).slice(0, 10);
  htmlFiles.forEach(file => {
    const relativePath = path.relative(outDir, file);
    console.log(`  - ${relativePath}`);
  });
  
  if (htmlFiles.length < files.filter(f => f.endsWith('.html')).length) {
    console.log(`  ... and ${files.filter(f => f.endsWith('.html')).length - htmlFiles.length} more`);
  }

  // Check for critical files
  console.log('\n🔍 Checking critical files...');
  const criticalFiles = [
    'index.html',
    'sitemap.xml',
    'manifest.json',
    'sw.js',
    '.nojekyll'
  ];
  
  criticalFiles.forEach(file => {
    const exists = fs.existsSync(path.join(outDir, file));
    console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  });

  console.log('\n🎉 GitHub Pages build test completed successfully!');
  console.log('\n💡 To preview locally, run: npx serve out');
  console.log('💡 Your site will be available at the base path configured in next.config.js');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Helper functions
function getAllFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      getAllFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  
  return files;
}

function getTotalSize(files) {
  return files.reduce((total, file) => {
    return total + fs.statSync(file).size;
  }, 0);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
