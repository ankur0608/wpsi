import Image from 'next/image';
import Link from 'next/link';

export default function CallToActionSection() {
  return (
    <>
    <section className="py-16 md:py-20 bg-primary-900 text-center px-4 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">Start Your Competitive Exams Preparation Today</h2>
            <p className="text-base md:text-lg text-primary-200 font-medium mb-1.5">Thousands of MCQs. Smart Analytics. Better Results.</p>
            <p className="text-sm md:text-base text-primary-300 mb-8">Join MCQ Prep Zone and prepare with confidence.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/login" className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-semibold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                    Start Practicing Free
                </a>
                <a href="/login" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all hover:-translate-y-0.5">
                    Create Free Account
                </a>
            </div>
        </div>
    </section>
    
    </>
  );
}