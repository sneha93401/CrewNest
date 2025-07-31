// convex/profiles.ts
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { auth } from './auth';

export const createProfile = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    age: v.string(),
    contact: v.string(),
    bio: v.string(),
    company: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('profiles', {
      ...args,
    });
  },
});

export const getProfile = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('profiles')
      .filter(q => q.eq(q.field('userId'), args.userId))
      .unique();
  },
});

export const getProfileByUserId = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return null;

    const profile = await ctx.db
      .query('profiles')
      .filter((q) => q.eq(q.field('userId'), userId))
      .first();

    return profile ?? null;
  },
});
