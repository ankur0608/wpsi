const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/app/exam/page.tsx',
  'src/app/test/page.tsx',
  'src/app/pricing/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/practice/page.tsx',
  'src/app/topics/page.tsx'
];

filesToFix.forEach(relPath => {
  const fullPath = path.join('c:/Users/HP/Desktop/WPSI/wpsi', relPath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Replace bg-dark-bg with bg-[var(--bg-primary)]
  content = content.replace(/\bbg-dark-bg\b/g, 'bg-[var(--bg-primary)]');
  
  // Replace text-white with text-[var(--text-primary)]
  content = content.replace(/\btext-white\b/g, 'text-[var(--text-primary)]');
  
  // Replace text-slate-400 and text-slate-500 with text-[var(--text-muted)]
  content = content.replace(/\btext-slate-400\b/g, 'text-[var(--text-muted)]');
  content = content.replace(/\btext-slate-500\b/g, 'text-[var(--text-muted)]');
  content = content.replace(/\btext-slate-300\b/g, 'text-[var(--text-secondary)]');
  
  // Replace hardcoded dark card backgrounds
  content = content.replace(/linear-gradient\([^)]+rgba\(\s*20\s*,\s*29\s*,\s*46[^)]*\)[^)]*\)/g, 'var(--glass-card-bg)');
  content = content.replace(/rgba\(\s*20\s*,\s*29\s*,\s*46\s*,\s*0\.[0-9]+\s*\)/g, 'var(--bg-surface)');
  content = content.replace(/rgba\(\s*8\s*,\s*12\s*,\s*24\s*,\s*0\.[0-9]+\s*\)/g, 'var(--input-bg)');
  
  // Also fix "#162436" and "#0D1B2A" string literals just in case
  content = content.replace(/"#162436"/g, '"var(--bg-surface)"');
  content = content.replace(/"#0D1B2A"/g, '"var(--bg-primary)"');
  content = content.replace(/"#F2ECD9"/g, '"var(--text-primary)"');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Fixed', relPath);
});
