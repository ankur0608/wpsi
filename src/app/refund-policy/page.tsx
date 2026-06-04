import { Metadata } from 'next';
import LandingNavbar from '@/components/LandingNavbar';
import LandingFooter from '@/components/LandingFooter';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Read the Cancellation and Refund Policy for Mcqprepzone.',
};

export default function RefundPolicyPage() {
  return (
    <div className="relative w-full overflow-x-hidden min-h-screen">
      <LandingNavbar />
      <main className="relative pt-28 md:pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-8 text-center">
            Cancellation & <span className="text-gradient">Refund Policy</span>
          </h1>
          <p className="text-center opacity-70 mb-12 max-w-2xl mx-auto">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <div className="glass-card p-8 rounded-2xl border border-[var(--border-subtle)] space-y-8 opacity-90 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. General Refund Policy</h2>
              <p>
                Given the digital nature of our educational products (test series, courses, MCQs), all sales are generally considered final. We do not offer refunds once you have purchased and accessed our digital content unless explicitly stated below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Subscription Cancellations</h2>
              <p>
                You may cancel your subscription at any time. Your cancellation will take effect at the end of the current paid term. If you have any questions or are unsatisfied with our Services, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Exceptions</h2>
              <p>
                Refunds may be granted under the following exceptional circumstances:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Duplicate billing errors.</li>
                <li>Technical issues on our platform that prevent you from accessing the purchased content for an extended period, which we are unable to resolve.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Requesting a Refund</h2>
              <p>
                To request a refund under the exceptional circumstances outlined above, please contact our support team within 7 days of the transaction. You must provide your purchase details and a clear explanation of the issue.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about our Cancellation and Refund Policy, please contact us at:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Email:</strong>p8166250@gmail.com</li>
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
