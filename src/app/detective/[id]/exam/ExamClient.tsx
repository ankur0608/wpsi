"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ExamClientProps {
  challenge: {
    id: string;
    title: string;
    durationMinutes: number;
    questions: any[];
  };
}

type AnswerKey = "A" | "B" | "C" | "D" | "E";

export default function ExamClient({ challenge }: ExamClientProps) {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, AnswerKey | undefined>>({});
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  const [visited, setVisited] = useState<string[]>([challenge.questions[0]?.mcqId || challenge.questions[0]?.id]);
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  const [timeLeft, setTimeLeft] = useState(challenge.durationMinutes * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<string>('English');

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const currentQuestion = challenge.questions[currentIndex];

  const getOptionEntries = (q: any): Array<[AnswerKey, string]> => {
    return [
      ["A", q.mcq?.optionA || q.optionA],
      ["B", q.mcq?.optionB || q.optionB],
      ["C", q.mcq?.optionC || q.optionC],
      ["D", q.mcq?.optionD || q.optionD],
      ["E", "Not Attempted"]
    ];
  };

  const selectOption = (key: AnswerKey) => {
    setResponses((prev) => ({ ...prev, [currentQuestion.mcqId || currentQuestion.id]: key }));
  };

  const navigateQuestion = (dir: number) => {
    const nextIdx = currentIndex + dir;
    if (nextIdx >= 0 && nextIdx < challenge.questions.length) {
      setCurrentIndex(nextIdx);
      const targetId = challenge.questions[nextIdx].mcqId || challenge.questions[nextIdx].id;
      if (!visited.includes(targetId)) {
        setVisited((prev) => [...prev, targetId]);
      }
    }
  };

  const jumpToQuestion = (idx: number) => {
    setCurrentIndex(idx);
    const targetId = challenge.questions[idx].mcqId || challenge.questions[idx].id;
    if (!visited.includes(targetId)) {
      setVisited((prev) => [...prev, targetId]);
    }
  };

  const toggleReviewMark = () => {
    const qId = currentQuestion.mcqId || currentQuestion.id;
    setMarkedForReview((prev) =>
      prev.includes(qId)
        ? prev.filter((id) => id !== qId)
        : [...prev, qId]
    );
  };

  const toggleBookmark = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const qId = currentQuestion.mcqId || currentQuestion.id;
    setBookmarked((prev) =>
      prev.includes(qId)
        ? prev.filter((id) => id !== qId)
        : [...prev, qId]
    );
  };

  const toggleFullScreen = () => {
    setIsFullScreenMode(!isFullScreenMode);
  };

  const clearAnswer = () => {
    setResponses((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.mcqId || currentQuestion.id];
      return next;
    });
  };

  const renderPaletteState = (q: any) => {
    const qId = q.mcqId || q.id;
    const res = responses[qId];
    const isMarked = markedForReview.includes(qId);
    const isVisited = visited.includes(qId);

    if (isMarked) return "s-review";
    if (res !== undefined && res !== "E") return "s-answered";
    if (res === "E") return "s-na";
    if (isVisited) return "s-unanswered";
    return "s-none";
  };

  const paletteStyleMap: Record<string, React.CSSProperties> = {
    "s-none": { background: "#fff", color: "#64748b", borderColor: "#e2e8f0" },
    "s-answered": { background: "rgba(34,197,94,0.15)", color: "#15803d", borderColor: "rgba(34,197,94,0.3)" },
    "s-review": { background: "rgba(245,158,11,0.15)", color: "#b45309", borderColor: "rgba(245,158,11,0.3)" },
    "s-unanswered": { background: "rgba(239,68,68,0.1)", color: "#ef4444", borderColor: "rgba(239,68,68,0.2)" },
    "s-na": { background: "rgba(100,116,139,0.1)", color: "#64748b", borderColor: "rgba(100,116,139,0.2)" }
  };

  const confirmSubmit = () => {
    handleSubmit();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

      if (showShortcuts) {
        if (e.key === 'Escape') setShowShortcuts(false);
        return;
      }

      switch (e.key) {
        case '1': selectOption('A'); break;
        case '2': selectOption('B'); break;
        case '3': selectOption('C'); break;
        case '4': selectOption('D'); break;
        case '5': selectOption('E'); break; // E -> Not Attempted
        case 'ArrowLeft': navigateQuestion(-1); break;
        case 'ArrowRight': navigateQuestion(1); break;
        case 'r':
        case 'R': toggleReviewMark(); break;
        case 'c':
        case 'C': clearAnswer(); break;
        case 'Enter':
          if (e.ctrlKey) confirmSubmit();
          else navigateQuestion(1);
          break;
        case '?': setShowShortcuts(true); break;
        case 'f':
        case 'F': toggleFullScreen(); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showShortcuts, isFullScreenMode, currentQuestion]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/detective/challenges/` + challenge.id + `/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: responses })
      });
      if (res.ok) {
        router.push(`/detective/` + challenge.id + `/results`);
      } else {
        alert("Failed to submit challenge. Please try again.");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting.");
      setIsSubmitting(false);
    }
  };

  if (!currentQuestion) return <div className="p-8 text-center">Loading...</div>;

  const qId = currentQuestion.mcqId || currentQuestion.id;
  const currentResponse = responses[qId];
  const questionText = currentQuestion.mcq?.question || currentQuestion.question;
  const questionImage = currentQuestion.mcq?.imageUrl || currentQuestion.imageUrl;

  return (
    <div className={`grid gap-6 xl:grid-cols-[1fr_320px] ${isFullScreenMode ? 'fixed inset-0 z-[9999] bg-dark-50 p-4 md:p-6 overflow-y-auto' : 'w-full max-w-[1400px] mx-auto p-4 md:p-6 pb-20 xl:pb-6'}`}>
      <section className="w-full min-w-0">
        <div className="mx-auto max-w-[800px] w-full min-w-0 rounded-[1.5rem] bg-white text-dark-900 p-4 md:p-6 shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-base md:text-lg font-bold m-0">Question {currentIndex + 1} of {challenge.questions.length}</h2>
              {currentQuestion.part && (
                <span className="bg-[#38bdf8]/10 border border-[#38bdf8]/25 text-[#38bdf8] px-3 py-1 rounded-full text-xs font-semibold">
                  Part {currentQuestion.part}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowShortcuts(true)}
                className="bg-transparent border border-dark-100 text-primary-600 px-3 py-2 rounded-lg cursor-pointer flex flex-col items-center text-[10px] gap-1 hover:bg-dark-50 transition-colors"
              >
                <i className="fa-solid fa-keyboard text-base"></i>
                <span className="hidden md:inline">Shortcuts</span>
              </button>
              <button 
                onClick={toggleFullScreen}
                className="bg-transparent border border-dark-100 text-primary-600 px-3 py-2 rounded-lg cursor-pointer flex flex-col items-center text-[10px] gap-1 hover:bg-dark-50 transition-colors"
              >
                <i className={`fa-solid ${isFullScreenMode ? 'fa-compress' : 'fa-expand'} text-base`}></i>
                <span className="hidden md:inline">{isFullScreenMode ? 'Exit' : 'Full Screen'}</span>
              </button>
              <button 
                onClick={(e) => toggleBookmark(e)}
                className="bg-transparent border border-dark-100 text-primary-600 px-3 py-2 rounded-lg cursor-pointer flex flex-col items-center text-[10px] gap-1 hover:bg-dark-50 transition-colors"
              >
                <i className={`fa-bookmark ${bookmarked.includes(qId) ? 'fa-solid' : 'fa-regular'} text-base`}></i>
                <span className="hidden md:inline">Save</span>
              </button>
            </div>
          </div>

          {/* Progress */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4 md:mb-6">
            <div className="flex-1 h-1 bg-dark-50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-600 rounded-full transition-all" 
                style={{ width: `${((currentIndex + 1) / challenge.questions.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-primary-600 font-semibold text-right md:text-left">
              {Math.round(((currentIndex + 1) / challenge.questions.length) * 100)}% Completed
            </span>
          </div>

          {/* Meta Cards */}
          <div className="flex flex-nowrap gap-3 mb-5 md:mb-6 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
            <div className="flex-1 min-w-[130px] bg-dark-50 border border-dark-100 rounded-xl p-1.5 md:p-2 flex items-center gap-1.5 md:gap-2">
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center text-sm bg-[#8b5cf6]/10 text-[#8b5cf6] shrink-0">
                <i className="fa-solid fa-book-open"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-dark-400 uppercase tracking-wider">Challenge</span>
                <span className="text-xs font-semibold leading-tight">{challenge.title || 'N/A'}</span>
              </div>
            </div>
            <div className="flex-1 min-w-[130px] bg-dark-50 border border-dark-100 rounded-xl p-1.5 md:p-2 flex items-center gap-1.5 md:gap-2">
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center text-sm bg-[#10b981]/10 text-[#10b981] shrink-0">
                <i className="fa-regular fa-file-lines"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-dark-400 uppercase tracking-wider">Topic</span>
                <span className="text-xs font-semibold leading-tight">{currentQuestion.topic || 'Detective Challenge'}</span>
              </div>
            </div>
            <div className="flex-1 min-w-[100px] bg-dark-50 border border-dark-100 rounded-xl p-1.5 md:p-2 flex items-center gap-1.5 md:gap-2">
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center text-sm bg-[#3b82f6]/10 text-[#3b82f6] shrink-0">
                <i className="fa-solid fa-chart-simple"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-dark-400 uppercase tracking-wider">Difficulty</span>
                <span className="text-xs font-semibold leading-tight">{currentQuestion.difficulty || 'Medium'}</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-row justify-between items-center gap-2 mb-3 md:mb-5">
            <div className="flex bg-dark-50 rounded-lg p-0.5">
              <button 
                onClick={() => setActiveLanguage('English')}
                className={`px-2 md:px-3 py-1 rounded-md text-xs font-semibold transition-colors ${activeLanguage === 'English' ? 'bg-primary-600 text-[#111]' : 'text-dark-400 hover:text-dark-900'}`}
              >
                English
              </button>
            </div>
          </div>

          {/* Question Area */}
          <div className="flex gap-3 items-start mb-5 md:mb-6 mt-2">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-primary-600 text-[#111] rounded-md flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">Q</div>
            <div className="flex-1 text-sm md:text-base leading-snug md:leading-relaxed text-dark-900 font-medium">
              {questionText}
              {questionImage && (
                <div className="mt-4 mb-2 flex justify-center w-full">
                  <img 
                    src={questionImage} 
                    alt="Question Image" 
                    className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] object-contain rounded-lg border border-dark-100 cursor-pointer hover:opacity-90 shadow-sm transition-opacity bg-white" 
                    onClick={() => setSelectedImage(questionImage)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Options List */}
          <div className="flex flex-col gap-3 mb-6">
            {getOptionEntries(currentQuestion).map(([key, label]) => {
              const selected = currentResponse === key;
              
              let bgClass = "bg-dark-50";
              let borderClass = "border-dark-100";
              let radioClass = "border-dark-100";
              let radioFill = false;

              if (selected && key === 'E') {
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
                  key={key}
                  type="button"
                  onClick={() => selectOption(key)}
                  className={`w-full text-left rounded-xl border ${borderClass} ${bgClass} p-3 md:p-4 flex items-center gap-3 cursor-pointer transition-all hover:bg-dark-50 ${selected ? 'scale-[1.01]' : 'hover:-translate-y-0.5'}`}
                >
                  <div className={`w-5 h-5 md:w-7 md:h-7 rounded md:rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${selected ? 'bg-primary-100 text-primary-600' : 'bg-dark-50 text-dark-400'}`}>
                    {key}
                  </div>
                  <div className="flex-1 text-xs md:text-sm leading-tight text-dark-900">{label}</div>
                  
                  <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center ${radioClass}`}>
                    {radioFill && <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${key === 'E' ? 'bg-[#0ea5e9]' : 'bg-primary-600'}`}></div>}
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
              className={`col-span-1 md:flex-1 bg-dark-50 border border-dark-100 p-1.5 sm:p-2 rounded-xl flex flex-col md:flex-row items-center justify-center gap-1 text-[9px] sm:text-[10px] hover:bg-dark-50 transition-colors min-w-0 ${markedForReview.includes(qId) ? 'text-primary-600' : 'text-dark-600'}`}
            >
              <i className={`fa-bookmark ${markedForReview.includes(qId) ? 'fa-solid' : 'fa-regular'} text-sm`}></i>
              <span className="truncate">Review</span>
            </button>

            {/* Timer */}
            <div className="col-span-3 md:col-span-1 md:flex-[1.5] bg-dark-50 border border-dark-100 text-dark-600 py-1.5 px-3 rounded-xl flex flex-row md:flex-col items-center justify-between md:justify-center gap-1 md:gap-0 order-first md:order-none mb-2 md:mb-0">
              <span className="text-[9px] text-dark-400 uppercase tracking-wider">Time Left</span>
              <span className="text-sm md:text-base text-[#38bdf8] font-bold">{formatTime(timeLeft)}</span>
            </div>

            <button 
              onClick={currentIndex === challenge.questions.length - 1 ? confirmSubmit : () => navigateQuestion(1)}
              className="col-span-3 md:flex-[2] bg-primary-600 text-[#111] p-3 md:p-3 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base font-bold hover:bg-primary-700 transition-colors mt-2 md:mt-0 shadow-lg shadow-[#ea580c]/20"
            >
              <i className="fa-regular fa-paper-plane"></i>
              <span>{currentIndex === challenge.questions.length - 1 ? (isSubmitting ? 'Submitting...' : 'Submit Exam') : 'Next'}</span>
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
            {challenge.questions.map((q, idx) => {
              const ps     = renderPaletteState(q);
              const active = idx === currentIndex;
              
              return (
                <button
                  key={q.id || q.mcqId}
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
              {challenge.questions.map((q, idx) => {
                const ps     = renderPaletteState(q);
                const active = idx === currentIndex;
                return (
                  <button
                    key={q.id || q.mcqId}
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

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 z-[10010] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-dark-100 rounded-3xl p-7 max-w-md w-full shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary-600"></div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                  <i className="fa-solid fa-keyboard text-xl"></i>
                </div>
                <h3 className="text-xl font-display font-bold text-dark-900">Keyboard Shortcuts</h3>
              </div>
              <button onClick={() => setShowShortcuts(false)} className="text-dark-400 hover:text-dark-900 transition-colors">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-dark-700">
              <div className="flex justify-between border-b border-dark-50 pb-2"><span>Option A</span> <kbd className="font-mono font-bold bg-dark-50 px-2 rounded">1</kbd></div>
              <div className="flex justify-between border-b border-dark-50 pb-2"><span>Option B</span> <kbd className="font-mono font-bold bg-dark-50 px-2 rounded">2</kbd></div>
              <div className="flex justify-between border-b border-dark-50 pb-2"><span>Option C</span> <kbd className="font-mono font-bold bg-dark-50 px-2 rounded">3</kbd></div>
              <div className="flex justify-between border-b border-dark-50 pb-2"><span>Option D</span> <kbd className="font-mono font-bold bg-dark-50 px-2 rounded">4</kbd></div>
              <div className="flex justify-between border-b border-dark-50 pb-2"><span>Not Attempted</span> <kbd className="font-mono font-bold bg-dark-50 px-2 rounded">5</kbd></div>
              <div className="flex justify-between border-b border-dark-50 pb-2"><span>Clear Answer</span> <kbd className="font-mono font-bold bg-dark-50 px-2 rounded">C</kbd></div>
              <div className="flex justify-between border-b border-dark-50 pb-2"><span>Prev Question</span> <kbd className="font-mono font-bold bg-dark-50 px-2 rounded">←</kbd></div>
              <div className="flex justify-between border-b border-dark-50 pb-2"><span>Next Question</span> <kbd className="font-mono font-bold bg-dark-50 px-2 rounded">→</kbd></div>
              <div className="flex justify-between border-b border-dark-50 pb-2"><span>Mark Review</span> <kbd className="font-mono font-bold bg-dark-50 px-2 rounded">R</kbd></div>
              <div className="flex justify-between border-b border-dark-50 pb-2"><span>Fullscreen</span> <kbd className="font-mono font-bold bg-dark-50 px-2 rounded">F</kbd></div>
              <div className="flex justify-between border-b border-dark-50 pb-2 col-span-2"><span>Save & Next</span> <kbd className="font-mono font-bold bg-dark-50 px-2 rounded">Enter</kbd></div>
              <div className="flex justify-between border-b border-dark-50 pb-2 col-span-2"><span>Submit Test</span> <span className="flex gap-1"><kbd className="font-mono font-bold bg-dark-50 px-2 rounded">Ctrl</kbd> + <kbd className="font-mono font-bold bg-dark-50 px-2 rounded">Enter</kbd></span></div>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowShortcuts(false)}
                className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-bold text-sm shadow-[0_10px_20px_rgba(99,102,241,0.2)] hover:bg-primary-700 transition-all hover:scale-105"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
