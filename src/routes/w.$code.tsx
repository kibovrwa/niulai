import { Link, createFileRoute } from "@tanstack/react-router";
import { ShareSlip } from "@/components/certificate";
import { ShareBar } from "@/components/share-bar";
import { Hall } from "@/components/hall";
import { KaiSeal } from "@/components/kai-guang";
import { SiteChrome } from "@/components/site-chrome";
import { cowTypeById, greedierThan, wishById } from "@/lib/wish-data";
import { seoHead } from "@/lib/seo";
import { wishShare } from "@/lib/share";
import { getStats, getWish } from "@/lib/wish-fns";

export const Route = createFileRoute("/w/$code")({
  head: () =>
    seoHead({
      title: "有人在开过光的池里登了一号",
      desc: "信牛来，牛市一定来。点开看他贪的是什么，你也来许一个。",
      path: "/w",
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
        <Hall>
          <div className="text-center">
            <p className="font-display text-2xl">这张单找不到了</p>
            <Link to="/" className="mt-4 inline-block text-gold-soft">
              回去看牛
            </Link>
          </div>
        </Hall>
      </SiteChrome>
    );
  }

  const cow = cowTypeById(wish.cowType);
  const spec = wishById(wish.wishId);
  const same = stats.counts[wish.wishId] ?? 1;
  const greasier = wishById(greedierThan(wish.wishId));

  return (
    <SiteChrome>
      <Hall rain>
        <p className="text-center font-brush text-gold-soft">此页已开光</p>
        <h1 className="mt-1 text-center font-display text-3xl tracking-widest">
          第 {wish.serial} 号
        </h1>
        <p className="mt-1 text-center font-brush text-xl text-gold-soft">信牛来，牛市一定来</p>
        <p className="mt-2 text-center text-sm text-paper/75">
          有人许了「{wish.label}」· {same} 人同一贪
        </p>

        <div className="relative mt-5 overflow-hidden rounded-sm bg-paper shadow-plaque">
          <KaiSeal />
          <ShareSlip wish={wish} sameCount={same} />
          <div className="space-y-3 px-5 py-5 text-center text-ink">
            <p className="font-brush text-2xl text-cinnabar">{cow.name}</p>
            <p className="text-sm text-muted">{spec.roast}</p>
            <p className="text-sm">{cow.line}</p>
            <ShareBar
              payload={wishShare({ serial: wish.serial, label: wish.label, id: wish.id })}
            />
            <Link
              to="/"
              search={{ g: wish.wishId }}
              className="flex min-h-12 items-center justify-center rounded-sm bg-cinnabar font-display text-lg tracking-widest text-paper no-underline"
            >
              我也许这个
            </Link>
            <Link
              to="/"
              search={{ g: greasier.id }}
              className="flex min-h-12 items-center justify-center rounded-sm bg-wood font-display tracking-widest text-paper no-underline"
            >
              比他贪：{greasier.label}
            </Link>
            <Link to="/" className="block min-h-11 text-sm text-muted">
              自己另许一句
            </Link>
            <Link to="/ce" className="block min-h-10 text-xs tracking-widest text-muted/80">
              顺手测测你的 NBTI
            </Link>
          </div>
        </div>
      </Hall>
    </SiteChrome>
  );
}
