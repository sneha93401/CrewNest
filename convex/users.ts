import { auth } from "./auth";
import { query } from "./_generated/server";

export const current = query({
  args: {},
  handler: async (ctx) => {


    const current = query({
      args: {},
      handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        const identity = await ctx.auth.getUserIdentity();
        return {
          id: userId,
          name: identity?.name ?? '',
          email: identity?.email ?? '',
        };
      },
    });

    const userId = await auth.getUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});
