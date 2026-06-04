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
  
  // Replace missing bg-[#...]
  content = content.replace(/bg-\[#0f172a\]/gi, 'bg-[var(--bg-surface)]');
  content = content.replace(/bg-\[#141D2E\]/gi, 'bg-[var(--bg-surface)]');
  content = content.replace(/bg-\[#080C18\]/gi, 'bg-[var(--bg-primary)]');
  content = content.replace(/bg-\[#0D1B2A\]/gi, 'bg-[var(--bg-primary)]');
  content = content.replace(/bg-\[#162436\]/gi, 'bg-[var(--bg-surface)]');
  
  // Replace text-[#...] if any are light/dark specific (but colors like brand usually stay)
  
  // Also any remaining `text-white` without word boundaries just in case
  content = content.replace(/(["'`\s])text-white(["'`\s])/g, '$1text-[var(--text-primary)]$2');
  content = content.replace(/(["'`\s])text-slate-[23]00(["'`\s])/g, '$1text-[var(--text-primary)]$2');
  content = content.replace(/(["'`\s])text-slate-[456]00(["'`\s])/g, '$1text-[var(--text-muted)]$2');

  // Replace text-slate-800 or 900 which might be forced dark text on light mode
  content = content.replace(/(["'`\s])text-slate-[89]00(["'`\s])/g, '$1text-[var(--text-primary)]$2');
  
  // Replace remaining bg-dark-bg
  content = content.replace(/(["'`\s])bg-dark-bg(\/[0-9]+)?(["'`\s])/g, '$1bg-[var(--bg-primary)]$3');
  
  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Fixed', fullPath);
  }
});
