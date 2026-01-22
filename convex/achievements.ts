import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all achievements for a user
export const getUserAchievements = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const achievements = await ctx.db
      .query("achievements")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return achievements;
  },
});

// Check if achievement already unlocked
export const hasAchievement = query({
  args: {
    userId: v.id("users"),
    achievementId: v.string(),
  },
  handler: async (ctx, args) => {
    const achievement = await ctx.db
      .query("achievements")
      .withIndex("by_user_and_achievement", (q) =>
        q.eq("userId", args.userId).eq("achievementId", args.achievementId)
      )
      .first();

    return achievement !== null;
  },
});

// Unlock an achievement
export const unlockAchievement = mutation({
  args: {
    userId: v.id("users"),
    achievementId: v.string(),
    title: v.string(),
    description: v.string(),
    icon: v.string(),
    category: v.union(
      v.literal("milestone"),
      v.literal("streak"),
      v.literal("mastery"),
      v.literal("challenge")
    ),
    xpReward: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if already unlocked
    const existing = await ctx.db
      .query("achievements")
      .withIndex("by_user_and_achievement", (q) =>
        q.eq("userId", args.userId).eq("achievementId", args.achievementId)
      )
      .first();

    if (existing) {
      return { alreadyUnlocked: true, achievementId: existing._id };
    }

    // Unlock achievement
    const achievementId = await ctx.db.insert("achievements", {
      userId: args.userId,
      achievementId: args.achievementId,
      title: args.title,
      description: args.description,
      icon: args.icon,
      category: args.category,
      xpReward: args.xpReward,
      unlockedAt: Date.now(),
    });

    // Award XP to user
    const user = await ctx.db.get(args.userId);
    if (user) {
      const newTotalXP = user.totalXP + args.xpReward;
      const newLevel = Math.floor(Math.sqrt(newTotalXP / 100));

      await ctx.db.patch(args.userId, {
        totalXP: newTotalXP,
        level: newLevel,
        updatedAt: Date.now(),
      });
    }

    return { alreadyUnlocked: false, achievementId };
  },
});
