"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import DynamicNavbar from '@/components/DynamicNavbar';
import { freeDailyMCQs } from '@/data/freeMCQs';
import {
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  Trophy,
  Keyboard,
  Check,
  Bookmark,
  ArrowRight,
  Timer,
  X,
  Layers,
  Sparkles,
  Flame,
  Award
} from 'lucide-react';

export default function DailyChallengePage() {
  const [started, setStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const [seconds, setSeconds] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showMobilePalette, setShowMobilePalette] = useState(false);
  const [solutionFilter, setSolutionFilter] = useState<'all' | 'correct' | 'incorrect' | 'unattempted'>('all');
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);

  const totalQuestions = freeDailyMCQs.length;
  const currentMCQ = freeDailyMCQs[currentIndex];

  // Timer interval
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (started && !isFinished) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [started, isFinished]);

  // Fullscreen event listener to sync state with browser
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        const elem = document.documentElement as HTMLElement & {
          webkitRequestFullscreen?: () => Promise<void>;
          mozRequestFullScreen?: () => Promise<void>;
          msRequestFullscreen?: () => Promise<void>;
        };
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
      } else {
        const doc = document as Document & {
          webkitExitFullscreen?: () => Promise<void>;
          mozCancelFullScreen?: () => Promise<void>;
          msExitFullscreen?: () => Promise<void>;
        };
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn("Fullscreen toggle error:", err);
    }
  }, []);

  const handleSelectOption = useCallback((option: string) => {
    setResponses((prev) => ({ ...prev, [currentMCQ.id]: option }));
  }, [currentMCQ.id]);

  const handleClearResponse = useCallback(() => {
    setResponses((prev) => {
      const next = { ...prev };
      delete next[currentMCQ.id];
      return next;
    });
  }, [currentMCQ.id]);

  const toggleMarkForReview = useCallback(() => {
    setMarked((prev) => ({
      ...prev,
      [currentMCQ.id]: !prev[currentMCQ.id],
    }));
  }, [currentMCQ.id]);

  const navigateQuestion = useCallback((dir: number) => {
    setCurrentIndex((prev) => {
      const next = prev + dir;
      if (next >= 0 && next < totalQuestions) {
        return next;
      }
      return prev;
    });
  }, [totalQuestions]);

  const handleSubmitQuiz = useCallback(() => {
    setShowSubmitModal(false);
    setIsFinished(true);
    if (document.fullscreenElement) {
      try {
        document.exitFullscreen().catch(() => {});
      } catch {
        // ignore
      }
    }
  }, []);

  const handleRestartQuiz = useCallback(() => {
    setResponses({});
    setMarked({});
    setCurrentIndex(0);
    setSeconds(0);
    setIsFinished(false);
    setStarted(true);
    setSolutionFilter('all');
  }, []);

  // Keyboard Shortcuts handler
  useEffect(() => {
    if (!started || isFinished) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside form inputs
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      // Handle Modals
      if (showSubmitModal) {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSubmitQuiz();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setShowSubmitModal(false);
        }
        return;
      }

      if (showShortcutsModal) {
        if (e.key === 'Escape' || e.key === '?' || e.key.toLowerCase() === 'h') {
          e.preventDefault();
          setShowShortcutsModal(false);
        }
        return;
      }

      const key = e.key.toUpperCase();

      // Options selection: A, B, C, D or 1, 2, 3, 4
      if (key === 'A' || key === '1') {
        e.preventDefault();
        setLastKeyPressed('A');
        handleSelectOption('A');
      } else if (key === 'B' || key === '2') {
        e.preventDefault();
        setLastKeyPressed('B');
        handleSelectOption('B');
      } else if (key === 'C' || key === '3') {
        e.preventDefault();
        setLastKeyPressed('C');
        handleSelectOption('C');
      } else if (key === 'D' || key === '4') {
        e.preventDefault();
        setLastKeyPressed('D');
        handleSelectOption('D');
      }
      // Navigation
      else if (e.key === 'ArrowLeft' || key === 'P') {
        e.preventDefault();
        setLastKeyPressed('Prev');
        navigateQuestion(-1);
      } else if (e.key === 'ArrowRight' || key === 'N') {
        e.preventDefault();
        setLastKeyPressed('Next');
        navigateQuestion(1);
      }
      // Clear answer
      else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        setLastKeyPressed('Clear');
        handleClearResponse();
      }
      // Mark for review
      else if (key === 'M') {
        e.preventDefault();
        setLastKeyPressed('Mark');
        toggleMarkForReview();
      }
      // Fullscreen
      else if (key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
      // Shortcuts Help
      else if (e.key === '?' || key === 'H') {
        e.preventDefault();
        setShowShortcutsModal((prev) => !prev);
      }
      // Submit shortcuts: Ctrl+Enter anytime or Enter on last question
      else if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        setShowSubmitModal(true);
      } else if (e.key === 'Enter') {
        if (currentIndex === totalQuestions - 1) {
          e.preventDefault();
          setShowSubmitModal(true);
        } else {
          e.preventDefault();
          navigateQuestion(1);
        }
      }

      setTimeout(() => setLastKeyPressed(null), 600);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    started,
    isFinished,
    showSubmitModal,
    showShortcutsModal,
    currentIndex,
    totalQuestions,
    handleSelectOption,
    handleClearResponse,
    navigateQuestion,
    toggleMarkForReview,
    toggleFullscreen,
    handleSubmitQuiz,
  ]);

  // Statistics calculation
  const stats = useMemo(() => {
    let score = 0;
    let answered = 0;
    let wrong = 0;

    freeDailyMCQs.forEach((mcq) => {
      const ans = responses[mcq.id];
      if (ans) {
        answered += 1;
        if (ans === mcq.correctAnswer) {
          score += 1;
        } else {
          wrong += 1;
        }
      }
    });

    const unattempted = totalQuestions - answered;
    const accuracy = answered > 0 ? Math.round((score / answered) * 100) : 0;
    const percentage = Math.round((score / totalQuestions) * 100);

    return { score, answered, wrong, unattempted, accuracy, percentage };
  }, [responses, totalQuestions]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // SEO Fallback: Hidden content for crawlers
  const renderSEOFallback = () => (
    <div className="sr-only" aria-hidden="true">
      {freeDailyMCQs.map((mcq) => (
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
    <div className="relative w-full min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* Dynamic Navbar: Rendered when not taking the active quiz */}
      {(!started || isFinished) && <DynamicNavbar />}

      {/* Subtle Dot Pattern for clean modern white background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-70"></div>

      {renderSEOFallback()}

      {/* ─────────────────────────────────────────────────────────────
          1. INTRO / START SCREEN (Clean White / Light UI)
      ───────────────────────────────────────────────────────────── */}
      {!started && !isFinished && (
        <section className="flex-1 flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl w-full mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 border border-primary-200 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold tracking-wide mb-6 shadow-xs">
              <Flame className="w-4 h-4 text-accent-500" />
              Free Daily Practice • No Login Required
            </span>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              Today's <span className="text-primary-600">Free MCQs</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Test your knowledge with 10 handpicked questions from Gujarat Competitive Exams syllabus. Experience our brand new CBT interface with keyboard shortcuts and distraction-free fullscreen mode!
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
                <span className="text-2xl font-extrabold text-slate-900 block">10</span>
                <span className="text-xs font-semibold text-slate-500">Questions</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
                <span className="text-2xl font-extrabold text-emerald-600 block">+1.0</span>
                <span className="text-xs font-semibold text-slate-500">Per MCQ</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
                <span className="text-2xl font-extrabold text-primary-600 block">⌨️</span>
                <span className="text-xs font-semibold text-slate-500">Keys A, B, C, D</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
                <span className="text-2xl font-extrabold text-accent-500 block">⛶</span>
                <span className="text-xs font-semibold text-slate-500">Fullscreen CBT</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
              <button
                onClick={() => setStarted(true)}
                className="w-full sm:w-auto flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md shadow-primary-600/20 text-base hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Start Free Quiz</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={async () => {
                  await toggleFullscreen();
                  setStarted(true);
                }}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-bold py-3.5 px-6 rounded-xl transition-all border border-slate-300 flex items-center justify-center gap-2 text-sm cursor-pointer shadow-xs hover:-translate-y-0.5"
              >
                <Maximize2 className="w-4 h-4 text-primary-600" />
                <span>Start in Fullscreen</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. ACTIVE EXAM INTERFACE (Clean White Theme & Viewport-Optimized)
      ───────────────────────────────────────────────────────────── */}
      {started && !isFinished && (
        <div className="flex-1 flex flex-col w-full relative z-10 min-h-screen bg-[#F8FAFC]">
          
          {/* Top Exam Header (Clean White / Light Surface) */}
          <header className="sticky top-0 z-30 bg-white/95 border-b border-slate-200 backdrop-blur-md px-3 sm:px-6 py-2 sm:py-2.5 shadow-xs flex items-center justify-between text-slate-800">
            {/* Left: Branding */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-xs">
                  MZ
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold tracking-tight block leading-none text-slate-900">MCQ Prep Zone</span>
                  <span className="text-[10px] text-slate-500 font-medium leading-none hidden sm:block">Daily Free Challenge</span>
                </div>
              </Link>
              <div className="hidden md:block h-4 w-[1px] bg-slate-200"></div>
              <span className="hidden md:inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 border border-primary-200/80 rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-primary-600" />
                {currentMCQ.subject}
              </span>
            </div>

            {/* Center: Live Timer & Progress */}
            <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full shadow-inner">
              <Timer className="w-3.5 h-3.5 text-primary-600 animate-pulse" />
              <span className="font-mono text-xs sm:text-sm font-bold text-slate-900 tracking-wider">
                {formatTimer(seconds)}
              </span>
              <span className="text-[11px] text-slate-500 border-l border-slate-300 pl-2 hidden sm:inline">
                {stats.answered}/{totalQuestions} Answered
              </span>
            </div>

            {/* Right: Controls (Shortcuts, Fullscreen, Submit) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Keyboard Shortcuts Trigger */}
              <button
                onClick={() => setShowShortcutsModal(true)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition-all cursor-pointer shadow-xs"
                title="Keyboard Shortcuts (? or H)"
              >
                <Keyboard className="w-3.5 h-3.5 text-primary-600" />
                <span>Shortcuts</span>
                <kbd className="bg-white border border-slate-200 text-[10px] px-1 rounded text-slate-500">?</kbd>
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border shadow-xs ${
                  isFullscreen
                    ? 'bg-primary-50 border-primary-300 text-primary-700'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
                title={isFullscreen ? "Exit Fullscreen (F)" : "Enter Fullscreen (F)"}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-primary-600" /> : <Maximize2 className="w-3.5 h-3.5 text-slate-600" />}
                <span className="hidden md:inline">{isFullscreen ? 'Exit Full' : 'Fullscreen'}</span>
                <kbd className="hidden lg:inline bg-white border border-slate-200 text-[10px] px-1 rounded text-slate-500">F</kbd>
              </button>

              {/* Mobile Question Palette Toggle */}
              <button
                onClick={() => setShowMobilePalette((prev) => !prev)}
                className="lg:hidden flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-700"
                title="Question Grid"
              >
                <Layers className="w-4 h-4 text-primary-600" />
              </button>

              {/* Submit Quiz Button */}
              <button
                onClick={() => setShowSubmitModal(true)}
                className="bg-accent-500 hover:bg-accent-600 active:scale-95 text-white font-bold px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-all shadow-sm shadow-accent-500/20 cursor-pointer flex items-center gap-1"
              >
                <span>Submit</span>
                <span className="hidden sm:inline">Quiz</span>
              </button>
            </div>
          </header>

          {/* Test Progress Bar */}
          <div className="w-full h-1 bg-slate-200">
            <div
              className="h-full bg-primary-600 transition-all duration-300 ease-out"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>

          {/* Keypress Toast Feedback */}
          {lastKeyPressed && (
            <div className="fixed bottom-16 right-4 sm:right-6 z-50 bg-white border border-primary-500 shadow-xl px-3 py-1 rounded-lg text-xs font-mono text-primary-700 flex items-center gap-1.5 animate-bounce">
              <span className="w-2 h-2 rounded-full bg-primary-600 animate-ping"></span>
              <span>Key: <strong>[{lastKeyPressed}]</strong></span>
            </div>
          )}

          {/* Main Layout Area: Compact & Screen-Fitted */}
          <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-5 py-3 sm:py-4 flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-start">
              
              {/* ──────────────────────────────────
                  LEFT COLUMN: Question & Options Card (8 cols)
              ────────────────────────────────── */}
              <div className="lg:col-span-8 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden text-slate-900">
                
                {/* Question Card Top Bar */}
                <div className="px-4 py-2.5 sm:px-5 sm:py-3 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-white border border-slate-200 text-slate-700 font-bold px-2.5 py-0.5 rounded-md text-xs">
                      Question {currentIndex + 1} of {totalQuestions}
                    </span>
                    <span className="text-primary-600 font-bold text-xs tracking-wide uppercase">
                      {currentMCQ.subject}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      +1.00 Marks
                    </span>
                    <button
                      onClick={toggleMarkForReview}
                      className={`flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold transition-all cursor-pointer border ${
                        marked[currentMCQ.id]
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                      title="Bookmark this question (M)"
                    >
                      <Bookmark className={`w-3 h-3 ${marked[currentMCQ.id] ? 'fill-amber-500 text-amber-600' : ''}`} />
                      <span>{marked[currentMCQ.id] ? 'Marked' : 'Mark'}</span>
                      <kbd className="hidden sm:inline bg-slate-100 text-[10px] px-1 rounded text-slate-400">M</kbd>
                    </button>
                  </div>
                </div>

                {/* Question Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  {/* Question Statement */}
                  <div className="flex gap-2.5 sm:gap-3 items-start mb-4 sm:mb-5">
                    <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                      Q
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {currentMCQ.question}
                    </h2>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5">
                    {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                      const isSelected = responses[currentMCQ.id] === opt;
                      const optionText = currentMCQ.options[opt];

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectOption(opt)}
                          className={`w-full text-left py-2.5 px-3.5 sm:py-3 sm:px-4 rounded-xl border-2 transition-all flex items-center gap-3 group cursor-pointer ${
                            isSelected
                              ? 'border-primary-600 bg-primary-50 text-primary-950 font-semibold shadow-xs ring-1 ring-primary-500/20'
                              : 'border-slate-200 bg-white hover:border-primary-400 hover:bg-primary-50/20 text-slate-800'
                          }`}
                        >
                          {/* Option Letter Badge */}
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-all ${
                              isSelected
                                ? 'bg-primary-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 group-hover:bg-primary-100 group-hover:text-primary-700'
                            }`}
                          >
                            {opt}
                          </div>

                          {/* Option Text */}
                          <span className="flex-1 text-sm sm:text-base leading-tight">
                            {optionText}
                          </span>

                          {/* Shortcut Key Hint & Selection Radio */}
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                              [{opt}]
                            </span>
                            <div
                              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected
                                  ? 'border-primary-600 bg-primary-600 text-white'
                                  : 'border-slate-300 group-hover:border-primary-400'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="pt-3 sm:pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 mt-auto">
                    <button
                      onClick={handleClearResponse}
                      disabled={!responses[currentMCQ.id]}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                      title="Clear your answer for this question (Backspace)"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear Response</span>
                      <kbd className="hidden sm:inline bg-slate-100 text-[10px] px-1 rounded text-slate-400 border border-slate-200">Del</kbd>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateQuestion(-1)}
                        disabled={currentIndex === 0}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 text-xs sm:text-sm border border-slate-200 cursor-pointer"
                        title="Go to previous question (Left Arrow or P)"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                        <kbd className="hidden sm:inline bg-white text-[10px] px-1 rounded text-slate-400 border border-slate-200">←</kbd>
                      </button>

                      {currentIndex === totalQuestions - 1 ? (
                        <button
                          onClick={() => setShowSubmitModal(true)}
                          className="px-5 py-2 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl transition-all shadow-md shadow-accent-500/20 text-xs sm:text-sm flex items-center gap-1 cursor-pointer active:scale-95 hover:-translate-y-0.5"
                          title="Finish and submit your quiz"
                        >
                          <span>Review & Submit</span>
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => navigateQuestion(1)}
                          className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-md shadow-primary-600/20 text-xs sm:text-sm flex items-center gap-1 cursor-pointer active:scale-95 hover:-translate-y-0.5"
                          title="Go to next question (Right Arrow or N)"
                        >
                          <span>Next</span>
                          <kbd className="hidden sm:inline bg-primary-700 text-[10px] px-1 rounded text-primary-100">→</kbd>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ──────────────────────────────────
                  RIGHT COLUMN: Question Palette & Info (4 cols)
              ────────────────────────────────── */}
              <div className="hidden lg:flex lg:col-span-4 flex-col gap-3">
                {/* Palette White Card */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/90 text-slate-900">
                  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-primary-600" />
                      <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Question Palette</h3>
                    </div>
                    <span className="text-[11px] font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full border border-primary-200/60">
                      {totalQuestions} MCQs
                    </span>
                  </div>

                  {/* Number Grid */}
                  <div className="grid grid-cols-5 gap-2 mb-3.5">
                    {freeDailyMCQs.map((mcq, idx) => {
                      const isCurrent = idx === currentIndex;
                      const isAnswered = !!responses[mcq.id];
                      const isMarked = !!marked[mcq.id];

                      let btnStyle = "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100";
                      if (isMarked) {
                        btnStyle = "bg-amber-50 text-amber-800 border-amber-300 font-bold";
                      } else if (isAnswered) {
                        btnStyle = "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold";
                      }

                      if (isCurrent) {
                        btnStyle += " ring-2 ring-primary-600 border-primary-600 shadow-xs scale-105 font-bold";
                      }

                      return (
                        <button
                          key={mcq.id}
                          onClick={() => setCurrentIndex(idx)}
                          className={`h-9 rounded-lg border flex flex-col items-center justify-center font-bold text-xs transition-all cursor-pointer relative ${btnStyle}`}
                          title={`Jump to Question ${idx + 1}`}
                        >
                          <span>{idx + 1}</span>
                          {isMarked && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute top-1 right-1"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Palette Legend */}
                  <div className="grid grid-cols-3 gap-1.5 pt-2.5 border-t border-slate-100 text-[10px] text-slate-500">
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded bg-emerald-100 border border-emerald-400"></div>
                      <span>Answered ({stats.answered})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded bg-amber-100 border border-amber-400"></div>
                      <span>Marked ({Object.values(marked).filter(Boolean).length})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded bg-slate-100 border border-slate-300"></div>
                      <span>Pending ({stats.unattempted})</span>
                    </div>
                  </div>
                </div>

                {/* Keyboard Shortcuts Card */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/90 text-xs">
                  <div className="flex items-center justify-between mb-2 text-slate-900 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Keyboard className="w-3.5 h-3.5 text-primary-600" /> Shortcuts Quick Guide
                    </span>
                    <button
                      onClick={() => setShowShortcutsModal(true)}
                      className="text-[11px] text-primary-600 hover:underline cursor-pointer font-semibold"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-1.5 text-slate-600">
                    <div className="flex justify-between items-center">
                      <span>Select Options</span>
                      <span className="font-mono text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-semibold text-[11px]">A, B, C, D</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Prev / Next</span>
                      <span className="font-mono text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-semibold text-[11px]">← / → or P / N</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Clear Response</span>
                      <span className="font-mono text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-semibold text-[11px]">Backspace</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Toggle Fullscreen</span>
                      <span className="font-mono text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-semibold text-[11px]">F</span>
                    </div>
                  </div>
                </div>

                {/* Submit Quiz CTA Button */}
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-4 rounded-xl shadow-sm shadow-accent-500/20 text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:-translate-y-0.5 active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Quiz Now</span>
                </button>
              </div>

            </div>
          </main>

          {/* Mobile Bottom Question Palette Drawer */}
          {showMobilePalette && (
            <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs flex flex-col justify-end">
              <div className="bg-white border-t border-slate-200 p-4 rounded-t-2xl max-h-[75vh] overflow-y-auto text-slate-900 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 text-sm">Question Palette</h3>
                  <button
                    onClick={() => setShowMobilePalette(false)}
                    className="p-1 rounded-lg bg-slate-100 text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {freeDailyMCQs.map((mcq, idx) => {
                    const isCurrent = idx === currentIndex;
                    const isAnswered = !!responses[mcq.id];
                    const isMarked = !!marked[mcq.id];

                    let btnStyle = "bg-slate-50 text-slate-700 border-slate-200";
                    if (isMarked) btnStyle = "bg-amber-50 text-amber-800 border-amber-300 font-bold";
                    else if (isAnswered) btnStyle = "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold";
                    if (isCurrent) btnStyle += " ring-2 ring-primary-600 border-primary-600";

                    return (
                      <button
                        key={mcq.id}
                        onClick={() => {
                          setCurrentIndex(idx);
                          setShowMobilePalette(false);
                        }}
                        className={`h-10 rounded-lg border flex items-center justify-center font-bold text-xs ${btnStyle}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-2 text-xs text-slate-600 justify-around pt-2.5 border-t border-slate-100">
                  <span className="text-emerald-700 font-medium">● {stats.answered} Answered</span>
                  <span className="text-amber-700 font-medium">★ {Object.values(marked).filter(Boolean).length} Marked</span>
                  <span className="text-slate-500 font-medium">○ {stats.unattempted} Pending</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. RESULTS & SOLUTIONS SCREEN (Clean White Theme)
      ───────────────────────────────────────────────────────────── */}
      {isFinished && (
        <section className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-24 pb-16 relative z-10">
          {/* Main White Score Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 text-center mb-8 text-slate-900">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mb-3 border border-amber-200 shadow-xs">
              <Trophy className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 mb-2">Quiz Completed!</h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6">
              Great effort! Review the detailed explanations below to understand your concepts and improve further.
            </p>

            {/* Score Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 max-w-3xl mx-auto">
              <div className="bg-primary-50/70 border border-primary-100 rounded-xl p-3.5 text-center">
                <span className="text-xs font-bold text-primary-700 uppercase tracking-wider block mb-1">Your Score</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-primary-600">
                  {stats.score} <span className="text-xs text-slate-400 font-normal">/ {totalQuestions}</span>
                </span>
              </div>
              <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3.5 text-center">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">Accuracy</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
                  {stats.accuracy}%
                </span>
              </div>
              <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-3.5 text-center">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">Time Taken</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
                  {formatTimer(seconds)}
                </span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">Correct / Wrong</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  <span className="text-emerald-600">{stats.score}</span> / <span className="text-rose-600">{stats.wrong}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleRestartQuiz}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-all border border-slate-200 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <RotateCcw className="w-4 h-4 text-primary-600" />
                <span>Retake Quiz</span>
              </button>
              <Link
                href="/login"
                className="w-full sm:w-auto px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-md shadow-primary-600/20 flex items-center justify-center gap-2 text-sm hover:-translate-y-0.5"
              >
                <Award className="w-4 h-4" />
                <span>Unlock 10,000+ MCQs & Leaderboard</span>
              </Link>
            </div>
          </div>

          {/* Solutions Filter Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Detailed Solutions</h3>
              <p className="text-xs sm:text-sm text-slate-500">Review all questions, correct answers, and thorough concept explanations</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-xl self-start sm:self-auto shadow-xs">
              {(
                [
                  { id: 'all', label: `All (${totalQuestions})` },
                  { id: 'correct', label: `Correct (${stats.score})` },
                  { id: 'incorrect', label: `Incorrect (${stats.wrong})` },
                  { id: 'unattempted', label: `Skipped (${stats.unattempted})` },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSolutionFilter(tab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    solutionFilter === tab.id
                      ? 'bg-primary-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Solutions List (Clean White Cards) */}
          <div className="space-y-4">
            {freeDailyMCQs
              .filter((mcq) => {
                const selectedOpt = responses[mcq.id];
                const isCorrect = selectedOpt === mcq.correctAnswer;
                if (solutionFilter === 'correct') return isCorrect;
                if (solutionFilter === 'incorrect') return selectedOpt && !isCorrect;
                if (solutionFilter === 'unattempted') return !selectedOpt;
                return true;
              })
              .map((mcq) => {
                const selectedOpt = responses[mcq.id];
                const isCorrect = selectedOpt === mcq.correctAnswer;
                const isSkipped = !selectedOpt;

                return (
                  <div
                    key={mcq.id}
                    className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-200 text-slate-900"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white ${
                            isCorrect
                              ? 'bg-emerald-600'
                              : isSkipped
                              ? 'bg-slate-400'
                              : 'bg-rose-600'
                          }`}
                        >
                          {mcq.id.replace('mcq-', '')}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded border border-primary-200/60">
                          {mcq.subject}
                        </span>
                      </div>

                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1 ${
                          isCorrect
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isSkipped
                            ? 'bg-slate-50 text-slate-600 border border-slate-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {isCorrect && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {!isCorrect && !isSkipped && <XCircle className="w-3.5 h-3.5" />}
                        {isSkipped && <AlertCircle className="w-3.5 h-3.5" />}
                        {isCorrect ? 'Correct (+1.0)' : isSkipped ? 'Skipped (0.0)' : 'Incorrect (0.0)'}
                      </span>
                    </div>

                    {/* Question text */}
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-4 leading-snug">
                      {mcq.question}
                    </h4>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                      {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                        const isThisCorrect = opt === mcq.correctAnswer;
                        const isThisUserSelected = opt === selectedOpt;

                        let style = "border-slate-200 bg-slate-50 text-slate-700";
                        if (isThisCorrect) {
                          style = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-500/20";
                        } else if (isThisUserSelected && !isThisCorrect) {
                          style = "border-rose-500 bg-rose-50 text-rose-900 font-bold";
                        }

                        return (
                          <div
                            key={opt}
                            className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${style}`}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                                  isThisCorrect
                                    ? 'bg-emerald-600 text-white'
                                    : isThisUserSelected
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {opt}
                              </span>
                              <span>{mcq.options[opt]}</span>
                            </div>

                            <div className="text-[11px] font-semibold">
                              {isThisCorrect && <span className="text-emerald-700">Correct</span>}
                              {isThisUserSelected && !isThisCorrect && <span className="text-rose-700">Your Choice</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary-600"></div>
                      <span className="text-xs font-bold text-primary-700 uppercase tracking-widest block mb-1">
                        Conceptual Explanation
                      </span>
                      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                        {mcq.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. SUBMIT CONFIRMATION MODAL (Clean White Card)
      ───────────────────────────────────────────────────────────── */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-accent-500" />
                Submit Test Confirmation
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
              Are you sure you want to finish your test? Review your attempt summary:
            </p>

            {/* Stats summary table */}
            <div className="grid grid-cols-3 gap-2 mb-4 bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-0.5">Answered</span>
                <span className="text-lg font-bold text-emerald-600">{stats.answered}</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-0.5">Unanswered</span>
                <span className="text-lg font-bold text-rose-600">{stats.unattempted}</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-0.5">Marked</span>
                <span className="text-lg font-bold text-amber-600">{Object.values(marked).filter(Boolean).length}</span>
              </div>
            </div>

            {stats.unattempted > 0 && (
              <div className="mb-4 bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-800 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>You have <strong>{stats.unattempted} unanswered question(s)</strong> remaining.</span>
              </div>
            )}

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                Return to Test (Esc)
              </button>
              <button
                onClick={handleSubmitQuiz}
                className="flex-1 py-2.5 px-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-accent-500/20 transition-all cursor-pointer"
              >
                Yes, Submit (Enter)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. KEYBOARD SHORTCUTS MODAL (Clean White Card)
      ───────────────────────────────────────────────────────────── */}
      {showShortcutsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-primary-600" />
                Keyboard Shortcuts Cheatsheet
              </h3>
              <button
                onClick={() => setShowShortcutsModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Answer questions rapidly using quick keyboard shortcuts:
            </p>

            <div className="space-y-1.5 max-h-[55vh] overflow-y-auto pr-1">
              {[
                { label: 'Select Option A / B / C / D', keys: ['A, B, C, D', '1, 2, 3, 4'] },
                { label: 'Next Question', keys: ['→', 'N', 'Enter'] },
                { label: 'Previous Question', keys: ['←', 'P'] },
                { label: 'Clear Selected Answer', keys: ['Backspace', 'Delete'] },
                { label: 'Mark for Review / Bookmark', keys: ['M'] },
                { label: 'Toggle Full Screen Mode', keys: ['F'] },
                { label: 'Quick Submit Exam', keys: ['Ctrl + Enter'] },
                { label: 'Toggle Shortcuts Guide', keys: ['?', 'H'] },
                { label: 'Close Dialogs / Modals', keys: ['Esc'] },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                >
                  <span className="text-slate-800 font-medium">{item.label}</span>
                  <div className="flex gap-1">
                    {item.keys.map((k, j) => (
                      <kbd
                        key={j}
                        className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-primary-700 font-mono text-[11px] font-bold shadow-xs"
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowShortcutsModal(false)}
                className="py-2 px-5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-xs"
              >
                Got it (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
