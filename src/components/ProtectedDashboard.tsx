"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { UserProvider, useUser } from '@/context/UserContext';

interface ProtectedDashboardProps {
  children: React.ReactNode;
}

function ProtectedShell({ children }: ProtectedDashboardProps) {
  const router = useRouter();
  const { user, loading } = useUser();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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
        <div className="rounded-3xl px-8 py-10 text-center max-w-md w-full" style={{ background: "var(--bg-surface)", border: "1px solid rgba(212,146,42,0.16)" }}>
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(212,146,42,0.12)", border: "1px solid rgba(212,146,42,0.22)", color: "#D4922A" }}>
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
    <div className="flex h-screen overflow-hidden w-full" style={{ background: "var(--bg-primary)" }}>
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <main id="nav-main-wrapper" className="flex-1 flex flex-col h-full overflow-hidden">
        <Topbar onMenuClick={() => setIsMobileSidebarOpen((current) => !current)} />
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8 relative">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ProtectedDashboard({ children }: ProtectedDashboardProps) {
  return (
    <UserProvider>
      <ProtectedShell>{children}</ProtectedShell>
    </UserProvider>
  );
}
