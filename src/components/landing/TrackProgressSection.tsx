import Image from 'next/image';
import Link from 'next/link';

export default function TrackProgressSection() {
  return (
    <>
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
    
    </>
  );
}