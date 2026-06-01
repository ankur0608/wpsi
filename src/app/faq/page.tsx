import { Metadata } from 'next';
import LandingNavbar from '@/components/LandingNavbar';
import LandingFooter from '@/components/LandingFooter';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about Mcqprepzone, including details about our government exam mock tests, pricing plans, syllabus coverage for Wireless PSI and GPSC, and platform features.',
};

export default function FAQPage() {
  return (
    <div className="relative w-full overflow-x-hidden bg-[#0D1B2A] text-[#F2ECD9]">
      <LandingNavbar />
      <main className="relative pt-28 md:pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-8 text-center">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h1>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          Everything you need to know about Mcqprepzone's mock tests, study materials, and platform features for Gujarat Government exams.
        </p>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-3 text-white">What exams do you cover?</h3>
            <p className="text-slate-300 leading-relaxed">
              We currently offer comprehensive test series, syllabus coverage, and AI-driven study plans for Wireless PSI, GPSC Class 1/2, Talati, and SSC exams. We are constantly expanding our database to include more Gujarat Government exams.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-3 text-white">Are the mock tests based on the latest syllabus?</h3>
            <p className="text-slate-300 leading-relaxed">
              Yes, our subject matter experts regularly update the mock tests and MCQ database to strictly adhere to the latest syllabi and exam patterns announced by the respective exam boards (like GSSSB and GPSC).
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-3 text-white">Can I access the platform on my mobile phone?</h3>
            <p className="text-slate-300 leading-relaxed">
              Absolutely! Mcqprepzone is fully responsive and optimized for mobile devices. You can practice MCQs, check your stats, and take full-length mock tests on any smartphone or tablet directly through your web browser.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-3 text-white">How does the AI Study Planner work?</h3>
            <p className="text-slate-300 leading-relaxed">
              Our AI analyzes your performance across different subjects and identifies your weak areas. It then dynamically adjusts your daily quizzes and suggests specific topics you need to revise, ensuring you maximize your study time and score.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-3 text-white">What is the refund policy for premium plans?</h3>
            <p className="text-slate-300 leading-relaxed">
              We offer a 3-day money-back guarantee for our Pro and Elite plans if you are unsatisfied with the content. Please refer to our Terms and Conditions for detailed information regarding refunds and subscription cancellations.
            </p>
          </div>
        </div>
      </div>
      </main>
      <LandingFooter />
    </div>
  );
}
