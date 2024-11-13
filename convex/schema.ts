import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { QueryCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const populateUser = (ctx: QueryCtx, id: Id<"users">) => {
  return ctx.db.get(id);
};
const schema = defineSchema({
  ...authTables,
  workspaces: defineTable({
    name: v.string(),
    userId: v.id("users"),
    joinCode: v.string(),
  }),
  members: defineTable({
    userId: v.id("users"),
    workspaceID: v.id("workspaces"),
    role: v.union(v.literal("admin"), v.literal("member")),
  })
    .index("by_user_id", ["userId"])
    .index("by_worksapce_id", ["workspaceID"])
    .index("by_worksapceid_id_user_id", ["workspaceID", "userId"]),

  channels: defineTable({
    name: v.string(),
    workspaceID: v.id("workspaces"),
  }).index("by_worksapce_id", ["workspaceID"]),
});

export default schema;
