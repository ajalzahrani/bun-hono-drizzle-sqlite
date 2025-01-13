# Bun-Hono-Drizzle-SQLite Starter Kit

Install dependencies:

```bash
bun install
```

Rename `.env.example` to `.env`
set the `PORT` environment variable, and
set the `DB_FILE_NAME` environment variable

Set up the database:

```bash
bun run db:push
```

Run the server:

```bash
bun run dev
```

Use `test.rest` to test the API

This starter kit was created using `bun init` in bun v1.1.32. [Bun](https://bun.sh).

# Features

- Hono web framework
- Drizzle ORM
- SQLite database
- Zod for data validation
- Environment variables
- API versioning
- API documentation

Good luck!
