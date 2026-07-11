"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface MCQ {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation: string | null;
  difficulty: string;
  topicId: string;
  language?: string;
  translations?: MCQ[];
  subject?: string;
  topic?: string;
  part?: string;
}

export default function DailyPracticePage() {
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // New state
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [visitedList, setVisitedList] = useState<string[]>([]);
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);

  const [isFinished, setIsFinished] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<string>('English');
  const [finalResult, setFinalResult] = useState<{score: number, total: number} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/mcq/daily')
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setMcqs(data.data);
          if (data.data.length > 0) {
            setVisitedList([data.data[0].id]);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch daily MCQs:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (mcqs.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No questions available today.</h2>
        <Link href="/dashboard" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (isFinished && finalResult) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 transition-all duration-500">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden text-center p-10 border border-gray-100">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-trophy text-4xl text-green-500"></i>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Daily Practice Complete!</h2>
          <p className="text-gray-500 mb-8 text-lg">Great job on practicing today.</p>
          
          <div className="flex justify-center gap-8 mb-8">
            <div className="bg-gray-50 rounded-xl p-4 min-w-[120px]">
              <div className="text-sm text-gray-500 font-medium mb-1">Score</div>
              <div className="text-4xl font-bold text-indigo-600">{finalResult.score}/{finalResult.total}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 min-w-[120px]">
              <div className="text-sm text-gray-500 font-medium mb-1">Accuracy</div>
              <div className="text-4xl font-bold text-emerald-500">{Math.round((finalResult.score/finalResult.total)*100)}%</div>
            </div>
          </div>
          
          <Link href="/dashboard" className="inline-block w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all transform hover:-translate-y-1">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8 sm:p-12 text-center transition-all duration-500">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-50 mb-6 text-indigo-500 text-3xl">
            <i className="fa-solid fa-fire"></i>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Daily 20 MCQ Practice</h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Keep your streak alive! A fresh set of 20 randomly picked questions covering different difficulty levels: 10 Easy, 5 Medium, and 5 Hard.
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-8 text-left">
            <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex flex-col items-center">
              <span className="text-2xl font-bold text-green-600 mb-1">10</span>
              <span className="text-xs font-medium text-green-800 uppercase tracking-wider">Easy</span>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex flex-col items-center">
              <span className="text-2xl font-bold text-yellow-600 mb-1">5</span>
              <span className="text-xs font-medium text-yellow-800 uppercase tracking-wider">Medium</span>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex flex-col items-center">
              <span className="text-2xl font-bold text-red-600 mb-1">5</span>
              <span className="text-xs font-medium text-red-800 uppercase tracking-wider">Hard</span>
            </div>
          </div>
          
          <button 
            onClick={() => setStarted(true)}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
          >
            Start Practice Now
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = mcqs[currentIndex];
  const displayedQuestion = currentQuestion && activeLanguage === (currentQuestion.language || 'English')
    ? currentQuestion
    : (currentQuestion?.translations?.find(t => (t.language || 'English') === activeLanguage) || currentQuestion);
  
  const currentResponse = responses[currentQuestion.id];

  const selectOption = (key: string) => {
    setResponses(prev => ({ ...prev, [currentQuestion.id]: key }));
    if (!visitedList.includes(currentQuestion.id)) {
      setVisitedList(prev => [...prev, currentQuestion.id]);
    }
    setMarkedForReview(prev => prev.filter(id => id !== currentQuestion.id));
  };

  const navigateQuestion = (dir: number) => {
    const next = currentIndex + dir;
    if (next >= 0 && next < mcqs.length) {
      setCurrentIndex(next);
      const nextId = mcqs[next].id;
      if (!visitedList.includes(nextId)) {
        setVisitedList(prev => [...prev, nextId]);
      }
    }
  };

  const jumpToQuestion = (index: number) => {
    if (index >= 0 && index < mcqs.length) {
      setCurrentIndex(index);
      const nextId = mcqs[index].id;
      if (!visitedList.includes(nextId)) {
        setVisitedList(prev => [...prev, nextId]);
      }
    }
  };

  const toggleReviewMark = () => {
    setMarkedForReview(prev => 
      prev.includes(currentQuestion.id) ? prev.filter(id => id !== currentQuestion.id) : [...prev, currentQuestion.id]
    );
  };

  const toggleBookmark = () => {
    setBookmarked(prev => 
      prev.includes(currentQuestion.id) ? prev.filter(id => id !== currentQuestion.id) : [...prev, currentQuestion.id]
    );
  };

  const submitPractice = async () => {
    setIsSubmitting(true);
    let score = 0;
    
    const mcqsDetails = mcqs.map(q => {
      const ans = responses[q.id];
      const isCorrect = ans === q.correctAnswer;
      if (isCorrect) score++;
      
      const gujTranslation = q.translations?.find(t => t.language === 'Gujarati');
      
      return {
        id: q.id,
        question: q.question,
        questionGuj: gujTranslation?.question || null,
        options: {
          A: q.optionA,
          B: q.optionB,
          C: q.optionC,
          D: q.optionD
        },
        optionsGuj: gujTranslation ? {
          A: gujTranslation.optionA,
          B: gujTranslation.optionB,
          C: gujTranslation.optionC,
          D: gujTranslation.optionD
        } : null,
        correctAnswer: q.correctAnswer,
        selectedOption: ans || null,
        correct: isCorrect,
        explanation: q.explanation,
        explanationGuj: gujTranslation?.explanation || null
      };
    });

    const formattedResponses = mcqsDetails.map(d => ({
      mcqId: d.id,
      answer: d.selectedOption || 'E'
    }));

    const percentage = (score / mcqs.length) * 100;
    
    try {
      await fetch('/api/test-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Daily Challenge - ${new Date().toLocaleDateString('en-GB')}`,
          mode: 'daily',
          totalMarks: mcqs.length,
          earnedMarks: score,
          percentage: percentage,
          responses: formattedResponses,
          details: mcqsDetails
        })
      });
    } catch (error) {
      console.error('Failed to submit practice', error);
    }
    
    setFinalResult({ score, total: mcqs.length });
    setIsFinished(true);
    setIsSubmitting(false);
  };

  const renderPaletteState = (q: MCQ) => {
    const res = responses[q.id];
    const visited = visitedList.includes(q.id);
    const marked = markedForReview.includes(q.id);
    if (marked) return 's-review';
    if (res === undefined && !visited) return 's-none';
    if (res === undefined && visited) return 's-unanswered';
    if (res === 'E') return 's-na';
    return 's-answered';
  };

  const paletteStyleMap: Record<string, { background: string; borderColor: string; color: string }> = {
    's-none':      { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: "#94a3b8" },
    's-unanswered':{ background: 'rgba(239,68,68,0.1)',    borderColor: 'rgba(239,68,68,0.25)',    color: '#fca5a5' },
    's-na':        { background: 'rgba(56,189,248,0.12)',  borderColor: 'rgba(56,189,248,0.28)',   color: '#7dd3fc' },
    's-answered':  { background: 'rgba(16,185,129,0.12)',  borderColor: 'rgba(16,185,129,0.26)',   color: '#86efac' },
    's-review':    { background: 'rgba(139,92,246,0.12)',  borderColor: 'rgba(139,92,246,0.28)',   color: '#c4b5fd' },
  };

  const options = [
    { key: 'A', value: displayedQuestion.optionA },
    { key: 'B', value: displayedQuestion.optionB },
    { key: 'C', value: displayedQuestion.optionC },
    { key: 'D', value: displayedQuestion.optionD },
    { key: 'E', value: 'Not Attempted' },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <section className="w-full min-w-0">
          <div className="mx-auto max-w-[800px] w-full min-w-0 rounded-[1.5rem] bg-white text-dark-900 p-4 md:p-6 shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-base md:text-lg font-bold m-0">Question {currentIndex + 1} of {mcqs.length}</h2>
                {currentQuestion.part && (
                  <span className="bg-[#38bdf8]/10 border border-[#38bdf8]/25 text-[#38bdf8] px-3 py-1 rounded-full text-xs font-semibold">
                    Part {currentQuestion.part}
                  </span>
                )}
              </div>
              <button 
                onClick={toggleBookmark}
                className="bg-transparent border border-dark-100 text-primary-600 px-3 py-2 rounded-lg cursor-pointer flex flex-col items-center text-[10px] gap-1 hover:bg-dark-50 transition-colors"
              >
                <i className={`fa-bookmark ${bookmarked.includes(currentQuestion.id) ? 'fa-solid' : 'fa-regular'} text-base`}></i>
                <span className="hidden md:inline">Save</span>
              </button>
            </div>

            {/* Progress */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4 md:mb-6">
              <div className="flex-1 h-1 bg-dark-50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-600 rounded-full transition-all" 
                  style={{ width: `${((currentIndex + 1) / mcqs.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-primary-600 font-semibold text-right md:text-left">
                {Math.round(((currentIndex + 1) / mcqs.length) * 100)}% Completed
              </span>
            </div>

            {/* Meta Cards */}
            <div className="flex flex-nowrap gap-3 mb-5 md:mb-6 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
              <div className="flex-1 min-w-[130px] bg-dark-50 border border-dark-100 rounded-xl p-1.5 md:p-2 flex items-center gap-1.5 md:gap-2">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center text-sm bg-[#8b5cf6]/10 text-[#8b5cf6] shrink-0">
                  <i className="fa-solid fa-book-open"></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-dark-400 uppercase tracking-wider">Subject</span>
                  <span className="text-xs font-semibold leading-tight">{currentQuestion.subject || 'Mixed'}</span>
                </div>
              </div>
              <div className="flex-1 min-w-[130px] bg-dark-50 border border-dark-100 rounded-xl p-1.5 md:p-2 flex items-center gap-1.5 md:gap-2">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center text-sm bg-[#10b981]/10 text-[#10b981] shrink-0">
                  <i className="fa-regular fa-file-lines"></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-dark-400 uppercase tracking-wider">Topic</span>
                  <span className="text-xs font-semibold leading-tight">{currentQuestion.topic || 'Various'}</span>
                </div>
              </div>
              <div className="flex-1 min-w-[100px] bg-dark-50 border border-dark-100 rounded-xl p-1.5 md:p-2 flex items-center gap-1.5 md:gap-2">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center text-sm bg-[#3b82f6]/10 text-[#3b82f6] shrink-0">
                  <i className="fa-solid fa-chart-simple"></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-dark-400 uppercase tracking-wider">Difficulty</span>
                  <span className="text-xs font-semibold leading-tight">{currentQuestion.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-row justify-between items-center gap-2 mb-3 md:mb-5">
              <div className="flex bg-dark-50 rounded-lg p-0.5">
                {(!currentQuestion.language || currentQuestion.language === 'English' || currentQuestion.language === 'Both' || currentQuestion.translations?.some(t => (t.language || 'English') === 'English')) && (
                  <button 
                    onClick={() => setActiveLanguage('English')}
                    className={`px-2 md:px-3 py-1 rounded-md text-xs font-semibold transition-colors ${activeLanguage === 'English' ? 'bg-primary-600 text-[#111]' : 'text-dark-400 hover:text-dark-900'}`}
                  >
                    English
                  </button>
                )}
                {(currentQuestion.language === 'Gujarati' || currentQuestion.language === 'Both' || currentQuestion.translations?.some(t => (t.language || 'English') === 'Gujarati')) && (
                  <button 
                    onClick={() => setActiveLanguage('Gujarati')}
                    className={`px-2 md:px-3 py-1 rounded-md text-xs font-semibold transition-colors ${activeLanguage === 'Gujarati' ? 'bg-primary-600 text-[#111]' : 'text-dark-400 hover:text-dark-900'}`}
                  >
                    Gujarati
                  </button>
                )}
              </div>
            </div>

            {/* Question Area */}
            <div className="flex gap-3 items-start mb-5 md:mb-6 mt-2">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-primary-600 text-[#111] rounded-md flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">Q</div>
              <div className="flex-1 text-sm md:text-base leading-snug md:leading-relaxed text-dark-900 font-medium">{displayedQuestion?.question}</div>
            </div>

            {/* Options List */}
            <div className="flex flex-col gap-3 mb-6">
              {options.map((opt) => {
                const selected = currentResponse === opt.key;

                let bgClass = "bg-dark-50";
                let borderClass = "border-dark-100";
                let radioClass = "border-dark-100";
                let radioFill = false;

                if (selected && opt.key === 'E') {
                  bgClass = "bg-[#0ea5e9]/10";
                  borderClass = "border-[#0ea5e9]/30";
                  radioClass = "border-[#0ea5e9]";
                  radioFill = true;
                } else if (selected) {
                  bgClass = "bg-primary-50";
                  borderClass = "border-primary-200";
                  radioClass = "border-primary-600";
                  radioFill = true;
                }

                return (
                  <button 
                    key={opt.key}
                    type="button"
                    onClick={() => selectOption(opt.key)}
                    className={`w-full text-left rounded-xl border ${borderClass} ${bgClass} p-3 md:p-4 flex items-center gap-3 cursor-pointer transition-all hover:bg-dark-50 ${selected ? 'scale-[1.01]' : 'hover:-translate-y-0.5'}`}
                  >
                    <div className={`w-5 h-5 md:w-7 md:h-7 rounded md:rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${selected ? 'bg-primary-100 text-primary-600' : 'bg-dark-50 text-dark-400'}`}>
                      {opt.key}
                    </div>
                    <div className="flex-1 text-xs md:text-sm leading-tight text-dark-900">{opt.value}</div>
                    
                    <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center ${radioClass}`}>
                      {radioFill && <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${opt.key === 'E' ? 'bg-[#0ea5e9]' : 'bg-primary-600'}`}></div>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Bar */}
            <div className="grid grid-cols-3 md:flex md:items-stretch gap-2 md:gap-3 mt-4">
              <button 
                onClick={() => setIsMobilePaletteOpen(true)}
                className="xl:hidden col-span-1 md:flex-1 bg-dark-50 border border-dark-100 text-dark-600 p-1.5 sm:p-2 rounded-xl flex flex-col md:flex-row items-center justify-center gap-1 text-[9px] sm:text-[10px] hover:bg-dark-50 transition-colors min-w-0"
              >
                <i className="fa-solid fa-grip text-sm"></i>
                <span className="truncate">Palette</span>
              </button>
              <button 
                onClick={() => navigateQuestion(-1)} disabled={currentIndex === 0}
                className="col-span-1 md:flex-1 bg-dark-50 border border-dark-100 text-dark-600 p-1.5 sm:p-2 rounded-xl flex flex-col md:flex-row items-center justify-center gap-1 text-[9px] sm:text-[10px] hover:bg-dark-50 transition-colors disabled:opacity-40 min-w-0"
              >
                <i className="fa-solid fa-arrow-left text-sm"></i>
                <span className="truncate">Prev</span>
              </button>
              <button 
                onClick={toggleReviewMark}
                className={`col-span-1 md:flex-1 bg-dark-50 border border-dark-100 p-1.5 sm:p-2 rounded-xl flex flex-col md:flex-row items-center justify-center gap-1 text-[9px] sm:text-[10px] hover:bg-dark-50 transition-colors min-w-0 ${markedForReview.includes(currentQuestion.id) ? 'text-primary-600' : 'text-dark-600'}`}
              >
                <i className={`fa-bookmark ${markedForReview.includes(currentQuestion.id) ? 'fa-solid' : 'fa-regular'} text-sm`}></i>
                <span className="truncate">Review</span>
              </button>
              <button 
                onClick={currentIndex === mcqs.length - 1 ? submitPractice : () => navigateQuestion(1)}
                disabled={isSubmitting}
                className="col-span-3 md:flex-[2] bg-primary-600 text-[#111] p-3 md:p-3 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base font-bold hover:bg-primary-700 transition-colors mt-2 md:mt-0 shadow-lg shadow-[#ea580c]/20 disabled:opacity-50"
              >
                <i className="fa-regular fa-paper-plane"></i>
                <span>{currentIndex === mcqs.length - 1 ? (isSubmitting ? 'Submitting...' : 'Submit Practice') : 'Next'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Sidebar: Question Palette (Desktop Only) */}
        <aside className="hidden xl:block">
          <div className="w-full rounded-[1.5rem] bg-white p-5 shadow-2xl border border-dark-100 h-fit sticky top-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-sm font-semibold text-dark-900 m-0">Question Palette</h3>
              <i className="fa-solid fa-chevron-up text-dark-400 text-xs"></i>
            </div>
            
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-sm bg-green-500"></div>
                <span className="text-[11px] text-dark-600">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-sm bg-amber-500"></div>
                <span className="text-[11px] text-dark-600">Review</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-sm bg-blue-500"></div>
                <span className="text-[11px] text-dark-600">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-sm bg-red-500"></div>
                <span className="text-[11px] text-dark-600">Not Answered</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <div className="w-3.5 h-3.5 rounded-sm bg-slate-500 border border-slate-500 flex items-center justify-center text-[8px] font-bold text-white">E</div>
                <span className="text-[11px] text-dark-600">Not Attempted</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 mb-6">
              {mcqs.map((q, idx) => {
                const ps = renderPaletteState(q);
                const active = idx === currentIndex;
                
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => jumpToQuestion(idx)}
                    className="aspect-square rounded-lg border border-dark-100 text-[11px] font-bold transition-transform hover:scale-105"
                    style={{ 
                      ...paletteStyleMap[ps], 
                      boxShadow: active ? '0 0 0 2px rgba(59,130,246,0.5)' : 'none',
                      ...(active && ps !== 's-review' && { background: '#3b82f6', color: '#fff', borderColor: '#3b82f6' }),
                      ...(active && ps === 's-review' && { background: '#f59e0b', color: '#fff', borderColor: '#3b82f6' }),
                      ...(ps === 's-answered' && !active && { background: '#22c55e', color: '#fff', borderColor: '#22c55e' }),
                      ...(ps === 's-review' && !active && { background: '#f59e0b', color: '#fff', borderColor: '#f59e0b' }),
                      ...(ps === 's-unanswered' && !active && { background: "#ef4444", color: "#fff", borderColor: "#ef4444" }),
                      ...(ps === 's-na' && !active && { background: "#64748b", color: "#fff", borderColor: "#64748b" }),
                      ...(ps === 's-none' && !active && { background: "#64748b", color: "#fff", borderColor: "#64748b" })
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            
            <div className="flex flex-col gap-2 text-[10px] text-dark-400 border-t border-dark-100 pt-4">
              <div className="flex items-start gap-2">
                <div className="w-2.5 h-2.5 rounded-sm bg-green-500 mt-0.5 shrink-0"></div>
                <span><span className="text-dark-600">Answered:</span> You have answered the question</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2.5 h-2.5 rounded-sm bg-amber-500 mt-0.5 shrink-0"></div>
                <span><span className="text-dark-600">Review:</span> Marked for review</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2.5 h-2.5 rounded-sm bg-red-500 mt-0.5 shrink-0"></div>
                <span><span className="text-dark-600">Not Answered:</span> You have not answered yet</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2.5 h-2.5 rounded-sm bg-slate-500 border border-slate-500 flex items-center justify-center text-[6px] font-bold text-white mt-0.5 shrink-0">E</div>
                <span><span className="text-dark-600">Not Attempted:</span> You have not visited yet</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2.5 h-2.5 rounded-sm bg-blue-500 mt-0.5 shrink-0"></div>
                <span><span className="text-dark-600">Current:</span> Question you are on</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Palette Modal */}
        {isMobilePaletteOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm overscroll-none xl:hidden" 
            onClick={() => setIsMobilePaletteOpen(false)}
          >
            <div 
              className="w-full max-w-[800px] max-h-[80dvh] overflow-y-auto overscroll-contain touch-pan-y rounded-t-[2rem] border-t border-dark-100 bg-white p-6 shadow-2xl" 
              onClick={e => e.stopPropagation()}
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-dark-400">Question Palette</div>
                <button
                  type="button"
                  onClick={() => setIsMobilePaletteOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-dark-50 text-dark-400 hover:text-dark-900"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              
              <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                {mcqs.map((q, idx) => {
                  const ps = renderPaletteState(q);
                  const active = idx === currentIndex;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        jumpToQuestion(idx);
                        setIsMobilePaletteOpen(false);
                      }}
                      className="aspect-square rounded-xl border text-xs font-bold transition-transform hover:scale-105"
                      style={{ 
                        ...paletteStyleMap[ps], 
                        boxShadow: active ? '0 0 0 2px rgba(59,130,246,0.5)' : 'none',
                        ...(active && ps !== 's-review' && { background: '#3b82f6', color: '#fff', borderColor: '#3b82f6' }),
                        ...(active && ps === 's-review' && { background: '#f59e0b', color: '#fff', borderColor: '#3b82f6' }),
                        ...(ps === 's-answered' && !active && { background: '#22c55e', color: '#fff', borderColor: '#22c55e' }),
                        ...(ps === 's-review' && !active && { background: '#f59e0b', color: '#fff', borderColor: '#f59e0b' }),
                        ...(ps === 's-unanswered' && !active && { background: "#ef4444", color: "#fff", borderColor: "#ef4444" }),
                        ...(ps === 's-na' && !active && { background: "#64748b", color: "#fff", borderColor: "#64748b" }),
                        ...(ps === 's-none' && !active && { background: "#64748b", color: "#fff", borderColor: "#64748b" })
                      }}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
