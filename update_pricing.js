const fs = require('fs');
let content = fs.readFileSync('src/app/pricing/page.tsx', 'utf8');

// Add Script import if not present
if (!content.includes('next/script')) {
  content = content.replace(/import Link from 'next\/link';/, "import Link from 'next/link';\nimport Script from 'next/script';");
}

// Add handlePayment function inside Pricing component
if (!content.includes('handlePayment')) {
  const handler = `
  const handlePayment = async (amount) => {
    try {
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      const data = await res.json();
      
      if (!data.success) {
        alert('Payment initiation failed');
        return;
      }
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_dummy_key_id', // Enter the Key ID generated from the Dashboard
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'WPSI Exam Prep',
        description: 'Test Transaction',
        order_id: data.order.id,
        handler: function (response) {
          alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
        },
        prefill: {
          name: 'Student Name',
          email: 'student@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3b82f6'
        }
      };
      
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any){
        alert('Payment Failed! Reason: ' + response.error.description);
      });
      rzp1.open();
    } catch (error) {
      console.error(error);
      alert('Payment failed');
    }
  };
`;
  content = content.replace(/const \[mobileMenuOpen, setMobileMenuOpen\] = useState\(false\);/, 
    "const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n" + handler);
}

// Inject Razorpay script
if (!content.includes('checkout.razorpay.com')) {
  content = content.replace(/<DynamicNavbar \/>/, 
    "<DynamicNavbar />\n        <Script src=\"https://checkout.razorpay.com/v1/checkout.js\" />");
}

// Replace buttons
// 1. Basic Plan (0)
content = content.replace(/<a href="#"\s+className="block w-full text-center bg-dark-100 hover:bg-dark-200 text-dark-700 font-semibold py-3 rounded-xl transition-colors">Get\s+Started Free<\/a>/,
  '<button onClick={() => alert("Free plan activated!")} className="block w-full text-center bg-dark-100 hover:bg-dark-200 text-dark-700 font-semibold py-3 rounded-xl transition-colors">Get Started Free</button>');

// 2. Pro Scholar (299)
content = content.replace(/<a href="#"\s+className="block w-full text-center bg-white hover:bg-dark-50 text-primary-900 font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl">Claim\s+60% Discount<\/a>/,
  '<button onClick={() => handlePayment(299)} className="block w-full text-center bg-white hover:bg-dark-50 text-primary-900 font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl">Claim 60% Discount</button>');

// 3. Elite Master (999)
content = content.replace(/<a href="#"\s+className="block w-full text-center bg-primary-800 hover:bg-primary-900 text-white font-semibold py-3 rounded-xl transition-colors">Upgrade\s+to Elite<\/a>/,
  '<button onClick={() => handlePayment(999)} className="block w-full text-center bg-primary-800 hover:bg-primary-900 text-white font-semibold py-3 rounded-xl transition-colors">Upgrade to Elite</button>');

fs.writeFileSync('src/app/pricing/page.tsx', content);
console.log('Pricing page updated.');
