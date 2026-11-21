import type { Language } from '@/context/LanguageContext';

export interface FAQItem {
  q: string;
  a: string;
}

export const pricingFaqs: FAQItem[] = [
  {
    q: "How long is my mock test series subscription valid?",
    a: "When you purchase a plan for an exam, you get lifetime access! It is a simple one-time payment with no expiry date and no renewal fees. You enjoy unlimited attempts on all topic tests, daily challenges, full-length exam simulations, and all future question updates for that exam."
  },
  {
    q: "Which payment methods are accepted?",
    a: "We support all major secure Indian payment methods via Razorpay, including UPI (Google Pay, PhonePe, Paytm), Debit Cards, Credit Cards, Net Banking, and popular wallets."
  },
  {
    q: "Can I practice on multiple devices (mobile, tablet, laptop)?",
    a: "Yes! Mcqprepzone is fully cloud-synced and responsive. You can seamlessly switch between your mobile browser, tablet, and desktop without losing your test progress or streaks."
  },
  {
    q: "What is your refund and cancellation policy?",
    a: "Digital subscriptions provide instant access to our comprehensive question database and full-length mock tests immediately after payment. Because digital access is granted instantly, payments are non-refundable. Please review our Cancellation & Refund policy for full details."
  },
  {
    q: "Are there any hidden fees or auto-debit renewals?",
    a: "No hidden charges whatsoever. Every plan is a single one-time payment that grants you lifetime access to that exam package. We never automatically debit your account or charge recurring subscription fees."
  }
];

export const localizedPricingFaqs: Record<Language, FAQItem[]> = {
  en: pricingFaqs,
  gu: [
    {
      q: "મારા મોક ટેસ્ટ સિરીઝ સબ્સ્ક્રિપ્શનની માન્યતા (Validity) કેટલી છે?",
      a: "જ્યારે તમે કોઈ પરીક્ષા માટે પ્લાન ખરીદો છો, ત્યારે તમને લાઇફટાઇમ (આજીવન) ઍક્સેસ મળે છે! આ એક વખતની ચુકવણી (one-time payment) છે, જેમાં કોઈ એક્સપાયરી તારીખ કે રિન્યુઅલ ફી નથી. તમે તમામ ટોપિક ટેસ્ટ, ડેઇલી ચેલેન્જ અને મોક ટેસ્ટ ગમે તેટલી વખત આપી શકો છો."
    },
    {
      q: "કઈ પેમેન્ટ પદ્ધતિઓ સ્વીકારવામાં આવે છે?",
      a: "અમે Razorpay દ્વારા સુરક્ષિત તમામ મુખ્ય ભારતીય પેમેન્ટ પદ્ધતિઓને સપોર્ટ કરીએ છીએ, જેમાં UPI (Google Pay, PhonePe, Paytm), ડેબિટ કાર્ડ, ક્રેડિટ કાર્ડ, નેટ બેન્કિંગ અને વોલેટ્સ શામેલ છે."
    },
    {
      q: "શું હું એક કરતાં વધુ ડિવાઇસ (મોબાઇલ, ટેબ્લેટ, લેપટોપ) પર પ્રેક્ટિસ કરી શકું?",
      a: "હા! Mcqprepzone સંપૂર્ણપણે ક્લાઉડ-સિંક્ડ અને રેસ્પોન્સિવ છે. તમારી ટેસ્ટ પ્રગતિ અથવા સ્ટ્રીક્સ ગુમાવ્યા વગર તમે મોબાઇલ, ટેબ્લેટ અને કોમ્પ્યુટર વચ્ચે સરળતાથી સ્વિચ કરી શકો છો."
    },
    {
      q: "તમારી રિફંડ અને રદ્દીકરણ (Cancellation) નીતિ શું છે?",
      a: "પેમેન્ટ થતાંની સાથે જ સંપૂર્ણ પ્રશ્ન બેંક અને મોક ટેસ્ટની ડિજિટલ ઍક્સેસ તાત્કાલિક મળી જતી હોવાથી, ચૂકવણી નોન-રિફંડપાત્ર છે. સંપૂર્ણ વિગતો માટે કૃપા કરીને અમારું Cancellation & Refund પેજ જુઓ."
    },
    {
      q: "શું કોઈ છુપી ફી (hidden fees) અથવા ઓટો-ડેબિટ રિન્યુઅલ છે?",
      a: "બિલકુલ નહીં. દરેક પ્લાન એક જ વખતની ચુકવણી છે. અમે ક્યારેય તમારા ખાતામાંથી ઓટો-ડેબિટ કે વારંવાર સબ્સ્ક્રિપ્શન ફી કાપતા નથી."
    }
  ],
  hi: [
    {
      q: "मेरे मॉक टेस्ट सीरीज़ सब्सक्रिप्शन की वैधता (वैधता) कितनी है?",
      a: "जब आप किसी परीक्षा के लिए प्लान खरीदते हैं, तो आपको लाइफटाइम एक्सेस मिलता है! यह बिना किसी समाप्ति तिथि या नवीनीकरण शुल्क के एकमुश्त भुगतान है। आप सभी टॉपिक टेस्ट, दैनिक चुनौतियों और मॉक टेस्ट का असीमित अभ्यास कर सकते हैं।"
    },
    {
      q: "कौन से भुगतान तरीके स्वीकार किए जाते हैं?",
      a: "हम Razorpay के माध्यम से सभी प्रमुख सुरक्षित भारतीय भुगतान विधियों का समर्थन करते हैं, जिसमें UPI (Google Pay, PhonePe, Paytm), डेबिट कार्ड, क्रेडिट कार्ड, नेट बैंकिंग और वॉलेट शामिल हैं।"
    },
    {
      q: "क्या मैं कई उपकरणों (मोबाइल, टैबलेट, लैपटॉप) पर अभ्यास कर सकता हूँ?",
      a: "हाँ! Mcqprepzone पूरी तरह से क्लाउड-सिंक्ड और रेस्पॉन्सिव है। अपनी टेस्ट प्रगति या स्ट्रीक्स खोए बिना आप आसानी से मोबाइल, टैबलेट और कंप्यूटर पर अभ्यास कर सकते हैं।"
    },
    {
      q: "आपकी रिफंड और रद्दीकरण नीति क्या है?",
      a: "भुगतान के तुरंत बाद पूरे प्रश्न डेटाबेस और मॉक टेस्ट तक डिजिटल पहुंच मिल जाने के कारण भुगतान गैर-वापसी योग्य (non-refundable) है। पूरी जानकारी के लिए कृपया हमारा Cancellation & Refund पेज देखें।"
    },
    {
      q: "क्या कोई छुपा हुआ शुल्क या ऑटो-डेबिट नवीनीकरण है?",
      a: "कोई छुपा हुआ शुल्क नहीं है। प्रत्येक योजना एक बार का भुगतान है जो आपको लाइफटाइम एक्सेस देती है। हम कभी भी आपके खाते से ऑटो-डेबिट या आवर्ती शुल्क नहीं काटते हैं।"
    }
  ]
};

