const fs = require('fs');
const path = require('path');

function fixFile(relPath) {
  const fullPath = path.join('c:/Users/HP/Desktop/WPSI/wpsi', relPath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  content = content.replace(/bg-\[#11141d\]/g, 'bg-[var(--bg-primary)]');
  
  content = content.replace(/"#F2ECD9"/g, '"var(--text-primary)"');
  content = content.replace(/"rgba\(255,255,255,0.35\)"/g, '"var(--text-muted)"');
  content = content.replace(/"rgba\(255,255,255,0.4\)"/g, '"var(--text-muted)"');
  content = content.replace(/"rgba\(255,255,255,0.5\)"/g, '"var(--text-secondary)"');
  content = content.replace(/"rgba\(255,255,255,0.55\)"/g, '"var(--text-secondary)"');
  content = content.replace(/"rgba\(255,255,255,0.6\)"/g, '"var(--text-secondary)"');
  content = content.replace(/"rgba\(212,146,42,0.16\)"/g, '"var(--border-accent)"');
  content = content.replace(/"rgba\(212,146,42,0.14\)"/g, '"var(--border-accent)"');
  content = content.replace(/"rgba\(255,255,255,0.06\)"/g, '"var(--input-bg)"');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Fixed', relPath);
}

fixFile('src/components/Topbar.tsx');
fixFile('src/app/practice/page.tsx');
fixFile('src/app/topics/page.tsx');
