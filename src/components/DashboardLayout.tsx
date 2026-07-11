"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const ProtectedDashboard = dynamic(() => import('./ProtectedDashboard'), {
  ssr: false,
});

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const isAuthPage = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/faq', '/terms', '/privacy', '/contact', '/refund-policy', '/shipping-policy', '/about', '/features', '/pricing', '/blog', '/testimonials', '/cancellation'].includes(pathname) || pathname.startsWith('/blog/');

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <ProtectedDashboard>{children}</ProtectedDashboard>
  );
};

export default DashboardLayout;
