"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Users, Gift, CheckCircle, ScrollText, AlertTriangle, ArrowRight } from "lucide-react";

interface ChallengeDetailsClientProps {
  challenge: {
    id: string;
    title: string;
    durationMinutes: number;
    questionsCount: number;
    marks: number;
    endDate: Date | null;
    participantsCount: number;
    hasAttempted: boolean;
  };
}

export default function ChallengeDetailsClient({ challenge }: ChallengeDetailsClientProps) {
  const router = useRouter();

  const startExamFlow = () => {
    if (challenge.hasAttempted) {
      router.push(`/detective/${challenge.id}/results`);
    } else {
      router.push(`/detective/${challenge.id}/exam`);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full bg-gray-50 min-h-screen">
      <Link href="/detective" className="text-gray-500 hover:text-gray-800 text-sm font-medium mb-6 flex items-center gap-1 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Challenges
      </Link>
      
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-blue-600 p-6 md:p-8 text-white relative">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">General</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-white bg-red-500 px-3 py-1 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span> LIVE
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 relative z-10">{challenge.title}</h1>
          <p className="text-blue-100 mb-6 max-w-xl relative z-10">Test your preparation under exam conditions. Verify questionable MCQs after submission and help the community.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
              <p className="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">Questions</p>
              <p className="text-xl font-bold">{challenge.questionsCount}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
              <p className="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">Marks</p>
              <p className="text-xl font-bold">{challenge.marks}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
              <p className="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">Duration</p>
              <p className="text-xl font-bold text-yellow-300">{challenge.durationMinutes} Min</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
              <p className="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">Participants</p>
              <p className="text-xl font-bold flex items-center gap-1"><Users className="w-5 h-5 fill-current" /> {challenge.participantsCount}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          {challenge.hasAttempted && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 flex gap-4">
              <div className="text-green-500 mt-0.5 text-xl"><CheckCircle className="fill-current w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-green-800 mb-1">Challenge Completed!</h4>
                <p className="text-sm text-green-700 leading-relaxed">
                  You have already completed this challenge. You can review your results, check the leaderboard, and participate in community discussions.
                </p>
              </div>
            </div>
          )}

          {!challenge.hasAttempted && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-8 flex gap-4">
              <div className="text-orange-500 mt-0.5 text-xl"><AlertTriangle className="fill-current w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-orange-800 mb-1">Challenge Availability vs. Test Time</h4>
                <p className="text-sm text-orange-700 leading-relaxed">
                  This challenge is available until <strong>{challenge.endDate ? new Date(challenge.endDate).toLocaleString() : 'Indefinitely'}</strong>. However, once you click start, you will only have exactly <strong>{challenge.durationMinutes} minutes</strong> to complete the exam. You cannot pause the timer.
                </p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2"><Gift className="w-5 h-5 text-blue-500 fill-current" /> What You'll Get</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> <span className="text-gray-600 text-sm">Instant automated result & ranking</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> <span className="text-gray-600 text-sm">Question-wise accuracy analysis</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> <span className="text-gray-600 text-sm">Access to community question discussion</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> <span className="text-gray-600 text-sm">Entry into the private participant group chat</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> <span className="text-gray-600 text-sm">Opportunity to earn Detective XP</span></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2"><ScrollText className="w-5 h-5 text-gray-500" /> Rules</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">1</span> <span className="text-gray-600 text-sm">Strictly <strong>one attempt</strong> permitted.</span></li>
                <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">2</span> <span className="text-gray-600 text-sm">Exam auto-submits when {challenge.durationMinutes} minutes expire.</span></li>
                <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">3</span> <span className="text-gray-600 text-sm">Do not refresh the page during the exam.</span></li>
                <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">4</span> <span className="text-gray-600 text-sm">Reporting MCQs requires valid reference evidence.</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 flex justify-end">
            <button onClick={startExamFlow} className={`${challenge.hasAttempted ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-lg w-full md:w-auto justify-center`}>
              {challenge.hasAttempted ? "View Results" : "Start Challenge Now"} <ArrowRight className="w-5 h-5 font-bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
