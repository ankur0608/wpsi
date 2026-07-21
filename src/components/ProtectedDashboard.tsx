"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { UserProvider, useUser } from '@/context/UserContext';

import MobileBottomTab from './MobileBottomTab';

interface ProtectedDashboardProps {
  children: React.ReactNode;
}

function ProtectedShell({ children }: ProtectedDashboardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useUser();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const isReceiptPage = pathname?.includes('/dashboard/payments/receipt/');

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, router, user]);

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }

    document.body.style.overflow = '';
  }, [isMobileSidebarOpen]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="rounded-3xl px-8 py-10 text-center max-w-md w-full" style={{ background: "var(--bg-surface)", border: "1px solid rgba(59, 130, 246, 0.16)" }}>
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(59, 130, 246, 0.12)", border: "1px solid rgba(59, 130, 246, 0.22)", color: "#3b82f6" }}>
            <i className="fa-solid fa-shield-halved text-xl"></i>
          </div>
          <h2 className="text-xl font-heading font-bold" style={{ color: "var(--text-primary)" }}>Checking your session</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>We are verifying your login and loading your dashboard.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={`text-dark-800 font-sans antialiased flex h-screen overflow-hidden selection:bg-primary-200 selection:text-primary-900 w-full bg-dark-50 ${isReceiptPage ? 'bg-white' : ''} print:block print:h-auto print:overflow-visible print:bg-white`}>
      {!isReceiptPage && (
        <Sidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
      )}
      <main id="nav-main-wrapper" className={`flex-1 overflow-y-auto ${isReceiptPage ? 'bg-white' : 'bg-dark-50'} relative flex flex-col hide-scrollbar lg:pb-0 ${isReceiptPage ? 'pb-0' : 'pb-20'} print:block print:overflow-visible print:bg-white print:p-0 print:m-0 print:h-auto`}>
        {!isReceiptPage && (
          <div className="print:hidden">
            <Topbar onMenuClick={() => setIsMobileSidebarOpen((current) => !current)} />
          </div>
        )}
        <div className="flex-1 print:block">
          {children}
        </div>
        {!isReceiptPage && (
          <div className="print:hidden">
            <MobileBottomTab />
          </div>
        )}
      </main>
    </div>
  );
}

export default function ProtectedDashboard({ children }: ProtectedDashboardProps) {
  return <ProtectedShell>{children}</ProtectedShell>;
}
