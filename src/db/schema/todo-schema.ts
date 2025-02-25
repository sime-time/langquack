import { integer, text, boolean, pgTable, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const todo = pgTable("todo", {
  id: integer("id").primaryKey(),
  userId: text("user_id").references(() => user.id),
  content: text("content").notNull(),
  done: boolean("done").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
