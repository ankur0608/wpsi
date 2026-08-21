"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Users, ArrowRight, TrendingUp, Trophy, CheckCircle2, Search, Medal, ShieldAlert, Calendar } from "lucide-react";

interface DetectiveDashboardClientProps {
  active: any[];
  upcoming: any[];
  past: any[];
  activity: any;
  topDetectivesAllTime: any[];
  topDetectivesThisWeek: any[];
  currentUser: any;
}

export default function DetectiveDashboardClient({ 
  active, 
  upcoming, 
  past, 
  activity, 
  topDetectivesAllTime,
  topDetectivesThisWeek,
  currentUser
}: DetectiveDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"Active" | "Upcoming" | "Past">("Active");
  const [leaderboardTab, setLeaderboardTab] = useState<"This Week" | "All Time">("This Week");
  
  const currentLeaderboard = leaderboardTab === "This Week" ? topDetectivesThisWeek : topDetectivesAllTime;

  // A simple countdown hook for upcoming exams
  const Countdown = ({ targetDate }: { targetDate: Date }) => {
    const [timeLeft, setTimeLeft] = useState<{ d: number, h: number, m: number, s: number } | null>(null);

    useEffect(() => {
      const timer = setInterval(() => {
        const diff = new Date(targetDate).getTime() - new Date().getTime();
        if (diff <= 0) {
          clearInterval(timer);
          setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        } else {
          setTimeLeft({
            d: Math.floor(diff / (1000 * 60 * 60 * 24)),
            h: Math.floor((diff / (1000 * 60 * 60)) % 24),
            m: Math.floor((diff / 1000 / 60) % 60),
            s: Math.floor((diff / 1000) % 60)
          });
        }
      }, 1000);
      return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) return null;

    if (timeLeft.d === 0 && timeLeft.h === 0) {
        return <span className="text-red-500 font-bold">{timeLeft.m}m {timeLeft.s}s</span>;
    }

    return <span>{timeLeft.d} Days, {timeLeft.h} Hours</span>;
  };

  const TimeLeftString = ({ targetDate }: { targetDate: Date | null | undefined }) => {
     const [str, setStr] = useState("");
     useEffect(() => {
        if (!targetDate) {
            setStr("No End Date");
            return;
        }
        
        const update = () => {
            const diff = new Date(targetDate).getTime() - new Date().getTime();
            if (diff > 0) {
                const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const m = Math.floor((diff / 1000 / 60) % 60);
                if (d > 0) setStr(`Ends in ${d}d ${h}h`);
                else setStr(`Ends in ${h}h ${m}m`);
            } else {
                setStr("Ended");
            }
        };
        
        update(); // Call immediately on mount
        const timer = setInterval(update, 1000);
        return () => clearInterval(timer);
     }, [targetDate]);
     return <>{str}</>;
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Search className="w-6 h-6 text-blue-600" />
            Detective Challenges
          </h1>
          <p className="text-gray-500 mt-1">Test your prep, spot errors, and earn Detective XP.</p>
        </div>
        
        <div className="bg-gray-100 p-1 rounded-full flex gap-1 overflow-x-auto w-full lg:w-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab("Active")}
            className={`px-5 md:px-6 py-2 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-all shrink-0 ${activeTab === "Active" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            <div className="w-2 h-2 rounded-full bg-red-500"></div> Active
          </button>
          <button 
            onClick={() => setActiveTab("Upcoming")}
            className={`px-5 md:px-6 py-2 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-all shrink-0 ${activeTab === "Upcoming" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            Upcoming <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{upcoming.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab("Past")}
            className={`px-5 md:px-6 py-2 rounded-full text-sm font-semibold transition-all shrink-0 text-center ${activeTab === "Past" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            Past
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {activeTab === "Active" && active.map((exam) => (
              <div key={exam.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col h-full hover:shadow-md transition">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-400"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-xs font-bold tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">Wireless PSI</div>
                  <div className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div> LIVE
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{exam.title}</h3>
                <div className="flex flex-col text-gray-500 text-sm mb-6 gap-1.5">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5 text-blue-500" /> Duration: <span className="font-semibold text-gray-700 ml-1">{exam.duration} Minutes</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5 text-blue-500" /> Start: <span className="font-semibold text-gray-700 ml-1">{new Date(exam.startTime).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5 text-red-400" /> End: <span className="font-semibold text-gray-700 ml-1">{exam.endTime ? new Date(exam.endTime).toLocaleString() : 'Ongoing'}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Questions</div>
                    <div className="text-xl font-bold text-gray-800">{exam.questions}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Marks</div>
                    <div className="text-xl font-bold text-gray-800">{exam.marks}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 border-dashed mt-auto">
                   <div className="text-xs text-gray-500">
                     <div className="flex items-center gap-1 mb-1"><Users className="w-3.5 h-3.5"/> {exam.joined.toLocaleString()}{exam.maxUsers ? ` / ${exam.maxUsers}` : ''} Joined</div>
                     <div className="text-orange-500 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> <TimeLeftString targetDate={exam.endTime} />
                     </div>
                   </div>
                   <Link 
                     href={exam.hasAttempted ? `/detective/${exam.id}/results` : `/detective/${exam.id}`}
                     className={`${exam.hasAttempted ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"} text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition`}
                   >
                     {exam.hasAttempted ? "View Results" : "Attempt"} <ArrowRight className="w-4 h-4" />
                   </Link>
                </div>
              </div>
            ))}

            {activeTab === "Upcoming" && upcoming.map((exam) => (
              <div key={exam.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col h-full hover:shadow-md transition">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-400"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-xs font-bold tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full uppercase">SSC CGL TIER-II</div>
                  <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" /> UPCOMING
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{exam.title}</h3>
                <div className="flex flex-col text-gray-500 text-sm mb-6 gap-1.5">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5 text-blue-500" /> Duration: <span className="font-semibold text-gray-700 ml-1">{exam.duration} Minutes</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5 text-blue-500" /> Start: <span className="font-semibold text-gray-700 ml-1">{new Date(exam.startTime).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="bg-red-50/50 border border-red-100 rounded-xl p-4 text-center mb-8 flex-1 flex flex-col justify-center">
                  <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">Challenge Starts In</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                     <Countdown targetDate={exam.startTime} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 border-dashed mt-auto">
                   <div className="text-xs text-gray-500 flex items-center gap-1">
                     <Users className="w-3.5 h-3.5"/> {exam.waiting.toLocaleString()}{exam.maxUsers ? ` / ${exam.maxUsers}` : ''} Waiting
                   </div>
                   <div className="flex gap-2">
                       <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition text-sm">
                         <ShieldAlert className="w-4 h-4" /> Notify Me
                       </button>
                   </div>
                </div>
              </div>
            ))}

            {activeTab === "Past" && past.map((exam) => (
              <div key={exam.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col h-full hover:shadow-md transition">
                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-xs font-bold tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">Wireless PSI</div>
                  <div className="text-xs font-bold text-gray-500 bg-gray-50 border border-gray-200 px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> ENDED
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{exam.title}</h3>
                <div className="flex flex-col text-gray-500 text-sm mb-6 gap-1.5">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5 text-blue-500" /> Start: <span className="font-semibold text-gray-700 ml-1">{new Date(exam.startTime).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5 text-red-400" /> End: <span className="font-semibold text-gray-700 ml-1">{exam.endTime ? new Date(exam.endTime).toLocaleString() : 'Ongoing'}</span>
                  </div>
                </div>
                
                {exam.userScore !== null ? (
                    <div className="flex justify-between items-center bg-green-50/50 border border-green-100 rounded-xl p-4 mb-8 flex-1">
                        <div>
                            <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Your Score</div>
                            <div className="text-3xl font-bold text-gray-900">{exam.userScore}<span className="text-lg text-gray-500 font-normal">/{exam.totalMarks}</span></div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Rank</div>
                            <div className="text-xl font-bold text-gray-900">#{exam.userRank}</div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center bg-gray-50 border border-gray-100 rounded-xl p-6 mb-8 flex-1 text-gray-400 text-sm">
                        <XCircle className="w-4 h-4 mr-2" /> You missed this challenge
                    </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 border-dashed mt-auto">
                   <div className="text-xs text-gray-500 flex items-center gap-1">
                     <Users className="w-3.5 h-3.5"/> {exam.participantCount.toLocaleString()}{exam.maxUsers ? ` / ${exam.maxUsers}` : ''} Detectives
                   </div>
                   <div className="flex gap-2">
                       {exam.userScore !== null && (
                        <Link 
                            href={`/detective/${exam.id}/results`}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2.5 rounded-lg font-semibold flex items-center transition text-sm shadow-sm"
                        >
                            View Results <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                       )}
                   </div>
                </div>
              </div>
            ))}
            
          </div>

          {((activeTab === "Active" && active.length === 0) || (activeTab === "Upcoming" && upcoming.length === 0) || (activeTab === "Past" && past.length === 0)) && (
              <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-500 shadow-sm">
                  No challenges found for this category.
              </div>
          )}

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Your Activity */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-gray-900">Your Activity</h3>
               <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-md uppercase tracking-wider">{activity.role}</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Challenges Completed</span>
                <span className="font-bold text-gray-900">{activity.completed}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-2"><Search className="w-4 h-4" /> Investigated MCQs</span>
                <span className="font-bold text-gray-900">{activity.investigated}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-2"><Medal className="w-4 h-4 text-green-500" /> Accepted Reports</span>
                <span className="font-bold text-green-600">{activity.accepted}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Helpful Explanations</span>
                <span className="font-bold text-gray-900">{activity.helpful}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 border-dashed flex justify-between items-center">
               <span className="text-sm font-semibold text-gray-600 flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-500" /> Total XP</span>
               <span className="text-xl font-bold text-yellow-600">{activity.xp.toLocaleString()}</span>
            </div>
            
            <button className="w-full mt-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-xl border border-gray-200 transition text-sm">
              View Public Profile
            </button>
          </div>

          {/* Top Detectives */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-bl-full -z-10 opacity-50"></div>
            
            <div className="flex justify-between items-center mb-2">
               <h3 className="font-bold text-gray-900 flex items-center gap-2">
                 <Trophy className="w-5 h-5 text-yellow-500" /> Top Detectives
               </h3>
            </div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-6">{leaderboardTab === "This Week" ? "Weekly Hall of Fame" : "All-Time Legends"}</p>

            <div className="flex justify-end mb-4">
               <div className="bg-gray-100 p-1 rounded-lg flex text-xs font-semibold">
                  <button 
                    onClick={() => setLeaderboardTab("This Week")}
                    className={`px-3 py-1 rounded-md transition-colors ${leaderboardTab === "This Week" ? "bg-white shadow-sm text-gray-800" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    This Week
                  </button>
                  <button 
                    onClick={() => setLeaderboardTab("All Time")}
                    className={`px-3 py-1 rounded-md transition-colors ${leaderboardTab === "All Time" ? "bg-white shadow-sm text-gray-800" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    All Time
                  </button>
               </div>
            </div>
            
            <div className="space-y-4">
              {currentLeaderboard.map((det, index) => (
                <div key={det.id} className="flex items-center gap-3 relative">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${index === 0 ? 'bg-yellow-100 text-yellow-700' : index === 1 ? 'bg-gray-100 text-gray-700' : index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-400'}`}>
                    {index + 1}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 font-bold overflow-hidden border border-white shadow-sm">
                     {det.image ? <img src={det.image} alt={det.name} className="w-full h-full object-cover" /> : det.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 text-sm truncate flex items-center gap-1">
                        {det.name} {index === 0 && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
                    </div>
                    <div className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest truncate">{det.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{det.xp.toLocaleString()} <span className="text-yellow-500">⚡</span></div>
                    {det.weeklyGain > 0 && (
                      <div className="text-[10px] text-green-500 font-bold">+{det.weeklyGain} this week</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 text-sm font-semibold text-blue-600 hover:text-blue-800 transition text-center">
              Full Leaderboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// Missing icon from lucide-react import
function XCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  )
}
