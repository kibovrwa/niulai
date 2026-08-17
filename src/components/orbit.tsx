import { Link } from "@tanstack/react-router";
import { t, useLocale } from "@/lib/i18n";
import { TYPES } from "@/lib/nbti";
import {
  nextMilestone,
  rankWishes,
  todayWishId,
  wishById,
  type WishId,
} from "@/lib/wish-data";

export function TotemOrbits({
  counts,
  fire,
  types,
  onOffer,
}: {
  counts: Record<string, number>;
  fire: number;
  types: Record<string, number>;
  onOffer: (wishId?: WishId) => void;
}) {
  const locale = useLocale((s) => s.locale);
  const today = wishById(todayWishId());
  const todayN = counts[today.id] ?? 0;
  const goal = nextMilestone(todayN);
  const ranked = rankWishes(counts).slice(0, 5);
  const max = Math.max(1, ranked[0]?.n ?? 1);
  const filed = Object.values(counts).reduce((s, n) => s + n, 0);
  const typeRank = Object.entries(types)
    .map(([k, n]) => ({ k, n, name: TYPES[k]?.name.zh ?? k }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 4);

  return (
    <section className="bg-ink px-4 py-12 text-paper sm:px-6">
      <div className="mx-auto max-w-3xl space-y-10">
        <div>
          <p className="font-brush text-gold-soft">造神模型</p>
          <h2 className="mt-1 font-display text-3xl tracking-widest">测相 · 挂号 · 传火</h2>
          <ol className="mt-5 grid gap-3 sm:grid-cols-3">
            <li className="rounded-sm bg-wood/40 px-4 py-4">
              <p className="font-display text-lg">1 测相</p>
              <p className="mt-1 text-sm text-paper/70">八题出牛马和指数。这是你在庙里的脸。</p>
            </li>
            <li className="rounded-sm bg-wood/40 px-4 py-4">
              <p className="font-display text-lg">2 挂号</p>
              <p className="mt-1 text-sm text-paper/70">选一句贪，领一个只增不减的号。</p>
            </li>
            <li className="rounded-sm bg-wood/40 px-4 py-4">
              <p className="font-display text-lg">3 传火</p>
              <p className="mt-1 text-sm text-paper/70">把单甩出去。别人扫了，香火就长一截。</p>
            </li>
          </ol>
        </div>

        <div>
          <p className="font-brush text-gold-soft">{t(locale, "todayTitle")}</p>
          <h2 className="mt-1 font-display text-3xl tracking-widest">{today.label}</h2>
          <p className="mt-2 text-sm text-paper/70">{today.roast}</p>
          <p className="mt-3 text-sm tabular-nums text-cow">
            {todayN} / {goal}
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-wood">
            <div
              className="h-full bg-cow"
              style={{ width: `${Math.min(100, (todayN / goal) * 100)}%` }}
            />
          </div>
          <button
            type="button"
            onClick={() => onOffer(today.id)}
            className="mt-5 min-h-12 rounded-sm bg-cinnabar px-5 font-display tracking-widest text-paper"
          >
            跟今日神谕
          </button>
        </div>

        <div>
          <p className="font-brush text-gold-soft">{t(locale, "bangTitle")}</p>
          <ol className="mt-4 space-y-3">
            {ranked.map((w, i) => (
              <li key={w.id}>
                <button
                  type="button"
                  onClick={() => onOffer(w.id)}
                  className="flex w-full items-start gap-3 text-left"
                >
                  <span className="w-6 font-display tabular-nums text-gold">{i + 1}</span>
                  <span className="flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-lg">{w.label}</span>
                      <span className="text-xs tabular-nums text-muted">{w.n}</span>
                    </span>
                    <span className="mt-1 block h-1 overflow-hidden rounded-full bg-wood">
                      <span
                        className="block h-full bg-cow"
                        style={{ width: `${Math.max(8, (w.n / max) * 100)}%` }}
                      />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <Link to="/bang" className="mt-4 inline-block text-sm text-gold-soft">
            {t(locale, "bangAll")}
          </Link>
        </div>

        <div className="border-y border-wood-lit/40 py-8">
          <p className="font-brush text-gold-soft">香火纪</p>
          <h2 className="mt-1 font-display text-3xl tracking-widest">自立像以来</h2>
          <p className="mt-3 text-sm leading-relaxed text-paper/75">
            从第八千八百八十八号起号。人不在了，号还在长。香火每被传一次，这尊神就真一点。
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <p className="font-display text-4xl tabular-nums text-cow">{filed}</p>
              <p className="text-xs tracking-widest text-muted">累计已登记</p>
            </div>
            <div>
              <p className="font-display text-4xl tabular-nums text-cow">{fire}</p>
              <p className="text-xs tracking-widest text-muted">香火已传</p>
            </div>
          </div>
          {typeRank.length ? (
            <ul className="mt-5 space-y-1 text-sm">
              {typeRank.map((r) => (
                <li key={r.k} className="flex justify-between gap-3">
                  <span>{r.name}</span>
                  <span className="tabular-nums text-gold-soft">{r.n} 人</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div>
          <p className="font-brush text-gold-soft">NBTI</p>
          <h2 className="mt-1 font-display text-3xl tracking-widest">{t(locale, "nbtiTease")}</h2>
          <p className="mt-2 max-w-md text-sm text-paper/70">{t(locale, "nbtiTeaseSub")}</p>
          <Link
            to="/ce"
            className="mt-5 inline-flex min-h-12 items-center rounded-sm bg-paper px-5 font-display tracking-widest text-ink no-underline"
          >
            {t(locale, "nbtiCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
