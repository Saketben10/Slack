import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const newGetInfo = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userid = await getAuthUserId(ctx);
    if (!userid) {
      throw new Error("unauthorized");
    }
    const member = await ctx.db
      .query("members")
      .withIndex("by_worksapceid_id_user_id", (q) =>
        q.eq("workspaceID", args.id).eq("userId", userid)
      )
      .unique();

    const workspace = await ctx.db.get(args.id);

    return {
      name: workspace?.name,
      isMember: !!member,
    };
  },
});
