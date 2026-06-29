const fs = require('fs');

const code = fs.readFileSync('src/app/practice/page.tsx', 'utf8');
const lines = code.split('\n');
const commented = lines.map(l => '// ' + l).join('\n');

const newCode = commented + `

export default function PracticePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-50 text-dark-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Practice Mode Disabled</h1>
        <p className="text-dark-500">This feature is currently under maintenance.</p>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/app/practice/page.tsx', newCode);
console.log('Disabled practice page properly.');
