const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = dir + '/' + file;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else if (name.endsWith('.tsx')) {
      files.push(name);
    }
  }
  return files;
}

const files = getFiles('c:/Users/HP/Desktop/WPSI/wpsi/src/app');

files.forEach(fullPath => {
  let content = fs.readFileSync(fullPath, 'utf8');
  let original = content;
  
  // Fix the invalid tailwind opacity modifiers I introduced
  content = content.replace(/text-\[var\(--text-primary\)\]\/50/g, 'text-[var(--text-muted)]');
  content = content.replace(/text-\[var\(--text-primary\)\]\/60/g, 'text-[var(--text-muted)]');
  content = content.replace(/text-\[var\(--text-primary\)\]\/70/g, 'text-[var(--text-secondary)]');
  content = content.replace(/text-\[var\(--text-primary\)\]\/80/g, 'text-[var(--text-secondary)]');
  content = content.replace(/text-\[var\(--text-primary\)\]\/90/g, 'text-[var(--text-primary)]');

  // Also fix var(--bg-primary)/opacity if I did that
  content = content.replace(/bg-\[var\(--bg-primary\)\]\/70/g, 'bg-[var(--bg-primary)]');
  content = content.replace(/bg-\[var\(--bg-primary\)\]\/80/g, 'bg-[var(--bg-primary)]');
  content = content.replace(/bg-\[var\(--bg-primary\)\]\/50/g, 'bg-[var(--bg-primary)]');
  
  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Fixed opacity in', fullPath);
  }
});
