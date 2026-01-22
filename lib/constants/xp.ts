export const XP_REWARDS = {
  // Derivation phase
  DERIVATION_COMPLETE_NO_HINTS: 100,
  DERIVATION_COMPLETE_FEW_HINTS: 75, // 1-2 hints
  DERIVATION_COMPLETE_MANY_HINTS: 50, // 3+ hints
  DERIVATION_STEP_CORRECT: 10,

  // Intuition phase
  PATTERN_DISCOVERED: 30,
  VISUALIZATION_EXPLORED: 20,
  INTUITION_PHASE_COMPLETE: 50,

  // Synthesis phase
  PROBLEM_SOLVED_FIRST_TRY: 80,
  PROBLEM_SOLVED_SECOND_TRY: 60,
  PROBLEM_SOLVED_MULTIPLE_TRIES: 40,
  PREDICTION_CORRECT: 25,

  // Challenges
  DAILY_CHALLENGE_COMPLETE: 100,
  DAILY_CHALLENGE_BONUS: 50, // under time limit

  // Streaks
  STREAK_MILESTONE_3: 50,
  STREAK_MILESTONE_7: 100,
  STREAK_MILESTONE_14: 250,
  STREAK_MILESTONE_30: 500,
  STREAK_MILESTONE_100: 2000,
} as const;

export function calculateLevel(totalXP: number): number {
  // Level curve: level = floor(sqrt(totalXP / 100))
  return Math.floor(Math.sqrt(totalXP / 100));
}

export function getXPForNextLevel(currentLevel: number): number {
  return (currentLevel + 1) ** 2 * 100;
}

export function getXPForLevel(level: number): number {
  return level ** 2 * 100;
}

export function calculateDerivationXP(hintsUsed: number): number {
  if (hintsUsed === 0) return XP_REWARDS.DERIVATION_COMPLETE_NO_HINTS;
  if (hintsUsed <= 2) return XP_REWARDS.DERIVATION_COMPLETE_FEW_HINTS;
  return XP_REWARDS.DERIVATION_COMPLETE_MANY_HINTS;
}

export function calculateProblemXP(attempts: number): number {
  if (attempts === 1) return XP_REWARDS.PROBLEM_SOLVED_FIRST_TRY;
  if (attempts === 2) return XP_REWARDS.PROBLEM_SOLVED_SECOND_TRY;
  return XP_REWARDS.PROBLEM_SOLVED_MULTIPLE_TRIES;
}
