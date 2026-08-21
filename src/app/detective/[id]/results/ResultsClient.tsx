"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, Users, MessageCircle, AlertTriangle, Medal, Clock, Target, X, Flag, ArrowLeft } from "lucide-react";
import LiveExamChat from "@/components/LiveExamChat";

interface ResultsClientProps {
  challengeId: string;
  challengeTitle: string;
  score: number;
  totalMarks: number;
  xpEarned: number;
  stats: {
    accuracy: number;
    correctCount: number;
    wrongCount: number;
    notAttempted: number;
    timeTakenStr: string;
  };
  questions: any[];
  userAnswers: Record<string, string>;
  currentUser: { id: string; name: string; image: string | null };
  leaderboard: {
    rank: number;
    userId: string;
    name: string;
    image: string | null;
    xp: number;
    xpEarned: number;
    score: number;
    timeTakenStr: string;
    isCurrentUser: boolean;
  }[];
  subjectAnalysis: {
    subjectName: string;
    total: number;
    correct: number;
    wrong: number;
    notAttempted: number;
  }[];
  totalParticipants: number;
}

export default function ResultsClient({ 
  challengeId, 
  challengeTitle, 
  score, 
  totalMarks, 
  xpEarned, 
  stats, 
  questions, 
  userAnswers,
  currentUser,
  leaderboard,
  subjectAnalysis,
  totalParticipants
}: ResultsClientProps) {
  const [activeTab, setActiveTab] = useState("review");
  const [reportQuestion, setReportQuestion] = useState<{id: string, index: number} | null>(null);
  const [reportType, setReportType] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [chatQuestionId, setChatQuestionId] = useState<string | null>(null);

  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportQuestion || !reportType) return;
    
    setIsSubmittingReport(true);
    try {
      const res = await fetch(`/api/detective/challenges/${challengeId}/dispute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mcqId: reportQuestion.id,
          suggestedKey: reportType,
          reason: reportReason
        }),
      });
      
      if (!res.ok) throw new Error("Failed to submit");
      
      alert("Report submitted successfully for question " + reportQuestion.index);
      setReportQuestion(null);
      setReportType("");
      setReportReason("");
    } catch (err) {
      alert("Failed to submit report. Please try again.");
    } finally {
      setIsSubmittingReport(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <Link href="/detective" className="p-2 bg-white hover:bg-gray-100 text-gray-600 rounded-lg border border-gray-200 transition-colors shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" /> Challenge Completed
          </h2>
        </div>
        <Link 
          href={`/detective/${challengeId}/community`}
          className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 px-4 rounded-lg text-sm transition-colors flex items-center gap-2"
        >
          <Users className="w-4 h-4 fill-current" /> Join Group Chat
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Big Score Card */}
        <div className="md:col-span-1 bg-blue-600 text-white rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <p className="text-blue-100 font-medium uppercase tracking-wider text-sm mb-2 relative z-10">Total Score</p>
          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-6xl font-bold tracking-tight">{score}</span>
            <span className="text-2xl text-blue-200 font-medium">/ {totalMarks}</span>
          </div>
          <div className="mt-6 bg-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm relative z-10 border border-white/20 text-sm font-semibold flex items-center gap-2">
            <Medal className="w-4 h-4 text-yellow-300" /> +{xpEarned} XP Earned
          </div>
        </div>

        {/* Stats Grid */}
        <div className="md:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col justify-center">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Accuracy</p>
            <p className="text-2xl font-bold text-gray-800">{stats.accuracy}%</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col justify-center">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Correct</p>
            <p className="text-2xl font-bold text-green-600">{stats.correctCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col justify-center">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Wrong</p>
            <p className="text-2xl font-bold text-red-600">{stats.wrongCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col justify-center">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Time Taken</p>
            <p className="text-2xl font-bold text-gray-800">{stats.timeTakenStr}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 flex overflow-x-auto hide-scrollbar">
        <button 
          onClick={() => setActiveTab("review")}
          className={`px-6 py-3 font-semibold whitespace-nowrap ${activeTab === "review" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
        >
          Questions Review
        </button>
        <button 
          onClick={() => setActiveTab("analysis")}
          className={`px-6 py-3 font-semibold whitespace-nowrap ${activeTab === "analysis" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
        >
          Subject Analysis
        </button>
        <button 
          onClick={() => setActiveTab("leaderboard")}
          className={`px-6 py-3 font-semibold whitespace-nowrap ${activeTab === "leaderboard" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
        >
          Leaderboard
        </button>
      </div>

      {/* Questions List */}
      {activeTab === "review" && (
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const ua = userAnswers[q.id];
          const isCorrect = ua === q.correctAnswer;
          const isAttempted = !!ua;

          return (
            <div key={q.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 md:p-6">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="bg-gray-100 text-gray-600 font-bold px-2.5 py-1 rounded">Q{idx + 1}</span>
                  <div className="flex gap-2">
                    {!isAttempted ? (
                      <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded border border-gray-200">
                        Not Attempted
                      </span>
                    ) : isCorrect ? (
                      <span className="flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded border border-green-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 bg-red-50 text-red-700 text-xs font-semibold px-2 py-1 rounded border border-red-200">
                        <XCircle className="w-3.5 h-3.5" /> Wrong
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button 
                    onClick={() => setChatQuestionId(q.id)}
                    className="flex-1 md:flex-none bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium py-1.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 text-blue-500" /> Discuss
                  </button>
                  <button 
                    onClick={() => setReportQuestion({ id: q.id, index: idx + 1 })}
                    className="flex-1 md:flex-none bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200"
                  >
                    <AlertTriangle className="w-4 h-4" /> Report
                  </button>
                </div>
              </div>
              
              <p className="text-lg text-gray-800 font-medium mb-4">{q.question}</p>
              
              {q.imageUrl && (
                <div className="mb-4">
                  <img src={q.imageUrl} alt="Question" className="max-h-48 rounded object-contain border border-gray-200" />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-3 mt-4">
                {[
                  { key: 'A', text: q.optionA },
                  { key: 'B', text: q.optionB },
                  { key: 'C', text: q.optionC },
                  { key: 'D', text: q.optionD },
                ].map((opt) => {
                  if (!opt.text) return null;
                  
                  const isUserSelection = ua === opt.key;
                  const isCorrectOption = q.correctAnswer === opt.key;
                  
                  let bgClass = "bg-gray-50 border-gray-200";
                  let textClass = "text-gray-700";
                  let icon = null;
                  
                  if (isCorrectOption) {
                    bgClass = "bg-green-50 border-green-200";
                    textClass = "text-green-800 font-medium";
                    icon = <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />;
                  } else if (isUserSelection && !isCorrectOption) {
                    bgClass = "bg-red-50 border-red-200";
                    textClass = "text-red-800 font-medium";
                    icon = <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />;
                  } else if (!isCorrectOption && !isUserSelection) {
                    // Default style
                  }

                  return (
                    <div key={opt.key} className={`border rounded-xl p-3.5 flex items-center gap-3 transition-colors ${bgClass}`}>
                      <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border ${
                        isCorrectOption ? 'border-green-400 bg-green-100 text-green-700' : 
                        isUserSelection ? 'border-red-400 bg-red-100 text-red-700' : 
                        'border-gray-300 bg-white text-gray-500'
                      }`}>
                        {opt.key}
                      </span>
                      <div className={`flex-1 text-sm ${textClass}`}>
                        {opt.text}
                      </div>
                      {icon}
                    </div>
                  );
                })}
              </div>

              {!isAttempted && (
                <div className="mt-3 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2 font-medium">
                  <AlertTriangle className="w-4 h-4" /> You did not attempt this question.
                </div>
              )}

              {q.explanation && (
                <div className="mt-5 rounded-xl border border-emerald-500/15 bg-emerald-500/8 p-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600">Explanation</div>
                  <div className="flex flex-col gap-2 mt-2">
                    <p className="text-sm leading-7 text-gray-700">{q.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      )}

      {/* Subject Analysis */}
      {activeTab === "analysis" && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 text-sm font-semibold">
                <th className="pb-3 px-4">Subject</th>
                <th className="pb-3 px-4">Total Qs</th>
                <th className="pb-3 px-4">Attempted</th>
                <th className="pb-3 px-4">Correct</th>
                <th className="pb-3 px-4">Wrong</th>
                <th className="pb-3 px-4">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {subjectAnalysis.map((s, i) => {
                const attempted = s.correct + s.wrong;
                const accuracy = attempted > 0 ? Math.round((s.correct / attempted) * 100) : 0;
                return (
                  <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-800">{s.subjectName}</td>
                    <td className="py-4 px-4 text-gray-600">{s.total}</td>
                    <td className="py-4 px-4 text-gray-600">{attempted}</td>
                    <td className="py-4 px-4 text-green-600 font-semibold">{s.correct}</td>
                    <td className="py-4 px-4 text-red-600 font-semibold">{s.wrong}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-10 text-right text-sm font-medium">{accuracy}%</span>
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${accuracy}%` }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === "leaderboard" && (
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Header Summary */}
          <div className="flex items-center justify-between bg-white p-4 md:px-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
             <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
               <Medal className="w-5 h-5 text-yellow-500" /> Leaderboard Rankings
             </h3>
             <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">{leaderboard.length} Participants</span>
          </div>

          <div className="flex flex-col gap-3">
            {leaderboard.map((entry) => (
              <div 
                key={entry.userId}
                className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 md:p-5 rounded-2xl border ${
                  entry.isCurrentUser 
                    ? 'border-blue-400 bg-blue-50/40 shadow-[0_0_15px_rgba(59,130,246,0.12)] relative overflow-hidden' 
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                } transition-all duration-300`}
              >
                {/* Left: Rank & User */}
                <div className="flex items-center gap-4 flex-1">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 flex justify-center">
                    {entry.rank === 1 ? (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-yellow-500/30">1</div>
                    ) : entry.rank === 2 ? (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-gray-400/30">2</div>
                    ) : entry.rank === 3 ? (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-amber-600/30">3</div>
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gray-100 text-gray-600 font-bold text-lg flex items-center justify-center">{entry.rank}</div>
                    )}
                  </div>

                  {/* Profile */}
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white shadow-sm overflow-hidden bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl shrink-0">
                      {entry.image ? (
                        <img src={entry.image} alt={entry.name} className="w-full h-full object-cover" />
                      ) : (
                        entry.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-base md:text-lg leading-tight ${entry.isCurrentUser ? 'text-blue-800' : 'text-gray-900'}`}>
                          {entry.name}
                        </span>
                        {entry.isCurrentUser && (
                          <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">You</span>
                        )}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500 font-medium mt-1">Total XP: <span className="text-gray-700">{entry.xp}</span></div>
                    </div>
                  </div>
                </div>

                {/* Right: Stats */}
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-gray-100 w-full sm:w-auto">
                  
                  {/* Score */}
                  <div className="flex flex-col items-center sm:items-end flex-1 sm:flex-none">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Score</span>
                    <span className="font-black text-xl md:text-2xl text-gray-800 leading-none">{entry.score}</span>
                  </div>

                  {/* XP Earned */}
                  <div className="flex flex-col items-center sm:items-end flex-1 sm:flex-none">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Earned</span>
                    <div className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded text-sm md:text-base font-bold border border-yellow-200 shadow-sm">
                      <Medal className="w-4 h-4 fill-yellow-400 text-yellow-600" />
                      +{entry.xpEarned}
                    </div>
                  </div>

                  {/* Time Taken */}
                  <div className="flex flex-col items-center sm:items-end flex-1 sm:flex-none">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Time</span>
                    <div className="inline-flex items-center justify-center gap-1.5 text-gray-700 font-bold text-sm md:text-base whitespace-nowrap bg-gray-50 px-2.5 py-0.5 rounded border border-gray-200">
                      <Clock className="w-4 h-4 text-gray-500" /> 
                      {entry.timeTakenStr}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setReportQuestion(null)}>
          <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-white relative">
              <div>
                <h3 className="font-bold text-gray-900 flex items-center gap-3 text-lg mb-1">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                    <Flag className="w-4 h-4 text-red-500 fill-red-500" />
                  </div>
                  Flag a Dispute
                </h3>
                <p className="text-gray-500 text-sm font-medium">Reporting Question {reportQuestion.index}</p>
              </div>
              <button onClick={() => setReportQuestion(null)} className="text-gray-400 hover:text-gray-600 bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleReportSubmit} className="flex flex-col bg-white">
              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Section 1 */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs">1</span>
                    What is the issue with this question? <span className="text-red-500">*</span>
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { id: "wrong_answer", title: "Wrong Answer Key", desc: "The official answer is factually incorrect." },
                      { id: "ambiguous", title: "Ambiguous / Multiple Correct", desc: "More than one option is correct." },
                      { id: "out_of_syllabus", title: "Out of Syllabus", desc: "Topic is not relevant to the exam." },
                      { id: "typo", title: "Typo / Translation Error", desc: "Formatting or spelling makes it unsolvable." }
                    ].map(opt => (
                      <label 
                        key={opt.id}
                        className={`flex gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                          reportType === opt.id 
                            ? "border-blue-500 bg-blue-50/30" 
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <div className="pt-0.5">
                          <input 
                            type="radio" 
                            name="reportType" 
                            value={opt.id} 
                            checked={reportType === opt.id}
                            onChange={() => setReportType(opt.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <div className={`text-sm font-bold mb-0.5 ${reportType === opt.id ? "text-gray-900" : "text-gray-800"}`}>
                            {opt.title}
                          </div>
                          <div className="text-xs text-gray-500">{opt.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Section 2 */}
                <div className="bg-gray-50/50 p-5 rounded-xl border border-gray-100">
                  <h4 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs">2</span>
                    What is the correct solution?
                  </h4>
                  <p className="text-xs text-gray-500 mb-4 ml-7">Help the community by providing the right answer and reasoning.</p>
                  
                  <div className="ml-7">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Suggested Answer
                    </label>
                    <textarea 
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] bg-white resize-none shadow-sm"
                      placeholder="Explain your reasoning here..."
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.02)] relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 w-full sm:w-auto">
                  <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">i</div>
                  False or spam reports may result in XP deduction.
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                    type="button" 
                    onClick={() => setReportQuestion(null)} 
                    className="flex-1 sm:flex-none px-6 py-2.5 font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmittingReport}
                    className="flex-1 sm:flex-none px-6 py-2.5 font-bold text-white bg-[#e11d48] hover:bg-[#be123c] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    {isSubmittingReport ? "Submitting..." : (
                      <>Submit Dispute <span className="text-white/80 text-xs">+15 XP</span></>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Right Sidebar Chat Drawer */}
      {chatQuestionId && (() => {
        const q = questions.find(q => q.id === chatQuestionId);
        const qIndex = questions.findIndex(q => q.id === chatQuestionId) + 1;
        
        return (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm" onClick={() => setChatQuestionId(null)}>
            <div 
              className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300" 
              onClick={e => e.stopPropagation()}
            >
              <div className="p-5 border-b border-gray-100 flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                    <MessageCircle className="w-5 h-5 text-blue-600 fill-blue-600" /> Q{qIndex} Discussion
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{totalParticipants} students here</p>
                </div>
                <button onClick={() => setChatQuestionId(null)} className="text-gray-400 hover:text-gray-600 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {q && (
                <div className="p-5 border-b border-gray-100 bg-gray-50">
                  <p className="text-gray-800 font-medium text-sm mb-3">{q.question}</p>
                  <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-2.5 py-1 rounded border border-green-200">
                    Official: {q.correctAnswer}. {q[`option${q.correctAnswer}` as keyof typeof q]}
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-hidden bg-white">
                <LiveExamChat 
                  liveExamId={`${challengeId}_${chatQuestionId}`} 
                  currentUser={currentUser} 
                />
              </div>
            </div>
          </div>
        );
      })()}

      {/* Floating Live Chat Button */}
      <Link 
        href={`/detective/${challengeId}/community`}
        className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-[0_8px_30px_rgb(59,130,246,0.3)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.5)] transition-all duration-300 rounded-full pl-4 pr-6 py-3.5 flex items-center gap-3 group hover:-translate-y-1"
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-6 h-6 fill-white drop-shadow-md" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-indigo-600 animate-pulse"></span>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-bold text-sm tracking-wide leading-tight">Live Chat</span>
          <span className="text-[10px] text-blue-100 font-medium leading-none mt-0.5">{totalParticipants > 0 ? `${totalParticipants} Online` : 'Join now'}</span>
        </div>
      </Link>
    </div>
  );
}
