import ClientEffects from '@/components/ClientEffects';
import Link from 'next/link';
import Image from 'next/image';
import DynamicNavbar from '@/components/DynamicNavbar';

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden page-transition">
        <DynamicNavbar />
        

            
    
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
                <span className="tracking-wide">India's Smartest Wireless PSI Platform</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl font-black text-dark-900 mb-6 tracking-tight leading-[1.15]">
                Master the Syllabus.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-indigo-600">
                    Crack Wireless PSI.
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
            
            {/*  Trust Indicators  */}
            <div className="mt-16 pt-8 flex flex-col items-center justify-center gap-4">
                <div className="flex -space-x-3">
                    <Image width={100} height={100} src="https://i.pravatar.cc/100?img=11" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" alt="image" />
                    <Image width={100} height={100} src="https://i.pravatar.cc/100?img=12" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" alt="image" />
                    <Image width={100} height={100} src="https://i.pravatar.cc/100?img=13" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" alt="image" />
                    <Image width={100} height={100} src="https://i.pravatar.cc/100?img=14" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" alt="image" />
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-dark-100 flex items-center justify-center text-xs font-bold text-dark-600 z-10">+5k</div>
                </div>
                <div className="text-center">
                    <div className="flex gap-1 justify-center text-amber-400 text-lg mb-1 drop-shadow-sm">
                        ★★★★★
                    </div>
                    <div className="text-xs font-bold text-dark-500 uppercase tracking-widest">Trusted by Gujarat's Top Aspirants</div>
                </div>
            </div>
            
        </div>
    </header>
    
    
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 relative h-[500px] flex items-center justify-center">
                    {/*  Premium App Mockup UI  */}
                    <div className="absolute bg-white border border-dark-100 shadow-[0_30px_60px_rgba(8,112,184,0.15)] rounded-[2.5rem] w-[340px] h-[480px] p-6 flex flex-col z-10 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                        <div className="flex justify-between items-center mb-6">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">W</div>
                            <div className="bg-accent-50 text-accent-700 text-xs font-bold px-3 py-1 rounded-full">04:12:59 Left</div>
                        </div>
                        <h4 className="font-bold text-dark-900 text-xl mb-2">Daily Challenge</h4>
                        <div className="flex items-center gap-2 mb-6 text-sm text-dark-500">
                            <div className="flex -space-x-2">
                                <Image width={100} height={100} src="https://i.pravatar.cc/100?img=1" className="w-6 h-6 rounded-full border-2 border-white"alt="image" />
                                <Image width={100} height={100} src="https://i.pravatar.cc/100?img=2" className="w-6 h-6 rounded-full border-2 border-white"alt="image" />
                                <Image width={100} height={100} src="https://i.pravatar.cc/100?img=3" className="w-6 h-6 rounded-full border-2 border-white"alt="image" />
                            </div>
                            <span>+450 playing</span>
                        </div>
                        
                        <div className="bg-dark-50 rounded-xl p-4 mb-4 border border-dark-100 flex-1">
                            <div className="flex justify-between text-xs font-bold text-dark-500 mb-2">
                                <span>Question 8 of 20</span>
                                <span className="text-primary-600">Part B</span>
                            </div>
                            <div className="w-full h-2 bg-dark-200 rounded-full mb-4 overflow-hidden">
                                <div className="w-2/5 h-full bg-primary-500 rounded-full"></div>
                            </div>
                            <div className="h-4 bg-dark-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-dark-200 rounded w-1/2"></div>
                        </div>
                        
                        <div className="space-y-2 mt-auto">
                            <div className="h-10 bg-primary-50 border border-primary-200 rounded-lg"></div>
                            <div className="h-10 bg-success-50 border border-success-200 rounded-lg flex items-center px-4 justify-between">
                                <span className="text-success-700 font-bold text-sm">Correct Answer</span>
                                <svg className="w-4 h-4 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <div className="h-10 bg-dark-50 border border-dark-100 rounded-lg"></div>
                        </div>
                    </div>
                    {/*  Decorative Behind Mockup  */}
                    <div className="absolute w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50 z-0"></div>
                </div>
                
                <div className="order-1 lg:order-2 space-y-8">
                    <span className="inline-block bg-primary-50 text-primary-700 font-bold px-4 py-2 rounded-full text-sm tracking-wide border border-primary-100">Daily Consistency</span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-dark-900 leading-tight">Practice 20 MCQs <span className="text-primary-600">Every Day</span></h2>
                    <p className="text-lg text-dark-600 leading-relaxed">
                        Build consistency and improve your ranking by solving 20 daily MCQs designed according to the latest Wireless PSI syllabus.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-4 text-dark-800 font-medium">
                            <div className="w-10 h-10 rounded-xl bg-success-50 text-success-600 border border-success-100 flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            20 New Questions Daily
                        </li>
                        <li className="flex items-center gap-4 text-dark-800 font-medium">
                            <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 border border-primary-100 flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            Daily Streak Tracking
                        </li>
                        <li className="flex items-center gap-4 text-dark-800 font-medium">
                            <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent-600 border border-accent-100 flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            Earn XP Points & Compete on Leaderboard
                        </li>
                    </ul>
                    <div className="pt-4">
                        <a href="/login" className="inline-block bg-primary-900 hover:bg-primary-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:-translate-y-1">Start Today's Challenge</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="py-24 md:py-32 bg-dark-50 border-y border-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900 mb-4">Why Choose MCQ Prep Zone?</h2>
                <p className="text-dark-600 text-lg">Everything you need to crack the Gujarat Wireless PSI exam.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                {/*  Feature 1  */}
                <div className="bg-white rounded-2xl p-8 border border-dark-100 shadow-sm text-center hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">📚</div>
                    <h3 className="font-display text-xl font-bold text-dark-900 mb-3">Topic-wise Practice</h3>
                    <p className="text-dark-600 leading-relaxed">Practice chapter by chapter, concept by concept, covering the entire official syllabus.</p>
                </div>
                
                {/*  Feature 2  */}
                <div className="bg-white rounded-2xl p-8 border border-dark-100 shadow-sm text-center hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 bg-success-50 text-success-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">💡</div>
                    <h3 className="font-display text-xl font-bold text-dark-900 mb-3">Instant Explanations</h3>
                    <p className="text-dark-600 leading-relaxed">Understand concepts deeply with detailed explanations immediately after answering.</p>
                </div>
                
                {/*  Feature 3  */}
                <div className="bg-white rounded-2xl p-8 border border-dark-100 shadow-sm text-center hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 bg-accent-50 text-accent-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">📈</div>
                    <h3 className="font-display text-xl font-bold text-dark-900 mb-3">Deep Analytics</h3>
                    <p className="text-dark-600 leading-relaxed">Track your strengths and weaknesses with actionable insights and detailed data.</p>
                </div>
            </div>
        </div>
    </section>
    
    <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block bg-dark-50 text-dark-700 font-bold px-4 py-2 rounded-full text-sm tracking-wide mb-4 border border-dark-100">Wireless PSI Exam Pattern</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-dark-900 mb-6">Know the Exam <span className="text-primary-600">Before You Prepare</span></h2>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-center">
                {/*  Part A  */}
                <div className="bg-white rounded-[2rem] p-8 border border-dark-100 shadow-md relative group hover:-translate-y-2 transition-transform h-full">
                    <h3 className="font-display text-3xl font-bold text-primary-900 mb-2">Part A</h3>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-dark-50 text-dark-700 font-bold px-3 py-1 rounded-lg text-sm border border-dark-100">80 Questions</span>
                        <span className="bg-dark-50 text-dark-700 font-bold px-3 py-1 rounded-lg text-sm border border-dark-100">80 Marks</span>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-dark-700 font-medium"><div className="w-2 h-2 rounded-full bg-primary-500"></div>Reasoning</li>
                        <li className="flex items-center gap-3 text-dark-700 font-medium"><div className="w-2 h-2 rounded-full bg-primary-500"></div>Quantitative Aptitude</li>
                        <li className="flex items-center gap-3 text-dark-700 font-medium"><div className="w-2 h-2 rounded-full bg-primary-500"></div>Constitution of India</li>
                        <li className="flex items-center gap-3 text-dark-700 font-medium"><div className="w-2 h-2 rounded-full bg-primary-500"></div>Current Affairs & GK</li>
                    </ul>
                </div>
                
                {/*  Part B (Elevated & Dark)  */}
                <div className="bg-primary-900 rounded-[2rem] p-10 border-4 border-white shadow-[0_30px_60px_rgba(8,112,184,0.3)] relative group lg:scale-105 z-10 text-white h-full">
                    <div className="absolute top-4 right-4 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Crucial Section</div>
                    <h3 className="font-display text-3xl font-bold text-white mb-2">Part B</h3>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-primary-800 text-white font-bold px-3 py-1 rounded-lg text-sm">120 Questions</span>
                        <span className="bg-primary-800 text-white font-bold px-3 py-1 rounded-lg text-sm">120 Marks</span>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 font-medium"><div className="w-2 h-2 rounded-full bg-accent-400"></div>Technical Subjects</li>
                        <li className="flex items-center gap-3 font-medium"><div className="w-2 h-2 rounded-full bg-accent-400"></div>Electronics & Comm.</li>
                        <li className="flex items-center gap-3 font-medium"><div className="w-2 h-2 rounded-full bg-accent-400"></div>Computer Networks</li>
                        <li className="flex items-center gap-3 font-medium"><div className="w-2 h-2 rounded-full bg-accent-400"></div>Network Security & Web Tech</li>
                    </ul>
                </div>
                
                {/*  Negative Marking  */}
                <div className="bg-red-50 rounded-[2rem] p-8 border border-red-100 shadow-md relative group hover:-translate-y-2 transition-transform h-full">
                    <h3 className="font-display text-3xl font-bold text-red-800 mb-6">Important Rules</h3>
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl p-4 border border-red-100 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold text-xl">!</div>
                            <div>
                                <h4 className="font-bold text-red-900">Negative Marking</h4>
                                <p className="text-sm text-red-700">-0.25 marks for every wrong answer.</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-red-100 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-red-900">Total Duration</h4>
                                <p className="text-sm text-red-700">3 Hours to complete both parts.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
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
    
    <section className="py-24 md:py-32 bg-primary-900 text-white overflow-hidden relative border-y border-primary-800">
        {/*  Abstract grid background  */}
        <div className="absolute inset-0" style={{"backgroundImage":"linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)","backgroundSize":"30px 30px"}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <span className="inline-block bg-accent-500 text-white font-bold px-4 py-2 rounded-full text-sm tracking-wide mb-6">Track Your Preparation</span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Measure Progress and <span className="text-accent-400">Improve Faster</span></h2>
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-primary-200 font-medium mt-8">
                        <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-accent-400"></div>Questions Attempted</div>
                        <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-accent-400"></div>Correct Answers</div>
                        <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-accent-400"></div>Wrong Answers</div>
                        <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-accent-400"></div>Accuracy Percentage</div>
                        <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-accent-400"></div>Subject-wise Performance</div>
                        <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-accent-400"></div>Weak Topic Analysis</div>
                    </div>
                </div>
                
                <div className="relative">
                    {/*  Dashboard Mockup  */}
                    <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.4)] transform rotate-2 hover:rotate-0 transition-transform duration-500 relative z-20">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-primary-900 font-display font-bold text-xl">Accuracy Trend</h4>
                            <span className="text-success-600 font-bold bg-success-50 px-3 py-1 rounded-full text-sm border border-success-100">+12% this week</span>
                        </div>
                        <div className="flex items-end gap-2 h-48 mb-6">
                            <div className="flex-1 bg-primary-100 rounded-t-lg h-[40%] hover:bg-primary-300 transition-colors"></div>
                            <div className="flex-1 bg-primary-100 rounded-t-lg h-[55%] hover:bg-primary-300 transition-colors"></div>
                            <div className="flex-1 bg-primary-200 rounded-t-lg h-[45%] hover:bg-primary-300 transition-colors"></div>
                            <div className="flex-1 bg-primary-300 rounded-t-lg h-[65%] hover:bg-primary-400 transition-colors"></div>
                            <div className="flex-1 bg-primary-400 rounded-t-lg h-[70%] hover:bg-primary-500 transition-colors"></div>
                            <div className="flex-1 bg-primary-500 rounded-t-lg h-[82%] hover:bg-primary-600 transition-colors"></div>
                            <div className="flex-1 bg-primary-700 rounded-t-lg h-[94%] shadow-[0_0_15px_rgba(30,58,138,0.5)]"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 border-t border-dark-100 pt-6">
                            <div className="bg-dark-50 p-3 rounded-xl border border-dark-100 text-center"><div className="text-xs text-dark-500 mb-1">Attempted</div><div className="font-bold text-dark-900 text-xl">1,204</div></div>
                            <div className="bg-success-50 p-3 rounded-xl border border-success-100 text-center"><div className="text-xs text-success-700 mb-1">Correct</div><div className="font-bold text-success-700 text-xl">980</div></div>
                            <div className="bg-accent-50 p-3 rounded-xl border border-accent-100 text-center"><div className="text-xs text-accent-700 mb-1">Streak</div><div className="font-bold text-accent-700 text-xl">14 Days</div></div>
                        </div>
                    </div>
                    {/*  Secondary Card behind  */}
                    <div className="absolute -right-8 -bottom-8 bg-white/10 backdrop-blur-md rounded-[2rem] p-6 border border-white/20 w-64 h-64 z-10 transform -rotate-6">
                        <div className="h-4 w-1/2 bg-white/20 rounded mb-6"></div>
                        <div className="h-3 w-full bg-white/10 rounded mb-3"></div>
                        <div className="h-3 w-3/4 bg-white/10 rounded mb-3"></div>
                        <div className="h-3 w-5/6 bg-white/10 rounded mb-3"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
                <span className="inline-block bg-dark-50 text-dark-700 font-bold px-4 py-2 rounded-full text-sm tracking-wide mb-4 border border-dark-100">Your Roadmap to Success</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-dark-900 mb-4">How It <span className="text-primary-600">Works</span></h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {/*  Desktop Connecting Line  */}
                <div className="hidden lg:block absolute top-12 left-1/2 w-[calc(100%-8rem)] h-1 bg-primary-100 -translate-x-1/2 z-0"></div>
                
                <div className="relative z-10 text-center group">
                    <div className="w-24 h-24 mx-auto bg-white border-4 border-primary-100 rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:border-primary-500 group-hover:scale-110 transition-all shadow-md">
                        <span className="text-3xl">📚</span>
                    </div>
                    <div className="bg-dark-50 rounded-2xl p-6 border border-dark-100 h-full group-hover:bg-primary-50 transition-colors">
                        <h3 className="text-xl font-bold text-primary-900 mb-2">1. Choose Subject</h3>
                        <p className="text-dark-600 text-sm leading-relaxed">Select any subject or topic from the massive Wireless PSI syllabus.</p>
                    </div>
                </div>
                
                <div className="relative z-10 text-center group">
                    <div className="w-24 h-24 mx-auto bg-white border-4 border-primary-100 rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:border-primary-500 group-hover:scale-110 transition-all shadow-md">
                        <span className="text-3xl">✍️</span>
                    </div>
                    <div className="bg-dark-50 rounded-2xl p-6 border border-dark-100 h-full group-hover:bg-primary-50 transition-colors">
                        <h3 className="text-xl font-bold text-primary-900 mb-2">2. Practice MCQs</h3>
                        <p className="text-dark-600 text-sm leading-relaxed">Answer strictly exam-oriented questions under time pressure.</p>
                    </div>
                </div>
                
                <div className="relative z-10 text-center group">
                    <div className="w-24 h-24 mx-auto bg-white border-4 border-accent-100 rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:border-accent-500 group-hover:scale-110 transition-all shadow-md">
                        <span className="text-3xl">💡</span>
                    </div>
                    <div className="bg-dark-50 rounded-2xl p-6 border border-dark-100 h-full group-hover:bg-accent-50 transition-colors">
                        <h3 className="text-xl font-bold text-primary-900 mb-2">3. Review Solutions</h3>
                        <p className="text-dark-600 text-sm leading-relaxed">Understand concepts instantly and learn deeply from mistakes.</p>
                    </div>
                </div>
                
                <div className="relative z-10 text-center group">
                    <div className="w-24 h-24 mx-auto bg-white border-4 border-success-100 rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:border-success-500 group-hover:scale-110 transition-all shadow-md">
                        <span className="text-3xl">📈</span>
                    </div>
                    <div className="bg-dark-50 rounded-2xl p-6 border border-dark-100 h-full group-hover:bg-success-50 transition-colors">
                        <h3 className="text-xl font-bold text-primary-900 mb-2">4. Track Progress</h3>
                        <p className="text-dark-600 text-sm leading-relaxed">Analyze your dashboard and improve weak areas daily.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="py-24 md:py-32 bg-primary-50 border-y border-primary-100 relative overflow-hidden">
{/*  Premium Quotation Watermark  */}
        <div className="absolute -left-10 top-10 text-[300px] font-display font-black text-primary-900 opacity-[0.03] leading-none pointer-events-none">"</div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <span className="inline-block bg-white border border-primary-200 text-primary-700 font-bold px-4 py-2 rounded-full text-sm tracking-wide mb-4 shadow-sm">Success Stories</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-900 mb-4">What Aspirants <span className="text-accent-600">Say</span></h2>
            </div>
            {/*  Testimonials Horizontal Scroll Row  */}
            <div className="relative max-w-7xl mx-auto mt-12 px-4">
                {/*  Track  */}
                <div id="testimonial-track" className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 -mx-4 px-4 scroll-smooth">
                    
                    {/*  Slide 1: Rahul Parmar  */}
                    <div className="w-[85vw] sm:w-[45vw] md:w-[30vw] min-w-[320px] flex-shrink-0 snap-center">
                        <div className="bg-white rounded-3xl p-8 border border-primary-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative group hover:-translate-y-1 transition-transform flex flex-col justify-between h-full min-h-[320px]">
                            <div>
                                <div className="flex items-center gap-1 mb-6 text-accent-500">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                </div>
                                <p className="text-dark-700 italic mb-8 relative z-10 text-base leading-relaxed">"The AI weakness detection feature is a game-changer. It identified exactly where I was losing marks and helped me improve my score by 23% in just 3 weeks. Cleared WPSI on my first attempt!"</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg border border-primary-200">RP</div>
                                <div>
                                    <div className="font-bold text-primary-900 text-sm">Rahul Parmar</div>
                                    <div className="text-xs text-dark-500">Wireless PSI 2025 | Rank #14</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Slide 2: Sneha Kumar  */}
                    <div className="w-[85vw] sm:w-[45vw] md:w-[30vw] min-w-[320px] flex-shrink-0 snap-center">
                        <div className="bg-white rounded-3xl p-8 border border-primary-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative group hover:-translate-y-1 transition-transform flex flex-col justify-between h-full min-h-[320px]">
                            <div>
                                <div className="flex items-center gap-1 mb-6 text-accent-500">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                </div>
                                <p className="text-dark-700 italic mb-8 relative z-10 text-base leading-relaxed">"The gamification kept me hooked. I never thought I would enjoy studying for Wireless PSI Exams, but the XP points and leaderboard made it addictive. Best investment I made for my career."</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-success-100 flex items-center justify-center text-success-700 font-bold text-lg border border-success-200">SK</div>
                                <div>
                                    <div className="font-bold text-primary-900 text-sm">Sneha Kumar</div>
                                    <div className="text-xs text-dark-500">GPSC Class 2 | Rank #8</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Slide 3: Amit Patel  */}
                    <div className="w-[85vw] sm:w-[45vw] md:w-[30vw] min-w-[320px] flex-shrink-0 snap-center">
                        <div className="bg-white rounded-3xl p-8 border border-primary-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative group hover:-translate-y-1 transition-transform flex flex-col justify-between h-full min-h-[320px]">
                            <div>
                                <div className="flex items-center gap-1 mb-6 text-accent-500">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                </div>
                                <p className="text-dark-700 italic mb-8 relative z-10 text-base leading-relaxed">"The mock tests are incredibly close to the actual exam pattern. The detailed solutions and PDF notes saved me hours of research. Worth every rupee of the Pro plan!"</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center text-accent-800 font-bold text-lg border border-accent-200">AP</div>
                                <div>
                                    <div className="font-bold text-primary-900 text-sm">Amit Patel</div>
                                    <div className="text-xs text-dark-500">Gujarat Police Exams | Rank #3</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Slide 4: Hardik Jadeja  */}
                    <div className="w-[85vw] sm:w-[45vw] md:w-[30vw] min-w-[320px] flex-shrink-0 snap-center">
                        <div className="bg-white rounded-3xl p-8 border border-primary-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative group hover:-translate-y-1 transition-transform flex flex-col justify-between h-full min-h-[320px]">
                            <div>
                                <div className="flex items-center gap-1 mb-6 text-accent-500">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                </div>
                                <p className="text-dark-700 italic mb-8 relative z-10 text-base leading-relaxed">"Part B (Technical) was my biggest fear, especially microprocessors and networks. MCQ Prep Zone's topic-wise practice questions were so relevant that I got 42 out of 50 correct in the technical paper. Highly recommended!"</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg border border-primary-200">HJ</div>
                                <div>
                                    <div className="font-bold text-primary-900 text-sm">Hardik Jadeja</div>
                                    <div className="text-xs text-dark-500">Wireless PSI 2025 | Rank #22</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Slide 5: Pooja Shah  */}
                    <div className="w-[85vw] sm:w-[45vw] md:w-[30vw] min-w-[320px] flex-shrink-0 snap-center">
                        <div className="bg-white rounded-3xl p-8 border border-primary-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative group hover:-translate-y-1 transition-transform flex flex-col justify-between h-full min-h-[320px]">
                            <div>
                                <div className="flex items-center gap-1 mb-6 text-accent-500">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                </div>
                                <p className="text-dark-700 italic mb-8 relative z-10 text-base leading-relaxed">"The daily challenge and performance analytics dashboard acted like a personal mentor. It showed me my accuracy rate in physics was low, which I improved just in time. Cracked the exam on my first try!"</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center text-accent-700 font-bold text-lg border border-accent-200">PS</div>
                                <div>
                                    <div className="font-bold text-primary-900 text-sm">Pooja Shah</div>
                                    <div className="text-xs text-dark-500">Wireless PSI 2025 | Rank #45</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Slide 6: Jayesh Trivedi  */}
                    <div className="w-[85vw] sm:w-[45vw] md:w-[30vw] min-w-[320px] flex-shrink-0 snap-center">
                        <div className="bg-white rounded-3xl p-8 border border-primary-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative group hover:-translate-y-1 transition-transform flex flex-col justify-between h-full min-h-[320px]">
                            <div>
                                <div className="flex items-center gap-1 mb-6 text-accent-500">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                </div>
                                <p className="text-dark-700 italic mb-8 relative z-10 text-base leading-relaxed">"The interface is extremely user-friendly and clean. The explanations for every answer are detailed and contain standard textbook references, saving me hours of cross-checking."</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg border border-primary-200">JT</div>
                                <div>
                                    <div className="font-bold text-primary-900 text-sm">Jayesh Trivedi</div>
                                    <div className="text-xs text-dark-500">Wireless PSI Assistant | Rank #11</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/*  Navigation Controls  */}
                <div className="flex justify-between items-center mt-8 px-4">
                    <div className="text-sm font-semibold text-dark-500">Swipe to view more &rarr;</div>

                    {/*  Navigation Arrows  */}
                    <div className="flex gap-3">
                        <button id="prev-testimonial" className="w-12 h-12 rounded-full bg-white hover:bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 shadow-sm transition-all duration-200 hover:-translate-x-0.5 active:translate-x-0 cursor-pointer" aria-label="Previous Testimonial">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
                        </button>
                        <button id="next-testimonial" className="w-12 h-12 rounded-full bg-white hover:bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 shadow-sm transition-all duration-200 hover:translate-x-0.5 active:translate-x-0 cursor-pointer" aria-label="Next Testimonial">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                        </button>
                    </div>
                </div>

        </div>

