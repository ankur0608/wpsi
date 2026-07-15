import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import DashboardLayout from "@/components/DashboardLayout";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  weight: ["500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL('https://mcqprepzone.online'),
  title: {
    default: "Wireless PSI Mock Test & Exam Prep | Mcqprepzone",
    template: "%s | Mcqprepzone"
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
    "Mcqprepzone"
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo.jpeg',
    shortcut: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
  openGraph: {
    title: "Wireless PSI Mock Test & Exam Prep | Mcqprepzone",
    description: "Prepare for Gujarat Government exams like Wireless PSI, GPSC Class 1/2, Talati, and SSC CGL. Access premium mock tests, previous year papers, an AI-driven study planner, and interactive MCQ practice designed for your ultimate exam success.",
    url: 'https://mcqprepzone.online',
    siteName: 'Mcqprepzone',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Wireless PSI Mock Test & Exam Prep | Mcqprepzone",
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
    <html lang="en" className={`scroll-smooth antialiased ${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Mcqprepzone",
              "url": "https://mcqprepzone.online",
              "description": "Premium mock tests, AI study planner, and interactive MCQ practice for students preparing for GPSC, SSC, and other government exams.",
              "sameAs": [
                "https://twitter.com/mcqprepzone",
                "https://facebook.com/mcqprepzone",
                "https://instagram.com/mcqprepzone"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen relative">
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Force light mode theme
                document.documentElement.classList.add('light-mode');
                document.documentElement.classList.remove('dark-mode');
                // Restore appearance settings
                var appearance = localStorage.getItem('wpsi-settings-appearance');
                if (appearance) {
                  var parsed = JSON.parse(appearance);
                  if (parsed.reducedMotion) document.documentElement.classList.add('reduced-motion');
                  if (parsed.compactCards) document.documentElement.classList.add('compact-mode');
                  if (parsed.accent) document.documentElement.classList.add('theme-' + parsed.accent.toLowerCase());
                } else {
                  document.documentElement.classList.add('theme-indigo');
                }
              } catch(e) {}
            `
          }}
        />
        <ThemeProvider>
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
