import { text, index, pgTable, timestamp, integer, vector } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const story = pgTable("story", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  language: text("language"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const storySection = pgTable("story_section", {
  id: text("id").primaryKey(),
  storyId: text("story_id").references(() => story.id, { onDelete: "cascade" }).notNull(),
  content: text("content").notNull(),
  embedding: vector("embedding", { dimensions: 1536 }),
  sectionOrder: integer(), // the order of the section in the original story
  createdAt: timestamp("created_at").notNull().defaultNow(),
},
  (thisTable) => [
    index("embedding_index").using("hnsw", thisTable.embedding.op("vector_cosine_ops")),
  ]
);
