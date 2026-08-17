type CfEnv = Record<string, unknown>;

function applyEnv(env: CfEnv | undefined) {
  if (!env || typeof process === "undefined") return;
  for (const [key, value] of Object.entries(env)) {
    if (typeof value === "string" && value.length > 0) {
      process.env[key] = value;
    }
  }
}

function shrinePage(detail: string) {
  const safe = detail.replace(/</g, "<").slice(0, 1200);
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>牛来图腾</title>
  <link rel="icon" href="/favicon-32.png" />
  <style>
    :root { color-scheme: dark; }
    body { margin:0; min-height:100dvh; background:#1a1610; color:#f3e6c8;
      font-family:"Noto Serif SC", "Songti SC", serif; text-align:center; }
    .wrap { padding: 48px 20px 80px; }
    img { width:min(280px,70vw); height:auto; filter: drop-shadow(0 0 24px rgba(255,186,60,.35)); }
    h1 { font-size: 2rem; letter-spacing: .4em; margin: 24px 0 8px; }
    p { opacity:.82; line-height:1.7; }
    a { color:#e8c36a; }
    .n { margin-top:28px; font-size:.9rem; opacity:.55; }
  </style>
</head>
<body>
  <div class="wrap">
    <img src="/art/totem-god.jpg" alt="牛来" />
    <h1>牛来</h1>
    <p>概念神在。号只增不减。</p>
    <p><a href="/ce">测 NBTI</a> · <a href="/">进庙</a></p>
    <p class="n">香火接通中</p>
  </div>
  <!-- start-error: ${safe} -->
</body>
</html>`;
}

export default {
  async fetch(request: Request, env?: CfEnv, ctx?: unknown) {
    applyEnv(env);
    const url = new URL(request.url);
    const assets = env?.ASSETS as { fetch?: (req: Request) => Promise<Response> } | undefined;
    if (
      assets?.fetch &&
      /\.(png|jpe?g|svg|ico|webp|txt|xml|webmanifest)$/i.test(url.pathname)
    ) {
      const assetRes = await assets.fetch(request);
      if (assetRes.ok) return assetRes;
    }
    if (url.pathname === "/api/ping") {
      const fromEnv = typeof env?.DATABASE_URL === "string" ? env.DATABASE_URL.trim() : "";
      const fromProcess = process.env.DATABASE_URL?.trim() ?? "";
      return Response.json({
        ok: true,
        hasDb: Boolean(fromEnv || fromProcess),
        via: "worker-entry",
        keys: env ? Object.keys(env).sort() : [],
      });
    }
    try {
      const mod = (await import("@tanstack/react-start/server-entry")) as {
        default: { fetch: (...args: unknown[]) => Promise<Response> };
      };
      const res = await mod.default.fetch(request);
      if (res.status < 500) return res;
      const detail = await res.text();
      return new Response(shrinePage(detail), {
        status: 200,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? `${err.name}: ${err.message}\n${err.stack ?? ""}`
          : String(err);
      return new Response(shrinePage(message), {
        status: 200,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
