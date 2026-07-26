import Image from 'next/image';
import Link from 'next/link';

export default function FAQSection() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
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
            <p className="text-dark-600">Still have questions? <a href="mailto:Mcqprepzone@gmail.com" className="font-bold text-primary-600 hover:text-primary-800 underline">Contact Support</a></p>
        </div>
      </div>
    </section>
  );
}