"use client";

import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { useUser } from "@/context/UserContext";

// Set worker source to use CDN to prevent bundler and mobile issues
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
}

interface PDFViewerProps {
  fileUrl: string;
  zoom?: number;
  twoPageMode?: boolean;
  viewMode?: "A4" | "PPT";
}

export default function PDFViewer({ fileUrl, zoom = 100, twoPageMode = false, viewMode = "A4" }: PDFViewerProps) {
  const { user } = useUser();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState("");
  const renderTaskRef = useRef<any>(null);
  const rightRenderTaskRef = useRef<any>(null);

  // Load PDF
  useEffect(() => {
    let active = true;
    const loadPdf = async () => {
      try {
        const proxyUrl = `/api/proxy-pdf?url=${encodeURIComponent(fileUrl)}`;
        const loadingTask = pdfjsLib.getDocument({ url: proxyUrl });
        const pdf = await loadingTask.promise;
        if (active) {
          setPdfDoc(pdf);
          setNumPages(pdf.numPages);
          setPageNum(1);
        }
      } catch (err: any) {
        console.error("PDF Load Error:", err);
        if (active) setError(err.message || "Failed to load PDF");
      }
    };
    if (fileUrl) {
      loadPdf();
    } else {
      setError("No PDF URL provided for this note");
    }
    return () => { active = false; };
  }, [fileUrl]);

  // Render Page
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    
    let active = true;
    const renderPage = async () => {
      setRendering(true);
      try {
        const renderSinglePage = async (pageNumber: number, canvas: HTMLCanvasElement | null, taskRef: any) => {
          if (!canvas) return;
          if (taskRef.current) {
            try { taskRef.current.cancel(); } catch (e) {}
          }
          if (pageNumber > numPages) {
            canvas.width = 0;
            canvas.height = 0;
            return;
          }
          const page = await pdfDoc.getPage(pageNumber);
          if (!active) return;
          
          // Render at a high fixed scale for sharpness (responsive scaling handled by CSS)
          const viewport = page.getViewport({ scale: 2.0 });
          const context = canvas.getContext("2d");
          if (!context) return;
          
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          
          const renderTask = page.render({ canvasContext: context, viewport });
          taskRef.current = renderTask;
          
          await renderTask.promise;
          taskRef.current = null;
        };

        const actualTwoPageMode = twoPageMode && viewMode !== 'PPT';
        if (actualTwoPageMode) {
          await Promise.all([
            renderSinglePage(pageNum, canvasRef.current, renderTaskRef),
            renderSinglePage(pageNum + 1, rightCanvasRef.current, rightRenderTaskRef)
          ]);
        } else {
          await renderSinglePage(pageNum, canvasRef.current, renderTaskRef);
        }
      } catch (err: any) {
        if (err.name !== 'RenderingCancelledException') {
          console.error("Render error", err);
        }
      } finally {
        if (active) setRendering(false);
      }
    };
    
    renderPage();
    return () => { active = false; };
  }, [pdfDoc, pageNum, twoPageMode, numPages, viewMode]);

  const actualTwoPageMode = twoPageMode && viewMode !== 'PPT';
  const step = actualTwoPageMode ? 2 : 1;
  const goPrev = () => setPageNum(p => Math.max(1, p - step));
  const goNext = () => setPageNum(p => Math.min(numPages, p + step));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        setPageNum(p => Math.min(numPages, p + step));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        setPageNum(p => Math.max(1, p - step));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [numPages, step]);

  return (
    <div className={`relative w-full h-full ${viewMode === 'PPT' ? 'bg-[#222]' : 'bg-dark-50'} flex flex-col overflow-hidden`}>
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white z-50 text-center">
          <div className="w-20 h-20 mb-6 bg-danger-50 text-danger-500 rounded-full flex items-center justify-center">
             <i className="fa-solid fa-file-circle-xmark text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold text-dark-900 mb-2">Unable to load document</h3>
          <p className="text-sm text-dark-500 max-w-sm mx-auto mb-8">
            We couldn't load the PDF right now. This might be due to a slow network connection or a temporary server issue. Please check your connection and try again.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-[0_4px_20px_-5px_rgba(var(--primary-600),0.4)] hover:shadow-[0_8px_25px_-5px_rgba(var(--primary-600),0.5)] flex items-center gap-2"
          >
            <i className="fa-solid fa-rotate-right"></i>
            Try Again
          </button>
        </div>
      )}
      
      {!pdfDoc && !error && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <i className="fa-solid fa-circle-notch fa-spin text-3xl text-primary-600"></i>
        </div>
      )}

        {pdfDoc && (
        <>
          {/* Forensic Watermark Overlay */}
          <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden flex flex-wrap content-start justify-start gap-8 opacity-[0.035] select-none" aria-hidden="true">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="-rotate-45 text-2xl font-black text-dark-900 whitespace-nowrap tracking-widest" style={{ marginLeft: i % 2 === 0 ? '0' : '50px' }}>
                {user?.name || 'Protected'} • {user?.email || 'MCQPrepZone'}
              </div>
            ))}
          </div>

          {/* Navigation Overlay (Left) */}
          <button
            onClick={goPrev}
            disabled={pageNum <= 1}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center transition-all ${pageNum <= 1 ? 'opacity-0 cursor-default pointer-events-none' : 'hover:scale-110'}`}
          >
            <div className="w-14 h-14 rounded-full bg-dark-900/50 hover:bg-dark-900/80 text-white flex items-center justify-center shadow-lg backdrop-blur-sm">
              <i className="fa-solid fa-chevron-left text-2xl"></i>
            </div>
          </button>
          
          {/* Navigation Overlay (Right) */}
          <button
            onClick={goNext}
            disabled={pageNum >= (actualTwoPageMode ? numPages - 1 : numPages)}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center transition-all ${pageNum >= (actualTwoPageMode ? numPages - 1 : numPages) ? 'opacity-0 cursor-default pointer-events-none' : 'hover:scale-110'}`}
          >
            <div className="w-14 h-14 rounded-full bg-dark-900/50 hover:bg-dark-900/80 text-white flex items-center justify-center shadow-lg backdrop-blur-sm">
              <i className="fa-solid fa-chevron-right text-2xl"></i>
            </div>
          </button>

          {/* Page Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-dark-900/80 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-sm z-40 shadow-lg">
            {actualTwoPageMode ? `${pageNum}-${Math.min(pageNum + 1, numPages)}` : pageNum} / {numPages}
          </div>

          <div className={`flex-1 w-full overflow-auto hide-scrollbar relative z-10 ${viewMode === 'PPT' ? 'flex flex-col' : ''}`}>
            <div className={`min-h-full ${viewMode === 'PPT' ? 'flex-1 flex p-0' : 'min-w-max p-4 md:p-8 flex items-start justify-center'} relative`}>
            
              <div 
                className={`relative flex ${actualTwoPageMode ? 'gap-1' : ''} mx-auto ${viewMode === 'PPT' ? 'my-auto justify-center items-center' : ''}`} 
                style={{ 
                  opacity: rendering ? 0.7 : 1,
                  transition: 'opacity 0.3s, width 0.2s, height 0.2s',
                  width: viewMode === 'PPT' ? `${zoom}%` : 'auto',
                  height: viewMode === 'PPT' ? `${zoom}%` : 'auto',
                }}
              >
                {/* Left/Single Page */}
                <div className={`shadow-2xl bg-white border border-dark-200 flex items-center justify-center relative ${viewMode === 'PPT' ? 'w-full h-full shadow-none border-none bg-transparent' : 'shrink-0'}`}>
                  <canvas 
                    ref={canvasRef} 
                    style={{ 
                      display: 'block', 
                      width: viewMode === 'PPT' ? '100%' : 'auto', 
                      height: viewMode === 'PPT' ? '100%' : 'auto',
                      maxWidth: viewMode === 'PPT' ? '100%' : `${actualTwoPageMode ? zoom / 2 : zoom}%`,
                      maxHeight: viewMode === 'PPT' ? '100%' : `${85 * (zoom / 100)}vh`,
                      objectFit: viewMode === 'PPT' ? 'contain' : 'fill',
                      transition: 'max-width 0.2s ease-out, max-height 0.2s ease-out'
                    }} 
                  />
                </div>
                
                {/* Right Page (Two Page Mode) */}
                {actualTwoPageMode && (
                  <div className="shadow-2xl bg-white border border-dark-200 shrink-0 flex items-center justify-center relative">
                    <canvas 
                      ref={rightCanvasRef} 
                      style={{ 
                        display: 'block', 
                        width: 'auto', 
                        height: 'auto',
                        maxWidth: `${actualTwoPageMode ? zoom / 2 : zoom}%`,
                        maxHeight: `${85 * (zoom / 100)}vh`,
                        transition: 'max-width 0.2s ease-out, max-height 0.2s ease-out'
                      }} 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
