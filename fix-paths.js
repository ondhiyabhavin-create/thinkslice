const fs = require('fs');
const path = require('path');

function getRelativePath(fileDir, rootDir) {
  // Resolve and normalize both paths to absolute paths
  const absFileDir = path.resolve(fileDir).toLowerCase();
  const absRootDir = path.resolve(rootDir).toLowerCase();
  
  // If they're the same, return './'
  if (absFileDir === absRootDir) {
    return './';
  }
  
  // Calculate relative path from file directory to root directory
  let relative = path.relative(path.resolve(fileDir), path.resolve(rootDir));
  
  // If relative is empty or '.', return './'
  if (!relative || relative === '.' || relative === '') {
    return './';
  }
  
  // Convert to forward slashes
  relative = relative.split(path.sep).join('/');
  
  // If relative starts with '..', it means we're going up from a subdirectory
  // But if fileDir equals rootDir, we shouldn't have '..'
  // For root files, always return './'
  if (absFileDir === absRootDir || relative.startsWith('..')) {
    // Check if we're actually in a subdirectory or if this is a calculation error
    const fileDirParts = path.resolve(fileDir).split(path.sep).filter(p => p);
    const rootDirParts = path.resolve(rootDir).split(path.sep).filter(p => p);
    
    // If fileDir is a subdirectory of rootDir, use the relative path
    // Otherwise, it's in root, so use './'
    if (fileDirParts.length > rootDirParts.length) {
      return relative.endsWith('/') ? relative : relative + '/';
    } else {
      return './';
    }
  }
  
  // Ensure it ends with '/'
  return relative.endsWith('/') ? relative : relative + '/';
}

function fixPathsInFile(filePath, rootDir) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileDir = path.dirname(filePath);
  const prefix = getRelativePath(fileDir, rootDir);
  
  let fixedContent = content;
  
  // Fix href attributes - must come first
  fixedContent = fixedContent.replace(/href="\/([^"]+)"/g, (match, p1) => {
    return `href="${prefix}${p1}"`;
  });
  
  // Fix src attributes
  fixedContent = fixedContent.replace(/src="\/([^"]+)"/g, (match, p1) => {
    return `src="${prefix}${p1}"`;
  });
  
  // Fix action attributes
  fixedContent = fixedContent.replace(/action="\/([^"]+)"/g, (match, p1) => {
    return `action="${prefix}${p1}"`;
  });
  
  // Fix any remaining absolute paths in JSON or other contexts (but be careful not to break URLs)
  // Only replace /_next/ and other asset paths, not http:// or https://
  fixedContent = fixedContent.replace(/([^"'])\/_next\//g, `$1${prefix}_next/`);
  fixedContent = fixedContent.replace(/([^"'])\/images\//g, `$1${prefix}images/`);
  fixedContent = fixedContent.replace(/([^"'])\/media\//g, `$1${prefix}media/`);
  fixedContent = fixedContent.replace(/([^"'])\/data\//g, `$1${prefix}data/`);
  fixedContent = fixedContent.replace(/([^"'])\/logo\.png/g, `$1${prefix}logo.png`);
  fixedContent = fixedContent.replace(/([^"'])\/footer\.png/g, `$1${prefix}footer.png`);
  
  // Fix any incorrectly created .../ or ../ paths (should be ./ for root files)
  if (prefix === './') {
    fixedContent = fixedContent.replace(/\.\.\.\//g, './');
    // Also fix ../ paths that shouldn't be there for root files
    fixedContent = fixedContent.replace(/href="\.\.\//g, 'href="./');
    fixedContent = fixedContent.replace(/src="\.\.\//g, 'src="./');
  }
  
  fs.writeFileSync(filePath, fixedContent, 'utf8');
  console.log(`Fixed paths in: ${filePath} (prefix: "${prefix}")`);
}

function fixPathsInDirectory(dir, rootDir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip _next directory as it has its own structure
      if (file !== '_next' && file !== 'node_modules') {
        fixPathsInDirectory(filePath, rootDir);
      }
    } else if (file.endsWith('.html')) {
      fixPathsInFile(filePath, rootDir);
    }
  });
}

// Start fixing from the out directory
const outDir = path.join(__dirname, 'out');
if (fs.existsSync(outDir)) {
  console.log('Fixing paths in HTML files...');
  fixPathsInDirectory(outDir, outDir);
  console.log('Done! All paths have been converted to relative paths.');
} else {
  console.error('out directory not found!');
  process.exit(1);
}
