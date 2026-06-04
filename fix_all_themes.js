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
  
  // Replace text colors
  content = content.replace(/\btext-white\b/g, 'text-[var(--text-primary)]');
  content = content.replace(/\btext-slate-200\b/g, 'text-[var(--text-primary)]');
  content = content.replace(/\btext-slate-300\b/g, 'text-[var(--text-secondary)]');
  content = content.replace(/\btext-slate-400\b/g, 'text-[var(--text-muted)]');
  content = content.replace(/\btext-slate-500\b/g, 'text-[var(--text-muted)]');
  
  // Replace backgrounds
  content = content.replace(/\bbg-dark-bg\/[0-9]+\b/g, 'bg-[var(--bg-surface)]');
  content = content.replace(/\bbg-dark-bg\b/g, 'bg-[var(--bg-primary)]');
  content = content.replace(/\bbg-\[#0f172a\]\b/g, 'bg-[var(--bg-surface)]');
  
  // Replace border colors (common tailwind)
  content = content.replace(/\bborder-white\/[0-9]+\b/g, 'border-[var(--border-subtle)]');
  
  // Replace hardcoded inline styles
  content = content.replace(/"rgba\(242,236,217,0\.8\)"/g, 'MUTED');
  content = content.replace(/'rgba\(242,236,217,0\.8\)'/g, 'MUTED');
  content = content.replace(/"rgba\(255,255,255,0\.05\)"/g, '"var(--glass-card-bg)"');
  content = content.replace(/'rgba\(255,255,255,0\.05\)'/g, '"var(--glass-card-bg)"');
  content = content.replace(/"rgba\(255,255,255,0\.03\)"/g, '"var(--bg-surface)"');
  content = content.replace(/'rgba\(255,255,255,0\.03\)'/g, '"var(--bg-surface)"');
  content = content.replace(/"rgba\(255,255,255,0\.1\)"/g, '"var(--border-subtle)"');
  content = content.replace(/'rgba\(255,255,255,0\.1\)'/g, '"var(--border-subtle)"');
  content = content.replace(/"linear-gradient\(165deg, #141D2E, #080C18\)"/g, '"var(--glass-card-bg)"');
  content = content.replace(/'linear-gradient\(165deg, #141D2E, #080C18\)'/g, '"var(--glass-card-bg)"');
  
  // Remove duplicate parenthesis just in case
  content = content.replace(/var\(--glass-card-bg\)\)/g, 'var(--glass-card-bg)');
  
  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Fixed', fullPath);
  }
});
