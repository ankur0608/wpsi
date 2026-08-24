import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <>
    <header className="relative bg-primary-50 pt-32 pb-48 overflow-hidden">
        {/*  Dynamic Gradient Background & Grid  */}
        <div className="absolute inset-0 bg-primary-100/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMWgydjJIMXoiIGZpbGw9InJnYmEoMCwwLDAsMC4wMikiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-100"></div>
        
        {/*  Glowing Orbs (Subtle Light Theme)  */}
        <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-primary-200/40 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-accent-200/30 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/*  Floating Glassmorphism Cards (Left & Right)  */}
        <div className="absolute top-40 left-8 lg:left-16 hidden lg:block animate-[bounce_6s_ease-in-out_infinite]">
            <div className="bg-white/80 backdrop-blur-xl border border-dark-100 rounded-3xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.05)] w-64 transform -rotate-3 hover:rotate-0 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-success-50 flex items-center justify-center text-success-600 border border-success-100 shadow-sm">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div className="text-dark-900 font-bold text-sm tracking-wide">Correct Answer!</div>
                </div>
                <div className="h-2 w-full bg-dark-100 rounded-full mb-2.5"></div>
                <div className="h-2 w-3/4 bg-dark-100 rounded-full"></div>
            </div>
        </div>
        
        <div className="absolute top-56 right-8 lg:right-16 hidden lg:block animate-[bounce_7s_ease-in-out_infinite_reverse]">
            <div className="bg-white/80 backdrop-blur-xl border border-dark-100 rounded-3xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.05)] w-60 transform rotate-3 hover:rotate-0 transition-all duration-300">
                <div className="flex items-center gap-4">
                    <div className="text-4xl">🔥</div>
                    <div>
                        <div className="text-dark-900 font-display font-bold text-base leading-tight mb-1">12 Day Streak</div>
                        <div className="bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded inline-block border border-amber-100">Top 5%</div>
                    </div>
                </div>
            </div>
        </div>
        
        {/*  Main Content  */}
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center mt-8">
            
            <div className="inline-flex items-center gap-2.5 bg-white border border-primary-200 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold text-primary-800 mb-10 shadow-sm hover:shadow-md transition-shadow cursor-default">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]"></span>
                </span>
                <span className="tracking-wide">India's Smartest Competitive Exams Platform</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl font-black text-dark-900 mb-6 tracking-tight leading-[1.15]">
                Master the Syllabus.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-indigo-600">
                    Crack Competitive Exams.
                </span>
            </h1>
            
            <p className="text-lg md:text-xl text-dark-600 mb-10 leading-relaxed max-w-3xl mx-auto font-medium">
                Elevate your preparation with topic-wise MCQs, high-fidelity mock tests, and actionable AI-driven performance analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5 items-center">
                <a href="/login" className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 shadow-[0_15px_30px_rgba(37,99,235,0.25)] flex items-center justify-center gap-2 group">
                    Start Practicing Free
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </a>
                <a href="/features" className="w-full sm:w-auto bg-white hover:bg-dark-50 border border-dark-200 text-dark-800 px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2 shadow-sm">
                    Explore Features
                </a>
            </div>
            
            
        </div>
    </header>
    
    </>
  );
}