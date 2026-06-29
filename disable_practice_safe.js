const fs = require('fs');
let content = fs.readFileSync('src/app/practice/page.tsx', 'utf8');

// The component is exported as `export default function PracticePage() {`
content = content.replace(
  /export default function PracticePage\(\) \{/,
  `export default function PracticePage() {
  if (true) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-50 text-dark-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Practice Mode Disabled</h1>
          <p className="text-dark-500">This feature is currently under maintenance.</p>
        </div>
      </div>
    );
  }`
);

fs.writeFileSync('src/app/practice/page.tsx', content);
console.log('Practice page successfully disabled with if(true).');
