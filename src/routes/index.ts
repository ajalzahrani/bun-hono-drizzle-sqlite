import { Hono } from "hono";
import todosRoute from "./todos.route";

export const routes = new Hono().route("/todos", todosRoute);
