import { Metadata } from 'next';
import DynamicNavbar from '@/components/DynamicNavbar';
import FooterSection from '@/components/landing/FooterSection';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about Mcqprepzone, including details about our government exam mock tests, pricing plans, syllabus coverage for Competitive Exams and GPSC, and platform features.',
};

export default function FAQPage() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-white text-dark-800 page-transition">
      <DynamicNavbar />
      <main className="relative pt-28 md:pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-8 text-center text-dark-900">
          Frequently Asked <span className="text-primary-600">Questions</span>
        </h1>
        <p className="text-center text-dark-500 mb-12 max-w-2xl mx-auto text-lg">
          Everything you need to know about Mcqprepzone's mock tests, study materials, and platform features for Gujarat Government exams.
        </p>

        <div className="space-y-6">
          <div className="bg-dark-50 p-6 md:p-8 rounded-3xl border border-dark-100 hover:border-primary-200 transition-colors">
            <h3 className="text-xl font-bold mb-3 text-dark-900">What exams do you cover?</h3>
            <p className="text-dark-600 leading-relaxed">
              We currently offer comprehensive test series, syllabus coverage, and AI-driven study plans for CCE and WPSI exams. We are constantly expanding our database to include more Gujarat Government exams.
            </p>
          </div>

          <div className="bg-dark-50 p-6 md:p-8 rounded-3xl border border-dark-100 hover:border-primary-200 transition-colors">
            <h3 className="text-xl font-bold mb-3 text-dark-900">Are the mock tests based on the latest syllabus?</h3>
            <p className="text-dark-600 leading-relaxed">
              Yes, our subject matter experts regularly update the mock tests and MCQ database to strictly adhere to the latest syllabi and exam patterns announced by the respective exam boards.
            </p>
          </div>

          <div className="bg-dark-50 p-6 md:p-8 rounded-3xl border border-dark-100 hover:border-primary-200 transition-colors">
            <h3 className="text-xl font-bold mb-3 text-dark-900">Can I access the platform on my mobile phone?</h3>
            <p className="text-dark-600 leading-relaxed">
              Absolutely! Mcqprepzone is fully responsive and optimized for mobile devices. You can practice MCQs, check your stats, and take full-length mock tests on any smartphone or tablet directly through your web browser.
            </p>
          </div>

          <div className="bg-dark-50 p-6 md:p-8 rounded-3xl border border-dark-100 hover:border-primary-200 transition-colors">
            <h3 className="text-xl font-bold mb-3 text-dark-900">How does the AI Study Planner work?</h3>
            <p className="text-dark-600 leading-relaxed">
              Our AI analyzes your performance across different subjects and identifies your weak areas. It then dynamically adjusts your daily quizzes and suggests specific topics you need to revise, ensuring you maximize your study time and score.
            </p>
          </div>

          <div className="bg-dark-50 p-6 md:p-8 rounded-3xl border border-dark-100 hover:border-primary-200 transition-colors">
            <h3 className="text-xl font-bold mb-3 text-dark-900">What is the refund policy for premium plans?</h3>
            <p className="text-dark-600 leading-relaxed">
              All payments made to MCQPrepZone are final and non-refundable, except where a refund is required under applicable law. Please refer to our Cancellation & Refunds policy for detailed information regarding subscription cancellations.
            </p>
          </div>

          <div className="bg-dark-50 p-6 md:p-8 rounded-3xl border border-dark-100 hover:border-primary-200 transition-colors">
            <h3 className="text-xl font-bold mb-3 text-dark-900">Do you provide study notes or materials?</h3>
            <p className="text-dark-600 leading-relaxed">
              Yes! We provide comprehensive PDF notes and study materials covering all essential topics. These notes are designed to help you revise quickly and effectively alongside your mock test practice.
            </p>
          </div>
        </div>
      </div>
      
      {/* JSON-LD FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What exams do you cover?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We currently offer comprehensive test series, syllabus coverage, and AI-driven study plans for CCE and WPSI exams. We are constantly expanding our database to include more Gujarat Government exams."
                }
              },
              {
                "@type": "Question",
                "name": "Are the mock tests based on the latest syllabus?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our subject matter experts regularly update the mock tests and MCQ database to strictly adhere to the latest syllabi and exam patterns announced by the respective exam boards."
                }
              },
              {
                "@type": "Question",
                "name": "Can I access the platform on my mobile phone?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! Mcqprepzone is fully responsive and optimized for mobile devices. You can practice MCQs, check your stats, and take full-length mock tests on any smartphone or tablet directly through your web browser."
                }
              },
              {
                "@type": "Question",
                "name": "How does the AI Study Planner work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our AI analyzes your performance across different subjects and identifies your weak areas. It then dynamically adjusts your daily quizzes and suggests specific topics you need to revise, ensuring you maximize your study time and score."
                }
              },
              {
                "@type": "Question",
                "name": "What is the refund policy for premium plans?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "All payments made to MCQPrepZone are final and non-refundable, except where a refund is required under applicable law. Please refer to our Cancellation & Refunds policy for detailed information regarding subscription cancellations."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide study notes or materials?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! We provide comprehensive PDF notes and study materials covering all essential topics. These notes are designed to help you revise quickly and effectively alongside your mock test practice."
                }
              }
            ]
          })
        }}
      />
      
      </main>
      <FooterSection />
    </div>
  );
}
