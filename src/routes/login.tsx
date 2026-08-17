import { Link, createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { SiteChrome } from "@/components/site-chrome";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <SiteChrome>
      <main className="grid min-h-dvh place-items-center bg-paper px-6 text-ink">
        <div className="w-full max-w-sm space-y-4">
          <p className="font-brush text-cinnabar">落款</p>
          <h1 className="font-display text-3xl tracking-widest">可签可不签</h1>
          <p className="text-sm text-muted">登记不用登录。想把名字写在单上，再进来。</p>
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                className="min-h-12 w-full rounded-sm bg-cinnabar font-display tracking-widest text-paper hover:bg-cinnabar-bright"
              >
                用 {p.label} 落款
              </button>
            ))
          ) : (
            <p className="text-sm text-muted">落款暂时关了。</p>
          )}
          <Link to="/" className="block min-h-11 text-center text-sm text-cinnabar">
            先去许愿
          </Link>
        </div>
      </main>
    </SiteChrome>
  );
}
