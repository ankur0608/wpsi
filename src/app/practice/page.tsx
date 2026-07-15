"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useUser } from '@/context/UserContext';

// ─── Types ────────────────────────────────────────────────────────────────────
export type Difficulty   = 'Easy' | 'Medium' | 'Hard';
export type PracticeMode = 'quick' | 'full' | 'mock';
export type AnswerKey    = 'A' | 'B' | 'C' | 'D' | 'E';

export interface PracticeMcq {
  id: string;
  subject: string;
  part: string;
  topic: string;
  difficulty: Difficulty;
  question: string;
  options: Record<'A' | 'B' | 'C' | 'D', string>;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  language?: string;
  translationId?: string | null;
  translations?: PracticeMcq[];
}

// Raw shape returned by the API
interface ApiMcqRow {
  id: string;
  subject: string;
  part?: string;
  topic: string;
  difficulty: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation: string | null;
  language?: string;
  translationId?: string | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

type ViewState    = 'setup' | 'instructions' | 'exam' | 'result' | 'review';
type ReviewFilter = 'all' | 'correct' | 'wrong' | 'na' | 'unanswered' | 'bookmarked';

interface SessionState {
  mode: PracticeMode;
  subjects: string[];
  topics: string[];
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

const DEFAULT_DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

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
    accent: 'from-primary-500 to-primary-600',
    description: 'Fast revision round with 20 random MCQs.',
    icon: 'fa-bolt',
    timerMinutes: null,
    questionCount: 20,
  },
  full: {
    label: 'Full Practice',
    accent: 'from-accent to-emerald-400',
    description: 'All MCQs in sequence for the selected topic.',
    icon: 'fa-layer-group',
    timerMinutes: null,
    questionCount: 0,
  },
  mock: {
    label: 'Timed Test',
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
  const safeIds = Array.isArray(ids) ? ids : [];
  return safeIds.includes(id) ? safeIds.filter((item) => item !== id) : [...safeIds, id];
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
    part: row.part || 'A',
    topic: row.topic,
    difficulty: (row.difficulty as Difficulty) || 'Medium',
    question: row.question,
    options: { A: row.optionA, B: row.optionB, C: row.optionC, D: row.optionD },
    correctAnswer: row.correctAnswer as 'A' | 'B' | 'C' | 'D',
    explanation: row.explanation ?? '',
    language: row.language || 'English',
    translationId: row.translationId || null,
  };
}

function buildSessionQuestions(
  mcqBank: PracticeMcq[],
  mode: PracticeMode,
  subjects: string[],
  topics: string[],
  difficulties: Difficulty[],
) {
  const normSubjects = subjects.map(normalizeText);
  const normTopics   = topics.map(normalizeText);

  let matches = mcqBank.filter((q) => {
    const subjectOk =
      subjects.length === 0 || normSubjects.includes('all subjects') || normSubjects.includes('all') || normSubjects.includes(normalizeText(q.subject));
    const topicOk =
      topics.length === 0 || normTopics.includes('all topics') || normTopics.includes('all') || normTopics.includes(normalizeText(q.topic));
    const diffOk = difficulties.includes(q.difficulty);
    return subjectOk && topicOk && diffOk;
  });

  const hasTestId = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('testId');
  const count = mode === 'full' || hasTestId
    ? matches.length
    : Math.min(MODE_META[mode].questionCount, matches.length);
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
  // During live exam, don't penalize unanswered questions so the score starts at 0.
  // Only apply the penalty for unanswered questions when the exam is submitted.
  const unansweredPenalty = session.submitted ? unanswered * 0.25 : 0;
  const negativeMarks = (wrong * 0.25) + unansweredPenalty;
  const finalScore    = correct - negativeMarks;
  const accuracy      = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
  const topicStats    = Object.values(topicAcc).map((e) => ({
    ...e, percentage: Math.round((e.correct / e.total) * 100),
  }));

  return { correct, wrong, notAttempted, unanswered, negativeMarks, finalScore, accuracy, topicStats };
}

