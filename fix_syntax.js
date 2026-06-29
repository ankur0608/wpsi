const fs = require('fs');

// Fix 1: src/app/results/[id]/page.tsx
let content1 = fs.readFileSync('src/app/results/[id]/page.tsx', 'utf8');
content1 = content1.replace(/\\`/g, '`');
content1 = content1.replace(/\\\$/g, '$');
fs.writeFileSync('src/app/results/[id]/page.tsx', content1);

// Fix 2: src/app/results/page.tsx
let content2 = fs.readFileSync('src/app/results/page.tsx', 'utf8');
content2 = content2.replace(/href=\{\\`\/results\/\\\$\{selectedSubmission\.id\}\\`\}/g, 'href={`/results/${selectedSubmission.id}`}');
fs.writeFileSync('src/app/results/page.tsx', content2);

// Fix 3: src/app/practice/page.tsx
let content3 = fs.readFileSync('src/app/practice/page.tsx', 'utf8');
// I need to remove the injected `/*` and `*/}` that broke the file.
// The string was `\n  /*` exactly after the early return.
content3 = content3.replace(/\n  \/\*/, ''); // removes the first /*
// Also remove the `*/\n}` at the end
content3 = content3.replace(/\*\/\n\}$/, ''); // removes */\n}
content3 = content3.replace(/\*\/$/, ''); // if it was just */

fs.writeFileSync('src/app/practice/page.tsx', content3);
console.log('Fixed all files');
