"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { UserProvider } from '@/context/UserContext';

const ProtectedDashboard = dynamic(() => import('./ProtectedDashboard'), {
  ssr: false,
});

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const isAuthPage = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/faq', '/terms', '/privacy', '/contact', '/about', '/features', '/pricing', '/blog', '/testimonials', '/cancellation', '/daily-challenge', '/support', '/government-exams'].includes(pathname) || pathname.startsWith('/blog/') || pathname.startsWith('/government-exams');

  return (
    <UserProvider>
      {isAuthPage ? (
        <>{children}</>
      ) : (
        <ProtectedDashboard>{children}</ProtectedDashboard>
      )}
    </UserProvider>
  );
};

export default DashboardLayout;
