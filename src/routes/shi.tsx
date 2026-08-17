import { Link, createFileRoute } from "@tanstack/react-router";
import { Hall } from "@/components/hall";
import { SiteChrome } from "@/components/site-chrome";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/shi")({
  head: () =>
    seoHead({
      title: "前生今世 · 牛来庙",
      desc: "牛来不是一只牛。是「来」成了神。从前生的路边塑像，到今世的民间挂号。",
      path: "/shi",
    }),
  component: ShiPage,
});

function ShiPage() {
  return (
    <SiteChrome>
      <Hall totem={false}>
        <article>
          <img
            src="/art/totem-god.jpg"
            alt="牛来"
            className="mx-auto w-[min(55vw,240px)]"
            crossOrigin="anonymous"
          />
          <p className="mt-5 text-center font-brush text-gold-soft">前生今世</p>
          <h1 className="text-center font-display text-4xl tracking-widest">不是牛。是「来」。</h1>
          <div className="mt-6 space-y-5 rounded-sm bg-paper px-5 py-5 text-sm leading-relaxed text-ink">
            <p>前生是路边一尊很糙的塑像。绊倒过。被人笑过。</p>
            <p>有人从电影院走出来，把它认成了神。倒过，还站着。</p>
            <p>今世不再是一只动物。牛和股票同音，来是一个动词。号从 8888 起，只增不减。</p>
            <p>不收钱。不代客理财。人走了，号还在。</p>
          </div>
          <div className="mt-6 grid gap-2">
            <Link
              to="/ce"
              className="flex min-h-12 items-center justify-center rounded-sm bg-cinnabar font-display tracking-widest text-paper no-underline"
            >
              测你是哪种牛
            </Link>
            <Link to="/" className="flex min-h-11 items-center justify-center text-sm text-gold-soft no-underline">
              回去看神
            </Link>
          </div>
        </article>
      </Hall>
    </SiteChrome>
  );
}
