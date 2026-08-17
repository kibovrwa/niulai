import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site-chrome";
import { WISHES } from "@/lib/wish-data";
import { seoHead } from "@/lib/seo";
import { getStats, listWishes } from "@/lib/wish-fns";

export const Route = createFileRoute("/wall")({
  head: () =>
    seoHead({
      title: "号簿 · 牛来图腾",
      desc: "别人向概念神贪过的。号不回零。若干年后还来翻。",
      path: "/wall",
    }),
  loader: async () => {
    const [stats, wishes] = await Promise.all([
      getStats(),
      listWishes({ data: { limit: 48 } }),
    ]);
    return { stats, wishes };
  },
  component: Wall,
});

function Wall() {
  const { stats, wishes } = Route.useLoaderData();
  const [filter, setFilter] = useState<string | null>(null);
  const shown = filter ? wishes.filter((w) => w.wishId === filter) : wishes;

  return (
    <SiteChrome>
      <main className="bg-paper px-4 pb-16 pt-20 text-ink sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="font-brush text-cinnabar">号簿</p>
          <h1 className="font-display text-4xl tracking-widest">公开的贪</h1>
          <p className="mt-2 text-sm text-muted">
            已编到 {stats.lastSerial} 号。点进去就是别人的晒单。
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter(null)}
              className={`min-h-10 rounded-sm px-3 ${filter === null ? "bg-cinnabar text-paper" : "bg-paper-deep"}`}
            >
              全部
            </button>
            {WISHES.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setFilter(w.id)}
                className={`min-h-10 rounded-sm px-3 text-sm ${filter === w.id ? "bg-cinnabar text-paper" : "bg-paper-deep"}`}
              >
                {w.label}
                <span className="ml-1 tabular-nums opacity-70">
                  {stats.counts[w.id] ?? 0}
                </span>
              </button>
            ))}
          </div>
          <ul className="mt-8 divide-y divide-wood/15">
            {shown.map((w) => (
              <li key={w.id}>
                <Link
                  to="/w/$code"
                  params={{ code: w.id }}
                  className="block py-4 text-ink no-underline"
                >
                  <span className="font-display tabular-nums text-cinnabar">
                    {w.serial}
                  </span>
                  <span className="ml-2 text-sm text-muted">{w.nickname}</span>
                  <span className="mt-1 block font-display text-2xl">{w.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </SiteChrome>
  );
}
