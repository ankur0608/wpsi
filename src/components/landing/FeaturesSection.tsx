import Image from 'next/image';
import Link from 'next/link';

export default function FeaturesSection() {
  return (
    <>
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
    
    </>
  );
}