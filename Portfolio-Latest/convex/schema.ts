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
    responseType: v.union(v.literal("predefined"), v.literal("llm")),
    detectionMethod: v.union(
      v.literal("userAgent"),
      v.literal("queryParam"),
      v.literal("trigger")
    ),
  }).index("by_timestamp", ["timestamp"]),
});
