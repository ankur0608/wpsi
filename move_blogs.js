const fs = require('fs');
const path = require('path');

const appDir = path.join('src', 'app');
const blogDir = path.join(appDir, 'blog');

if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir);
}

// Move directories
const dirs = fs.readdirSync(appDir).filter(f => f.startsWith('blog-'));
for (const dir of dirs) {
  const oldPath = path.join(appDir, dir);
  if (fs.statSync(oldPath).isDirectory()) {
    const newName = dir.replace('blog-', '');
    const newPath = path.join(blogDir, newName);
    console.log(`Moving ${oldPath} to ${newPath}`);
    fs.renameSync(oldPath, newPath);
  }
}

// Also update hrefs in all page.tsx files
function updateHrefs(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            updateHrefs(fullPath);
        } else if (file.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = content.replace(/href="\/blog-/g, 'href="/blog/');
            
            // Fix DynamicNavbar active states if any
            if (content !== updated) {
                fs.writeFileSync(fullPath, updated, 'utf8');
                console.log(`Updated hrefs in ${fullPath}`);
            }
        }
    }
}

updateHrefs(appDir);
console.log('Done!');
