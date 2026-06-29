const fs = require('fs');

let content = fs.readFileSync('src/app/results/page.tsx', 'utf8');

// 1. Import useRouter
if (!content.includes('import { useRouter }')) {
  content = content.replace(
    'import { useUser } from "@/context/UserContext";',
    'import { useUser } from "@/context/UserContext";\nimport { useRouter } from "next/navigation";'
  );
}

// 2. Add router instance
if (!content.includes('const router = useRouter();')) {
  content = content.replace(
    'export default function ResultsPage() {',
    'export default function ResultsPage() {\n  const router = useRouter();'
  );
}

// 3. Replace onClick
content = content.replace(
  'onClick={() => setSelectedSubmission(res)}',
  'onClick={() => router.push(`/results/${res.id}`)}'
);

// 4. Remove the selectedSubmission state (optional but good for cleanup)
// We'll leave it in case it's used elsewhere, but let's actually just remove the modal rendering.
const modalStartRegex = /\{\/\* Detailed Attempt Review Modal \*\/\}/;
if (modalStartRegex.test(content)) {
  const parts = content.split(modalStartRegex);
  // Keep everything before the modal, and just add the closing fragment and tag
  content = parts[0] + '    </>\n  );\n}\n';
}

fs.writeFileSync('src/app/results/page.tsx', content);
console.log('Updated results/page.tsx successfully!');
