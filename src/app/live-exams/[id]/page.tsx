"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getLiveExamDetails, joinLiveExam, submitLiveExam } from "@/app/actions/live-exam";

export default function LiveExamPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [hasJoined, setHasJoined] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<{ start: number, end: number }>({ start: 0, end: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      const res = await getLiveExamDetails(id);
      if (res.error) {
        setError(res.error);
      } else {
        setExam(res.data);
      }
      setLoading(false);
    };
    fetchExam();
  }, [id]);

  useEffect(() => {
    if (!exam) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const startTime = new Date(exam.startTime).getTime();
      const endTime = new Date(exam.endTime).getTime();

      setTimeLeft({
        start: Math.max(0, startTime - now),
        end: Math.max(0, endTime - now),
      });

      // Auto submit if joined and time ended
      if (hasJoined && endTime <= now && !isSubmitting) {
        handleSubmit();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [exam, hasJoined, isSubmitting, answers]);

  const handleJoin = async () => {
    const res = await joinLiveExam(id);
    if (res.error) {
      alert(res.error);
    } else {
      setHasJoined(true);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const res = await submitLiveExam(id, answers);
    if (res.error) {
        if(res.error === "Already submitted") {
             router.push(`/live-exams/${id}/leaderboard`);
        } else {
             alert(res.error);
             setIsSubmitting(false);
        }
    } else {
      router.push(`/live-exams/${id}/leaderboard`);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!exam) return null;

  const formatTime = (ms: number) => {
    const s = Math.floor((ms / 1000) % 60);
    const m = Math.floor((ms / (1000 * 60)) % 60);
    const h = Math.floor((ms / (1000 * 60 * 60)) % 24);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!hasJoined) {
    const canJoin = timeLeft.start === 0 && timeLeft.end > 0;
    
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">{exam.title}</h1>
        <p className="text-gray-600 mb-8">{exam.description}</p>

        {timeLeft.start > 0 ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Starts In</h2>
            <div className="text-4xl font-mono text-blue-600 font-bold">{formatTime(timeLeft.start)}</div>
          </div>
        ) : timeLeft.end > 0 ? (
          <div>
             <h2 className="text-xl font-semibold text-green-600 mb-2">Exam is Live!</h2>
             <button 
                onClick={handleJoin}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
             >
                Join Exam Now
             </button>
          </div>
        ) : (
          <div>
             <h2 className="text-xl font-semibold text-red-600 mb-2">Exam has Ended</h2>
             <button 
                onClick={() => router.push(`/live-exams/${id}/leaderboard`)}
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
             >
                View Leaderboard
             </button>
          </div>
        )}
      </div>
    );
  }

  // Exam Taking UI
  const questions = exam.mockTest?.questions || [];

  return (
    <div className="max-w-4xl mx-auto mt-6 pb-20">
      <div className="bg-white p-4 rounded-xl shadow-sm sticky top-4 z-10 flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold truncate pr-4">{exam.title}</h1>
        <div className="text-right flex items-center gap-4">
            <div className="text-sm text-gray-500">Time Remaining</div>
            <div className={`text-xl font-mono font-bold ${timeLeft.end < 300000 ? 'text-red-600' : 'text-blue-600'}`}>
            {formatTime(timeLeft.end)}
            </div>
            <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
            >
                {isSubmitting ? 'Submitting...' : 'Submit Exam'}
            </button>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q: any, index: number) => (
          <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium mb-4">
               <span className="text-gray-500 mr-2">{index + 1}.</span> 
               {q.question}
            </h3>
            
            <div className="space-y-3">
              {['A', 'B', 'C', 'D'].map((opt) => {
                 const optionText = q[`option${opt}`];
                 const isSelected = answers[q.id] === opt;
                 
                 return (
                    <label 
                        key={opt} 
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                        <input 
                            type="radio" 
                            name={`q-${q.id}`} 
                            value={opt}
                            checked={isSelected}
                            onChange={() => setAnswers(prev => ({...prev, [q.id]: opt}))}
                            className="mr-3 w-4 h-4 text-blue-600"
                        />
                        <span>{optionText}</span>
                    </label>
                 )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
