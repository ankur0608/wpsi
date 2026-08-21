import { getLiveExamReview } from "@/app/actions/live-exam";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const result = await getLiveExamReview(id);

  if (result.error) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-10 bg-white rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Cannot Review Exam</h1>
        <p className="text-gray-600 mb-6">{result.error}</p>
        <Link 
            href={`/live-exams/${id}/leaderboard`}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
            Back to Leaderboard
        </Link>
      </div>
    );
  }

  const { participant, questions } = result.data as any;
  const userAnswers = participant.answers || {};

  return (
    <div className="max-w-4xl mx-auto mt-10 pb-20 px-4">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Exam Review</h1>
            <p className="text-gray-500 mt-1">Review your answers and see the correct solutions.</p>
        </div>
        <div className="text-right">
            <div className="text-sm text-gray-500 uppercase font-semibold tracking-wider">Your Score</div>
            <div className="text-3xl font-bold text-blue-600">{participant.score} <span className="text-xl text-gray-400">/ {participant.totalMarks}</span></div>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q: any, index: number) => {
          const userAnswer = userAnswers[q.id];
          const isCorrect = userAnswer === q.correctAnswer;
          const isUnanswered = !userAnswer;

          return (
            <div key={q.id} className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${isCorrect ? 'border-l-green-500' : isUnanswered ? 'border-l-gray-300' : 'border-l-red-500'}`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium pr-8">
                  <span className="text-gray-500 mr-2">{index + 1}.</span> 
                  {q.question}
                </h3>
                {isCorrect ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0"><CheckCircle size={14}/> Correct</span>
                ) : isUnanswered ? (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold shrink-0">Unanswered</span>
                ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0"><XCircle size={14}/> Incorrect</span>
                )}
              </div>
              
              <div className="space-y-3">
                {['A', 'B', 'C', 'D'].map((opt) => {
                   const optionText = q[`option${opt}`];
                   const isSelected = userAnswer === opt;
                   const isActuallyCorrect = q.correctAnswer === opt;
                   
                   let optionClass = "border-gray-200 bg-gray-50";
                   if (isActuallyCorrect) {
                       optionClass = "border-green-500 bg-green-50 text-green-800 font-medium";
                   } else if (isSelected && !isActuallyCorrect) {
                       optionClass = "border-red-500 bg-red-50 text-red-800";
                   }
                   
                   return (
                      <div 
                          key={opt} 
                          className={`flex justify-between items-center p-3 border rounded-lg ${optionClass}`}
                      >
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-bold ${isActuallyCorrect ? 'bg-green-500 text-white' : isSelected ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                {opt}
                            </div>
                            <span>{optionText}</span>
                          </div>
                          
                          {isActuallyCorrect && <CheckCircle size={18} className="text-green-500" />}
                          {isSelected && !isActuallyCorrect && <XCircle size={18} className="text-red-500" />}
                      </div>
                   )
                })}
              </div>
              
              {q.explanation && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
                      <span className="font-bold">Explanation:</span> {q.explanation}
                  </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 text-center">
          <Link 
            href={`/live-exams/${id}/leaderboard`}
            className="inline-block bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition shadow-sm"
          >
            Back to Leaderboard
          </Link>
      </div>
    </div>
  );
}
