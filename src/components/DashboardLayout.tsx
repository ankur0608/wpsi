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

  const isAuthPage = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/faq', '/terms', '/privacy', '/contact', '/refund-policy', '/shipping-policy', '/about', '/features', '/pricing', '/blog', '/testimonials', '/cancellation'].includes(pathname) || pathname.startsWith('/blog/');

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
