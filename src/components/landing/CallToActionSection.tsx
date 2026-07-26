import Image from 'next/image';
import Link from 'next/link';

export default function CallToActionSection() {
  return (
    <>
    <section className="py-24 md:py-32 bg-primary-900 text-center px-4 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Start Your Wireless PSI Preparation Today</h2>
            <p className="text-xl text-primary-200 font-medium mb-2">Thousands of MCQs. Smart Analytics. Better Results.</p>
            <p className="text-lg text-primary-300 mb-12">Join MCQ Prep Zone and prepare with confidence.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a href="/login" className="bg-accent-500 hover:bg-accent-600 text-white px-10 py-5 rounded-xl font-bold text-lg transition-transform hover:-translate-y-1 shadow-[0_10px_40px_rgba(245,158,11,0.3)]">
                    Start Practicing Free
                </a>
                <a href="/login" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all hover:-translate-y-1">
                    Create Free Account
                </a>
            </div>
        </div>
    </section>
    
    </>
  );
}