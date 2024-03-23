import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})
