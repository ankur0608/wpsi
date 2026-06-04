const fs = require('fs');

// Fix pricing page
const pricingPath = 'c:/Users/HP/Desktop/WPSI/wpsi/src/app/pricing/page.tsx';
let pricingContent = fs.readFileSync(pricingPath, 'utf8');
pricingContent = pricingContent.replace(/text-slate-100/g, 'text-[var(--text-secondary)]');
fs.writeFileSync(pricingPath, pricingContent, 'utf8');
console.log('Fixed pricing/page.tsx');

// Fix practice page
const practicePath = 'c:/Users/HP/Desktop/WPSI/wpsi/src/app/practice/page.tsx';
let practiceContent = fs.readFileSync(practicePath, 'utf8');

practiceContent = practiceContent.replace(/'#1E293B'/g, '"var(--bg-primary)"');
practiceContent = practiceContent.replace(/bg-\[#1E293B\]/g, 'bg-[var(--bg-primary)]');
practiceContent = practiceContent.replace(/'#94a3b8'/g, '"var(--text-muted)"');
practiceContent = practiceContent.replace(/'#475569'/g, '"var(--bg-surface)"');
practiceContent = practiceContent.replace(/bg-\[#475569\]/g, 'bg-[var(--bg-surface)]');

fs.writeFileSync(practicePath, practiceContent, 'utf8');
console.log('Fixed practice/page.tsx');