export const featuresFaqs: FAQItem[] = [
  {
    q: "Are questions and explanations available in both Gujarati and English?",
    a: "Yes! Mcqprepzone provides bilingual preparation. General Knowledge, Current Affairs, Gujarati Grammar, and State Law papers feature authentic Gujarati language support, while technical papers include standard terminology with clear conceptual breakdowns."
  },
  {
    q: "Does the mock test simulator calculate official negative marking?",
    a: "Yes. Our exam simulator accurately mirrors official exam patterns (including GPSC, Gujarat Police WPSI, and GSSSB CCE marking schemes) with configurable negative marking (-0.25 / -0.33) and precise timing."
  },
  {
    q: "Can I review incorrect answers and reattempt mock tests?",
    a: "Absolutely. After submitting any test, you receive an in-depth scorecard with question-by-question explanations, correct answers, time spent per question, and a dedicated reattempt mode for wrong and bookmarked questions."
  },
  {
    q: "How does the AI-driven weak-spot detection work?",
    a: "Our smart analytics engine tracks your accuracy rate and completion speed across individual subjects and subtopics. It highlights your top weak areas so you know exactly which topics require revision before exam day."
  },
  {
    q: "Do the full-length tests simulate real exam conditions?",
    a: "Yes. The mock test interface includes a live countdown timer, question palette (answered, unvisited, marked for review), and section navigation designed to recreate the real computer-based test (CBT) pressure."
  }
];