<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <span className="inline-block bg-dark-50 text-dark-700 font-bold px-4 py-2 rounded-full text-sm tracking-wide mb-4 border border-dark-100">Got Questions?</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-dark-900 mb-6">Frequently Asked <span className="text-primary-600">Questions</span></h2>
            </div>
            
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-dark-100">
                
        <div className="border-b border-dark-200 bg-transparent overflow-hidden mb-2 group">
            <button className="faq-toggle w-full py-6 text-left flex justify-between items-center bg-transparent transition-colors" aria-expanded="false">
                <span className="font-display font-bold text-xl text-dark-900 group-hover:text-primary-600 transition-colors">Is MCQ Prep Zone free?</span>
                <div className="w-10 h-10 rounded-full bg-dark-50 shadow-sm border border-dark-100 flex items-center justify-center text-dark-500 group-hover:bg-primary-600 group-hover:text-white transition-colors shrink-0">
                    <svg className="w-5 h-5 faq-icon transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6"></path></svg>
                </div>
            </button>
            <div className="py-4 text-dark-600 text-lg hidden leading-relaxed">
                <p>Yes, basic topic-wise practice is available for free, giving you a chance to experience the platform before upgrading.</p>
            </div>
        </div>
        
        <div className="border-b border-dark-200 bg-transparent overflow-hidden mb-2 group">
            <button className="faq-toggle w-full py-6 text-left flex justify-between items-center bg-transparent transition-colors" aria-expanded="false">
                <span className="font-display font-bold text-xl text-dark-900 group-hover:text-primary-600 transition-colors">Are questions based on the latest syllabus?</span>
                <div className="w-10 h-10 rounded-full bg-dark-50 shadow-sm border border-dark-100 flex items-center justify-center text-dark-500 group-hover:bg-primary-600 group-hover:text-white transition-colors shrink-0">
                    <svg className="w-5 h-5 faq-icon transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6"></path></svg>
                </div>
            </button>
            <div className="py-4 text-dark-600 text-lg hidden leading-relaxed">
                <p>Absolutely! All questions strictly follow the latest Wireless PSI syllabus and Gujarat Police exam patterns.</p>
            </div>
        </div>
        
        <div className="border-b border-dark-200 bg-transparent overflow-hidden mb-2 group">
            <button className="faq-toggle w-full py-6 text-left flex justify-between items-center bg-transparent transition-colors" aria-expanded="false">
                <span className="font-display font-bold text-xl text-dark-900 group-hover:text-primary-600 transition-colors">Can I track my progress?</span>
                <div className="w-10 h-10 rounded-full bg-dark-50 shadow-sm border border-dark-100 flex items-center justify-center text-dark-500 group-hover:bg-primary-600 group-hover:text-white transition-colors shrink-0">
                    <svg className="w-5 h-5 faq-icon transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6"></path></svg>
                </div>
            </button>
            <div className="py-4 text-dark-600 text-lg hidden leading-relaxed">
                <p>Yes, the platform provides deep analytics, including subject-wise performance, accuracy trends, and weak topic identification.</p>
            </div>
        </div>
        
        <div className="border-b border-dark-200 bg-transparent overflow-hidden mb-2 group">
            <button className="faq-toggle w-full py-6 text-left flex justify-between items-center bg-transparent transition-colors" aria-expanded="false">
                <span className="font-display font-bold text-xl text-dark-900 group-hover:text-primary-600 transition-colors">Do you provide mock tests?</span>
                <div className="w-10 h-10 rounded-full bg-dark-50 shadow-sm border border-dark-100 flex items-center justify-center text-dark-500 group-hover:bg-primary-600 group-hover:text-white transition-colors shrink-0">
                    <svg className="w-5 h-5 faq-icon transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6"></path></svg>
                </div>
            </button>
            <div className="py-4 text-dark-600 text-lg hidden leading-relaxed">
                <p>Yes, we provide full-length mock tests that perfectly simulate the 3-hour exam environment with negative marking.</p>
            </div>
        </div>
        
            </div>
            
            <div className="mt-12 text-center">
                <p className="text-dark-600">Still have questions? <a href="mailto:support@mcqprepzone.online" className="font-bold text-primary-600 hover:text-primary-800 underline">Contact Support</a></p>
            </div>
        </div>
        </div>
    </section>
    
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
    
    {/*  Common Footer  */}
    <footer className="bg-dark-900 text-dark-300 py-16 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
                <div className="md:col-span-1">
                    <h2 className="font-display font-bold text-2xl text-white tracking-tight mb-4">MCQ Prep Zone</h2>
                    <p className="text-sm mb-6">Practice Topic-wise MCQs, Mock Tests, Previous Year Questions, and Track Your Progress for the Gujarat Wireless PSI Examination.</p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-accent-400 transition-colors">Home</a></li>
                        <li><a href="/pricing" className="hover:text-accent-400 transition-colors">Pricing</a></li>
                        <li><a href="/blog" className="hover:text-accent-400 transition-colors">Blogs</a></li>
                        <li><a href="/about" className="hover:text-accent-400 transition-colors">About Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/privacy" className="hover:text-accent-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-accent-400 transition-colors">Terms of Service</a></li>
                        <li><a href="/cancellation" className="hover:text-accent-400 transition-colors">Cancellation</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Contact</h4>
                    <ul className="space-y-2 text-sm">
                        <li>Email: support@mcqprepzone.online</li>
                        <li>Phone: +91 83477 85879</li>
                        <li>Location: Ahmedabad, Gujarat</li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-xs border-t border-dark-800 pt-8">
                &copy; 2026 MCQ Prep Zone Pvt Ltd. All rights reserved.
            </div>
        </div>
    </footer>
      <ClientEffects />

    
    
    

    </div>
  );
}
