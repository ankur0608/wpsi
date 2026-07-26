import Image from 'next/image';
import Link from 'next/link';

export default function SubjectPracticeSection() {
  return (
    <>
    <section className="py-24 md:py-32 bg-primary-50 relative border-y border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-white border border-primary-200 text-primary-700 font-bold px-4 py-2 rounded-full text-sm tracking-wide mb-4 shadow-sm">Practice by Subjects</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-900 mb-6">Master Every Subject of <span className="text-accent-600">Wireless PSI</span></h2>
            </div>
            
            <div className="mb-16">
                <h3 className="text-xl font-bold text-primary-800/60 uppercase tracking-widest text-center mb-8">Part A: Non-Technical</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white border border-primary-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary-400 hover:rotate-1 text-primary-900 font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3"><span className="text-2xl">🧠</span>Reasoning</div><div className="bg-white border border-primary-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary-400 hover:rotate-1 text-primary-900 font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3"><span className="text-2xl">📊</span>Quantitative Aptitude</div><div className="bg-white border border-primary-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary-400 hover:rotate-1 text-primary-900 font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3"><span className="text-2xl">⚖️</span>Constitution of India</div><div className="bg-white border border-primary-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary-400 hover:rotate-1 text-primary-900 font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3"><span className="text-2xl">📰</span>Current Affairs</div>
                </div>
            </div>
            
            <div className="mb-16">
                <h3 className="text-xl font-bold text-primary-800/60 uppercase tracking-widest text-center mb-8">Part B: Technical</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3"><span className="text-2xl">🔌</span>Electronics Components</div><div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3"><span className="text-2xl">🎛️</span>Digital Electronics</div><div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3"><span className="text-2xl">🕸️</span>Electronics Networks</div><div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3"><span className="text-2xl">📡</span>Communication Engineering</div><div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3"><span className="text-2xl">⚡</span>Microwave and Fibre</div><div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3"><span className="text-2xl">💻</span>Microprocessors</div><div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3"><span className="text-2xl">🌐</span>Computer Networks</div><div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3"><span className="text-2xl">🔒</span>Network Security</div><div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3"><span className="text-2xl">🕸️</span>Web Technology</div><div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3"><span className="text-2xl">📱</span>Android Development</div><div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3"><span className="text-2xl">🚀</span>Current Trends</div>
                </div>
            </div>
            
            <div className="text-center">
                <a href="/features" className="inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:-translate-y-1 group">
                    Practice Subject-wise MCQs
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </a>
            </div>
        </div>
    </section>
    
    </>
  );
}