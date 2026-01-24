import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  stats: defineTable({
    views: v.number(),
  }),
  agentInteractions: defineTable({
    timestamp: v.number(),
    userAgent: v.string(),
    query: v.string(),
  }).index("by_timestamp", ["timestamp"]),
  agentMemories: defineTable({
    key: v.string(),
    value: v.string(),
    sessionId: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_key", ["key"])
    .index("by_session", ["sessionId"]),
});
