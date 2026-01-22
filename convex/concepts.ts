import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all concept progress for a user
export const getUserConceptProgress = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("conceptProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return progress;
  },
});

// Get progress for a specific concept
export const getConceptProgress = query({
  args: {
    userId: v.id("users"),
    conceptId: v.string(),
  },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("conceptProgress")
      .withIndex("by_user_and_concept", (q) =>
        q.eq("userId", args.userId).eq("conceptId", args.conceptId)
      )
      .first();

    return progress;
  },
});

// Initialize concept progress
export const initializeConceptProgress = mutation({
  args: {
    userId: v.id("users"),
    conceptId: v.string(),
    status: v.union(
      v.literal("locked"),
      v.literal("available"),
      v.literal("in_progress")
    ),
  },
  handler: async (ctx, args) => {
    // Check if already exists
    const existing = await ctx.db
      .query("conceptProgress")
      .withIndex("by_user_and_concept", (q) =>
        q.eq("userId", args.userId).eq("conceptId", args.conceptId)
      )
      .first();

    if (existing) {
      return existing._id;
    }

    const progressId = await ctx.db.insert("conceptProgress", {
      userId: args.userId,
      conceptId: args.conceptId,
      status: args.status,
      intuitionPhaseCompleted: false,
      derivationPhaseCompleted: false,
      synthesisPhaseCompleted: false,
      hintsUsed: 0,
      attemptsCount: 0,
      timeSpentMinutes: 0,
      masteryScore: 0,
      reviewCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return progressId;
  },
});

// Update concept progress
export const updateConceptProgress = mutation({
  args: {
    userId: v.id("users"),
    conceptId: v.string(),
    updates: v.object({
      status: v.optional(
        v.union(
          v.literal("locked"),
          v.literal("available"),
          v.literal("in_progress"),
          v.literal("completed"),
          v.literal("mastered")
        )
      ),
      intuitionPhaseCompleted: v.optional(v.boolean()),
      derivationPhaseCompleted: v.optional(v.boolean()),
      synthesisPhaseCompleted: v.optional(v.boolean()),
      hintsUsed: v.optional(v.number()),
      timeSpentMinutes: v.optional(v.number()),
      masteryScore: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("conceptProgress")
      .withIndex("by_user_and_concept", (q) =>
        q.eq("userId", args.userId).eq("conceptId", args.conceptId)
      )
      .first();

    if (!progress) {
      throw new Error("Concept progress not found");
    }

    await ctx.db.patch(progress._id, {
      ...args.updates,
      updatedAt: Date.now(),
    });

    return progress._id;
  },
});

// Complete a phase
export const completePhase = mutation({
  args: {
    userId: v.id("users"),
    conceptId: v.string(),
    phase: v.union(
      v.literal("intuition"),
      v.literal("derivation"),
      v.literal("synthesis")
    ),
    xpEarned: v.number(),
  },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("conceptProgress")
      .withIndex("by_user_and_concept", (q) =>
        q.eq("userId", args.userId).eq("conceptId", args.conceptId)
      )
      .first();

    if (!progress) {
      throw new Error("Concept progress not found");
    }

    const phaseField =
      args.phase === "intuition"
        ? "intuitionPhaseCompleted"
        : args.phase === "derivation"
          ? "derivationPhaseCompleted"
          : "synthesisPhaseCompleted";

    const allPhasesComplete =
      (args.phase === "intuition" || progress.intuitionPhaseCompleted) &&
      (args.phase === "derivation" || progress.derivationPhaseCompleted) &&
      (args.phase === "synthesis" || progress.synthesisPhaseCompleted);

    await ctx.db.patch(progress._id, {
      [phaseField]: true,
      status: allPhasesComplete ? "completed" : "in_progress",
      completedAt: allPhasesComplete ? Date.now() : progress.completedAt,
      updatedAt: Date.now(),
    });

    return { conceptCompleted: allPhasesComplete };
  },
});

// Get concepts ready for review
export const getConceptsForReview = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const now = Date.now();
    const concepts = await ctx.db
      .query("conceptProgress")
      .withIndex("by_next_review", (q) => q.eq("userId", args.userId))
      .filter((q) =>
        q.and(
          q.neq(q.field("nextReviewAt"), undefined),
          q.lte(q.field("nextReviewAt"), now)
        )
      )
      .collect();

    return concepts;
  },
});

// Schedule next review
export const scheduleReview = mutation({
  args: {
    userId: v.id("users"),
    conceptId: v.string(),
    intervalDays: v.number(),
  },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("conceptProgress")
      .withIndex("by_user_and_concept", (q) =>
        q.eq("userId", args.userId).eq("conceptId", args.conceptId)
      )
      .first();

    if (!progress) {
      throw new Error("Concept progress not found");
    }

    const nextReview = Date.now() + args.intervalDays * 24 * 60 * 60 * 1000;

    await ctx.db.patch(progress._id, {
      nextReviewAt: nextReview,
      lastReviewedAt: Date.now(),
      reviewCount: progress.reviewCount + 1,
      updatedAt: Date.now(),
    });

    return nextReview;
  },
});
