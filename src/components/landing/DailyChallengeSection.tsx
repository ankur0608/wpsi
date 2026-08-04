import Image from 'next/image';
import Link from 'next/link';

export default function DailyChallengeSection() {
  return (
    <>
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
                            <span>Active now</span>
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
    
    </>
  );
}