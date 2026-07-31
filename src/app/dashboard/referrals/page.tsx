"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';

export default function ReferralsPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ referralCode: string; referralCount: number; rewards: any[] } | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedReward, setCopiedReward] = useState<string | null>(null);

  const [referredUsers, setReferredUsers] = useState<any[]>([]);
  const [loadingReferred, setLoadingReferred] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await fetch('/api/referrals');
        const json = await res.json();
        if (json.success) {
          setData({
            referralCode: json.referralCode,
            referralCount: json.referralCount,
            rewards: json.rewards
          });
        }
      } catch (err) {
        console.error("Failed to fetch referrals", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchReferredUsers = async () => {
      try {
        const res = await fetch('/api/user/referred');
        const json = await res.json();
        if (json.success) {
          setReferredUsers(json.referredUsers);
        }
      } catch (err) {
        console.error("Failed to fetch referred users", err);
      } finally {
        setLoadingReferred(false);
      }
    };

    fetchReferrals();
    fetchReferredUsers();
  }, []);

  const handleCopy = () => {
    if (data?.referralCode) {
      navigator.clipboard.writeText(data.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyReward = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedReward(code);
    setTimeout(() => setCopiedReward(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] w-full text-dark-500">
        <div className="flex flex-col items-center gap-3">
          <i className="fa-solid fa-spinner fa-spin text-2xl text-primary-500" />
          <p className="font-semibold text-sm animate-pulse">Loading your rewards...</p>
        </div>
      </div>
    );
  }

  const referralCount = data?.referralCount || 0;

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto w-full">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 rounded-[28px] p-6 lg:p-8 text-white shadow-2xl shadow-primary-900/20 mb-10 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-primary-400/20 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none"></div>
        <div className="absolute right-10 bottom-10 text-white/5 opacity-50 transform rotate-12 scale-125 pointer-events-none">
           <i className="fa-solid fa-gift text-7xl"></i>
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary-100 mb-4 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-success-400 animate-pulse"></span>
              Refer & Earn Program
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-extrabold mb-3 leading-tight">
              Refer Friends & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-white">Earn Rewards</span>
            </h1>
            <p className="text-primary-100 text-sm max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Give your friends <strong className="text-white">50% OFF</strong> on their first Premium Plan. Every successful referral brings you one step closer to a <strong className="text-white">FREE Premium Plan!</strong>
            </p>
          </div>
          
          <div className="w-full max-w-xs bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-center shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <p className="relative z-10 text-primary-100 text-[10px] font-bold uppercase tracking-widest mb-2">Your Unique Referral Code</p>
            <div className="relative z-10 flex items-center justify-center bg-white text-primary-900 px-4 py-3 rounded-xl border-2 border-primary-200 shadow-inner mb-4 transform transition-transform group-hover:scale-105">
              <span className="font-mono text-xl font-black tracking-widest">{data?.referralCode || "N/A"}</span>
            </div>
            <button 
              onClick={handleCopy}
              disabled={!data?.referralCode}
              className={`relative z-10 w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${copied ? 'bg-success-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-105' : 'bg-primary-500 text-white hover:bg-primary-400 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1'}`}
            >
              {copied ? (
                <><i className="fa-solid fa-check"></i> Copied to Clipboard!</>
              ) : (
                <><i className="fa-regular fa-copy"></i> Copy My Code</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Milestones Tracker */}
      <div className="mb-14">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-dark-900 mb-2">Milestone Rewards</h2>
            <p className="text-dark-500 mb-2">Track your progress. Every successful referral gets you closer to a free plan.</p>
            <div className="bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-2">
              <i className="fa-solid fa-circle-info"></i>
              Note: A referral is only counted after your friend successfully purchases a premium plan.
            </div>
          </div>
          <div className="bg-primary-50 text-primary-700 px-5 py-2.5 rounded-xl font-bold text-lg border border-primary-100 flex items-center gap-3">
             <i className="fa-solid fa-user-plus"></i>
             Total Invites: {referralCount}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-dark-100 -translate-y-1/2 z-0 rounded-full"></div>
          <div 
            className="hidden md:block absolute top-1/2 left-0 h-1 bg-primary-500 -translate-y-1/2 z-0 rounded-full transition-all duration-1000"
            style={{ width: referralCount >= 3 ? '100%' : referralCount === 2 ? '50%' : referralCount === 1 ? '16%' : '0%' }}
          ></div>

          {/* Milestone 1 */}
          <div className={`relative z-10 p-6 lg:p-8 rounded-3xl border-2 transition-all duration-500 flex flex-col items-center text-center ${referralCount >= 1 ? 'bg-white border-primary-500 shadow-xl shadow-primary-500/10 scale-105' : 'bg-white border-dark-100 hover:border-dark-200'}`}>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-xl mb-4 transition-colors ${referralCount >= 1 ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/40' : 'bg-dark-100 text-dark-400'}`}>
              {referralCount >= 1 ? <i className="fa-solid fa-check"></i> : '1'}
            </div>
            <h3 className={`text-xl font-bold mb-2 ${referralCount >= 1 ? 'text-primary-700' : 'text-dark-800'}`}>1st Referral</h3>
            <p className="text-sm font-semibold text-dark-500 mb-4">Give 50% Off, Get 50% Off</p>
            <div className={`mt-auto px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${referralCount >= 1 ? 'bg-primary-50 text-primary-700' : 'bg-dark-50 text-dark-400'}`}>
              Reward: 50% Coupon
            </div>
          </div>
          
          {/* Milestone 2 */}
          <div className={`relative z-10 p-6 lg:p-8 rounded-3xl border-2 transition-all duration-500 flex flex-col items-center text-center ${referralCount >= 2 ? 'bg-white border-primary-500 shadow-xl shadow-primary-500/10 scale-105' : 'bg-white border-dark-100 hover:border-dark-200'}`}>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-xl mb-4 transition-colors ${referralCount >= 2 ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/40' : 'bg-dark-100 text-dark-400'}`}>
              {referralCount >= 2 ? <i className="fa-solid fa-check"></i> : '2'}
            </div>
            <h3 className={`text-xl font-bold mb-2 ${referralCount >= 2 ? 'text-primary-700' : 'text-dark-800'}`}>2nd Referral</h3>
            <p className="text-sm font-semibold text-dark-500 mb-4">Double the effort, huge reward</p>
            <div className={`mt-auto px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${referralCount >= 2 ? 'bg-primary-50 text-primary-700' : 'bg-dark-50 text-dark-400'}`}>
              Reward: 75% Coupon
            </div>
          </div>
          
          {/* Milestone 3 */}
          <div className={`relative z-10 p-6 lg:p-8 rounded-3xl border-2 transition-all duration-500 flex flex-col items-center text-center ${referralCount >= 3 ? 'bg-gradient-to-b from-white to-primary-50 border-primary-500 shadow-2xl shadow-primary-500/20 scale-110' : 'bg-white border-dark-100 hover:border-dark-200'}`}>
            <div className="absolute -top-3 -right-3 bg-warning text-dark-bg text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-warning/30 rotate-12">Ultimate</div>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-xl mb-4 transition-colors ${referralCount >= 3 ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/40' : 'bg-dark-100 text-dark-400'}`}>
              {referralCount >= 3 ? <i className="fa-solid fa-crown"></i> : '3'}
            </div>
            <h3 className={`text-xl font-bold mb-2 ${referralCount >= 3 ? 'text-primary-700' : 'text-dark-800'}`}>3rd Referral</h3>
            <p className="text-sm font-semibold text-dark-500 mb-4">You've mastered sharing!</p>
            <div className={`mt-auto px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${referralCount >= 3 ? 'bg-primary-500 text-white shadow-md' : 'bg-dark-50 text-dark-400'}`}>
              Reward: 100% Free Plan
            </div>
          </div>
        </div>
      </div>


      {/* Rewards Hub */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-display font-bold text-dark-900 mb-2">My Unlocked Coupons</h2>
        <p className="text-dark-500">Apply these exclusive single-use codes at checkout.</p>
      </div>

      {!data?.rewards || data.rewards.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dark-100 p-16 text-center shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-dark-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 w-24 h-24 bg-dark-50 rounded-full flex items-center justify-center mx-auto mb-6 text-dark-300 group-hover:text-primary-400 group-hover:bg-primary-50 transition-colors duration-500">
            <i className="fa-solid fa-ticket text-4xl"></i>
          </div>
          <h3 className="relative z-10 text-xl font-bold text-dark-800 mb-3">No Coupons Yet</h3>
          <p className="relative z-10 text-dark-500 max-w-md mx-auto leading-relaxed text-sm">When your friends complete their purchase using your referral code, your powerful reward coupons will magically appear right here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.rewards.map((reward) => (
            <div key={reward.id} className="bg-white rounded-3xl border border-dark-100 p-1 shadow-sm hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-primary-50 to-white rounded-[20px] p-6 h-full border border-white relative overflow-hidden">
                
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 text-primary-500 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                  <i className="fa-solid fa-certificate text-9xl"></i>
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-white text-primary-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border border-primary-100 shadow-sm">Single Use</span>
                    <i className="fa-solid fa-ticket text-primary-300 text-xl"></i>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-4xl font-display font-extrabold text-primary-700 mb-1">{reward.discountPercent}% OFF</h3>
                    <p className="text-sm font-semibold text-dark-500">Premium Discount Coupon</p>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white border border-dark-200 p-2 pl-4 rounded-xl shadow-inner group-hover:border-primary-300 transition-colors">
                    <span className="font-mono text-sm font-bold text-dark-800 tracking-wider truncate mr-3">{reward.code}</span>
                    <button 
                      onClick={() => handleCopyReward(reward.code)}
                      className={`shrink-0 text-xs font-bold px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${copiedReward === reward.code ? 'bg-success-100 text-success-700' : 'bg-primary-600 text-white hover:bg-primary-500 shadow-md shadow-primary-600/20'}`}
                    >
                      {copiedReward === reward.code ? <><i className="fa-solid fa-check"></i> Copied</> : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Referred Users List */}
      <div className="mt-16 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-dark-900 mb-2">Users Signed Up With Your Code</h2>
          <p className="text-dark-500">Track the users who have successfully used your referral code.</p>
        </div>
        {!loadingReferred && referredUsers.length > 0 && (
          <div className="inline-flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-xl border border-primary-100 text-primary-700 font-bold text-sm shadow-sm">
            <i className="fa-solid fa-users text-primary-500"></i>
            {referredUsers.length} Referral{referredUsers.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="w-full">
        {loadingReferred ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-dark-100 p-5 flex items-center gap-4 animate-pulse">
                <div className="w-12 h-12 rounded-full bg-dark-100 shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-dark-100 rounded w-1/3"></div>
                  <div className="h-3 bg-dark-50 rounded w-1/4"></div>
                </div>
                <div className="w-20 h-6 bg-dark-50 rounded-full"></div>
              </div>
            ))}
          </div>
        ) : referredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {referredUsers.map((u) => {
              const isPremium = u.planType && u.planType.toLowerCase() !== 'free';
              const avatarName = encodeURIComponent(u.name || 'User');
              return (
                <div key={u.id} className="group bg-white rounded-2xl border border-dark-100 p-4 sm:p-5 flex items-center justify-between shadow-sm hover:shadow-lg hover:shadow-primary-500/5 hover:border-primary-200 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm group-hover:shadow-primary-500/20 transition-shadow">
                        <img src={`https://ui-avatars.com/api/?name=${avatarName}&background=${isPremium ? 'F59E0B' : '007FFF'}&color=fff&bold=true`} alt={u.name || 'User'} className="w-full h-full object-cover" />
                      </div>
                      {isPremium && (
                         <div className="absolute -top-1 -right-1 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white w-5 h-5 rounded-full flex items-center justify-center shadow-sm ring-2 ring-white">
                           <i className="fa-solid fa-crown text-[9px]"></i>
                         </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-dark-900 group-hover:text-primary-700 transition-colors">{u.name || 'Unknown User'}</h4>
                      <p className="text-xs text-dark-500 flex items-center gap-1.5 mt-1">
                        <i className="fa-regular fa-calendar-days opacity-70"></i>
                        Joined {new Date(u.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right shrink-0 ml-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${isPremium ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-200 text-yellow-700 shadow-sm' : 'bg-dark-50 border border-dark-100 text-dark-500'}`}>
                      {isPremium ? <><i className="fa-solid fa-star text-yellow-500"></i> {u.planType}</> : 'Free Plan'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dark-100 p-10 text-center shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-dark-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 w-20 h-20 bg-dark-50 rounded-full flex items-center justify-center mx-auto mb-5 text-dark-300 group-hover:text-primary-400 group-hover:bg-primary-50 transition-colors duration-500">
              <i className="fa-solid fa-users text-3xl"></i>
            </div>
            <h3 className="relative z-10 text-xl font-bold text-dark-800 mb-2">No Referrals Yet</h3>
            <p className="relative z-10 text-dark-500 max-w-sm mx-auto text-sm leading-relaxed">Share your unique code to invite friends. Once they register, they'll magically appear right here!</p>
          </div>
        )}
      </div>

      {/* Terms & Conditions Section */}
      <div className="mt-16 bg-white rounded-3xl border border-dark-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-dark-100 pb-4">
          <div className="w-10 h-10 bg-dark-50 rounded-xl flex items-center justify-center text-dark-500">
            <i className="fa-solid fa-scale-balanced"></i>
          </div>
          <h2 className="text-xl font-bold text-dark-900">Program Terms & Conditions</h2>
        </div>
        <ul className="space-y-4 text-sm text-dark-600">
          <li className="flex gap-3">
            <i className="fa-solid fa-circle-check text-primary-500 mt-0.5"></i>
            <span><strong>Referral is valid only for new users.</strong></span>
          </li>
          <li className="flex gap-3">
            <i className="fa-solid fa-circle-check text-primary-500 mt-0.5"></i>
            <span>Friend must purchase a Pro or Elite premium plan.</span>
          </li>
          <li className="flex gap-3">
            <i className="fa-solid fa-circle-check text-primary-500 mt-0.5"></i>
            <span>Friend receives a flat 50% discount on their first purchase.</span>
          </li>
          <li className="flex gap-3">
            <i className="fa-solid fa-circle-check text-primary-500 mt-0.5"></i>
            <span>Only successful, non-refunded purchases count towards your referral milestones.</span>
          </li>
          <li className="flex gap-3">
            <i className="fa-solid fa-circle-check text-primary-500 mt-0.5"></i>
            <span>Rewards are issued automatically, but only after referral payment verification.</span>
          </li>
          <li className="flex gap-3">
            <i className="fa-solid fa-circle-check text-primary-500 mt-0.5"></i>
            <span>Coupons cannot be combined with other promotional offers.</span>
          </li>
          <li className="flex gap-3">
            <i className="fa-solid fa-circle-check text-primary-500 mt-0.5"></i>
            <span>All reward coupons are valid for one purchase only.</span>
          </li>
          <li className="flex gap-3">
            <i className="fa-solid fa-shield-halved text-warning mt-0.5"></i>
            <span>MCQPrepZone reserves the right to reject fraudulent referrals or self-referrals.</span>
          </li>
        </ul>
      </div>

    </div>
  );
}