// ─── MultiSelect Component ──────────────────────────────────────────────────
function MultiSelectDropdown({
  options,
  value,
  onChange,
  label,
  allLabel = 'All'
}: {
  options: { label: string; value: string; group?: string }[];
  value: string[];
  onChange: (val: string[]) => void;
  label: string;
  allLabel?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  const toggleOption = (opt: string) => {
    if (opt === allLabel) {
       onChange([allLabel]);
       return;
    }
    
    let newValue = [...value];
    if (newValue.includes(allLabel)) {
       newValue = newValue.filter(v => v !== allLabel);
    }
    
    if (newValue.includes(opt)) {
      newValue = newValue.filter(v => v !== opt);
      if (newValue.length === 0) newValue = [allLabel];
    } else {
      newValue.push(opt);
    }
    onChange(newValue);
  };

  const displayText = value.includes(allLabel) || value.length === 0
    ? allLabel
    : value.length <= 2
    ? value.join(', ')
    : `${value.length} selected`;

  const groups: Record<string, typeof options> = {};
  const unGrouped: typeof options = [];
  options.forEach(opt => {
    if (opt.group) {
      if (!groups[opt.group]) groups[opt.group] = [];
      groups[opt.group].push(opt);
    } else {
      unGrouped.push(opt);
    }
  });

  return (
    <div className="relative" ref={containerRef}>
      <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-dark-400">
        {label}
      </div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left rounded-2xl border border-dark-100 bg-white px-4 py-3 text-sm font-medium text-dark-900 outline-none transition-colors focus:border-brand-500/60 flex justify-between items-center"
      >
        <span className="truncate">{displayText}</span>
        <i className={`fa-solid fa-chevron-down transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border border-dark-100 bg-white shadow-2xl overflow-hidden max-h-64 flex flex-col">
          <div className="overflow-y-auto p-2 space-y-1">
            <label className="flex items-center gap-3 px-3 py-2 hover:bg-dark-50 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={value.includes(allLabel) || value.length === 0}
                onChange={() => toggleOption(allLabel)}
                className="w-4 h-4 rounded border-dark-100 bg-transparent text-primary-600 focus:ring-brand-500/30"
              />
              <span className="text-sm text-dark-900">{allLabel}</span>
            </label>
            
            {unGrouped.map((opt) => (
              <label key={opt.value} className="flex items-center gap-3 px-3 py-2 hover:bg-dark-50 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={value.includes(opt.value)}
                  onChange={() => toggleOption(opt.value)}
                  className="w-4 h-4 rounded border-dark-100 bg-transparent text-primary-600 focus:ring-brand-500/30"
                />
                <span className="text-sm text-dark-900">{opt.label}</span>
              </label>
            ))}

            {Object.entries(groups).map(([groupName, groupOpts]) => (
              <div key={groupName}>
                <div className="px-3 py-1 mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-dark-400">{groupName}</div>
                {groupOpts.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-3 px-3 py-2 hover:bg-dark-50 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value.includes(opt.value)}
                      onChange={() => toggleOption(opt.value)}
                      className="w-4 h-4 rounded border-dark-100 bg-transparent text-primary-600 focus:ring-brand-500/30"
                    />
                    <span className="text-sm text-dark-900">{opt.label}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
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
  const [testDuration, setTestDuration] = useState<number | null>(null);
  const [globalBookmarks, setGlobalBookmarks] = useState<string[]>([]);
  const fetchedRef = useRef(false);
  const bookmarksFetchedRef = useRef(false);

  // ── Setup state ────────────────────────────────────────────────────────────
  const [selectedMode,        setSelectedMode]        = useState<PracticeMode>('quick');
  const [selectedSubjects,    setSelectedSubjects]    = useState<string[]>(['All Subjects']);
  const [selectedTopics,      setSelectedTopics]      = useState<string[]>(['All Topics']);
  const [selectedDifficulties,setSelectedDifficulties]= useState<Difficulty[]>(DEFAULT_DIFFICULTIES);

  // ── Session / view state ───────────────────────────────────────────────────
  const [view,          setView]          = useState<ViewState>('setup');
  const [session,       setSession]       = useState<SessionState | null>(null);
  const [timeLeft,      setTimeLeft]      = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [modalConfig,   setModalConfig]   = useState<{ isOpen: boolean; title: string; message: string; type: 'confirm' | 'success' | 'info'; confirmText?: string; onConfirm?: () => void; onCancel?: () => void } | null>(null);
  const [autoStartRequested, setAutoStartRequested] = useState<boolean>(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<string>('English');
  const [xpEarned, setXpEarned] = useState<number | null>(null);
  const [showXpToast, setShowXpToast] = useState(false);
  const [streakEvent, setStreakEvent] = useState<{ reason: string; amount: number } | null>(null);

  // ── Derived lists from live bank ───────────────────────────────────────────
  const availableSubjectsWithParts = React.useMemo(() => {
    const map = new Map<string, string>();
    mcqBank.forEach((q) => {
      if (q.subject && !map.has(q.subject)) {
        map.set(q.subject, q.part || 'A');
      }
    });
    const partA: string[] = [];
    const partB: string[] = [];
    map.forEach((part, subject) => {
      if (part === 'A') partA.push(subject);
      else if (part === 'B') partB.push(subject);
      else partA.push(subject);
    });
    return { partA: partA.sort(), partB: partB.sort() };
  }, [mcqBank]);

  const topicsForSubject: string[] = React.useMemo(() => {
    let filtered = mcqBank;
    if (selectedSubjects.length > 0 && !selectedSubjects.includes('All Subjects')) {
      const norms = selectedSubjects.map(normalizeText);
      filtered = mcqBank.filter((q) => norms.includes(normalizeText(q.subject)));
    }
    const set = new Set(filtered.map((q) => q.topic).filter(Boolean));
    return Array.from(set).sort();
  }, [mcqBank, selectedSubjects]);

  // ── Fetch ALL practice MCQs from API on mount ──────────────────────────────
  const fetchBank = useCallback(async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    setBankLoading(true);
    setBankError(null);
    try {
      const testId = searchParams.get('testId');
      let url = testId ? `/api/mock-tests/${testId}/questions` : '/api/practice-mcqs?limit=500&page=1';
      const subject = searchParams.get('subject');
      const topic = searchParams.get('topic');
      if (subject && subject !== 'all') url += `&subject=${encodeURIComponent(subject)}`;
      if (topic && topic !== 'all') url += `&topic=${encodeURIComponent(topic)}`;
      
      const res  = await fetch(url);
      const json = await res.json() as {
        success: boolean;
        data: ApiMcqRow[];
        meta: { total: number; durationMinutes?: number };
        message?: string;
      };
      if (!json.success) throw new Error(json.message ?? 'API error');
      
      if (json.meta.durationMinutes) {
        setTestDuration(json.meta.durationMinutes);
      }
      
      const allMcqs = json.data.map(toMcq);
      const mcqMap = new Map<string, PracticeMcq>();
      const groupedMcqs: PracticeMcq[] = [];

      allMcqs.forEach((mcq) => {
        if (mcq.translationId) {
          if (mcqMap.has(mcq.translationId)) {
            const primary = mcqMap.get(mcq.translationId)!;
            if (!primary.translations) primary.translations = [];
            primary.translations.push(mcq);
          } else {
            mcqMap.set(mcq.translationId, mcq);
            groupedMcqs.push(mcq);
          }
        } else {
          groupedMcqs.push(mcq);
        }
      });

      const filteredMcqs = groupedMcqs.filter(mcq => {
        const hasEnglish = mcq.language === 'English' || mcq.language === 'Both' || mcq.translations?.some(t => t.language === 'English');
        const hasGujarati = mcq.language === 'Gujarati' || mcq.language === 'Both' || mcq.translations?.some(t => t.language === 'Gujarati');
        
        if (mcq.part === 'A') {
          return hasEnglish || hasGujarati;
        }
        
        // For other parts or undefined parts, we also allow single language
        // so that questions aren't completely hidden if missing a translation.
        return hasEnglish || hasGujarati;
      });

      setMcqBank(filteredMcqs);
      setTotalInDb(filteredMcqs.length);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load MCQs';
      setBankError(msg);
      fetchedRef.current = false; // allow retry
    } finally {
      setBankLoading(false);
    }
  }, [searchParams]);

  const fetchBookmarks = useCallback(async () => {
    if (bookmarksFetchedRef.current) return;
    bookmarksFetchedRef.current = true;
    try {
      const res = await fetch('/api/bookmarks');
      if (res.ok) {
        const json = await res.json();
        setGlobalBookmarks(json.data.map((b: any) => b.mcqId));
      }
    } catch (err) {
      console.error('Failed to fetch bookmarks', err);
    }
  }, []);

  useEffect(() => { 
    fetchBank(); 
    fetchBookmarks();
  }, [fetchBank, fetchBookmarks]);

  // ── Sync URL params → setup state ─────────────────────────────────────────
  useEffect(() => {
    const modeFromUrl = formatMode(searchParams.get('mode'));
    const subjectFromUrl = searchParams.get('subject');
    const topicFromUrl   = searchParams.get('topic');
    const diffsFromUrl   = formatDifficulties(searchParams.get('diff'));
    const autoFromUrl    = searchParams.get('auto') === 'true';
    const nextSubjects = subjectFromUrl && subjectFromUrl !== 'all' ? subjectFromUrl.split('|') : ['All Subjects'];
    const nextTopics   = topicFromUrl   && topicFromUrl   !== 'all' ? topicFromUrl.split('|') : ['All Topics'];

    setSelectedMode((c) => (c === modeFromUrl ? c : modeFromUrl));
    setSelectedSubjects((c) => (arraysEqual(c, nextSubjects) ? c : nextSubjects));
    setSelectedTopics((c) => (arraysEqual(c, nextTopics) ? c : nextTopics));
    setSelectedDifficulties((c) => (arraysEqual(c, diffsFromUrl) ? c : diffsFromUrl));
    setAutoStartRequested((c) => c || autoFromUrl);
  }, [searchParams]);

  useEffect(() => {
    if (!bankLoading && !bankError && autoStartRequested && !session) {
      startSession(true);
      setAutoStartRequested(false);
    }
  }, [bankLoading, bankError, autoStartRequested, session]);

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

  // ── Inactivity Auto-submit & Tab-switch anti-cheat ────────────────────────
  const [forceSubmit, setForceSubmit] = useState(false);
  const awayTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (view !== 'exam' || !session || session.submitted) return;
    const handler = () => {
      if (document.hidden) {
        awayTimerRef.current = window.setTimeout(() => {
          setStatusMessage('Exam auto-submitted due to 10 minutes of inactivity away from the tab.');
          setForceSubmit(true);
        }, 10 * 60 * 1000);

        if (session.mode === 'mock') {
          setSession((cur) => {
            if (!cur || cur.submitted || cur.mode !== 'mock') return cur;
            const violations = cur.violations + 1;
            if (violations >= 3) {
              setStatusMessage('3 tab-switch violations detected. Your mock test was auto-submitted.');
              setForceSubmit(true);
            } else {
              setStatusMessage(`Tab switch warning ${violations}/3. One more violation can end your mock test.`);
            }
            return { ...cur, violations };
          });
        }
      } else {
        if (awayTimerRef.current !== null) {
          window.clearTimeout(awayTimerRef.current);
          awayTimerRef.current = null;
        }
      }
    };
    document.addEventListener('visibilitychange', handler);
    return () => {
      document.removeEventListener('visibilitychange', handler);
      if (awayTimerRef.current !== null) {
        window.clearTimeout(awayTimerRef.current);
      }
    };
  }, [session?.mode, session?.submitted, view]);

  // ─── Actions ───────────────────────────────────────────────────────────────
  const startSession = (skipInstructions = false) => {
    const questions = buildSessionQuestions(
      mcqBank, selectedMode, selectedSubjects, selectedTopics, selectedDifficulties,
    );

    if (questions.length === 0) {
      setModalConfig({
        isOpen: true,
        type: 'info',
        title: 'No Questions Found',
        message: 'There are no questions matching the selected topic and difficulty levels. Please adjust your filters.',
        confirmText: 'Got it',
        onConfirm: () => setModalConfig(null)
      });
      return;
    }

    const nextSession: SessionState = {
      mode: selectedMode,
      subjects: selectedSubjects,
      topics: selectedTopics,
      difficulties: selectedDifficulties,
      questions,
      currentIndex: 0,
      responses: {},
      visited: [questions[0]?.id].filter(Boolean),
      markedForReview: [],
      bookmarked: [...globalBookmarks],
      submitted: false,
      reviewFilter: 'all',
      violations: 0,
    };
    setSession(nextSession);
    
    let minutes = MODE_META[selectedMode].timerMinutes ?? 0;
    if (selectedMode === 'mock' && testDuration) {
      minutes = testDuration;
    }
    setTimeLeft(minutes * 60);
    
    setStatusMessage('');
    setView(skipInstructions ? 'exam' : 'instructions');
  };

  const beginExam = () => { if (!session) return; setStatusMessage(''); setView('exam'); };

  const submitSession = async (auto = false) => {
    if (!session || session.submitted) return;
    
    const submittedSession = { ...session, submitted: true };
    const finalResult = calculateResult(submittedSession);

    setSession(submittedSession);
    if (auto) setStatusMessage((c) => c || 'The session was submitted automatically.');
    setView('result');

    try {
      const modeLabel = MODE_META[session.mode].label;
      const title = `${modeLabel} - ${session.subjects.includes('All Subjects') ? 'Mixed' : session.subjects.join(', ')}`;
      
      const res = await fetch('/api/test-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          mode: session.mode,
          totalMarks: session.questions.length,
          earnedMarks: finalResult.finalScore,
          percentage: finalResult.accuracy,
          details: session.questions.map((q: any) => {
            const guj = q.translations?.find((t: any) => t.language === 'Gujarati');
            return {
              id: q.id,
              question: q.question,
              questionGuj: guj?.question,
              options: q.options || { A: q.optionA, B: q.optionB, C: q.optionC, D: q.optionD },
              optionsGuj: guj ? (guj.options || { A: guj.optionA, B: guj.optionB, C: guj.optionC, D: guj.optionD }) : null,
              explanation: q.explanation,
              explanationGuj: guj?.explanation,
              selectedOption: session.responses[q.id],
              correctAnswer: q.correctAnswer,
              correct: session.responses[q.id] === q.correctAnswer
            };
          }),
          responses: session.questions
            .filter(q => session.responses[q.id] && session.responses[q.id] !== 'E')
            .map(q => ({
              mcqId: q.id,
              answer: session.responses[q.id]
            }))
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        
        if (data.xpEvents) {
          const streak = data.xpEvents.find((e: any) => e.reason === 'Daily Study Streak');
          if (streak) {
            setStreakEvent(streak);
            setTimeout(() => setStreakEvent(null), 6000);
          }
        }

        if (data.totalXPGained !== undefined) {
          setXpEarned(data.totalXPGained);
          setShowXpToast(true);
          setTimeout(() => setShowXpToast(false), 5000);
        }
      }
    } catch (e) {
      console.error('Failed to save test submission', e);
    }
  };

  const showSuccessAndSubmit = () => {
    setModalConfig({
      isOpen: true,
      type: 'success',
      title: 'Success!',
      message: 'You have successfully completed the MCQ session.',
      onConfirm: () => {
        setModalConfig(null);
        submitSession();
      }
    });
  };

  const confirmSubmit = () => {
    if (!session) return;
    const unanswered = session.questions.filter((q) => session.responses[q.id] === undefined).length;
    if (unanswered > 0) {
      setModalConfig({
        isOpen: true,
        type: 'confirm',
        title: 'Unanswered Questions',
        message: `You still have ${unanswered} unanswered question(s). Blank questions carry -0.25 marks. Submit anyway?`,
        onConfirm: () => {
          setModalConfig(null);
          showSuccessAndSubmit();
        },
        onCancel: () => setModalConfig(null)
      });
    } else {
      showSuccessAndSubmit();
    }
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
      markedForReview: cur.markedForReview.filter(id => id !== currentQuestion.id),
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



  const toggleReviewMark = () => {
    if (!session || !currentQuestion || session.submitted) return;
    updateSession((cur) => ({ ...cur, markedForReview: toggleId(cur.markedForReview, currentQuestion.id) }));
  };

  const toggleBookmark = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!session || !currentQuestion) {
      console.log("Toggle bookmark failed: no session or currentQuestion");
      return;
    }
    const qId = currentQuestion.id;
    console.log("Toggling bookmark for MCQ:", qId);
    
    // Optimistic update
    console.log("1. Performing optimistic update for bookmark UI");
    updateSession((cur) => ({ ...cur, bookmarked: toggleId(cur.bookmarked, qId) }));
    setGlobalBookmarks((cur) => toggleId(cur, qId));

    try {
      console.log("2. Sending POST request to /api/bookmarks...");
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mcqId: qId }),
      });
      console.log("3. API Response status:", res.status, res.ok);
      
      if (!res.ok) {
        // Revert on failure
        console.error("4. API request failed, reverting UI state");
        updateSession((cur) => ({ ...cur, bookmarked: toggleId(cur.bookmarked, qId) }));
        setGlobalBookmarks((cur) => toggleId(cur, qId));
        console.error('Failed to toggle bookmark with response:', res.statusText);
      } else {
        const data = await res.json();
        console.log("4. Bookmark successfully saved to DB. API data:", data);
      }
    } catch (err) {
      // Revert on failure
      console.error("4. Network error occurred, reverting UI state");
      updateSession((cur) => ({ ...cur, bookmarked: toggleId(cur.bookmarked, qId) }));
      setGlobalBookmarks((cur) => toggleId(cur, qId));
      console.error('Error toggling bookmark:', err);
    }
  };

  const setReviewFilter = (filter: ReviewFilter) => {
    if (!session) return;
    updateSession((cur) => ({ ...cur, reviewFilter: filter }));
  };

  useEffect(() => {
    if (forceSubmit) {
      submitSession(true);
      setForceSubmit(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceSubmit, session]);

  // ── Derived ────────────────────────────────────────────────────────────────
  const currentQuestion  = session ? session.questions[session.currentIndex] : null;
  let displayedQuestion = currentQuestion;

  useEffect(() => {
    if (currentQuestion) {
      const hasEnglish = currentQuestion.language === 'English' || currentQuestion.language === 'Both' || currentQuestion.translations?.some(t => t.language === 'English');
      const hasGujarati = currentQuestion.language === 'Gujarati' || currentQuestion.language === 'Both' || currentQuestion.translations?.some(t => t.language === 'Gujarati');
      
      if (activeLanguage === 'English' && !hasEnglish && hasGujarati) {
        setActiveLanguage('Gujarati');
      } else if (activeLanguage === 'Gujarati' && !hasGujarati && hasEnglish) {
        setActiveLanguage('English');
      }
    }
  }, [currentQuestion, activeLanguage]);

  if (currentQuestion && activeLanguage !== (currentQuestion.language || 'English')) {
    const translation = currentQuestion.translations?.find((t) => (t.language || 'English') === activeLanguage);
    if (translation) displayedQuestion = translation;
  }
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
    's-none':      { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: "#94a3b8" },
    's-unanswered':{ background: 'rgba(239,68,68,0.1)',    borderColor: 'rgba(239,68,68,0.25)',    color: '#fca5a5' },
    's-na':        { background: 'rgba(56,189,248,0.12)',  borderColor: 'rgba(56,189,248,0.28)',   color: '#7dd3fc' },
    's-answered':  { background: 'rgba(16,185,129,0.12)',  borderColor: 'rgba(16,185,129,0.26)',   color: '#86efac' },
    's-review':    { background: 'rgba(139,92,246,0.12)',  borderColor: 'rgba(139,92,246,0.28)',   color: '#c4b5fd' },
  };

  // ─── Loading / Error states ────────────────────────────────────────────────
  if (bankLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="h-12 w-12 rounded-full border-4 border-primary-500/20 border-t-primary-500 animate-spin" />
        <p className="text-sm text-dark-400">Loading MCQ bank from database…</p>
      </div>
    );
  }

  if (bankError) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="text-4xl">⚠️</div>
        <p className="text-sm font-bold text-danger">Failed to load MCQs</p>
        <p className="text-xs text-dark-400">{bankError}</p>
        <button
          type="button"
          onClick={() => { fetchedRef.current = false; fetchBank(); }}
          className="mt-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 text-sm font-bold text-dark-900"
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
        <p className="text-sm font-bold text-dark-900">No MCQs found in the database</p>
        <p className="text-xs text-dark-400">Upload MCQs from the Admin panel to get started.</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-6">

      

      {/* Status message */}
      {statusMessage && (
        <div
          className="rounded-2xl border px-4 py-3 text-sm"
          style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.18)', color: '#fbbf24' }}
        >
          {statusMessage}
        </div>
      )}

      {view === 'setup' && (
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="glass-card rounded-[1.75rem] border border-dark-100 p-6 md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-500">Session Setup</div>
                <h3 className="mt-2 text-2xl font-display font-bold text-dark-900">Choose your MCQ mode</h3>
                <p className="mt-2 max-w-xl text-sm text-dark-400">
                  Setup, instructions, question palette, results, and review — the same flow as the original HTML exam.
                </p>
              </div>
              <div className="rounded-2xl border border-dark-100 bg-white/60 px-4 py-3 text-right">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-400">Current preset</div>
                <div className="mt-1 text-sm font-bold text-dark-900">{MODE_META[selectedMode].label}</div>
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
                      background:  active ? 'linear-gradient(145deg, rgba(99,102,241,0.14), #f8fafc)' : 'rgba(255, 255, 255, 0.7)',
                      borderColor: active ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.08)',
                      boxShadow:   active ? '0 18px 40px rgba(99,102,241,0.12)' : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.accent} text-dark-900 shadow-lg`}>
                        <i className={`fa-solid ${meta.icon}`} />
                      </div>
                      {active && <i className="fa-solid fa-circle-check text-primary-500" />}
                    </div>
                    <div className="mt-5 text-lg font-bold text-dark-900">{meta.label}</div>
                    <p className="mt-2 text-sm leading-6 text-dark-400">{meta.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-wider">
                      <span className="rounded-full border border-dark-100 bg-dark-50 px-3 py-1 text-dark-600">{meta.questionCount} Questions</span>
                      <span className="rounded-full border border-dark-100 bg-dark-50 px-3 py-1 text-dark-600">
                        {meta.timerMinutes ? `${meta.timerMinutes} Min Timer` : 'Untimed'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Subject + Topic */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <MultiSelectDropdown
                label="Subjects"
                allLabel="All Subjects"
                value={selectedSubjects}
                onChange={(val) => {
                   setSelectedSubjects(val);
                   setSelectedTopics(['All Topics']);
                }}
                options={[
                  ...availableSubjectsWithParts.partA.map(s => ({ label: s, value: s, group: 'Part A' })),
                  ...availableSubjectsWithParts.partB.map(s => ({ label: s, value: s, group: 'Part B' }))
                ]}
              />

              <MultiSelectDropdown
                label={`Topics ${topicsForSubject.length > 0 ? `(${topicsForSubject.length} available)` : ''}`}
                allLabel="All Topics"
                value={selectedTopics}
                onChange={setSelectedTopics}
                options={topicsForSubject.map(t => ({ label: t, value: t }))}
              />
            </div>

            {/* Difficulty */}
            <div className="mt-8">
              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-dark-400">Difficulty</div>
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
                        background:  active ? 'rgba(99,102,241,0.14)' : "#f8fafc",
                        borderColor: active ? 'rgba(99,102,241,0.35)' : "#e2e8f0",
                        color:       active ? '#0f172a' : "#94a3b8",
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
                onClick={() => startSession()}
                className="rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-dark-900 shadow-[0_18px_35px_rgba(99,102,241,0.25)] transition-transform hover:scale-[1.02]"
              >
                Continue to Instructions
              </button>
              <Link
                href="/test"
                className="rounded-2xl border border-dark-100 bg-dark-50 px-6 py-3 text-sm font-bold text-dark-600 transition-colors hover:text-dark-900"
              >
                View Mock Tests
              </Link>
            </div>
          </section>

          {/* Sidebar preview */}
          <aside className="space-y-6">
            <div className="glass-card rounded-[1.75rem] border border-dark-100 p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Preview</div>
              <h3 className="mt-2 text-xl font-display font-bold text-dark-900">{modeMeta.label}</h3>
              <p className="mt-2 text-sm leading-6 text-dark-400">{modeMeta.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-dark-100 bg-white p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-400">Questions</div>
                  <div className="mt-1 text-base font-bold text-dark-900">{modeMeta.questionCount}</div>
                </div>
                <div className="rounded-2xl border border-dark-100 bg-white p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-400">Timer</div>
                  <div className="mt-1 text-base font-bold text-dark-900">
                    {modeMeta.timerMinutes ? `${modeMeta.timerMinutes} min` : 'No timer'}
                  </div>
                </div>
                <div className="rounded-2xl border border-dark-100 bg-white p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-400">Subject</div>
                  <div className="mt-1 text-base font-bold text-dark-900 truncate" title={selectedSubjects.join(', ')}>
                    {selectedSubjects.includes('All Subjects') ? 'All Subjects' : selectedSubjects.join(', ')}
                  </div>
                </div>
                <div className="rounded-2xl border border-dark-100 bg-white p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-400">Difficulty</div>
                  <div className="mt-1 text-base font-bold text-dark-900">{selectedDifficulties.join(', ')}</div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-[1.75rem] border border-dark-100 p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-warning">Scoring</div>
              <ul className="mt-4 space-y-3 text-sm text-dark-600">
                {[
                  { label: 'Correct answer',   score: '+1.00',  color: 'text-accent'  },
                  { label: 'Wrong answer',     score: '-0.25',  color: 'text-danger'  },
                  { label: 'Option E selected',score: '0.00',   color: 'text-sky-400' },
                  { label: 'Blank question',   score: '-0.25',  color: 'text-warning' },
                ].map((row) => (
                  <li key={row.label} className="flex items-center justify-between rounded-2xl border border-dark-100 bg-dark-50 px-4 py-3">
                    <span>{row.label}</span>
                    <span className={`font-bold ${row.color}`}>{row.score}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      )}

      {view === 'instructions' && session && (
        <div className="mx-auto max-w-4xl space-y-6">
          <section className="glass-card rounded-[1.75rem] border border-dark-100 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={restartSession}
                className="rounded-xl border border-dark-100 bg-dark-50 px-4 py-2 text-sm font-bold text-dark-600 transition-colors hover:text-dark-900"
              >
                Back
              </button>
              <span className="rounded-full border border-warning/20 bg-warning/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-warning">
                {activeModeMeta.label}
              </span>
            </div>
            <h3 className="mt-5 text-3xl font-display font-bold text-dark-900">Exam Instructions</h3>
            <p className="mt-2 text-sm leading-7 text-dark-400">
              Read these once before starting. The layout mirrors the original HTML flow.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-dark-100 bg-white p-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-dark-400">Session Info</div>
                <div className="mt-4 space-y-3 text-sm text-dark-600">
                  {[
                    ['Mode',      activeModeMeta.label],
                    ['Questions', session.questions.length],
                    ['Subject',   session.subjects.includes('All Subjects') ? 'All Subjects' : session.subjects.join(', ')],
                    ['Timer',     activeModeMeta.timerMinutes ? `${activeModeMeta.timerMinutes} minutes` : 'Not timed'],
                  ].map(([k, v]) => (
                    <div key={String(k)} className="flex items-center justify-between">
                      <span>{k}</span>
                      <span className="font-bold text-dark-900">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-dark-100 bg-white p-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-dark-400">Rules</div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-dark-600">
                  <li>Each correct answer gives 1 mark.</li>
                  <li>Wrong and blank answers both carry a -0.25 penalty.</li>
                  <li>Selecting option E marks the question as intentionally skipped with 0 marks.</li>
                  <li>Use the palette to jump quickly across questions.</li>
                  <li>Mock mode warns on tab switching and auto-submits after repeated violations.</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-dark-100 bg-white p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-dark-400">Palette Legend</div>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-dark-600">
                <span className="rounded-full border border-green-500 bg-green-500 px-3 py-2 text-white">Answered</span>
                <span className="rounded-full border border-amber-500 bg-amber-500 px-3 py-2 text-white">Review</span>
                <span className="rounded-full border border-blue-500 bg-blue-500 px-3 py-2 text-white">Current</span>
                <span className="rounded-full border border-red-500 bg-red-500 px-3 py-2 text-white">Not Answered</span>
                <span className="rounded-full border border-slate-500 bg-slate-500 px-3 py-2 text-white">Not Attempted</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={restartSession}
                className="rounded-2xl border border-dark-100 bg-dark-50 px-5 py-3 text-sm font-bold text-dark-600 transition-colors hover:text-dark-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={beginExam}
                className="rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-dark-900 shadow-[0_18px_35px_rgba(99,102,241,0.25)]"
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
          <section className="w-full min-w-0">
            <div className="mx-auto max-w-[800px] w-full min-w-0 rounded-[1.5rem] bg-white text-dark-900 p-4 md:p-6 shadow-2xl">
              {/* Header */}
              <div className="flex justify-between items-center mb-3 md:mb-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-base md:text-lg font-bold m-0">Question {session.currentIndex + 1} of {session.questions.length}</h2>
                  {currentQuestion.part && (
                    <span className="bg-[#38bdf8]/10 border border-[#38bdf8]/25 text-[#38bdf8] px-3 py-1 rounded-full text-xs font-semibold">
                      Part {currentQuestion.part}
                    </span>
                  )}
                </div>
                <button 
                  onClick={(e) => toggleBookmark(e)}
                  className="bg-transparent border border-dark-100 text-primary-600 px-3 py-2 rounded-lg cursor-pointer flex flex-col items-center text-[10px] gap-1 hover:bg-dark-50 transition-colors"
                >
                  <i className={`fa-bookmark ${session.bookmarked.includes(currentQuestion.id) ? 'fa-solid' : 'fa-regular'} text-base`}></i>
                  <span className="hidden md:inline">Save</span>
                </button>
              </div>

              {/* Progress */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4 md:mb-6">
                <div className="flex-1 h-1 bg-dark-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-600 rounded-full transition-all" 
                    style={{ width: `${((session.currentIndex + 1) / session.questions.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-primary-600 font-semibold text-right md:text-left">
                  {Math.round(((session.currentIndex + 1) / session.questions.length) * 100)}% Completed
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
                    <span className="text-xs font-semibold leading-tight">{currentQuestion.subject || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-[130px] bg-dark-50 border border-dark-100 rounded-xl p-1.5 md:p-2 flex items-center gap-1.5 md:gap-2">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center text-sm bg-[#10b981]/10 text-[#10b981] shrink-0">
                    <i className="fa-regular fa-file-lines"></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-dark-400 uppercase tracking-wider">Topic</span>
                    <span className="text-xs font-semibold leading-tight">{currentQuestion.topic || 'N/A'}</span>
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
                  {(!currentQuestion.language || currentQuestion.language === 'English' || currentQuestion.language === 'Both' || currentQuestion.translations?.some(t => t.language === 'English')) && (
                    <button 
                      onClick={() => setActiveLanguage('English')}
                      className={`px-2 md:px-3 py-1 rounded-md text-xs font-semibold transition-colors ${activeLanguage === 'English' ? 'bg-primary-600 text-[#111]' : 'text-dark-400 hover:text-dark-900'}`}
                    >
                      English
                    </button>
                  )}
                  {(currentQuestion.language === 'Gujarati' || currentQuestion.language === 'Both' || currentQuestion.translations?.some(t => t.language === 'Gujarati')) && (
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
                {displayedQuestion && getOptionEntries(displayedQuestion).map(([key, label]) => {
                  const selected  = currentResponse === key;
                  const showState = session.submitted || (session.mode === 'full' && currentResponse !== undefined);
                  const correct   = key === currentQuestion.correctAnswer;
                  const wrongSel  = selected && key !== currentQuestion.correctAnswer && key !== 'E';

                  let bgClass = "bg-dark-50";
                  let borderClass = "border-dark-100";
                  let radioClass = "border-dark-100";
                  let radioFill = false;

                  if (showState && correct) {
                    bgClass = "bg-[#10b981]/10";
                    borderClass = "border-[#10b981]/30";
                  } else if (showState && wrongSel) {
                    bgClass = "bg-[#ef4444]/10";
                    borderClass = "border-[#ef4444]/30";
                  } else if (selected && key === 'E') {
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
                      
                      {showState && correct ? (
                        <i className="fa-solid fa-circle-check text-[#10b981] text-xl"></i>
                      ) : showState && wrongSel ? (
                        <i className="fa-solid fa-circle-xmark text-[#ef4444] text-xl"></i>
                      ) : (
                        <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center ${radioClass}`}>
                          {radioFill && <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${key === 'E' ? 'bg-[#0ea5e9]' : 'bg-primary-600'}`}></div>}
                        </div>
                      )}
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
                  onClick={() => navigateQuestion(-1)} disabled={session.currentIndex === 0}
                  className="col-span-1 md:flex-1 bg-dark-50 border border-dark-100 text-dark-600 p-1.5 sm:p-2 rounded-xl flex flex-col md:flex-row items-center justify-center gap-1 text-[9px] sm:text-[10px] hover:bg-dark-50 transition-colors disabled:opacity-40 min-w-0"
                >
                  <i className="fa-solid fa-arrow-left text-sm"></i>
                  <span className="truncate">Prev</span>
                </button>
                <button 
                  onClick={toggleReviewMark}
                  className={`col-span-1 md:flex-1 bg-dark-50 border border-dark-100 p-1.5 sm:p-2 rounded-xl flex flex-col md:flex-row items-center justify-center gap-1 text-[9px] sm:text-[10px] hover:bg-dark-50 transition-colors min-w-0 ${session.markedForReview.includes(currentQuestion.id) ? 'text-primary-600' : 'text-dark-600'}`}
                >
                  <i className={`fa-bookmark ${session.markedForReview.includes(currentQuestion.id) ? 'fa-solid' : 'fa-regular'} text-sm`}></i>
                  <span className="truncate">Review</span>
                </button>

                {/* Timer — only shown for mock/timed mode */}
                {session.mode === 'mock' && (
                  <div className="col-span-3 md:col-span-1 md:flex-[1.5] bg-dark-50 border border-dark-100 text-dark-600 py-1.5 px-3 rounded-xl flex flex-row md:flex-col items-center justify-between md:justify-center gap-1 md:gap-0 order-first md:order-none mb-2 md:mb-0">
                    <span className="text-[9px] text-dark-400 uppercase tracking-wider">Time Left</span>
                    <span className="text-sm md:text-base text-[#38bdf8] font-bold">{formatTime(timeLeft)}</span>
                  </div>
                )}

                <button 
                  onClick={session.currentIndex === session.questions.length - 1 ? confirmSubmit : () => navigateQuestion(1)}
                  className="col-span-3 md:flex-[2] bg-primary-600 text-[#111] p-3 md:p-3 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base font-bold hover:bg-primary-700 transition-colors mt-2 md:mt-0 shadow-lg shadow-[#ea580c]/20"
                >
                  <i className="fa-regular fa-paper-plane"></i>
                  <span>{session.currentIndex === session.questions.length - 1 ? 'Submit Exam' :'Next'}</span>
                </button>
              </div>

              {/* Explanation */}
              {session.mode === 'full' && currentResponse && (
                <div className="mt-5 md:mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 md:p-5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">Explanation</div>
                  <p className="mt-2 text-xs md:text-sm leading-6 text-dark-600">{displayedQuestion?.explanation || 'No explanation available.'}</p>
                </div>
              )}
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
                {session.questions.map((q, idx) => {
                  const ps     = renderPaletteState(q);
                  const active = idx === session.currentIndex;
                  
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        jumpToQuestion(idx);
                      }}
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
                  {session.questions.map((q, idx) => {
                    const ps     = renderPaletteState(q);
                    const active = idx === session.currentIndex;
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
      )}

{/* ─── RESULT ────────────────────────────────────────────────────────── */}
      {view === 'result' && session && (
        <div className="mx-auto max-w-5xl space-y-6">
          <section className="glass-card rounded-[1.75rem] border border-dark-100 p-6 md:p-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
              {activeModeMeta.label} Complete
            </div>
            <h3 className="mt-5 text-3xl font-display font-bold text-dark-900">Session Results</h3>
            <p className="mt-3 text-sm text-dark-400">
              Score {result.finalScore.toFixed(2)} / {session.questions.length} with {result.accuracy}% accuracy.
            </p>

            {xpEarned !== null && xpEarned > 0 && (
              <div className="mt-5 inline-flex items-center justify-center gap-3 rounded-[1.25rem] border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-amber-600 shadow-sm animate-[pulse_2s_ease-in-out_infinite]">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 text-sm shadow-inner">
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600/70 leading-tight">Reward</p>
                  <p className="text-lg font-black leading-none">+{xpEarned} XP Earned!</p>
                </div>
              </div>
            )}

            <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
              {[
                { val: result.finalScore.toFixed(2), label: 'Score',    cls: 'text-dark-900',    border: 'border-dark-100',        bg: 'bg-dark-50' },
                { val: result.correct,               label: 'Correct',  cls: 'text-accent',   border: 'border-emerald-500/15',   bg: 'bg-emerald-500/8' },
                { val: result.wrong,                 label: 'Wrong',    cls: 'text-danger',   border: 'border-red-500/15',       bg: 'bg-red-500/8' },
                { val: result.notAttempted,          label: 'Option E', cls: 'text-sky-400',  border: 'border-sky-500/15',       bg: 'bg-sky-500/8' },
                { val: result.unanswered,            label: 'Blank',    cls: 'text-warning',  border: 'border-amber-500/15',     bg: 'bg-amber-500/8' },
                { val: `${result.accuracy}%`,        label: 'Accuracy', cls: 'text-dark-900',    border: 'border-dark-100',         bg: 'bg-dark-50' },
              ].map((card) => (
                <div key={card.label} className={`rounded-[1.5rem] border ${card.border} ${card.bg} p-4`}>
                  <div className={`text-2xl font-bold ${card.cls}`}>{card.val}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-dark-400">{card.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-[1.75rem] border border-dark-100 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-dark-400">Topic Analysis</div>
                <h4 className="mt-2 text-xl font-display font-bold text-dark-900">Performance by topic</h4>
              </div>
              <button type="button" onClick={() => setView('review')}
                className="rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.16em] text-white">
                Review Answers
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {result.topicStats.map((item) => (
                <div key={item.topic} className="rounded-[1.5rem] border border-dark-100 bg-white p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-base font-bold text-dark-900">{item.topic}</div>
                      <div className="text-xs text-dark-400">{item.subject}</div>
                    </div>
                    <div className="text-sm font-bold text-dark-900">{item.correct}/{item.total}</div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-dark-50">
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
                className="rounded-xl border border-dark-100 bg-dark-50 px-5 py-3 text-sm font-bold text-dark-600">
                New Session
              </button>
              <button type="button" onClick={() => setView('review')}
                className="rounded-xl border border-primary-500/20 bg-primary-600 hover:bg-primary-700 px-5 py-3 text-sm font-bold text-white transition-colors">
                Open Review
              </button>
            </div>
          </section>
        </div>
      )}

      {/* ─── REVIEW ────────────────────────────────────────────────────────── */}
      {view === 'review' && session && (
        <div className="mx-auto max-w-5xl space-y-6">
          <section className="glass-card rounded-[1.75rem] border border-dark-100 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-dark-400">Answer Review</div>
                <h3 className="mt-2 text-2xl font-display font-bold text-dark-900">Review every response</h3>
              </div>
              <button type="button" onClick={() => setView('result')}
                className="rounded-xl border border-dark-100 bg-dark-50 px-4 py-2 text-sm font-bold text-dark-600">
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
                      borderColor: active ? 'rgba(99,102,241,0.35)' : "#e2e8f0",
                      color:       active ? '#c7d2fe' : "#94a3b8",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
              <div className="flex bg-dark-50 border border-dark-200 p-1 rounded-lg shadow-sm w-fit">
                  <button 
                    onClick={() => setActiveLanguage('English')} 
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeLanguage === 'English' ? 'bg-white shadow-sm text-primary-700' : 'text-dark-500 hover:text-dark-700'}`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={() => setActiveLanguage('Gujarati')} 
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeLanguage === 'Gujarati' ? 'bg-white shadow-sm text-primary-700' : 'text-dark-500 hover:text-dark-700'}`}
                  >
                    GU
                  </button>
              </div>
            </div>

            {/* Question list */}
            <div className="mt-6 space-y-4">
              {filteredReviewQuestions.map((q, idx) => {
                const res          = session.responses[q.id];
                const isCorrect    = res === q.correctAnswer;
                const isWrong      = res !== undefined && res !== 'E' && res !== q.correctAnswer;
                const isNa         = res === 'E';
                const isUnanswered = res === undefined;

                const tGuj = q.translations?.find(t => t.language === 'Gujarati');
                const useGuj = activeLanguage === 'Gujarati' && !!tGuj;

                return (
                  <article key={q.id} className="rounded-[1.5rem] border border-dark-100 bg-white p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-dark-400">Q{idx + 1}</div>
                        <div className="mt-2 text-base font-semibold leading-7 text-dark-900">
                          <div>{useGuj ? tGuj.question : q.question}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {isCorrect    && <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-accent">Correct</span>}
                        {isWrong      && <span className="rounded-full border border-red-500/20    bg-red-500/10    px-3 py-1 text-xs font-bold text-danger">Wrong</span>}
                        {isNa         && <span className="rounded-full border border-sky-500/20    bg-sky-500/10    px-3 py-1 text-xs font-bold text-sky-400">Not Attempted</span>}
                        {isUnanswered && <span className="rounded-full border border-amber-500/20  bg-amber-500/10  px-3 py-1 text-xs font-bold text-warning">Blank</span>}
                        {session.bookmarked.includes(q.id) && <span className="rounded-full border border-dark-100 bg-dark-50 px-3 py-1 text-xs font-bold text-dark-600">Bookmarked</span>}
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
                              background:  correct ? 'rgba(16,185,129,0.1)' : selected ? 'rgba(239,68,68,0.1)' : "#f8fafc",
                              borderColor: correct ? 'rgba(16,185,129,0.2)' : selected ? 'rgba(239,68,68,0.22)' : 'rgba(255,255,255,0.08)',
                            }}
                          >
                            <div className="flex items-center w-full">
                              <span className="font-bold text-dark-400 w-6 shrink-0">{key}</span>
                              <span className="text-dark-900">{useGuj ? (tGuj[`option${key}` as keyof typeof tGuj] as string) : label}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5 rounded-xl border border-emerald-500/15 bg-emerald-500/8 p-4">
                      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Explanation</div>
                      <p className="mt-2 text-sm leading-7 text-dark-600">{(useGuj && tGuj.explanation) ? tGuj.explanation : (q.explanation || 'No explanation provided.')}</p>
                    </div>
                  </article>
                );
              })}

              {filteredReviewQuestions.length === 0 && (
                <div className="rounded-[1.5rem] border border-dashed border-dark-100 bg-white/3 px-6 py-10 text-center text-sm text-dark-400">
                  No questions match the current review filter.
                </div>
              )}
            </div>
          </section>
        </div>
      )}
      {/* ─── MODAL ────────────────────────────────────────────────────────── */}
      {modalConfig?.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-dark-100 rounded-3xl p-7 max-w-sm w-full shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className={`absolute top-0 left-0 w-full h-1.5 ${modalConfig.type === 'success' ? 'bg-emerald-500' : modalConfig.type === 'info' ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-warning'}`}></div>
            <div className="flex items-center gap-4 mb-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${modalConfig.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : modalConfig.type === 'info' ? 'bg-primary-600 hover:bg-primary-700 text-white/10 text-primary-500' : 'bg-warning/10 text-warning'}`}>
                <i className={`fa-solid ${modalConfig.type === 'success' ? 'fa-check' : modalConfig.type === 'info' ? 'fa-circle-info' : 'fa-exclamation-triangle'}`}></i>
              </div>
              <h3 className="text-xl font-display font-bold text-dark-900">{modalConfig.title}</h3>
            </div>
            <p className="text-dark-600 text-sm mb-8 leading-relaxed">
              {modalConfig.message}
            </p>
            <div className="flex justify-end gap-3">
              {modalConfig.type === 'confirm' && (
                <button 
                  onClick={modalConfig.onCancel}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-dark-600 hover:bg-dark-50 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button 
                onClick={modalConfig.onConfirm}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider text-dark-900 transition-transform hover:scale-105 ${modalConfig.type === 'success' ? 'bg-emerald-500 shadow-[0_10px_20px_rgba(16,185,129,0.2)]' : modalConfig.type === 'info' ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-[0_10px_20px_rgba(99,102,241,0.2)]' : 'bg-warning text-dark-bg shadow-[0_10px_20px_rgba(245,158,11,0.2)]'}`}
              >
                {modalConfig.confirmText || (modalConfig.type === 'success' ? 'View Results' : 'Submit Anyway')}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* XP Toast Notification */}
      {showXpToast && xpEarned !== null && xpEarned > 0 && (
        <div className="fixed top-24 right-6 z-[100] animate-[bounce_1s_ease-in-out_infinite]">
          <div className="flex items-center gap-4 rounded-2xl bg-dark-900 px-6 py-5 text-white shadow-2xl border border-dark-700">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-500 shadow-inner">
              <i className="fa-solid fa-star text-2xl"></i>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-400">Congratulations!</p>
              <p className="text-xl font-black text-amber-500">+{xpEarned} XP Earned</p>
            </div>
            <button 
              onClick={() => setShowXpToast(false)}
              className="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-dark-800 text-dark-400 hover:text-white transition-colors"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}
      {/* Streak Event Toast Notification */}
      {streakEvent && (
        <div className="fixed top-[180px] right-6 z-[90] animate-[slide-in-right_0.5s_ease-out]">
          <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-5 text-white shadow-2xl border border-orange-400/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white shadow-inner">
              <i className="fa-solid fa-fire text-2xl"></i>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-100">{streakEvent.reason}</p>
              <p className="text-xl font-black text-white">+{streakEvent.amount} XP Earned</p>
            </div>
            <button 
              onClick={() => setStreakEvent(null)}
              className="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white/70 hover:text-white hover:bg-black/40 transition-colors"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
