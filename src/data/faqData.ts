import { 
  BookOpen, 
  Layers, 
  CreditCard, 
  Sparkles,
  LucideIcon
} from 'lucide-react';
import type { Language } from '@/context/LanguageContext';

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQCategory {
  id: string;
  icon: LucideIcon;
  name: string;
  description: string;
  faqs: FAQItem[];
}

export interface FAQPageTranslation {
  breadcrumbHome: string;
  breadcrumbFaq: string;
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  categories: FAQCategory[];
  bannerTitle: string;
  bannerDesc: string;
  bannerContactBtn: string;
  bannerExamsBtn: string;
}

export const faqData: Record<Language, FAQPageTranslation> = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbFaq: "Frequently Asked Questions",
    badge: "Help Center & Knowledge Base",
    title: "Frequently Asked",
    titleHighlight: "Questions",
    subtitle: "Everything you need to know about Mcqprepzone mock tests, syllabus coverage, daily challenges, study materials, and pricing for Gujarat Government exams.",
    bannerTitle: "Still have questions?",
    bannerDesc: "Can't find the answer you're looking for? Reach out to our dedicated support team and we will be happy to assist you.",
    bannerContactBtn: "Contact Support",
    bannerExamsBtn: "Explore Exams",
    categories: [
      {
        id: "exams-syllabus",
        name: "Exams & Syllabus",
        icon: BookOpen,
        description: "Coverage of Gujarat state and central competitive exam patterns",
        faqs: [
          {
            q: "What competitive exams does Mcqprepzone cover?",
            a: "Mcqprepzone specializes in Gujarat state competitive recruitments and central exams, including Gujarat Police Wireless PSI (WPSI Technical & General Papers), GPSC Class 1 & 2, GSSSB CCE (Clerk, Senior Clerk, Head Clerk), Talati, Constable, Forest Guard, and High Court Assistant, alongside central SSC and RRB benchmarks."
          },
          {
            q: "Are questions updated according to the latest 2026 syllabus?",
            a: "Yes. Our subject-matter specialists continuously audit the question database to align with the latest exam blueprints, negative marking rules, and notification updates released by GSSSB, GPSC, and the Gujarat Police Bharti Board."
          },
          {
            q: "Are questions and study notes available in Gujarati as well as English?",
            a: "Yes! Mcqprepzone provides bilingual preparation. General knowledge, grammar, and state-specific topics feature Gujarati support, while technical papers (such as WPSI Electronics, Computer Networks, and Telecommunication) include standard technical terminology with clear explanations."
          }
        ]
      },
      {
        id: "mock-tests",
        name: "Mock Tests & Test Simulator",
        icon: Layers,
        description: "Timed CBT simulation, question palette, and detailed solutions",
        faqs: [
          {
            q: "How closely do the mock tests reflect the actual exam environment?",
            a: "Our Computer-Based Test (CBT) simulator matches official exam conditions with an interactive question palette, section navigation, review mark flags, and a live countdown timer to build time management and reduce exam-day anxiety."
          },
          {
            q: "Is negative marking calculated in test results?",
            a: "Yes. Tests automatically apply official negative marking rules (e.g., -0.25 marks for wrong answers or unattempted penalties where applicable), giving you an accurate prediction of your net score."
          },
          {
            q: "Do I get step-by-step explanations after submitting a test?",
            a: "Immediately upon submission, you receive an in-depth scorecard with subject-wise accuracy, speed breakdown, statewide rank comparison, and complete step-by-step solutions with theoretical explanations for every question."
          },
          {
            q: "Can I re-attempt mock tests to measure my improvement?",
            a: "Yes, you can re-attempt mock tests to verify whether your conceptual mistakes have been fixed. Your historical scores and attempt logs are preserved in your dashboard analytics."
          }
        ]
      },
      {
        id: "daily-challenge",
        name: "Daily Challenge & Practice Tools",
        icon: Sparkles,
        description: "Streaks, question bookmarking, and revision notes",
        faqs: [
          {
            q: "What is the Daily Challenge and how do Streaks work?",
            a: "The Daily Challenge is a curated daily quiz designed to maintain study consistency. Every completed daily quiz rewards XP, boosts your standing on the daily leaderboard, and adds to your daily streak count."
          },
          {
            q: "Can I save or bookmark difficult MCQs for quick revision?",
            a: "Yes. While practicing or reviewing test solutions, click the bookmark icon on any question. All saved questions are neatly organized by subject in your 'Saved MCQs' section for rapid revision before exams."
          },
          {
            q: "Are study notes and formula sheets downloadable as PDFs?",
            a: "Yes. Mcqprepzone provides high-yield revision notes, short-trick summaries, and formula cheatsheets covering core subjects that you can read directly on the platform or download for offline revision."
          }
        ]
      },
      {
        id: "pricing-accounts",
        name: "Accounts, Devices & Pricing",
        icon: CreditCard,
        description: "Mobile responsiveness, pricing plans, and refund policies",
        faqs: [
          {
            q: "Can I use Mcqprepzone on my mobile phone or tablet?",
            a: "Absolutely! Mcqprepzone is 100% cloud-based and responsive. You can seamlessly practice on smartphones, tablets, laptops, and desktop computers through any modern web browser without downloading heavy APKs."
          },
          {
            q: "Can I practice for free before purchasing a premium subscription?",
            a: "Yes. Basic topic-wise practice sets, the Daily Challenge, and sample demo tests are free for all registered and guest users so you can test our question quality and interface before upgrading."
          },
          {
            q: "What payment methods are supported for premium plans?",
            a: "We support all major Indian payment methods powered by secure Razorpay integration, including UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, Net Banking, and popular wallets."
          },
          {
            q: "What is the refund and cancellation policy?",
            a: "Payments made for digital subscriptions and test series are non-refundable once activated, as access to test databases is granted immediately upon payment. Please check our Cancellation & Refund page for complete policy terms."
          },
          {
            q: "How can I contact support if I spot an error in a question or encounter an issue?",
            a: "You can reach us through our Contact Us page, report any question directly via the question dispute button, or email our support team for quick assistance."
          }
        ]
      }
    ]
  },
  gu: {
    breadcrumbHome: "હોમ",
    breadcrumbFaq: "વારંવાર પૂછાતા પ્રશ્નો (FAQ)",
    badge: "હેલ્પ સેન્ટર અને પ્રશ્નોત્તરી",
    title: "વારંવાર પૂછાતા",
    titleHighlight: "પ્રશ્નો (FAQ)",
    subtitle: "ગુજરાત સરકારી સ્પર્ધાત્મક પરીક્ષાઓ માટે Mcqprepzone મોક ટેસ્ટ, અભ્યાસક્રમ (સિલેબસ), ડેઇલી ચેલેન્જ, સ્ટડી મટિરિયલ અને સબ્સ્ક્રિપ્શન પ્લાન વિશે સંપૂર્ણ માહિતી.",
    bannerTitle: "હજુ કોઈ પ્રશ્ન કે મૂંઝવણ છે?",
    bannerDesc: "તમને જોઈતો જવાબ નથી મળ્યો? અમારી સપોર્ટ ટીમનો સંપર્ક કરો અને અમે તમારી પૂરી મદદ કરીશું.",
    bannerContactBtn: "સપોર્ટ સંપર્ક કરો",
    bannerExamsBtn: "પરીક્ષાઓ જુઓ",
    categories: [
      {
        id: "exams-syllabus",
        name: "પરીક્ષા અને સિલેબસ",
        icon: BookOpen,
        description: "ગુજરાત રાજ્ય અને કેન્દ્ર સરકારની સ્પર્ધાત્મક પરીક્ષાઓના પેટર્નનું કવરેજ",
        faqs: [
          {
            q: "Mcqprepzone કઈ સ્પર્ધાત્મક પરીક્ષાઓ આવરી લે છે?",
            a: "Mcqprepzone ખાસ કરીને ગુજરાત રાજ્યની સ્પર્ધાત્મક ભરતીઓ અને કેન્દ્રીય પરીક્ષાઓને આવરી લે છે, જેમાં ગુજરાત પોલીસ વાયરલેસ પીએસઆઈ (WPSI ટેકનિકલ અને જનરલ પેપર્સ), GPSC વર્ગ 1 અને 2, GSSSB CCE (જુનિયર ક્લાર્ક, સિનિયર ક્લાર્ક, હેડ ક્લાર્ક), તલાટી, પોલીસ કોન્સ્ટેબલ, ફોરેસ્ટ ગાર્ડ, હાઈકોર્ટ આસિસ્ટન્ટ તેમજ SSC અને RRB પરીક્ષાઓનો સમાવેશ થાય છે."
          },
          {
            q: "શું પ્રશ્નો નવા 2026 સિલેબસ મુજબ અપડેટ થયેલા છે?",
            a: "હા. અમારા વિષય નિષ્ણાતો GSSSB, GPSC અને ગુજરાત પોલીસ ભરતી બોર્ડ દ્વારા બહાર પાડવામાં આવેલ નવી બ્લૂપ્રિન્ટ, નેગેટિવ માર્કિંગ નિયમો અને નોટિફિકેશન મુજબ પ્રશ્ન બેંકને નિયમિતપણે અપડેટ કરે છે."
          },
          {
            q: "શું પ્રશ્નો અને અભ્યાસ નોટ્સ ગુજરાતી તેમજ અંગ્રેજી બંનેમાં ઉપલબ્ધ છે?",
            a: "હા! Mcqprepzone દ્વિભાષી (bilingual) તૈયારી પ્રદાન કરે છે. સામાન્ય જ્ઞાન, ગુજરાતી વ્યાકરણ, કાયદો અને રાજ્ય વિષયો ગુજરાતી ભાષામાં ઉપલબ્ધ છે, જ્યારે ટેકનિકલ પેપર્સ (જેમ કે WPSI ઇલેક્ટ્રોનિક્સ, કમ્પ્યુટર નેટવર્ક્સ અને ટેલિકોમ્યુનિકેશન) સ્પષ્ટ ગુજરાતી સમજૂતી સાથે પ્રમાણભૂત ટેકનિકલ ભાષામાં આપવામાં આવે છે."
          }
        ]
      },
      {
        id: "mock-tests",
        name: "મોક ટેસ્ટ અને ટેસ્ટ સિમ્યુલેટર",
        icon: Layers,
        description: "સમયબદ્ધ CBT સિમ્યુલેશન, પ્રશ્ન પેલેટ અને વિગતવાર જવાબો",
        faqs: [
          {
            q: "મોક ટેસ્ટ વાસ્તવિક પરીક્ષાના વાતાવરણને કેટલું મળતું આવે છે?",
            a: "અમારું કમ્પ્યુટર-બેઝ્ડ ટેસ્ટ (CBT) સિમ્યુલેટર વાસ્તવિક પરીક્ષા જેવો જ અનુભવ આપે છે, જેમાં ઇન્ટરેક્ટિવ પ્રશ્ન પેલેટ, વિભાગ નેવિગેશન, રિવ્યૂ માર્કિંગ અને લાઈવ કાઉન્ટડાઉન ટાઈમર શામેલ છે, જેથી પરીક્ષા હોલના સમયનું યોગ્ય સંચાલન કરી શકાય."
          },
          {
            q: "શું ટેસ્ટ પરિણામોમાં નેગેટિવ માર્કિંગ ગણવામાં આવે છે?",
            a: "હા. પરીક્ષાના સત્તાવાર નિયમો મુજબ નેગેટિવ માર્કિંગ (દા.ત. ખોટા જવાબ માટે -0.25 ગુણ અથવા લાગુ હોય ત્યાં માઈનસ માર્કિંગ) આપમેળે ગણવામાં આવે છે, જેથી તમને તમારા વાસ્તવિક સ્કોરનો ચોક્કસ ખ્યાલ આવે."
          },
          {
            q: "શું ટેસ્ટ સબમિટ કર્યા પછી પ્રશ્નવાર સમજૂતી મળે છે?",
            a: "હા, ટેસ્ટ સબમિટ કરતાની સાથે જ તમને વિષયવાર ચોકસાઈ, સ્પીડ એનાલિસિસ, રાજ્ય સ્તરની રેન્ક સરખામણી અને દરેક પ્રશ્ન માટે વિગતવાર સોલ્યુશન અને સમજૂતી આપવામાં આવે છે."
          },
          {
            q: "શું હું મારી ભૂલો સુધારવા મોક ટેસ્ટ ફરી આપી શકું છું?",
            a: "હા, તમે મોક ટેસ્ટ ગમે તેટલી વખત ફરી આપી શકો છો અને તમારી નબળાઈઓ દૂર કરી શકો છો. તમારા જૂના સ્કોર્સ અને અગાઉના તમામ પ્રયાસો ડેશબોર્ડ એનાલિટિક્સમાં સુરક્ષિત રહે છે."
          }
        ]
      },
      {
        id: "daily-challenge",
        name: "ડેઇલી ચેલેન્જ અને પ્રેક્ટિસ ટૂલ્સ",
        icon: Sparkles,
        description: "ડેઇલી સ્ટ્રીક્સ, પ્રશ્ન બુકમાર્કિંગ અને રિવિઝન નોટ્સ",
        faqs: [
          {
            q: "ડેઇલી ચેલેન્જ શું છે અને સ્ટ્રીક્સ (Streaks) કેવી રીતે કાર્ય કરે છે?",
            a: "ડેઇલી ચેલેન્જ એ રોજેરોજ અભ્યાસ કરવાની આદત બનાવવા માટેની સ્પેશિયલ ક્વિઝ છે. દરરોજ ટેસ્ટ પૂર્ણ કરવાથી તમને XP પોઈન્ટ્સ મળે છે, લીડરબોર્ડ પર રેન્ક સુધરે છે અને તમારી ડેઇલી સ્ટ્રીક વધે છે."
          },
          {
            q: "શું હું ઝડપી પુનરાવર્તન માટે અઘરા પ્રશ્નો સેવ કે બુકમાર્ક કરી શકું?",
            a: "હા. પ્રેક્ટિસ અથવા ટેસ્ટ રિવ્યૂ દરમિયાન કોઈપણ પ્રશ્ન પર આપેલા બુકમાર્ક આઇકોન પર ક્લિક કરો. સેવ કરેલા તમામ પ્રશ્નો તમારા 'Saved MCQs' સેક્શનમાં વિષયવાર ગોઠવાઈ જાય છે જેથી પરીક્ષાના છેલ્લા દિવસોમાં ઝડપી રિવિઝન કરી શકાય."
          },
          {
            q: "શું અભ્યાસ નોટ્સ અને ફોર્મ્યુલા શીટ્સ ડાઉનલોડ કરી શકાય છે?",
            a: "હા. Mcqprepzone મુખ્ય વિષયોની હાઇ-યીલ્ડ રિવિઝન નોટ્સ, શોર્ટ-ટ્રિક્સ અને ફોર્મ્યુલા શીટ્સ પ્રદાન કરે છે, જેને તમે વેબસાઇટ પર વાંચી શકો છો અથવા ઑફલાઇન અભ્યાસ માટે સેવ કરી શકો છો."
          }
        ]
      },
      {
        id: "pricing-accounts",
        name: "એકાઉન્ટ, ડિવાઇસ અને પ્લાન કિંમત",
        icon: CreditCard,
        description: "મોબાઇલ સુસંગતતા, પ્લાન પેમેન્ટ અને રિફંડ નીતિ",
        faqs: [
          {
            q: "શું હું મારા મોબાઇલ ફોન અથવા ટેબ્લેટ પર Mcqprepzone વાપરી શકું?",
            a: "ચોક્કસ! Mcqprepzone સંપૂર્ણપણે ક્લાઉડ-આધારિત અને મોબાઇલ-ફ્રેન્ડલી છે. કોઈપણ એપ ડાઉનલોડ કર્યા વિના તમે કોઈપણ બ્રાઉઝર દ્વારા સ્માર્ટફોન, ટેબ્લેટ, લેપટોપ કે કમ્પ્યુટર પર સરળતાથી પ્રેક્ટિસ કરી શકો છો."
          },
          {
            q: "શું ખરીદતા પહેલા ફ્રીમાં પ્રેક્ટિસ કરી શકાય છે?",
            a: "હા. બેઝિક વિષયવાર પ્રેક્ટિસ, ડેઇલી ચેલેન્જ અને ડેમો મોક ટેસ્ટ તમામ વિદ્યાર્થીઓ માટે સંપૂર્ણ ફ્રી છે જેથી તમે પ્લેટફોર્મની ગુણવત્તા અને ઉપયોગિતા જાતે ચકાસી શકો."
          },
          {
            q: "પ્રીમિયમ પ્લાન ખરીદવા કઈ પેમેન્ટ પદ્ધતિઓ ઉપલબ્ધ છે?",
            a: "અમે Razorpay દ્વારા તમામ સુરક્ષિત ભારતીય પેમેન્ટ પદ્ધતિઓને સપોર્ટ કરીએ છીએ, જેમાં UPI (Google Pay, PhonePe, Paytm), ડેબિટ કાર્ડ, ક્રેડિટ કાર્ડ, નેટ બેન્કિંગ અને વોલેટ્સ શામેલ છે."
          },
          {
            q: "રિફંડ અને કેન્સલેશન નીતિ (Refund Policy) શું છે?",
            a: "ડિજિટલ ટેસ્ટ સિરીઝ અને સબ્સ્ક્રિપ્શન પ્લાન ખરીદ્યા પછી તરત જ તમામ પ્રશ્નો અને મોક ટેસ્ટની સંપૂર્ણ ઍક્સેસ મળી જતી હોવાથી ફી નોન-રિફંડપાત્ર (પરત ન મળી શકે તેવી) છે. વિગતવાર માહિતી માટે અમારું Cancellation & Refund પેજ જુઓ."
          },
          {
            q: "જો કોઈ પ્રશ્નમાં ભૂલ દેખાય તો સપોર્ટ ટીમનો સંપર્ક કેવી રીતે કરવો?",
            a: "તમે અમારા Contact Us પેજ દ્વારા અમારો સંપર્ક કરી શકો છો, પ્રશ્નમાં આપેલા રિપોર્ટ/ડિસ્પ્યુટ બટનથી સીધી જાણ કરી શકો છો, અથવા અમારી ઈમેઈલ સપોર્ટ ટીમનો સંપર્ક કરી શકો છો."
          }
        ]
      }
    ]
  },
  hi: {
    breadcrumbHome: "होम",
    breadcrumbFaq: "अक्सर पूछे जाने वाले सवाल (FAQ)",
    badge: "सहायता केंद्र और ज्ञान कोष",
    title: "अक्सर पूछे जाने वाले",
    titleHighlight: "सवाल (FAQ)",
    subtitle: "गुजरात सरकारी प्रतियोगी परीक्षाओं के लिए Mcqprepzone मॉक टेस्ट, सिलेबस, दैनिक चुनौतियां, अध्ययन सामग्री और सब्सक्रिप्शन प्लान के बारे में पूरी जानकारी।",
    bannerTitle: "क्या अभी भी कोई सवाल है?",
    bannerDesc: "क्या आपको अपना सवाल नहीं मिला? हमारी सहायता टीम से संपर्क करें और हमें आपकी मदद करने में खुशी होगी।",
    bannerContactBtn: "सपोर्ट से संपर्क करें",
    bannerExamsBtn: "परीक्षाएं देखें",
    categories: [
      {
        id: "exams-syllabus",
        name: "परीक्षा और सिलेबस",
        icon: BookOpen,
        description: "गुजरात राज्य और केंद्र सरकार की प्रतियोगी परीक्षा पैटर्न का कवरेज",
        faqs: [
          {
            q: "Mcqprepzone किन प्रतियोगी परीक्षाओं को कवर करता है?",
            a: "Mcqprepzone मुख्य रूप से गुजरात राज्य की प्रतियोगी भर्तियों और केंद्रीय परीक्षाओं को कवर करता है, जिसमें गुजरात पुलिस वायरलेस पीएसआई (WPSI तकनीकी और सामान्य पेपर), GPSC क्लास 1 और 2, GSSSB CCE (क्लर्क, सीनियर क्लर्क, हेड क्लर्क), तलाटी, पुलिस कांस्टेबल, वन रक्षक (Forest Guard), उच्च न्यायालय सहायक के साथ-साथ केंद्रीय SSC और RRB परीक्षाएं शामिल हैं।"
          },
          {
            q: "क्या प्रश्न नवीनतम 2026 सिलेबस के अनुसार अपडेट किए गए हैं?",
            a: "हाँ। हमारे विषय विशेषज्ञ GSSSB, GPSC और गुजरात पुलिस भर्ती बोर्ड द्वारा जारी नवीनतम परीक्षा ब्लूप्रिंट, नकारात्मक अंकन नियमों और आधिकारिक अधिसूचनाओं के अनुसार प्रश्न बैंक को लगातार अपडेट करते रहते हैं।"
          },
          {
            q: "क्या प्रश्न और अध्ययन नोट्स गुजराती के साथ-साथ अंग्रेजी में भी उपलब्ध हैं?",
            a: "हाँ! Mcqprepzone द्विभाषी (bilingual) तैयारी प्रदान करता है। सामान्य ज्ञान, व्याकरण और राज्य-विशिष्ट विषयों के लिए गुजराती और हिंदी सहायता उपलब्ध है, जबकि तकनीकी पेपर (जैसे WPSI इलेक्ट्रॉनिक्स, कंप्यूटर नेटवर्क और दूरसंचार) स्पष्ट व्याख्याओं के साथ मानक तकनीकी शब्दावली में उपलब्ध हैं।"
          }
        ]
      },
      {
        id: "mock-tests",
        name: "मॉक टेस्ट और टेस्ट सिम्युलेटर",
        icon: Layers,
        description: "समयबद्ध CBT सिमुलेशन, प्रश्न पैलेट और विस्तृत समाधान",
        faqs: [
          {
            q: "मॉक टेस्ट वास्तविक परीक्षा माहौल से कितने मिलते-जुलते हैं?",
            a: "हमारा कंप्यूटर-आधारित टेस्ट (CBT) सिम्युलेटर आधिकारिक परीक्षा जैसी परिस्थितियों से मेल खाता है, जिसमें इंटरैक्टिव प्रश्न पैलेट, सेक्शन नेविगेशन, समीक्षा के लिए मार्क और लाइव काउंटडाउन टाइमर शामिल हैं, जिससे समय प्रबंधन बेहतर होता है और परीक्षा का डर खत्म होता है।"
          },
          {
            q: "क्या टेस्ट परिणामों में नकारात्मक अंकन (Negative Marking) की गणना की जाती है?",
            a: "हाँ। टेस्ट में आधिकारिक नकारात्मक अंकन नियम (जैसे गलत उत्तरों के लिए -0.25 अंक या लागू होने पर अनुत्तरित पेनल्टी) अपने आप लागू होते हैं, जिससे आपको अपने वास्तविक नेट स्कोर का सटीक अनुमान मिलता है।"
          },
          {
            q: "क्या टेस्ट सबमिट करने के बाद विस्तृत व्याख्या मिलती है?",
            a: "टेस्ट सबमिट करते ही आपको विषय-वार सटीकता, गति विश्लेषण, राज्य स्तरीय रैंक तुलना और प्रत्येक प्रश्न के लिए सैद्धांतिक व्याख्या के साथ चरण-दर-चरण संपूर्ण समाधान प्राप्त होता है।"
          },
          {
            q: "क्या मैं अपने सुधार को मापने के लिए मॉक टेस्ट फिर से दे सकता हूँ?",
            a: "हाँ, आप यह जांचने के लिए मॉक टेस्ट दोबारा दे सकते हैं कि आपकी गलतियाँ ठीक हुई हैं या नहीं। आपके पुराने अंक और प्रयास का इतिहास आपके डैशबोर्ड एनालिटिक्स में हमेशा सुरक्षित रहता है।"
          }
        ]
      },
      {
        id: "daily-challenge",
        name: "दैनिक चुनौती और अभ्यास उपकरण",
        icon: Sparkles,
        description: "स्ट्रीक्स, प्रश्न बुकमार्क करना और रिविज़न नोट्स",
        faqs: [
          {
            q: "दैनिक चुनौती (Daily Challenge) क्या है और स्ट्रीक्स कैसे काम करते हैं?",
            a: "दैनिक चुनौती अध्ययन में निरंतरता बनाए रखने के लिए तैयार की गई एक दैनिक क्विज़ है। प्रत्येक पूर्ण की गई दैनिक क्विज़ आपको XP देती है, दैनिक लीडरबोर्ड पर आपकी स्थिति बढ़ाती है और आपकी दैनिक स्ट्रीक बढ़ाती है।"
          },
          {
            q: "क्या मैं त्वरित रिविज़न के लिए कठिन प्रश्नों को बुकमार्क कर सकता हूँ?",
            a: "हाँ। अभ्यास करते समय या समाधान देखते समय किसी भी प्रश्न पर बुकमार्क आइकन पर क्लिक करें। सभी सहेजे गए प्रश्न परीक्षा से पहले त्वरित रिविज़न के लिए आपके 'Saved MCQs' अनुभाग में विषयवार सुरक्षित रहते हैं।"
          },
          {
            q: "क्या अध्ययन नोट्स और फॉर्मूला शीट PDF के रूप में डाउनलोड करने योग्य हैं?",
            a: "हाँ। Mcqprepzone मुख्य विषयों को कवर करने वाले महत्वपूर्ण रिविज़न नोट्स, शॉर्ट-ट्रिक्स और फॉर्मूला शीट प्रदान करता है जिन्हें आप सीधे प्लेटफॉर्म पर पढ़ सकते हैं या ऑफ़लाइन अध्ययन के लिए डाउनलोड कर सकते हैं।"
          }
        ]
      },
      {
        id: "pricing-accounts",
        name: "खाते, उपकरण और मूल्य निर्धारण",
        icon: CreditCard,
        description: "मोबाइल अनुकूलता, मूल्य निर्धारण योजनाएं और रिफंड नीतियां",
        faqs: [
          {
            q: "क्या मैं अपने मोबाइल फोन या टैबलेट पर Mcqprepzone का उपयोग कर सकता हूँ?",
            a: "बिल्कुल! Mcqprepzone 100% क्लाउड-आधारित और रेस्पॉन्सिव है। आप बिना कोई भारी ऐप डाउनलोड किए किसी भी आधुनिक वेब ब्राउज़र के माध्यम से स्मार्टफोन, टैबलेट, लैपटॉप और कंप्यूटर पर आसानी से अभ्यास कर सकते हैं।"
          },
          {
            q: "क्या मैं प्रीमियम सदस्यता खरीदने से पहले मुफ्त में अभ्यास कर सकता हूँ?",
            a: "हाँ। बेसिक टॉपिक-वार अभ्यास सेट, दैनिक चुनौती और नमूना डेमो टेस्ट सभी उपयोगकर्ताओं के लिए पूरी तरह से मुफ्त हैं ताकि आप अपग्रेड करने से पहले हमारी प्रश्न गुणवत्ता और इंटरफ़ेस की जांच कर सकें।"
          },
          {
            q: "प्रीमियम योजनाओं के लिए कौन से भुगतान तरीके समर्थित हैं?",
            a: "हम सुरक्षित Razorpay एकीकरण द्वारा संचालित सभी प्रमुख भारतीय भुगतान विधियों का समर्थन करते हैं, जिसमें UPI (Google Pay, PhonePe, Paytm), डेबिट/क्रेडिट कार्ड, नेट बैंकिंग और वॉलेट शामिल हैं।"
          },
          {
            q: "रिफंड और रद्दीकरण (रिफंड पॉलिसी) क्या है?",
            a: "डिजिटल सदस्यता और टेस्ट सीरीज़ के लिए किया गया भुगतान सक्रिय होने के बाद नॉन-रिफंडेबल (वापसी योग्य नहीं) होता है, क्योंकि भुगतान के तुरंत बाद टेस्ट डेटाबेस तक पूर्ण पहुंच प्रदान कर दी जाती है। पूरी शर्तों के लिए कृपया हमारा Cancellation & Refund पेज देखें।"
          },
          {
            q: "यदि मुझे किसी प्रश्न में कोई त्रुटि दिखे या कोई समस्या आए तो मैं सहायता से कैसे संपर्क कर सकता हूँ?",
            a: "आप हमारे Contact Us पेज के माध्यम से संपर्क कर सकते हैं, प्रश्न विवाद (dispute) बटन के माध्यम से सीधे किसी प्रश्न की रिपोर्ट कर सकते हैं, या त्वरित सहायता के लिए हमारी सहायता टीम को ईमेल कर सकते हैं।"
          }
        ]
      }
    ]
  }
};
