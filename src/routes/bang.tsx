import { Link, createFileRoute } from "@tanstack/react-router";
import { Hall } from "@/components/hall";
import { SiteChrome } from "@/components/site-chrome";
import { nextMilestone, rankWishes } from "@/lib/wish-data";
import { seoHead } from "@/lib/seo";
import { getStats } from "@/lib/wish-fns";

export const Route = createFileRoute("/bang")({
  loader: () => getStats(),
  head: () =>
    seoHead({
      title: "贪榜 · 牛来图腾",
      desc: "概念神收下的贪。股票翻倍、美股是大海、大A六千。看哪一句香火最旺。",
      path: "/bang",
    }),
  component: BangPage,
});

function BangPage() {
  const stats = Route.useLoaderData();
  const ranked = rankWishes(stats.counts);
  const max = Math.max(1, ranked[0]?.n ?? 1);

  return (
    <SiteChrome>
      <Hall wide>
        <p className="text-center font-brush text-gold-soft">神收下的</p>
        <h1 className="text-center font-display text-4xl tracking-widest">贪榜</h1>
        <p className="mt-2 text-center text-sm text-paper/70">已编到 {stats.lastSerial} 号</p>
        <ol className="mt-6 space-y-3 rounded-sm bg-paper px-4 py-4 text-ink">
          {ranked.map((w, i) => {
            const goal = nextMilestone(w.n);
            return (
              <li key={w.id}>
                <Link to="/" search={{ g: w.id }} className="block text-ink no-underline">
                  <div className="flex items-baseline justify-between gap-3">
                    <span>
                      <span className="mr-2 font-display tabular-nums text-cinnabar">{i + 1}</span>
                      <span className="font-display text-2xl">{w.label}</span>
                    </span>
                    <span className="text-sm tabular-nums text-muted">{w.n} 人</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-deep">
                    <div
                      className="h-full bg-cinnabar"
                      style={{ width: `${Math.max(6, (w.n / max) * 100)}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs tabular-nums text-muted">下一章 {goal}</p>
                </Link>
              </li>
            );
          })}
        </ol>
      </Hall>
    </SiteChrome>
  );
}
