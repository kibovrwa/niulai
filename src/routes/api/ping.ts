import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/ping")({
  server: {
    handlers: {
      GET: () =>
        Response.json({
          ok: true,
          hasDb: Boolean(process.env.DATABASE_URL?.trim()),
        }),
    },
  },
});
