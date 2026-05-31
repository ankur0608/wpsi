import type { Metadata } from "next";
import "./globals.css";
import DashboardLayout from "@/components/DashboardLayout";

export const metadata: Metadata = {
  metadataBase: new URL('https://mcqprepzone.online'),
  title: {
    default: "ExamPro - Elite Government Exam Preparation",
    template: "%s | ExamPro"
  },
  description: "Prepare for Gujarat Government exams like Wireless PSI, GPSC Class 1/2, Talati, and SSC CGL. Access premium mock tests, previous year papers, an AI-driven study planner, and interactive MCQ practice designed for your ultimate exam success.",
  keywords: [
    "Wireless PSI exam",
    "Wireless PSI mock tests",
    "Wireless PSI syllabus",
    "GPSC preparation",
    "GPSC mock tests",
    "GPSC previous year papers",
    "Talati exam preparation",
    "Talati mock test",
    "SSC CGL practice",
    "SSC CHSL mock tests",
    "Gujarat government exams",
    "Gujarat police exam",
    "government exams preparation",
    "MCQ test preparation",
    "online exam portal",
    "competitive exams MCQs",
    "students test prep",
    "police sub inspector exam",
    "GSSSB exams",
    "Gujarat competitive exams",
    "ExamPro"
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ExamPro - Elite Government Exam Preparation",
    description: "Prepare for Gujarat Government exams like Wireless PSI, GPSC Class 1/2, Talati, and SSC CGL. Access premium mock tests, previous year papers, an AI-driven study planner, and interactive MCQ practice designed for your ultimate exam success.",
    url: 'https://mcqprepzone.online',
    siteName: 'ExamPro',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ExamPro - Elite Government Exam Preparation",
    description: "Prepare for Gujarat Government exams like Wireless PSI, GPSC Class 1/2, Talati, and SSC CGL. Access premium mock tests, previous year papers, an AI-driven study planner, and interactive MCQ practice designed for your ultimate exam success.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "ExamPro",
              "url": "https://mcqprepzone.online",
              "description": "Premium mock tests, AI study planner, and interactive MCQ practice for students preparing for GPSC, SSC, and other government exams.",
              "sameAs": [
                "https://twitter.com/exampro",
                "https://facebook.com/exampro",
                "https://instagram.com/exampro"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen relative" style={{ background: "#0D1B2A", color: "#F2ECD9" }}>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}
