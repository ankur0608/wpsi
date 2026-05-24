"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useUser } from '@/context/UserContext';

// ─── Types ────────────────────────────────────────────────────────────────────
export type Difficulty   = 'Low' | 'Medium' | 'High';
export type PracticeMode = 'quick' | 'full' | 'mock';
export type AnswerKey    = 'A' | 'B' | 'C' | 'D' | 'E';

export interface PracticeMcq {
  id: string;
  subject: string;
  topic: string;
  difficulty: Difficulty;
  question: string;
  options: Record<'A' | 'B' | 'C' | 'D', string>;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

// Raw shape returned by the API
interface ApiMcqRow {
  id: string;
  subject: string;
  topic: string;
  difficulty: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation: string | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

type ViewState    = 'setup' | 'instructions' | 'exam' | 'result' | 'review';
type ReviewFilter = 'all' | 'correct' | 'wrong' | 'na' | 'unanswered' | 'bookmarked';

interface SessionState {
  mode: PracticeMode;
  subject: string;
  topic: string;
  difficulties: Difficulty[];
  questions: PracticeMcq[];
  currentIndex: number;
  responses: Record<string, AnswerKey | undefined>;
  visited: string[];
  markedForReview: string[];
  bookmarked: string[];
  submitted: boolean;
  reviewFilter: ReviewFilter;
  violations: number;
}

const DEFAULT_DIFFICULTIES: Difficulty[] = ['Low', 'Medium', 'High'];

const MODE_META: Record<PracticeMode, {
  label: string;
  accent: string;
  description: string;
  icon: string;
  timerMinutes: number | null;
  questionCount: number;
}> = {
  quick: {
    label: 'Quick Practice',
    accent: 'from-brand-500 to-brand-400',
    description: 'Fast revision round with a small mixed set of MCQs.',
    icon: 'fa-bolt',
    timerMinutes: null,
    questionCount: 8,
  },
  full: {
    label: 'Full Practice',
    accent: 'from-accent to-emerald-400',
    description: 'Longer concept practice with detailed feedback after every answer.',
    icon: 'fa-layer-group',
    timerMinutes: null,
    questionCount: 12,
  },
  mock: {
    label: 'Mock Test',
    accent: 'from-danger to-red-500',
    description: 'Timed exam flow with negative marking and full review after submission.',
    icon: 'fa-stopwatch',
    timerMinutes: 15,
    questionCount: 20,
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function arraysEqual(left: string[], right: string[]) {
  if (left.length !== right.length) return false;
  return left.every((v, i) => v === right[i]);
}

function toggleId(ids: string[], id: string) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

function shuffleQuestions(items: PracticeMcq[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatMode(raw: string | null): PracticeMode {
  if (raw === 'full' || raw === 'mock') return raw;
  return 'quick';
}

function formatDifficulties(raw: string | null) {
  if (!raw) return DEFAULT_DIFFICULTIES;
  const parsed = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `${s.charAt(0).toUpperCase()}${s.slice(1).toLowerCase()}` as Difficulty)
    .filter((s) => DEFAULT_DIFFICULTIES.includes(s));
  return parsed.length > 0 ? Array.from(new Set(parsed)) : DEFAULT_DIFFICULTIES;
}

function getOptionEntries(q: PracticeMcq): Array<[AnswerKey, string]> {
  const base = Object.entries(q.options) as Array<['A' | 'B' | 'C' | 'D', string]>;
  return [...base, ['E', 'Not Attempted'] as [AnswerKey, string]];
}

/** Transform raw API row → PracticeMcq used by the UI */
function toMcq(row: ApiMcqRow): PracticeMcq {
  return {
    id: row.id,
    subject: row.subject,
    topic: row.topic,
    difficulty: (row.difficulty as Difficulty) || 'Medium',
    question: row.question,
    options: { A: row.optionA, B: row.optionB, C: row.optionC, D: row.optionD },
    correctAnswer: row.correctAnswer as 'A' | 'B' | 'C' | 'D',
    explanation: row.explanation ?? '',
  };
}

function buildSessionQuestions(
  mcqBank: PracticeMcq[],
  mode: PracticeMode,
  subject: string,
  topic: string,
  difficulties: Difficulty[],
) {
  const normSubject = normalizeText(subject);
  const normTopic   = normalizeText(topic);

  let matches = mcqBank.filter((q) => {
    const subjectOk =
      !subject || normSubject === 'all' || normalizeText(q.subject) === normSubject;
    const topicOk =
      !topic || normTopic === 'all' || normalizeText(q.topic).includes(normTopic);
    const diffOk = difficulties.includes(q.difficulty);
    return subjectOk && topicOk && diffOk;
  });

  if (matches.length === 0 && subject && normSubject !== 'all') {
    matches = mcqBank.filter((q) => normalizeText(q.subject) === normSubject);
  }
  if (matches.length === 0) {
    matches = [...mcqBank];
  }

  const count = Math.min(MODE_META[mode].questionCount, matches.length);
  return shuffleQuestions(matches).slice(0, count);
}

function calculateResult(session: SessionState | null) {
  if (!session) {
    return { correct: 0, wrong: 0, notAttempted: 0, unanswered: 0, negativeMarks: 0, finalScore: 0, accuracy: 0,
      topicStats: [] as Array<{ topic: string; subject: string; correct: number; total: number; percentage: number }> };
  }

  let correct = 0, wrong = 0, notAttempted = 0, unanswered = 0;
  const topicAcc: Record<string, { topic: string; subject: string; correct: number; total: number }> = {};

  session.questions.forEach((q) => {
    const res = session.responses[q.id];
    if (!topicAcc[q.topic]) topicAcc[q.topic] = { topic: q.topic, subject: q.subject, correct: 0, total: 0 };
    topicAcc[q.topic].total += 1;

    if (res === undefined) { unanswered++; return; }
    if (res === 'E')       { notAttempted++; return; }
    if (res === q.correctAnswer) { correct++; topicAcc[q.topic].correct++; return; }
    wrong++;
  });

  const attempted     = correct + wrong;
  const negativeMarks = (wrong + unanswered) * 0.25;
  const finalScore    = correct - negativeMarks;
  const accuracy      = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
  const topicStats    = Object.values(topicAcc).map((e) => ({
    ...e, percentage: Math.round((e.correct / e.total) * 100),
  }));

  return { correct, wrong, notAttempted, unanswered, negativeMarks, finalScore, accuracy, topicStats };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PracticePage() {
  const searchParams = useSearchParams();
  const { user } = useUser();

  // ── API data state ─────────────────────────────────────────────────────────
  const [mcqBank,     setMcqBank]     = useState<PracticeMcq[]>([]);
  const [bankLoading, setBankLoading] = useState(true);
  const [bankError,   setBankError]   = useState<string | null>(null);
  const [totalInDb,   setTotalInDb]   = useState(0);
  const fetchedRef = useRef(false);

  // ── Setup state ────────────────────────────────────────────────────────────
  const [selectedMode,        setSelectedMode]        = useState<PracticeMode>('quick');
  const [selectedSubject,     setSelectedSubject]     = useState<string>('All Subjects');
  const [selectedTopic,       setSelectedTopic]       = useState<string>('');
  const [selectedDifficulties,setSelectedDifficulties]= useState<Difficulty[]>(DEFAULT_DIFFICULTIES);

  // ── Session / view state ───────────────────────────────────────────────────
  const [view,          setView]          = useState<ViewState>('setup');
  const [session,       setSession]       = useState<SessionState | null>(null);
  const [timeLeft,      setTimeLeft]      = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');

  // ── Derived lists from live bank ───────────────────────────────────────────
  const availableSubjects: string[] = React.useMemo(() => {
    const set = new Set(mcqBank.map((q) => q.subject).filter(Boolean));
    return Array.from(set).sort();
  }, [mcqBank]);

  const topicsForSubject: string[] = React.useMemo(() => {
    if (!selectedSubject || selectedSubject === 'All Subjects') return [];
    const norm = normalizeText(selectedSubject);
    const set = new Set(
      mcqBank
        .filter((q) => normalizeText(q.subject) === norm)
        .map((q) => q.topic),
    );
    return Array.from(set).sort();
  }, [mcqBank, selectedSubject]);

  // ── Fetch ALL practice MCQs from API on mount ──────────────────────────────
  const fetchBank = useCallback(async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    setBankLoading(true);
    setBankError(null);
    try {
      const res  = await fetch('/api/practice-mcqs?limit=500&page=1');
      const json = await res.json() as {
        success: boolean;
        data: ApiMcqRow[];
        meta: { total: number };
        message?: string;
      };
      if (!json.success) throw new Error(json.message ?? 'API error');
      setMcqBank(json.data.map(toMcq));
      setTotalInDb(json.meta.total);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load MCQs';
      setBankError(msg);
      fetchedRef.current = false; // allow retry
    } finally {
      setBankLoading(false);
    }
  }, []);

  useEffect(() => { fetchBank(); }, [fetchBank]);

  // ── Sync URL params → setup state ─────────────────────────────────────────
  useEffect(() => {
    const modeFromUrl = formatMode(searchParams.get('mode'));
    const subjectFromUrl = searchParams.get('subject');
    const topicFromUrl   = searchParams.get('topic');
    const diffsFromUrl   = formatDifficulties(searchParams.get('diff'));
    const nextSubject = subjectFromUrl && subjectFromUrl !== 'all' ? subjectFromUrl : 'All Subjects';
    const nextTopic   = topicFromUrl   && topicFromUrl   !== 'all' ? topicFromUrl   : '';

    setSelectedMode((c) => (c === modeFromUrl ? c : modeFromUrl));
    setSelectedSubject((c) => (c === nextSubject ? c : nextSubject));
    setSelectedTopic((c) => (c === nextTopic ? c : nextTopic));
    setSelectedDifficulties((c) => (arraysEqual(c, diffsFromUrl) ? c : diffsFromUrl));
  }, [searchParams]);

  // ── Mock timer ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!session || view !== 'exam' || session.mode !== 'mock' || session.submitted) return;
    const timer = window.setInterval(() => setTimeLeft((c) => Math.max(c - 1, 0)), 1000);
    return () => window.clearInterval(timer);
  }, [session?.mode, session?.submitted, view]);

  useEffect(() => {
    if (view !== 'exam' || !session || session.mode !== 'mock' || session.submitted) return;
    if (timeLeft === 300) setStatusMessage('5 minutes left. Review your marked questions before time runs out.');
    else if (timeLeft === 60) setStatusMessage('Final 1 minute remaining. The exam will auto-submit when the timer reaches zero.');
    else if (timeLeft === 0) submitSession(true);
  }, [session?.mode, session?.submitted, timeLeft, view]);

  // ── Tab-switch anti-cheat (mock only) ─────────────────────────────────────
  useEffect(() => {
    if (view !== 'exam' || !session || session.mode !== 'mock' || session.submitted) return;
    const handler = () => {
      if (!document.hidden) return;
      setSession((cur) => {
        if (!cur || cur.submitted || cur.mode !== 'mock') return cur;
        const violations = cur.violations + 1;
        if (violations >= 3) {
          setStatusMessage('3 tab-switch violations detected. Your mock test was auto-submitted.');
          window.setTimeout(() => submitSession(true), 0);
        } else {
          setStatusMessage(`Tab switch warning ${violations}/3. One more violation can end your mock test.`);
        }
        return { ...cur, violations };
      });
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [session?.mode, session?.submitted, view]);

  // ─── Actions ───────────────────────────────────────────────────────────────
  const startSession = () => {
    const questions = buildSessionQuestions(
      mcqBank, selectedMode, selectedSubject, selectedTopic, selectedDifficulties,
    );
    const nextSession: SessionState = {
      mode: selectedMode,
      subject: selectedSubject,
      topic: selectedTopic,
      difficulties: selectedDifficulties,
      questions,
      currentIndex: 0,
      responses: {},
      visited: [questions[0]?.id].filter(Boolean),
      markedForReview: [],
      bookmarked: [],
      submitted: false,
      reviewFilter: 'all',
      violations: 0,
    };
    setSession(nextSession);
    setTimeLeft((MODE_META[selectedMode].timerMinutes ?? 0) * 60);
    setStatusMessage('');
    setView('instructions');
  };

  const beginExam = () => { if (!session) return; setStatusMessage(''); setView('exam'); };

  const submitSession = (auto = false) => {
    setSession((cur) => { if (!cur || cur.submitted) return cur; return { ...cur, submitted: true }; });
    if (auto) setStatusMessage((c) => c || 'The session was submitted automatically.');
    setView('result');
  };

  const confirmSubmit = () => {
    if (!session) return;
    const unanswered = session.questions.filter((q) => session.responses[q.id] === undefined).length;
    if (unanswered > 0) {
      if (!window.confirm(`You still have ${unanswered} unanswered question(s). Blank questions carry -0.25 marks. Submit anyway?`)) return;
    }
    submitSession();
  };

  const restartSession = () => { setSession(null); setStatusMessage(''); setTimeLeft(0); setView('setup'); };

  const updateSession = (fn: (cur: SessionState) => SessionState) => {
    setSession((cur) => { if (!cur) return cur; return fn(cur); });
  };

  // ── Navigation ─────────────────────────────────────────────────────────────
  const selectOption = (option: AnswerKey) => {
    if (!session || !currentQuestion || session.submitted) return;
    updateSession((cur) => ({
      ...cur,
      responses: { ...cur.responses, [currentQuestion.id]: option },
      visited: cur.visited.includes(currentQuestion.id) ? cur.visited : [...cur.visited, currentQuestion.id],
    }));
  };

  const navigateQuestion = (dir: number) => {
    if (!session) return;
    const next = session.currentIndex + dir;
    if (next < 0 || next >= session.questions.length) return;
    const nextId = session.questions[next].id;
    updateSession((cur) => ({
      ...cur,
      currentIndex: next,
      visited: cur.visited.includes(nextId) ? cur.visited : [...cur.visited, nextId],
    }));
  };

  const jumpToQuestion = (index: number) => {
    if (!session) return;
    const qId = session.questions[index]?.id;
    if (!qId) return;
    updateSession((cur) => ({
      ...cur,
      currentIndex: index,
      visited: cur.visited.includes(qId) ? cur.visited : [...cur.visited, qId],
    }));
  };

  const clearResponse = () => {
    if (!session || !currentQuestion || session.submitted) return;
    updateSession((cur) => {
      const next = { ...cur.responses };
      delete next[currentQuestion.id];
      return { ...cur, responses: next };
    });
  };

  const toggleReviewMark = () => {
    if (!session || !currentQuestion || session.submitted) return;
    updateSession((cur) => ({ ...cur, markedForReview: toggleId(cur.markedForReview, currentQuestion.id) }));
  };

  const toggleBookmark = () => {
    if (!session || !currentQuestion) return;
    updateSession((cur) => ({ ...cur, bookmarked: toggleId(cur.bookmarked, currentQuestion.id) }));
  };

  const setReviewFilter = (filter: ReviewFilter) => {
    if (!session) return;
    updateSession((cur) => ({ ...cur, reviewFilter: filter }));
  };

  // ── Derived ────────────────────────────────────────────────────────────────
  const currentQuestion  = session ? session.questions[session.currentIndex] : null;
  const currentResponse  = currentQuestion ? session?.responses[currentQuestion.id] : undefined;
  const modeMeta         = MODE_META[selectedMode];
  const activeModeMeta   = session ? MODE_META[session.mode] : modeMeta;
  const result           = calculateResult(session);

  const renderPaletteState = (q: PracticeMcq) => {
    if (!session) return 's-none';
    const res     = session.responses[q.id];
    const visited = session.visited.includes(q.id);
    const marked  = session.markedForReview.includes(q.id);
    if (marked) return 's-review';
    if (res === undefined && !visited) return 's-none';
    if (res === undefined && visited)  return 's-unanswered';
    if (res === 'E') return 's-na';
    return 's-answered';
  };

  const filteredReviewQuestions = session
    ? session.questions.filter((q) => {
        const res          = session.responses[q.id];
        const isCorrect    = res === q.correctAnswer;
        const isWrong      = res !== undefined && res !== 'E' && res !== q.correctAnswer;
        const isNa         = res === 'E';
        const isUnanswered = res === undefined;
        const isBookmarked = session.bookmarked.includes(q.id);
        switch (session.reviewFilter) {
          case 'correct':    return isCorrect;
          case 'wrong':      return isWrong;
          case 'na':         return isNa;
          case 'unanswered': return isUnanswered;
          case 'bookmarked': return isBookmarked;
          default:           return true;
        }
      })
    : [];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const paletteStyleMap: Record<string, { background: string; borderColor: string; color: string }> = {
    's-none':      { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#94a3b8' },
    's-unanswered':{ background: 'rgba(239,68,68,0.1)',    borderColor: 'rgba(239,68,68,0.25)',    color: '#fca5a5' },
    's-na':        { background: 'rgba(56,189,248,0.12)',  borderColor: 'rgba(56,189,248,0.28)',   color: '#7dd3fc' },
    's-answered':  { background: 'rgba(16,185,129,0.12)',  borderColor: 'rgba(16,185,129,0.26)',   color: '#86efac' },
    's-review':    { background: 'rgba(139,92,246,0.12)',  borderColor: 'rgba(139,92,246,0.28)',   color: '#c4b5fd' },
  };

  // ─── Loading / Error states ────────────────────────────────────────────────
  if (bankLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="h-12 w-12 rounded-full border-4 border-brand-500/20 border-t-brand-500 animate-spin" />
        <p className="text-sm text-slate-400">Loading MCQ bank from database…</p>
      </div>
    );
  }

  if (bankError) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="text-4xl">⚠️</div>
        <p className="text-sm font-bold text-danger">Failed to load MCQs</p>
        <p className="text-xs text-slate-500">{bankError}</p>
        <button
          type="button"
          onClick={() => { fetchedRef.current = false; fetchBank(); }}
          className="mt-2 rounded-xl bg-brand-500 px-5 py-2 text-sm font-bold text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  if (mcqBank.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="text-4xl">📭</div>
        <p className="text-sm font-bold text-white">No MCQs found in the database</p>
        <p className="text-xs text-slate-500">Upload MCQs from the Admin panel to get started.</p>
      </div>
    );
  }

  // ─── Main render ───────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 pb-10">

      {/* Hero banner */}
      <section
        className="rounded-[2rem] border p-6 md:p-8 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.16), rgba(20,29,46,0.96))',
          borderColor: 'rgba(99,102,241,0.24)',
        }}
      >
        <div className="absolute -top-16 -right-10 h-52 w-52 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-brand-300">
              Live MCQ Workspace
            </div>
            <h2 className="text-2xl font-heading font-black text-white md:text-4xl">
              Practice exactly like the real exam — powered by live data
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
              MCQs are fetched live from the database. Setup your filters, pick a mode, and start your session.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">User</div>
              <div className="mt-1 text-sm font-bold text-white">{user?.name ?? 'Loading…'}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Coins</div>
              <div className="mt-1 text-sm font-bold text-white">{user?.coins?.toLocaleString() ?? '--'}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Streak</div>
              <div className="mt-1 text-sm font-bold text-white">{user?.streak ?? '--'} days</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Bank</div>
              <div className="mt-1 text-sm font-bold text-white">{totalInDb.toLocaleString()} MCQs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Status message */}
      {statusMessage && (
        <div
          className="rounded-2xl border px-4 py-3 text-sm"
          style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.18)', color: '#fbbf24' }}
        >
          {statusMessage}
        </div>
      )}

      {/* ─── SETUP ─────────────────────────────────────────────────────────── */}
      {view === 'setup' && (
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="glass-card rounded-[1.75rem] border border-white/5 p-6 md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-400">Session Setup</div>
                <h3 className="mt-2 text-2xl font-heading font-black text-white">Choose your MCQ mode</h3>
                <p className="mt-2 max-w-xl text-sm text-slate-400">
                  Setup, instructions, question palette, results, and review — the same flow as the original HTML exam.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-dark-bg/60 px-4 py-3 text-right">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Current preset</div>
                <div className="mt-1 text-sm font-bold text-white">{MODE_META[selectedMode].label}</div>
              </div>
            </div>

            {/* Mode cards */}
            <div className="grid gap-4 lg:grid-cols-3">
              {(['quick', 'full', 'mock'] as PracticeMode[]).map((mode) => {
                const meta   = MODE_META[mode];
                const active = selectedMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSelectedMode(mode)}
                    className={`rounded-[1.5rem] border p-5 text-left transition-all ${active ? 'scale-[1.01]' : 'hover:-translate-y-1'}`}
                    style={{
                      background:  active ? 'linear-gradient(145deg, rgba(99,102,241,0.14), rgba(20,29,46,0.98))' : 'linear-gradient(145deg, rgba(20,29,46,0.92), rgba(11,15,26,0.98))',
                      borderColor: active ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.08)',
                      boxShadow:   active ? '0 18px 40px rgba(99,102,241,0.12)' : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.accent} text-white shadow-lg`}>
                        <i className={`fa-solid ${meta.icon}`} />
                      </div>
                      {active && <i className="fa-solid fa-circle-check text-brand-400" />}
                    </div>
                    <div className="mt-5 text-lg font-bold text-white">{meta.label}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{meta.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-wider">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">{meta.questionCount} Questions</span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
                        {meta.timerMinutes ? `${meta.timerMinutes} Min Timer` : 'Untimed'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Subject + Topic */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div>
                <div className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Subject</div>
                <select
                  value={selectedSubject}
                  onChange={(e) => { setSelectedSubject(e.target.value); setSelectedTopic(''); }}
                  className="w-full rounded-2xl border border-white/10 bg-dark-bg/70 px-4 py-3 text-sm font-medium text-white outline-none transition-colors focus:border-brand-500/60"
                >
                  <option>All Subjects</option>
                  {availableSubjects.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <div className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Topic {topicsForSubject.length > 0 && <span className="normal-case text-brand-400 ml-1">({topicsForSubject.length} available)</span>}
                </div>
                {topicsForSubject.length > 0 ? (
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-dark-bg/70 px-4 py-3 text-sm font-medium text-white outline-none transition-colors focus:border-brand-500/60"
                  >
                    <option value="">All Topics</option>
                    {topicsForSubject.map((t) => <option key={t}>{t}</option>)}
                  </select>
                ) : (
                  <input
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    placeholder="Optional topic filter"
                    className="w-full rounded-2xl border border-white/10 bg-dark-bg/70 px-4 py-3 text-sm font-medium text-white outline-none transition-colors placeholder:text-slate-500 focus:border-brand-500/60"
                  />
                )}
              </div>
            </div>

            {/* Difficulty */}
            <div className="mt-8">
              <div className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Difficulty</div>
              <div className="flex flex-wrap gap-3">
                {DEFAULT_DIFFICULTIES.map((diff) => {
                  const active = selectedDifficulties.includes(diff);
                  return (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => {
                        if (selectedMode === 'full' && selectedDifficulties.length === DEFAULT_DIFFICULTIES.length) {
                          setSelectedDifficulties([diff]); return;
                        }
                        if (active && selectedDifficulties.length === 1) return;
                        setSelectedDifficulties((c) =>
                          c.includes(diff) ? c.filter((d) => d !== diff) : [...c, diff],
                        );
                      }}
                      className="rounded-full border px-4 py-2 text-sm font-bold transition-all"
                      style={{
                        background:  active ? 'rgba(99,102,241,0.14)' : 'rgba(255,255,255,0.03)',
                        borderColor: active ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.1)',
                        color:       active ? '#c7d2fe' : '#94a3b8',
                      }}
                    >
                      {diff}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={startSession}
                className="rounded-2xl bg-gradient-to-r from-brand-500 to-brand-400 px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_18px_35px_rgba(99,102,241,0.25)] transition-transform hover:scale-[1.02]"
              >
                Continue to Instructions
              </button>
              <Link
                href="/test"
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-slate-300 transition-colors hover:text-white"
              >
                View Mock Tests
              </Link>
            </div>
          </section>

          {/* Sidebar preview */}
          <aside className="space-y-6">
            <div className="glass-card rounded-[1.75rem] border border-white/5 p-6">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-accent">Preview</div>
              <h3 className="mt-2 text-xl font-heading font-black text-white">{modeMeta.label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{modeMeta.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-dark-bg/70 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Questions</div>
                  <div className="mt-1 text-base font-bold text-white">{modeMeta.questionCount}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-dark-bg/70 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Timer</div>
                  <div className="mt-1 text-base font-bold text-white">
                    {modeMeta.timerMinutes ? `${modeMeta.timerMinutes} min` : 'No timer'}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-dark-bg/70 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Subject</div>
                  <div className="mt-1 text-base font-bold text-white truncate">{selectedSubject}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-dark-bg/70 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Difficulty</div>
                  <div className="mt-1 text-base font-bold text-white">{selectedDifficulties.join(', ')}</div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-[1.75rem] border border-white/5 p-6">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-warning">Scoring</div>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {[
                  { label: 'Correct answer',   score: '+1.00',  color: 'text-accent'  },
                  { label: 'Wrong answer',     score: '-0.25',  color: 'text-danger'  },
                  { label: 'Option E selected',score: '0.00',   color: 'text-sky-400' },
                  { label: 'Blank question',   score: '-0.25',  color: 'text-warning' },
                ].map((row) => (
                  <li key={row.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span>{row.label}</span>
                    <span className={`font-bold ${row.color}`}>{row.score}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      )}

      {/* ─── INSTRUCTIONS ──────────────────────────────────────────────────── */}
      {view === 'instructions' && session && (
        <div className="mx-auto max-w-4xl space-y-6">
          <section className="glass-card rounded-[1.75rem] border border-white/5 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={restartSession}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300 transition-colors hover:text-white"
              >
                Back
              </button>
              <span className="rounded-full border border-warning/20 bg-warning/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-warning">
                {activeModeMeta.label}
              </span>
            </div>
            <h3 className="mt-5 text-3xl font-heading font-black text-white">Exam Instructions</h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              Read these once before starting. The layout mirrors the original HTML flow.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-dark-bg/70 p-5">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Session Info</div>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  {[
                    ['Mode',      activeModeMeta.label],
                    ['Questions', session.questions.length],
                    ['Subject',   session.subject],
                    ['Timer',     activeModeMeta.timerMinutes ? `${activeModeMeta.timerMinutes} minutes` : 'Not timed'],
                  ].map(([k, v]) => (
                    <div key={String(k)} className="flex items-center justify-between">
                      <span>{k}</span>
                      <span className="font-bold text-white">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-dark-bg/70 p-5">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Rules</div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  <li>Each correct answer gives 1 mark.</li>
                  <li>Wrong and blank answers both carry a -0.25 penalty.</li>
                  <li>Selecting option E marks the question as intentionally skipped with 0 marks.</li>
                  <li>Use the palette to jump quickly across questions.</li>
                  <li>Mock mode warns on tab switching and auto-submits after repeated violations.</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-dark-bg/70 p-5">
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Palette Legend</div>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Not visited</span>
                <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-emerald-300">Answered</span>
                <span className="rounded-full border border-red-400/25 bg-red-500/10 px-3 py-2 text-red-300">Visited, unanswered</span>
                <span className="rounded-full border border-sky-400/25 bg-sky-500/10 px-3 py-2 text-sky-300">Not attempted (E)</span>
                <span className="rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-2 text-violet-300">Marked for review</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={restartSession}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-300 transition-colors hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={beginExam}
                className="rounded-2xl bg-gradient-to-r from-brand-500 to-brand-400 px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_18px_35px_rgba(99,102,241,0.25)]"
              >
                Begin Session
              </button>
            </div>
          </section>
        </div>
      )}

      {/* ─── EXAM ──────────────────────────────────────────────────────────── */}
      {view === 'exam' && session && currentQuestion && (
        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <section className="space-y-6">
            <div className="glass-card rounded-[1.75rem] border border-white/5 overflow-hidden">
              {/* Header */}
              <div className="flex flex-wrap items-center gap-3 border-b border-white/5 px-5 py-4">
                <span className="text-sm font-bold text-white">
                  Question {session.currentIndex + 1} / {session.questions.length}
                </span>
                {[currentQuestion.subject, currentQuestion.topic, currentQuestion.difficulty].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                    {tag}
                  </span>
                ))}
                {session.markedForReview.includes(currentQuestion.id) && (
                  <span className="rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-300">Review</span>
                )}
                <div className="ml-auto flex items-center gap-3">
                  {session.mode === 'mock' && (
                    <div className={`rounded-xl border px-3 py-2 text-sm font-bold ${
                      timeLeft <= 60 ? 'border-danger/30 bg-danger/10 text-danger'
                      : timeLeft <= 300 ? 'border-warning/30 bg-warning/10 text-warning'
                      : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                    }`}>
                      {formatTime(timeLeft)}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={toggleBookmark}
                    className={`rounded-xl border px-3 py-2 text-sm font-bold transition-colors ${
                      session.bookmarked.includes(currentQuestion.id)
                        ? 'border-warning/30 bg-warning/10 text-warning'
                        : 'border-white/10 bg-white/5 text-slate-300'
                    }`}
                  >
                    <i className="fa-solid fa-bookmark mr-2" />Save
                  </button>
                </div>
              </div>

              <div className="px-5 py-6 md:px-7">
                {/* Progress bar */}
                <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all"
                    style={{ width: `${((session.currentIndex + 1) / session.questions.length) * 100}%` }}
                  />
                </div>

                {/* Question text */}
                <div className="rounded-[1.5rem] border border-white/10 bg-dark-bg/70 p-5 md:p-6">
                  <div className="text-lg font-semibold leading-8 text-white">{currentQuestion.question}</div>
                </div>

                {/* Options */}
                <div className="mt-5 space-y-3">
                  {getOptionEntries(currentQuestion).map(([key, label]) => {
                    const selected  = currentResponse === key;
                    const showState = session.submitted || (session.mode !== 'mock' && currentResponse !== undefined);
                    const correct   = key === currentQuestion.correctAnswer;
                    const wrongSel  = selected && key !== currentQuestion.correctAnswer && key !== 'E';

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => selectOption(key)}
                        className={`w-full rounded-[1.35rem] border px-4 py-4 text-left transition-all ${selected ? 'scale-[1.01]' : 'hover:-translate-y-0.5'}`}
                        style={{
                          background: showState && correct ? 'rgba(16,185,129,0.12)'
                            : showState && wrongSel ? 'rgba(239,68,68,0.1)'
                            : selected && key === 'E' ? 'rgba(56,189,248,0.1)'
                            : selected ? 'rgba(99,102,241,0.12)'
                            : 'rgba(20,29,46,0.82)',
                          borderColor: showState && correct ? 'rgba(16,185,129,0.32)'
                            : showState && wrongSel ? 'rgba(239,68,68,0.3)'
                            : selected && key === 'E' ? 'rgba(56,189,248,0.28)'
                            : selected ? 'rgba(99,102,241,0.35)'
                            : 'rgba(255,255,255,0.08)',
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-black"
                            style={{
                              background:  selected ? 'rgba(99,102,241,0.16)' : 'rgba(255,255,255,0.04)',
                              borderColor: selected ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.08)',
                              color:       selected ? '#c7d2fe' : '#94a3b8',
                            }}
                          >
                            {key}
                          </div>
                          <div className="flex-1 text-sm leading-7 text-slate-200">{label}</div>
                          {showState && correct   && <i className="fa-solid fa-circle-check text-accent" />}
                          {showState && wrongSel  && <i className="fa-solid fa-circle-xmark text-danger" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation (non-mock, after answer) */}
                {session.mode !== 'mock' && currentResponse && (
                  <div className="mt-5 rounded-[1.5rem] border border-emerald-500/20 bg-emerald-500/8 p-5">
                    <div className="text-[11px] font-black uppercase tracking-[0.18em] text-accent">Explanation</div>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{currentQuestion.explanation}</p>
                  </div>
                )}

                {/* Controls */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={() => navigateQuestion(-1)} disabled={session.currentIndex === 0}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-300 disabled:opacity-40">
                    Prev
                  </button>
                  <button type="button" onClick={toggleReviewMark}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-300">
                    Mark for Review
                  </button>
                  <button type="button" onClick={clearResponse}
                    className="rounded-xl border border-danger/20 bg-danger/10 px-4 py-2.5 text-sm font-bold text-danger">
                    Clear
                  </button>
                  <div className="flex-1" />
                  {session.currentIndex === session.questions.length - 1 ? (
                    <button type="button" onClick={confirmSubmit}
                      className="rounded-xl bg-gradient-to-r from-danger to-red-500 px-5 py-2.5 text-sm font-black uppercase tracking-[0.16em] text-white">
                      Submit
                    </button>
                  ) : (
                    <button type="button" onClick={() => navigateQuestion(1)}
                      className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 px-5 py-2.5 text-sm font-black uppercase tracking-[0.16em] text-white">
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar: palette + live score */}
          <aside className="space-y-6">
            <div className="glass-card rounded-[1.75rem] border border-white/5 p-5">
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Question Palette</div>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {session.questions.map((q, idx) => {
                  const ps     = renderPaletteState(q);
                  const active = idx === session.currentIndex;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => jumpToQuestion(idx)}
                      className="aspect-square rounded-xl border text-xs font-black transition-transform hover:scale-105"
                      style={{ ...paletteStyleMap[ps], boxShadow: active ? '0 0 0 2px rgba(99,102,241,0.5)' : 'none' }}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="glass-card rounded-[1.75rem] border border-white/5 p-5">
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Live Score</div>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                {[
                  ['Correct',      result.correct,      'text-accent'],
                  ['Wrong',        result.wrong,        'text-danger'],
                  ['Not attempted',result.notAttempted, 'text-sky-400'],
                  ['Unanswered',   result.unanswered,   'text-warning'],
                ].map(([label, val, cls]) => (
                  <div key={String(label)} className="flex items-center justify-between">
                    <span>{label}</span>
                    <span className={`font-bold ${cls}`}>{val}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-dark-bg/70 p-4">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Current score</div>
                <div className="mt-2 text-2xl font-black text-white">{result.finalScore.toFixed(2)}</div>
              </div>
              <button type="button" onClick={confirmSubmit}
                className="mt-5 w-full rounded-xl bg-gradient-to-r from-danger to-red-500 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white">
                Submit Exam
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ─── RESULT ────────────────────────────────────────────────────────── */}
      {view === 'result' && session && (
        <div className="mx-auto max-w-5xl space-y-6">
          <section className="glass-card rounded-[1.75rem] border border-white/5 p-6 md:p-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-accent">
              {activeModeMeta.label} Complete
            </div>
            <h3 className="mt-5 text-3xl font-heading font-black text-white">Session Results</h3>
            <p className="mt-3 text-sm text-slate-400">
              Score {result.finalScore.toFixed(2)} / {session.questions.length} with {result.accuracy}% accuracy.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
              {[
                { val: result.finalScore.toFixed(2), label: 'Score',    cls: 'text-white',    border: 'border-white/10',        bg: 'bg-white/5' },
                { val: result.correct,               label: 'Correct',  cls: 'text-accent',   border: 'border-emerald-500/15',   bg: 'bg-emerald-500/8' },
                { val: result.wrong,                 label: 'Wrong',    cls: 'text-danger',   border: 'border-red-500/15',       bg: 'bg-red-500/8' },
                { val: result.notAttempted,          label: 'Option E', cls: 'text-sky-400',  border: 'border-sky-500/15',       bg: 'bg-sky-500/8' },
                { val: result.unanswered,            label: 'Blank',    cls: 'text-warning',  border: 'border-amber-500/15',     bg: 'bg-amber-500/8' },
                { val: `${result.accuracy}%`,        label: 'Accuracy', cls: 'text-white',    border: 'border-white/10',         bg: 'bg-white/5' },
              ].map((card) => (
                <div key={card.label} className={`rounded-[1.5rem] border ${card.border} ${card.bg} p-4`}>
                  <div className={`text-2xl font-black ${card.cls}`}>{card.val}</div>
                  <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{card.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-[1.75rem] border border-white/5 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Topic Analysis</div>
                <h4 className="mt-2 text-xl font-heading font-black text-white">Performance by topic</h4>
              </div>
              <button type="button" onClick={() => setView('review')}
                className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 px-5 py-2.5 text-sm font-black uppercase tracking-[0.16em] text-white">
                Review Answers
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {result.topicStats.map((item) => (
                <div key={item.topic} className="rounded-[1.5rem] border border-white/10 bg-dark-bg/70 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-base font-bold text-white">{item.topic}</div>
                      <div className="text-xs text-slate-500">{item.subject}</div>
                    </div>
                    <div className="text-sm font-bold text-white">{item.correct}/{item.total}</div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full ${item.percentage >= 70 ? 'bg-accent' : item.percentage >= 40 ? 'bg-warning' : 'bg-danger'}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={restartSession}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-300">
                New Session
              </button>
              <button type="button" onClick={() => setView('review')}
                className="rounded-xl border border-brand-500/20 bg-brand-500/10 px-5 py-3 text-sm font-bold text-brand-300">
                Open Review
              </button>
            </div>
          </section>
        </div>
      )}

      {/* ─── REVIEW ────────────────────────────────────────────────────────── */}
      {view === 'review' && session && (
        <div className="mx-auto max-w-5xl space-y-6">
          <section className="glass-card rounded-[1.75rem] border border-white/5 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Answer Review</div>
                <h3 className="mt-2 text-2xl font-heading font-black text-white">Review every response</h3>
              </div>
              <button type="button" onClick={() => setView('result')}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300">
                Back to Results
              </button>
            </div>

            {/* Filter tabs */}
            <div className="mt-6 flex flex-wrap gap-2">
              {([ ['all','All'], ['correct','Correct'], ['wrong','Wrong'], ['na','Not Attempted'], ['unanswered','Blank'], ['bookmarked','Bookmarked'] ] as Array<[ReviewFilter, string]>).map(([filter, label]) => {
                const active = session.reviewFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setReviewFilter(filter)}
                    className="rounded-full border px-4 py-2 text-sm font-bold transition-all"
                    style={{
                      background:  active ? 'rgba(99,102,241,0.14)' : 'rgba(255,255,255,0.04)',
                      borderColor: active ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.1)',
                      color:       active ? '#c7d2fe' : '#94a3b8',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Question list */}
            <div className="mt-6 space-y-4">
              {filteredReviewQuestions.map((q, idx) => {
                const res          = session.responses[q.id];
                const isCorrect    = res === q.correctAnswer;
                const isWrong      = res !== undefined && res !== 'E' && res !== q.correctAnswer;
                const isNa         = res === 'E';
                const isUnanswered = res === undefined;

                return (
                  <article key={q.id} className="rounded-[1.5rem] border border-white/10 bg-dark-bg/70 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-slate-400">Q{idx + 1}</div>
                        <div className="mt-2 text-base font-semibold leading-7 text-white">{q.question}</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {isCorrect    && <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-accent">Correct</span>}
                        {isWrong      && <span className="rounded-full border border-red-500/20    bg-red-500/10    px-3 py-1 text-xs font-bold text-danger">Wrong</span>}
                        {isNa         && <span className="rounded-full border border-sky-500/20    bg-sky-500/10    px-3 py-1 text-xs font-bold text-sky-400">Not Attempted</span>}
                        {isUnanswered && <span className="rounded-full border border-amber-500/20  bg-amber-500/10  px-3 py-1 text-xs font-bold text-warning">Blank</span>}
                        {session.bookmarked.includes(q.id) && <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">Bookmarked</span>}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3">
                      {getOptionEntries(q).map(([key, label]) => {
                        const selected = res === key;
                        const correct  = key === q.correctAnswer;
                        return (
                          <div
                            key={key}
                            className="rounded-xl border px-4 py-3 text-sm"
                            style={{
                              background:  correct ? 'rgba(16,185,129,0.1)' : selected ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.03)',
                              borderColor: correct ? 'rgba(16,185,129,0.2)' : selected ? 'rgba(239,68,68,0.22)' : 'rgba(255,255,255,0.08)',
                            }}
                          >
                            <span className="font-black text-slate-400">{key}</span>
                            <span className="ml-3 text-slate-200">{label}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5 rounded-xl border border-emerald-500/15 bg-emerald-500/8 p-4">
                      <div className="text-[11px] font-black uppercase tracking-[0.18em] text-accent">Explanation</div>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{q.explanation || 'No explanation provided.'}</p>
                    </div>
                  </article>
                );
              })}

              {filteredReviewQuestions.length === 0 && (
                <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/3 px-6 py-10 text-center text-sm text-slate-500">
                  No questions match the current review filter.
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
