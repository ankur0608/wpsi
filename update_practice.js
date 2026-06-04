const fs = require('fs');

let content = fs.readFileSync('src/app/practice/page.tsx', 'utf8');

const targetStr1 = `let url = '/api/practice-mcqs?limit=500&page=1';\r\n      const subject = searchParams.get('subject');`;
const targetStr2 = `let url = '/api/practice-mcqs?limit=500&page=1';\n      const subject = searchParams.get('subject');`;

const newStr = `const testId = searchParams.get('testId');
      let url = testId ? \`/api/mock-tests/\${testId}/questions\` : '/api/practice-mcqs?limit=500&page=1';
      const subject = searchParams.get('subject');`;

if (content.includes(targetStr1)) {
    content = content.replace(targetStr1, newStr);
    fs.writeFileSync('src/app/practice/page.tsx', content);
    console.log("Replaced with CRLF");
} else if (content.includes(targetStr2)) {
    content = content.replace(targetStr2, newStr);
    fs.writeFileSync('src/app/practice/page.tsx', content);
    console.log("Replaced with LF");
} else {
    console.log("Target string not found!");
}
