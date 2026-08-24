import Image from 'next/image';
import Link from 'next/link';

export default function RoadmapSection() {
  return (
    <>
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
                <span className="inline-block bg-dark-50 text-dark-700 font-bold px-4 py-2 rounded-full text-sm tracking-wide mb-4 border border-dark-100">Your Roadmap to Success</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-dark-900 mb-4">How It <span className="text-primary-600">Works</span></h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {/*  Desktop Connecting Line  */}
                <div className="hidden lg:block absolute top-12 left-1/2 w-[calc(100%-8rem)] h-1 bg-primary-100 -translate-x-1/2 z-0"></div>
                
                <div className="relative z-10 text-center group flex flex-col h-full">
                    <div className="w-24 h-24 mx-auto bg-white border-4 border-primary-100 rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:border-primary-500 group-hover:scale-110 transition-all shadow-md shrink-0">
                        <span className="text-3xl">📚</span>
                    </div>
                    <div className="bg-dark-50 rounded-2xl p-6 border border-dark-100 flex-1 group-hover:bg-primary-50 transition-colors">
                        <h3 className="text-xl font-bold text-primary-900 mb-2">1. Choose Subject</h3>
                        <p className="text-dark-600 text-sm leading-relaxed">Select any subject or topic from the massive Competitive Exams syllabus.</p>
                    </div>
                </div>
                
                <div className="relative z-10 text-center group flex flex-col h-full">
                    <div className="w-24 h-24 mx-auto bg-white border-4 border-primary-100 rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:border-primary-500 group-hover:scale-110 transition-all shadow-md shrink-0">
                        <span className="text-3xl">✍️</span>
                    </div>
                    <div className="bg-dark-50 rounded-2xl p-6 border border-dark-100 flex-1 group-hover:bg-primary-50 transition-colors">
                        <h3 className="text-xl font-bold text-primary-900 mb-2">2. Practice MCQs</h3>
                        <p className="text-dark-600 text-sm leading-relaxed">Answer strictly exam-oriented questions under time pressure.</p>
                    </div>
                </div>
                
                <div className="relative z-10 text-center group flex flex-col h-full">
                    <div className="w-24 h-24 mx-auto bg-white border-4 border-accent-100 rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:border-accent-500 group-hover:scale-110 transition-all shadow-md shrink-0">
                        <span className="text-3xl">💡</span>
                    </div>
                    <div className="bg-dark-50 rounded-2xl p-6 border border-dark-100 flex-1 group-hover:bg-accent-50 transition-colors">
                        <h3 className="text-xl font-bold text-primary-900 mb-2">3. Review Solutions</h3>
                        <p className="text-dark-600 text-sm leading-relaxed">Understand concepts instantly and learn deeply from mistakes.</p>
                    </div>
                </div>
                
                <div className="relative z-10 text-center group flex flex-col h-full">
                    <div className="w-24 h-24 mx-auto bg-white border-4 border-success-100 rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:border-success-500 group-hover:scale-110 transition-all shadow-md shrink-0">
                        <span className="text-3xl">📈</span>
                    </div>
                    <div className="bg-dark-50 rounded-2xl p-6 border border-dark-100 flex-1 group-hover:bg-success-50 transition-colors">
                        <h3 className="text-xl font-bold text-primary-900 mb-2">4. Track Progress</h3>
                        <p className="text-dark-600 text-sm leading-relaxed">Analyze your dashboard and improve weak areas daily.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    </>
  );
}