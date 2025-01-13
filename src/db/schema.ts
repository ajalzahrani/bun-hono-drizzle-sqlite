import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Timestamps
const timestamps = {
  updatedAt: integer("updatedAt"),
  createdAt: integer("createdAt"),
  deletedAt: integer("deletedAt"),
};

// make simple todo table
export const Todos = sqliteTable("Todos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  ...timestamps,
});

export type Todo = typeof Todos.$inferSelect;
export type NewTodo = typeof Todos.$inferInsert;

export const insertTodoSchema = createInsertSchema(Todos);
export const selectTodoSchema = createSelectSchema(Todos);
