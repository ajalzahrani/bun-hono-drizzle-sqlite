import { Hono } from "hono";
import db from "../db";
import { Todos, insertTodoSchema, type NewTodo, type Todo } from "../db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const todosRoute = new Hono()
  .get("/", async (c, next) => {
    // get todos from db
    const todos = await db.select().from(Todos).where(isNull(Todos.deletedAt));
    return c.json(todos);
  })
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.coerce.number() })),
    async (c) => {
      // get id from params
      const { id } = c.req.valid("param");
      // get todo from db
      const todo = await db
        .select()
        .from(Todos)
        .where(and(eq(Todos.id, Number(id)), isNull(Todos.deletedAt)))
        .limit(1);
      return c.json(todo);
    }
  )
  .post("/", zValidator("json", insertTodoSchema), async (c) => {
    // get todo from body
    const todo = c.req.valid("json");
    todo.createdAt = new Date().getTime();
    // insert todo into db
    const newTodo = await db.insert(Todos).values(todo as NewTodo);
    return c.json({ newTodo });
  })
  .put(
    "/:id",
    zValidator("param", z.object({ id: z.coerce.number() })),
    zValidator("json", insertTodoSchema),
    async (c) => {
      // get id from params
      const { id } = c.req.valid("param");
      // get todo from body
      const todo = c.req.valid("json");
      todo.updatedAt = new Date().getTime();
      // update todo in db
      const updatedTodo = await db
        .update(Todos)
        .set(todo as Todo)
        .where(and(eq(Todos.id, Number(id)), isNull(Todos.deletedAt)));
      return c.json({ updatedTodo });
    }
  )
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.coerce.number() })),
    async (c) => {
      // get id from params
      const { id } = c.req.valid("param");
      // delete todo from db
      const deletedTodo = await db
        .update(Todos)
        .set({ deletedAt: new Date().getTime() })
        .where(and(eq(Todos.id, Number(id)), isNull(Todos.deletedAt)));
      return c.json({ deletedTodo });
    }
  );

export default todosRoute;
