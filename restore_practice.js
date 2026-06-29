const fs = require('fs');

const code = fs.readFileSync('src/app/practice/page.tsx', 'utf8');
const lines = code.split('\n');

// The dummy component is at the end, starting with "export default function PracticePage() {"
// Let's filter out the dummy component and remove the "// " prefix from the original lines.

let originalCodeLines = [];
let dummyFound = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.trim() === 'export default function PracticePage() {' && line.indexOf('//') === -1) {
    dummyFound = true;
    break;
  }
  
  // Only remove prefix if it starts with "// " (which is what we added)
  if (line.startsWith('// ')) {
    originalCodeLines.push(line.substring(3));
  } else if (line === '//') { // Empty lines became just "//"
    originalCodeLines.push('');
  } else {
    originalCodeLines.push(line);
  }
}

const restoredCode = originalCodeLines.join('\n');
fs.writeFileSync('src/app/practice/page.tsx', restoredCode);
console.log('Restored original practice page code successfully.');
