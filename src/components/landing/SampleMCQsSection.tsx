import Link from 'next/link';
import { BookOpen, ArrowRight, FileText, Compass, ShieldCheck } from 'lucide-react';

const studyHubCards = [
  {
    badge: 'Technical Paper 2',
    title: 'Computer Networks, Electronics & Microprocessors',
    description:
      'In-depth notes on the OSI model, TCP/IP, IPv4 subnetting, 8085 vs 8051, semiconductor physics, and antenna theory for WPSI & GPSC AE.',
    href: '/blog/computer-networks',
    cta: 'Read Technical Guides',
    icon: BookOpen,
  },
  {
    badge: 'Exam Notifications',
    title: 'Gujarat Govt Exams Syllabus & Eligibility Hub',
    description:
      'Check latest official exam patterns, negative marking rules, qualification criteria, and stage-wise selection details for WPSI, CCE, and GPSC.',
    href: '/government-exams',
    cta: 'View Exam Hub',
    icon: Compass,
  },
  {
    badge: 'Daily Practice',
    title: 'Free Daily MCQ Challenge & Concept Explanations',
    description:
      'Attempt today’s curated set of competitive exam MCQs in a real CBT interface with instant scoring and detailed step-by-step solutions.',
    href: '/daily-challenge',
    cta: 'Start Today’s Challenge',
    icon: ShieldCheck,
  },
];

export default function SampleMCQsSection() {
  return (
    <section className="py-20 bg-slate-50 border-b border-dark-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200 mb-4">
            <FileText className="w-3.5 h-3.5 text-primary-600" />
            Free Exam Study Hub
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-dark-900 tracking-tight mb-4">
            Comprehensive <span className="text-primary-600">Study Guides &amp; Exam Resources</span>
          </h2>
          <p className="text-base sm:text-lg text-dark-600 leading-relaxed">
            Access syllabus-aligned study notes, Gujarat government exam patterns, and free daily practice — all open to read with no login required.
          </p>
        </div>

        {/* Clean 3-Card Hub */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {studyHubCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group bg-white rounded-3xl p-6 sm:p-7 border border-dark-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
                      {card.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-dark-900 group-hover:text-primary-600 transition-colors mb-2.5 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-sm text-dark-600 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 group-hover:translate-x-1 transition-transform">
                  <span>{card.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/blog"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm transition-all shadow-md shadow-primary-600/20 hover:-translate-y-0.5"
          >
            <span>Explore All 40+ Study Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/government-exams"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-dark-800 font-bold text-sm border border-dark-200 transition-all"
          >
            <span>Browse Gujarat Govt Exams</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
