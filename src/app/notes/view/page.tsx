"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useUser } from "@/context/UserContext";
import PDFViewer from "@/components/PDFViewer";
import pricingData from '@/data/pricing.json';

interface Note {
  id: string;
  title: string;
  pdfUrl: string;
  subjectId: string;
  sortOrder: number;
  isFree?: boolean;
}

function NotesViewContent() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get("subjectId");
  const subjectName = searchParams.get("subjectName") || "Subject";
  const examName = searchParams.get("examName") || "Exam";
  
  const router = useRouter();
  const { user } = useUser();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Interactive PDF Viewer States
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTwoPage, setIsTwoPage] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Close sidebar on mobile by default
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);
  const [searchQuery, setSearchQuery] = useState("");

  const userPlan = user?.planType?.toLowerCase() || '';
  const isElite = userPlan.includes('elite');
  const hasNotesPass = userPlan.includes('notespass');
  const selectedNoteIndex = notes.findIndex(n => n.id === selectedNote?.id);
  const canAccessNote = isElite || hasNotesPass || (selectedNote?.isFree === true);
  const elitePlan = pricingData.plans.find((p: any) => p.id === 'elite');

  const handleUpgradeElite = () => {
    localStorage.setItem('autoApplyCoupon', 'FOUNDERVIP');
    router.push('/checkout?plan=elite');
  };

  const handleUpgradeNotesPass = () => {
    router.push('/checkout?plan=notespass');
  };

  const renderUpgradeOverlay = () => (
    <div className="w-full h-full overflow-y-auto hide-scrollbar flex flex-col items-center justify-center p-4 md:p-8">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-xl border border-primary-100 p-8 text-center flex flex-col items-center relative overflow-hidden my-auto shrink-0">
        <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-primary-100">
          <i className="fa-solid fa-lock text-3xl text-primary-500"></i>
        </div>
        
        <h2 className="text-2xl font-display font-bold text-dark-900 mb-3">Premium Notes Locked</h2>
        <p className="text-dark-500 mb-8 max-w-md">Detailed PDF notes and study materials are exclusively available for premium members. Choose a plan to unlock!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4 text-left">
          {/* Notes Pass Card */}
          <div className="bg-white border border-dark-200 hover:border-primary-300 rounded-2xl p-5 shadow-sm transition-all flex flex-col">
            <h3 className="font-bold text-dark-900 text-lg mb-1">Notes Pass</h3>
            <p className="text-xs text-dark-500 mb-4 h-8">Complete access to all subject notes</p>
            <div className="text-2xl font-black text-dark-900 mb-4">₹49 <span className="text-sm font-normal text-dark-400">only</span></div>
            <ul className="text-xs text-dark-600 mb-6 space-y-2 flex-1">
              <li><i className="fa-solid fa-check text-success-500 mr-2"></i> High-Quality PDF Viewer</li>
              <li><i className="fa-solid fa-check text-success-500 mr-2"></i> Lifetime Access</li>
            </ul>
            <button 
              onClick={handleUpgradeNotesPass} 
              className="w-full bg-dark-900 hover:bg-dark-800 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group mt-auto"
            >
              Get Notes Pass
            </button>
          </div>

          {/* Elite Plan Card */}
          <div className="bg-gradient-to-br from-primary-50 to-white border-2 border-primary-400 rounded-2xl p-5 shadow-sm transition-all flex flex-col relative">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-xl shadow-md animate-pulse">
              67% OFF TODAY
            </div>
            <h3 className="font-bold text-primary-700 text-lg mb-1 flex items-center gap-2">
              <i className="fa-solid fa-crown"></i> Elite Plan
            </h3>
            <p className="text-xs text-dark-500 mb-4 h-8">Everything in Pro + Premium Advantages</p>
            <div className="flex items-end gap-2 mb-4">
               <div className="text-2xl font-black text-primary-600">₹{Math.round((elitePlan?.amount || 499) * 0.33)}</div>
               <div className="text-sm text-dark-400 line-through decoration-red-500 font-medium mb-1">₹{elitePlan?.amount}</div>
            </div>
            <ul className="text-xs text-dark-700 mb-6 space-y-2 flex-1">
              <li><i className="fa-solid fa-check text-primary-500 mr-2"></i> Unlimited MCQs & Mocks</li>
              <li><i className="fa-solid fa-check text-primary-500 mr-2"></i> AI Analytics & Weak Topic Analysis</li>
            </ul>
            <button 
              onClick={handleUpgradeElite} 
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary-600/30 flex items-center justify-center gap-2 group mt-auto"
            >
              Upgrade to Elite <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Reset states when note changes
  useEffect(() => {
    setZoom(100);
  }, [selectedNote]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!subjectId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/notes?subjectId=${subjectId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => {
        if (json.data) {
          setNotes(json.data);
          if (json.data.length > 0) {
            setSelectedNote(json.data[0]);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch notes", err);
        setLoading(false);
      });
  }, [subjectId]);

  // Screenshot & Content Protection Blocker
  useEffect(() => {
    const hideContent = () => {
      const container = document.getElementById('notes-protection-container');
      if (container) {
        container.style.opacity = '0';
        container.style.filter = 'blur(20px)';
      }
    };

    const showContent = () => {
      const container = document.getElementById('notes-protection-container');
      if (container) {
        container.style.opacity = '1';
        container.style.filter = 'none';
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Aggressively hide on modifier keys used for screenshots (Win/Cmd, Alt) 
      // This hides the content BEFORE the OS freezes the screen for Snipping Tool
      if (e.key === 'Meta' || e.key === 'Alt' || e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        hideContent();
      }

      // Block PrintScreen specifically
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        e.preventDefault();
      }
      
      // Block Ctrl/Cmd + P (Print) and Ctrl/Cmd + S (Save)
      if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'p' || e.key.toLowerCase() === 's')) {
        e.preventDefault();
      }

      // Block Mac screenshot shortcuts (Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5)
      // and Windows Snipping Tool (Win+Shift+S) just in case
      if ((e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5' || e.key.toLowerCase() === 's'))) {
        hideContent();
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      
      // Restore content when modifier keys are released (only if window still has focus)
      if (e.key === 'Meta' || e.key === 'Alt' || e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        if (document.hasFocus()) {
          showContent();
        }
      }
    };

    // Hide content on window blur (when Snipping Tool or other apps take focus)
    const handleBlur = () => hideContent();
    const handleFocus = () => showContent();
    
    const handleVisibilityChange = () => {
      if (document.hidden) hideContent();
      else if (document.hasFocus()) showContent();
    };
    
    // Prevent copy
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', 'Content is protected by MCQPrepZone.');
      }
    };

    // Prevent dragging images
    const handleDragStart = (e: DragEvent) => e.preventDefault();

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('dragstart', handleDragStart);
      showContent();
    };
  }, []);

  const breadcrumbs = mounted && document.getElementById("topbar-breadcrumbs") ? createPortal(
    <div className="flex items-center gap-1.5 text-[11px] text-dark-500 font-medium">
      <Link href="/dashboard" className="hover:text-primary-600 transition-colors">Home</Link>
      <span>›</span>
      <Link href="/notes" className="hover:text-primary-600 transition-colors">Notes</Link>
      <span>›</span>
      <Link href={`/notes/subjects?examId=${searchParams.get("examId") || ""}`} className="hover:text-primary-600 transition-colors">{examName}</Link>
      <span>›</span>
      <span className="text-dark-800">{subjectName}</span>
      {selectedNote && (
        <>
          <span>›</span>
          <span className="text-primary-600 font-bold max-w-[150px] truncate" title={selectedNote.title}>{selectedNote.title}</span>
        </>
      )}
    </div>,
    document.getElementById("topbar-breadcrumbs")!
  ) : null;



  if (loading) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center bg-dark-50">
        <i className="fa-solid fa-circle-notch fa-spin text-3xl text-primary-600"></i>
      </div>
    );
  }

  return (
    <div 
      id="notes-protection-container"
      className="flex h-[calc(100dvh-80px)] lg:h-[calc(100vh-80px)] bg-[#f8f9fa] font-sans overflow-hidden select-none relative transition-all duration-200"
      onContextMenu={(e) => e.preventDefault()}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { display: none !important; }
        }
      `}} />
      {breadcrumbs}
      
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[90] lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Left Sidebar - Chapters list */}
      <div className={`fixed lg:static inset-y-[80px] lg:inset-y-auto left-0 z-[100] bg-white border-r border-dark-100 flex flex-col h-full shrink-0 transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'w-[280px] sm:w-[320px] translate-x-0 shadow-2xl lg:shadow-none' : 'w-[280px] sm:w-[320px] lg:w-0 -translate-x-full lg:translate-x-0 lg:opacity-0 lg:border-r-0'}`}>
        <div className="p-5">
          {/* Exam Name Dropdown Mock */}
          <div className="flex items-center justify-between mb-1 cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-primary-50 text-primary-600 flex items-center justify-center">
                <i className="fa-solid fa-building-columns"></i>
              </div>
              <h2 className="font-bold text-dark-900 text-sm leading-tight">{examName}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-dark-500 font-bold ml-11 mb-5">
            <span>{notes.length} Chapters</span>
            <span className="w-1 h-1 rounded-full bg-dark-300"></span>
            <span className="text-primary-600">100% Completed</span>
          </div>

          {/* Search bar */}
          <div className="relative mb-5">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 text-sm"></i>
            <input 
              type="text" 
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-50 border border-dark-100 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all placeholder:text-dark-400"
            />
          </div>

          {/* Subject Title */}
          <div className="flex items-center justify-between cursor-pointer group">
             <h3 className="text-sm font-bold text-dark-900 leading-tight">{subjectName}</h3>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-4 hide-scrollbar">
          <div className="space-y-0.5">
            {notes.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase())).map((note, index) => {
              const isActive = selectedNote?.id === note.id;
              return (
                <button
                  key={note.id}
                  onClick={() => {
                    setSelectedNote(note);
                    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                      setIsSidebarOpen(false);
                    }
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                    isActive 
                      ? 'bg-primary-50/50' 
                      : 'hover:bg-dark-50'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    isActive ? 'bg-primary-100 text-primary-700' : 'bg-dark-50 text-dark-500'
                  }`}>
                    {String(notes.findIndex(n => n.id === note.id) + 1).padStart(2, '0')}
                  </div>
                  <span className={`text-xs font-bold line-clamp-2 flex-1 ${isActive ? 'text-primary-700' : 'text-dark-700'}`}>
                    {note.title}
                  </span>
                  {isActive ? (
                    <div className="w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px] shrink-0">
                      <i className="fa-solid fa-check"></i>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-success-400 text-success-500 flex items-center justify-center text-[10px] shrink-0">
                      <i className="fa-solid fa-check"></i>
                    </div>
                  )}
                </button>
              );
            })}
            
            {notes.length === 0 && (
              <div className="p-4 text-center text-sm text-dark-400">
                No notes available.
              </div>
            )}
          </div>
        </div>
        
        {/* Study Progress */}
        <div className="p-5 border-t border-dark-100">
           <h3 className="text-xs font-bold text-dark-900 mb-4">Study Progress</h3>
           <div className="flex items-center gap-4 mb-5">
              <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                 <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                    <path className="text-dark-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path className="text-primary-600" strokeDasharray={`${notes.length > 0 ? Math.round(((notes.findIndex(n => n.id === selectedNote?.id) + 1) / notes.length) * 100) : 0}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                 </svg>
                 <span className="absolute text-[11px] font-bold text-dark-900">{notes.length > 0 ? Math.round(((notes.findIndex(n => n.id === selectedNote?.id) + 1) / notes.length) * 100) : 0}%</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-dark-700">{(notes.findIndex(n => n.id === selectedNote?.id) + 1) || 0} / {notes.length || 0} Topics Completed</p>
                <div className="w-full bg-dark-100 h-1.5 rounded-full mt-2">
                  <div className="bg-primary-600 h-1.5 rounded-full" style={{width: `${notes.length > 0 ? Math.round(((notes.findIndex(n => n.id === selectedNote?.id) + 1) / notes.length) * 100) : 0}%`}}></div>
                </div>
              </div>
           </div>
           
           {/* Content Protection Note */}
           <div className="mt-4 p-3 bg-primary-50/50 rounded-xl border border-primary-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-5 text-primary-600 text-3xl">
               <i className="fa-solid fa-shield-halved"></i>
             </div>
             <div className="relative z-10 flex items-start gap-2">
               <i className="fa-solid fa-shield-halved text-primary-600 mt-0.5 text-xs"></i>
               <p className="text-[9px] text-dark-600 leading-tight">
                 Content is protected by MCQPrepZone. Copying or downloading is restricted.
               </p>
             </div>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      {isFullscreen && mounted ? createPortal(
        <div className="fixed inset-0 z-[99999] bg-[#f8f9fa] flex flex-col group/fullscreen">
          {/* PDF Viewer Container - Fullscreen style (no borders/radius) */}
          <div className="w-full h-full bg-white flex flex-col overflow-hidden relative">
            {/* Toolbar */}
            <div className="h-14 border-b border-dark-50 bg-white flex items-center justify-between px-6 shrink-0">
               {/* Left */}
               <div className="flex-1 flex justify-start">
                 <div className="flex items-center gap-2 border border-dark-200 rounded-lg px-3 py-1.5 text-xs font-bold bg-white text-dark-700">
                   A4
                 </div>
               </div>
               
               {/* Center */}
               <div className="flex-1 flex justify-center items-center gap-4">
                 <div className="flex items-center gap-3">
                   <button onClick={() => setZoom(z => Math.max(z - 10, 50))} className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors text-dark-600 hover:bg-dark-50"><i className="fa-solid fa-minus"></i></button>
                   <span className="text-sm font-bold w-12 text-center text-dark-900">{zoom}%</span>
                   <button onClick={() => setZoom(z => Math.min(z + 10, 250))} className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors text-dark-600 hover:bg-dark-50"><i className="fa-solid fa-plus"></i></button>
                 </div>
                 <div className="flex items-center gap-1 border border-dark-200 rounded-lg p-1 text-xs font-bold bg-white text-dark-700">
                   <button onClick={() => setIsTwoPage(false)} className={`w-8 h-8 rounded-md transition-colors ${!isTwoPage ? 'bg-primary-50 text-primary-600' : 'text-dark-500 hover:bg-dark-50'}`} title="Single Page View"><i className="fa-solid fa-file-lines"></i></button>
                   <button onClick={() => setIsTwoPage(true)} className={`w-8 h-8 rounded-md transition-colors ${isTwoPage ? 'bg-primary-50 text-primary-600' : 'text-dark-500 hover:bg-dark-50'}`} title="Two Page View"><i className="fa-solid fa-book-open"></i></button>
                 </div>
               </div>

               {/* Right */}
               <div className="flex-1 flex justify-end">
                 <button onClick={() => setIsFullscreen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors text-dark-600 hover:bg-dark-50" title="Exit Fullscreen">
                    <i className="fa-solid fa-compress"></i>
                 </button>
               </div>
            </div>
            
            {/* The Document */}
            <div className="flex-1 overflow-hidden hide-scrollbar flex justify-center pt-2 bg-dark-50">
              {selectedNote ? (
                canAccessNote ? (
                  <div className="transition-transform duration-200 ease-out flex justify-center h-full w-full">
                    <div style={{ width: '100%', height: '100%' }}>
                      <PDFViewer fileUrl={selectedNote.pdfUrl} zoom={zoom} twoPageMode={isTwoPage} />
                    </div>
                  </div>
                ) : (
                  renderUpgradeOverlay()
                )
              ) : (
                <div className="flex items-center justify-center h-full w-full text-dark-400 bg-white max-w-3xl">
                  Select a note from the left sidebar to view it here.
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      ) : (
        <div className="flex-1 flex flex-col h-full overflow-hidden px-0 sm:px-3 lg:px-8 pb-20 sm:pb-6 lg:pb-8 pt-0 relative bg-[#f8f9fa]">
          {/* PDF Viewer Container */}
          <div className="w-full h-full flex flex-col overflow-hidden relative bg-white border-dark-100 sm:rounded-b-2xl shadow-sm border-b sm:border-l sm:border-r">
            {/* Toolbar */}
            <div className="h-14 border-b flex items-center justify-between px-3 sm:px-6 shrink-0 border-dark-50 bg-white">
               {/* Left */}
               <div className="flex-1 flex justify-start items-center gap-2 sm:gap-4">
                 <button 
                   onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                   className="w-8 h-8 flex items-center justify-center rounded-lg text-dark-600 hover:bg-dark-50 transition-colors shrink-0"
                   title="Toggle Sidebar"
                 >
                   <i className="fa-solid fa-bars"></i>
                 </button>
                 <div className="hidden sm:flex items-center gap-2 border rounded-lg px-3 py-1.5 text-xs font-bold bg-white border-dark-200 text-dark-700">
                   A4
                 </div>
               </div>
               
               {/* Center */}
               <div className="flex items-center gap-4">
                  <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="w-8 h-8 flex items-center justify-center text-dark-500 hover:bg-dark-50 hover:text-dark-900 rounded-lg transition-colors"><i className="fa-solid fa-minus"></i></button>
                  <span className="text-xs font-bold text-dark-800 min-w-[3rem] text-center">{zoom}%</span>
                  <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="w-8 h-8 flex items-center justify-center text-dark-500 hover:bg-dark-50 hover:text-dark-900 rounded-lg transition-colors"><i className="fa-solid fa-plus"></i></button>
               </div>
               
               {/* Right */}
               <div className="flex-1 flex justify-end gap-2">
                 <button 
                   onClick={() => setIsTwoPage(!isTwoPage)}
                   className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${isTwoPage ? 'bg-primary-50 text-primary-600' : 'text-dark-500 hover:bg-dark-50'}`}
                   title="Toggle two-page view"
                 >
                   <i className="fa-solid fa-book-open"></i>
                 </button>
                 <button onClick={() => setIsFullscreen(true)} className="w-8 h-8 flex items-center justify-center text-dark-500 hover:bg-dark-50 rounded-lg transition-colors"><i className="fa-solid fa-expand"></i></button>
               </div>
            </div>

            {/* Main Note View */}
            <div className="flex-1 overflow-hidden hide-scrollbar flex justify-center pt-2 bg-dark-50">
              {selectedNote ? (
                canAccessNote ? (
                  <div className="transition-transform duration-200 ease-out flex justify-center h-full w-full">
                    <div style={{ width: '100%', height: '100%' }}>
                      <PDFViewer fileUrl={selectedNote.pdfUrl} zoom={zoom} twoPageMode={isTwoPage} />
                    </div>
                  </div>
                ) : (
                  renderUpgradeOverlay()
                )
              ) : (
                <div className="flex items-center justify-center h-full w-full text-dark-400 bg-white max-w-3xl">
                  Select a note from the left sidebar to view it here.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NotesViewPage() {
  return (
    <Suspense fallback={<div className="h-[calc(100vh-80px)] flex items-center justify-center"><i className="fa-solid fa-circle-notch fa-spin text-2xl text-primary-600"></i></div>}>
      <NotesViewContent />
    </Suspense>
  );
}