export const localizedFeaturesFaqs: Record<Language, FAQItem[]> = {
  en: featuresFaqs,
  gu: [
    {
      q: "શું પ્રશ્નો અને સમજૂતી ગુજરાતી અને અંગ્રેજી બંનેમાં ઉપલબ્ધ છે?",
      a: "હા! Mcqprepzone દ્વિભાષી તૈયારી પ્રદાન કરે છે. સામાન્ય જ્ઞાન, કરંટ અફેર્સ, ગુજરાતી વ્યાકરણ અને કાયદો ગુજરાતીમાં ઉપલબ્ધ છે, જ્યારે ટેકનિકલ વિષયો સ્પષ્ટ સમજૂતી સાથે પ્રમાણભૂત પરિભાષામાં ઉપલબ્ધ છે."
    },
    {
      q: "શું મોક ટેસ્ટ સિમ્યુલેટર સત્તાવાર નેગેટિવ માર્કિંગ ગણે છે?",
      a: "હા. અમારું ટેસ્ટ સિમ્યુલેટર GPSC, ગુજરાત પોલીસ WPSI અને GSSSB CCE પરીક્ષા પેટર્ન મુજબ સચોટ નેગેટિવ માર્કિંગ (-0.25 / -0.33) અને ચોક્કસ સમય ગણતરી સાથે વાસ્તવિક પરિણામ આપે છે."
    },
    {
      q: "શું હું ખોટા જવાબોની સમીક્ષા કરી શકું અને ફરી ટેસ્ટ આપી શકું?",
      a: "ચોક્કસ. કોઈપણ ટેસ્ટ સબમિટ કર્યા પછી તમને પ્રશ્નવાર સમજૂતી, સાચા જવાબો અને ખોટા પડેલા કે બુકમાર્ક કરેલા પ્રશ્નો ફરીથી અટેમ્પ્ટ કરવાનો વિકલ્પ મળે છે."
    },
    {
      q: "સ્માર્ટ વીક-સ્પોટ ડિટેક્શન (નબળા વિષયોની ઓળખ) કેવી રીતે કાર્ય કરે છે?",
      a: "અમારું એનાલિટિક્સ એન્જિન દરેક વિષય અને ટોપિકમાં તમારી એક્યુરસી અને સ્પીડ ટ્રેક કરે છે અને દર્શાવે છે કે પરીક્ષા પહેલાં તમારે કયા વિષયોમાં વધારે રિવિઝનની જરૂર છે."
    },
    {
      q: "શું ફૂલ-લેન્થ ટેસ્ટ વાસ્તવિક પરીક્ષા જેવી પરિસ્થિતિ આપે છે?",
      a: "હા. ટેસ્ટ ઇન્ટરફેસમાં લાઈવ કાઉન્ટડાઉન ટાઈમર, પ્રશ્ન પેલેટ (જવાબ આપેલ, બાકી, રિવ્યૂ માટે ચિહ્નિત) અને સેક્શન નેવિગેશન સામેલ છે જે વાસ્તવિક CBT પરીક્ષા જેવો માહોલ બનાવે છે."
    }
  ],
  hi: [
    {
      q: "क्या प्रश्न और व्याख्याएं गुजराती और अंग्रेजी दोनों में उपलब्ध हैं?",
      a: "हाँ! Mcqprepzone द्विभाषी तैयारी प्रदान करता है। सामान्य ज्ञान, समसामयिकी (करंट अफेयर्स), व्याकरण और कानून विषय गुजराती में उपलब्ध हैं, जबकि तकनीकी विषय मानक तकनीकी शब्दावली और स्पष्ट व्याख्या के साथ उपलब्ध हैं।"
    },
    {
      q: "क्या मॉक टेस्ट सिम्युलेटर आधिकारिक नकारात्मक अंकन (Negative Marking) की गणना करता है?",
      a: "हाँ। हमारा टेस्ट सिम्युलेटर GPSC, गुजरात पुलिस WPSI और GSSSB CCE परीक्षा पैटर्न के अनुसार सटीक नकारात्मक अंकन (-0.25 / -0.33) और सटीक समय के साथ परिणाम देता है।"
    },
    {
      q: "क्या मैं गलत उत्तरों की समीक्षा कर सकता हूँ और पुनः टेस्ट दे सकता हूँ?",
      a: "बिल्कुल। टेस्ट सबमिट करने के बाद आपको प्रत्येक प्रश्न का विस्तृत हल, सही उत्तर और गलत या बुकमार्क किए गए प्रश्नों को दोबारा हल करने की सुविधा मिलती है।"
    },
    {
      q: "कमजोर विषयों की पहचान (Weak-spot detection) कैसे काम करती है?",
      a: "हमारा स्मार्ट एनालिटिक्स इंजन प्रत्येक विषय में आपकी सटीकता और गति को ट्रैक करता है और आपको दिखाता है कि परीक्षा से पहले किन विषयों में रिविज़न की आवश्यकता है।"
    },
    {
      q: "क्या फुल-लेंथ टेस्ट असली परीक्षा जैसी परिस्थितियाँ प्रदान करते हैं?",
      a: "हाँ। टेस्ट इंटरफ़ेस में लाइव काउंटडाउन टाइमर, प्रश्न पैलेट और सेक्शन नेविगेशन शामिल हैं जो वास्तविक ऑनलाइन परीक्षा (CBT) का अनुभव प्रदान करते हैं।"
    }
  ]
};
