export const XP_LEVELS = [
  { level: 1, name: "Beginner", xpRequired: 0, icon: "🌱" },
  { level: 2, name: "Learner", xpRequired: 500, icon: "📚" },
  { level: 3, name: "Practitioner", xpRequired: 1500, icon: "✍️" },
  { level: 4, name: "Skilled", xpRequired: 3500, icon: "🎯" },
  { level: 5, name: "Advanced", xpRequired: 7500, icon: "⚡" },
  { level: 6, name: "Expert", xpRequired: 15000, icon: "🏅" },
  { level: 7, name: "Master", xpRequired: 30000, icon: "🏆" },
  { level: 8, name: "Legend", xpRequired: 50000, icon: "👑" },
];

export const XP_REWARDS = {
  CORRECT_ANSWER: 10,
  WRONG_ANSWER: -5,
  FIRST_ATTEMPT_BONUS: 5,
  STREAK_5_CORRECT: 25,
  DAILY_STUDY_STREAK: 5, // Awarded on first submission of the day
  
  // Practice Modes
  
  // Tests
  TIMED_TEST_80_PLUS: 30,
  MOCK_90_PLUS: 75,
  
  // Global Modifiers
  PERFECT_SCORE: 40,
  
  // Milestones
  STREAK_7_DAY: 50,
  STREAK_30_DAY: 300,
  
  // Daily Quiz
  DAILY_QUIZ_COMPLETE: 20,
  DAILY_QUIZ_100: 20,
};

export function getUserLevel(xp: number) {
  let currentLevel = XP_LEVELS[0];
  let nextLevel = XP_LEVELS[1] || null;

  for (let i = 0; i < XP_LEVELS.length; i++) {
    if (xp >= XP_LEVELS[i].xpRequired) {
      currentLevel = XP_LEVELS[i];
      nextLevel = XP_LEVELS[i + 1] || null;
    } else {
      break;
    }
  }

  // Calculate progress to next level
  let progress = 100;
  if (nextLevel) {
    const xpIntoLevel = xp - currentLevel.xpRequired;
    const xpNeededForNext = nextLevel.xpRequired - currentLevel.xpRequired;
    progress = Math.min(100, Math.max(0, Math.round((xpIntoLevel / xpNeededForNext) * 100)));
  }

  return {
    currentLevel,
    nextLevel,
    progress
  };
}
