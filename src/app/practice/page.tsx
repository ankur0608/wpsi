"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  PRACTICE_MCQ_BANK,
  PRACTICE_SUBJECTS,
  type AnswerKey,
  type Difficulty,
  type PracticeMcq,
  type PracticeMode,
} from '@/data/practiceMcqs';
import { useUser } from '@/context/UserContext';

type ViewState = 'setup' | 'instructions' | 'exam' | 'result' | 'review';
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

const DEFAULT_DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];
const MODE_META: Record<
  PracticeMode,
  {
    label: string;
    accent: string;
    description: string;
    icon: string;
    timerMinutes: number | null;
    questionCount: number;
  }
> = {
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

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function arraysEqual(left: string[], right: string[]) {
  if (left.length !== right.length) return false;
  return left.every((value, index) => value === right[index]);
}

function toggleId(ids: string[], id: string) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

function shuffleQuestions(items: PracticeMcq[]) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
}

function formatMode(rawMode: string | null): PracticeMode {
  if (rawMode === 'full' || rawMode === 'mock') return rawMode;
  return 'quick';
}

function formatDifficulties(rawDiff: string | null) {
  if (!rawDiff) return DEFAULT_DIFFICULTIES;

  const parsed = rawDiff
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `${item.charAt(0).toUpperCase()}${item.slice(1).toLowerCase()}` as Difficulty)
    .filter((item) => DEFAULT_DIFFICULTIES.includes(item));

  return parsed.length > 0 ? Array.from(new Set(parsed)) : DEFAULT_DIFFICULTIES;
}

function getOptionEntries(question: PracticeMcq): Array<[AnswerKey, string]> {
  const baseEntries = Object.entries(question.options) as Array<['A' | 'B' | 'C' | 'D', string]>;
  return [...baseEntries, ['E', 'Not Attempted'] as [AnswerKey, string]];
}

function buildSessionQuestions(
  mode: PracticeMode,
  subject: string,
  topic: string,
  difficulties: Difficulty[],
) {
  const normalizedSubject = normalizeText(subject);
  const normalizedTopic = normalizeText(topic);

  let matches = PRACTICE_MCQ_BANK.filter((question) => {
    const subjectMatches =
      !subject ||
      normalizedSubject === 'all' ||
      normalizeText(question.subject) === normalizedSubject;
    const topicMatches =
      !topic ||
      normalizedTopic === 'all' ||
      normalizeText(question.topic) === normalizedTopic;
    const difficultyMatches = difficulties.includes(question.difficulty);

    return subjectMatches && topicMatches && difficultyMatches;
  });

  if (matches.length === 0 && subject && normalizedSubject !== 'all') {
    matches = PRACTICE_MCQ_BANK.filter((question) => normalizeText(question.subject) === normalizedSubject);
  }

  if (matches.length === 0) {
    matches = [...PRACTICE_MCQ_BANK];
  }

  const count = Math.min(MODE_META[mode].questionCount, matches.length);
  return shuffleQuestions(matches).slice(0, count);
}

function calculateResult(session: SessionState | null) {
  if (!session) {
    return {
      correct: 0,
      wrong: 0,
      notAttempted: 0,
      unanswered: 0,
      negativeMarks: 0,
      finalScore: 0,
      accuracy: 0,
      topicStats: [] as Array<{ topic: string; subject: string; correct: number; total: number; percentage: number }>,
    };
  }

  let correct = 0;
  let wrong = 0;
  let notAttempted = 0;
  let unanswered = 0;
  const topicAccumulator: Record<string, { topic: string; subject: string; correct: number; total: number }> = {};

  session.questions.forEach((question) => {
    const response = session.responses[question.id];

    if (!topicAccumulator[question.topic]) {
      topicAccumulator[question.topic] = {
        topic: question.topic,
        subject: question.subject,
        correct: 0,
        total: 0,
      };
    }

    topicAccumulator[question.topic].total += 1;

    if (response === undefined) {
      unanswered += 1;
      return;
    }

    if (response === 'E') {
      notAttempted += 1;
      return;
    }

    if (response === question.correctAnswer) {
      correct += 1;
      topicAccumulator[question.topic].correct += 1;
      return;
    }

    wrong += 1;
  });

  const attempted = correct + wrong;
  const negativeMarks = (wrong + unanswered) * 0.25;
  const finalScore = correct - negativeMarks;
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  const topicStats = Object.values(topicAccumulator).map((entry) => ({
    ...entry,
    percentage: Math.round((entry.correct / entry.total) * 100),
  }));

  return {
    correct,
    wrong,
    notAttempted,
    unanswered,
    negativeMarks,
    finalScore,
    accuracy,
    topicStats,
  };
}

