const fs = require('fs');
const path = require('path');

function updateFile(filePath, isDashboard) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Add import if not exists
  if (!content.includes("import pricingData from '@/data/pricing.json';")) {
    content = content.replace(/(import Link from 'next\/link';)/, "$1\nimport pricingData from '@/data/pricing.json';");
  }

  // Define the grid replacement regex
  // This looks for <div className="grid md:grid-cols-3... and ends at the closing div of the grid
  const gridStart = '<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">';
  const trustBadgesStart = '{/*  Trust Badges  */}';
  const trustBadgesDashboardStart = '{/* Trust Badges */}';
  
  const trustBadgeString = content.includes(trustBadgesStart) ? trustBadgesStart : trustBadgesDashboardStart;

  const startIndex = content.indexOf(gridStart);
  const endIndex = content.indexOf(trustBadgeString);

  if (startIndex !== -1 && endIndex !== -1) {
    const gridContent = content.substring(startIndex, endIndex);
    
    const newGrid = `<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {pricingData.plans.map((plan, index) => (
                    <div key={plan.id} className={\`rounded-[2.5rem] p-8 border shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative \${plan.isPopular ? 'pricing-popular bg-primary-900 border-2 border-primary-700 text-white' : 'bg-white border-dark-100'}\`}>
                        {plan.isPopular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <span className="badge-shine bg-accent-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">{plan.tag}</span>
                            </div>
                        )}
                        <div className="mb-6 pt-2">
                            <h3 className={\`font-display text-xl font-bold mb-2 \${plan.isPopular ? 'text-white' : 'text-dark-900'}\`}>{plan.name}</h3>
                            <p className={\`text-sm \${plan.isPopular ? 'text-primary-200' : 'text-dark-500'}\`}>{plan.subtitle}</p>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-baseline gap-2">
                                <span className={\`text-4xl font-display font-bold \${plan.isPopular ? 'text-white' : 'text-dark-900'}\`}>{plan.price}</span>
                                <span className={\`text-sm \${plan.isPopular ? 'text-primary-200' : 'text-dark-500'}\`}>{plan.period}</span>
                            </div>
                            {plan.recommendation && <div className="text-xs text-success-400 font-semibold mt-1">{plan.recommendation}</div>}
                        </div>
                        <ul className="space-y-3 mb-8">
                            {plan.features.map((feature, i) => (
                                <li key={i} className={\`flex items-center gap-3 text-sm \${plan.isPopular ? 'text-primary-100' : 'text-dark-600'}\`}>
                                    <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        ${isDashboard ? `
                        <button onClick={() => { if(plan.amount > 0) alert('Handle payment for ' + plan.amount); else alert('Free plan activated!'); }} className={\`block w-full text-center font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl \${plan.isPopular ? 'bg-white hover:bg-dark-50 text-primary-900' : plan.amount > 0 ? 'bg-primary-800 hover:bg-primary-900 text-white' : 'bg-dark-100 hover:bg-dark-200 text-dark-700'}\`}>
                            {plan.buttonText}
                        </button>
                        ` : `
                        <button onClick={() => plan.amount > 0 ? handlePayment(plan.amount) : alert('Free plan activated!')} className={\`block w-full text-center font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl \${plan.isPopular ? 'bg-white hover:bg-dark-50 text-primary-900' : plan.amount > 0 ? 'bg-primary-800 hover:bg-primary-900 text-white' : 'bg-dark-100 hover:bg-dark-200 text-dark-700'}\`}>
                            {plan.buttonText}
                        </button>
                        `}
                        {plan.amount > 0 && <p className={\`text-center text-xs mt-3 \${plan.isPopular ? 'text-primary-300' : 'text-dark-400'}\`}>7-day money-back guarantee</p>}
                    </div>
                ))}
            </div>\n\n            `;
    
    content = content.replace(gridContent, newGrid);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  } else {
    console.log('Could not find grid bounds in', filePath);
  }
}

updateFile(path.join(__dirname, 'src/app/pricing/page.tsx'), false);
updateFile(path.join(__dirname, 'src/app/dashboard/pricing/page.tsx'), true);
