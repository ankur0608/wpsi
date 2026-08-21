export interface FreeMCQ {
  id: string;
  subject: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export const freeDailyMCQs: FreeMCQ[] = [
  {
    id: "mcq-1",
    subject: "Computer Networks",
    question: "Which of the following layers of the OSI model is responsible for logical addressing and routing?",
    options: {
      A: "Data Link Layer",
      B: "Network Layer",
      C: "Transport Layer",
      D: "Session Layer"
    },
    correctAnswer: "B",
    explanation: "The Network Layer (Layer 3) of the OSI model handles logical addressing (like IP addresses) and determines the best path (routing) for data to travel across multiple networks. The Data Link Layer handles physical addressing (MAC addresses), while the Transport Layer ensures reliable delivery."
  },
  {
    id: "mcq-2",
    subject: "Basic Electronics",
    question: "In a P-N junction diode, what happens to the width of the depletion region when it is reverse-biased?",
    options: {
      A: "It decreases",
      B: "It remains the same",
      C: "It increases",
      D: "It collapses completely"
    },
    correctAnswer: "C",
    explanation: "When a P-N junction is reverse-biased, the positive terminal of the battery is connected to the N-type and the negative terminal to the P-type. This pulls the majority charge carriers away from the junction, widening the depletion region and preventing current flow."
  },
  {
    id: "mcq-3",
    subject: "Telecommunication",
    question: "Which multiplexing technique assigns different non-overlapping frequency ranges to different signals?",
    options: {
      A: "Time Division Multiplexing (TDM)",
      B: "Code Division Multiplexing (CDM)",
      C: "Frequency Division Multiplexing (FDM)",
      D: "Space Division Multiplexing (SDM)"
    },
    correctAnswer: "C",
    explanation: "Frequency Division Multiplexing (FDM) divides the total available bandwidth in a communication medium into a series of non-overlapping frequency bands, each carrying a separate signal. This is commonly used in FM radio and traditional television broadcasting."
  },
  {
    id: "mcq-4",
    subject: "General Knowledge",
    question: "Under which Article of the Indian Constitution is the 'Right to Constitutional Remedies' guaranteed?",
    options: {
      A: "Article 21",
      B: "Article 32",
      C: "Article 14",
      D: "Article 19"
    },
    correctAnswer: "B",
    explanation: "Article 32 of the Indian Constitution grants individuals the right to move the Supreme Court to seek justice when their fundamental rights are violated. Dr. B.R. Ambedkar famously called it the 'heart and soul' of the Constitution."
  },
  {
    id: "mcq-5",
    subject: "Digital Logic",
    question: "Which logic gate outputs HIGH only when both of its inputs are LOW?",
    options: {
      A: "NAND",
      B: "XOR",
      C: "NOR",
      D: "AND"
    },
    correctAnswer: "C",
    explanation: "The NOR gate is a combination of an OR gate followed by a NOT gate. An OR gate outputs LOW only when both inputs are LOW. Therefore, the inverted output (NOR) will be HIGH only when both inputs are LOW."
  },
  {
    id: "mcq-6",
    subject: "Mental Ability",
    question: "A train 150 meters long is running at a speed of 90 km/hr. How much time will it take to cross a railway signal pole?",
    options: {
      A: "6 seconds",
      B: "10 seconds",
      C: "15 seconds",
      D: "20 seconds"
    },
    correctAnswer: "A",
    explanation: "First, convert speed to m/s: 90 km/hr = 90 * (5/18) = 25 m/s. The distance to be covered to cross a pole is the length of the train itself (150 m). Time = Distance / Speed = 150 / 25 = 6 seconds."
  },
  {
    id: "mcq-7",
    subject: "Computer Science",
    question: "Which of the following data structures operates on a Last In, First Out (LIFO) principle?",
    options: {
      A: "Queue",
      B: "Linked List",
      C: "Tree",
      D: "Stack"
    },
    correctAnswer: "D",
    explanation: "A Stack operates on the LIFO (Last In, First Out) principle, meaning the last element added to the stack is the first one to be removed. Think of it like a stack of plates. Queues, conversely, operate on FIFO (First In, First Out)."
  },
  {
    id: "mcq-8",
    subject: "Physics",
    question: "According to the Second Law of Thermodynamics, what happens to the total entropy of an isolated system over time?",
    options: {
      A: "It remains constant",
      B: "It always decreases",
      C: "It never decreases",
      D: "It fluctuates periodically"
    },
    correctAnswer: "C",
    explanation: "The Second Law of Thermodynamics states that the total entropy (a measure of disorder or randomness) of an isolated system can never decrease over time; it can only remain constant in ideal cases where the system is in a steady state, or increase for spontaneous processes."
  },
  {
    id: "mcq-9",
    subject: "Telecommunication",
    question: "In optical fiber communication, what prevents the light from escaping the core?",
    options: {
      A: "Dispersion",
      B: "Total Internal Reflection",
      C: "Refraction",
      D: "Diffraction"
    },
    correctAnswer: "B",
    explanation: "Optical fibers rely on Total Internal Reflection. The core has a higher refractive index than the surrounding cladding. When light hits the boundary at an angle greater than the critical angle, it reflects entirely back into the core rather than refracting out."
  },
  {
    id: "mcq-10",
    subject: "Gujarat Geography",
    question: "Which dam is constructed on the Narmada river in Gujarat?",
    options: {
      A: "Ukai Dam",
      B: "Dharoi Dam",
      C: "Sardar Sarovar Dam",
      D: "Kadana Dam"
    },
    correctAnswer: "C",
    explanation: "The Sardar Sarovar Dam is a massive concrete gravity dam built on the Narmada river in Kevadia, Gujarat. It is a critical source of irrigation and hydroelectric power. Ukai is on the Tapi river, and Dharoi is on the Sabarmati river."
  }
];