export default function PracticePage() {
  const searchParams = useSearchParams();
  const { user } = useUser();

  const [selectedMode, setSelectedMode] = useState<PracticeMode>('quick');
  const [selectedSubject, setSelectedSubject] = useState<string>('All Subjects');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>(DEFAULT_DIFFICULTIES);
  const [view, setView] = useState<ViewState>('setup');
  const [session, setSession] = useState<SessionState | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(MODE_META.quick.timerMinutes ?? 0);
  const [statusMessage, setStatusMessage] = useState<string>('');

  useEffect(() => {
    const modeFromUrl = formatMode(searchParams.get('mode'));
    const subjectFromUrl = searchParams.get('subject');
    const topicFromUrl = searchParams.get('topic');
    const difficultiesFromUrl = formatDifficulties(searchParams.get('diff'));
    const nextSubject = subjectFromUrl && subjectFromUrl !== 'all' ? subjectFromUrl : 'All Subjects';
    const nextTopic = topicFromUrl && topicFromUrl !== 'all' ? topicFromUrl : '';

    setSelectedMode((current) => (current === modeFromUrl ? current : modeFromUrl));
    setSelectedSubject((current) => (current === nextSubject ? current : nextSubject));
    setSelectedTopic((current) => (current === nextTopic ? current : nextTopic));
    setSelectedDifficulties((current) => (arraysEqual(current, difficultiesFromUrl) ? current : difficultiesFromUrl));
  }, [searchParams]);

  useEffect(() => {
    if (!session || view !== 'exam' || session.mode !== 'mock' || session.submitted) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [session?.mode, session?.submitted, view]);

  useEffect(() => {
    if (view !== 'exam' || !session || session.mode !== 'mock' || session.submitted) {
      return;
    }

    if (timeLeft === 300) {
      setStatusMessage('5 minutes left. Review your marked questions before time runs out.');
    } else if (timeLeft === 60) {
      setStatusMessage('Final 1 minute remaining. The exam will auto-submit when the timer reaches zero.');
    } else if (timeLeft === 0) {
      submitSession(true);
    }
  }, [session?.mode, session?.submitted, timeLeft, view]);

  useEffect(() => {
    if (view !== 'exam' || !session || session.mode !== 'mock' || session.submitted) {
      return undefined;
    }

    const handleVisibility = () => {
      if (!document.hidden) return;

      setSession((current) => {
        if (!current || current.submitted || current.mode !== 'mock') return current;

        const violations = current.violations + 1;

        if (violations >= 3) {
          setStatusMessage('3 tab-switch violations detected. Your mock test was auto-submitted.');
          window.setTimeout(() => submitSession(true), 0);
        } else {
          setStatusMessage(`Tab switch warning ${violations}/3. One more violation can end your mock test.`);
        }

        return {
          ...current,
          violations,
        };
      });
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [session?.mode, session?.submitted, view]);

  const startSession = () => {
    const questions = buildSessionQuestions(
      selectedMode,
      selectedSubject,
      selectedTopic,
      selectedDifficulties,
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

  const beginExam = () => {
    if (!session) return;
    setStatusMessage('');
    setView('exam');
  };

  const submitSession = (autoSubmitted = false) => {
    setSession((current) => {
      if (!current || current.submitted) return current;
      return {
        ...current,
        submitted: true,
      };
    });

    if (autoSubmitted) {
      setStatusMessage((current) => current || 'The session was submitted automatically.');
    }

    setView('result');
  };

  const confirmSubmit = () => {
    if (!session) return;

    const unanswered = session.questions.filter((question) => session.responses[question.id] === undefined).length;
    if (unanswered > 0) {
      const shouldSubmit = window.confirm(
        `You still have ${unanswered} unanswered question(s). Blank questions carry -0.25 marks. Submit anyway?`,
      );
      if (!shouldSubmit) return;
    }

    submitSession();
  };

  const restartSession = () => {
    setSession(null);
    setStatusMessage('');
    setTimeLeft(0);
    setView('setup');
  };

  const updateSession = (updater: (current: SessionState) => SessionState) => {
    setSession((current) => {
      if (!current) return current;
      return updater(current);
    });
  };

  const currentQuestion = session ? session.questions[session.currentIndex] : null;
  const currentResponse = currentQuestion ? session?.responses[currentQuestion.id] : undefined;
  const modeMeta = MODE_META[selectedMode];
  const activeModeMeta = session ? MODE_META[session.mode] : modeMeta;
  const result = calculateResult(session);

  const selectOption = (option: AnswerKey) => {
    if (!session || !currentQuestion || session.submitted) return;

    updateSession((current) => ({
      ...current,
      responses: {
        ...current.responses,
        [currentQuestion.id]: option,
      },
      visited: current.visited.includes(currentQuestion.id)
        ? current.visited
        : [...current.visited, currentQuestion.id],
    }));
  };

  const navigateQuestion = (direction: number) => {
    if (!session) return;

    const nextIndex = session.currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= session.questions.length) return;

    const nextQuestionId = session.questions[nextIndex].id;

    updateSession((current) => ({
      ...current,
      currentIndex: nextIndex,
      visited: current.visited.includes(nextQuestionId) ? current.visited : [...current.visited, nextQuestionId],
    }));
  };

  const jumpToQuestion = (index: number) => {
    if (!session) return;

    const questionId = session.questions[index]?.id;
    if (!questionId) return;

    updateSession((current) => ({
      ...current,
      currentIndex: index,
      visited: current.visited.includes(questionId) ? current.visited : [...current.visited, questionId],
    }));
  };

  const clearResponse = () => {
    if (!session || !currentQuestion || session.submitted) return;

    updateSession((current) => {
      const nextResponses = { ...current.responses };
      delete nextResponses[currentQuestion.id];

      return {
        ...current,
        responses: nextResponses,
      };
    });
  };

  const toggleReviewMark = () => {
    if (!session || !currentQuestion || session.submitted) return;

    updateSession((current) => ({
      ...current,
      markedForReview: toggleId(current.markedForReview, currentQuestion.id),
    }));
  };

  const toggleBookmark = () => {
    if (!session || !currentQuestion) return;

    updateSession((current) => ({
      ...current,
      bookmarked: toggleId(current.bookmarked, currentQuestion.id),
    }));
  };

  const setReviewFilter = (filter: ReviewFilter) => {
    if (!session) return;

    updateSession((current) => ({
      ...current,
      reviewFilter: filter,
    }));
  };

  const renderPaletteState = (question: PracticeMcq) => {
    if (!session) return 's-none';

    const response = session.responses[question.id];
    const visited = session.visited.includes(question.id);
    const marked = session.markedForReview.includes(question.id);

    if (marked) return 's-review';
    if (response === undefined && !visited) return 's-none';
    if (response === undefined && visited) return 's-unanswered';
    if (response === 'E') return 's-na';
    return 's-answered';
  };

  const filteredReviewQuestions = session
    ? session.questions.filter((question) => {
        const response = session.responses[question.id];
        const isCorrect = response === question.correctAnswer;
        const isWrong = response !== undefined && response !== 'E' && response !== question.correctAnswer;
        const isNa = response === 'E';
        const isUnanswered = response === undefined;
        const isBookmarked = session.bookmarked.includes(question.id);

        switch (session.reviewFilter) {
          case 'correct':
            return isCorrect;
          case 'wrong':
            return isWrong;
          case 'na':
            return isNa;
          case 'unanswered':
            return isUnanswered;
          case 'bookmarked':
            return isBookmarked;
          default:
            return true;
        }
      })
    : [];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');

    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div className="space-y-6 pb-10">
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
              Next.js MCQ Workspace
            </div>
            <h2 className="text-2xl font-heading font-black text-white md:text-4xl">
              Practice exactly like the HTML exam flow, now inside your app
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
              Static MCQ data powers this screen for now, but your dashboard chrome still reads the real user profile from the app API.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">User</div>
              <div className="mt-1 text-sm font-bold text-white">{user?.name ?? 'Profile loading'}</div>
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
              <div className="mt-1 text-sm font-bold text-white">{PRACTICE_MCQ_BANK.length} MCQs</div>
            </div>
          </div>
        </div>
      </section>

      {statusMessage && (
        <div
          className="rounded-2xl border px-4 py-3 text-sm"
          style={{
            background: 'rgba(245,158,11,0.08)',
            borderColor: 'rgba(245,158,11,0.18)',
            color: '#fbbf24',
          }}
        >
          {statusMessage}
        </div>
      )}

      {view === 'setup' && (
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="glass-card rounded-[1.75rem] border border-white/5 p-6 md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-400">Session Setup</div>
                <h3 className="mt-2 text-2xl font-heading font-black text-white">Choose your MCQ mode</h3>
                <p className="mt-2 max-w-xl text-sm text-slate-400">
                  The layout below follows the old HTML flow: setup, instructions, question palette, results, and review.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-dark-bg/60 px-4 py-3 text-right">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Current preset</div>
                <div className="mt-1 text-sm font-bold text-white">{MODE_META[selectedMode].label}</div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {(['quick', 'full', 'mock'] as PracticeMode[]).map((mode) => {
                const meta = MODE_META[mode];
                const active = selectedMode === mode;

                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSelectedMode(mode)}
                    className={`rounded-[1.5rem] border p-5 text-left transition-all ${
                      active ? 'scale-[1.01]' : 'hover:-translate-y-1'
                    }`}
                    style={{
                      background: active
                        ? 'linear-gradient(145deg, rgba(99,102,241,0.14), rgba(20,29,46,0.98))'
                        : 'linear-gradient(145deg, rgba(20,29,46,0.92), rgba(11,15,26,0.98))',
                      borderColor: active ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.08)',
                      boxShadow: active ? '0 18px 40px rgba(99,102,241,0.12)' : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.accent} text-white shadow-lg`}
                      >
                        <i className={`fa-solid ${meta.icon}`}></i>
                      </div>
                      {active && <i className="fa-solid fa-circle-check text-brand-400"></i>}
                    </div>
                    <div className="mt-5 text-lg font-bold text-white">{meta.label}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{meta.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-wider">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
                        {meta.questionCount} Questions
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
                        {meta.timerMinutes ? `${meta.timerMinutes} Min Timer` : 'Untimed'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div>
                <div className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Subject</div>
                <select
                  value={selectedSubject}
                  onChange={(event) => setSelectedSubject(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-dark-bg/70 px-4 py-3 text-sm font-medium text-white outline-none transition-colors focus:border-brand-500/60"
                >
                  <option>All Subjects</option>
                  {PRACTICE_SUBJECTS.map((subject) => (
                    <option key={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Topic</div>
                <input
                  value={selectedTopic}
                  onChange={(event) => setSelectedTopic(event.target.value)}
                  placeholder="Optional topic filter"
                  className="w-full rounded-2xl border border-white/10 bg-dark-bg/70 px-4 py-3 text-sm font-medium text-white outline-none transition-colors placeholder:text-slate-500 focus:border-brand-500/60"
                />
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Difficulty</div>
              <div className="flex flex-wrap gap-3">
                {DEFAULT_DIFFICULTIES.map((difficulty) => {
                  const active = selectedDifficulties.includes(difficulty);

                  return (
                    <button
                      key={difficulty}
                      type="button"
                      onClick={() => {
                        if (selectedMode === 'full' && selectedDifficulties.length === DEFAULT_DIFFICULTIES.length) {
                          setSelectedDifficulties([difficulty]);
                          return;
                        }

                        if (active && selectedDifficulties.length === 1) return;

                        setSelectedDifficulties((current) =>
                          current.includes(difficulty)
                            ? current.filter((item) => item !== difficulty)
                            : [...current, difficulty],
                        );
                      }}
                      className="rounded-full border px-4 py-2 text-sm font-bold transition-all"
                      style={{
                        background: active ? 'rgba(99,102,241,0.14)' : 'rgba(255,255,255,0.03)',
                        borderColor: active ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.1)',
                        color: active ? '#c7d2fe' : '#94a3b8',
                      }}
                    >
                      {difficulty}
                    </button>
                  );
                })}
              </div>
            </div>

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
                  <div className="mt-1 text-base font-bold text-white">{selectedSubject}</div>
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
                <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Correct answer</span>
                  <span className="font-bold text-accent">+1.00</span>
                </li>
                <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Wrong answer</span>
                  <span className="font-bold text-danger">-0.25</span>
                </li>
                <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Option E selected</span>
                  <span className="font-bold text-sky-400">0.00</span>
                </li>
                <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Blank question</span>
                  <span className="font-bold text-warning">-0.25</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      )}

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
              Read these once before starting. The experience below mirrors the original HTML page but runs fully in the Next.js app.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-dark-bg/70 p-5">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Session Info</div>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>Mode</span>
                    <span className="font-bold text-white">{activeModeMeta.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Questions</span>
                    <span className="font-bold text-white">{session.questions.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Subject</span>
                    <span className="font-bold text-white">{session.subject}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Timer</span>
                    <span className="font-bold text-white">
                      {activeModeMeta.timerMinutes ? `${activeModeMeta.timerMinutes} minutes` : 'Not timed'}
                    </span>
                  </div>
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
                <span className="rounded-full border border-sky-400/25 bg-sky-500/10 px-3 py-2 text-sky-300">Not attempted</span>
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

      {view === 'exam' && session && currentQuestion && (
        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <section className="space-y-6">
            <div className="glass-card rounded-[1.75rem] border border-white/5 overflow-hidden">
              <div className="flex flex-wrap items-center gap-3 border-b border-white/5 px-5 py-4">
                <span className="text-sm font-bold text-white">
                  Question {session.currentIndex + 1} / {session.questions.length}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                  {currentQuestion.subject}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                  {currentQuestion.topic}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                  {currentQuestion.difficulty}
                </span>
                {session.markedForReview.includes(currentQuestion.id) && (
                  <span className="rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-300">
                    Review
                  </span>
                )}
                <div className="ml-auto flex items-center gap-3">
                  {session.mode === 'mock' && (
                    <div
                      className={`rounded-xl border px-3 py-2 text-sm font-bold ${
                        timeLeft <= 60
                          ? 'border-danger/30 bg-danger/10 text-danger'
                          : timeLeft <= 300
                            ? 'border-warning/30 bg-warning/10 text-warning'
                            : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                      }`}
                    >
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
                    <i className="fa-solid fa-bookmark mr-2"></i>
                    Save
                  </button>
                </div>
              </div>

              <div className="px-5 py-6 md:px-7">
                <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all"
                    style={{ width: `${((session.currentIndex + 1) / session.questions.length) * 100}%` }}
                  />
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-dark-bg/70 p-5 md:p-6">
                  <div className="text-lg font-semibold leading-8 text-white">{currentQuestion.question}</div>
                </div>

                <div className="mt-5 space-y-3">
                  {getOptionEntries(currentQuestion).map(([optionKey, label]) => {
                    const selected = currentResponse === optionKey;
                    const showAnswerState = session.submitted || (session.mode !== 'mock' && currentResponse !== undefined);
                    const correct = optionKey === currentQuestion.correctAnswer;
                    const wrongSelection = selected && optionKey !== currentQuestion.correctAnswer && optionKey !== 'E';

                    return (
                      <button
                        key={optionKey}
                        type="button"
                        onClick={() => selectOption(optionKey)}
                        className={`w-full rounded-[1.35rem] border px-4 py-4 text-left transition-all ${
                          selected ? 'scale-[1.01]' : 'hover:-translate-y-0.5'
                        }`}
                        style={{
                          background: showAnswerState && correct
                            ? 'rgba(16,185,129,0.12)'
                            : showAnswerState && wrongSelection
                              ? 'rgba(239,68,68,0.1)'
                              : selected && optionKey === 'E'
                                ? 'rgba(56,189,248,0.1)'
                                : selected
                                  ? 'rgba(99,102,241,0.12)'
                                  : 'rgba(20,29,46,0.82)',
                          borderColor: showAnswerState && correct
                            ? 'rgba(16,185,129,0.32)'
                            : showAnswerState && wrongSelection
                              ? 'rgba(239,68,68,0.3)'
                              : selected && optionKey === 'E'
                                ? 'rgba(56,189,248,0.28)'
                                : selected
                                  ? 'rgba(99,102,241,0.35)'
                                  : 'rgba(255,255,255,0.08)',
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-black"
                            style={{
                              background: selected ? 'rgba(99,102,241,0.16)' : 'rgba(255,255,255,0.04)',
                              borderColor: selected ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.08)',
                              color: selected ? '#c7d2fe' : '#94a3b8',
                            }}
                          >
                            {optionKey}
                          </div>
                          <div className="flex-1 text-sm leading-7 text-slate-200">{label}</div>
                          {showAnswerState && correct && <i className="fa-solid fa-circle-check text-accent"></i>}
                          {showAnswerState && wrongSelection && <i className="fa-solid fa-circle-xmark text-danger"></i>}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {session.mode !== 'mock' && currentResponse && (
                  <div className="mt-5 rounded-[1.5rem] border border-emerald-500/20 bg-emerald-500/8 p-5">
                    <div className="text-[11px] font-black uppercase tracking-[0.18em] text-accent">Explanation</div>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{currentQuestion.explanation}</p>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => navigateQuestion(-1)}
                    disabled={session.currentIndex === 0}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-300 disabled:opacity-40"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={toggleReviewMark}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-300"
                  >
                    Mark for Review
                  </button>
                  <button
                    type="button"
                    onClick={clearResponse}
                    className="rounded-xl border border-danger/20 bg-danger/10 px-4 py-2.5 text-sm font-bold text-danger"
                  >
                    Clear
                  </button>
                  <div className="flex-1"></div>
                  {session.currentIndex === session.questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={confirmSubmit}
                      className="rounded-xl bg-gradient-to-r from-danger to-red-500 px-5 py-2.5 text-sm font-black uppercase tracking-[0.16em] text-white"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigateQuestion(1)}
                      className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 px-5 py-2.5 text-sm font-black uppercase tracking-[0.16em] text-white"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="glass-card rounded-[1.75rem] border border-white/5 p-5">
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Question Palette</div>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {session.questions.map((question, index) => {
                  const paletteState = renderPaletteState(question);
                  const active = index === session.currentIndex;

                  const styleMap: Record<string, { background: string; borderColor: string; color: string }> = {
                    's-none': {
                      background: 'rgba(255,255,255,0.04)',
                      borderColor: 'rgba(255,255,255,0.08)',
                      color: '#94a3b8',
                    },
                    's-unanswered': {
                      background: 'rgba(239,68,68,0.1)',
                      borderColor: 'rgba(239,68,68,0.25)',
                      color: '#fca5a5',
                    },
                    's-na': {
                      background: 'rgba(56,189,248,0.12)',
                      borderColor: 'rgba(56,189,248,0.28)',
                      color: '#7dd3fc',
                    },
                    's-answered': {
                      background: 'rgba(16,185,129,0.12)',
                      borderColor: 'rgba(16,185,129,0.26)',
                      color: '#86efac',
                    },
                    's-review': {
                      background: 'rgba(139,92,246,0.12)',
                      borderColor: 'rgba(139,92,246,0.28)',
                      color: '#c4b5fd',
                    },
                  };

                  const paletteStyle = styleMap[paletteState];

                  return (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() => jumpToQuestion(index)}
                      className="aspect-square rounded-xl border text-xs font-black transition-transform hover:scale-105"
                      style={{
                        ...paletteStyle,
                        boxShadow: active ? '0 0 0 2px rgba(99,102,241,0.5)' : 'none',
                      }}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="glass-card rounded-[1.75rem] border border-white/5 p-5">
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Live Score</div>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Correct</span>
                  <span className="font-bold text-accent">{result.correct}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Wrong</span>
                  <span className="font-bold text-danger">{result.wrong}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Not attempted</span>
                  <span className="font-bold text-sky-400">{result.notAttempted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Unanswered</span>
                  <span className="font-bold text-warning">{result.unanswered}</span>
                </div>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-dark-bg/70 p-4">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Current score</div>
                <div className="mt-2 text-2xl font-black text-white">{result.finalScore.toFixed(2)}</div>
              </div>

              <button
                type="button"
                onClick={confirmSubmit}
                className="mt-5 w-full rounded-xl bg-gradient-to-r from-danger to-red-500 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white"
              >
                Submit Exam
              </button>
            </div>
          </aside>
        </div>
      )}

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
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-black text-white">{result.finalScore.toFixed(2)}</div>
                <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Score</div>
              </div>
              <div className="rounded-[1.5rem] border border-emerald-500/15 bg-emerald-500/8 p-4">
                <div className="text-2xl font-black text-accent">{result.correct}</div>
                <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Correct</div>
              </div>
              <div className="rounded-[1.5rem] border border-red-500/15 bg-red-500/8 p-4">
                <div className="text-2xl font-black text-danger">{result.wrong}</div>
                <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Wrong</div>
              </div>
              <div className="rounded-[1.5rem] border border-sky-500/15 bg-sky-500/8 p-4">
                <div className="text-2xl font-black text-sky-400">{result.notAttempted}</div>
                <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Option E</div>
              </div>
              <div className="rounded-[1.5rem] border border-amber-500/15 bg-amber-500/8 p-4">
                <div className="text-2xl font-black text-warning">{result.unanswered}</div>
                <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Blank</div>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-black text-white">{result.accuracy}%</div>
                <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Accuracy</div>
              </div>
            </div>
          </section>

          <section className="glass-card rounded-[1.75rem] border border-white/5 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Topic Analysis</div>
                <h4 className="mt-2 text-xl font-heading font-black text-white">Performance by topic</h4>
              </div>
              <button
                type="button"
                onClick={() => setView('review')}
                className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 px-5 py-2.5 text-sm font-black uppercase tracking-[0.16em] text-white"
              >
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
                    <div className="text-sm font-bold text-white">
                      {item.correct}/{item.total}
                    </div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full ${
                        item.percentage >= 70
                          ? 'bg-accent'
                          : item.percentage >= 40
                            ? 'bg-warning'
                            : 'bg-danger'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={restartSession}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-300"
              >
                New Session
              </button>
              <button
                type="button"
                onClick={() => setView('review')}
                className="rounded-xl border border-brand-500/20 bg-brand-500/10 px-5 py-3 text-sm font-bold text-brand-300"
              >
                Open Review
              </button>
            </div>
          </section>
        </div>
      )}

      {view === 'review' && session && (
        <div className="mx-auto max-w-5xl space-y-6">
          <section className="glass-card rounded-[1.75rem] border border-white/5 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Answer Review</div>
                <h3 className="mt-2 text-2xl font-heading font-black text-white">Review every response</h3>
              </div>
              <button
                type="button"
                onClick={() => setView('result')}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300"
              >
                Back to Results
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {([
                ['all', 'All'],
                ['correct', 'Correct'],
                ['wrong', 'Wrong'],
                ['na', 'Not Attempted'],
                ['unanswered', 'Blank'],
                ['bookmarked', 'Bookmarked'],
              ] as Array<[ReviewFilter, string]>).map(([filter, label]) => {
                const active = session.reviewFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setReviewFilter(filter)}
                    className="rounded-full border px-4 py-2 text-sm font-bold transition-all"
                    style={{
                      background: active ? 'rgba(99,102,241,0.14)' : 'rgba(255,255,255,0.04)',
                      borderColor: active ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.1)',
                      color: active ? '#c7d2fe' : '#94a3b8',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-4">
              {filteredReviewQuestions.map((question, index) => {
                const response = session.responses[question.id];
                const isCorrect = response === question.correctAnswer;
                const isWrong = response !== undefined && response !== 'E' && response !== question.correctAnswer;
                const isNa = response === 'E';
                const isUnanswered = response === undefined;

                return (
                  <article
                    key={question.id}
                    className="rounded-[1.5rem] border border-white/10 bg-dark-bg/70 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-slate-400">Q{index + 1}</div>
                        <div className="mt-2 text-base font-semibold leading-7 text-white">{question.question}</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {isCorrect && (
                          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-accent">
                            Correct
                          </span>
                        )}
                        {isWrong && (
                          <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-bold text-danger">
                            Wrong
                          </span>
                        )}
                        {isNa && (
                          <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-400">
                            Not Attempted
                          </span>
                        )}
                        {isUnanswered && (
                          <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-bold text-warning">
                            Blank
                          </span>
                        )}
                        {session.bookmarked.includes(question.id) && (
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                            Bookmarked
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3">
                      {getOptionEntries(question).map(([optionKey, label]) => {
                        const selected = response === optionKey;
                        const correct = optionKey === question.correctAnswer;

                        return (
                          <div
                            key={optionKey}
                            className="rounded-xl border px-4 py-3 text-sm"
                            style={{
                              background: correct
                                ? 'rgba(16,185,129,0.1)'
                                : selected
                                  ? 'rgba(239,68,68,0.1)'
                                  : 'rgba(255,255,255,0.03)',
                              borderColor: correct
                                ? 'rgba(16,185,129,0.2)'
                                : selected
                                  ? 'rgba(239,68,68,0.22)'
                                  : 'rgba(255,255,255,0.08)',
                            }}
                          >
                            <span className="font-black text-slate-400">{optionKey}</span>
                            <span className="ml-3 text-slate-200">{label}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5 rounded-xl border border-emerald-500/15 bg-emerald-500/8 p-4">
                      <div className="text-[11px] font-black uppercase tracking-[0.18em] text-accent">Explanation</div>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{question.explanation}</p>
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
