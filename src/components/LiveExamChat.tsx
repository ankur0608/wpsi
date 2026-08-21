"use client";

import { useState, useEffect, useRef } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp } from "firebase/firestore";

interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userImage: string | null;
  createdAt: Timestamp | null;
}

interface ChatProps {
  liveExamId: string;
  currentUser: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

export default function LiveExamChat({ liveExamId, currentUser }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [reportMessageId, setReportMessageId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState("");
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  const handleReportMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportMessageId || !reportReason) return;
    
    setIsSubmittingReport(true);
    try {
      await addDoc(collection(db, "liveExams", liveExamId, "reports"), {
        messageId: reportMessageId,
        reportedBy: currentUser.id,
        reason: reportReason,
        createdAt: serverTimestamp(),
      });
      alert("Message reported successfully.");
      setReportMessageId(null);
      setReportReason("");
    } catch (error) {
      console.error("Error reporting message:", error);
      alert("Failed to report message. Please try again.");
    } finally {
      setIsSubmittingReport(false);
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "liveExams", liveExamId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("LiveExamChat snapshot received!", snapshot.docs.length, "messages");
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
      
      // Auto scroll on new message
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, (error) => {
      console.error("LiveExamChat onSnapshot error:", error);
    });

    return () => unsubscribe();
  }, [liveExamId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const text = newMessage;
    setNewMessage("");

    try {
      await addDoc(collection(db, "liveExams", liveExamId, "messages"), {
        text,
        userId: currentUser.id,
        userName: currentUser.name || "Anonymous",
        userImage: currentUser.image || null,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
      // Revert if error
      setNewMessage(text);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-24">
        {messages.map((msg) => {
          const isMe = msg.userId === currentUser.id;
          const initials = msg.userName?.substring(0, 2).toUpperCase() || 'U';
          const timeString = msg.createdAt ? new Date(msg.createdAt.toMillis()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now';
          
          return (
            <div key={msg.id} className="flex gap-3 items-start group">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden">
                {msg.userImage ? (
                  <img src={msg.userImage} alt={msg.userName || "User"} className="w-full h-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">{msg.userName}</span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Senior Investigator</span>
                  </div>
                  <span className="text-xs text-gray-400">{timeString}</span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 font-medium">
                  <span className="text-amber-500 flex items-center gap-1">⚡ 2,450 XP</span>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed break-words">
                  {msg.text}
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                    0
                  </button>
                  <button className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">
                    Reply
                  </button>
                  <button 
                    onClick={() => setReportMessageId(msg.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-red-500 transition-colors ml-auto opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
                    Report
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <form onSubmit={sendMessage} className="relative flex items-end gap-2">
          <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your explanation or doubt..."
              className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 text-sm resize-none outline-none min-h-[60px] max-h-[120px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(e);
                }
              }}
            />
            <div className="flex items-center justify-between px-3 pb-2 pt-1 border-t border-gray-50">
              <button type="button" className="text-xs text-gray-500 font-medium flex items-center gap-1.5 hover:text-gray-900 transition-colors px-2 py-1 rounded-md hover:bg-gray-100">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                Add Image
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={!newMessage.trim()}
            className="h-10 px-5 bg-blue-600 text-white rounded-xl font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all shrink-0 mb-1"
          >
            Post Comment
          </button>
        </form>
      </div>

      {reportMessageId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setReportMessageId(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 flex items-start justify-between">
              <h3 className="font-bold text-gray-900 text-lg">Report Message</h3>
              <button onClick={() => setReportMessageId(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleReportMessage} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Reason for reporting</label>
                <div className="space-y-2">
                  {["Spam", "Inappropriate Content", "Harassment", "Other"].map(r => (
                    <label key={r} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200">
                      <input type="radio" name="reason" value={r} checked={reportReason === r} onChange={(e) => setReportReason(e.target.value)} />
                      <span className="text-sm text-gray-700">{r}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="pt-2 flex gap-2">
                <button type="button" onClick={() => setReportMessageId(null)} className="flex-1 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" disabled={isSubmittingReport || !reportReason} className="flex-1 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg">
                  {isSubmittingReport ? "Reporting..." : "Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
