import { Metadata } from 'next';
import LandingNavbar from '@/components/LandingNavbar';
import LandingFooter from '@/components/LandingFooter';

export const metadata: Metadata = {
  title: 'Shipping and Delivery Policy',
  description: 'Read the Shipping and Delivery Policy for Mcqprepzone digital products.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="relative w-full overflow-x-hidden bg-[#0D1B2A] text-[#F2ECD9]">
      <LandingNavbar />
      <main className="relative pt-28 md:pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-8 text-center">
          Shipping & <span className="text-gradient">Delivery Policy</span>
        </h1>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <div className="glass-card p-8 rounded-2xl border border-white/5 space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Digital Delivery</h2>
            <p>
              [Your Legal Company Name] provides purely digital services, including online test series, mock exams, and digital study materials. Therefore, no physical shipping or delivery of goods takes place.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Access to Purchased Content</h2>
            <p className="mb-2">
              Upon successful processing of your payment, access to your purchased digital content is provided automatically and instantly to your user account on our platform.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You will receive a confirmation email with your purchase details.</li>
              <li>You can access your content immediately by logging into your dashboard.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Delivery Issues</h2>
            <p>
              If you experience any issues accessing the content you have purchased, please ensure that you are logged into the correct account. If the issue persists, please contact our support team immediately so we can resolve the problem.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Contact Us</h2>
            <p>
              For any queries regarding delivery and access to your digital products, reach out to us:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Email:</strong> p8166250@gmail.com</li>
              {/* <li><strong>Company:</strong> [Your Legal Company Name]</li> */}
            </ul>
          </section>
        </div>
      </div>
      </main>
      <LandingFooter />
    </div>
  );
}
