import handler from "@tanstack/react-start/server-entry";

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      return await handler.fetch(request);
    } catch (err) {
      const message =
        err instanceof Error
          ? `${err.name}: ${err.message}\n${err.stack ?? ""}`
          : String(err);
      return new Response(message, {
        status: 500,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }
  },
};
