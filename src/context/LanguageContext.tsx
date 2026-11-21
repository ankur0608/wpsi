"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'gu' | 'hi';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
];

export const translations = {
  en: {
    // Navbar
    navHome: "Home",
    navGovtExams: "Govt Exams",
    navFeatures: "Features",
    navPricing: "Pricing",
    navBlogs: "Blogs",
    navAbout: "About",
    navContact: "Contact",
    navLogin: "Login",
    navGetStarted: "Get Started",
    navDashboard: "Dashboard",
    navLive: "Live",
    navSpecialised: "Exams Specialised",
    selectLanguage: "Language",

    // Hero Section
    heroBadge: "India's Smartest Competitive Exams Platform",
    heroTitle1: "Master the Syllabus.",
    heroTitle2: "Crack Competitive Exams.",
    heroSubtitle: "Elevate your preparation with topic-wise MCQs, high-fidelity mock tests, and actionable AI-driven performance analytics.",
    heroStartFree: "Start Practicing Free",
    heroExploreExams: "Explore Government Exams",
    heroCorrectAnswer: "Correct Answer!",
    heroStreak: "12 Day Streak",
    heroTopPercent: "Top 5%",

    // Daily Challenge
    challengeBadge: "Daily Consistency",
    challengeTitle: "Practice 20 MCQs Every Day",
    challengeSubtitle: "Build consistency and improve your ranking by solving 20 daily MCQs designed according to the latest Competitive Exams syllabus.",
    challengeBenefit1: "Instant percentile and ranking among thousands of peers",
    challengeBenefit2: "Step-by-step concept breakdown for every question",
    challengeBenefit3: "Daily streaks to build disciplined study habits",
    challengeButton: "Join Today's Free Challenge",
    challengeCardTitle: "Daily Challenge",
    challengeActiveNow: "Active now",

    // Features Section
    featuresHeading: "Why Choose MCQ Prep Zone?",
    featuresSubheading: "Everything you need to crack the Gujarat Competitive Exams exam.",
    feature1Title: "Topic-wise Practice",
    feature1Desc: "Practice chapter by chapter, concept by concept, covering the entire official syllabus.",
    feature2Title: "Instant Explanations",
    feature2Desc: "Understand concepts deeply with detailed explanations immediately after answering.",
    feature3Title: "Deep Analytics",
    feature3Desc: "Track your strengths and weaknesses with actionable insights and detailed data.",

    // Exam Pattern Section
    examPatternBadge: "Competitive Exams Exam Pattern",
    examPatternTitle1: "Know the Exam",
    examPatternTitle2: "Before You Prepare",
    partA: "Part A: Non-Technical",
    partAQuestions: "80 Questions · 80 Marks",
    partB: "Part B: Technical / Specialised",
    partBQuestions: "120 Questions · 120 Marks",
    crucialSection: "Crucial Section",
    rulesTitle: "Important Rules",
    negativeMarking: "Negative Marking",
    negativeDesc: "-0.25 marks for every wrong answer.",
    examDuration: "Exam Duration",
    examDurationDesc: "3 Hours (180 Minutes) total test time.",

    // Subjects Section
    subjectsBadge: "Practice by Subjects",
    subjectsTitle: "Master Every Subject of Competitive Exams",
    partANonTech: "Part A: Non-Technical",
    subjectReasoning: "Reasoning",
    subjectAptitude: "Quantitative Aptitude",
    subjectConstitution: "Constitution of India",
    subjectCurrentAffairs: "Current Affairs",
    partBTech: "Part B: Technical Specialisation",
    subjectTech: "Technical Engineering",
    subjectElectronics: "Electronics & Communication",
    subjectNetworks: "Computer Networks",
    subjectSecurity: "Network Security & IT",

    // Track Progress Section
    progressBadge: "Real-time Tracking",
    progressTitle: "Track Your Preparation Like a Pro",
    progressSubtitle: "Comprehensive performance metrics show your subject-wise accuracy, speed, and exam readiness.",
    accuracyRate: "Accuracy Rate",
    testsCompleted: "Tests Completed",
    currentRank: "Statewide Rank",

    // FAQ Section
    faqBadge: "Got Questions?",
    faqTitle: "Frequently Asked Questions",
    faqQ1: "Is MCQ Prep Zone free to practice?",
    faqA1: "Yes, basic topic-wise practice is completely free, allowing you to test the platform before upgrading.",
    faqQ2: "Are the questions based on the latest syllabus?",
    faqA2: "Absolutely! All questions strictly follow the latest Gujarat Competitive Exams, GSSSB CCE, and WPSI patterns.",
    faqQ3: "Can I track my test progress and scores?",
    faqA3: "Yes, our platform provides deep analytics including subject-wise breakdown, speed metrics, and weak spot detection.",
    faqQ4: "Do you offer full-length mock tests?",
    faqA4: "Yes, we provide real exam simulation mock tests with official timing and negative marking calculation.",

    // Call To Action Section
    ctaBadge: "Smart MCQ Practice & Test Series",
    ctaTitle: "Start Your Exam Preparation Today",
    ctaSubtitle: "10,000+ Topic-Wise MCQs, Timed CBT Mock Tests & Detailed Solutions.",
    ctaDesc: "Practice with high-yield questions, track your real-time analytics, and master concepts with step-by-step explanations.",
    ctaButton: "Start Practicing Free Now",

    // Footer
    footerDesc: "Practice Topic-wise MCQs, Mock Tests, Previous Year Questions, and Track Your Progress for Gujarat Competitive Exams.",
    footerQuickLinks: "Quick Links",
    footerExplore: "Explore",
    footerLegal: "Legal",
    footerContact: "Contact",
    footerRights: "MCQ Prep Zone Pvt Ltd. All rights reserved.",
  },
  gu: {
    // Navbar
    navHome: "હોમ",
    navGovtExams: "સરકારી પરીક્ષાઓ",
    navFeatures: "વિશેષતાઓ",
    navPricing: "પ્લાન / ફી",
    navBlogs: "બ્લોગ્સ",
    navAbout: "અમારા વિશે",
    navContact: "સંપર્ક",
    navLogin: "લોગિન",
    navGetStarted: "ફ્રી શરૂ કરો",
    navDashboard: "ડેશબોર્ડ",
    navLive: "લાઇવ",
    navSpecialised: "પરીક્ષા વિશેષ",
    selectLanguage: "ભાષા બદલો",

    // Hero Section
    heroBadge: "ગુજરાત અને ભારતનું સૌથી સ્માર્ટ પરીક્ષા તૈયારી પ્લેટફોર્મ",
    heroTitle1: "સિલેબસ પર સંપૂર્ણ પકડ મેળવો.",
    heroTitle2: "સરકારી સ્પર્ધાત્મક પરીક્ષા પાસ કરો.",
    heroSubtitle: "ટોપિક મુજબના MCQs, વાસ્તવિક મોક ટેસ્ટ અને AI-આધારિત પર્ફોર્મન્સ એનાલિટિક્સ સાથે તમારી તૈયારીને શ્રેષ્ઠ બનાવો.",
    heroStartFree: "ફ્રી પ્રેક્ટિસ શરૂ કરો",
    heroExploreExams: "સરકારી પરીક્ષાઓ જુઓ",
    heroCorrectAnswer: "સાચો જવાબ!",
    heroStreak: "૧૨ દિવસની સ્ટ્રીક",
    heroTopPercent: "ટોપ ૫%",

    // Daily Challenge
    challengeBadge: "દૈનિક નિયમિતતા",
    challengeTitle: "દરરોજ ૨૦ MCQs ની પ્રેક્ટિસ કરો",
    challengeSubtitle: "નવા અધિકૃત સિલેબસ મુજબ દરરોજ ૨૦ પ્રશ્નો હલ કરીને તમારી રેન્ક અને તૈયારીને મજબૂત બનાવો.",
    challengeBenefit1: "રાજ્યભરના હજારો વિદ્યાર્થીઓ સાથે ત્વરિત રેન્ક અને પર્સેન્ટાઇલ",
    challengeBenefit2: "દરેક પ્રશ્નનું વિગતવાર સ્ટેપ-બાય-સ્ટેપ સોલ્યુશન",
    challengeBenefit3: "નિયમિત અભ્યાસ માટે અખંડ દૈનિક સ્ટ્રીક સિસ્ટમ",
    challengeButton: "આજનો ફ્રી ચેલેન્જ આપો",
    challengeCardTitle: "દૈનિક ચેલેન્જ",
    challengeActiveNow: "હમણાં ચાલુ છે",

    // Features Section
    featuresHeading: "MCQ Prep Zone શા માટે પસંદ કરવું?",
    featuresSubheading: "ગુજરાત સ્પર્ધાત્મક પરીક્ષાઓ પાસ કરવા માટે જરૂરી તમામ સુવિધાઓ.",
    feature1Title: "ટોપિક મુજબ પ્રેક્ટિસ",
    feature1Desc: "અધિકૃત સિલેબસના દરેક ચેપ્ટર અને કન્સેપ્ટ મુજબ સ્ટેપ-બાય-સ્ટેપ પ્રેક્ટિસ કરો.",
    feature2Title: "ત્વરિત સમજૂતી & સોલ્યુશન",
    feature2Desc: "જવાબ આપ્યા બાદ તરત જ વિગતવાર સમજૂતી મેળવીને તમારા કન્સેપ્ટ મજબૂત કરો.",
    feature3Title: "ઊંડાણપૂર્વક એનાલિટિક્સ",
    feature3Desc: "તમારી મજબૂત અને નબળી બાજુઓને સચોટ ડેટા અને રિપોર્ટ દ્વારા ટ્રેક કરો.",

    // Exam Pattern Section
    examPatternBadge: "પરીક્ષા પદ્ધતિ (Exam Pattern)",
    examPatternTitle1: "તૈયારી શરૂ કરતા પહેલા",
    examPatternTitle2: "પરીક્ષાનું માળખું સમજો",
    partA: "ભાગ A: જનરલ સ્ટડીઝ & એપ્ટિટ્યુડ",
    partAQuestions: "૮૦ પ્રશ્નો · ૮૦ ગુણ",
    partB: "ભાગ B: ટેકનિકલ / સ્પેશિયલાઇઝ્ડ",
    partBQuestions: "૧૨૦ પ્રશ્નો · ૧૨૦ ગુણ",
    crucialSection: "સૌથી મહત્વનો ભાગ",
    rulesTitle: "મહત્વપૂર્ણ નિયમો",
    negativeMarking: "નેગેટિવ માર્કિંગ",
    negativeDesc: "દરેક ખોટા જવાબ દીઠ -૦.૨૫ ગુણ કપાશે.",
    examDuration: "પરીક્ષાનો સમય",
    examDurationDesc: "કુલ ૩ કલાક (૧૮૦ મિનિટ) સમય મળશે.",

    // Subjects Section
    subjectsBadge: "વિષય મુજબ પ્રેક્ટિસ",
    subjectsTitle: "પરીક્ષાના દરેક વિષયમાં સંપૂર્ણ પકડ મેળવો",
    partANonTech: "ભાગ A: બિન-તકનીકી વિષયો",
    subjectReasoning: "રિઝનિંગ (તાર્કિક કસોટી)",
    subjectAptitude: "ગણિત અને એપ્ટિટ્યુડ",
    subjectConstitution: "ભારતનું બંધારણ",
    subjectCurrentAffairs: "વર્તમાન પ્રવાહો (Current Affairs)",
    partBTech: "ભાગ B: ટેકનિકલ વિષયો",
    subjectTech: "ટેકનિકલ એન્જિનિયરિંગ",
    subjectElectronics: "ઇલેક્ટ્રોનિક્સ અને કોમ્યુનિકેશન",
    subjectNetworks: "કમ્પ્યુટર નેટવર્ક્સ",
    subjectSecurity: "નેટવર્ક સિક્યોરિટી & IT",

    // Track Progress Section
    progressBadge: "રીયલ-ટાઇમ ટ્રેકિંગ",
    progressTitle: "પ્રોફેશનલ રીતે તમારી પ્રગતિ ટ્રેક કરો",
    progressSubtitle: "તમારી ચોકસાઈ, સ્પીડ અને તૈયારીના સ્તરની સચોટ માહિતી મેળવો.",
    accuracyRate: "ચોકસાઈ દર (Accuracy)",
    testsCompleted: "પૂર્ણ કરેલી ટેસ્ટ",
    currentRank: "રાજ્ય સ્તરની રેન્ક",

    // FAQ Section
    faqBadge: "પ્રશ્નો છે?",
    faqTitle: "વારંવાર પૂછાતા પ્રશ્નો (FAQ)",
    faqQ1: "શું MCQ Prep Zone પર પ્રેક્ટિસ ફ્રી છે?",
    faqA1: "હા, બેઝિક ટોપિક-વાઇઝ પ્રેક્ટિસ સંપૂર્ણ ફ્રી છે, જેથી તમે પ્લેટફોર્મની ગુણવત્તા ચકાસી શકો.",
    faqQ2: "શું પ્રશ્નો નવા સિલેબસ મુજબ છે?",
    faqA2: "ચોક્કસ! તમામ પ્રશ્નો ગુજરાત પોલીસ WPSI, GSSSB CCE અને GPSC ના લેટેસ્ટ સિલેબસ મુજબ તૈયાર કરાયેલા છે.",
    faqQ3: "શું હું મારી પ્રોગ્રેસ ટ્રેક કરી શકું છું?",
    faqA3: "હા, અમારું પ્લેટફોર્મ વિષયવાર પર્ફોર્મન્સ, સ્પીડ અને નબળા વિષયોનું વિગતવાર એનાલિટિક્સ આપે છે.",
    faqQ4: "શું સંપૂર્ણ મોક ટેસ્ટ ઉપલબ્ધ છે?",
    faqA4: "હા, અમે વાસ્તવિક પરીક્ષા જેવી ટાઈમર અને નેગેટિવ માર્કિંગ સાથેની ફૂલ મોક ટેસ્ટ પ્રદાન કરીએ છીએ.",

    // Call To Action Section
    ctaBadge: "સ્માર્ટ MCQ પ્રેક્ટિસ & ટેસ્ટ સીરિઝ",
    ctaTitle: "આજે જ તમારી પરીક્ષાની તૈયારી શરૂ કરો",
    ctaSubtitle: "૧૦,૦૦૦+ ટોપિક મુજબ MCQs, ટાઇમ્ડ CBT મોક ટેસ્ટ અને વિગતવાર સોલ્યુશન્સ.",
    ctaDesc: "મહત્વપૂર્ણ પ્રશ્નો સાથે પ્રેક્ટિસ કરો, સ્કોર એનાલિટિક્સ મેળવો અને વિગતવાર સોલ્યુશન્સ સાથે તૈયારી મજબૂત કરો.",
    ctaButton: "હમણાં જ ફ્રી પ્રેક્ટિસ શરૂ કરો",

    // Footer
    footerDesc: "ગુજરાત સ્પર્ધાત્મક પરીક્ષાઓ માટે ટોપિક મુજબ MCQs, મોક ટેસ્ટ, જૂના પેપર્સ અને પ્રોગ્રેસ ટ્રેકિંગ પ્લેટફોર્મ.",
    footerQuickLinks: "ઝડપી લિંક્સ",
    footerExplore: "શોધો",
    footerLegal: "નિયમો & શરતો",
    footerContact: "સંપર્ક",
    footerRights: "MCQ Prep Zone Pvt Ltd. સર્વાધિકાર સુરક્ષિત.",
  },
  hi: {
    // Navbar
    navHome: "होम",
    navGovtExams: "सरकारी परीक्षाएं",
    navFeatures: "विशेषताएं",
    navPricing: "शुल्क / प्लान",
    navBlogs: "ब्लॉग्स",
    navAbout: "हमारे बारे में",
    navContact: "संपर्क",
    navLogin: "लॉगिन",
    navGetStarted: "फ्री शुरू करें",
    navDashboard: "डैशबोर्ड",
    navLive: "लाइव",
    navSpecialised: "परीक्षा विशेष",
    selectLanguage: "भाषा चुनें",

    // Hero Section
    heroBadge: "भारत का सबसे स्मार्ट परीक्षा तैयारी प्लेटफॉर्म",
    heroTitle1: "पूरे सिलेबस पर पकड़ बनाएं।",
    heroTitle2: "सरकारी प्रतियोगी परीक्षा क्रैक करें।",
    heroSubtitle: "टॉपिक-वार MCQs, रियल मॉक टेस्ट और AI-आधारित विश्लेषण के साथ अपनी तैयारी को अगले स्तर पर ले जाएं।",
    heroStartFree: "फ्री प्रैक्टिस शुरू करें",
    heroExploreExams: "सरकारी परीक्षाएं देखें",
    heroCorrectAnswer: "सही उत्तर!",
    heroStreak: "१२ दिन की स्ट्रीक",
    heroTopPercent: "शीर्ष ५%",

    // Daily Challenge
    challengeBadge: "दैनिक निरंतरता",
    challengeTitle: "हर दिन २० MCQs की प्रैक्टिस करें",
    challengeSubtitle: "नवीनतम परीक्षा सिलेबस के अनुसार तैयार दैनिक २० प्रश्नों को हल करके अपनी रैंक और निरंतरता बढ़ाएं।",
    challengeBenefit1: "हजारों साथियों के बीच तुरंत रैंक और परसेंटाइल",
    challengeBenefit2: "प्रत्येक प्रश्न का चरण-दर-चरण विस्तृत समाधान",
    challengeBenefit3: "अनुशासित अध्ययन के लिए दैनिक स्ट्रीक प्रणाली",
    challengeButton: "आज का फ्री चैलेंज दें",
    challengeCardTitle: "दैनिक चैलेंज",
    challengeActiveNow: "अभी लाइव है",

    // Features Section
    featuresHeading: "MCQ Prep Zone क्यों चुनें?",
    featuresSubheading: "सरकारी प्रतियोगी परीक्षा में सफलता के लिए आवश्यक सभी साधन।",
    feature1Title: "टॉपिक-वार प्रैक्टिस",
    feature1Desc: "आधिकारिक सिलेबस के प्रत्येक अध्याय और संकल्पना के अनुसार चरण-दर-चरण अभ्यास करें।",
    feature2Title: "तुरंत विस्तृत समाधान",
    feature2Desc: "उत्तर देने के तुरंत बाद विस्तृत व्याख्या से अपने कॉन्सेप्ट को मजबूत करें।",
    feature3Title: "गहन प्रदर्शन विश्लेषण",
    feature3Desc: "अपनी मजबूत और कमजोर कड़ियों को सटीक डेटा और रिपोर्ट द्वारा ट्रैक करें।",

    // Exam Pattern Section
    examPatternBadge: "परीक्षा पैटर्न",
    examPatternTitle1: "तैयारी शुरू करने से पहले",
    examPatternTitle2: "परीक्षा पैटर्न को समझें",
    partA: "भाग A: सामान्य अध्ययन और एप्टीट्यूड",
    partAQuestions: "८० प्रश्न · ८० अंक",
    partB: "भाग B: तकनीकी / विशिष्ट विषय",
    partBQuestions: "१२० प्रश्न · १२० अंक",
    crucialSection: "अति महत्वपूर्ण भाग",
    rulesTitle: "महत्वपूर्ण नियम",
    negativeMarking: "नेगेटिव मार्किंग",
    negativeDesc: "प्रत्येक गलत उत्तर के लिए -०.२५ अंक काटे जाएंगे।",
    examDuration: "परीक्षा की अवधि",
    examDurationDesc: "कुल ३ घंटे (१८० मिनट) का समय मिलेगा।",

    // Subjects Section
    subjectsBadge: "विषय-वार अभ्यास",
    subjectsTitle: "प्रतियोगी परीक्षा के हर विषय में निपुण बनें",
    partANonTech: "भाग A: गैर-तकनीकी विषय",
    subjectReasoning: "रीजनिंग (तर्कशक्ति)",
    subjectAptitude: "गणित एवं एप्टीट्यूड",
    subjectConstitution: "भारत का संविधान",
    subjectCurrentAffairs: "करेंट अफेयर्स",
    partBTech: "भाग B: तकनीकी विषय",
    subjectTech: "तकनीकी इंजीनियरिंग",
    subjectElectronics: "इलेक्ट्रॉनिक्स एवं संचार",
    subjectNetworks: "कंप्यूटर नेटवर्क्स",
    subjectSecurity: "नेटवर्क सुरक्षा और IT",

    // Track Progress Section
    progressBadge: "रीयल-टाइम ट्रैकिंग",
    progressTitle: "अपनी तैयारी को प्रो की तरह ट्रैक करें",
    progressSubtitle: "सटीकता, गति और तैयारी के स्तर की सटीक रिपोर्ट प्राप्त करें।",
    accuracyRate: "सटीकता दर (Accuracy)",
    testsCompleted: "पूर्ण किए गए टेस्ट",
    currentRank: "राज्य स्तरीय रैंक",

    // FAQ Section
    faqBadge: "कोई सवाल है?",
    faqTitle: "अक्सर पूछे जाने वाले सवाल (FAQ)",
    faqQ1: "क्या MCQ Prep Zone पर अभ्यास फ्री है?",
    faqA1: "हाँ, बेसिक टॉपिक-वार अभ्यास बिल्कुल फ्री है, जिससे आप प्लेटफॉर्म की गुणवत्ता परख सकें।",
    faqQ2: "क्या प्रश्न नवीनतम सिलेबस पर आधारित हैं?",
    faqA2: "बिल्कुल! सभी प्रश्न नवीनतम सरकारी परीक्षा और पुलिस भर्ती पैटर्न के अनुसार तैयार किए गए हैं।",
    faqQ3: "क्या मैं अपनी प्रगति ट्रैक कर सकता हूँ?",
    faqA3: "हाँ, हमारा प्लेटफॉर्म विषय-वार प्रदर्शन, गति और कमजोर विषयों का गहरा विश्लेषण देता है।",
    faqQ4: "क्या फुल-लेंथ मॉक टेस्ट उपलब्ध हैं?",
    faqA4: "हाँ, हम असली परीक्षा जैसे टाइमर और नेगेटिव मार्किंग के साथ फुल-लेंथ मॉक टेस्ट प्रदान करते हैं।",

    // Call To Action Section
    ctaBadge: "स्मार्ट MCQ प्रैक्टिस और टेस्ट सीरीज़",
    ctaTitle: "आज ही अपनी परीक्षा की तैयारी शुरू करें",
    ctaSubtitle: "१०,०००+ टॉपिक-वार MCQs, टाइम आधारित CBT मॉक टेस्ट और विस्तृत समाधान।",
    ctaDesc: "महत्वपूर्ण प्रश्नों के साथ अभ्यास करें, रीयल-टाइम एनालिटिक्स देखें और अपनी तैयारी को मजबूत बनाएं।",
    ctaButton: "अभी फ्री में शुरू करें",

    // Footer
    footerDesc: "प्रतियोगी परीक्षाओं के लिए टॉपिक-वार MCQs, मॉक टेस्ट, पिछले वर्षों के प्रश्नपत्र और प्रगति ट्रैकिंग प्लेटफॉर्म।",
    footerQuickLinks: "महत्वपूर्ण लिंक्स",
    footerExplore: "एक्सप्लोर करें",
    footerLegal: "नियम एवं शर्तें",
    footerContact: "संपर्क करें",
    footerRights: "MCQ Prep Zone Pvt Ltd. सर्वाधिकार सुरक्षित।",
  },
};

export type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: TranslationKey) => translations.en[key] || key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('website-lang') as Language;
      if (saved && (saved === 'en' || saved === 'gu' || saved === 'hi')) {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // ignore in environments without localStorage
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('website-lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
