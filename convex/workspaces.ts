import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

import { getAuthUserId } from "@convex-dev/auth/server";

// method to generate unique id

const GenerateCode = () => {
  const code = Array.from(
    {
      length: 6,
    },
    () => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
  ).join("");

  return code;
};

//method to create individual workspace and member

export const Create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("unauthorized");
    }

    //TODO: create a proper method later

    const joinCode = GenerateCode();
    const workspaceID = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });

    const memberID = await ctx.db.insert("members", {
      userId,
      workspaceID,
      role: "admin",
    });

    // returns member as well as workspaceId
    return { workspaceID, memberID };
  },
});

export const Get = query({
  args: {},
  handler: async (ctx) => {
    const userID = await getAuthUserId(ctx);
    if (!userID) {
      return [];
    }
    //get members by userId
    const members = ctx.db
      .query("members")
      .withIndex("by_user_id", (q) => q.eq("userId", userID))
      .collect();
    //all workspaceId's related to user
    const workspaceIDs = (await members).map((member) => member.workspaceID);
    const workspaces = [];

    //push all workspace id into workspace array related to user
    for (const workspaceID of workspaceIDs) {
      const workspace = await ctx.db.get(workspaceID);
      if (workspace) {
        workspaces.push(workspace);
      }
    }

    // return all workspaces of workspace table in convex
    return ctx.db.query("workspaces").collect();
  },
});

// get workspace using id
export const GetbyId = query({
  args: {
    id: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("unauthorized");
    }
    // query member using workspace id and userId
    const member = await ctx.db
      .query("members")
      .withIndex("by_worksapceid_id_user_id", (q) =>
        q.eq("workspaceID", args.id).eq("userId", userId)
      )
      .unique();
    if (!member) {
      return null;
    }

    return ctx.db.get(args.id);
  },
});
