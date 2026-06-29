const fs = require('fs');
let content = fs.readFileSync('src/app/practice/page.tsx', 'utf8');

// Add comment to top
if (!content.startsWith('/*')) {
  content = '/*\n * Practice Page Component\n * Handles the main practice interface including the question palette, timer, and MCQ rendering.\n * Palette Colors Updated:\n * - Answered: bg-green-500\n * - Review: bg-amber-500\n * - Current: bg-blue-500\n * - Not Answered: bg-red-500\n * - Not Attempted: bg-slate-500\n */\n' + content;
}

// Update paletteStyleMap
content = content.replace(/const paletteStyleMap: Record<string, \{ background: string; borderColor: string; color: string \}> = \{[\s\S]*?\};/, 
`const paletteStyleMap: Record<string, { background: string; borderColor: string; color: string }> = {
    's-none':      { background: '#64748b', borderColor: '#475569', color: '#fff' }, // Not Attempted (slate-500)
    's-unanswered':{ background: '#ef4444', borderColor: '#b91c1c', color: '#fff' }, // Not Answered (red-500)
    's-na':        { background: '#64748b', borderColor: '#475569', color: '#fff' }, // Not Attempted
    's-answered':  { background: '#22c55e', borderColor: '#16a34a', color: '#fff' }, // Answered (green-500)
    's-review':    { background: '#f59e0b', borderColor: '#d97706', color: '#fff' }, // Review (amber-500)
  };`);

// The active current is bg-blue-500 (#3b82f6).
// Find the inline styles where this is overridden. We have two occurrences (desktop and mobile)
content = content.replace(/\.\.\.\(active && ps !== 's-review'[^}]+}\),/g, 
  `...(active && ps !== 's-review' && { background: '#3b82f6', color: '#fff', borderColor: '#2563eb' }),`);

content = content.replace(/\.\.\.\(active && ps === 's-review'[^}]+}\),/g, 
  `...(active && ps === 's-review' && { background: '#3b82f6', color: '#fff', borderColor: '#2563eb' }),`); // Current active overrides all with blue

content = content.replace(/\.\.\.\(ps === 's-answered' && !active[^}]+}\),/g, 
  `...(ps === 's-answered' && !active && { background: '#22c55e', color: '#fff', borderColor: '#16a34a' }),`);

content = content.replace(/\.\.\.\(ps === 's-review' && !active[^}]+}\),/g, 
  `...(ps === 's-review' && !active && { background: '#f59e0b', color: '#fff', borderColor: '#d97706' }),`);

content = content.replace(/\.\.\.\(ps === 's-unanswered' && !active[^}]+}\),/g, 
  `...(ps === 's-unanswered' && !active && { background: '#ef4444', color: '#fff', borderColor: '#b91c1c' }),`);

content = content.replace(/\.\.\.\(ps === 's-na' && !active[^}]+}\),/g, 
  `...(ps === 's-na' && !active && { background: '#64748b', color: '#fff', borderColor: '#475569' }),`);

content = content.replace(/\.\.\.\(ps === 's-none' && !active[^}]+}\)/g, 
  `...(ps === 's-none' && !active && { background: '#64748b', color: '#fff', borderColor: '#475569' })`);

fs.writeFileSync('src/app/practice/page.tsx', content);
console.log('Done replacing colors.');
