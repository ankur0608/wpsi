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
  content = content.replace(/var\(--glass-card-bg\)\)/g, 'var(--glass-card-bg)');
  fs.writeFileSync(fullPath, content, 'utf8');
});
