import { Metadata } from 'next';
import LandingNavbar from '@/components/LandingNavbar';
import LandingFooter from '@/components/LandingFooter';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the Privacy Policy for ExamPro to understand how we collect, use, and protect your personal data.',
};

export default function PrivacyPage() {
  return (
    <div className="relative w-full overflow-x-hidden bg-[#0D1B2A] text-[#F2ECD9]">
      <LandingNavbar />
      <main className="relative pt-28 md:pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-8 text-center">
          Privacy <span className="text-gradient">Policy</span>
        </h1>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <div className="glass-card p-8 rounded-2xl border border-white/5 space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, update your profile, participate in interactive features of our service, or request customer support. This may include your name, email address, phone number, and payment information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p className="mb-2">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our platform and services.</li>
              <li>Process transactions and send related information, including confirmations and receipts.</li>
              <li>Send technical notices, updates, security alerts, and support messages.</li>
              <li>Respond to your comments, questions, and requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Sharing and Security</h2>
            <p>
              We do not share your personal information with third parties except as described in this privacy policy (e.g., with payment processors to process transactions). We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Your Choices</h2>
            <p>
              You may update or correct your account information at any time by logging into your account settings. You can also contact us to request access to, correction of, or deletion of personal information that you have provided to us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Email:</strong> p8166250@gmail.com</li>
              {/* <li><strong>Company:</strong> [Your Legal Company Name]</li> */}
              {/* <li><strong>Address:</strong> [Your Registered Address]</li> */}
            </ul>
          </section>
        </div>
      </div>
      </main>
      <LandingFooter />
    </div>
  );
}
