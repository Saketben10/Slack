import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

//create a channel

export const create = mutation({
  args: {
    name: v.string(),
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_worksapce_id", (q) =>
        q.eq("workspaceID", args.workspaceId)
      )
      .unique();

    if (!member || member.role === "member") {
      throw new Error("unauthorized");
    }

    const parsedName = args.name.replace(/\s+/g, "-").toLowerCase();
    // this regex removes extra space and converts it to dashses

    const channelid = await ctx.db.insert("channels", {
      name: parsedName,
      workspaceID: args.workspaceId,
    });

    return { channelid };
  },
});

// query channels through workspaceId
export const get = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_worksapceid_id_user_id", (q) =>
        q.eq("workspaceID", args.workspaceId)
      )
      .unique();

    if (!member) {
      return [];
    }

    const channels = await ctx.db
      .query("channels")
      .withIndex("by_worksapce_id", (q) =>
        q.eq("workspaceID", args.workspaceId)
      )
      .collect();

    if (!channels) {
      return [];
    }

    return channels;
  },
});
