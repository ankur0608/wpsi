"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Search, Shield, X, Image as ImageIcon, MessageCircle, Users, Menu } from "lucide-react";

import { db } from "@/lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp } from "firebase/firestore";

interface Participant {
  id: string;
  name: string;
  image?: string | null;
  xp: number;
  rank?: number;
  accuracy?: number;
  role: string;
  helped: number;
  reports: number;
}

interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: Timestamp | null;
}

const getUserDetails = (name: string) => {
  const initials = (name || "U").substring(0, 2).toUpperCase();
  const colors = ["bg-orange-500", "bg-teal-500", "bg-emerald-400", "bg-blue-500", "bg-purple-500", "bg-pink-500"];
  const colorIndex = name.charCodeAt(0) % colors.length;
  return { initials, color: colors[colorIndex || 0] };
};

export default function CommunityClient({ 
  challengeId, 
  challengeTitle,
  participants,
  currentUser 
}: { 
  challengeId: string; 
  challengeTitle: string;
  participants: Participant[];
  currentUser: { id: string; name: string; image: string | null };
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState<Participant | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  React.useEffect(() => {
    const q = query(
      collection(db, "communityChats", challengeId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("Firebase snapshot received!", snapshot.docs.length, "messages");
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
    }, (error) => {
      console.error("Firebase onSnapshot error:", error);
    });

    return () => unsubscribe();
  }, [challengeId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const text = input;
    setInput("");

    try {
      await addDoc(collection(db, "communityChats", challengeId, "messages"), {
        text,
        userId: currentUser.id,
        userName: currentUser.name,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setInput(text);
    }
  };

  const selectedUserDetails = selectedUser ? getUserDetails(selectedUser.name) : null;

  return (
    <div className="w-full bg-gray-50 flex flex-col min-h-[calc(100vh-80px)]" style={{ height: 'calc(100vh - 80px)' }}>
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between shrink-0 z-20 relative shadow-sm">
        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
          <Link href={`/detective/${challengeId}/results`} className="text-gray-400 hover:text-gray-800 transition-colors shrink-0 p-1 -ml-1">
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg md:text-xl font-bold text-gray-900 truncate">{challengeTitle}</h1>
            <p className="text-xs md:text-sm font-medium text-emerald-600 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 shrink-0"></span> <span className="truncate">{participants.length} Participants</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 md:px-5 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-1.5 transition-all shadow-md">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            <span className="hidden sm:inline">Random Chat</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap">50 XP</span>
          </button>
          
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:hidden p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 transition-colors"
          >
            {showSidebar ? <X className="w-5 h-5" /> : <Users className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {showSidebar && (
          <div 
            className="md:hidden fixed inset-0 bg-black/40 z-30 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Left Sidebar - Participants */}
        <div className={`absolute md:relative top-0 bottom-0 left-0 z-40 bg-white border-r border-gray-200 flex flex-col shrink-0 transition-transform duration-300 w-[280px] sm:w-[320px] ${showSidebar ? "translate-x-0 shadow-2xl md:shadow-none" : "-translate-x-full md:translate-x-0"}`}>
          <div className="p-4 border-b border-gray-100 flex flex-col gap-3">
            <div className="flex items-center justify-between md:hidden">
              <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Community
              </h2>
              <button onClick={() => setShowSidebar(false)} className="p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded-xl transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search participants..." 
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
            {participants.map(p => {
              const { initials, color } = getUserDetails(p.name);
              return (
                <div 
                  key={p.id} 
                  onClick={() => {
                    setSelectedUser(p);
                    if (window.innerWidth < 768) setShowSidebar(false); // Close sidebar on mobile when selecting a user
                  }}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden shadow-sm ${color}`}>
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        initials
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm leading-tight">{p.name}</div>
                      <div className="text-[11px] text-amber-600 font-bold flex items-center gap-1 mt-0.5">
                        ⚡ {p.xp.toLocaleString()} XP
                      </div>
                    </div>
                  </div>
                  {p.rank ? (
                    <span className="bg-amber-100 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">#{p.rank}</span>
                  ) : p.accuracy ? (
                    <span className="text-emerald-600 font-bold text-xs">{p.accuracy}%</span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Content - Chat */}
        <div className="flex-1 flex flex-col bg-gray-50 relative">
          <div className="flex justify-center py-6 shrink-0">
            <div className="bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" /> Challenge group unlocked. Discuss your doubts!
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-[120px] md:pb-24 space-y-6">
            {messages.map(msg => {
              const isMe = msg.userId === currentUser.id;
              const { initials, color } = getUserDetails(msg.userName || "Unknown");
              const timeString = msg.createdAt ? new Date(msg.createdAt.toMillis()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now';
              const p = participants.find(part => part.id === msg.userId);
              const displayImage = p?.image || (isMe ? currentUser.image : null);
              
              return (
                <div key={msg.id} className={`flex gap-3 md:gap-4 max-w-[90%] md:max-w-[85%] ${isMe ? "ml-auto flex-row-reverse" : ""}`}>
                  <div 
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full text-white flex items-center justify-center font-bold text-xs md:text-sm shrink-0 cursor-pointer overflow-hidden shadow-sm ${color}`}
                    onClick={() => {
                      if (!isMe) {
                        const u = participants.find(part => part.id === msg.userId);
                        if (u) setSelectedUser(u);
                      }
                    }}
                  >
                    {displayImage ? (
                      <img src={displayImage} alt={msg.userName || "User"} className="w-full h-full object-cover" />
                    ) : (
                      initials
                    )}
                  </div>
                  <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} min-w-0`}>
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="font-bold text-gray-900 text-xs md:text-sm">{msg.userName || "Unknown"}</span>
                      <span className="text-[10px] md:text-xs text-gray-400 font-medium">{timeString}</span>
                    </div>
                    <div className={`border p-3 md:p-4 rounded-2xl shadow-sm text-sm whitespace-pre-wrap leading-relaxed ${isMe ? "bg-blue-600 text-white border-blue-700 rounded-tr-sm md:rounded-tr-none shadow-blue-600/20" : "bg-white text-gray-700 border-gray-200 rounded-tl-sm md:rounded-tl-none"}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="absolute bottom-20 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
            <form onSubmit={handleSend} className="relative flex items-center gap-2">
              <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-lg flex items-center p-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                <input 
                  type="text" 
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none placeholder-gray-400"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </button>
              </div>
              <button 
                type="submit"
                disabled={!input.trim()}
                className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="w-5 h-5 -ml-1" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      {selectedUser && selectedUserDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setSelectedUser(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="h-32 bg-gradient-to-br from-blue-600 to-indigo-700 relative">
              <button onClick={() => setSelectedUser(null)} className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-1.5 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="px-6 pb-6 relative flex flex-col items-center">
              <div className={`w-24 h-24 rounded-full border-4 border-white ${selectedUserDetails.color} text-white flex items-center justify-center text-3xl font-bold -mt-12 mb-3 shadow-lg relative`}>
                {selectedUserDetails.initials}
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedUser.name}</h3>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-4">{selectedUser.role}</p>
            
            <div className="flex items-center gap-3 mb-6 w-full justify-center">
              <div className="bg-amber-50 border border-amber-100 text-amber-600 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                ⚡ {selectedUser.xp.toLocaleString()} XP
              </div>
              {selectedUser.accuracy && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {selectedUser.accuracy}% Accuracy
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3 w-full mb-6">
              <div className="border border-gray-100 bg-gray-50 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Helped</div>
                  <div className="font-bold text-gray-900">{selectedUser.helped}</div>
                </div>
              </div>
              <div className="border border-gray-100 bg-gray-50 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Reports</div>
                  <div className="font-bold text-gray-900">{selectedUser.reports}</div>
                </div>
              </div>
            </div>

            <div className="w-full bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex gap-2 text-xs text-blue-800">
                <div className="w-4 h-4 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">i</div>
                <p>Send a direct message to discuss questions or share strategies. Costs XP to prevent spam.</p>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-600/20">
                <MessageCircle className="w-4 h-4" />
                Direct Message
                <span className="bg-black/20 text-[10px] px-1.5 py-0.5 rounded ml-1">-50 XP</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
