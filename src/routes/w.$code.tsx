import { Link, createFileRoute } from "@tanstack/react-router";
import { ShareSlip } from "@/components/certificate";
import { SiteChrome } from "@/components/site-chrome";
import { cowTypeById, greedierThan, wishById } from "@/lib/wish-data";
import { seoHead } from "@/lib/seo";
import { getStats, getWish } from "@/lib/wish-fns";

export const Route = createFileRoute("/w/$code")({
  head: () =>
    seoHead({
      title: "晒单 · 牛来图腾",
      desc: "向概念神登记过的一张单。扫码也能贪一个。",
      path: "/wall",
    }),
  loader: async ({ params }) => {
    const [wish, stats] = await Promise.all([getWish({ data: params.code }), getStats()]);
    return { wish, stats };
  },
  component: SlipPage,
});

function SlipPage() {
  const { wish, stats } = Route.useLoaderData();

  if (!wish) {
    return (
      <SiteChrome>
        <main className="grid min-h-dvh place-items-center bg-paper px-6 text-center text-ink">
          <div>
            <p className="font-display text-2xl">这张单找不到了</p>
            <Link to="/" className="mt-4 inline-block text-cinnabar">
              回去看牛
            </Link>
          </div>
        </main>
      </SiteChrome>
    );
  }

  const cow = cowTypeById(wish.cowType);
  const spec = wishById(wish.wishId);
  const same = stats.counts[wish.wishId] ?? 1;
  const greasier = wishById(greedierThan(wish.wishId));

  return (
    <SiteChrome>
      <main className="bg-ink px-4 pb-16 pt-20 sm:px-6">
        <p className="mx-auto mb-4 max-w-sm text-center font-brush text-lg text-gold-soft">
          有人在图腾前登记了「{wish.label}」
        </p>
        <div className="mx-auto max-w-sm overflow-hidden rounded-sm bg-paper shadow-plaque">
          <ShareSlip wish={wish} sameCount={same} />
          <div className="space-y-3 px-5 py-5 text-center text-ink">
            <p className="font-brush text-2xl text-cinnabar">{cow.name}</p>
            <p className="text-sm text-muted">{spec.roast}</p>
            <p className="text-sm">{cow.line}</p>
            <Link
              to="/"
              search={{ g: wish.wishId }}
              className="flex min-h-12 items-center justify-center rounded-sm bg-cinnabar font-display text-lg tracking-widest text-paper no-underline"
            >
              跟他，向牛登记这个
            </Link>
            <Link
              to="/"
              search={{ g: greasier.id }}
              className="flex min-h-12 items-center justify-center rounded-sm bg-paper-deep font-display tracking-widest no-underline"
            >
              比他贪：{greasier.label}
            </Link>
            <Link to="/ce" className="block min-h-11 text-sm text-muted">
              先让图腾看我一眼
            </Link>
          </div>
        </div>
      </main>
    </SiteChrome>
  );
}
