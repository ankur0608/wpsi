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

  const isAuthPage = ['/', '/login', '/register', '/faq', '/terms', '/privacy', '/contact', '/refund-policy', '/shipping-policy'].includes(pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <ProtectedDashboard>{children}</ProtectedDashboard>
  );
};

export default DashboardLayout;
