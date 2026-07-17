"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { getUserLevel } from "@/lib/xp";

export default function LeaderboardPage() {
  const { user } = useUser();
  const displayName = user?.name?.trim() || "Profile";
  const [timeframe, setTimeframe] = useState("allTime");
  const [category, setCategory] = useState("All");

  const [userStats, setUserStats] = useState<any>(null);

  const currentXp = userStats?.xp ?? user?.xp ?? 0;
  const { currentLevel, nextLevel, progress } = getUserLevel(currentXp);

  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/leaderboard');
        if (res.ok) {
          const data = await res.json();
          setLeaderboardData(data.leaderboardData || []);
          setUserRank(data.userRank);
          setTotalUsers(data.totalUsers);
          setUserStats(data.userStats);
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const top1 = leaderboardData[0];
  const top2 = leaderboardData[1];
  const top3 = leaderboardData[2];

  if (loading) {
    return <div className="p-20 text-center text-dark-500 font-bold animate-pulse">Loading Leaderboard...</div>;
  }

  return (
    <div className="bg-dark-50 w-full font-sans text-dark-800 pb-10">
      <div className="max-w-[1440px] mx-auto p-4 lg:p-6 space-y-6">
        
        {/* User Stats Block */}
        <div className="bg-white border border-dark-100 rounded-[24px] p-6 lg:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            {/* User Info */}
            <div className="flex items-center gap-5 md:w-1/3">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shrink-0 shadow-lg shadow-primary-500/25 uppercase border-2 border-white">
                {displayName.slice(0, 2)}
              </div>
              <div>
                <h2 className="font-display text-2xl font-black text-dark-900 tracking-tight leading-none mb-1">{displayName}</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md">Rank #{userRank || '?'}</span>
                  <span className="bg-primary-50 border border-primary-200 text-primary-700 text-[10px] font-bold px-2 py-0.5 rounded-md">Top {userRank && totalUsers > 0 ? Math.max(1, Math.round((userRank / totalUsers) * 100)) : '?'}%</span>
                </div>
              </div>
            </div>

            {/* Rank Details */}
            <div className="flex-1 border-t md:border-t-0 md:border-l border-dark-100 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="bg-primary-50 border border-primary-100 px-6 py-4 rounded-2xl text-left flex flex-col justify-center min-w-[140px]">
                  <p className="text-[10px] text-primary-600 font-bold uppercase tracking-widest mb-1">Overall Rank</p>
                  <p className="text-3xl font-black text-primary-800 leading-none">#{userRank || 'N/A'}</p>
                </div>
                
                <div className="bg-primary-50 border border-primary-100 px-6 py-4 rounded-2xl text-left flex-1">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-[10px] text-primary-600 font-bold uppercase tracking-widest">Level Progress</p>
                    <span className="text-xs font-bold text-primary-700 bg-primary-100 px-2 py-0.5 rounded-md">
                      {currentXp.toLocaleString()} / {nextLevel ? nextLevel.xpRequired.toLocaleString() : 'MAX'} XP
                    </span>
                  </div>
                  
                  <div className="w-full bg-primary-200/50 h-2.5 rounded-full overflow-hidden mb-3">
                    <div className="bg-primary-500 h-full rounded-full relative" style={{ width: `${progress}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs font-bold text-dark-600">
                    <span className="flex items-center gap-1.5 text-primary-900">
                      <span className="text-lg leading-none">{currentLevel.icon}</span> 
                      {currentLevel.name} (Lvl {currentLevel.level})
                    </span>
                    <span className="text-primary-600 flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-primary-100 shadow-sm">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7-7m-7-7v18"/></svg> 
                      Up 4 spots
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex bg-dark-200/50 p-1.5 rounded-2xl border border-dark-100 shrink-0 self-start sm:self-auto backdrop-blur-md">
            <button onClick={() => setTimeframe('weekly')} className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${timeframe === 'weekly' ? 'bg-white shadow-sm text-dark-800' : 'text-dark-500 hover:text-dark-800'}`}>Weekly</button>
            <button onClick={() => setTimeframe('monthly')} className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${timeframe === 'monthly' ? 'bg-white shadow-sm text-dark-800' : 'text-dark-500 hover:text-dark-800'}`}>Monthly</button>
            <button onClick={() => setTimeframe('allTime')} className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${timeframe === 'allTime' ? 'bg-white shadow-sm text-dark-800' : 'text-dark-500 hover:text-dark-800'}`}>All Time</button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1 hide-scrollbar">
            {['All', 'WPSI', 'GPSC', 'GATE'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setCategory(cat)} 
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-sm border ${category === cat ? 'bg-dark-100 text-dark-600 border-dark-200' : 'bg-white text-dark-600 hover:bg-dark-50 border-dark-200'}`}
              >
                {cat === 'All' ? 'All Branches' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          
          {/* Leaderboard List */}
          <div className="bg-white border border-dark-100 rounded-3xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-dark-100 mb-5">
              <h3 className="font-display text-lg font-bold text-dark-800 flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center border border-primary-100">🏆</span>
                Current Standings
              </h3>
              <div className="text-right text-[10px] text-dark-500 font-semibold uppercase tracking-wider">
                <p className="text-dark-800">{totalUsers.toLocaleString()} Total</p>
                <p className="text-primary-600">All Time XP</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {leaderboardData.map((item) => (
                <div key={item.rank} className={`flex items-center justify-between p-3 sm:p-4 rounded-2xl border transition-all ${item.isUser ? 'bg-primary-50/50 border-primary-200 shadow-sm' : 'bg-white border-dark-100 hover:border-dark-200 hover:shadow-sm group'}`}>
                  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <span className="w-6 font-display font-bold text-dark-400 text-center text-sm">{item.rank}</span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm overflow-hidden ${item.isUser ? 'bg-primary-600 text-white' : 'bg-dark-100 text-dark-600 group-hover:bg-dark-200 transition-colors'}`}>
                      {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : item.avatar}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${item.isUser ? 'text-primary-900' : 'text-dark-800'}`}>
                        {item.name} {item.isUser && <span className="ml-1.5 text-[9px] bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">You</span>}
                      </p>
                      <p className="text-[10px] text-dark-500 font-semibold mt-0.5 flex items-center gap-1.5">
                        <span className="text-primary-600 font-bold">{item.xp}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {item.change === 'up' && <span className="hidden sm:flex text-[10px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded items-center gap-0.5">↑</span>}
                    {item.change === 'down' && <span className="hidden sm:flex text-[10px] text-rose-600 font-bold bg-rose-50 border border-rose-100 px-2 py-0.5 rounded items-center gap-0.5">↓</span>}
                    {item.change === 'same' && <span className="hidden sm:flex text-[10px] text-dark-400 font-bold bg-dark-50 border border-dark-100 px-2 py-0.5 rounded items-center gap-0.5">—</span>}
                    
                    <div className="text-right flex flex-col items-end justify-center">
                      <p className="font-display font-black text-dark-800 text-sm sm:text-lg leading-none flex items-center gap-1">
                        <span className="text-orange-500">🔥</span> 
                        {item.streak || 0}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Show user rank if they are not in the top 10 */}
              {!leaderboardData.some(item => item.isUser) && userStats && userRank && (
                <>
                  <div className="flex items-center justify-center py-2 opacity-50">
                    <span className="w-1.5 h-1.5 rounded-full bg-dark-300 mx-1"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-dark-300 mx-1"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-dark-300 mx-1"></span>
                  </div>
                  <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl border bg-primary-50/50 border-primary-200 shadow-sm transition-all">
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <span className="w-6 font-display font-bold text-dark-400 text-center text-sm">{userRank}</span>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm bg-primary-600 text-white overflow-hidden">
                        {userStats.image ? <img src={userStats.image} alt={displayName} className="w-full h-full object-cover" /> : displayName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-primary-900">
                          {displayName} <span className="ml-1.5 text-[9px] bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">You</span>
                        </p>
                        <p className="text-[10px] text-dark-500 font-semibold mt-0.5 flex items-center gap-1.5">
                          <span className="text-primary-600 font-bold">{userStats.xp >= 1000 ? (userStats.xp / 1000).toFixed(1) + 'k' : userStats.xp} XP</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="hidden sm:flex text-[10px] text-dark-400 font-bold bg-dark-50 border border-dark-100 px-2 py-0.5 rounded items-center gap-0.5">—</span>
                      <div className="text-right flex flex-col items-end justify-center">
                        <p className="font-display font-black text-dark-800 text-sm sm:text-lg leading-none flex items-center gap-1">
                          <span className="text-orange-500">🔥</span> 
                          {userStats.streak || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-dark-100 flex justify-center text-xs text-dark-400 font-medium">
              <span>Ranking based on All-Time XP earned</span>
            </div>
          </div>

          {/* 3D Podium */}
          <div className="bg-white border border-dark-100 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[450px] self-start sticky top-24">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-100/50 blur-[60px] pointer-events-none"></div>

            <div className="text-center mb-8 relative z-10">
              <h3 className="font-display text-xl font-bold text-dark-800">Top Performers</h3>
              <p className="text-xs text-dark-500 font-medium mt-1">Hall of Fame</p>
            </div>

            <div className="flex items-end justify-center gap-3 sm:gap-4 mt-auto relative z-10 px-2 pb-2">
              
              {/* 2nd Place */}
              <div className="flex flex-col items-center w-[30%] group">
                <div className="relative mb-3 flex flex-col items-center">
                  <div className="absolute -top-4 text-xl">🥈</div>
                  <div className="w-14 h-14 rounded-full bg-slate-50 border-2 border-slate-300 flex items-center justify-center font-bold text-slate-800 shadow-sm text-sm relative z-10 transition-transform duration-300 overflow-hidden">
                    {top2?.image ? <img src={top2.image} alt={top2.name} className="w-full h-full object-cover" /> : top2?.avatar || '--'}
                  </div>
                  <p className="text-xs font-bold text-dark-800 mt-2 truncate w-full text-center">{top2?.name || '---'}</p>
                  <p className="text-[9px] text-slate-500 font-bold mt-0.5">{top2?.xp || '0 XP'}</p>
                </div>
                <div className="w-full h-32 relative transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-100 to-slate-50 rounded-t-2xl border-t-2 border-l border-r border-slate-200 shadow-[0_-4px_15px_rgba(0,0,0,0.03)]"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-slate-300">2</span>
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center w-[36%] group relative z-20">
                <div className="relative mb-3 flex flex-col items-center">
                  <div className="absolute -top-7 text-3xl drop-shadow-md">👑</div>
                  <div className="w-20 h-20 rounded-full bg-amber-50 border-4 border-amber-300 flex items-center justify-center font-bold text-amber-700 shadow-sm text-2xl relative z-10 transition-transform duration-300 overflow-hidden">
                    {top1?.image ? <img src={top1.image} alt={top1.name} className="w-full h-full object-cover" /> : top1?.avatar || '--'}
                  </div>
                  <p className="text-sm font-bold text-amber-600 mt-3 truncate w-full text-center">{top1?.name || '---'}</p>
                  <p className="text-[10px] text-amber-500 font-bold mt-0.5">{top1?.xp || '0 XP'}</p>
                </div>
                <div className="w-full h-44 relative transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-100 to-amber-50 rounded-t-2xl border-t-2 border-l border-r border-amber-200 shadow-[0_-4px_15px_rgba(245,158,11,0.08)]"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-amber-300">1</span>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center w-[30%] group">
                <div className="relative mb-3 flex flex-col items-center">
                  <div className="absolute -top-4 text-xl">🥉</div>
                  <div className="w-14 h-14 rounded-full bg-orange-50 border-2 border-orange-300 flex items-center justify-center font-bold text-orange-800 shadow-sm text-sm relative z-10 transition-transform duration-300 overflow-hidden">
                    {top3?.image ? <img src={top3.image} alt={top3.name} className="w-full h-full object-cover" /> : top3?.avatar || '--'}
                  </div>
                  <p className="text-xs font-bold text-dark-800 mt-2 truncate w-full text-center">{top3?.name || '---'}</p>
                  <p className="text-[9px] text-orange-500 font-bold mt-0.5">{top3?.xp || '0 XP'}</p>
                </div>
                <div className="w-full h-24 relative transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-100 to-orange-50 rounded-t-2xl border-t-2 border-l border-r border-orange-200 shadow-[0_-4px_15px_rgba(0,0,0,0.03)]"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-orange-300">3</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
