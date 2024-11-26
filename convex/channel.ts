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
        q.eq("workspaceID", args.workspaceId).eq("userId", userId)
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

//delete a channel
export const Remove = mutation({
  args: { iD: v.id("channels") },
  handler: async (ctx, args) => {
    const userID = await getAuthUserId(ctx);
    if (!userID) {
      throw new Error("unauthorized");
    }

    await ctx.db.delete(args.iD);

    return args.iD;
  },
});

// get a channelById

export const getById = query({
  args: {
    channelId: v.id("channels"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    const channel = await ctx.db.get(args.channelId);

    if (!channel) {
      return null;
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_worksapceid_id_user_id", (q) =>
        q.eq("workspaceID", channel.workspaceID).eq("userId", userId)
      )
      .unique();

    if (!member) {
      return null;
    }

    return channel;
  },
});

// update the channel

export const update = mutation({
  args: {
    workspaceid: v.id("workspaces"),
    channelid: v.id("channels"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_worksapce_id", (q) =>
        q.eq("workspaceID", args.workspaceid)
      )
      .unique();

    if (!member || member.role === "member") {
      throw new Error("unauthorized");
    }

    await ctx.db.patch(args.channelid, {
      name: args.name,
    });

    return args.channelid;
  },
});
