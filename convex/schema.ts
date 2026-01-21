import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    username: v.string(),
    email: v.string(),

    // Gamification
    totalXP: v.number(),
    level: v.number(),

    // XP by track
    derivationXP: v.number(),
    visualizerXP: v.number(),
    problemSolverXP: v.number(),

    // Streaks
    currentStreak: v.number(),
    longestStreak: v.number(),
    lastActiveDate: v.string(), // ISO date
    streakFreezesAvailable: v.number(),

    // Settings
    preferredDifficultyLevel: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    enableHints: v.boolean(),
    enableLeaderboards: v.boolean(),

    // Metadata
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_total_xp", ["totalXP"]),

  conceptProgress: defineTable({
    userId: v.id("users"),
    conceptId: v.string(),

    // Progress tracking
    status: v.union(
      v.literal("locked"),
      v.literal("available"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("mastered")
    ),

    // Phase completion
    intuitionPhaseCompleted: v.boolean(),
    derivationPhaseCompleted: v.boolean(),
    synthesisPhaseCompleted: v.boolean(),

    // Performance metrics
    hintsUsed: v.number(),
    attemptsCount: v.number(),
    timeSpentMinutes: v.number(),
    masteryScore: v.number(), // 0-100

    // Spaced repetition
    lastReviewedAt: v.optional(v.number()),
    nextReviewAt: v.optional(v.number()),
    reviewCount: v.number(),

    // Timestamps
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_concept", ["userId", "conceptId"])
    .index("by_next_review", ["userId", "nextReviewAt"]),

  derivationAttempts: defineTable({
    userId: v.id("users"),
    conceptId: v.string(),
    derivationId: v.string(),

    // Attempt data
    userSteps: v.array(
      v.object({
        stepNumber: v.number(),
        userInput: v.string(),
        isCorrect: v.boolean(),
        hintsUsedForStep: v.number(),
        timeSpentSeconds: v.number(),
      })
    ),

    // Results
    isComplete: v.boolean(),
    isCorrect: v.boolean(),
    totalHintsUsed: v.number(),
    totalTimeSeconds: v.number(),
    xpEarned: v.number(),

    // Timestamps
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_concept", ["userId", "conceptId"]),

  achievements: defineTable({
    userId: v.id("users"),
    achievementId: v.string(),

    // Achievement details
    title: v.string(),
    description: v.string(),
    icon: v.string(),
    category: v.union(
      v.literal("milestone"),
      v.literal("streak"),
      v.literal("mastery"),
      v.literal("challenge")
    ),

    // Reward
    xpReward: v.number(),

    // Unlock time
    unlockedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_achievement", ["userId", "achievementId"]),

  learningSessions: defineTable({
    userId: v.id("users"),

    // Session info
    conceptsWorkedOn: v.array(v.string()),
    derivationsCompleted: v.number(),
    problemsSolved: v.number(),

    // Session metrics
    durationMinutes: v.number(),
    xpEarned: v.number(),
    hintsUsed: v.number(),

    // Timestamps
    startedAt: v.number(),
    endedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_date", ["userId", "startedAt"]),

  dailyChallenges: defineTable({
    // Challenge definition
    challengeDate: v.string(), // ISO date string
    conceptId: v.string(),
    problemId: v.string(),
    difficulty: v.union(
      v.literal("easy"),
      v.literal("medium"),
      v.literal("hard")
    ),

    // Rewards
    baseXP: v.number(),
    bonusXP: v.number(),
    timeLimitMinutes: v.number(),

    createdAt: v.number(),
  }).index("by_date", ["challengeDate"]),

  challengeAttempts: defineTable({
    userId: v.id("users"),
    challengeId: v.id("dailyChallenges"),

    // Attempt data
    isComplete: v.boolean(),
    isCorrect: v.boolean(),
    timeSpentSeconds: v.number(),
    xpEarned: v.number(),

    // Timestamps
    attemptedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_challenge", ["userId", "challengeId"]),
});
