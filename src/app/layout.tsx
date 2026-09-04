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
    default: "Competitive Exams Mock Test & Exam Prep | Mcqprepzone",
    template: "%s | Mcqprepzone"
  },
  description: "Prepare for Gujarat Government exams like CCE, WPSI, GPSC Class 1/2, Talati, and SSC CGL. Access premium mock tests, previous year papers, an AI-driven study planner, and interactive MCQ practice designed for your ultimate exam success.",
  keywords: [
    "Gujarat Government Exams Preparation",
    "Competitive Exams MCQ Test Series",
    "GPSC, CCE & WPSI Practice Tests",
    "Gujarat Police & GSSSB Exam Mock Tests",
    "Online Exam Portal Gujarat",
    "CCE exam practice",
    "WPSI exam preparation",
    "Wireless PSI exam",
    "GPSC preparation",
    "GPSC mock tests",
    "Talati exam preparation",
    "SSC CGL practice",
    "Gujarat government exams",
    "police sub inspector exam",
    "GSSSB exams",
    "Gujarat Class 3 exams preparation",
    "Gujarat Police Constable mock test",
    "PSI ASI exam practice",
    "Maru Gujarat study material",
    "OJAS Gujarat updates",
    "Free MCQ test series Gujarat",
    "Previous year question papers Gujarat",
    "Daily current affairs Gujarat",
    "GSSSB CCE mock tests",
    "Gujarat Govt Jobs prep",
    "competitive exams AI planner",
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
    title: "Competitive Exams Mock Test & Exam Prep | Mcqprepzone",
    description: "Prepare for Gujarat Government exams like CCE, WPSI, GPSC Class 1/2, Talati, and SSC CGL. Access premium mock tests, previous year papers, an AI-driven study planner, and interactive MCQ practice designed for your ultimate exam success.",
    url: 'https://mcqprepzone.online',
    siteName: 'Mcqprepzone',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Competitive Exams Mock Test & Exam Prep | Mcqprepzone",
    description: "Prepare for Gujarat Government exams like CCE, WPSI, GPSC Class 1/2, Talati, and SSC CGL. Access premium mock tests, previous year papers, an AI-driven study planner, and interactive MCQ practice designed for your ultimate exam success.",
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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5233930178708759" crossOrigin="anonymous"></script>
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
      <body className="min-h-[100dvh] overscroll-none relative">
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Force light mode theme
                document.documentElement.classList.add('light-mode');
                document.documentElement.classList.remove('dark-mode');
                // Restore appearance settings
                var appearance = localStorage.getItem('mcq-settings-appearance');
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
