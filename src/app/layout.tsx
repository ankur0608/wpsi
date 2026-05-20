import type { Metadata } from "next";
import "./globals.css";
import DashboardLayout from "@/components/DashboardLayout";

export const metadata: Metadata = {
  title: "ExamPro - Elite Government Exam Preparation",
  description: "Prepare for Wireless PSI, GPSC, Talati, and SSC with premium mock tests, AI study planner, and interactive MCQ practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-dark-bg text-slate-50 min-h-screen selection:bg-brand-500 selection:text-white relative">
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}
