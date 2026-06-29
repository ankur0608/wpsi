const fs = require('fs');
let content = fs.readFileSync('src/app/practice/page.tsx', 'utf8');

// Replace the literal \n with an actual newline
content = content.replace('// @ts-nocheck\\n', '// @ts-nocheck\n');
content = content.replace('// @ts-nocheck\n\n/*', '// @ts-nocheck\n/*');

fs.writeFileSync('src/app/practice/page.tsx', content);
