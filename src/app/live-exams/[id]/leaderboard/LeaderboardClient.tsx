"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LiveExamChat from "@/components/LiveExamChat";

interface LeaderboardClientProps {
  liveExamId: string;
  result: any;
  currentUser: any;
  isParticipant: boolean;
}

export default function LeaderboardClient({ liveExamId, result, currentUser, isParticipant }: LeaderboardClientProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isAvailable, setIsAvailable] = useState<boolean>(!result.error || result.error !== "Leaderboard not available yet");

  useEffect(() => {
    if (result.error === "Leaderboard not available yet" && result.availableAt) {
      const target = new Date(result.availableAt).getTime();
      
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        
        if (diff <= 0) {
          clearInterval(timer);
          setIsAvailable(true);
          // Reload the page to fetch the actual leaderboard data
          router.refresh(); 
        } else {
          setTimeLeft(diff);
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [result, router]);

  const formatTime = (ms: number) => {
    const s = Math.floor((ms / 1000) % 60);
    const m = Math.floor((ms / (1000 * 60)) % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (result.error && result.error !== "Leaderboard not available yet") {
    return <div className="p-8 text-center text-red-500">{result.error}</div>;
  }

  const participants = result.data || [];

  return (
    <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 pb-20 px-4">
      
      {/* Leaderboard Section */}
      <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">Exam Leaderboard</h2>
          {isParticipant && (
             <button 
                onClick={() => router.push(`/live-exams/${liveExamId}/review`)}
                className="text-sm bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-200 transition"
             >
                Review My Exam
             </button>
          )}
        </div>
        
        {!isAvailable ? (
            <div className="p-16 text-center">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Calculating Results...</h3>
                <p className="text-gray-500 mb-6">The leaderboard will be revealed in:</p>
                <div className="text-5xl font-mono text-blue-600 font-bold mb-6">
                {formatTime(timeLeft)}
                </div>
                <p className="text-sm text-gray-400">Chat with other detectives while you wait!</p>
            </div>
        ) : (
            <div className="divide-y">
            {participants.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No participants found.</div>
            ) : (
                participants.map((p: any, index: number) => (
                <div key={p.id} className={`flex items-center p-4 ${p.user?.id === currentUser?.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                    <div className="w-10 text-center font-bold text-gray-500 text-lg">
                    #{index + 1}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 mx-4">
                    {p.user?.image ? (
                        <img src={p.user.image} alt="User" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">
                        {p.user?.name?.charAt(0) || '?'}
                        </div>
                    )}
                    </div>
                    <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{p.user?.name || 'Anonymous'}</h3>
                    <div className="text-sm text-gray-500">Submitted at {new Date(p.submittedAt).toLocaleTimeString()}</div>
                    </div>
                    <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{p.score}</div>
                    <div className="text-xs text-gray-500">/ {p.totalMarks} Points</div>
                    </div>
                </div>
                ))
            )}
            </div>
        )}
      </div>

      {/* Chat Section */}
      <div className="md:col-span-1">
        {isParticipant && currentUser ? (
          <div className="sticky top-4">
            <LiveExamChat liveExamId={liveExamId} currentUser={currentUser} />
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200 text-gray-500">
            <h3 className="font-semibold mb-2">Live Chat Locked</h3>
            <p className="text-sm">Only participants of this exam can join the discussion.</p>
          </div>
        )}
      </div>

    </div>
  );
}
