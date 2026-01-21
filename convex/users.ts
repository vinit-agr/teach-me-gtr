import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get or create user from Clerk ID
export const getOrCreateUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    username: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    // Create new user with default values
    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      username: args.username,
      email: args.email,
      totalXP: 0,
      level: 1,
      derivationXP: 0,
      visualizerXP: 0,
      problemSolverXP: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: new Date().toISOString().split("T")[0],
      streakFreezesAvailable: 0,
      preferredDifficultyLevel: "beginner",
      enableHints: true,
      enableLeaderboards: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return userId;
  },
});

// Get current user
export const getCurrentUser = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    return user;
  },
});

// Update user XP and level
export const updateUserXP = mutation({
  args: {
    userId: v.id("users"),
    xpToAdd: v.number(),
    track: v.union(
      v.literal("derivation"),
      v.literal("visualizer"),
      v.literal("problemSolver")
    ),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    const newTotalXP = user.totalXP + args.xpToAdd;
    const newLevel = Math.floor(Math.sqrt(newTotalXP / 100));

    // Update track-specific XP
    const trackXPField =
      args.track === "derivation"
        ? "derivationXP"
        : args.track === "visualizer"
          ? "visualizerXP"
          : "problemSolverXP";

    await ctx.db.patch(args.userId, {
      totalXP: newTotalXP,
      level: newLevel,
      [trackXPField]: user[trackXPField] + args.xpToAdd,
      updatedAt: Date.now(),
    });

    return { newLevel, leveledUp: newLevel > user.level };
  },
});

// Update user streak
export const updateStreak = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    const today = new Date().toISOString().split("T")[0];
    const lastActive = user.lastActiveDate;

    // Check if already active today
    if (lastActive === today) {
      return { streakContinued: false, currentStreak: user.currentStreak };
    }

    // Check if streak continues (yesterday)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    let newStreak = user.currentStreak;
    let streakBroken = false;

    if (lastActive === yesterday) {
      // Streak continues
      newStreak = user.currentStreak + 1;
    } else {
      // Streak broken, check if freeze available
      if (user.streakFreezesAvailable > 0) {
        // Use freeze
        newStreak = user.currentStreak + 1;
        await ctx.db.patch(args.userId, {
          streakFreezesAvailable: user.streakFreezesAvailable - 1,
        });
      } else {
        // Streak resets
        newStreak = 1;
        streakBroken = true;
      }
    }

    await ctx.db.patch(args.userId, {
      currentStreak: newStreak,
      longestStreak: Math.max(user.longestStreak, newStreak),
      lastActiveDate: today,
      updatedAt: Date.now(),
    });

    return { streakContinued: true, currentStreak: newStreak, streakBroken };
  },
});
