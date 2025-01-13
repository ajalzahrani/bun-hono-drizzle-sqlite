import { Hono } from "hono";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { routes } from "./routes";

// app
export const app = new Hono().use(cors()).use(logger());

// routes
app.route("/api/v1", routes);

// static files
app.get("*", serveStatic({ root: "./public" }));

// error handler
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    // Get the custom response
    return err.getResponse();
  }
  return c.json({ message: "Internal Server Error" }, 500);
});

export default app;
export type AppType = typeof app;
