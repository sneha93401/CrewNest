import { auth } from "./auth";
import { query } from "./_generated/server";

export const current = query({
  args: {},
  handler: async (ctx) => {
    // const identity = await auth.getUserIdentity(ctx);
    // if (!identity) return null;

    // const user = await ctx.db
    //   .query("users")
    //   .withIndex("by_tokenIdentifier", (q) =>
    //     q.eq("tokenIdentifier", identity.tokenIdentifier)
    //   )
    //   .unique();

    // return user;

    const userId = await auth.getUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});
