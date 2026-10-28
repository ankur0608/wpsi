import Image from 'next/image';
import Link from 'next/link';
import {
  Brain,
  Calculator,
  Scale,
  Newspaper,
  CircuitBoard,
  Binary,
  Share2,
  Radio,
  Waves,
  Cpu,
  Network,
  ShieldCheck,
  Code2,
  Smartphone,
  Rocket
} from 'lucide-react';

export default function SubjectPracticeSection() {
  return (
    <>
    <section className="py-24 md:py-32 bg-primary-50 relative border-y border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-white border border-primary-200 text-primary-700 font-bold px-4 py-2 rounded-full text-sm tracking-wide mb-4 shadow-sm">Practice by Subjects</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-900 mb-6">Master Every Subject of <span className="text-accent-600">Competitive Exams</span></h2>
            </div>
            
            <div className="mb-16">
                <h3 className="text-xl font-bold text-primary-800/60 uppercase tracking-widest text-center mb-8">Part A: Non-Technical</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white border border-primary-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary-400 hover:rotate-1 text-primary-900 font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Brain className="w-5 h-5" />
                        </div>
                        <span>Reasoning</span>
                    </div>
                    <div className="bg-white border border-primary-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary-400 hover:rotate-1 text-primary-900 font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Calculator className="w-5 h-5" />
                        </div>
                        <span>Quantitative Aptitude</span>
                    </div>
                    <div className="bg-white border border-primary-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary-400 hover:rotate-1 text-primary-900 font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Scale className="w-5 h-5" />
                        </div>
                        <span>Constitution of India</span>
                    </div>
                    <div className="bg-white border border-primary-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary-400 hover:rotate-1 text-primary-900 font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Newspaper className="w-5 h-5" />
                        </div>
                        <span>Current Affairs</span>
                    </div>
                </div>
            </div>
            
            <div className="mb-16">
                <h3 className="text-xl font-bold text-primary-800/60 uppercase tracking-widest text-center mb-8">Part B: Technical</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-5 py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 group">
                        <div className="w-8 h-8 rounded-xl bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <CircuitBoard className="w-4 h-4" />
                        </div>
                        <span>Electronics Components</span>
                    </div>
                    <div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-5 py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 group">
                        <div className="w-8 h-8 rounded-xl bg-sky-400/10 text-sky-400 border border-sky-400/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Binary className="w-4 h-4" />
                        </div>
                        <span>Digital Electronics</span>
                    </div>
                    <div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-5 py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 group">
                        <div className="w-8 h-8 rounded-xl bg-blue-400/10 text-blue-300 border border-blue-400/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Share2 className="w-4 h-4" />
                        </div>
                        <span>Electronics Networks</span>
                    </div>
                    <div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-5 py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 group">
                        <div className="w-8 h-8 rounded-xl bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Radio className="w-4 h-4" />
                        </div>
                        <span>Communication Engineering</span>
                    </div>
                    <div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-5 py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 group">
                        <div className="w-8 h-8 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Waves className="w-4 h-4" />
                        </div>
                        <span>Microwave and Fibre</span>
                    </div>
                    <div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-5 py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 group">
                        <div className="w-8 h-8 rounded-xl bg-violet-400/10 text-violet-400 border border-violet-400/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Cpu className="w-4 h-4" />
                        </div>
                        <span>Microprocessors</span>
                    </div>
                    <div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-5 py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 group">
                        <div className="w-8 h-8 rounded-xl bg-teal-400/10 text-teal-400 border border-teal-400/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Network className="w-4 h-4" />
                        </div>
                        <span>Computer Networks</span>
                    </div>
                    <div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-5 py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 group">
                        <div className="w-8 h-8 rounded-xl bg-rose-400/10 text-rose-400 border border-rose-400/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                        <span>Network Security</span>
                    </div>
                    <div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-5 py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 group">
                        <div className="w-8 h-8 rounded-xl bg-orange-400/10 text-orange-400 border border-orange-400/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Code2 className="w-4 h-4" />
                        </div>
                        <span>Web Technology</span>
                    </div>
                    <div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-5 py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 group">
                        <div className="w-8 h-8 rounded-xl bg-green-400/10 text-green-400 border border-green-400/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Smartphone className="w-4 h-4" />
                        </div>
                        <span>Android Development</span>
                    </div>
                    <div className="bg-primary-900 border border-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent-500 hover:-rotate-1 text-white font-bold px-5 py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 group">
                        <div className="w-8 h-8 rounded-xl bg-pink-400/10 text-pink-400 border border-pink-400/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Rocket className="w-4 h-4" />
                        </div>
                        <span>Current Trends</span>
                    </div>
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