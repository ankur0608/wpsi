"use client";
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { UserProvider, useUser } from '@/context/UserContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function ProtectedShell({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, router, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6">
        <div className="glass-card rounded-3xl border border-white/10 px-8 py-10 text-center max-w-md w-full">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 bg-brand-500/15 border border-brand-500/20 flex items-center justify-center text-brand-400">
            <i className="fa-solid fa-shield-halved text-xl"></i>
          </div>
          <h2 className="text-xl font-heading font-bold text-white">Checking your session</h2>
          <p className="mt-2 text-sm text-slate-400">We are verifying your login and loading your dashboard.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden w-full bg-dark-bg">
      <Sidebar />
      <main id="nav-main-wrapper" className="flex-1 flex flex-col h-full overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8 relative">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const isAuthPage = ['/', '/login', '/register'].includes(pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <UserProvider>
      <ProtectedShell>{children}</ProtectedShell>
    </UserProvider>
  );
};

export default DashboardLayout;
