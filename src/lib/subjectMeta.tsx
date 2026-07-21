import React from 'react';

export const subjectMeta: Record<string, { part?: string; gradient: string; icon: React.ReactNode; progress: number }> = {
  "Reasoning & Data Interpretation": {
      part: "Part A",
      gradient: "from-blue-500 to-indigo-600",
      icon: <i className="fa-solid fa-brain text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>,
      progress: 65
  },
  "Quantitative Aptitude": {
      part: "Part A",
      gradient: "from-indigo-500 to-purple-600",
      icon: <i className="fa-solid fa-calculator text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>,
      progress: 45
  },
  "Constitution of India": {
      part: "Part A",
      gradient: "from-cyan-500 to-blue-600",
      icon: <i className="fa-solid fa-scale-balanced text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>,
      progress: 80
  },
  "Indian Constitution": {
      part: "Part A",
      gradient: "from-cyan-500 to-blue-600",
      icon: <i className="fa-solid fa-book-open text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>,
      progress: 80
  },
  "Current Affairs & General Knowledge": {
      part: "Part A",
      gradient: "from-sky-500 to-indigo-500",
      icon: <i className="fa-solid fa-globe text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>,
      progress: 30
  },
  "Electronics Components, Devices and Circuits": {
      part: "Part B",
      gradient: "from-amber-500 to-orange-600",
      icon: <i className="fa-solid fa-microchip text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>,
      progress: 55
  },
  "Digital Electronics & VLSI": {
      part: "Part B",
      gradient: "from-orange-500 to-rose-600",
      icon: <i className="fa-solid fa-memory text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>,
      progress: 70
  },
  "Electronics Networks and Instruments & Measurements": {
      part: "Part B",
      gradient: "from-emerald-500 to-teal-600",
      icon: <i className="fa-solid fa-wave-square text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>,
      progress: 40
  },
  "Communication Engineering": {
      part: "Part B",
      gradient: "from-teal-500 to-cyan-600",
      icon: <i className="fa-solid fa-satellite-dish text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>,
      progress: 25
  },
  "Communication Applications": {
      part: "Part B",
      gradient: "from-blue-500 to-sky-600",
      icon: <i className="fa-solid fa-tower-cell text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>,
      progress: 15
  },
  "Microprocessors & Microcontrollers": {
      part: "Part B",
      gradient: "from-violet-500 to-fuchsia-600",
      icon: <i className="fa-solid fa-microchip text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>,
      progress: 50
  },
  "Computer Networks": {
      part: "Part B",
      gradient: "from-purple-500 to-pink-600",
      icon: <i className="fa-solid fa-network-wired text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>,
      progress: 35
  },
  "Essentials of Network Security": {
      part: "Part B",
      gradient: "from-rose-500 to-red-600",
      icon: <i className="fa-solid fa-shield-halved text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>,
      progress: 60
  },
  "Web Technology": {
      part: "Part B",
      gradient: "from-pink-500 to-rose-500",
      icon: <i className="fa-solid fa-laptop-code text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>,
      progress: 80
  },
  "Android Application Development": {
      part: "Part B",
      gradient: "from-lime-500 to-green-600",
      icon: <i className="fa-brands fa-android text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>,
      progress: 45
  },
  "Current Trends and Recent Advancements": {
      part: "Part B",
      gradient: "from-yellow-500 to-amber-600",
      icon: <i className="fa-solid fa-rocket text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>,
      progress: 20
  }
};

export const defaultMeta = {
  gradient: "from-dark-500 to-dark-600",
  icon: <i className="fa-solid fa-book text-white text-xl flex items-center justify-center w-6 h-6 drop-shadow-sm"></i>
};
