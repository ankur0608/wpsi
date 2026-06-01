import { Metadata } from 'next';
import LandingNavbar from '@/components/LandingNavbar';
import LandingFooter from '@/components/LandingFooter';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Read the Terms and Conditions for Mcpprepzone. Understand our policies regarding user accounts, subscriptions, mock test usage, content ownership, and dispute resolution for our government exam preparation platform.',
};

export default function TermsPage() {
  return (
    <div className="relative w-full overflow-x-hidden bg-[#0D1B2A] text-[#F2ECD9]">
      <LandingNavbar />
      <main className="relative pt-28 md:pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-8 text-center">
          Terms and <span className="text-gradient">Conditions</span>
        </h1>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          Please read these terms carefully before using the Mcpprepzone platform for your competitive exam preparation.
        </p>

        <div className="glass-card p-8 rounded-2xl border border-white/5 space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Mcpprepzone ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you are prohibited from using or accessing this site. The materials contained in this Platform are protected by applicable copyright and trademark law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. User Accounts</h2>
            <p className="mb-2">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
            </p>
            <p>
              You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
            <p>
              The Platform and its original content (including mock tests, MCQs, study notes, and AI algorithms), features, and functionality are and will remain the exclusive property of Mcpprepzone and its licensors. Content is intended solely for personal, non-commercial use in preparing for government exams like Wireless PSI, GPSC, and Talati.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Subscriptions and Refunds</h2>
            <p>
              Mcpprepzone offers both free and premium subscription plans. Premium plans ("Pro" and "Elite") are billed in advance on a recurring and periodic basis. You may cancel your subscription at any time; however, there are no refunds for partially used billing periods, except as explicitly stated in our 3-day money-back guarantee policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
            <p>
              In no event shall Mcpprepzone, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service. We do not guarantee exam clearance; the platform is an educational aid.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>
        </div>
      </div>
      </main>
      <LandingFooter />
    </div>
  );
}
