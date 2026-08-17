type CfEnv = Record<string, unknown>;

function applyEnv(env: CfEnv | undefined) {
  if (!env || typeof process === "undefined") return;
  for (const [key, value] of Object.entries(env)) {
    if (typeof value === "string" && value.length > 0) {
      process.env[key] = value;
    }
  }
}

export default {
  async fetch(request: Request, env?: CfEnv, ctx?: unknown) {
    applyEnv(env);
    const mod = (await import("@tanstack/react-start/server-entry")) as {
      default: { fetch: (...args: unknown[]) => Promise<Response> };
    };
    try {
      return await mod.default.fetch(request, env, ctx);
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
