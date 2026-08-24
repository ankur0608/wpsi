"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import DynamicNavbar from '@/components/DynamicNavbar';
import { freeDailyMCQs } from '@/data/freeMCQs';

export default function DailyChallengePage() {
  const [started, setStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});

  const currentMCQ = freeDailyMCQs[currentIndex];

  const handleSelectOption = (option: string) => {
    setResponses((prev) => ({ ...prev, [currentMCQ.id]: option }));
  };

  const navigateQuestion = (dir: number) => {
    const nextIndex = currentIndex + dir;
    if (nextIndex >= 0 && nextIndex < freeDailyMCQs.length) {
      setCurrentIndex(nextIndex);
    }
  };

  const handleSubmit = () => {
    setIsFinished(true);
  };

  const calculateScore = () => {
    let score = 0;
    freeDailyMCQs.forEach(mcq => {
      if (responses[mcq.id] === mcq.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  // SEO Fallback: Hidden content for crawlers
  const renderSEOFallback = () => (
    <div className="sr-only" aria-hidden="true">
      {freeDailyMCQs.map(mcq => (
        <div key={`seo-${mcq.id}`}>
          <h2>{mcq.question}</h2>
          <ul>
            <li>A: {mcq.options.A}</li>
            <li>B: {mcq.options.B}</li>
            <li>C: {mcq.options.C}</li>
            <li>D: {mcq.options.D}</li>
          </ul>
          <p>Correct Answer: {mcq.correctAnswer}</p>
          <p>Explanation: {mcq.explanation}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative w-full min-h-screen bg-primary-900 page-transition">
      <DynamicNavbar />
      
      {/* Background Pattern for the whole page */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fillRule=\\'evenodd\\'%3E%3Cg fill=\\'%23000000\\' fill-opacity=\\'0.02\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] pointer-events-none"></div>

      {/* Include the SEO fallback so bots always see the text regardless of JS state */}
      {renderSEOFallback()}

      {!started && !isFinished && (
        <section className="pt-40 pb-20 relative min-h-[80vh] flex flex-col justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <span className="inline-flex items-center gap-2 bg-primary-800 text-accent-300 rounded-full px-4 py-1.5 text-sm font-bold tracking-wide mb-6 shadow-sm border border-primary-700">
              Free Public Practice
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Today's <span className="text-accent-400">Free MCQs</span>
            </h1>
            <p className="text-xl text-primary-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Test your knowledge with 10 handpicked questions from the Competitive Exams syllabus. 
              Experience our mock test interface for free, no login required!
            </p>
            <button 
              onClick={() => setStarted(true)}
              className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 px-12 rounded-xl transition-all shadow-xl text-lg hover:-translate-y-1 hover:shadow-accent-500/20"
            >
              Start Free Quiz Now
            </button>
          </div>
        </section>
      )}

      {started && !isFinished && (
        <section className="pt-32 pb-16 max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl relative">
            <div className="flex justify-between items-center mb-6 border-b border-dark-100 pb-4">
              <span className="bg-dark-100 text-dark-700 font-bold px-3 py-1 rounded-lg text-sm">
                Question {currentIndex + 1} of {freeDailyMCQs.length}
              </span>
              <span className="text-primary-600 font-bold text-sm tracking-wide uppercase">
                {currentMCQ.subject}
              </span>
            </div>
            
            <div className="flex gap-4 items-start mb-8 mt-2">
              <div className="w-10 h-10 bg-primary-600 text-[#111] rounded-xl flex items-center justify-center font-extrabold text-lg shrink-0 mt-0.5 shadow-md">Q</div>
              <h3 className="text-xl md:text-2xl font-bold text-dark-900 leading-relaxed">
                {currentMCQ.question}
              </h3>
            </div>
            
            <div className="space-y-4 mb-10">
              {['A', 'B', 'C', 'D'].map((opt) => {
                const isSelected = responses[currentMCQ.id] === opt;
                return (
                  <button 
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-5 rounded-2xl border-2 ${isSelected ? 'border-primary-600 bg-primary-50 shadow-md transform scale-[1.01]' : 'border-dark-100 bg-white hover:border-primary-300 hover:bg-dark-50'} text-dark-800 font-medium flex items-center transition-all`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold mr-4 ${isSelected ? 'bg-primary-600 text-white' : 'bg-dark-100 text-dark-500'}`}>
                      {opt}
                    </div>
                    <span className="text-lg">{currentMCQ.options[opt as keyof typeof currentMCQ.options]}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="flex justify-between items-center pt-6 border-t border-dark-100">
              <button 
                onClick={() => navigateQuestion(-1)}
                disabled={currentIndex === 0}
                className="px-6 py-3 bg-dark-50 text-dark-600 font-bold rounded-xl hover:bg-dark-100 transition-colors disabled:opacity-50"
              >
                Previous
              </button>
              
              {currentIndex === freeDailyMCQs.length - 1 ? (
                <button 
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-accent-500 text-white font-bold rounded-xl hover:bg-accent-600 transition-all shadow-lg hover:-translate-y-0.5"
                >
                  Submit Quiz
                </button>
              ) : (
                <button 
                  onClick={() => navigateQuestion(1)}
                  className="px-8 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:-translate-y-0.5"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {isFinished && (
        <section className="pt-32 pb-16 max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-dark-900 mb-6">Quiz Completed!</h2>
            <div className="inline-block bg-primary-50 border-2 border-primary-100 rounded-3xl p-8 mb-8 shadow-inner">
              <p className="text-dark-600 font-bold mb-2 uppercase tracking-widest text-sm">Your Score</p>
              <p className="text-6xl font-extrabold text-primary-600">{calculateScore()} <span className="text-3xl text-dark-400">/ {freeDailyMCQs.length}</span></p>
            </div>
            <p className="text-lg text-dark-600 max-w-xl mx-auto mb-10 leading-relaxed">
              Great effort! Review the detailed explanations below to understand your mistakes and improve your concepts.
            </p>
            <Link href="/login" className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-xl text-lg hover:-translate-y-1">
              Unlock 10,000+ MCQs & Leaderboard
            </Link>
          </div>

          <div className="flex items-center justify-between mb-8 border-b border-white/20 pb-4">
             <h3 className="text-2xl font-bold text-white">Detailed Solutions</h3>
          </div>
          
          <div className="space-y-6">
            {freeDailyMCQs.map((mcq, index) => {
              const selectedOpt = responses[mcq.id];
              const isCorrect = selectedOpt === mcq.correctAnswer;
              
              return (
                <div key={mcq.id} className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-white shrink-0 shadow-md ${isCorrect ? 'bg-success-500' : 'bg-red-500'}`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-bold text-dark-900 leading-relaxed mb-6">{mcq.question}</h4>
                      
                      <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        {['A', 'B', 'C', 'D'].map((opt) => {
                          const isThisCorrect = opt === mcq.correctAnswer;
                          const isThisSelected = opt === selectedOpt;
                          
                          let optClass = "border-dark-100 bg-dark-50 text-dark-600";
                          if (isThisCorrect) {
                            optClass = "border-success-500 bg-success-50 text-success-700 font-bold shadow-sm ring-1 ring-success-500";
                          } else if (isThisSelected && !isThisCorrect) {
                            optClass = "border-red-500 bg-red-50 text-red-700 font-bold opacity-70";
                          }
                          
                          return (
                            <div key={opt} className={`p-4 rounded-xl border-2 ${optClass} flex items-center`}>
                              <span className="font-bold mr-3">{opt}.</span>
                              {mcq.options[opt as keyof typeof mcq.options]}
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
                        <span className="text-xs font-bold text-primary-700 uppercase tracking-widest block mb-3">Explanation</span>
                        <p className="text-dark-800 leading-relaxed text-sm md:text-base">{mcq.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
